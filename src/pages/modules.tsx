import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  Wrench,
  RefreshCw,
  ShieldCheck,
  MapPin,
  BrainCircuit,
  Users,
  BarChart3,
  Smartphone,
  Bell,
  ArrowDown,
  ArrowRight,
  Layers,
} from "lucide-react";

/* ═══════════════════════════════════════════
   FADE ANIMATION
═══════════════════════════════════════════ */

function useFadeIn(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   LAYER DATA
═══════════════════════════════════════════ */

const layers = [
  {
    num: "01",
    tag: "Foundation",
    title: "The Core of Every Asset Record",
    desc: "These three modules form the bedrock of CoreGrid. Every other capability depends on the data and structure that this layer establishes.",
    accent: "#3b82f6",
    accentLight: "#eff6ff",
    accentText: "text-blue-600",
    accentBorder: "border-blue-200",
    accentBg: "bg-blue-50",
    accentBadge: "bg-blue-600",
    modules: [
      {
        icon: ClipboardList,
        name: "Asset Registry",
        id: "01",
        desc: "The digital identity of every asset — registered, tagged and tracked from day one with QR codes, photos and structured records.",
      },
      {
        icon: Users,
        name: "User & Access Management",
        id: "02",
        desc: "Role-based access control that ensures the right people see the right information, scoped to their department.",
      },
      {
        icon: ShieldCheck,
        name: "Audit & Compliance",
        id: "03",
        desc: "A traceable history of every lifecycle action, with approval workflows that keep every important decision accountable.",
      },
    ],
  },
  {
    num: "02",
    tag: "Asset Operations",
    title: "Managing Assets Day to Day",
    desc: "Built on top of the Foundation layer, these modules cover the operational lifecycle of every asset during normal use and key lifecycle events.",
    accent: "#10b981",
    accentLight: "#ecfdf5",
    accentText: "text-emerald-600",
    accentBorder: "border-emerald-200",
    accentBg: "bg-emerald-50",
    accentBadge: "bg-emerald-600",
    modules: [
      {
        icon: Wrench,
        name: "Maintenance Management",
        id: "04",
        desc: "Schedule preventive maintenance, raise work orders, assign technicians and track every task through to completion.",
      },
      {
        icon: RefreshCw,
        name: "Transfers & Disposals",
        id: "05",
        desc: "Controlled workflows for moving assets between departments or retiring them, with approval chains at every step.",
      },
      {
        icon: MapPin,
        name: "GIS Mapping",
        id: "06",
        desc: "See every asset plotted on a geographic map, linked to its department, district and physical location record.",
      },
    ],
  },
  {
    num: "03",
    tag: "Intelligence & Analytics",
    title: "Turning Asset Data Into Decisions",
    desc: "With a rich operational history flowing from the first two layers, these modules surface insights and AI-assisted recommendations for authorised review.",
    accent: "#8b5cf6",
    accentLight: "#f5f3ff",
    accentText: "text-violet-600",
    accentBorder: "border-violet-200",
    accentBg: "bg-violet-50",
    accentBadge: "bg-violet-600",
    modules: [
      {
        icon: BrainCircuit,
        name: "AI Decision Support",
        id: "07",
        desc: "Four specialised agents analyse condition, cost and compliance to produce structured recommendations — always reviewed by a human officer before action.",
      },
      {
        icon: BarChart3,
        name: "Analytics & Reporting",
        id: "08",
        desc: "Dashboards, condition summaries and exportable reports that give a complete operational picture across your entire asset portfolio.",
      },
    ],
  },
  {
    num: "04",
    tag: "Field & Engagement",
    title: "Bringing CoreGrid to Every Corner",
    desc: "The final layer extends CoreGrid to the field and keeps every stakeholder informed — wherever they are.",
    accent: "#e8601c",
    accentLight: "#fff7f4",
    accentText: "text-orange-600",
    accentBorder: "border-orange-200",
    accentBg: "bg-orange-50",
    accentBadge: "bg-[#e8601c]",
    modules: [
      {
        icon: Smartphone,
        name: "Mobile App",
        id: "09",
        desc: "QR code scanning, condition updates and maintenance activities — carried out from any field location on any device.",
      },
      {
        icon: Bell,
        name: "Notifications & Alerts",
        id: "10",
        desc: "Timely reminders, approval requests and status updates delivered to the right person at the right time, through the right channel.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */

export default function Modules() {
  return (
    <div className="w-full bg-white">

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}

      {/* ═══════════════════════════════════════════════
    MODULES HERO
═══════════════════════════════════════════════ */}

<section
  className="
    relative
    bg-[#0b1223]
    overflow-hidden
  "
>
  {/* subtle glow */}
  <div
    className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_18%_30%,_#e8601c16_0%,_transparent_34%)]
    "
  />

  <div
    className="
      relative
      z-10

      w-full
      max-w-[2000px]
      mx-auto

      px-6
      lg:px-10
      xl:px-12

      py-28
      lg:py-32
      xl:py-36
    "
  >
    <Fade className="max-w-[1050px]">

      {/* SMALL LABEL */}
      <span
        className="
          inline-block
          text-xs
          lg:text-sm
          font-bold
          uppercase
          tracking-[0.22em]
          text-[#e8601c]
          mb-6
        "
      >
        Platform Modules
      </span>

      {/* HEADING */}
      <h1
        className="
          text-4xl
          sm:text-5xl
          lg:text-6xl
          xl:text-[68px]

          font-bold
          tracking-tight
          leading-[1.08]

          text-white

          max-w-[980px]
        "
      >
        10 Modules. One{" "}
        <span className="text-[#e8601c]">
          Asset Management Platform.
        </span>
      </h1>

      {/* DESCRIPTION */}
      <p
        className="
          mt-8

          max-w-[900px]

          text-[16px]
          md:text-[17px]
          lg:text-[18px]

          leading-[1.8]

          text-white/55
        "
      >
        CoreGrid brings every aspect of asset lifecycle management into
        one integrated platform — from registration and maintenance
        through to AI-assisted decisions, reporting and full lifecycle
        accountability.
      </p>

    </Fade>
  </div>
</section>


      {/* ═══════════════════════════════════════════════
          ARCHITECTURE STACK OVERVIEW
      ═══════════════════════════════════════════════ */}

      <section className="bg-[#f7f9fc] py-20 lg:py-28">
        <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

          <Fade className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#e8601c]">
              The Stack
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0b1223] mt-4 mb-5 tracking-tight">
              Four layers. One unified platform.
            </h2>
            <p className="text-lg text-[#0b1223]/55 leading-relaxed">
              Each layer provides the data and capabilities that the layers above it rely on.
              Remove any layer and the ones above cannot function correctly.
            </p>
          </Fade>

          

        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          LAYER SECTIONS
      ═══════════════════════════════════════════════ */}

      {layers.map((layer, layerIndex) => (
        <section
          key={layer.num}
          id={`layer-${layer.num}`}
          className={`py-24 lg:py-32 scroll-mt-32 ${layerIndex % 2 === 0 ? "bg-white" : "bg-[#f7f9fc]"}`}
        >
          <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

            {/* LAYER HEADER */}
            <Fade className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 xl:gap-20 items-start mb-16 lg:mb-20">

              {/* LEFT — Layer label + title */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white"
                    style={{ backgroundColor: layer.accent }}
                  >
                    {layer.num}
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: layer.accent }}
                  >
                    Layer {layer.num} · {layer.tag}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0b1223] leading-tight tracking-tight">
                  {layer.title}
                </h2>
              </div>

              {/* RIGHT — Description */}
              <div className="pt-1 lg:pt-3">
                <p className="text-[17px] lg:text-[18px] text-[#0b1223]/60 leading-[1.8]">
                  {layer.desc}
                </p>

                {/* Module count pill */}
                <div className="mt-7 flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${layer.accentBg} ${layer.accentText} ${layer.accentBorder} border`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: layer.accent }}
                    />
                    {layer.modules.length} {layer.modules.length === 1 ? "Module" : "Modules"} in this layer
                  </span>
                </div>
              </div>

            </Fade>

            {/* MODULE CARDS */}
            <div
              className={`grid gap-6 lg:gap-7 ${
                layer.modules.length === 2
                  ? "md:grid-cols-2 max-w-4xl"
                  : "md:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {layer.modules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <Fade key={mod.id}>
                    <div
                      className="group relative overflow-hidden bg-white rounded-[24px] border-2 border-slate-100 transition-all duration-300 p-8 lg:p-9 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] h-full"
                      style={{ ["--layer-accent" as string]: layer.accent }}
                    >

                      {/* Decorative module number */}
                      <span className="absolute top-6 right-7 text-[52px] font-black text-slate-100 select-none pointer-events-none leading-none">
                        {mod.id}
                      </span>

                      {/* ICON */}
                      <div
                        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-7 transition-all duration-300"
                        style={{ backgroundColor: layer.accentLight }}
                      >
                        <Icon
                          size={26}
                          strokeWidth={1.8}
                          style={{ color: layer.accent }}
                        />
                      </div>

                      {/* MODULE NAME */}
                      <h3 className="relative z-10 text-[22px] lg:text-[24px] font-bold text-[#0b1223] leading-tight mb-4 pr-12">
                        {mod.name}
                      </h3>

                      {/* MODULE DESC */}
                      <p className="relative z-10 text-[15px] lg:text-[16px] text-[#0b1223]/55 leading-[1.75]">
                        {mod.desc}
                      </p>

                      {/* Bottom accent line */}
                      <div
                        className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full rounded-b-[24px]"
                        style={{ backgroundColor: layer.accent }}
                      />
                    </div>
                  </Fade>
                );
              })}
            </div>

          </div>

          {/* LAYER CONNECTOR — shown between all layers except the last */}
          {layerIndex < layers.length - 1 && (
            <Fade className="flex flex-col items-center mt-16 lg:mt-20">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-slate-200" />
                <div
                  className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center bg-white shadow-sm"
                >
                  <ArrowDown size={18} className="text-slate-400" />
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.16em] mt-1">
                  Builds on Layer {layer.num}
                </p>
              </div>
            </Fade>
          )}

        </section>
      ))}


      

      {/* ═══════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════ */}

      <section className="bg-white py-20 lg:py-28">
        <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

          <Fade>
            <div className="w-full border border-slate-200 rounded-[24px] px-8 md:px-14 lg:px-20 py-14 lg:py-18 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300">

              <div>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0b1223] leading-tight">
                  Ready to explore the full feature set?
                </h2>
                <p className="mt-4 text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">
                  Every module. Every capability. Detailed feature lists for each of the 10 modules.
                </p>
              </div>

              <Link
                to="/features"
                className="
                  group flex items-center justify-center gap-4
                  flex-shrink-0
                  px-10 lg:px-12
                  py-5 lg:py-6
                  bg-[#0b1223] hover:bg-[#e8601c]
                  text-white
                  text-lg lg:text-xl
                  font-bold
                  rounded-2xl
                  transition-all duration-300
                  shadow-sm hover:shadow-xl hover:shadow-[#e8601c]/20
                "
              >
                View All Features
                <ArrowRight
                  size={22}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>
          </Fade>

        </div>
      </section>

    </div>
  );
}
