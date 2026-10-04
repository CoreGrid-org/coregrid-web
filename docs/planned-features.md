---
sidebar_position: 5
---

# Planned Features

CoreGrid v0.1.0 is the first baseline release. This page tracks what's live today against the full feature
set, grouped the same way as the [User Manual](./user-manual/organization-setup.md).

| Area | Status | Detail |
|---|---|---|
| Setup - first organisation and Administrator | **Live** | Provisioned at deployment - see [Getting Started](./user-manual/organization-setup.md). |
| Identity and access - sign-in, roles, sessions | **Live** | ThunderID authentication with role-based and organisation-scoped access control. See [Identity and Access](./architecture/identity-and-access.md). |
| Organisation configuration - departments, locations, categories, asset types, attributes, policies, users | **Live** | Department, location, user, policy, asset-category, asset-type, and attribute administration. See [Organisation Setup](./user-manual/organization-setup.md). |
| Asset registry - registration, QR identification, search, lifecycle status | **Live** | Configurable asset registration, unique codes, printable QR labels, mobile scanning, depreciation. See [Asset Registry](./user-manual/features/asset-registry.md). |
| Maintenance management - fault reporting, work orders, cost tracking | **Live** | Fault reporting with photos, guarded status flow, cost capture, per-asset history. See [Maintenance Management](./user-manual/features/maintenance-management.md). |
| Transfers - request, approval, physical confirmation | **Live** | Inter-department transfers with approval, scan-supported receipt confirmation. See [Transfers and Disposals](./user-manual/features/transfers-disposals.md). |
| Disposals - condemnation, evidenced approval | **Live** | Condemnation, precondition checks, approval/rejection/revision, terminal disposal state. See [Transfers and Disposals](./user-manual/features/transfers-disposals.md). |
| Audit and compliance - verification campaigns, discrepancies, audit log | **Live** | Campaign creation, field verification, automatic discrepancies, append-only audit logs. See [Audit and Compliance](./user-manual/features/audit-compliance.md). |
| AI decision support - four-agent evaluation and approval | **Live** | In-process Planner, Maintenance Analysis, Budget Analysis, and Policy Compliance agents with deterministic validation and human approval. See [AI Decision Support](./user-manual/features/ai-decision-support.md). |
| Analytics, reporting and notifications | **Live** | Role-appropriate dashboards, PDF/CSV export, in-app notification centre. See [Analytics and Reporting](./user-manual/features/analytics-reporting.md). |
| Mobile field operations (Flutter) | **Live** | QR scanning, verification, fault reporting, condition updates, transfer receipt. |

## Out of scope for v0.1.0

The following capabilities are documented as future-enhancement opportunities:

- Barcode generation
- GPS coordinate capture and GIS/map visualisation
- Generic document attachments
- Offline mobile synchronisation and deferred submission
- Push notifications
- Predictive computer-vision condition assessment
- ERP/financial-system integration
- Shared multi-tenant SaaS billing and self-service organisation signup
- Native iOS release package

These items are designed for but intentionally excluded from the baseline release. This page will be kept
current as each area ships.
