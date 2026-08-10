---
sidebar_position: 3
---

# Technology Stack

| Layer | Technology | Why |
|---|---|---|
| Backend | C# / ASP.NET Core Web API | First-class dependency injection, a mature authentication and policy-based authorisation pipeline, and native OpenAPI generation. |
| ORM | Entity Framework Core (Npgsql) | Reviewable, version-controlled schema migrations; parameterised queries; JSONB mapping for custom attributes and workflow state. |
| Database | PostgreSQL | ACID guarantees, rich constraint support, and JSONB with indexing for the configurable-attribute model. |
| Web client | React (Vite), React Router, TanStack Query, Zustand | Most web state is cached server data — a query library handles caching, invalidation and background refresh directly, leaving only session and UI-preference state for a lightweight store. |
| Design system | IBM Carbon Design System | An accessible, enterprise-grade component set, so the web client is assembled from audited primitives rather than bespoke styling. |
| Mobile client | Flutter, Riverpod, go_router, flutter_secure_storage, mobile_scanner, image_picker | Compile-time-safe dependency injection and testable providers for the field application. |
| AI orchestration | Python, LangGraph | An explicit graph of distinct agent nodes, a typed shared state object, checkpointed persistence, and a first-class interrupt mechanism for human approval. |
| Identity | OpenID Connect / OAuth 2.0 | Removes credential storage from CoreGrid entirely; standards-based tokens the API validates against published keys. |
| CI | GitHub Actions | Builds and tests run on every push and pull request. |

See [Architecture Overview](./overview.md) for how these pieces fit together, and
[Repository Layout](../project-structure/repository-layout.md) for where each lives in the codebase.
