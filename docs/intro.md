---
sidebar_position: 1
---

# CoreGrid Overview

CoreGrid is an asset lifecycle management platform for organisations that manage large numbers of physical
assets — vehicles, equipment, machinery — across multiple departments and locations. It replaces spreadsheets
and paper records with one connected system covering registration, maintenance, transfers, disposal, audit
and AI-assisted decision support.

Each customer runs their own self-hosted CoreGrid instance: their own web application, their own database,
their own identity provider. Nothing is shared between organisations.

## What CoreGrid is made of

| Part | Role |
|---|---|
| Web application (React) | The management and control centre — administration, configuration, reporting, approvals. |
| Mobile application (Flutter) | The field operations app — QR scanning, verification, fault reporting, task execution. |
| API (ASP.NET Core) | The single authoritative backend. Every business rule, permission check and audit record lives here. |
| Database (PostgreSQL) | Durable storage for configuration, assets, workflow state and audit history. |
| AI decision-support service | An internal agent workflow that analyses assets and proposes recommendations for a human officer to approve. |
| Identity provider | Authenticates every user and issues the tokens the API validates. |

See [Architecture](./architecture/overview.md) for how these fit together, and
[Project Structure](./project-structure/repository-layout.md) for how the codebase is organised.

## Function groups

| Group | Covers |
|---|---|
| Identity and access | Sign-in, roles, permissions, session handling. |
| Platform configuration | Departments, locations, asset categories, asset types, custom attributes. |
| Asset registry | Registration, QR identification, search, lifecycle status. |
| Maintenance | Fault reporting, work orders, cost tracking, completion. |
| Transfers | Moving an asset between departments with approval and confirmation. |
| Disposal | Condemning and retiring assets with evidenced approval. |
| Audit and compliance | Verification campaigns, discrepancies, the immutable audit log. |
| AI decision support | A four-agent workflow that recommends repair, transfer or disposal, always reviewed by a person. |
| Analytics and reporting | Dashboards, exportable reports, notifications. |

For what's built today versus what's coming, see [Planned Features](./planned-features.md). For how an
administrator configures and runs each of these day to day, see the [User Manual](./user-manual/organization-setup.md).
