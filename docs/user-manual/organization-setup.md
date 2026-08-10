---
sidebar_position: 1
---

# Getting Started: Organisation Setup

## Your instance, ready on day one

CoreGrid is self-hosted per customer: when you purchase CoreGrid, we provision your instance and your first
Administrator account for you. There's no install, no server to configure and no setup wizard to run
yourself — you sign in and your organisation already exists.

The rest of this page describes what your Administrator configures inside the app once your instance is
live — the day-to-day settings that shape CoreGrid around how your organisation actually works.

## What the Administrator configures

Everything below is data, not code — it takes effect immediately and can be changed at any time by a user
with the Administrator role. See [Roles and Permissions](./roles-permissions.md) for who else can see or use
each of these.

### 1. Departments and locations

Create the departments that own assets and hold budgets (for example, *Fleet*, *Facilities*, *IT*), then the
locations within each — a store, a workshop, an office, a ward. Every asset belongs to a department and a
location, and both drive who can see and act on it.

A department or location that's referenced by an active asset can't be deleted, only deactivated, and only
once nothing active still points to it.

### 2. Asset categories and asset types

Categories are the top-level grouping used in reporting (for example, *Vehicles*, *Medical Equipment*,
*IT Hardware*). Within a category, define asset types — each with a name, a code, a default useful life for
depreciation, and an optional default maintenance interval.

### 3. Custom attribute definitions

For each asset type, define the extra fields that type needs to capture — name, data type (text, number,
date, yes/no, or a choice from a list), whether it's required, and its display order. This is what lets the
same platform serve a transport fleet and a hospital inventory: a new asset type with its own attributes is
configuration, not a code change, and both the web and mobile forms render it automatically.

### 4. Organisation policies

Set the thresholds that drive lifecycle rules and the AI decision-support agents — for example, the
repair-cost-to-replacement-cost ratio above which disposal is favoured, the minimum service life before an
asset is eligible for disposal, and the failure frequency that flags an asset for review.

### 5. Users and roles

Invite users by email and assign each one a role — Staff, Inventory Officer, Auditor or Administrator — and
a home department. Invited users receive an email to set up their sign-in; you never handle or see their
password. Roles and departments can be changed at any time. Deactivating a user keeps their historical
records intact but blocks their sign-in immediately.

## Where this fits

These are *organisation-level* settings — the middle of the three levels of change described in
[Architecture Overview](../architecture/overview.md). Only an Administrator can change them; the underlying
lifecycle engine and permission model are fixed and the same for every customer.
