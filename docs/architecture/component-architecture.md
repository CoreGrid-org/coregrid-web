---
sidebar_position: 2
---

# Component Architecture

The [System Architecture](./overview.md) page shows how the pieces fit together. This page zooms into the
two client applications and the AI agent subsystem. Select any diagram to open it at full size.

## Web application

[![CoreGrid frontend architecture: main.tsx wraps the app in ThunderIDProvider; App.tsx defines React Router v7 routes with role-specific layouts guarded by RoleRoute for Administrator, Inventory Officer and Auditor; each feature folder contains pages, components, hooks, api and lib; shared/ holds the API client, shared hooks, components and helpers that call the CoreGrid REST API with a bearer token.](./img/frontend-architecture.png)](./img/frontend-architecture.png)

The web management app is built with React 19, Vite and the Carbon Design System.

- **Entry and identity** - `main.tsx` wraps the app in the ThunderID React SDK provider. Sign-in uses
  OIDC + PKCE, and `getAccessToken()` supplies the bearer token for every API call.
- **Routing** - `app/App.tsx` declares React Router v7 routes. Each role gets its own layout behind a
  `RoleRoute` guard: `/admin` (Administrator), `/inventory` (Inventory Officer) and `/audit` (Auditor).
  Public routes cover sign-in, setup and password recovery. Staff accounts are mobile-only and are sent to
  `/access-restricted`.
- **Feature folders** - `features/<name>/` holds one folder per feature (assets, audit, auth, dashboard,
  maintenance, notifications, profile, reports, settings, setup, transfers, users, workflows). Inside each:
  route-level `pages/`, Carbon-based `components/`, data `hooks/`, typed `api/` calls and `lib/` helpers.
- **Shared code** - `shared/lib/apiClient.ts` wraps `fetch`, attaches the bearer token and maps the API
  error envelope to a readable message. Shared hooks, layouts, state views and validation/date helpers live
  alongside it.
- **State** - plain `useState`/`useEffect` hooks with cancellation guards and retry counters;
  `useStubMutation` handles writes. There is no Redux, Zustand or TanStack Query.

`usePermissions()` mirrors the backend's grants so the UI can hide actions a user cannot take - but the API
remains the enforcement point.

## Mobile application

[![CoreGrid mobile architecture: feature-first presentation folders under lib/features; navigation and state with go_router, Riverpod 3 providers and shared state views; shared services for the Dio API client, flutter_appauth authentication with secure storage, and media/theme; device plugins for QR scanning, image capture and compression, permissions and connectivity; calls to the CoreGrid REST API and ThunderID.](./img/mobile-architecture.png)](./img/mobile-architecture.png)

The Android field app is built with Flutter and follows a feature-first structure.

- **Presentation** - `lib/features/` contains assets, scan, verification, maintenance, transfers,
  notifications, workflows, dashboard, account and onboarding.
- **Navigation and state** - `go_router` performs role-gated redirects to the Officer or Staff dashboard.
  Riverpod 3 providers own all screen and session state, and shared state views render loading, empty and
  error states consistently.
- **Shared services** - a Dio HTTP client with a bearer-token interceptor; authentication through
  `flutter_appauth` (OIDC + PKCE with a custom-scheme redirect) with tokens kept in
  `flutter_secure_storage` (Android Keystore); photo capture/compression and the app theme.
- **Device capabilities** - `mobile_scanner` for rear-camera QR scanning (with manual entry) during scan,
  verification and transfers; `image_picker` and `flutter_image_compress` for photo evidence;
  `permission_handler` for runtime permissions; `connectivity_plus` for offline messaging.

The API base URL and ThunderID client id are supplied at build time:

```bash
flutter build apk --release \
  --dart-define=API_BASE_URL=... \
  --dart-define=THUNDERID_CLIENT_ID=...
```

## AI agent subsystem

[![CoreGrid agent architecture: an Inventory Officer starts an evaluation from the Flutter app; the in-process agent orchestrator runs the Planner, Maintenance, Budget and Policy agents in sequence, each calling its own read-only, organisation-scoped tool interface over PostgreSQL; the LLM provider is used only for planning and budget re-scoring; a gate routes the result and every step is saved; Administrators approve, reject or revise in the React app.](./img/agent-architecture.png)](./img/agent-architecture.png)

The agent orchestrator runs in-process inside the API (`Agents/Services/Orchestration`). An evaluation passes
through four agents in a fixed order:

| Agent | Does | Uses an LLM | Tool interface |
|---|---|---|---|
| 1 · Planner | Checks scope and builds the plan | Yes | `IPlannerTools` - asset type summary |
| 2 · Maintenance | Repairs, MTBF, cost trend | No | `IMaintenanceTools` - maintenance history, failure statistics |
| 3 · Budget | Value vs repair cost, ranks options | Re-scores only | `IBudgetTools` - financials, budget, depreciation |
| 4 · Policy | Rule engine (PR-01 … PR-09) | No | `IPolicyTools` - compliance state, organisation policies |

The gate (`WorkflowRouting`) then completes the workflow, fails it safely, or holds it for approval. Every
step is saved to `AgentWorkflows`, `AgentExecutionSteps` and `AgentApprovals`. The LLM provider chain is
Gemini, then Groq as a fallback, then a deterministic result.

How to read it:

- Each agent can only call its own tool interface - calling anything else does not compile.
- Tools only read data and always use the workflow's organisation, never a value from model output.
- If the LLM fails or returns bad output, the agent falls back to a deterministic result.
- High-impact results (for example, disposal) stop at the gate until an Administrator decides.

The step-by-step lifecycle of a single evaluation, including every terminal state, is shown in
[AI Decision Support → The workflow](../user-manual/features/ai-decision-support.md#the-workflow).
