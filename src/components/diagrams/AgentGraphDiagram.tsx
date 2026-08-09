import { useState } from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

interface AgentGraphDiagramProps {
  interactive?: boolean;
}

export default function AgentGraphDiagram({ interactive = true }: AgentGraphDiagramProps) {
  const [activeNode, setActiveNode] = useState<number>(0);

  const nodes = [
    {
      id: "planner",
      title: "Planner Agent",
      role: "Workflow Decomposition & Strategy",
      status: "COMPLETED",
      latency: "180ms",
      details: "Analyzes asset telemetry & repair history. Generates structured JSON execution DAG targeting candidate resolution states.",
      toolCalls: ["get_asset_history", "fetch_telemetry_logs", "eval_failure_mode"],
      confidence: "98.4%",
    },
    {
      id: "maintenance",
      title: "Maintenance Analysis Agent",
      role: "Cost & Downtime Modeling",
      status: "COMPLETED",
      latency: "340ms",
      details: "Estimates Mean Time Between Failures (MTBF) and projects repair costs vs replacement thresholds over 36-month horizon.",
      toolCalls: ["calc_depreciation", "estimate_part_replacement", "project_lifecycle_cost"],
      confidence: "94.2%",
    },
    {
      id: "budget",
      title: "Budget Analysis Agent",
      role: "Fiscal Allocation Verification",
      status: "COMPLETED",
      latency: "210ms",
      details: "Cross-checks agency Q3 capital expenditure limits and verifies fund availability for repair vs disposal write-offs.",
      toolCalls: ["verify_dept_budget", "check_capex_threshold", "reserve_budget_hold"],
      confidence: "99.1%",
    },
    {
      id: "policy",
      title: "Policy Compliance Agent",
      role: "B2G Governance & Statutory Validation",
      status: "PASSED",
      latency: "190ms",
      details: "Enforces Public Sector Procurement Act rules. Requires 3 board approvals if asset value > $50,000.",
      toolCalls: ["check_statutory_rule_v4", "eval_disposal_policy", "validate_delegation_limit"],
      confidence: "100%",
    },
    {
      id: "human",
      title: "Human Approval Node (HITL)",
      role: "Board of Survey / Asset Officer",
      status: "PENDING_DECISION",
      latency: "Manual",
      details: "Agent execution pauses safely. Detailed audit package delivered to authorized Board of Survey officer for final sign-off.",
      toolCalls: ["notify_board_survey", "render_approval_dossier", "await_signature"],
      confidence: "Deterministic",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Visual Workflow Steps (Desktop SVG + Flex layout) */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[768px] relative p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-[var(--border)] -translate-y-6 z-0" />

          {/* Node Row */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            {nodes.map((node, index) => {
              const isSelected = activeNode === index;
              const isHuman = node.id === "human";

              return (
                <button
                  key={node.id}
                  onClick={() => interactive && setActiveNode(index)}
                  className={`flex-1 flex flex-col items-center p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "bg-[var(--accent-soft)] border-[var(--accent)] shadow-xs scale-102"
                      : "bg-[var(--bg)] border-[var(--border)] hover:border-[var(--text-muted)]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      0{index + 1}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isHuman
                          ? "bg-amber-500 animate-pulse"
                          : "bg-emerald-500"
                      }`}
                    />
                  </div>

                  <div className="w-8 h-8 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center mb-2 text-[var(--accent)]">
                    {isHuman ? <ShieldCheck className="w-4 h-4 text-amber-500" /> : <Cpu className="w-4 h-4" />}
                  </div>

                  <div className="font-semibold text-xs text-[var(--text-primary)] text-center line-clamp-1">
                    {node.title.split(" ")[0]}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] font-mono text-center mt-1">
                    {node.latency}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Node Details Panel */}
      {interactive && (
        <Card className="border-[var(--accent)]/30 bg-[var(--surface)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={nodes[activeNode].id === "human" ? "warning" : "accent"}>
                  Step 0{activeNode + 1} of 05
                </Badge>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {nodes[activeNode].title}
                </h3>
              </div>
              <p className="text-xs font-mono text-[var(--text-secondary)]">
                Role: {nodes[activeNode].role}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[var(--text-muted)]">Latency: <span className="text-[var(--text-primary)]">{nodes[activeNode].latency}</span></span>
              <span className="text-[var(--text-muted)]">Confidence: <span className="text-emerald-500 font-semibold">{nodes[activeNode].confidence}</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="md:col-span-2 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Agent Behavior & Reasoning
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {nodes[activeNode].details}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Deterministic Tool Invocations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {nodes[activeNode].toolCalls.map((tool) => (
                  <code
                    key={tool}
                    className="px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-[11px] font-mono text-[var(--accent)] dark:text-blue-300"
                  >
                    {tool}()
                  </code>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
