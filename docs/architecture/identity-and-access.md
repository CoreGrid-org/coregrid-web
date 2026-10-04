---
sidebar_position: 2
---

# Identity and Access

CoreGrid delegates authentication and the user directory to ThunderID, a standards-based identity provider
(OpenID Connect / OAuth 2.0), and keeps authorisation - what a signed-in user is allowed to do - inside its
own API.

## Why authentication is delegated

- **No credential risk.** CoreGrid stores no passwords and no password hashes. The most damaging class of
  breach for a system of record - credential disclosure - is structurally impossible, because credentials
  never enter the application boundary.
- **Isolation by deployment, not by database row.** Each customer runs their own instance - their own API,
  their own database, their own identity provider. There is no cross-customer boundary to get wrong, because
  no two customers ever share infrastructure.
- **Standards, not proprietary integration.** The API validates tokens against a published key set. Claim
  names are isolated in a single mapping component, so switching identity providers is a small, contained
  change. The API reaches ThunderID only through the `IIdentityDirectory` abstraction (user creation, role
  change, deactivation, password reset) and validates tokens through the standard ASP.NET Core JWT bearer
  pipeline. Replacing ThunderID with another OIDC provider needs only a new handler and directory
  implementation — no controller, policy, service or client changes.
- **Capabilities that don't need to be rebuilt.** Multi-factor authentication, password policy, account
  recovery and session termination are handled by the identity provider rather than reimplemented.

## Organisation and user model

Each deployment holds exactly one organisation record. A customer's Administrator invites the rest of their
users into it.

```
   ONE DEPLOYMENT - self-hosted per customer: its own API,
   its own PostgreSQL, its own identity-provider instance.

   IDENTITY PROVIDER (this customer only)
   │
   └── Users:  a.silva · j.fernando · n.perera · …
         Role assignments: Administrator · Inventory Officer · Auditor · Staff

   COREGRID DATABASE
   Organization  (exactly one row - this customer)
        │
        ├──1:N── Departments ──1:N── Locations
        └──1:N── Users   (mirrors the identity provider's user)
                   │
                   └── Role  (Administrator · Inventory Officer · Auditor · Staff)
```

A second customer is a second, independent deployment of this same diagram - not a second row inside this
one.

| Concept | Owned by | Reason |
|---|---|---|
| User identity and credentials | Identity provider exclusively | Credentials never enter the application boundary. |
| Role assignment | Identity provider, mirrored into CoreGrid at sign-in | Roles must be consistent across web and mobile and available at token-validation time. |
| Department and location | CoreGrid database | Business structure, frequently reconfigured, referenced by business rules. |
| Effective permission for an operation | CoreGrid's own policy layer | Depends on domain state (asset status, workflow position) the identity provider doesn't hold. |

## User provisioning and the local mirror

CoreGrid maintains a local `Users` table. It is not a second identity store: it holds no credentials and is
never authoritative for authentication. It exists for three reasons — foreign-key integrity (every asset,
maintenance record, approval and audit entry references a user), query performance (a list of two hundred
maintenance records must not produce two hundred directory lookups), and historical accuracy (an audit
record from March must still show who acted even if that person has since left the organisation).

| Scenario | Behaviour |
|---|---|
| First sign-in of a new user | The API creates the mirror record from the token claims on the first authenticated request, assigns the default department if one is configured, and records a `UserProvisioned` audit event. |
| Subsequent sign-in | Email, display name and roles are refreshed from the token if they differ. A role change is recorded as a `RoleChanged` audit event. |
| Administrator invites a user | The API calls ThunderID's management API using a confidential service credential to create the user and assign the requested role; ThunderID sends the invitation. The mirror record is created immediately in a Pending state. |
| Administrator deactivates a user | The local mirror is marked inactive and the corresponding record is disabled. Deactivation takes effect at the API on the next request regardless of token validity. |
| User is deleted in ThunderID | The mirror record is retained and marked inactive. It is never hard-deleted, because audit and lifecycle history reference it. |
| Department assignment | Held only in CoreGrid and changed by an Administrator; never sourced from the identity provider. |

## Token validation

Every authenticated request runs through the same sequence:

```
  1  Extract the bearer token from the Authorization header.
  2  Verify its signature against the identity provider's published keys.
  3  Validate issuer, expiry and not-before.
  4  Resolve the token subject to the local user record; create or refresh
     it on first request of a session.
     → user deactivated locally  ⇒  403 Forbidden.
  5  Read OrganizationId from that local user record.
  6  Project the roles claim into permission checks.
  7  Evaluate the endpoint's authorisation policy.
  8  Every database query is scoped to OrganizationId automatically -
     isolation is enforced by the data layer, not left to each query.
```

Step 8 is what makes cross-organisation data disclosure structurally impossible rather than a matter of
remembering a filter: it's applied once, centrally, in the data-access layer through EF Core global query
filters.

## Roles and permissions

CoreGrid uses four roles. Authorisation is policy-based: each API operation declares the permission it
requires, and a role either holds that permission or doesn't.

| Permission | Staff | Inventory Officer | Auditor | Administrator |
|---|---|---|---|---|
| View assets (own department) | Yes | Yes | Yes | Yes |
| View assets (organisation-wide) | No | Yes | Yes | Yes |
| Create / update assets | No | Yes | No | Yes |
| Verify assets | No | Yes | Yes | No |
| Request maintenance | Yes | Yes | No | Yes |
| Manage maintenance | No | Yes | No | Yes |
| Request transfer | No | Yes | No | Yes |
| Approve transfer | No | No | No | Yes |
| Confirm transfer receipt | No | Yes | No | No |
| Request disposal | No | Yes | No | Yes |
| Approve disposal | No | No | No | Yes |
| Manage audit campaigns | No | No | Yes | Yes |
| Resolve discrepancies | No | No | Yes | Yes |
| Read audit log | No | No | Yes | Yes |
| Manage organisation configuration | No | No | No | Yes |
| Manage users | No | No | No | Yes |
| Initiate AI evaluation | No | Yes | No | Yes |
| Approve AI recommendation | No | No | No | Yes |
| Generate reports | No | Yes | Yes | Yes |

Three properties of this table are load-bearing: an Auditor cannot create or amend an asset, which is what
makes an audit finding independent evidence; an Administrator cannot confirm physical receipt of a transfer,
because that's an assertion about the physical world only the receiving officer can truthfully make; and the
agent service principal holds three read-only tool permissions and nothing else — no create, no update, no
approve — which is the enforcement point behind the architectural rule that agents advise but never decide.

See [Roles and Permissions](../user-manual/roles-permissions.md) in the User Manual for what each role
experiences day to day.

## Session handling

- Access tokens are short-lived (fifteen minutes), so a revoked or changed permission takes effect quickly
  without the API maintaining session state.
- Refresh tokens rotate on use; a replayed refresh token invalidates the whole token family, which limits
  the value of a stolen token on a lost device.
- The web app holds its access token in memory only - never in localStorage or sessionStorage, so a
  cross-site scripting defect cannot exfiltrate a durable credential.
- The mobile app holds its refresh token in platform-secure storage (Android Keystore), and never writes
  tokens to shared preferences or application logs.
- Signing out clears local state, revokes the refresh token at ThunderID and terminates the
  identity-provider session, so the next sign-in genuinely re-authenticates.
- The API is stateless with respect to sessions. It maintains no server-side session store, which is what
  allows both clients and any number of API instances to share one identity without affinity.
- Expiry during an in-flight request produces a single transparent refresh-and-retry in both clients; a
  second failure returns the user to the sign-in screen with their unsaved input preserved where practical.

## Password handling

CoreGrid handles no passwords. Credential storage, hashing, recovery and session termination are delegated
to ThunderID. This removes an entire class of vulnerability from the CoreGrid codebase. The Administrator
password reset (`POST /api/users/{id}/reset-password`) and Setup's creation of the first Administrator are
the only places where a password crosses the CoreGrid API. Both forward it directly to ThunderID and never
persist or log it.

## Security requirements

| ID | Requirement |
|---|---|
| SEC-ID-01 | The API shall reject any request whose token fails signature, issuer or lifetime validation, returning 401 without disclosing which check failed. |
| SEC-ID-02 | The API shall resolve organisation membership only from the local user mirror record, and shall never infer organisation from any token claim, request content, header or path parameter. |
| SEC-ID-03 | Every entity that belongs to an organisation shall carry `OrganizationId` and shall be subject to an EF Core global query filter derived from the request context. |
| SEC-ID-05 | No token, credential or secret shall be written to any log, error message, audit record, telemetry payload or repository file. |
| SEC-ID-07 | The React client shall not persist access tokens to web storage. |
| SEC-ID-08 | CORS shall permit only the configured origins of the deployed React application. |
| SEC-ID-09 | All authentication and authorisation outcomes — success, failure and denial — shall be recorded with subject, organisation, endpoint and timestamp. |
| SEC-ID-10 | The agent service principal shall be denied every write permission by policy, and this denial shall be covered by an automated authorisation test. |
| SEC-ID-12 | A deactivated local user shall be denied access on their next request even if their token remains within its validity period. |
