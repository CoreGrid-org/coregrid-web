---
sidebar_position: 2
---

# Roles and Permissions

CoreGrid recognises four user roles. Every user has exactly one.

## Staff

Ordinary employees who use assets day to day. Infrequent system use, minimal training assumed - typically
reporting a problem in the moment they encounter it, from the mobile app.

- View the assets assigned to their department (read-only).
- Report a fault, with a photograph, from the mobile app.
- See the status of requests they raised.

## Inventory Officer

The custodian of the register for one or more departments. Frequent user of both apps, often moving between
stores, workshops and offices during the day.

- Register and amend assets.
- Scan and verify assets in the field.
- Record condition changes.
- Raise maintenance, transfer and disposal requests.
- Confirm physical receipt of a transferred asset.
- Initiate an AI decision-support evaluation.

## Auditor

An independent reviewer who confirms the register reflects physical reality. Cannot alter the records they
audit - that separation is what makes an audit finding independent evidence.

- Create and run verification campaigns.
- Record and classify discrepancies found during verification.
- Read all lifecycle history.
- Generate and export audit and compliance reports.
- No write access to asset master data.

## Administrator

Configures the platform for the organisation and holds approval authority for actions that can't be undone.
Small population, high privilege, typically desk-based.

- Everything under [Organisation Setup](./organization-setup.md): departments, locations, categories, asset
  types, attributes, policies, users and roles.
- Approve or reject transfers and disposals.
- Approve, reject or send back an AI recommendation for revision.
- View organisation-wide analytics and reports.

## At a glance

| Can... | Staff | Inventory Officer | Auditor | Administrator |
|---|---|---|---|---|
| View assets in their own department | Yes | Yes | Yes | Yes |
| View assets across the organisation | No | Yes | Yes | Yes |
| Register / amend assets | No | Yes | No | Yes |
| Verify assets in the field | No | Yes | Yes | No |
| Report a fault | Yes | Yes | No | Yes |
| Manage maintenance | No | Yes | No | Yes |
| Request a transfer or disposal | No | Yes | No | Yes |
| Approve a transfer or disposal | No | No | No | Yes |
| Manage audit campaigns / resolve discrepancies | No | No | Yes | Yes |
| Configure the organisation | No | No | No | Yes |
| Manage users | No | No | No | Yes |
| Approve an AI recommendation | No | No | No | Yes |

For the full permission list and how it's enforced, see
[Identity and Access](../architecture/identity-and-access.md).
