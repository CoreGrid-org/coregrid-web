import { QrCode, Wrench, ArrowRightLeft, ShieldCheck, Cpu, Sliders, ArrowUpRight, Truck, Activity, TrainFront } from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Link } from "react-router-dom";

export default function BentoFeatureGrid() {
  return (
    <section className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container>
        <SectionHeading
          eyebrow="Platform Capabilities"
          title="Engineered for institutional scale, statutory compliance, and operational clarity."
          description="Six core modules working synchronously across your organization's entire asset lifecycle."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Hero Cell 1: Agentic Decision Support (Spans 2 cols on md) */}
          <Card className="md:col-span-2 border-[var(--accent)]/30 bg-[var(--surface)] p-8 flex flex-col justify-between hover:border-[var(--accent)] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                  <Cpu className="w-5 h-5" />
                </div>
                <Badge variant="accent">Core Differentiator</Badge>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
                  4-Agent Graph Decision Engine
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  Automates complex repair-vs-disposal evaluations using a stateful LangGraph pipeline: Planner Agent decomposes requirements, Maintenance Agent models failure costs, Budget Agent verifies fiscal limits, and Policy Agent enforces statutory rules.
                </p>
              </div>

              {/* Step indicator preview */}
              <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] font-mono text-xs space-y-2">
                <div className="text-[var(--text-muted)] text-[10px] uppercase">Execution Pipeline</div>
                <div className="flex flex-wrap items-center gap-2 text-[var(--text-primary)]">
                  <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]">Planner</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]">Maintenance</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]">Budget</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]">Policy</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 font-semibold">Human Approval</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-muted)]">Safe failure & deterministic fallback</span>
              <Link to="/agentic-ai" className="text-xs font-mono font-medium text-[var(--accent)] hover:underline flex items-center gap-1">
                <span>Explore Agent Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Feature 2: Asset Registry & QR */}
          <Card className="bg-[var(--surface)] p-6 flex flex-col justify-between hover:border-[var(--text-muted)] transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)]">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">
                  Asset Registry & QR Verification
                </h3>
                <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                  Unique serial & QR tag generation, custodial location tracking, and mobile scanner integration for rapid field verification.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border)] font-mono text-[11px] text-[var(--text-muted)]">
              Support offline verification
            </div>
          </Card>

          {/* Feature 3: Maintenance & Workorders */}
          <Card className="bg-[var(--surface)] p-6 flex flex-col justify-between hover:border-[var(--text-muted)] transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">
                  Predictive Maintenance Logs
                </h3>
                <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                  Track Mean Time Between Failures (MTBF), parts replacement history, and automated maintenance schedule triggers.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border)] font-mono text-[11px] text-[var(--text-muted)]">
              Automated workorder dispatch
            </div>
          </Card>

          {/* Hero Cell 4: Configurable Platform (Spans 2 cols on md) */}
          <Card className="md:col-span-2 border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col justify-between hover:border-[var(--text-muted)] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)]">
                  <Sliders className="w-5 h-5" />
                </div>
                <Badge variant="mono">Zero Code Mutation</Badge>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
                  Configurable Multi-Domain Data Model
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  One platform adaptable to any public sector domain. Define custom asset schemas, domain-specific attributes, and custom lifecycle state transitions purely through JSON schema configuration—no code rewrites needed.
                </p>
              </div>

              {/* Domain chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] font-mono text-xs text-[var(--text-primary)]">
                  <Truck className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Transport Fleet Domain</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] font-mono text-xs text-[var(--text-primary)]">
                  <Activity className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Healthcare Equipment Domain</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] font-mono text-xs text-[var(--text-primary)]">
                  <TrainFront className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Railway Rolling Stock Domain</span>
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-muted)]">PostgreSQL JSONB schema engine</span>
              <Link to="/platform" className="text-xs font-mono font-medium text-[var(--accent)] hover:underline flex items-center gap-1">
                <span>View Schema Visualizer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Feature 5: Transfer & Disposal */}
          <Card className="bg-[var(--surface)] p-6 flex flex-col justify-between hover:border-[var(--text-muted)] transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)]">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">
                  Inter-Agency Transfers
                </h3>
                <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                  Formal custodial handover protocols between public sector departments with automatic valuation adjustments and dual sign-off.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border)] font-mono text-[11px] text-[var(--text-muted)]">
              Custodial ledger tracking
            </div>
          </Card>

          {/* Feature 6: Audit & Statutory Compliance */}
          <Card className="md:col-span-3 bg-[var(--surface)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-[var(--text-muted)] transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">
                  Immutable Statutory Audit Trail
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                  Every state transition, AI evaluation, and officer sign-off generates a cryptographically verifiable, append-only log record ready for parliamentary audit committees and national audit offices.
                </p>
              </div>
            </div>
            <Link to="/security" className="shrink-0">
              <Badge variant="mono" size="md">
                Audit Spec →
              </Badge>
            </Link>
          </Card>
        </div>
      </Container>
    </section>
  );
}
