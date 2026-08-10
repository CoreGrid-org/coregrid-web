---
sidebar_position: 2
---

# Maintenance Management

:::info Status
Planned - see [Planned Features](../../planned-features.md).
:::

Maintenance turns a fault observed in the field into tracked, costed, closed work - and builds the history
the AI decision-support agents later reason over.

## Reporting a fault

Staff or an Inventory Officer report a fault against an asset from either app: a description, the observed
condition, and an optional photo. An Inventory Officer can also create a maintenance record directly and
classify it as corrective or preventive.

## Working a record

```
   REQUESTED ──approve──▶ APPROVED ──start──▶ IN_PROGRESS ──complete──▶ COMPLETED
       │                     │                     │
       └──────cancel─────────┴─────────────────────┘──────▶ CANCELLED
```

An Inventory Officer or Administrator approves a request, assigns it to a responsible officer and records an
estimated cost. Starting work sets the asset to *Under Maintenance*, which blocks transfer and disposal
requests until it's finished. The assigned officer updates progress from either app.

## Completing a record

Completion records the actual cost, the work performed, the completion date and the resulting condition -
and returns the asset to *Active*. If the resulting condition is Unserviceable, the asset moves to
*Condemned* instead, opening the [disposal path](./transfers-disposals.md).

CoreGrid tracks cumulative maintenance cost, repair count and the last repair date per asset automatically -
this feeds the Assessment Agent described in [AI Decision Support](./ai-decision-support.md).

## Finding records

List and filter maintenance records by status, priority, department, asset, assignee and date range.
