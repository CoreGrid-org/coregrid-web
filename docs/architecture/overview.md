---
sidebar_position: 1
---

# System Architecture

CoreGrid follows a layered, service-oriented architecture with a single authoritative backend. The structure
is deliberately conventional - the value of the system is in its domain model, its configurability and its
controlled use of AI agents, not in architectural novelty.

## Architectural principles

| Rule | Statement | Consequence |
|---|---|---|
| AR-1 | The API is the only authoritative application layer. | Business rules, authorisation and validation exist in exactly one place. A rule cannot be satisfied on the web and bypassed on mobile. |
| AR-2 | Clients hold no privileged knowledge. | No client stores a database connection, an AI-service address or a third-party key. Compromise of a client cannot escalate beyond the permissions of the signed-in user. |
| AR-3 | Identity is external; authorisation is internal. | The identity provider establishes who the user is. CoreGrid decides what they may do. |
| AR-4 | The AI subsystem advises; the API decides. | No agent writes to the database. Every state change originates from an API endpoint executing a validated, authorised command. |

## Logical layering

```
  ┌────────────────────────────────────────────────────────────────────────────┐
  │  PRESENTATION            React SPA  ·  Flutter mobile application          │
  │                          routing · state · forms · protected views         │
  └────────────────────────────────────┬───────────────────────────────────────┘
                                       │  HTTPS · REST · JSON · Bearer JWT
  ┌────────────────────────────────────▼───────────────────────────────────────┐
  │  API / INTERFACE         Controllers · DTOs · model binding · versioning    │
  │                          JWT validation · policy authorisation · CORS       │
  │                          Validation · global exception handling            │
  └────────────────────────────────────┬───────────────────────────────────────┘
  ┌────────────────────────────────────▼───────────────────────────────────────┐
  │  APPLICATION             Use-case services · orchestration · transactions   │
  │                          state-machine guards · audit-event emission        │
  │                          agent workflow service · notification dispatch     │
  └────────────────────────────────────┬───────────────────────────────────────┘
  ┌────────────────────────────────────▼───────────────────────────────────────┐
  │  DOMAIN                  Entities · value objects · enumerations            │
  │                          invariants · lifecycle state machines · policies   │
  └────────────────────────────────────┬───────────────────────────────────────┘
  ┌────────────────────────────────────▼───────────────────────────────────────┐
  │  INFRASTRUCTURE          EF Core DbContext · repositories · migrations      │
  │                          Identity-provider client · object-storage client   │
  │                          LLM HTTP client · structured logging              │
  └────────────────────────────────────────────────────────────────────────────┘
```

Dependencies point inward - the domain layer references nothing outside itself. The application layer
declares interfaces for anything external (notifications, the AI gateway, QR generation, the identity
directory) and the infrastructure layer supplies the implementation, which keeps every external dependency
replaceable and mockable in tests.

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

```
                         COREGRID PLATFORM
                                │
           ┌────────────────────┴────────────────────┐
           │                                         │
     FIXED IN CODE                            CONFIGURED BY ADMIN
           │                                         │
   ┌───────┼────────┬──────────┐          ┌──────────┼──────────┬────────────┐
   │       │        │          │          │          │          │            │
 Identity Asset  Lifecycle  Agent      Departments Asset     Attribute   Organisation
 & access engine states     graph     & locations  types     definitions   policies
   │       │        │          │          │          │          │            │
   └───────┴────────┴──────────┘          └──────────┴──────────┴────────────┘
           │                                         │
           └────────────────────┬────────────────────┘
                                ▼
                    One deployment serves:
        Transport (Bus · Truck · Workshop equipment)
        Healthcare (MRI · Ventilator · Ambulance)
        Any domain with physical assets - through configuration, without a new build
```

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

```
   INTERNET                                  │  PRIVATE / INTERNAL
  ─────────────────────────────────────────  │  ────────────────────────────────
                                             │
   Browser ──▶ Static host (React build)     │
                    │                        │
   Android ──▶ ────┼──────────────┐          │
   device          │              │          │
                   ▼              ▼          │
            ┌────────────────────────────┐   │
            │  ASP.NET Core API          │   │   ┌───────────────────────────┐
            │  container / app service   │───┼──▶│  PostgreSQL (managed)     │
            │  HTTPS · health · Swagger  │   │   │  restricted network       │
            │                            │   │   └───────────────────────────┘
            │  hosts Agent Orchestrator + │   │
            │  all four agent nodes      │   │   ┌───────────────────────────┐
            │  in-process                │───┼──▶│  Model provider           │
            └────────────┬───────────────┘   │   │  OpenAI-compatible        │
                         │                   │   │  (Gemini primary,         │
                         │                   │   │   optional Groq fallback) │
   Identity provider ◀── OIDC / JWKS ────────┤   └───────────────────────────┘
   Object storage ◀── S3 API (photo upload) ─┤
   Email API ◀── backend-mediated only ──────┘
```

Only the static web host and the API are publicly addressable. The database sits on a private network path
reachable only from the API. The AI agent subsystem runs in-process inside the API — there is no separate
agent container to secure, patch or take an ingress rule for. Outbound HTTPS calls to the configured model
provider are made only by the Planner and Budget Analysis nodes, each with a deterministic fallback.
