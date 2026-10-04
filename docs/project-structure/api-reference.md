---
sidebar_position: 3
---

# API Reference

The authoritative, generated contract is published as OpenAPI/Swagger by the running API at `/swagger`. This page provides a comprehensive summary of all API endpoints across the system, organised by component area with their required authorisation policies and access controls. All list endpoints accept standard paging, sorting, search, and filter parameters.

## 1. Identity, Setup, Configuration and Users

| Method and Route | Purpose | Authorisation |
|---|---|---|
| `GET /api/setup/status` | Whether first-run Setup has been completed. | Anonymous |
| `POST /api/setup/complete` | Create the deployment's single `Organization` and its first `Administrator`. Refused once an organisation exists. | Anonymous (rate-limited) |
| `GET /api/me` | Resolved profile: user, organisation, department, role, and effective permissions. | Authenticated |
| `GET /api/departments` | List departments with search and pagination. | Read roles |
| `POST /api/departments` · `PUT /api/departments/{id}` | Create / amend a department. | `CanManageConfiguration` |
| `PATCH /api/departments/{id}/deactivate` · `/activate` | Deactivate (refused if non-disposed assets reference it) / reactivate. | `CanManageConfiguration` |
| `GET, POST /api/locations` · `PUT /api/locations/{id}` · `PATCH …/deactivate`, `…/activate` | Manage physical locations within departments. | read: Read roles; write: `CanManageConfiguration` |
| `GET /api/organization-policies` · `GET /{id}` · `POST` · `PUT /{id}` | Read and configure policy thresholds (org-wide and per-asset-type overrides). | `CanManageConfiguration` |
| `GET /api/users` | List users with filtering, search, and pagination. | Administrator, Inventory Officer, Auditor |
| `POST /api/users` | Provision a user via ThunderID and create the local mirror record. | `CanManageUsers` |
| `PATCH /api/users/{id}` | Update user role or assigned department. | `CanManageUsers` |
| `PATCH /api/users/{id}/deactivate` · `/activate` | Deactivate (refused for the last active Administrator) / reactivate. | `CanManageUsers` |
| `POST /api/users/{id}/reset-password` | Trigger password reset through ThunderID. | `CanManageUsers` |

## 2. Asset Configuration and Registry (Component A)

| Method and Route | Purpose | Authorisation |
|---|---|---|
| `GET /api/asset-categories` · `GET /{id}` | List / read top-level asset categories. | Read roles |
| `POST`, `PUT /{id}`, `DELETE /{id}`, `PATCH /{id}/activate` on `/api/asset-categories` | Manage asset categories (delete performs soft deactivation). | `CanManageConfiguration` |
| `GET /api/asset-types` · `GET /{id}` · `GET /{id}/attributes` | List / read asset types and their attribute definitions. | Read roles |
| `POST`, `PUT /{id}`, `DELETE /{id}`, `PATCH /{id}/activate` on `/api/asset-types` | Manage asset types (useful life, maintenance interval). | `CanManageConfiguration` |
| `POST /api/asset-types/{id}/attributes` · `PUT`, `DELETE`, `PATCH …/activate` on `/{attributeId}` | Manage custom attribute definitions and display ordering. | `CanManageConfiguration` |
| `GET /api/assets` | Search, filter, sort, and paginate assets (including custom attribute filters). | `CanReadAssets` |
| `GET /api/assets/{id}` | Asset details with attribute values and computed residual value. | `CanReadAssets` |
| `POST /api/assets` | Register an asset, validate custom attributes, and generate code/QR payload. | `CanManageAssets` |
| `PUT /api/assets/{id}` | Amend asset master record; records field changes in asset history. | `CanManageAssets` |
| `PATCH /api/assets/{id}/condition` | Record a condition update on the 5-point scale. | `CanManageAssets` |
| `GET /api/assets/qr/{code}` | Resolve a scanned or manually entered asset code. | `CanReadAssets` |
| `GET /api/assets/organization-code` | Get organisation prefix used in asset codes and QR labels. | `CanReadAssets` |
| `GET /api/assets/{id}/history` | Ordered, append-only lifecycle event chronology. | `CanReadAssets` |
| `POST /api/assets/{id}/verify` | Record physical verification and reconcile against the register. | `CanVerifyAssets` |

## 3. Maintenance and Notifications (Component B)

| Method and Route | Purpose | Authorisation |
|---|---|---|
| `GET /api/maintenance` | List maintenance work orders with status, priority, and date filters. | Read roles (Staff department-scoped) |
| `GET /api/maintenance/{id}` | Maintenance record details with temporary signed photo URLs. | Read roles |
| `GET /api/maintenance/my-reports` | List fault reports raised by the current caller. | Staff, Inventory Officer |
| `POST /api/maintenance/faults` | Submit a fault report with condition and optional photo. | `CanRequestMaintenance` |
| `POST /api/maintenance/photos` | Upload photographic evidence (stored privately in Cloudflare R2). | `CanRequestMaintenance` (rate-limited) |
| `POST /api/maintenance` | Create a corrective or preventive maintenance record directly. | Inventory Officer, Administrator |
| `PUT /api/maintenance/{id}` | Amend work order details (type, priority, description). | `CanManageMaintenance` |
| `POST /api/maintenance/{id}/approve` | Approve and assign work order with estimated cost. | `CanManageMaintenance` |
| `POST /api/maintenance/{id}/start` | Begin work; transitions asset status to `UNDER_MAINTENANCE`. | `CanManageMaintenance` |
| `POST /api/maintenance/{id}/complete` | Complete record with actual cost and resulting condition in a single transaction. | Inventory Officer |
| `POST /api/maintenance/{id}/cancel` | Cancel work order with recorded justification. | `CanManageMaintenance` |
| `GET /api/notifications` · `GET unread-count` · `PATCH {id}/read` · `PATCH read-all` | Access caller's in-app notifications and mark read. | `CanReadNotifications` |

## 4. Transfers and Disposals (Component C)

| Method and Route | Purpose | Authorisation |
|---|---|---|
| `POST /api/transfers` | Raise an inter-department or inter-location transfer request. | `CanRequestTransfer` |
| `GET /api/transfers` · `GET /{id}` | List / view transfer requests and their approval statuses. | `CanReadAssets` (Staff department-scoped) |
| `GET /api/assets/{assetId}/transfers` | Transfer history for a specific asset. | `CanReadAssets` |
| `POST /api/transfers/{id}/approve` | Approve transfer; transitions asset status to `IN_TRANSIT`. | `CanApproveTransfer` |
| `POST /api/transfers/{id}/reject` | Reject transfer with justification; returns asset to `ACTIVE`. | `CanApproveTransfer` |
| `POST /api/transfers/{id}/confirm-receipt` | Confirm physical scan receipt; updates department and location custody. | `CanConfirmReceipt` |
| `POST /api/assets/{id}/condemn` | Condemn an asset with recorded justification and evidence. | `CanRequestDisposal` |
| `POST /api/disposals` | Raise a disposal request for a condemned asset. | `CanRequestDisposal` |
| `GET /api/disposals` · `GET /{id}` | List / view disposal requests with precondition verification results. | `CanReadAssets` |
| `POST /api/disposals/{id}/approve` | Precondition evaluation, separation of duties check, and final disposal. | `CanApproveDisposal` |
| `POST /api/disposals/{id}/reject` | Reject disposal request; asset returns to `CONDEMNED`. | `CanApproveDisposal` |
| `POST /api/disposals/{id}/request-revision` | Return disposal proposal for revision with reviewer comments. | `CanApproveDisposal` |

## 5. Verification, Audit and Reporting (Component D)

| Method and Route | Purpose | Authorisation |
|---|---|---|
| `GET /api/verification-campaigns` · `GET /{id}` | List / view audit verification campaigns. | `CanReadCampaigns` |
| `POST`, `PUT /{id}`, `DELETE /{id}` on `/api/verification-campaigns` | Manage campaigns (creation automatically provisions officer tasks). | `CanManageCampaigns` |
| `GET /api/verification-campaigns/{id}/report` · `/report/export` | Generate campaign audit report with PDF or CSV export. | `CanManageCampaigns` |
| `GET /api/verification-tasks` | Caller's assigned verification tasks sorted by due date. | `CanVerifyAssets` |
| `PATCH /api/verification-tasks/{id}/complete` | Assert asset presence, location, condition; automatically flags discrepancies. | `CanVerifyAssets` |
| `POST /api/verification-tasks/photos` | Upload discrepancy photographic evidence. | Auditor, Administrator, Inventory Officer |
| `POST /api/verification-tasks/{taskId}/discrepancies` | Manually raise an ad-hoc discrepancy. | Auditor, Administrator, Inventory Officer |
| `GET /api/discrepancies` | List and filter discrepancies across campaigns. | Auditor, Administrator |
| `PATCH /api/discrepancies/{id}/resolve` | Classify, evidence, and resolve discrepancies (register corrections, write-offs). | `CanResolveDiscrepancy` |
| `GET /api/audit-log` | Filterable, read-only audit log of all system state transitions. | `CanReadAuditLog` |
| `GET /api/reports/audit` · `/export` | Organisation-wide audit log export (PDF / CSV). | Auditor, Administrator |
| `GET /api/dashboard/summary` | Role-appropriate dashboard KPI cards and metrics. | `CanReadAssets` |
| `GET /api/dashboard/charts` | Aggregated visual analytics (condition breakdown, monthly spend). | Auditor, Administrator |

## 6. Agentic AI Decision Support

| Method and Route | Purpose | Authorisation |
|---|---|---|
| `POST /api/agent-workflows` | Initiate multi-agent evaluation (Planner → Maintenance → Budget → Policy). | `CanInitiateWorkflow` (rate-limited) |
| `GET /api/agent-workflows` · `GET /{id}` | List / view workflow execution records and current statuses. | Inventory Officer, Auditor, Administrator |
| `GET /api/agent-workflows/{id}/execution-summary` | Full auditable trace: step graph, agent outputs, deterministic gates, approvals. | Inventory Officer, Auditor, Administrator |
| `POST /api/agent-workflows/{id}/run-maintenance-agent` | Re-run Maintenance Analysis node independently. | `CanInitiateWorkflow` |
| `POST /api/agent-workflows/{id}/run-budget-agent` | Re-run Budget Analysis node independently. | `CanInitiateWorkflow` |
| `POST /api/agent-workflows/{id}/run-policy-agent` | Re-run Policy Compliance node independently. | `CanInitiateWorkflow` |
| `POST /api/agent-workflows/{id}/evaluate` | Run deterministic policy validation against proposed recommendations. | `CanInitiateWorkflow` |
| `PATCH /api/agent-workflows/{id}/decide` | Human officer decision (Approve, Reject, Request Revision) on paused workflow. | `CanApproveWorkflow` (Administrator only) |
| `GET /api/agent-tools/*`, `POST /api/agent-tools/compute-depreciation` | Read-only agent analytical tools (also invoked in-process). | `CanReadAssets` |

## 7. System Endpoints

| Method and Route | Purpose | Authorisation |
|---|---|---|
| `GET /health` | Liveness and component health check (database, identity provider). | Anonymous |
| `GET /swagger` | Interactive OpenAPI documentation and schema explorer. | Anonymous |
