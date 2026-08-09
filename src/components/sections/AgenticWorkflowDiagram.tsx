import { Link } from "react-router-dom";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import AgentGraphDiagram from "../diagrams/AgentGraphDiagram";
import { ArrowUpRight } from "lucide-react";

export default function AgenticWorkflowDiagram() {
  return (
    <section className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg)]">
      <Container>
        <SectionHeading
          eyebrow="Agentic Architecture"
          title="A 4-agent graph with deterministic policy enforcement and mandatory human sign-off."
          description="AI agents in CoreGrid execute as specialized nodes within a stateful LangGraph pipeline. Autonomous actions are strictly bounded by statutory rules and require explicit human approval before any irreversible ledger update."
        />

        {/* Custom Interactive SVG/CSS Diagram */}
        <div className="mt-8">
          <AgentGraphDiagram interactive={true} />
        </div>

        {/* Caption & Deep Dive Link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] font-mono text-xs text-[var(--text-secondary)]">
          <div>
            <strong className="text-[var(--text-primary)]">Safe Failure Protocol:</strong> If any policy assertion fails, the entire graph interrupts safely and emits a diagnostic alert to the human auditor.
          </div>
          <Link
            to="/agentic-ai"
            className="text-[var(--accent)] font-semibold hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Full Agent Graph Spec</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
