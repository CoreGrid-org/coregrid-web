---
sidebar_position: 4
---

# Technology Stack

| Layer | Technology | Why |
|---|---|---|
| Backend | C# / ASP.NET Core 10 Web API | First-class dependency injection, a mature authentication and policy-based authorisation pipeline, minimal-API and controller options, and native OpenAPI generation. |
| ORM | Entity Framework Core 10 (Npgsql) | Reviewable, version-controlled schema migrations; parameterised queries eliminate injection by construction; global query filters enforce organisation isolation; JSONB mapping holds agent workflow state. |
| Database | PostgreSQL 16 | ACID guarantees and rich constraint support; custom attributes use a typed attribute-value table, JSONB stores variable-shape agent workflow traces, and the `xmin` system column provides optimistic concurrency for transfer and disposal approvals. |
| Web client | React 19 (Vite), React Router 7, ThunderID React SDK | CoreGrid web state is page-scoped server data (one filtered, paginated query per page, refetched after a mutation), so each feature's hooks own their loading/error/refetch state — no separate cache or store library is needed. |
| Design system | IBM Carbon Design System (`@carbon/react`, `@carbon/icons-react`), IBM Plex Sans / IBM Plex Mono | A WCAG 2.1 AA–compliant, enterprise-grade component set — Grid, Header, Tile, Tag, Button, StructuredList, InlineNotification, Theme — so the React client is assembled from audited, accessible primitives rather than bespoke styling. |
| Mobile client | Flutter 3, Riverpod 3, go_router, Dio, flutter_appauth, flutter_secure_storage, mobile_scanner, image_picker | Lives in its own repository ([coregrid-mobile](https://github.com/CoreGrid-org/coregrid-mobile)). Compile-time-safe dependency injection and testable providers for the field application; Riverpod was chosen over event-driven alternatives for its reduced boilerplate and testability. |
| AI orchestration | .NET-native, in-process — Agent Orchestrator (`AgentWorkflowService`) and all four agent nodes run inside the ASP.NET Core API | The graph shape, checkpointing, conditional routing, deterministic policy gate and human-approval interrupt are implemented by `AgentWorkflowService` and in-process node services. The Planner and Budget Analysis nodes call a model through any OpenAI-compatible chat-completions endpoint (Gemini by default), each with a deterministic fallback; Maintenance Analysis and Policy Compliance are pure C#. No separate agent container or runtime is required. |
| Identity | ThunderID (OpenID Connect / OAuth 2.0) | Removes credential storage from CoreGrid entirely and supplies standards-based tokens the API validates against published keys. |
| Object storage | Cloudflare R2 through the AWS S3 SDK (or any S3-compatible endpoint) | Private photo storage for maintenance, fault-report and discrepancy evidence. The bucket is never public; the backend issues signed links that expire after 15 minutes. |
| Reporting | QuestPDF and a built-in CSV writer | PDF and CSV exports for campaign and audit reports, generated server-side. |
| CI | GitHub Actions | On every push and pull request: a backend job (restore, zero-warning build, apply migrations, run the test suite against PostgreSQL) and a frontend job (Vitest tests, then `tsc -b && vite build`). |

See [Architecture Overview](./overview.md) for how these pieces fit together, and
[Repository Layout](../project-structure/repository-layout.md) for where each lives in the codebase.
