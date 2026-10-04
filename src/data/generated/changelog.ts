// GENERATED FILE - do not edit directly.
// Source: GitHub Releases API for CoreGrid-org/CoreGrid; cached at src/data/changelog-cache.json.
// Regenerate with `npm run generate:changelog`.

export type ChangelogBlock =
  | {type: 'paragraph'; text: string}
  | {type: 'list'; items: string[]};

export type ChangelogSection = {
  heading: string;
  blocks: ChangelogBlock[];
};

export type ChangelogRelease = {
  slug: string;
  version: string;
  name: string;
  date: string;
  tag: string;
  prerelease: boolean;
  githubUrl: string;
  summary: string;
  contributors: string[];
  sections: ChangelogSection[];
};

const changelog: ChangelogRelease[] = [
  {
    "slug": "v0.1.0",
    "version": "v0.1.0",
    "name": "Coregrid v0.1.0 - MVP",
    "date": "2026-09-29",
    "tag": "v0.1.0",
    "prerelease": false,
    "githubUrl": "https://github.com/CoreGrid-org/CoreGrid/releases/tag/v0.1.0",
    "summary": "CoreGrid v0.1.0 is the first MVP release of the CoreGrid asset lifecycle management platform. This release provides the foundation for managing physical assets from registration and verification through maintenance, transfers, disposal, auditing, reporting, and controlled AI-assisted evaluation.",
    "contributors": [
      "HasithaErandika",
      "jguruge",
      "seneja",
      "NipunaBhanuka18"
    ],
    "sections": [
      {
        "heading": "What's Included",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Organisation, department, location, and user management",
              "Configurable asset categories, types, and custom attributes",
              "Role- and permission-based access control with ThunderID",
              "Asset registration, search, filtering, and lifecycle history",
              "QR code generation, scanning, and asset identification",
              "Physical asset verification and reconciliation",
              "Asset condition tracking",
              "Maintenance and fault management",
              "Maintenance assignment, completion, cost, and evidence tracking",
              "Asset transfers and physical receipt confirmation",
              "Asset condemnation and disposal workflows",
              "Verification campaigns and discrepancy management",
              "Audit logging",
              "Inventory, maintenance, disposal, and audit reports",
              "PDF and CSV report export",
              "Role-based dashboards",
              "Transactional notifications",
              "Health monitoring and Swagger/OpenAPI documentation"
            ]
          }
        ]
      },
      {
        "heading": "Agentic Asset Evaluation",
        "blocks": [
          {
            "type": "paragraph",
            "text": "CoreGrid v0.1.0 introduces a controlled AI-assisted asset evaluation workflow."
          },
          {
            "type": "paragraph",
            "text": "The workflow analyses:"
          },
          {
            "type": "list",
            "items": [
              "Asset information",
              "Maintenance history",
              "Financial information",
              "Department budget",
              "Organisation policies"
            ]
          },
          {
            "type": "paragraph",
            "text": "The system uses specialised agents for planning, maintenance analysis, budget analysis, and policy compliance."
          },
          {
            "type": "paragraph",
            "text": "AI recommendations are validated using deterministic business rules before any action can proceed."
          },
          {
            "type": "paragraph",
            "text": "High-impact actions require authorised human approval."
          },
          {
            "type": "paragraph",
            "text": "The agent service has read-only access to business data and cannot directly modify asset records."
          }
        ]
      },
      {
        "heading": "Security and Auditability",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The MVP includes:"
          },
          {
            "type": "list",
            "items": [
              "ThunderID authentication",
              "Permission-based API authorisation",
              "Organisation-scoped data",
              "Audit logging",
              "Read-only agent tools",
              "Deterministic validation",
              "Human approval for high-impact actions",
              "Workflow persistence and execution history",
              "Failure, timeout, and retry handling"
            ]
          }
        ]
      },
      {
        "heading": "API",
        "blocks": [
          {
            "type": "paragraph",
            "text": "CoreGrid provides a REST API covering:"
          },
          {
            "type": "list",
            "items": [
              "Identity and configuration",
              "Assets",
              "Maintenance",
              "Transfers",
              "Disposal",
              "Verification",
              "Audit",
              "Reporting",
              "Dashboards",
              "Agentic workflows"
            ]
          },
          {
            "type": "paragraph",
            "text": "Swagger/OpenAPI is available through /swagger, and /health provides system and dependency status."
          }
        ]
      },
      {
        "heading": "Future Enhancements",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Future releases may introduce:"
          },
          {
            "type": "list",
            "items": [
              "Offline field operation and synchronisation",
              "Configurable lifecycle workflows",
              "Push notifications",
              "Automated preventive maintenance",
              "Multi-tenant SaaS and billing",
              "Additional AI agents",
              "Predictive failure analysis",
              "Computer-vision condition assessment",
              "ERP and financial-system integrations",
              "Sovereign-cloud and data-residency options",
              "Advanced administration and governance"
            ]
          },
          {
            "type": "paragraph",
            "text": "These capabilities are outside the v0.1.0 MVP."
          }
        ]
      }
    ]
  }
];

export default changelog;
