---
sidebar_position: 5
---

# AI Decision Support

Four specialised agents evaluate an asset from different angles and hand a consolidated recommendation to a
human officer - who always makes the final call. The entire agent subsystem runs in-process inside the
ASP.NET Core API — no separate container, no additional network surface.

## Starting an evaluation

An Inventory Officer or Administrator starts an evaluation for a whole asset type - for example, every laptop
in the organisation - or narrows it to a single asset. The new-evaluation dialog has searchable asset type and
asset selectors, and the caller gets a workflow reference immediately, without waiting for it to finish. Each
asset in scope gets its own recommendation, plus an overall summary for the fleet. Only one evaluation can run
at a time for the same asset type or asset.

## The four agents

| Agent | Role | Model call | Produces |
|---|---|---|---|
| Planner Agent | Plans the evaluation and delegates steps to specialised agents | Yes (Gemini, with deterministic fallback) | An ordered plan of 4–6 typed steps, using the asset summary from `get_asset_summary`. |
| Maintenance Analysis Agent | Analyses the asset's repair and maintenance history | No (pure C#) | Repair count, cumulative cost, mean time between failures, cost trend, projected 12-month repair cost, and confidence level. Uses `get_maintenance_history` and `compute_failure_statistics`. |
| Budget Analysis Agent | Performs financial comparison and option ranking | Yes (Gemini, with deterministic fallback) | Residual value, replacement estimate, repair-to-replace ratio, budget headroom, and ranked options (repair, transfer, disposal). Uses `get_asset_financials`, `get_department_budget_summary`, and `compute_depreciation`. |
| Policy Compliance Agent | Validates the proposed recommendation against organisation policies | No (pure C#, deterministic rule engine) | Policy validation verdict — the model does not decide compliance; a deterministic rule engine does. Uses `get_organization_policies` and `get_asset_compliance_state`. |

### What agents can and cannot do

| Agents can... | Agents cannot... |
|---|---|
| Read asset, maintenance, financial and policy data through allow-listed tools | Write to the database or modify any business record |
| Produce a structured plan and delegate steps to specialised agents | Choose which tools exist or extend their own permissions |
| Compute projections, comparisons and cost analyses | Approve their own recommendation |
| Evaluate configured policy predicates and report the outcome | Invent, reinterpret or override an organisation policy |
| Recommend an action and explain the factors behind it | Execute a high-impact action without human approval |
| Record a safe, explicit failure | Fail silently or leave a partially applied change |

## The workflow

[![CoreGrid asset lifecycle evaluation workflow: the Planner, Maintenance, Budget and Policy agents run in order; out-of-scope requests end as FAILED_SAFE; the gate result is COMPLETED_ADVISORY for low-impact passes, FAILED_SAFE on failure, REVISION_REQUESTED when rework is needed, or AWAITING_APPROVAL for high-impact results, which an Administrator approves, rejects, or sends back for revision (at most twice).](../../architecture/img/agent-workflow.png)](../../architecture/img/agent-workflow.png)

Green states finished well, red states stopped safely, yellow states are waiting for a person and orange
means the evaluation was sent back. Only an Administrator can approve, reject or revise, and must give a
reason of at least 10 characters.

All state is persisted at each checkpoint, so a workflow can resume from where it left off after a restart.
The entire workflow is time-bounded to 120 seconds.

## Human approval, always

Where an evaluation recommends a high-impact action, the workflow pauses and nothing changes until an
Administrator decides. Reviewing the recommendation shows the full evidence trail behind it - condition
scores, cost calculations, compliance checks - not just the conclusion.

An Administrator can:

- **Approve** - the decision, the approver's reason and a snapshot of the workflow are recorded. Approval
  does not run the action automatically: a disposal is still completed through the normal disposal approval
  step, which requires an approved workflow.
- **Reject** - the workflow ends and the reason is recorded; nothing changes.
- **Revise** - the evaluation runs again without suggesting the rejected action (capped at two revisions).

Every decision needs a reason of at least 10 characters. Disposal recommendations always require
Administrator approval, and a recommendation that policy blocks is replaced with the next action policy
allows.

## Model configuration

All in-process agents share one `Llm` configuration section. The default is Google Gemini through its
OpenAI-compatible endpoint. If the primary call fails, each agent retries once against an optional fallback
provider (Groq by default) before using its deterministic fallback. Without any API key, agents log a
warning and use their deterministic fallback, so workflows still complete.

## Where it shows up

Officers see the outcome of evaluations they started, including the recommendation and its approval status,
in the mobile app. Administrators and Auditors get the full execution trace - the plan, each agent's output,
every check performed and the final decision - in the web app. Every workflow run, execution step,
validation result, and approval decision is persisted alongside domain data for full auditability.
