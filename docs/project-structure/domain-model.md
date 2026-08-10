---
sidebar_position: 2
---

# Domain Model

## Implemented today

Two entities and one enumeration currently exist in the backend, forming the identity foundation everything
else builds on.

**`Organization`** — the customer record for a deployment. Exactly one row exists per deployment; the
[Setup](../user-manual/organization-setup.md) flow creates it once and refuses to create a second.

| Field | Type | Notes |
|---|---|---|
| `Id` | Guid | Primary key |
| `Name` | string | The customer's organisation name |
| `CreatedAt` | DateTimeOffset | |
| `Users` | collection | The organisation's users |

**`User`** — a local mirror of an identity-provider account. Holds no credentials; exists for referential
integrity (every asset, maintenance record and audit entry will reference a user), query performance, and
historical accuracy (a past audit record still shows who acted even after that person leaves).

| Field | Type | Notes |
|---|---|---|
| `Id` | Guid | Primary key |
| `OrganizationId` | Guid | Foreign key to `Organization` |
| `ExternalSubjectId` | string | The identity provider's subject claim this record mirrors |
| `Email`, `GivenName`, `FamilyName` | string | Display identity |
| `Role` | `CoreGridRole` | See below |
| `IsActive` | bool | Deactivated users are retained, never hard-deleted |
| `CreatedAt` | DateTimeOffset | |

**`CoreGridRole`** — an enumeration of the four application roles: `Staff`, `InventoryOfficer`, `Auditor`,
`Administrator`. See [Roles and Permissions](../user-manual/roles-permissions.md) for what each can do.

## Planned entities

These are specified but not yet implemented. They follow the same pattern — plain EF Core entities scoped to
`OrganizationId` — as the codebase grows into the feature set described in [Planned Features](../planned-features.md).

| Entity | Purpose |
|---|---|
| `Department` | A business unit that owns assets and holds budgets; referenced by transfer and approval rules. |
| `Location` | A place within a department — store, workshop, office, ward. |
| `AssetCategory` | Top-level grouping of asset types, for reporting. |
| `AssetType` | A configurable asset definition: name, code, default useful life, default maintenance interval. |
| `AttributeDefinition` | A custom field on an asset type — name, data type, required flag, validation rule, display order. |
| `Asset` | The asset master record: identity, status, condition, location, custom attribute values, computed residual value. |
| `MaintenanceRecord` | A fault report or scheduled maintenance item, tracked from request through completion. |
| `TransferRequest` | A request to move an asset between departments, with approval and physical-receipt confirmation. |
| `DisposalRequest` | A request to retire a condemned asset, with evidenced approval. |
| `VerificationCampaign` / `Discrepancy` | A scoped audit exercise and the differences it finds between the register and physical reality. |
| `WorkflowRun` | The persisted state of one AI decision-support evaluation. |

## Asset lifecycle (planned)

Once the asset entity lands, every asset moves through a guarded state machine — no transition happens
silently, and an invalid one is rejected rather than ignored.

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
                                │   DISPOSED   │   terminal — no further
                                └──────────────┘   transition permitted
```
