import { Database, Server, Smartphone, Monitor, ShieldCheck, Cpu } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function SystemContextDiagram() {
  return (
    <div className="w-full space-y-6">
      <div className="p-6 md:p-8 bg-[var(--surface)] border border-[var(--border)] rounded-xl space-y-8">
        {/* Tier 1: Client Applications */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Tier 1 — Presentation Layer
            </span>
            <Badge variant="mono">Client Apps</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center gap-3">
              <Monitor className="w-5 h-5 text-[var(--accent)]" />
              <div>
                <div className="font-semibold text-xs text-[var(--text-primary)]">Web Portal (SPA)</div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]">React 18 + TypeScript</div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-[var(--accent)]" />
              <div>
                <div className="font-semibold text-xs text-[var(--text-primary)]">Field Mobile App</div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]">Flutter + Offline Cache</div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center gap-3">
              <Cpu className="w-5 h-5 text-[var(--accent)]" />
              <div>
                <div className="font-semibold text-xs text-[var(--text-primary)]">Auditor CLI Tool</div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]">Go / REST Client</div>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow / Connector */}
        <div className="flex items-center justify-center">
          <div className="px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[10px] font-mono text-[var(--text-muted)]">
            HTTPS / REST API + OAuth 2.0 Bearer Tokens
          </div>
        </div>

        {/* Tier 2: Core Platform API & Agent Service */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Tier 2 — Enterprise Core & Decision Engine
            </span>
            <Badge variant="accent">ASP.NET Core + LangGraph</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)]/30 space-y-2">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-semibold text-sm text-[var(--text-primary)]">CoreGrid API Service</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                ASP.NET Core Web API handling Asset Registry CRUD, State Machine transitions, RBAC authorization, and audit log generation.
              </p>
              <div className="pt-2 flex flex-wrap gap-1 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                  EF Core
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                  OIDC Middleware
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                  Swagger OpenAPI
                </span>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-emerald-500/5 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold text-sm text-[var(--text-primary)]">LangGraph Agent Service</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                  Python 3.11
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Stateful 4-agent graph service executing deterministic repair/disposal reasoning with strict human approval interrupts.
              </p>
              <div className="pt-2 flex flex-wrap gap-1 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                  FastAPI
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                  LangGraph DAG
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                  Pydantic Validation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow / Connector */}
        <div className="flex items-center justify-center">
          <div className="px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[10px] font-mono text-[var(--text-muted)]">
            gRPC Internal Sync / TLS Encrypted Storage
          </div>
        </div>

        {/* Tier 3: Data & Security Posture */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Tier 3 — Persistence & Identity Posture
            </span>
            <Badge variant="mono">PostgreSQL + Asgardeo</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center gap-3">
              <Database className="w-5 h-5 text-[var(--accent)]" />
              <div>
                <div className="font-semibold text-xs text-[var(--text-primary)]">PostgreSQL Database</div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]">Relational Store + JSONB Schemas + Immutable Audit Table</div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="font-semibold text-xs text-[var(--text-primary)]">Asgardeo Identity Server</div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]">OpenID Connect / OAuth 2.0 Enterprise SSO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
