---
sidebar_position: 2
---

# Identity and Access

CoreGrid delegates authentication and the user directory to a standards-based identity provider (OpenID
Connect / OAuth 2.0), and keeps authorisation — what a signed-in user is allowed to do — inside its own API.

## Why authentication is delegated

- **No credential risk.** CoreGrid stores no passwords and no password hashes. The most damaging class of
  breach for a system of record — credential disclosure — is structurally impossible, because credentials
  never enter the application boundary.
- **Isolation by deployment, not by database row.** Each customer runs their own instance — their own API,
  their own database, their own identity provider. There is no cross-customer boundary to get wrong, because
  no two customers ever share infrastructure.
- **Standards, not proprietary integration.** The API validates tokens against a published key set. Claim
  names are isolated in a single mapping component, so switching identity providers is a small, contained
  change.
- **Capabilities that don't need to be rebuilt.** Multi-factor authentication, password policy, account
  recovery and session termination are handled by the identity provider rather than reimplemented.

## Organisation and user model

Each deployment holds exactly one organisation record. A customer's Administrator invites the rest of their
users into it.

```
   ONE DEPLOYMENT — self-hosted per customer: its own API,
   its own PostgreSQL, its own identity-provider instance.

   IDENTITY PROVIDER (this customer only)
   │
   └── Users:  a.silva · j.fernando · n.perera · …
         Role assignments: Administrator · Inventory Officer · Auditor · Staff

   COREGRID DATABASE
   Organization  (exactly one row — this customer)
        │
        ├──1:N── Departments ──1:N── Locations      (planned)
        └──1:N── Users   (mirrors the identity provider's user)
                   │
                   └── Role  (Administrator · Inventory Officer · Auditor · Staff)
```

A second customer is a second, independent deployment of this same diagram — not a second row inside this
one.

| Concept | Owned by | Reason |
|---|---|---|
| User identity and credentials | Identity provider exclusively | Credentials never enter the application boundary. |
| Role assignment | Identity provider, mirrored into CoreGrid at sign-in | Roles must be consistent across web and mobile and available at token-validation time. |
| Department and location | CoreGrid database | Business structure, frequently reconfigured, referenced by business rules. |
| Effective permission for an operation | CoreGrid's own policy layer | Depends on domain state (asset status, workflow position) the identity provider doesn't hold. |

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
  8  Every database query is scoped to OrganizationId automatically —
     isolation is enforced by the data layer, not left to each query.
```

Step 8 is what makes cross-organisation data disclosure structurally impossible rather than a matter of
remembering a filter: it's applied once, centrally, in the data-access layer.

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

Two properties of this table are load-bearing: an Auditor cannot create or amend an asset, which is what
makes an audit finding independent evidence; and an Administrator cannot confirm physical receipt of a
transfer, because that's an assertion about the physical world only the receiving officer can truthfully
make. See [Roles and Permissions](../user-manual/roles-permissions.md) in the User Manual for what each role
experiences day to day.

## Session handling

- Access tokens are short-lived, so a revoked or changed permission takes effect quickly.
- Refresh tokens rotate on use; a replayed refresh token invalidates the whole token family.
- The web app holds its access token in memory only — never in browser storage.
- The mobile app holds its refresh token in platform-secure storage (Android Keystore).
- Signing out revokes the refresh token and terminates the identity-provider session, so the next sign-in
  genuinely re-authenticates.
