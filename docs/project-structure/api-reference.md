---
sidebar_position: 3
---

# API Reference

The authoritative, generated contract is published as OpenAPI/Swagger by the running API. This page is a
readable summary of the planned surface, organised by area. All list endpoints accept the standard paging,
sorting, search and filter parameters.

**Implemented today:** the Setup endpoints below. Everything else is the specified target surface — see
[Planned Features](../planned-features.md) for build status by area.

## Setup — *implemented*

| Method and route | Purpose | Auth |
|---|---|---|
| `GET /api/setup/status` | Reports whether this deployment still needs its first organisation and admin. | None — the only unauthenticated endpoints in the API, and only while zero organisations exist. |
| `POST /api/setup/complete` | Creates the deployment's one `Organization` row and its first `Administrator`. Refuses if an organisation already exists. | None |

## Identity, configuration and users — *planned*

| Method and route | Purpose | Permission |
|---|---|---|
| `GET /api/me` | Resolved profile: user, organisation, department, roles, effective permissions. | Authenticated |
| `GET/POST/PUT /api/departments` | Manage departments. | read: authenticated; write: manage configuration |
| `GET/POST/PUT /api/locations` | Manage locations within a department. | read: authenticated; write: manage configuration |
| `GET/POST/PUT /api/asset-categories`, `/api/asset-types` | Manage asset categories and types. | read: authenticated; write: manage configuration |
| `GET/POST/PUT/DELETE /api/asset-types/{id}/attributes` | Manage custom attribute definitions for a type. | manage configuration |
| `GET/PUT /api/policies` | Read and set organisation policy thresholds. | manage configuration |
| `GET /api/users`, `POST /api/users/invite`, `PUT /api/users/{id}`, `POST /api/users/{id}/deactivate` | List, invite, amend and deactivate users. | manage users |

## Assets — *planned*

| Method and route | Purpose | Permission |
|---|---|---|
| `GET /api/assets`, `GET /api/assets/{id}` | List and read assets. | view assets |
| `POST /api/assets`, `PUT /api/assets/{id}` | Register and amend an asset. | create / update assets |
| `GET /api/assets/qr/{code}` | Resolve a scanned or manually entered asset code. | view assets |
| `GET /api/assets/{id}/qr-label` | Printable QR label payload. | view assets |
| `GET /api/assets/{id}/history` | Ordered lifecycle chronology. | view assets |
| `POST /api/assets/{id}/verify` | Record a physical verification and reconcile against the register. | verify assets |
| `POST /api/assets/{id}/condition` | Record a condition change. | update assets |

## Maintenance — *planned*

| Method and route | Purpose | Permission |
|---|---|---|
| `GET /api/maintenance`, `GET /api/maintenance/{id}` | List and read maintenance records. | authenticated (scoped) |
| `POST /api/maintenance` | Report a fault or create a record. | request maintenance |
| `PUT /api/maintenance/{id}`, `/assign`, `/start`, `/complete`, `/cancel` | Amend, assign, start, complete or cancel a record. | manage maintenance |
| `POST /api/maintenance/{id}/attachments` | Upload photographic evidence. | request maintenance |

## Transfers and disposals — *planned*

| Method and route | Purpose | Permission |
|---|---|---|
| `GET/POST /api/transfers`, `GET /api/transfers/{id}` | List, raise and read transfer requests. | read: scoped; create: request transfer |
| `POST /api/transfers/{id}/approve` / `/reject` | Approve or reject a transfer. | approve transfer |
| `POST /api/transfers/{id}/confirm-receipt` | Confirm physical receipt by scan. | confirm receipt |
| `POST /api/assets/{id}/condemn` | Condemn an asset. | request disposal |
| `GET/POST /api/disposals`, `GET /api/disposals/{id}` | List, raise and read disposal requests. | read: scoped; create: request disposal |
| `POST /api/disposals/{id}/approve` / `/reject` / `/request-revision` | Decide a disposal request. | approve disposal |

## Audit, compliance and reporting — *planned*

| Method and route | Purpose | Permission |
|---|---|---|
| `GET/POST /api/campaigns` | List and create verification campaigns. | manage campaigns |
| `GET /api/campaigns/{id}/tasks`, `/progress` | Verification tasks and progress. | verify assets / manage campaigns |
| `GET/POST /api/discrepancies` | List and raise discrepancies. | read: audit log; create: verify assets |
| `POST /api/discrepancies/{id}/resolve` | Classify, evidence and close a discrepancy. | resolve discrepancies |
| `GET /api/audit-logs` | Filterable, read-only audit trail. | read audit log |
| `GET /api/reports/{type}`, `/export` | Generate and export reports. | generate reports |
| `GET /api/dashboard` | Role-appropriate indicators and chart series. | authenticated (scoped) |

## AI workflow and system — *planned*

| Method and route | Purpose | Permission |
|---|---|---|
| `POST /api/workflows/asset-evaluation` | Initiate an AI evaluation; returns a workflow identifier immediately. | initiate workflow |
| `GET /api/workflows`, `/{id}`, `/{id}/execution-summary` | Status, detail and full auditable trace. | read workflow |
| `POST /api/workflows/{id}/approve` / `/reject` / `/request-revision` | Decide a paused workflow. | approve workflow |
| `GET /health` | Liveness and dependency status. | None |
| `GET /swagger` | OpenAPI documentation. | None |
