---
sidebar_position: 1
---

# Repository Layout

The [CoreGrid repository](https://github.com/CoreGrid-org/CoreGrid) holds the backend API, the React web application, the backend test suite, infrastructure configuration, developer scripts and the specifications. The Flutter field app lives in its own repository, [coregrid-mobile](https://github.com/CoreGrid-org/coregrid-mobile).

```
CoreGrid/
├── backend/                       ASP.NET Core 10 Web API
│   ├── Data/                      CoreGridDbContext (configuration + query filters), Auditing/ interceptor
│   ├── Domain/                    Entities and constants (one shared CoreGrid.Api.Domain namespace)
│   │   ├── Agents/                AgentWorkflow, AgentExecutionStep, AgentApproval, action/verdict constants
│   │   ├── Assets/                Asset, AssetCategory, AssetType, AssetAttributeDefinition/Value, AssetHistory
│   │   ├── Audit/                 AuditLogEntry
│   │   ├── Identity/              Organization, User, CoreGridRole
│   │   ├── Maintenance/           MaintenanceRecord
│   │   ├── Notifications/         Notification, NotificationTypes
│   │   ├── OrgConfig/             Department, Location, OrganizationPolicy
│   │   ├── Transfers/             AssetTransfer, DisposalRequest, DisposalPreconditionResult
│   │   └── Verification/          VerificationCampaign, VerificationTask, Discrepancy
│   ├── Features/                  Feature-slice controllers, services, and DTOs
│   │   ├── AgentTools/            Read-only analytical tools exposed to AI agents
│   │   ├── Agents/                In-process agent orchestrator and specialised nodes
│   │   ├── Assets/                Asset lifecycle, custom attributes, QR codes, search
│   │   ├── Audit/                 Campaigns, physical verifications, discrepancies, audit log
│   │   ├── Dashboard/             Aggregated role-scoped metrics and chart series
│   │   ├── Disposals/             Condemnations, precondition checks, disposal workflows
│   │   ├── Identity/              ThunderID OIDC integration, mirror provisioning, auth handlers
│   │   ├── Maintenance/           Fault reporting, work orders, photo uploads
│   │   ├── Notifications/         In-app notification centre and dispatch services
│   │   ├── OrgConfig/             Departments, locations, categories, types, attributes, policies
│   │   ├── Setup/                 First-run deployment initialization and admin provisioning
│   │   ├── Shared/                Current user, auth policies, exceptions, paging, scoping, R2 storage, reporting, health
│   │   ├── Transfers/             Inter-department transfers and scan confirmations
│   │   ├── Users/                 User invitation, directory management, role changes
│   │   └── Verification/          Mobile field verification endpoints
│   ├── Migrations/                EF Core migration history and model snapshot
│   ├── db/                        Generated schema.sql and numbered SQL migration exports
│   ├── Program.cs                 Composition root: DI registration, middleware, auth pipeline
│   ├── Dockerfile                 Production image (listens on :8080)
│   └── .env.example               Every setting and secret, documented (copy to backend/.env)
│
├── backend.Tests/                 xUnit backend test suite
│   ├── AgentWorkflowServiceTests.cs End-to-end multi-agent evaluation workflow tests
│   ├── PolicyRuleEngineTests.cs   Deterministic policy rules PR-01 … PR-09
│   ├── QueryFilterTests.cs        Organisation isolation through global query filters
│   ├── AppendOnlyTests.cs         Immutability tests for audit logs and asset histories
│   ├── AuthorizationMatrixTests.cs Role and policy permission enforcement tests
│   ├── AssetServiceTests.cs       Asset registration, status transitions, and validation
│   ├── StraightLineDepreciationTests.cs Financial depreciation formula verification
│   └── ...                        Unit and integration test suites
│
├── frontend/                      React 19 web application (IBM Carbon Design System)
│   ├── public/                    Static assets, branding, and icons
│   ├── Dockerfile · nginx.conf    Production image: static build served by nginx
│   └── src/
│       ├── app/                   App.tsx - routes and role-guarded layouts
│       ├── features/              One folder per feature: assets, audit, auth, dashboard, maintenance,
│       │                          notifications, profile, reports, settings, setup, transfers, users, workflows
│       ├── shared/                components, hooks, lib (API client, validation), pages
│       ├── styles/                Carbon theme integration and global styling
│       └── test/                  Vitest + React Testing Library setup
│
├── infra/                         Infrastructure and authentication configurations
│   └── thunderid/                 ThunderID OIDC client and role definitions
│
├── scripts/                       Developer and operational utilities
│   ├── db/                        Migration export and schema validation scripts
│   ├── perf/                      k6 load testing, agent latency and slow-query reports
│   └── thunderid/                 ThunderID provisioning scripts
│
├── docs/                          SRS chapters, architecture decision records, setup guides
├── docker-compose.yml             Local ThunderID + PostgreSQL 16
├── setup.sh · Makefile            One-command local setup and common tasks
└── .github/workflows/ci.yml       Backend and frontend CI
```

## Feature-Folder Convention (Backend)

The backend follows vertical feature slicing under `Features/`: one folder per feature, each owning its controllers, services and DTOs. A small feature stays flat; a larger one splits into `Controllers/`, `Services/` and `DTOs/` subfolders inside its own folder, and registers its services through a `<Name>Module.cs`:

- **Encapsulation:** Changes to a feature are isolated within its directory.
- **Traceability:** Corresponds directly to functional requirement specifications (FRs).
- **Maintainability:** Reduces coupling across distinct business workflows.

## Three Tiers of Configuration

1. **Platform Level:** Identity provider integration, API contract, database schema migrations, and security architecture are managed in code and released through version control.
2. **Organisation Level:** Departments, locations, categories, asset types, custom attribute definitions, policy thresholds, and user roles are configured dynamically by the customer's Administrator.
3. **Operational Level:** Day-to-day records — assets, maintenance work orders, transfer receipts, audit campaigns, and AI evaluations — are generated through standard web and mobile operations.
