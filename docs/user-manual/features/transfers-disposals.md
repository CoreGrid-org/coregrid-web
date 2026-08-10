---
sidebar_position: 3
---

# Transfers and Disposals

:::info Status
Planned — see [Planned Features](../../planned-features.md).
:::

The two ways an asset leaves its current custody: it moves to a different department, or it leaves the
register for good.

## Transfers

An Inventory Officer raises a transfer request naming the destination department, destination location and
a reason. Only an *Active* asset can be transferred. An Administrator approves or rejects the request; on
approval the asset moves to *In Transit*.

Receipt is confirmed physically: the receiving Inventory Officer scans the asset on arrival, which moves
ownership to the new department and location and returns the asset to *Active*. A transfer that's approved
but not confirmed within a configurable number of days is flagged on the Administrator's dashboard.

## Disposals

Disposal is CoreGrid's only irreversible action, and the only one the [AI workflow](./ai-decision-support.md)
pauses on for approval.

1. **Condemn** — an Inventory Officer condemns an asset with a reason and evidence. This requires a recorded
   condition of Poor or Unserviceable.
2. **Request** — the officer raises a disposal request against the condemned asset, choosing a method
   (transfer to another entity, auction or destruction) and attaching evidence.
3. **Approve** — an Administrator approves, rejects, or sends the request back for revision. Approval is
   only possible once every precondition is met: the asset is condemned, a valuation is recorded, its
   minimum service life has elapsed, and no maintenance record is open against it.

Once approved, the asset moves to *Disposed* — a terminal state. Nothing can move it out again, and it can
never be deleted.

## History

Every transfer and disposal is retained in full — origin, destination, requester, approver, receiver, and
every timestamp — as part of the asset's permanent history.
