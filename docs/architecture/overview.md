---
sidebar_position: 1
---

# System Architecture

CoreGrid follows a layered, service-oriented architecture with a single authoritative backend. The structure
is deliberately conventional - the value of the system is in its domain model, its configurability and its
controlled use of AI agents, not in architectural novelty.

## Integrated architecture

[![CoreGrid integrated architecture: React and Flutter clients authenticate with ThunderID over OIDC + PKCE and call the ASP.NET Core 10 Web API with a JWT. Requests pass through the middleware pipeline, controllers and feature services; the in-process agent orchestrator uses read-only agent tools; EF Core persists to PostgreSQL 16, photos go to Cloudflare R2 and prompts go to the LLM provider.](./img/integrated-architecture.png)](./img/integrated-architecture.png)

Both clients sign in directly with ThunderID (OIDC + PKCE) and send the resulting JWT to the API over HTTPS.
The API validates tokens against ThunderID's JWKS and provisions users through SCIM. Every request then
flows through the same path: middleware pipeline → controllers and DTOs → feature services → EF Core. Feature
services are also the only place that start an agent workflow, store photos in Cloudflare R2, or reach the
database through `CoreGridDbContext` with its global organisation query filter and audit interceptor.

The component-level view of each part - backend, web, mobile and the agent subsystem - is in
[Component Architecture](./component-architecture.md).

## Architectural principles

| Rule | Statement | Consequence |
|---|---|---|
| AR-1 | The API is the only authoritative application layer. | Business rules, authorisation and validation exist in exactly one place. A rule cannot be satisfied on the web and bypassed on mobile. |
| AR-2 | Clients hold no privileged knowledge. | No client stores a database connection, an AI-service address or a third-party key. Compromise of a client cannot escalate beyond the permissions of the signed-in user. |
| AR-3 | Identity is external; authorisation is internal. | The identity provider establishes who the user is. CoreGrid decides what they may do. |
| AR-4 | The AI subsystem advises; the API decides. | No agent writes to the database. Every state change originates from an API endpoint executing a validated, authorised command. |

## Logical layering

[![CoreGrid logical layering: presentation (React and Flutter) calls the API layer over HTTPS with a bearer JWT; the API layer hands DTOs to application services, which use domain entities and the infrastructure layer (CoreGridDbContext, ThunderID directory, R2 storage, LLM client) backed by PostgreSQL and external services.](./img/logical-layering.png)](./img/logical-layering.png)

The domain layer is plain entity classes and constants and references nothing outside itself. Application
services work with `CoreGridDbContext` directly - there is no separate repository layer - and reach every
external service through an interface: `IIdentityDirectory` (ThunderID SCIM), `IFileStorageService`
(Cloudflare R2) and `INotificationService` (in-app notifications), plus the LLM HTTP client used by the
agents. That keeps each external dependency replaceable and mockable in tests. Request DTOs are validated
with data annotations, and `ApiExceptionFilter` turns domain exceptions into one JSON error envelope.

### Backend layering in the codebase

[![CoreGrid backend layering: an HTTP request passes the ordered middleware pipeline (correlation id, security headers, CORS, JWT authentication, role enrichment, authorisation outcome logging, authorisation, rate limiter), then the API layer of feature controllers and the ApiExceptionFilter, then feature services in the application layer, then the data layer of CoreGridDbContext, AuditSaveChangesInterceptor and domain entities, backed by PostgreSQL 16. Features/Shared provides cross-cutting services.](./img/backend-layering.png)](./img/backend-layering.png)

In the ASP.NET Core 10 codebase these layers map onto four concrete stages:

1. **Middleware pipeline** (`Program.cs`, in order) - correlation id, security headers, CORS, JWT
   authentication against ThunderID, role enrichment (the token `sub` is resolved to
   `Users.ExternalSubjectId` once per request), authorisation outcome logging, role authorisation and rate
   limiting.
2. **API layer** (`Features/<Name>/Controllers` + DTOs) - feature controllers derive from
   `CoreGridControllerBase`, declare `[Authorize(Roles = ...)]` and validate DTOs. `ApiExceptionFilter`
   turns domain exceptions into a consistent JSON error envelope.
3. **Application layer** (`Features/<Name>/Services`, registered by `<Name>Module.cs`) - one service
   interface and implementation per feature; DTOs in, DTOs out. The `Agents` feature uses `AgentTools` for
   all data access.
4. **Data layer** (`Data/` + `Domain/`) - `CoreGridDbContext` applies a query filter that scopes every query
   to the current organisation, and `AuditSaveChangesInterceptor` writes an append-only audit row for every
   entity change.

`Features/Shared` holds the cross-cutting pieces every feature reuses: the scoped current user, role
constants and policies, domain exceptions, paging, organisation scoping, the R2 storage client and the
health endpoint.

## Component responsibilities

| Component | Responsible for | Not responsible for |
|---|---|---|
| React web app | Administration and configuration; asset, maintenance, transfer and disposal management; audit dashboards and reporting; user and role administration; AI workflow monitoring and approval. | QR scanning, field photo capture, business rules beyond input validation. |
| Flutter mobile app | Field identification by QR scan; physical verification; fault reporting with photos; task execution; transfer confirmation; AI evaluation status. | User administration, approvals, workflow orchestration, analytics. |
| API | Token validation; authorisation; request validation; every business rule and state transition; persistence; AI workflow orchestration (Planner, Maintenance Analysis, Budget Analysis, Policy Compliance — all in-process), approval signalling and resumption; audit logging. | Rendering UI, holding user credentials. |
| Database | Durable storage of configuration, business data, custom attribute values, workflow state and audit records; referential integrity and constraints. | Business logic beyond integrity constraints; no passwords or tokens. |
| In-process AI agents | Execute the lifecycle decision workflow within the API; plan and delegate across four specialised agent nodes; invoke a fixed set of read-only tools; deterministic validation; pause at the human-approval checkpoint. | Writing to the database directly, calling third-party services beyond model inference, authenticating users. |
| Identity provider (ThunderID) | Authenticates users; holds the user directory; issues and signs tokens; session termination. | Authorising individual CoreGrid operations; holding business data. |
| Object storage (Cloudflare R2) | Private storage for maintenance and fault-report photographic evidence. | Public file hosting; the bucket is never publicly accessible. |

## Web vs. mobile: why two clients

CoreGrid draws the line along a single question: is the user at a desk making a decision, or standing in
front of an asset recording a fact? The web app is the management and control centre; the mobile app is the
field operations tool. Both consume the same API, the same identity and the same business rules.

| Capability | Web | Mobile |
|---|---|---|
| Dashboard | Full analytics and KPIs | Task-focused summary |
| User and role administration | Yes | No |
| Configuration (departments, categories, asset types, attributes) | Yes | No |
| Asset creation and amendment | Full | Limited - condition and location only |
| QR label generation | Yes | No |
| QR scanning | No | Yes |
| Physical verification | Review and manage results | Perform |
| Photo evidence capture | View only | Capture and upload |
| Transfer approval | Yes | No |
| Transfer physical confirmation | No | Yes |
| Disposal request and approval | Yes | No |
| AI workflow approval decision | Yes | No |
| Reports and export | Yes | No |

## The configurable platform model

CoreGrid is built as a platform, not a single-domain application. Different customers hold entirely
different asset attributes, but they all perform the same lifecycle operations - register, identify,
maintain, transfer, verify, condemn, dispose. The lifecycle engine is fixed in code; the domain is expressed
in configuration.

[![CoreGrid configurable platform model: identity, the lifecycle engine, the agent workflow, the audit engine, the API contract and the policy rules are fixed in code; departments, locations, asset categories and types, custom attributes, organisation policies and users are configured by the Administrator; together one deployment serves any asset domain.](./img/platform-model.png)](./img/platform-model.png)

Three levels of change, each with a different owner:

| Level | What changes | Who changes it | How |
|---|---|---|---|
| Platform | Identity integration, API contract, database relationships, lifecycle state machines, the AI workflow graph, security architecture. | CoreGrid engineering only. | Source code, review, migration, release. |
| Organisation | Departments, locations, asset categories, asset types, custom attribute definitions, policy thresholds, role assignment. | The customer's Administrator. | In-app configuration screens - see the [User Manual](../user-manual/organization-setup.md). |
| Operational | Assets, maintenance records, transfers, disposals, verifications, AI workflow runs. | Inventory Officers, Staff, Auditors, within their permissions. | Day-to-day use of the web and mobile apps. |

An administrator can configure departments, asset types and policies, but cannot redefine authentication,
the API contract, the lifecycle engine or the security model - that boundary is what keeps the platform's
guarantees reasoned-about and consistent across every customer.

## Deployment topology

[![CoreGrid deployment topology: browsers load the React build from a static host and call the API with a JWT; Android devices call the API; both sign in with ThunderID; the API reaches a private PostgreSQL 16 database and a private Cloudflare R2 bucket, and calls the LLM provider outbound.](./img/deployment-topology.png)](./img/deployment-topology.png)

Only the static web host, the API and the identity provider's sign-in endpoints are publicly addressable.
The database sits on a private network path reachable only from the API, and photo evidence lives in a
private R2 bucket that clients only ever see through short-lived links issued by the API. The AI agent subsystem runs in-process inside the API — there is no separate
agent container to secure, patch or take an ingress rule for. Outbound HTTPS calls to the configured model
provider are made only by the Planner and Budget Analysis nodes, each with a deterministic fallback.

Notifications are in-app only in v1.0.0 - there is no email or SMS integration yet. For local development,
`docker-compose.yml` runs ThunderID and PostgreSQL 16, and the API runs with `make backend`; production
images are built from `backend/Dockerfile` (the API, listening on port 8080) and `frontend/Dockerfile`
(the React build served by nginx).
