import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrainCircuit, Search, Scale, UserCheck, ArrowRight, CheckCircle2, ShieldCheck, Cpu, RefreshCw } from "lucide-react";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}
function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

const agents = [
  {
    id: "01",
    icon: Search,
    color: "from-blue-600 to-blue-800",
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-700",
    title: "Assessment Agent",
    role: "Condition Evaluator",
    desc: "Analyses the asset's full maintenance history, current condition score, age relative to expected lifespan, and frequency of breakdowns. Produces a standardised condition rating from 0–100 with detailed supporting data.",
    outputs: ["Condition Score (0–100)", "Remaining Useful Life Estimate", "Breakdown Frequency Analysis", "Maintenance Cost Trend", "Physical Deterioration Report"],
  },
  {
    id: "02",
    icon: RefreshCw,
    color: "from-green-600 to-green-800",
    border: "border-green-200",
    bg: "bg-green-50",
    text: "text-green-700",
    title: "Recommendation Agent",
    role: "Decision Optimiser",
    desc: "Calculates the total cost of ownership for three possible actions — Repair, Transfer, or Dispose — and recommends the option that maximises value for the Sri Lankan Industry based on multi-factor cost-benefit analysis.",
    outputs: ["Repair Cost Projection", "Transfer Feasibility Score", "Disposal Value Estimate", "Cost-Benefit Comparison", "Primary Recommendation with Confidence %"],
  },
  {
    id: "03",
    icon: Scale,
    color: "from-purple-600 to-purple-800",
    border: "border-purple-200",
    bg: "bg-purple-50",
    text: "text-purple-700",
    title: "Compliance Agent",
    role: "Regulatory Checker",
    desc: "Cross-references the proposed action against Sri Lanka's Financial Regulations, Establishment Code, Treasury circulars, and department-specific policies. Flags any compliance risk before the recommendation reaches a human officer.",
    outputs: ["Regulation Match Report", "Policy Compliance Score", "Treasury Circular Alignment", "Required Approvals Checklist", "Legal Risk Flag (if any)"],
  },
  {
    id: "04",
    icon: UserCheck,
    color: "from-[#e8601c] to-[#c44d10]",
    border: "border-orange-200",
    bg: "bg-orange-50",
    text: "text-orange-700",
    title: "Approval Router",
    role: "Human-in-the-Loop Gateway",
    desc: "Routes the consolidated recommendation — with all supporting evidence from the three analysis agents — to the authorised human officer. Tracks approval status, escalates if no response within the defined SLA, and records the final human decision permanently.",
    outputs: ["Consolidated Recommendation Package", "Officer Notification & SLA Timer", "Approval / Modification / Rejection Record", "Escalation if Overdue", "Immutable Decision Audit Log"],
  },
];

const principles = [
  { icon: ShieldCheck, title: "Human Always Decides", desc: "No AI recommendation is ever automatically executed. A qualified Industry officer must review, approve or reject every single recommendation before any action is taken." },
  { icon: CheckCircle2, title: "Explainable by Design", desc: "Every recommendation includes the full evidence trail — condition scores, cost calculations, compliance checks — so officers understand exactly why a recommendation was made." },
  { icon: Cpu, title: "Continuously Learning", desc: "The AI models are retrained quarterly using outcome data from approved decisions, making recommendations progressively more accurate over time." },
  { icon: BrainCircuit, title: "Bias-Audited", desc: "The AI system undergoes regular independent audits to ensure recommendations are not systematically biased by department, region, or asset type." },
];

export default function AIDecisionSupport() {
  const [activeAgent, setActiveAgent] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0b1223] pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#6d28d930_0%,_transparent_60%)]" />
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-16">
          <Fade className="text-center max-w-3xl mx-auto">
           
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Four AI Agents. One Human Decision.
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              CoreGrid's AI Decision Support Engine uses four specialised agents to analyse every
              critical asset decision from multiple dimensions — then puts the final choice
              firmly in the hands of a qualified Industry officer.
            </p>
            <Link to="/how-it-works" className="inline-flex items-center gap-2 px-8 py-4 bg-[#e8601c] text-white font-bold rounded-full hover:bg-[#f07030] transition-colors">
              See the Full Lifecycle <ArrowRight size={18} />
            </Link>
          </Fade>
        </div>
      </section>

      {/* Agent Tabs */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <Fade className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1223] mb-4">The Four AI Agents</h2>
            <p className="text-[#0b1223]/60 max-w-xl mx-auto">Each agent specialises in a different dimension of the decision. Together, they produce a recommendation no single analysis could match.</p>
          </Fade>

          {/* Tab buttons */}
          <Fade className="flex flex-wrap justify-center gap-3 mb-10">
            {agents.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setActiveAgent(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeAgent === i
                    ? "bg-[#0b1223] text-white border-[#0b1223] shadow-lg"
                    : "bg-white text-[#0b1223]/60 border-gray-200 hover:border-[#0b1223]/30"
                }`}
              >
                {a.id} — {a.title}
              </button>
            ))}
          </Fade>

          {/* Active agent detail */}
          <Fade key={activeAgent}>
            {(() => {
              const a = agents[activeAgent];
              const Icon = a.icon;
              return (
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                  <div className={`bg-gradient-to-br ${a.color} rounded-2xl p-10 text-white`}>
                    <div className="text-6xl font-black text-white/20 mb-4">{a.id}</div>
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                      <Icon size={30} />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{a.title}</h3>
                    <p className="text-white/70 text-sm mb-5">{a.role}</p>
                    <p className="text-white/85 leading-relaxed">{a.desc}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0b1223]/40 uppercase tracking-widest mb-6">Agent Outputs</h4>
                    <div className="space-y-3">
                      {a.outputs.map((output) => (
                        <div key={output} className={`flex items-center gap-3 p-4 ${a.bg} ${a.border} border rounded-xl`}>
                          <CheckCircle2 size={18} className={a.text} />
                          <span className={`text-sm font-medium ${a.text}`}>{output}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </Fade>
        </div>
      </section>

      {/* Workflow diagram (visual) */}
      <section className="bg-[#0b1223] py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <Fade className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">How the Agents Work Together</h2>
            <p className="text-white/60 max-w-xl mx-auto">The four agents run in parallel, then converge into a single consolidated recommendation package for the human officer.</p>
          </Fade>
          <Fade>
            {/* Visual flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Asset Trigger */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">📦</div>
                <div className="text-white font-semibold text-sm">Asset Triggers Threshold</div>
                <div className="text-white/50 text-xs mt-1">Condition score alert</div>
              </div>
              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <ArrowRight size={28} className="text-[#e8601c]" />
              </div>
              {/* 3 Agents running */}
              <div className="space-y-3">
                {agents.slice(0, 3).map((a) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.id} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={14} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">{a.title}</div>
                        <div className="text-white/40 text-xs">{a.role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <ArrowRight size={28} className="text-[#e8601c]" />
              </div>
              {/* Human decision */}
              <div className="bg-[#e8601c]/15 border border-[#e8601c]/40 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-white font-semibold text-sm">Officer Reviews & Decides</div>
                <div className="text-[#e8601c] text-xs mt-1 font-bold">Human-in-the-Loop</div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* AI Principles */}
      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <Fade className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0b1223] mb-4">Our AI Principles</h2>
            <p className="text-[#0b1223]/60 max-w-xl mx-auto">CoreGrid's AI is designed to assist, never replace, the judgement of Sri Lanka's Industry officers.</p>
          </Fade>
          <Fade className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#e8601c]/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[#e8601c]" />
                </div>
                <h3 className="font-bold text-[#0b1223] mb-3">{title}</h3>
                <p className="text-sm text-[#0b1223]/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </Fade>
        </div>
      </section>

      {/* Live AI demo card */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <Fade className="max-w-2xl mx-auto">
            <div className="bg-[#0b1223] rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#e8601c]/20 flex items-center justify-center">
                  <Cpu size={20} className="text-[#e8601c]" />
                </div>
                <div>
                  <div className="text-white font-bold">Live AI Recommendation</div>
                  <div className="text-white/40 text-xs">Sample output — Ministry of Education Asset #CG-07182</div>
                </div>
                <span className="ml-auto px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">ACTIVE</span>
              </div>
              {[
                { agent: "Assessment Agent", value: "Condition: 23/100 — Critical", pct: 23, color: "bg-red-500" },
                { agent: "Recommendation Agent", value: "DISPOSE — 87% confidence", pct: 87, color: "bg-[#e8601c]" },
                { agent: "Compliance Agent", value: "Gazette Notice Required — Ready", pct: 100, color: "bg-green-500" },
              ].map(({ agent, value, pct, color }) => (
                <div key={agent} className="bg-white/5 rounded-xl p-4 mb-3 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white/50">{agent}</span>
                    <span className="text-xs font-semibold text-white">{value}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full">
                    <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="mt-5 p-4 bg-[#e8601c]/10 rounded-xl border border-[#e8601c]/20">
                <div className="text-xs text-[#e8601c] font-bold mb-1">Awaiting Officer Approval</div>
                <div className="text-white/60 text-xs">Recommendation: DISPOSE — Photocopier MPC-3500 — Education Ministry, Colombo District</div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e8601c] py-16">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Experience the AI in Action</h2>
            <p className="text-white/80 text-sm">Request a live demo and see how the four agents handle a real asset decision.</p>
          </div>
          <Link to="/contact" className="px-8 py-4 bg-white text-[#e8601c] font-bold rounded-full hover:bg-orange-50 transition-colors whitespace-nowrap">
            Request Live Demo
          </Link>
        </div>
      </section>
    </>
  );
}
