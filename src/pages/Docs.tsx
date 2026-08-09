import { useState } from "react";
import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import CodeBlock from "../components/ui/CodeBlock";
import Badge from "../components/ui/Badge";
import { BookOpen, Terminal, Layers, Cpu, Sliders, Server, Shield, FileText, ChevronRight } from "lucide-react";

export default function Docs() {
  const [activeTab, setActiveTab] = useState<string>("quickstart");

  const docSections = [
    { id: "quickstart", title: "Quickstart & Local Setup", icon: <Terminal className="w-4 h-4" /> },
    { id: "architecture", title: "Architecture & Microservices", icon: <Layers className="w-4 h-4" /> },
    { id: "agentic-ai", title: "Agentic AI Configuration", icon: <Cpu className="w-4 h-4" /> },
    { id: "schemas", title: "JSON Schema Definitions", icon: <Sliders className="w-4 h-4" /> },
    { id: "api-ref", title: "REST API Endpoint Reference", icon: <Server className="w-4 h-4" /> },
    { id: "security-setup", title: "Asgardeo OIDC Integration", icon: <Shield className="w-4 h-4" /> },
  ];

  const quickstartCode = `# 1. Clone the CoreGrid Open-Source Repository
git clone https://github.com/CoreGrid-org/coregrid-web.git
cd coregrid-web

# 2. Spin up PostgreSQL & Asgardeo Mock Services via Docker
docker-compose up -d postgres-coregrid asgardeo-identity

# 3. Initialize EF Core Database Migrations
dotnet ef database update --project src/CoreGrid.Infrastructure

# 4. Start the ASP.NET Core API Backend (Port 5000)
dotnet run --project src/CoreGrid.Api

# 5. Start Python LangGraph Agent Service (Port 8000)
cd agents/
uvicorn main:app --reload --port 8000
`;

  const apiEndpointsList = `// CoreGrid System REST API Endpoints Overview

GET    /api/v1/assets                   // List assets with pagination & domain filters
POST   /api/v1/assets                   // Register new asset with dynamic schema attributes
GET    /api/v1/assets/{id}              // Fetch asset details + complete audit history
POST   /api/v1/assets/{id}/evaluations  // Trigger 4-Agent LangGraph evaluation pipeline
POST   /api/v1/approvals/{id}/sign-off // Human Officer sign-off for proposed disposal
GET    /api/v1/schemas/{domain}         // Get active JSON schema for domain profile
POST   /api/v1/schemas                  // Deploy updated domain schema definition
GET    /api/v1/audit/logs               // Query immutable audit trail events
`;

  return (
    <div className="py-12 md:py-20 bg-[var(--bg)]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <Badge variant="accent font-mono">Documentation & Specs</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            CoreGrid Documentation Hub
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Developer guides, API endpoint specifications, deployment manifests, and architecture decision records (ADRs) for CoreGrid.
          </p>
        </div>

        {/* Sidebar + Main Doc Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3 space-y-1 sticky top-20">
            <div className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Documentation Index
            </div>
            {docSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === sec.id
                    ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold dark:text-blue-300"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {sec.icon}
                  <span>{sec.title}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-[var(--text-muted)]" />
              </button>
            ))}
          </div>

          {/* Main Doc View (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {activeTab === "quickstart" && (
              <Card className="bg-[var(--surface)] p-8 space-y-6">
                <div className="space-y-2 pb-4 border-b border-[var(--border)]">
                  <Badge variant="mono">Local Development Setup</Badge>
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    Quickstart Guide
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Follow these steps to run the complete CoreGrid stack locally using Docker Compose, .NET 8 SDK, and Python 3.11.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] font-mono">
                    Prerequisites
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-mono list-disc list-inside">
                    <li>.NET 8 SDK installed</li>
                    <li>Python 3.11+ with virtualenv or uv</li>
                    <li>Docker & Docker Compose</li>
                    <li>Node.js 18+ (for this web showcase frontend)</li>
                  </ul>
                </div>

                <CodeBlock
                  code={quickstartCode}
                  language="bash"
                  filename="terminal_setup.sh"
                  showLineNumbers={true}
                />
              </Card>
            )}

            {activeTab === "architecture" && (
              <Card className="bg-[var(--surface)] p-8 space-y-6">
                <div className="space-y-2 pb-4 border-b border-[var(--border)]">
                  <Badge variant="accent">System Topology</Badge>
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    Microservice Architecture
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    CoreGrid utilizes a clean 3-tier architecture with separate REST API, LangGraph agent service, and PostgreSQL stores.
                  </p>
                </div>

                <div className="space-y-4 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    <strong>API Gateway:</strong> Written in C# ASP.NET Core 8. Handles HTTP requests, JWT token validation via OIDC middleware, EF Core database operations, and state machine validations.
                  </p>
                  <p>
                    <strong>Agent Engine:</strong> Built with Python 3.11, FastAPI, and LangGraph. Runs asynchronously to perform LLM reasoning and deterministic statutory policy validation.
                  </p>
                  <p>
                    <strong>Database:</strong> PostgreSQL 16 with JSONB indexing support for dynamic domain schemas.
                  </p>
                </div>
              </Card>
            )}

            {activeTab === "agentic-ai" && (
              <Card className="bg-[var(--surface)] p-8 space-y-6">
                <div className="space-y-2 pb-4 border-b border-[var(--border)]">
                  <Badge variant="mono">LangGraph DAG</Badge>
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    Agentic AI Configuration
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    How to configure agent prompts, model parameters, and deterministic policy thresholds.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
                  <p>
                    Agent prompts are stored in <code className="text-[var(--accent)] font-semibold">agents/prompts/</code> as versioned YAML files. Each agent receives structured Pydantic input payloads and must emit strictly validated JSON schema outputs.
                  </p>
                </div>
              </Card>
            )}

            {activeTab === "schemas" && (
              <Card className="bg-[var(--surface)] p-8 space-y-6">
                <div className="space-y-2 pb-4 border-b border-[var(--border)]">
                  <Badge variant="accent">JSON Schema</Badge>
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    Dynamic Schema Definitions
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Domain profiles are authored as standard JSON Schema Draft-07 specifications and registered through the admin REST API.
                  </p>
                </div>
              </Card>
            )}

            {activeTab === "api-ref" && (
              <Card className="bg-[var(--surface)] p-8 space-y-6">
                <div className="space-y-2 pb-4 border-b border-[var(--border)]">
                  <Badge variant="mono">OpenAPI Specification</Badge>
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    REST API Endpoints Overview
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Key REST API routes exposed by the ASP.NET Core web service.
                  </p>
                </div>
                <CodeBlock
                  code={apiEndpointsList}
                  language="http"
                  filename="api_routes_summary.http"
                  showLineNumbers={true}
                />
              </Card>
            )}

            {activeTab === "security-setup" && (
              <Card className="bg-[var(--surface)] p-8 space-y-6">
                <div className="space-y-2 pb-4 border-b border-[var(--border)]">
                  <Badge variant="mono">OIDC / Asgardeo</Badge>
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    Asgardeo OIDC Integration Setup
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Configure OAuth 2.0 PKCE authentication with Asgardeo Identity Server.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
