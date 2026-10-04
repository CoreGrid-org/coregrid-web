---
sidebar_position: 1
---

# Asset Registry

The register is the source of truth for every physical asset your organisation manages.

## Registering an asset

An Inventory Officer selects an asset type, then supplies a name, department, location, acquisition date,
acquisition cost and every attribute that type requires. CoreGrid generates a unique organisation-scoped
asset code and a QR label automatically - the label is available to download and print immediately.

## Finding an asset

Search by code, name or any custom attribute; filter by department, location, category, type, status or
condition. Sorting and pagination are available on all list views. In the field, scan an asset's QR label
with the mobile app to jump straight to its record - or enter the code by hand if the label is unreadable.

## Amending a record

An Inventory Officer can update an asset's details, custom attributes, department or location at any time.
Every change is written to that asset's history, alongside every verification, maintenance event, transfer,
disposal action and AI recommendation it's ever had - a complete, ordered chronology.

## Condition and value

Record an asset's condition on a five-point scale - New, Good, Fair, Poor, Unserviceable. CoreGrid computes
its residual value automatically using straight-line depreciation from acquisition cost, acquisition date
and the useful life configured for its asset type.

An asset is never deleted once it has history. It leaves the active register only through the
[disposal workflow](./transfers-disposals.md).

## Lifecycle status

Every asset moves through a guarded state machine - no transition happens silently, and an invalid one is
rejected rather than ignored.

```
                              ┌──────────────┐
        register ────────────▶│    ACTIVE    │◀──────────┐
                              └──┬───┬───┬───┘           │
                                 │   │   │               │ complete
            transfer requested   │   │   │ maintenance   │
                    ┌────────────┘   │   └───────────┐   │
                    ▼                │               ▼   │
         ┌────────────────────┐      │      ┌──────────────────┐
         │ TRANSFER_REQUESTED │      │      │ UNDER_MAINTENANCE│
         └─────────┬──────────┘      │      └──────────────────┘
            approve│  reject         │ condemn
                   ▼                 ▼
         ┌────────────────────┐   ┌──────────────┐
         │  IN_TRANSIT        │   │  CONDEMNED   │
         └─────────┬──────────┘   └──────┬───────┘
           confirm │                     │ disposal requested
            receipt│                     ▼
                   │            ┌─────────────────────┐
                   └───────────▶│ DISPOSAL_REQUESTED  │
                     back to    └──────┬──────────┬───┘
                      ACTIVE    approve│          │reject
                                       ▼          └────▶ back to CONDEMNED
                                ┌──────────────┐
                                │   DISPOSED   │   terminal - no further
                                └──────────────┘   transition permitted
```
