---
sidebar_position: 5
---

# AI Decision Support

:::info Status
Planned - see [Planned Features](../../planned-features.md).
:::

Four specialised agents evaluate an asset from different angles and hand a consolidated recommendation to a
human officer - who always makes the final call.

## Starting an evaluation

An Inventory Officer or Administrator initiates an evaluation for a specific asset from either app and
receives a workflow reference immediately, without waiting for it to finish. An evaluation can't be started
for an asset already in a terminal state, or while another evaluation is already running for it.

## The four agents

| Agent | Role | Produces |
|---|---|---|
| Assessment Agent | Condition evaluator | A 0–100 condition score, remaining useful life estimate, breakdown frequency and cost trend. |
| Recommendation Agent | Decision optimiser | A cost-benefit comparison of repair, transfer and disposal, and a primary recommendation with a confidence level. |
| Compliance Agent | Regulatory checker | A check of the proposed action against your organisation's policies (set in [Organisation Setup](../organization-setup.md)), and any compliance flags. |
| Approval Router | Human-in-the-loop gateway | Routes the consolidated package to the right Administrator, tracks the approval SLA, and records the final decision permanently. |

## Human approval, always

Where an evaluation recommends a high-impact action, the workflow pauses and nothing changes until an
Administrator decides. Reviewing the recommendation shows the full evidence trail behind it - condition
scores, cost calculations, compliance checks - not just the conclusion.

An Administrator can:

- **Approve** - the recommended action executes through the ordinary business workflow, under the same
  rules and audit logging as if a person had done it manually.
- **Reject** - the workflow ends; nothing changes.
- **Request revision** - the workflow re-analyses with the reviewer's comments as added context (capped at
  two revisions before it's handed to manual review).

## Where it shows up

Officers see the outcome of evaluations they started, including the recommendation and its approval status,
in the mobile app. Administrators and Auditors get the full execution trace - the plan, each agent's output,
every check performed and the final decision - in the web app.
