---
sidebar_position: 1
---

# CoreGrid Overview

CoreGrid is a configurable, self-hosted asset lifecycle management platform for institutional and
government assets. It replaces disconnected registers and manual processes with one role-controlled system
for asset registration, field identification, maintenance, transfers, disposals, compliance, and controlled
AI-assisted decisions.

Each customer runs their own self-hosted CoreGrid instance: their own web application, their own database,
their own identity provider. Nothing is shared between organisations.

## What CoreGrid is made of

| Part | Role |
|---|---|
| Web application (React 19, IBM Carbon Design System) | The management and control centre - administration, configuration, reporting, approvals. |
| Mobile application (Flutter) | The field operations app - QR scanning, verification, fault reporting, task execution. |
| API (ASP.NET Core 10, .NET 10) | The single authoritative backend. Every business rule, permission check, audit record and AI workflow lives here. |
| Database (PostgreSQL 15+) | Durable storage for configuration, assets, workflow state and audit history. JSONB with GIN indexing for the configurable-attribute model. |
| AI decision-support agents (in-process) | Four specialised agent nodes (Planner, Maintenance Analysis, Budget Analysis, Policy Compliance) that analyse assets and propose recommendations for a human officer to approve. |
| Identity provider (ThunderID) | Authenticates every user via OpenID Connect / OAuth 2.0 and issues the tokens the API validates. |
| Object storage (Cloudflare R2) | Private photo storage for maintenance and fault-report evidence. |

**Try it:** the [live demo](/demo) has a ready-made account for each role.

See the [User Manual](./user-manual/organization-setup.md) for how an administrator configures and runs
CoreGrid day to day.

## Function groups

| Group | Covers |
|---|---|
| Identity and access | Sign-in via ThunderID, four user roles, policy-based permissions, session handling. |
| Platform configuration | Departments, locations, asset categories, asset types, custom attributes, organisation policies. |
| Asset registry | Registration, QR identification, printable QR labels, search, lifecycle status, depreciation. |
| Maintenance | Fault reporting with photos, work orders, cost tracking, guarded status flow, completion. |
| Transfers | Moving an asset between departments with approval, physical receipt confirmation via QR scan. |
| Disposal | Condemning and retiring assets with evidenced approval and precondition checks. |
| Audit and compliance | Verification campaigns, automatic and manual discrepancies, the immutable audit log. |
| AI decision support | A four-agent workflow (Planner → Maintenance Analysis → Budget Analysis → Policy Compliance) that recommends repair, transfer or disposal, always reviewed by a person. |
| Analytics and reporting | Role-appropriate dashboards, exportable PDF/CSV reports, in-app notifications. |
| Mobile field operations | Flutter app for QR scanning, verification, fault reporting, condition updates and transfer receipt. |

## Technology highlights

- **Configurable, not custom-built.** The same platform serves transport fleets and hospital inventories —
  asset types and their attributes are configuration, not code changes.
- **AI that advises, never decides.** Agent recommendations go through deterministic validation and require
  explicit human approval before any high-impact action executes.
- **Zero credential risk.** CoreGrid stores no passwords; authentication is fully delegated to ThunderID.
- **In-process AI agents.** All four agent nodes run inside the API — no separate containers, no additional
  network surface to secure.

For what's built today versus what's coming, see [Planned Features](./planned-features.md). For how an
administrator configures and runs each of these day to day, see the [User Manual](./user-manual/organization-setup.md).
