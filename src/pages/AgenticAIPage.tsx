import { useState } from "react";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import AgentGraphDiagram from "../components/diagrams/AgentGraphDiagram";
import Card from "../components/ui/Card";
import CodeBlock from "../components/ui/CodeBlock";
import Badge from "../components/ui/Badge";
import { Cpu, ShieldCheck, AlertTriangle, UserCheck, Terminal, FileCheck, ArrowRight } from "lucide-react";

export default function AgenticAIPage() {
  const [selectedAgentTab, setSelectedAgentTab] = useState<number>(0);

  const langGraphCodeSample = `# CoreGrid LangGraph 4-Agent Graph Definition (Python 3.11)

from langgraph.graph import StateGraph, END
from pydantic import BaseModel
from typing import Dict, Any, List, Optional

class AssetWorkflowState(BaseModel):
    asset_id: str
    valuation: float
    maintenance_cost_total: float
    planner_output: Optional[Dict[str, Any]] = None
    maintenance_assessment: Optional[Dict[str, Any]] = None
    budget_verification: Optional[Dict[str, Any]] = None
    policy_compliance_passed: bool = False
    requires_human_approval: bool = True
    approval_dossier: Optional[Dict[str, Any]] = None

def build_coregrid_agent_graph():
    workflow = StateGraph(AssetWorkflowState)
    
    # Add Node Agents
    workflow.add_node("planner", run_planner_agent)
    workflow.add_node("maintenance", run_maintenance_agent)
    workflow.add_node("budget", run_budget_agent)
    workflow.add_node("policy", run_policy_compliance_agent)
    workflow.add_node("human_interrupt", await_human_approval_node)

    # Define Edges with Deterministic Policy Validation
    workflow.set_entry_point("planner")
    workflow.add_edge("planner", "maintenance")
    workflow.add_edge("maintenance", "budget")
    workflow.add_edge("budget", "policy")
    
    # Conditional Interrupt based on statutory threshold
    workflow.add_conditional_edges(
        "policy",
        check_policy_interrupt_rule,
        {
            "PASSED_AWAIT_HUMAN": "human_interrupt",
            "REJECTED_SAFE_FAIL": END
        }
    )
    workflow.add_edge("human_interrupt", END)
    
    return workflow.compile(interrupt_before=["human_interrupt"])
`;

  const agentDetails = [
    {
      title: "1. Planner Agent",
      role: "Workflow Decomposition & Strategic Goal Synthesis",
      inputs: "Asset telemetry logs, failure records, initial acquisition metadata",
      outputs: "Structured JSON execution DAG with candidate resolution targets",
      description: "Decomposes complex asset evaluation requests into discrete diagnostic tool calls. It queries repair logs, analyzes depreciation trajectories, and selects candidate resolution pathways (overhaul vs disposal).",
      guardrails: "Cannot execute write commands; read-only query capabilities strictly enforced.",
    },
    {
      title: "2. Maintenance Analysis Agent",
      role: "Cost Projections & MTBF Predictive Modeling",
      inputs: "Historical repair workorders, parts pricing API, MTBF curves",
      outputs: "36-month cost projections and repair-to-replacement ratios",
      description: "Projects the Total Cost of Ownership (TCO) over the asset's remaining lifespan. If projected repair costs exceed 40% of the asset's replacement value, it triggers a disposal recommendation.",
      guardrails: "Calculations bounded by actuarial depreciation tables; no subjective cost inflation permitted.",
    },
    {
      title: "3. Budget Analysis Agent",
      role: "Fiscal Allocation & CapEx Limit Verification",
      inputs: "Departmental Q3 budget ledger, capital expenditure thresholds",
      outputs: "Fiscal availability certificate or budget constraint flag",
      description: "Cross-checks projected repair or replacement costs against the agency's approved capital budget allocations to ensure fiscal feasibility prior to policy submission.",
      guardrails: "Queries live PostgreSQL budget tables; returns deterministic boolean pass/fail status.",
    },
    {
      title: "4. Policy Compliance Agent",
      role: "Statutory Rule Engine & B2G Legal Assertion",
      inputs: "Public Sector Procurement Act regulations, Board of Survey rules",
      outputs: "Cryptographic compliance audit dossier",
      description: "Applies deterministic statutory rules (e.g. mandatory 3-board approval for assets > $50,000). Validates that all statutory preconditions are satisfied before requesting human approval.",
      guardrails: "0% LLM hallucination tolerance; statutory rules evaluated via compiled C#/Python code assertions.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[var(--bg)]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="accent">Agentic AI Specification</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            4-Agent LangGraph Workflow Architecture
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            CoreGrid implements a stateful, multi-agent graph where autonomous AI reasoning is bounded by statutory compliance rules and locked behind mandatory Human-in-the-Loop (HITL) approval interrupts.
          </p>
        </div>

        {/* Section 1: Interactive Agent Graph Visualizer */}
        <div className="space-y-6 mb-20">
          <SectionHeading
            eyebrow="Interactive Graph Trace"
            title="Stateful Agent Execution Pipeline"
            description="Click any node in the diagram below to inspect tool calls, latencies, and reasoning guardrails."
          />
          <AgentGraphDiagram interactive={true} />
        </div>

        {/* Section 2: Deep Dive into the 4 Agents */}
        <div className="space-y-8 mb-20 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="Agent Specifications"
            title="Detailed Agent Roles & Guardrails"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Tab Buttons */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {agentDetails.map((ag, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAgentTab(i)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedAgentTab === i
                      ? "bg-[var(--accent-soft)] border-[var(--accent)] font-semibold text-[var(--text-primary)] shadow-xs"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
                  }`}
                >
                  <div className="text-xs font-mono text-[var(--accent)] mb-1">AGENT 0{i + 1}</div>
                  <div className="text-sm font-semibold">{ag.title.split(". ")[1]}</div>
                </button>
              ))}
            </div>

            {/* Right Active Agent Detail */}
            <div className="lg:col-span-8">
              <Card className="bg-[var(--surface)] p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {agentDetails[selectedAgentTab].title}
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      {agentDetails[selectedAgentTab].role}
                    </p>
                  </div>
                  <Badge variant="accent">LangGraph Node</Badge>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {agentDetails[selectedAgentTab].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                  <div className="p-3 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
                    <span className="text-[var(--text-muted)] text-[10px] uppercase block mb-1">Inputs</span>
                    <span className="text-[var(--text-primary)]">{agentDetails[selectedAgentTab].inputs}</span>
                  </div>
                  <div className="p-3 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
                    <span className="text-[var(--text-muted)] text-[10px] uppercase block mb-1">Outputs</span>
                    <span className="text-[var(--text-primary)]">{agentDetails[selectedAgentTab].outputs}</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Deterministic Guardrail
                  </span>
                  <p className="text-[var(--text-secondary)]">
                    {agentDetails[selectedAgentTab].guardrails}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Section 3: Safe Failure & HITL Approval Rules */}
        <div className="space-y-6 mb-20 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="Safety Guarantees"
            title="Human-in-the-Loop & Safe Failure Protocol"
            description="The agentic graph cannot bypass human authority or silently suppress statutory compliance failures."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <UserCheck className="w-6 h-6 text-amber-500" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                Mandatory Interrupt
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                LangGraph pauses execution state before writing any terminal disposal or transfer transaction. The state is serialized and held until an authorized officer signs off.
              </p>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                Safe Failure Fallback
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                If LLM context or tool API calls fail, the graph defaults to <code className="text-rose-500 font-mono">REJECTED_SAFE_FAIL</code> state. Unverified AI outputs are discarded immediately.
              </p>
            </Card>

            <Card className="bg-[var(--surface)] p-6 space-y-3">
              <FileCheck className="w-6 h-6 text-emerald-500" />
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                Audit Dossier Assembly
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Generates a cryptographically signed PDF/JSON compliance dossier containing full reasoning traces, tool logs, and policy citations for official review.
              </p>
            </Card>
          </div>
        </div>

        {/* Section 4: Python Code Implementation Sample */}
        <div className="space-y-6 pt-10 border-t border-[var(--border)]">
          <SectionHeading
            eyebrow="Implementation Source"
            title="LangGraph Agent Graph Pipeline Code"
            description="Executable Python definition of the 4-agent graph with conditional interrupts."
          />
          <CodeBlock
            code={langGraphCodeSample}
            language="python"
            filename="coregrid_agent_graph.py"
            showLineNumbers={true}
          />
        </div>
      </Container>
    </div>
  );
}
