---
sidebar_position: 3
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

Each deployment holds exactly one organisation record. A customer's Administrator creates accounts for the
rest of their users.

[![CoreGrid organisation and user model: one self-hosted deployment per customer with its own ThunderID and database. ThunderID holds accounts and credentials; the CoreGrid database holds one Organization with Departments, Locations and mirrored Users. The API resolves the token subject to the Users row on every request, and the Administrator creates accounts in ThunderID through SCIM.](./img/org-user-model.png)](./img/org-user-model.png)

A second customer is a second, independent deployment of this same diagram - not a second row inside this
one.

| Concept | Owned by | Reason |
|---|---|---|
| User identity and credentials | Identity provider exclusively | Credentials never enter the application boundary. |
| Role assignment | CoreGrid `Users` table (seeded from the token on first sign-in) | The middleware replaces the token's `roles` claim with the mirrored role on every request, so a role change by the Administrator applies immediately on web and mobile. |
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
| First-run Setup | `POST /api/setup/complete` creates the deployment's single organisation and its first Administrator (account in ThunderID, mirror in CoreGrid). |
| Administrator creates a user | The API calls ThunderID through SCIM to create the account with the chosen initial password and role, then creates the active mirror record with the returned subject id. |
| First sign-in without a mirror | If the token carries email, given name, family name and a valid role, the API creates the mirror in the deployment's organisation on the first request. Otherwise the request is refused with 401. |
| Subsequent requests | Email and names are refreshed from the token when they differ. The role is **not** - it is held in CoreGrid. |
| Administrator changes role or department | Updated in the CoreGrid mirror only and effective on the next request. The last active Administrator cannot be demoted. |
| Administrator deactivates a user | The mirror is marked inactive and the next request is refused with 401, even while the token is still valid. The account in ThunderID is left as it is. The last active Administrator cannot be deactivated, and nobody can deactivate themselves. |
| Administrator resets a password | The new password is forwarded to ThunderID and never stored or logged. |
| User leaves | The mirror is retained (inactive), never hard-deleted, because audit and lifecycle history reference it. |

Every change to a mirror record is captured by the generic audit interceptor like any other entity change.

## Token validation

Every authenticated request runs through the same sequence:

```
  1  Extract the bearer token from the Authorization header.
  2  Verify its signature against the identity provider's published keys.
  3  Validate issuer, expiry and not-before.
  4  Resolve the token subject (sub) to the local user record - once per
     request, in RoleEnrichmentMiddleware; create the mirror if missing.
     → no active local user  ⇒  401 Unauthorized.
  5  Read OrganizationId from that local user record.
  6  Replace the token's roles claim with the role held on the local record.
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
| Verify assets | No | Yes | Yes | Yes |
| Request maintenance | Yes | Yes | No | Yes |
| Manage maintenance | No | Yes | No | Yes |
| Request transfer | No | Yes | No | Yes |
| Approve transfer | No | No | No | Yes |
| Confirm transfer receipt | No | Yes (own department) | No | Yes |
| Request disposal | No | Yes | No | Yes |
| Approve disposal | No | No | No | Yes |
| View audit campaigns | No | Yes | Yes | Yes |
| Manage audit campaigns | No | No | Yes | Yes |
| Resolve discrepancies | No | No | Yes | Yes |
| Read audit log | No | No | Yes | Yes |
| Manage organisation configuration | No | No | No | Yes |
| Manage users | No | No | No | Yes |
| Initiate AI evaluation | No | Yes | No | Yes |
| Approve AI recommendation | No | No | No | Yes |
| Generate reports | No | Yes | Yes | Yes |

Three properties of this table are load-bearing: an Auditor cannot create or amend an asset, which is what
makes an audit finding independent evidence; an Inventory Officer can only confirm receipt of a transfer into
their own department, because that is an assertion about the physical world the receiving side has to make;
and the agent service principal can only read - asset reads, workflow reads and the agent-tool routes, with
every write policy denying it - which is the enforcement point behind the rule that agents advise but never
decide.

Staff are the only role restricted to their own department's data; every other role sees the whole
organisation.

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
to ThunderID. This removes an entire class of vulnerability from the CoreGrid codebase. Setup's creation of
the first Administrator, an Administrator creating a user (`POST /api/users`) and the Administrator password
reset (`POST /api/users/{id}/reset-password`) are the only places where a password crosses the CoreGrid API.
All three forward it directly to ThunderID and never persist or log it.

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
