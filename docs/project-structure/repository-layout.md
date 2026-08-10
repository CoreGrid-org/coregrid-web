---
sidebar_position: 1
---

# Repository Layout

The product repository is organised as two applications sharing one specification, plus the specification
itself.

```
CoreGrid/
├── backend/                    ASP.NET Core Web API
│   ├── Data/                   EF Core DbContext
│   ├── Domain/                 Entities and enumerations (Organization, User, CoreGridRole, …)
│   ├── Features/               One folder per API feature (Setup, and — as they land — Assets,
│   │                           Maintenance, Transfers, Disposals, Audit, Workflows)
│   ├── Identity/                Identity-provider integration (IIdentityDirectory and its implementation)
│   ├── Migrations/             EF Core migration history — the only way the schema changes
│   ├── Program.cs              Composition root: DI registration, auth, middleware
│   └── appsettings.json        Configuration (secrets supplied via environment variables, never committed)
│
├── frontend/                   React web application (management & control centre)
│   └── src/
│       ├── pages/              Route-level screens (SignIn, Setup, Dashboard, …)
│       ├── components/         Shared UI building blocks
│       ├── queries/            TanStack Query hooks — server-state access
│       ├── services/           API client functions
│       └── styles/             Global and theme styling
│
└── doc/                        Architecture and specification documents
```

## Feature-folder convention (backend)

Each backend capability lives in its own folder under `Features/`, containing its controller and request/
response models together, rather than spreading a feature across generic `Controllers/`, `Models/` and
`Services/` folders. `Features/Setup/` — the only feature implemented so far — is the reference example:
`SetupController.cs` and `SetupModels.cs` sit side by side, and nothing outside that folder needs to know
its internal shape.

## Where things are decided

Recall the three levels of change from [Architecture Overview](../architecture/overview.md): platform-level
decisions live in this repository's source code and migrations; organisation-level configuration is data,
entered by a customer's Administrator through the web app once their instance is running (see the
[User Manual](../user-manual/organization-setup.md)); operational data is created by day-to-day use of the
web and mobile apps.
