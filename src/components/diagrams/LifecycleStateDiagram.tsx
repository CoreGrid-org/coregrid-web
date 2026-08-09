import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, RefreshCw, XCircle } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function LifecycleStateDiagram() {
  const [selectedState, setSelectedState] = useState<string>("IN_SERVICE");

  const states = [
    {
      id: "REGISTERED",
      name: "Registered",
      badge: "mono",
      description: "Asset inducted into registry with QR tag, serial number, initial valuation, and assigned custodial unit.",
      allowedActions: ["Commission Asset", "Update Custom Schema Attributes"],
      nextStates: ["IN_SERVICE"],
    },
    {
      id: "IN_SERVICE",
      name: "In Service",
      badge: "success",
      description: "Asset actively operational. Telemetry, maintenance logs, and periodic inspections attached to audit trail.",
      allowedActions: ["Schedule Maintenance", "Log Inspection", "Initiate Board of Survey Review"],
      nextStates: ["UNDER_MAINTENANCE", "PROPOSED_TRANSFER", "PROPOSED_DISPOSAL"],
    },
    {
      id: "UNDER_MAINTENANCE",
      name: "Under Maintenance",
      badge: "warning",
      description: "Asset undergoing routine overhaul or corrective repair. Agentic Maintenance Agent projects MTBF impact.",
      allowedActions: ["Complete Repair Workorder", "Escalate to Replacement"],
      nextStates: ["IN_SERVICE", "PROPOSED_DISPOSAL"],
    },
    {
      id: "PROPOSED_TRANSFER",
      name: "Proposed Transfer",
      badge: "accent",
      description: "Inter-agency or inter-departmental transfer initiated. Pending Budget and Policy agent verification.",
      allowedActions: ["Execute Handover Protocol", "Cancel Transfer Request"],
      nextStates: ["TRANSFERRED", "IN_SERVICE"],
    },
    {
      id: "PROPOSED_DISPOSAL",
      name: "Proposed Disposal",
      badge: "critical",
      description: "Board of Survey disposal proposed by AI Agent. Awaiting final human approval signature from Board Officer.",
      allowedActions: ["Approve Disposal Order", "Reject & Order Repair"],
      nextStates: ["DISPOSED", "IN_SERVICE"],
    },
    {
      id: "DISPOSED",
      name: "Disposed / Written Off",
      badge: "mono",
      description: "Terminal lifecycle state. Asset decommissioned, auctioned, or recycled. Ledger entry locked immutably.",
      allowedActions: ["Export Terminal Audit Certificate"],
      nextStates: [],
    },
  ];

  const current = states.find((s) => s.id === selectedState) || states[1];

  return (
    <div className="w-full space-y-6">
      {/* State Flow Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {states.map((st) => {
          const isSelected = selectedState === st.id;
          return (
            <button
              key={st.id}
              onClick={() => setSelectedState(st.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? "bg-[var(--accent-soft)] border-[var(--accent)] font-semibold shadow-xs"
                  : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--text-muted)]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">State</span>
                <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[var(--accent)]" : "bg-gray-300"}`} />
              </div>
              <div className="text-xs font-mono font-medium text-[var(--text-primary)] leading-tight">
                {st.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* State Specification Detail Card */}
      <Card className="border-[var(--border)] bg-[var(--surface)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-mono font-semibold text-[var(--text-primary)]">
              STATE: {current.id}
            </h3>
            <Badge variant={current.badge as any}>{current.name}</Badge>
          </div>
          <div className="text-xs font-mono text-[var(--text-muted)]">
            Allowed Transitions: {current.nextStates.length > 0 ? current.nextStates.join(" → ") : "Terminal State"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Operational Semantics
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Valid Business Operations
            </span>
            <ul className="space-y-1.5 font-mono text-xs">
              {current.allowedActions.map((act) => (
                <li key={act} className="flex items-center gap-2 text-[var(--text-primary)]">
                  <ArrowRight className="w-3 h-3 text-[var(--accent)]" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
