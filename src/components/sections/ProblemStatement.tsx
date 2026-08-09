import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import StatCard from "../ui/StatCard";
import { FileQuestion, AlertOctagon, Scale } from "lucide-react";

export default function ProblemStatement() {
  return (
    <section className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg)]">
      <Container>
        <SectionHeading
          eyebrow="The Problem"
          title="Public sector asset registries suffer from register drift, manual boards of survey, and untracked disposal risks."
          description="Institutional infrastructure management often relies on fragmented spreadsheets, paper-based inspection certificates, and subjective disposal evaluations that fail statutory audits."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">
          {/* Left Column: 3 Stat/Callout Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <StatCard
              label="Operational Reality #1"
              value="Manual Boards"
              description="Disposal and transfer approvals require paper-based Board of Survey sign-offs, creating multi-month backlogs and delayed asset write-offs."
              icon={<FileQuestion className="w-5 h-5 text-[var(--accent)]" />}
            />
            <StatCard
              label="Operational Reality #2"
              value="Register Drift"
              description="Physical asset locations, operational status, and depreciation values diverge rapidly from recorded ledger entries within 12 months."
              icon={<AlertOctagon className="w-5 h-5 text-[var(--critical)]" />}
            />
            <StatCard
              label="Operational Reality #3"
              value="Compliance Gap"
              description="AI tools used for maintenance decisions lack statutory policy boundaries, creating governance risks during official parliamentary audits."
              icon={<Scale className="w-5 h-5 text-[var(--warning)]" />}
            />
          </div>

          {/* Right Column: Detailed Narrative (7 cols) */}
          <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold dark:text-blue-400">
                Institutional Context
              </span>
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight leading-snug">
                Why generic enterprise asset management (EAM) software fails government agencies.
              </h3>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                Commercial EAM solutions treat asset management as a purely financial or inventory tracking exercise. They ignore the strict legal frameworks, statutory procurement mandates, and multi-signature authorization hierarchies governing public sector capital assets.
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                CoreGrid bridges this gap by introducing a <strong>configurable domain model</strong> that adapts to any public sector authority (highways, railways, healthcare, municipal works) combined with a <strong>deterministic AI policy layer</strong> where autonomous recommendations are bounded by statutory regulation and validated by humans.
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4 font-mono text-xs text-[var(--text-muted)]">
              <div>
                <span className="text-[var(--text-primary)] font-semibold block text-base font-mono">100%</span>
                <span>Deterministic statutory policy compliance</span>
              </div>
              <div>
                <span className="text-[var(--text-primary)] font-semibold block text-base font-mono">Zero</span>
                <span>Unverified automated disposal actions</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
