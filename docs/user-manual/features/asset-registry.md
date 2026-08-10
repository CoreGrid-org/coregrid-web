---
sidebar_position: 1
---

# Asset Registry

:::info Status
Planned - see [Planned Features](../../planned-features.md).
:::

The register is the source of truth for every physical asset your organisation manages.

## Registering an asset

An Inventory Officer selects an asset type, then supplies a name, department, location, acquisition date,
acquisition cost and every attribute that type requires. CoreGrid generates a unique asset code and a QR
label automatically - the label is available to download and print immediately.

## Finding an asset

Search by code, name or any custom attribute; filter by department, location, category, type, status or
condition. In the field, scan an asset's QR label with the mobile app to jump straight to its record - or
enter the code by hand if the label is unreadable.

## Amending a record

An Inventory Officer can update an asset's details, custom attributes, department or location at any time.
Every change is written to that asset's history, alongside every verification, maintenance event, transfer,
disposal action and AI recommendation it's ever had - a complete, ordered chronology.

## Condition and value

Record an asset's condition on a five-point scale - New, Good, Fair, Poor, Unserviceable. CoreGrid computes
its residual value automatically from acquisition cost, acquisition date and the useful life configured for
its asset type.

An asset is never deleted once it has history. It leaves the active register only through the
[disposal workflow](./transfers-disposals.md).
