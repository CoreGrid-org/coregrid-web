---
sidebar_position: 4
---

# Audit and Compliance

:::info Status
Planned - see [Planned Features](../../planned-features.md).
:::

The independent assurance layer: campaigns that check the register against physical reality, discrepancies
that record where the two diverged, and an immutable log of who did what and when.

## Running a verification campaign

An Auditor or Administrator creates a campaign with a name, a period and a scope - a set of departments,
locations, categories or asset types. CoreGrid generates the task list from that scope automatically and
assigns tasks to the officers responsible for each location.

An assigned officer sees their outstanding tasks on the mobile app, ordered by due date, and completes each
one by scanning the asset and asserting its presence, location and condition.

## Discrepancies

When a verification assertion doesn't match the register, CoreGrid raises a discrepancy automatically and
classifies it - Missing, Surplus, Location Mismatch, Condition Mismatch or Data Mismatch. An officer can also
raise one manually for anything the automatic comparison can't catch, with a description and a photo.

An Auditor resolves a discrepancy by recording a resolution type and explanation:

- **Register corrected** - the register was wrong; it's amended.
- **Asset relocated** - the asset moved without a transfer record; ownership is corrected retrospectively.
- **Condition updated** - the recorded condition is amended to match what was verified.
- **Written off** - the asset can't be located; it's escalated to condemnation.
- **No action** - the difference is explained and accepted, with a justification on record.

A resolved discrepancy is never reopened - a new one is raised if the issue recurs.

## The audit log

Every state-changing operation across CoreGrid is recorded - actor, entity, operation, before-and-after
values, and timestamp - in a log that Auditors and Administrators can read and filter, but no one can edit
or delete.

## Reporting

An Auditor generates a campaign completion report - assets in scope, verified, outstanding, and
discrepancies by type and resolution - exportable as PDF or CSV, and can watch progress in real time on the
audit dashboard.
