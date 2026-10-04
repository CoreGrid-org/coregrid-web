---
sidebar_position: 2
---

# Domain Model

CoreGrid's domain model implements a normalised relational schema in PostgreSQL via Entity Framework Core, combining foreign-key-backed custom attribute definitions with JSONB storage for dynamic agent workflow execution state.

## Conceptual Data Model

[![CoreGrid conceptual data model: one Organization row scopes everything. Departments own Locations; Users optionally belong to a department. AssetCategories contain AssetTypes, which define custom AssetAttributeDefinitions and optional policy overrides. Assets are of a type, held by a department at a location, and have attribute values and append-only history. Per-asset records cover maintenance, transfers, disposals, verification tasks and discrepancies, and agent workflows with their steps and approvals. Audit log entries and notifications are cross-cutting.](../architecture/img/data-model.png)](../architecture/img/data-model.png)

## Entity Inventory

| Entity (table) | Purpose | Key Relationships |
|---|---|---|
| `Organization` | The customer deployment - exactly one row per self-hosted deployment; root of all query filters. | 1:N Users, Departments, Locations, AssetCategories, AssetTypes, OrganizationPolicies, Assets |
| `User` | Local mirror of a ThunderID identity (`ExternalSubjectId` = token `sub`), with one role and an active flag; holds no credentials. | N:1 Organization, optional N:1 Department; referenced as the actor on lifecycle records |
| `Department` | Business unit that holds assets. | N:1 Organization; 1:N Locations, Assets |
| `Location` | Physical place within a department where an asset is held. | N:1 Department; 1:N Assets |
| `AssetCategory` | Top-level grouping of asset types for reporting and aggregation. | N:1 Organization; 1:N AssetTypes |
| `AssetType` | Classification with a useful life (years) and an optional default maintenance interval. | N:1 AssetCategory; 1:N AssetAttributeDefinitions, Assets |
| `AssetAttributeDefinition` | Custom field for an asset type: TEXT, NUMBER, DATE, BOOLEAN or SELECT, with required flag, validation rule and display order. | N:1 AssetType; 1:N AssetAttributeValues |
| `Asset` | Asset master record: code, QR payload, status, condition, acquisition cost, residual value, repair count and cumulative maintenance cost. | N:1 AssetType, Department, Location; 1:N lifecycle records |
| `AssetAttributeValue` | Typed value (text, number, date or boolean) an asset holds for one attribute definition. | N:1 Asset, N:1 AssetAttributeDefinition |
| `AssetHistory` | Append-only chronology of lifecycle events for an asset, with previous and new values. | N:1 Asset, N:1 User (actor) |
| `MaintenanceRecord` | Fault report or corrective/preventive work order with status, estimated and actual cost, optional photo (R2 object key) and resulting condition. | N:1 Asset, N:1 User (reporter, assignee) |
| `AssetTransfer` | Movement of an asset between departments/locations with approval and receipt confirmation. | N:1 Asset, Department and Location (from, to), User (initiator, approver, confirmer) |
| `DisposalRequest` | Proposal to dispose of a condemned asset, with valuation and approval. | N:1 Asset, N:1 User (initiator, approver) |
| `VerificationCampaign` | Scoped, time-bound physical audit (by department, location, category or type). | N:1 Organization; 1:N VerificationTasks |
| `VerificationTask` | One asset to verify in a campaign: asserted presence, location and condition. | N:1 Campaign, Asset, User (assignee, completer) |
| `Discrepancy` | Divergence between the physical asset and the register, raised automatically or manually, then resolved. | N:1 Campaign, VerificationTask, Asset, User (raiser, resolver) |
| `AuditLogEntry` | Append-only record of every entity mutation, written by the audit interceptor. | N:1 Organization, User (actor); entity type + id reference |
| `OrganizationPolicy` | Thresholds consumed by business rules and the Policy Compliance Agent (repair-to-replace ratio, minimum service life, confidence floor and more). | N:1 Organization, optional N:1 AssetType |
| `AgentWorkflow` | Durable state of an AI evaluation, scoped to an asset type and optionally one asset; JSONB plan, outputs, tool calls and validation result. | N:1 AssetType, optional N:1 Asset, N:1 User; 1:N AgentExecutionSteps, AgentApprovals |
| `AgentExecutionStep` | One agent step: input hash, output summary, duration and error. | N:1 AgentWorkflow |
| `AgentApproval` | Administrator decision on a paused workflow, with reason and a workflow snapshot. | N:1 AgentWorkflow, N:1 User |
| `Notification` | In-app notification with read status, linked to a related record by type and id. | N:1 Organization, N:1 User (recipient) |

## Asset Lifecycle State Machine

Every asset moves through a guarded state machine. The feature services check the current status before each transition and reject invalid ones with a `409 Conflict` (`invalid_status_transition`). Completing maintenance with the resulting condition `UNSERVICEABLE` moves the asset straight to `CONDEMNED`; any other completion returns it to `ACTIVE`. A rejected transfer also returns the asset to `ACTIVE`.

[![CoreGrid asset lifecycle state machine: a registered asset starts ACTIVE. It moves to UNDER_MAINTENANCE when maintenance starts and back to ACTIVE when completed, or to CONDEMNED if completed as UNSERVICEABLE. A transfer request moves it to TRANSFER_REQUESTED; rejection returns it to ACTIVE, approval moves it to IN_TRANSIT, and confirmed receipt returns it to ACTIVE in the new department and location. A condemned asset can be put up for disposal (DISPOSAL_REQUESTED); rejection returns it to CONDEMNED and approval makes it DISPOSED, which is terminal.](../architecture/img/asset-lifecycle.png)](../architecture/img/asset-lifecycle.png)

## Storage Strategies

### Custom Attributes (Attribute-Value Model)
CoreGrid adopts an explicit `AssetAttributeValues` relational table bound by foreign keys to `AssetAttributeDefinitions`. This guarantees that:
- Every attribute value is strictly validated against its definition's data type, constraints, and select options.
- Attribute queries, filtering, and indexing are fully type-safe.
- Definition renames or updates do not create orphaned or inconsistent JSON keys.

### Agent Workflow State (JSONB)
Workflow state — including step plans, agent outputs, tool call traces, and policy validation results — is stored in structured JSONB columns on `AgentWorkflows`. This allows flexible, variable-shape execution traces while maintaining single-query snapshot retrieval.

## Data Integrity and Concurrency
- **Tenant Isolation:** Every organisation-scoped table carries `OrganizationId` and an EF Core global query filter. The four child tables without their own column (`AssetAttributeDefinitions`, `AssetAttributeValues`, `AgentExecutionSteps`, `AgentApprovals`) are filtered through their parent.
- **Optimistic Concurrency:** `AssetTransfers` and `DisposalRequests` use PostgreSQL's system column `xmin` as a concurrency token, so two people approving the same request at once cannot both succeed.
- **Append-Only History:** `AuditLogEntries` and `AssetHistory` are append-only; updates and deletes are rejected (covered by `AppendOnlyTests`).
- **Soft Deletion & Retention:** Disposed assets and deactivated users are permanently retained to maintain historical referential integrity.
