---
sidebar_position: 2
---

# Domain Model

CoreGrid's domain model implements a normalised relational schema in PostgreSQL via Entity Framework Core, combining foreign-key-backed custom attribute definitions with JSONB storage for dynamic agent workflow execution state.

## Conceptual Data Model

```
                        ┌───────────────┐
                        │ Organizations │  (exactly one row per deployment;
                        └───┬───────┬───┘   the root of every query filter)
           ┌────────────────┘       └────────────────┐
           ▼                                         ▼
    ┌─────────────┐                            ┌───────────┐
    │ Departments │───────────┐                │   Users   │ (mirror; no
    └──────┬──────┘           │                └─────┬─────┘  credentials)
           ▼                  │                      │
    ┌─────────────┐           │                      │ actor on every
    │  Locations  │           │                      │ lifecycle record
    └──────┬──────┘           │                      │
           │   ┌──────────────────────┐              │
           │   │   AssetCategories    │              │
           │   └──────────┬───────────┘              │
           │              ▼                          │
           │   ┌──────────────────────┐              │
           │   │     AssetTypes       │              │
           │   └──────────┬───────────┘              │
           │              ▼                          │
           │   ┌────────────────────────────────┐    │
           │   │  AssetAttributeDefinitions     │    │
           │   └────────────────┬───────────────┘    │
           │                    │                    │
           └────────┬───────────┘                    │
                    ▼                                │
            ┌───────────────┐   1:N   ┌──────────────────────────┐
            │    Assets     │────────▶│  AssetAttributeValues    │
            └───┬─┬─┬─┬─┬─┬─┘         └──────────────────────────┘
                │ │ │ │ │ │
   ┌────────────┘ │ │ │ │ └──────────────┐
   ▼              ▼ │ │ ▼                ▼
 Maintenance  Transfers│ AssetHistory  AgentWorkflows
 Records          │    │        │              │
                  │    ▼        │              ├──▶ AgentExecutionSteps
                  │ Disposals   │              └──▶ AgentApprovals
                  │             │
                  ▼             ▼
        AuditVerifications   Discrepancies ◀── VerificationCampaigns

        AuditLogs   (append-only; references organisation, user, entity)
        Notifications (in-app notifications and dispatch records)
        OrganizationPolicies (thresholds consumed by rules and the Policy Agent)
```

## Entity Inventory

| Entity | Purpose | Key Relationships |
|---|---|---|
| `Organization` | Customer deployment record — one row per self-hosted deployment; root of all query filters. | 1:N Departments, Users, AssetCategories, OrganizationPolicies |
| `User` | Local mirror of a ThunderID identity; holds no credentials. | N:1 Organization, N:1 Department; referenced by all lifecycle records |
| `Department` | Business unit owning assets and holding budgets. | N:1 Organization; 1:N Locations, Assets, Users |
| `Location` | Physical place where an asset is held. | N:1 Department; 1:N Assets |
| `AssetCategory` | Top-level grouping of asset types for reporting and aggregation. | N:1 Organization; 1:N AssetTypes |
| `AssetType` | Classification carrying default useful life and maintenance intervals. | N:1 AssetCategory; 1:N AssetAttributeDefinitions, Assets |
| `AssetAttributeDefinition` | Declares a custom field for an asset type (text, number, date, boolean, select). | N:1 AssetType; 1:N AssetAttributeValues |
| `Asset` | Asset master record, lifecycle status, condition, and computed residual value. | N:1 AssetType, Department, Location; 1:N lifecycle records |
| `AssetAttributeValue` | Value an asset holds for one custom attribute definition. | N:1 Asset, N:1 AssetAttributeDefinition |
| `AssetHistory` | Append-only chronology of all state changes for an asset. | N:1 Asset, N:1 User |
| `MaintenanceRecord` | Corrective or preventive maintenance work order with status and costs. | N:1 Asset, N:1 User (reporter, assignee) |
| `MaintenanceAttachment` | Photographic evidence attached to a maintenance record (Cloudflare R2). | N:1 MaintenanceRecord |
| `AssetTransfer` | Movement of an asset between departments or locations with scan confirmation. | N:1 Asset, Department (from, to), User (requester, approver, receiver) |
| `DisposalRequest` | Proposal to retire/condemn an asset with evidenced approval. | N:1 Asset, N:1 User (requester, approver) |
| `VerificationCampaign` | Scoped, time-bound physical audit exercise. | N:1 Organization; 1:N AuditVerifications |
| `AuditVerification` | Assertion about an asset's presence and condition during a campaign. | N:1 Campaign, Asset, User |
| `Discrepancy` | Recorded divergence between physical reality and the asset register. | N:1 AuditVerification, Asset, User (raiser, resolver) |
| `AuditLog` | Immutable, append-only record of every state-changing operation. | N:1 Organization, User; polymorphic entity reference |
| `OrganizationPolicy` | Configurable thresholds consumed by business rules and the Policy Compliance Agent. | N:1 Organization, optional N:1 AssetType |
| `AgentWorkflow` | Durable state and execution graph of an AI evaluation. | N:1 Asset, User; 1:N AgentExecutionSteps, AgentApprovals |
| `AgentExecutionStep` | Step execution record within an AI workflow. | N:1 AgentWorkflow |
| `AgentApproval` | Human officer decision on a paused workflow. | N:1 AgentWorkflow, N:1 User |
| `Notification` | In-app user notification record with read status. | N:1 Organization, N:1 User |

## Asset Lifecycle State Machine

Every asset moves through a strictly guarded state machine. Invalid transitions are rejected at the API layer with deterministic validation errors.

```
                              ┌──────────────┐
        register ────────────▶│    ACTIVE    │◀──────────┐
                              └──┬───┬───┬───┘           │
                                 │   │   │               │ complete
            transfer requested   │   │   │ maintenance   │
                    ┌────────────┘   │   └───────────┐   │
                    ▼                │               ▼   │
         ┌────────────────────┐      │      ┌──────────────────┐
         │ TRANSFER_REQUESTED │      │      │ UNDER_MAINTENANCE│
         └─────────┬──────────┘      │      └──────────────────┘
            approve│  reject         │ condemn
                   ▼                 ▼
         ┌────────────────────┐   ┌──────────────┐
         │  IN_TRANSIT        │   │  CONDEMNED   │
         └─────────┬──────────┘   └──────┬───────┘
           confirm │                     │ disposal requested
            receipt│                     ▼
                   │            ┌─────────────────────┐
                   └───────────▶│ DISPOSAL_REQUESTED  │
                     back to    └──────┬──────────┬───┘
                      ACTIVE    approve│          │reject
                                       ▼          └────▶ back to CONDEMNED
                                ┌──────────────┐
                                │   DISPOSED   │   terminal - no further
                                └──────────────┘   transition permitted
```

## Storage Strategies

### Custom Attributes (Attribute-Value Model)
CoreGrid adopts an explicit `AssetAttributeValues` relational table bound by foreign keys to `AssetAttributeDefinitions`. This guarantees that:
- Every attribute value is strictly validated against its definition's data type, constraints, and select options.
- Attribute queries, filtering, and indexing are fully type-safe.
- Definition renames or updates do not create orphaned or inconsistent JSON keys.

### Agent Workflow State (JSONB)
Workflow state — including step plans, agent outputs, tool call traces, and policy validation results — is stored in structured JSONB columns on `AgentWorkflows`. This allows flexible, variable-shape execution traces while maintaining single-query snapshot retrieval.

## Data Integrity and Concurrency
- **Tenant Isolation:** Every organisation-scoped table carries `OrganizationId` with non-clustered indexes and EF Core global query filters.
- **Optimistic Concurrency:** Concurrent edits on assets are detected using PostgreSQL's system column `xmin` as a concurrency token, preventing lost updates during field verifications.
- **Append-Only History:** `AuditLogs` and `AssetHistory` tables are strictly append-only; update and delete operations are prohibited.
- **Soft Deletion & Retention:** Disposed assets and deactivated users are permanently retained to maintain historical referential integrity.
