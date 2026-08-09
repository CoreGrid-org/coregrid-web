import { ArrowRight, ShieldCheck, Cpu, Database, QrCode, FileText } from "lucide-react";
import GithubIcon from "../ui/GithubIcon";
import Container from "../layout/Container";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function Hero() {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg)] via-[var(--bg)] to-[var(--bg-subtle)]">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-xs font-mono text-[var(--text-secondary)] font-medium">
              Open Source · B2G Asset Lifecycle Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] max-w-3xl mx-auto">
            Asset lifecycle management for institutions that can't afford to guess.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto font-normal">
            CoreGrid unifies public sector asset registries, automated maintenance forecasting, and statutory compliance through a 4-agent graph with mandatory human-in-the-loop sign-off.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href="https://github.com/CoreGrid-org/coregrid-web"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View on GitHub</span>
            </Button>
            <Button
              to="/architecture"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <span>Read the Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Trust Row Tech Stack */}
          <div className="pt-8 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-[var(--text-muted)]">
            <span className="uppercase tracking-widest text-[10px]">Built With</span>
            <span className="text-[var(--text-secondary)] font-medium">ASP.NET Core</span>
            <span>·</span>
            <span className="text-[var(--text-secondary)] font-medium">PostgreSQL</span>
            <span>·</span>
            <span className="text-[var(--text-secondary)] font-medium">React 18</span>
            <span>·</span>
            <span className="text-[var(--text-secondary)] font-medium">Flutter</span>
            <span>·</span>
            <span className="text-[var(--text-secondary)] font-medium">LangGraph Agentic AI</span>
          </div>
        </div>

        {/* Static Product Visual Panel */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
            {/* Panel Header Bar */}
            <div className="px-4 py-3 bg-[var(--bg-subtle)] border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
                <span className="ml-3 text-xs font-mono text-[var(--text-muted)]">
                  coregrid://assets/AST-2026-8942 / Board of Survey Review
                </span>
              </div>
              <Badge variant="accent">Deterministic Policy Verification</Badge>
            </div>

            {/* Panel Body Grid */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[var(--surface)]">
              {/* Asset Record summary */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-start justify-between pb-4 border-b border-[var(--border)]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono text-base font-semibold text-[var(--text-primary)]">
                        CAT-3520 Hydraulic Excavator
                      </h3>
                      <Badge variant="warning">Proposed Disposal</Badge>
                    </div>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      Asset Tag: QR-SL-8942 · Department of Public Works
                    </p>
                  </div>
                  <div className="p-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
                    <QrCode className="w-8 h-8 text-[var(--text-primary)]" />
                  </div>
                </div>

                {/* Attribute Key-Values */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div>
                    <div className="text-[var(--text-muted)] text-[10px] uppercase">Acquisition Cost</div>
                    <div className="font-semibold text-[var(--text-primary)]">$142,500.00</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-muted)] text-[10px] uppercase">Current Valuation</div>
                    <div className="font-semibold text-[var(--text-primary)]">$18,400.00</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-muted)] text-[10px] uppercase">Service Lifetime</div>
                    <div className="font-semibold text-[var(--text-primary)]">8.5 Years</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-muted)] text-[10px] uppercase">Depreciation %</div>
                    <div className="font-semibold text-rose-500 font-mono">87.1%</div>
                  </div>
                </div>

                {/* Agentic Trace strip */}
                <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--text-primary)] font-semibold flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[var(--accent)]" />
                      4-Agent Graph Assessment
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      All Policy Checks Passed
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Repair cost ($24,800) exceeds maximum allowable threshold (40% of replacement value). Recommended action: <strong className="text-[var(--text-primary)]">Public Auction Disposal</strong>.
                  </p>
                </div>
              </div>

              {/* Workflow Status Strip */}
              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    Human-in-the-Loop Status
                  </div>
                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Planner Agent: OK</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Maintenance Cost: OK</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Budget Verification: OK</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Statutory Policy: PASSED</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-500 font-semibold pt-2 border-t border-[var(--border)]">
                      <FileText className="w-4 h-4" />
                      <span>Awaiting Board Officer Sign-Off</span>
                    </div>
                  </div>
                </div>

                <div className="w-full py-2 px-3 rounded bg-[var(--accent)] text-white text-center font-mono text-xs font-medium opacity-95">
                  Action Required: Approve Dossier
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
