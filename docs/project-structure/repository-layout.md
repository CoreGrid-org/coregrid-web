---
sidebar_position: 1
---

# Repository Layout

The CoreGrid repository is organised as a full-stack solution containing the backend API, the frontend web application, automated test suites, infrastructure configurations, developer scripts, and technical specifications.

```
CoreGrid/
├── backend/                       ASP.NET Core 10 Web API
│   ├── Data/                      EF Core DbContext, entity configurations, interceptors
│   ├── Domain/                    Domain entities, value objects, and enumerations
│   │   ├── Agents/                AgentWorkflow, AgentExecutionStep, AgentApproval
│   │   ├── Assets/                Asset, AssetAttributeDefinition, AssetAttributeValue, AssetHistory
│   │   ├── Audit/                 AuditLog, AuditVerification, VerificationCampaign, Discrepancy
│   │   ├── Identity/              User, CoreGridRole, Organization
│   │   ├── Maintenance/           MaintenanceRecord, MaintenanceAttachment
│   │   ├── Notifications/         Notification, NotificationChannel
│   │   ├── OrgConfig/             Department, Location, AssetCategory, AssetType, OrganizationPolicy
│   │   └── Transfers/             AssetTransfer, DisposalRequest
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
│   │   ├── Shared/                Paging, validation envelopes, currentUser providers
│   │   ├── Transfers/             Inter-department transfers and scan confirmations
│   │   ├── Users/                 User invitation, directory management, role changes
│   │   └── Verification/          Mobile field verification endpoints
│   ├── Migrations/                EF Core migration history and schema snapshots
│   ├── Program.cs                 Composition root: DI registration, middleware, auth pipeline
│   └── appsettings.json           Base configuration (secrets injected via environment variables)
│
├── backend.Tests/                 xUnit backend test suite
│   ├── AgentToolsServiceTests.cs  Validation of read-only agent tools
│   ├── AgentWorkflowServiceTests.cs End-to-end multi-agent evaluation workflow tests
│   ├── AppendOnlyTests.cs         Immutability tests for audit logs and asset histories
│   ├── AuthorizationMatrixTests.cs Role and policy permission enforcement tests
│   ├── AssetServiceTests.cs       Asset registration, status transitions, and validation
│   ├── StraightLineDepreciationTests.cs Financial depreciation formula verification
│   └── ...                        Unit and integration test suites
│
├── frontend/                      React 19 web application (IBM Carbon Design System)
│   ├── public/                    Static assets, branding, and icons
│   └── src/
│       ├── app/                   App shell, router definitions, layout providers
│       ├── features/              Feature modules (assets, maintenance, audit, agents, setup)
│       ├── shared/                Reusable Carbon UI components, hooks, utilities, API clients
│       └── styles/                Carbon theme integration and global styling
│
├── infra/                         Infrastructure and authentication configurations
│   └── thunderid/                 ThunderID OIDC client and role definitions
│
├── scripts/                       Developer and operational utilities
│   ├── db/                        Migration export and schema validation scripts
│   ├── perf/                      k6 load testing and agent latency benchmarks
│   └── thunderid/                 ThunderID provisioning scripts
│
└── docs/                          Technical specifications, SRS chapters, and ADRs
```

## Feature-Folder Convention (Backend)

The backend follows vertical feature slicing under `Features/`. Rather than dividing code into cross-cutting technical layers (`Controllers/`, `Services/`, `Models/`), each feature folder encapsulates its own controller, service logic, request models, and response DTOs:

- **Encapsulation:** Changes to a feature are isolated within its directory.
- **Traceability:** Corresponds directly to functional requirement specifications (FRs).
- **Maintainability:** Reduces coupling across distinct business workflows.

## Three Tiers of Configuration

1. **Platform Level:** Identity provider integration, API contract, database schema migrations, and security architecture are managed in code and released through version control.
2. **Organisation Level:** Departments, locations, categories, asset types, custom attribute definitions, policy thresholds, and user roles are configured dynamically by the customer's Administrator.
3. **Operational Level:** Day-to-day records — assets, maintenance work orders, transfer receipts, audit campaigns, and AI evaluations — are generated through standard web and mobile operations.
