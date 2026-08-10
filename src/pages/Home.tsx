import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Layers,
  Cpu,
  Building2,
  MapPin,
  ClipboardList,
  Wrench,
  RefreshCw,
  Search,
  ChevronRight,
} from "lucide-react";

const departmentLogos = [
  {
    name: "Department of Industry Analyst",
    image: "/assets/images/departments/Analyst.jpg",
  },
  {
    name: "Ministry of Education",
    image: "/assets/images/departments/edu.jpg",
  },
  {
    name: "Excise Department of Sri Lanka",
    image: "/assets/images/departments/excise-department-of-sri-lanka.jpg",
  },
  {
    name: "Ministry of Health",
    image: "/assets/images/departments/Health__Mass_Media.jpg",
  },
  {
    name: "Industry News",
    image: "/assets/images/departments/News.jpeg",
  },
  {
    name: "Industry Printing Department",
    image: "/assets/images/departments/SriLankaPrinting.jpg",
  },
];
/* ─── Helper: section fade-in on scroll ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Platform modules ─── */
const modules = [
  {
    icon: ClipboardList,
    title: "Asset Registry",
    desc: "Centralised asset registration with QR identification, geolocation tagging, and full lifecycle records for every Industry asset.",
  },
  {
    icon: Wrench,
    title: "Maintenance Management",
    desc: "Schedule preventive maintenance, track work orders in real-time, and automate escalations to reduce asset downtime.",
  },
  {
    icon: RefreshCw,
    title: "Transfers & Disposals",
    desc: "Streamline inter-department transfers and regulated disposal workflows with full audit trails and approvals.",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Compliance",
    desc: "Built-in compliance checks, audit logs, and policy enforcement aligned with Sri Lanka Industry regulations.",
  },
  {
    icon: MapPin,
    title: "GIS Mapping",
    desc: "Visualise Industry assets on interactive maps with ESRI-powered spatial analysis and field team synchronisation.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Real-time dashboards, multi-year forecasting, and exportable reports for evidence-based decision making.",
  },
];

/* ─── AI features ─── */
const aiFeatures = [
  "Repair vs Replace recommendations powered by condition scoring",
  "Predictive maintenance alerts before failures occur",
  "Transfer priority analysis across departments",
  "Disposal compliance checks with legal regulation matching",
  "Human-in-the-loop approval for every AI recommendation",
];

/* ─── Departments ─── */
const departments = [
  { icon: Building2, name: "Finance Ministry" },
  { icon: Building2, name: "Provincial Councils" },
  { icon: Building2, name: "Municipal Authorities" },
  { icon: Building2, name: "Health Sector" },
  { icon: Building2, name: "Education Sector" },
  { icon: Building2, name: "Defense Assets" },
  { icon: Building2, name: "Transportation" },
  { icon: Building2, name: "Agriculture" },
];

/* ─── How It Works steps ─── */
const steps = [
  { num: "01", title: "Register & Identify", desc: "Register all Industry assets with QR codes, serial numbers, and geolocation. Capture full acquisition details and assign to departments." },
  { num: "02", title: "Monitor & Maintain", desc: "Track asset health in real-time. Schedule preventive maintenance, receive alerts, and dispatch field teams directly from the platform." },
  { num: "03", title: "Analyse & Decide", desc: "CoreGrid's AI agents analyse condition data and surface Repair, Transfer, or Dispose recommendations with supporting evidence." },
  { num: "04", title: "Execute & Audit", desc: "Authorised officers approve decisions. Every action is logged, time-stamped, and audit-ready for Industry compliance." },
];

/* ═══════════════════════════════════════════ */
export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
    HERO SECTION
    Video Background + Left Text + Right View.png
═══════════════════════════════════════════════════════ */}
{/* ═══════════════════════════════════════════════════════
    HERO SECTION — FULL WIDTH
═══════════════════════════════════════════════════════ */}

<section
  className="
    relative
    min-h-[760px]
    lg:min-h-[820px]
    xl:min-h-[880px]
    overflow-hidden
    bg-[#06101f]
    flex
    items-center
  "
>
  {/* ═══════════════════════════════════════
      BACKGROUND VIDEO
  ═══════════════════════════════════════ */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
    "
  >
    <source
      src="/assets/Videos/HomePageVide.mp4"
      type="video/mp4"
    />
  </video>

  {/* DARK OVERLAY */}
  <div
    className="
      absolute
      inset-0
      bg-[#020b18]/70
    "
  />

  {/* LEFT SIDE DARK GRADIENT */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-[#020b18]/95
      via-[#020b18]/65
      to-[#020b18]/30
    "
  />

  {/* BOTTOM GRADIENT */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-t
      from-[#020b18]/95
      via-transparent
      to-transparent
    "
  />

  {/* ═══════════════════════════════════════
      HERO CONTENT
  ═══════════════════════════════════════ */}
  <div
    className="
      relative
      z-10

      w-full

      px-6
      sm:px-8
      lg:px-10
      xl:px-12
      2xl:px-14

      py-20
    "
  >
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-[0.85fr_1.15fr]

        items-center

        gap-12
        lg:gap-16
        xl:gap-20
      "
    >
      {/* ═══════════════════════════════════
          LEFT — TEXT
      ═══════════════════════════════════ */}
      <div
        className="
          w-full
          max-w-[760px]

          lg:justify-self-start
        "
      >


        {/* HEADING */}
        <h1
          className="
            text-[42px]
            sm:text-[50px]
            lg:text-[58px]
            xl:text-[66px]
            2xl:text-[72px]

            leading-[1.08]

            font-bold

            tracking-tight

            text-white
          "
        >
          The Unified Platform
          <br />
          for{" "}
          <span className="text-[#e8601c]">
           Asset
          </span>{" "}
          
          <br />
          Management
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            mt-8

            max-w-[680px]

            text-[16px]
            lg:text-[17px]
            xl:text-[18px]

            leading-[1.9]

            text-white/65
          "
        >
          CoreGrid centralises every asset across all
          departments — from registration to disposal — with
          AI-powered decision support, real-time monitoring, and
          full audit compliance.
        </p>

        {/* BUTTONS */}
        <div
          className="
            flex
            flex-wrap
            items-center

            gap-4

            mt-9
          "
        >
          <a
            href="#contact"
            className="
              inline-flex
              items-center
              justify-center
              gap-3

              px-8
              py-4

              bg-[#e8601c]

              hover:bg-[#f07030]

              text-white
              text-[16px]
              font-bold

              rounded-xl

              transition-all
              duration-200

              shadow-lg
              shadow-[#e8601c]/20

              hover:-translate-y-0.5
            "
          >
            Get Started

            <span className="text-xl">
              →
            </span>
          </a>

          <a
            href="#how-it-works"
            className="
              inline-flex
              items-center
              justify-center

              px-8
              py-4

              border
              border-white/25

              bg-white/10

              hover:bg-white/15
              hover:border-white/40

              text-white
              text-[16px]
              font-semibold

              rounded-xl

              backdrop-blur-sm

              transition-all
              duration-200
            "
          >
            See How It Works
          </a>
        </div>

        {/* FEATURES */}
        <div
          className="
            flex
            flex-wrap

            items-center

            gap-x-7
            gap-y-4

            mt-9
          "
        >
          {[
            "ISO 27001 Aligned",
            "Data Security",
            "Multi-Department Ready",
          ].map((item) => (
            <div
              key={item}
              className="
                flex
                items-center
                gap-2.5

                text-[13px]
                lg:text-[14px]

                text-white/65
              "
            >
              <div
                className="
                  w-4
                  h-4

                  rounded-full

                  border-2
                  border-[#e8601c]

                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    w-1.5
                    h-1.5

                    rounded-full

                    bg-[#e8601c]
                  "
                />
              </div>

              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════
          RIGHT — VIEW.PNG
      ═══════════════════════════════════ */}
      <div
        className="
          relative

          w-full

          flex
          items-center
          justify-end
        "
      >
        {/* SUBTLE GLOW BEHIND IMAGE */}
        <div
          className="
            absolute
            right-[5%]
            top-1/2
            -translate-y-1/2

            w-[70%]
            h-[70%]

            bg-[#e8601c]/10

            rounded-full

            blur-[100px]
          "
        />

        <img
          src="/assets/images/View.png"
          alt="GovAsset Platform Dashboard"
          className="
            relative
            z-10

            w-full

            max-w-[900px]
            xl:max-w-[900px]
            2xl:max-w-[600px]

            h-auto

            object-contain

            ml-auto
          "
        />
      </div>
    </div>
  </div>
</section>





      {/* ═══════════════════════════════════════════════════════
    ASSET DEPARTMENT LOGO SLIDER
═══════════════════════════════════════════════════════ */}
<section
  className="
    relative
    w-full
    bg-white
    overflow-hidden
    border-y
    border-slate-200
    py-16
    md:py-20
    lg:py-24
  "
>
  {/* Heading */}
  <div className="relative z-10 text-center mb-12">
    <p
      className="
        text-[13px]
        md:text-[15px]
        font-bold
        tracking-[0.22em]
        uppercase
        text-slate-400
      "
    >
      Trusted Across Sri Lanka’s Industries
    </p>
  </div>

  {/* Slider Area */}
  <div className="relative w-full overflow-hidden">

    {/* Left fade */}
    <div
      className="
        absolute
        left-0
        top-0
        bottom-0
        z-20
        w-20
        md:w-32
        lg:w-44
        bg-gradient-to-r
        from-white
        via-white/80
        to-transparent
        pointer-events-none
      "
    />

    {/* Right fade */}
    <div
      className="
        absolute
        right-0
        top-0
        bottom-0
        z-20
        w-20
        md:w-32
        lg:w-44
        bg-gradient-to-l
        from-white
        via-white/80
        to-transparent
        pointer-events-none
      "
    />

    {/* Moving logos */}
    <div className="department-logo-track">

      {/* FIRST COPY */}
      {departmentLogos.map((department, index) => (
        <div
          key={`first-${index}`}
          className="
            flex-shrink-0
            w-[280px]
            md:w-[330px]
            lg:w-[380px]

            h-[150px]
            md:h-[170px]
            lg:h-[190px]

            flex
            items-center
            justify-center

            px-10
          "
        >
          <img
            src={department.image}
            alt={department.name}
            className="
              max-w-[240px]
              md:max-w-[280px]
              lg:max-w-[320px]

              max-h-[110px]
              md:max-h-[125px]
              lg:max-h-[140px]

              w-auto
              h-auto

              object-contain

              transition-all
              duration-300

              hover:scale-110
            "
          />
        </div>
      ))}

      {/* SECOND COPY — needed for infinite scroll */}
      {departmentLogos.map((department, index) => (
        <div
          key={`second-${index}`}
          className="
            flex-shrink-0
            w-[280px]
            md:w-[330px]
            lg:w-[380px]

            h-[150px]
            md:h-[170px]
            lg:h-[190px]

            flex
            items-center
            justify-center

            px-10
          "
        >
          <img
            src={department.image}
            alt={department.name}
            className="
              max-w-[240px]
              md:max-w-[280px]
              lg:max-w-[320px]

              max-h-[110px]
              md:max-h-[125px]
              lg:max-h-[140px]

              w-auto
              h-auto

              object-contain

              transition-all
              duration-300

              hover:scale-110
            "
          />
        </div>
      ))}

    </div>
  </div>
</section>

  

     {/* ═══════════════════════════════════════════════════════
    PLATFORM OVERVIEW
    Circle Image Left + Features Right
═══════════════════════════════════════════════════════ */}
<section
  id="assets"
  className="
    bg-white
    py-24
    md:py-28
    lg:py-32
    overflow-hidden
  "
>
  <div
    className="
      w-full
      max-w-[1600px]
      mx-auto
      px-6
      md:px-10
      lg:px-14
      xl:px-20
    "
  >
    <FadeSection
      className="
        grid
        lg:grid-cols-[0.85fr_1.15fr]
        items-center

        gap-16
        lg:gap-24
        xl:gap-32
        2xl:gap-40
      "
    >

      {/* ═══════════════════════════════
          LEFT — CIRCLE IMAGE
      ═══════════════════════════════ */}
      <div
        className="
          flex
          items-center
          justify-center
          lg:justify-end
        "
      >
        <img
          src="/assets/images/Circle_View.png"
          alt="GovAsset Platform Lifecycle"
          className="
            block

            w-full
            max-w-[500px]
            lg:max-w-[540px]
            xl:max-w-[580px]

            h-auto

            object-contain

            mix-blend-multiply

            drop-shadow-[0_20px_30px_rgba(15,23,42,0.10)]
          "
        />
      </div>


      {/* ═══════════════════════════════
          RIGHT — CONTENT
      ═══════════════════════════════ */}
      <div
        className="
          lg:pl-6
          xl:pl-10
          2xl:pl-14
          max-w-[720px]
        "
      >

        {/* Heading */}
        <h2
          className="
            text-3xl
            md:text-4xl
            lg:text-[42px]
            xl:text-[46px]

            font-bold
            text-[#0b1223]

            mb-5
            leading-[1.15]
            tracking-[-0.02em]
          "
        >
          Unified Asset
          <br className="hidden xl:block" />
          {" "}Management Software That
          <br className="hidden xl:block" />
          {" "}Integrates
        </h2>


        {/* Description */}
        <p
          className="
            text-[16px]
            lg:text-[17px]

            text-[#0b1223]/60

            leading-[1.7]

            mb-10

            max-w-[680px]
          "
        >
          One platform connecting every department, every asset, and every
          decision — purpose-built for Sri Lanka&apos;s public sector.
        </p>


        {/* ═══════════════════════════════
            FEATURES
        ═══════════════════════════════ */}
        <div className="space-y-8">

          {[
            {
              icon: Layers,
              title: "Purpose-Built Ecosystem",
              desc:
                "Scalable, secure, and designed to share data seamlessly across all Industry modules.",
            },

            {
              icon: ShieldCheck,
              title: "Reliable & Compliant",
              desc:
                "Eliminates fragmented paper-based tools by centralising data with built-in audit trails.",
            },

            {
              icon: BarChart3,
              title: "Scalable Growth",
              desc:
                "Grows with your department — from a single municipality to a nationwide rollout.",
            },

            {
              icon: Cpu,
              title: "Greater Flexibility",
              desc:
                "API-first architecture, mobile apps, and department portals for seamless integration.",
            },
          ].map(({ icon: Icon, title, desc }) => (

            <div
              key={title}
              className="
                flex
                items-start
                gap-5
              "
            >

              {/* Icon */}
              <div
                className="
                  flex-shrink-0

                  w-12
                  h-12

                  rounded-xl

                  bg-[#e8601c]/10

                  flex
                  items-center
                  justify-center
                "
              >
                <Icon
                  size={20}
                  className="text-[#e8601c]"
                />
              </div>


              {/* Feature Text */}
              <div>

                <h3
                  className="
                    font-semibold
                    text-[#0b1223]
                    text-[16px]
                    lg:text-[17px]
                    mb-1.5
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    text-[14px]
                    lg:text-[15px]
                    text-[#0b1223]/60
                    leading-[1.7]
                  "
                >
                  {desc}
                </p>

              </div>

            </div>

          ))}

        </div>
      </div>

    </FadeSection>
  </div>
</section>
      {/* ════════════════════════════════════════
    PLATFORM MODULES GRID
════════════════════════════════════════ */}
<section className="bg-[#f7f9fc] py-24 lg:py-28">
  <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

    {/* Heading */}
    <FadeSection className="text-center mb-16">
      <span className="inline-block text-[#e8601c] text-sm font-bold tracking-[0.18em] uppercase mb-4">
        Platform Capabilities
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-[#0b1223] mb-5">
        Integrated Industry Asset Suite
      </h2>

      <p className="text-[16px] md:text-[17px] text-[#0b1223]/60 max-w-3xl mx-auto leading-relaxed">
        Every module is interconnected — data flows seamlessly across registry,
        maintenance, compliance, and analytics without duplication.
      </p>
    </FadeSection>


    {/* Cards */}
    <FadeSection className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      {modules.map(({ icon: Icon, title, desc }, index) => (
        <div
          key={title}
          className="
            relative
            overflow-hidden

            min-h-[330px]

            bg-white

            rounded-[24px]

            border
            border-slate-200/80

            px-9
            py-10

            shadow-[0_10px_35px_rgba(15,23,42,0.06)]

            transition-all
            duration-300

            hover:-translate-y-2
            hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)]
            hover:border-[#e8601c]/30

            group
          "
        >

          {/* Soft orange glow */}
          <div
            className="
              absolute
              -top-20
              -right-20

              w-52
              h-52

              rounded-full

              bg-[#e8601c]/[0.06]

              blur-2xl

              transition-all
              duration-300

              group-hover:bg-[#e8601c]/10
            "
          />


          {/* Number */}
          <div
            className="
              absolute
              top-8
              right-8

              text-[44px]
              font-bold

              text-slate-100

              group-hover:text-orange-100

              transition-colors
              duration-300
            "
          >
            0{index + 1}
          </div>


          {/* Icon */}
          <div
            className="
              relative
              z-10

              w-16
              h-16

              rounded-2xl

              bg-gradient-to-br
              from-orange-50
              to-orange-100

              border
              border-orange-100

              flex
              items-center
              justify-center

              mb-8

              transition-all
              duration-300

              group-hover:bg-[#e8601c]
              group-hover:border-[#e8601c]
              group-hover:scale-110
            "
          >
            <Icon
              size={28}
              strokeWidth={1.8}
              className="
                text-[#e8601c]
                group-hover:text-white
                transition-colors
                duration-300
              "
            />
          </div>


          {/* Content */}
          <div className="relative z-10">

            <h3
              className="
                text-[21px]
                lg:text-[22px]

                font-bold

                text-[#0b1223]

                mb-4

                group-hover:text-[#e8601c]

                transition-colors
                duration-300
              "
            >
              {title}
            </h3>

            <p
              className="
                text-[15px]
                lg:text-[16px]

                text-[#0b1223]/60

                leading-[1.8]

                max-w-[360px]
              "
            >
              {desc}
            </p>

          </div>


          {/* Bottom accent */}
          <div
            className="
              absolute
              left-0
              bottom-0

              h-[4px]
              w-0

              bg-[#e8601c]

              transition-all
              duration-500

              group-hover:w-full
            "
          />

        </div>
      ))}

    </FadeSection>

  </div>
</section>

     {/* ════════════════════════════════════════
    DEPARTMENTS & SECTORS
════════════════════════════════════════ */}
<section
  id="departments"
  className="bg-[#f7f9fc] py-24 lg:py-28"
>
 <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

    {/* SECTION HEADING */}
    <FadeSection className="text-center mb-16">

      <span
        className="
          inline-block
          text-[#e8601c]
          text-sm
          font-bold
          tracking-[0.18em]
          uppercase
          mb-4
        "
      >
        Departments & Sectors
      </span>

      <h2
        className="
          text-4xl
          md:text-5xl
          font-bold
          text-[#0b1223]
          mb-5
        "
      >
        Powering Every Industry Department
      </h2>

      <p
        className="
          text-[16px]
          md:text-[17px]
          text-[#0b1223]/60
          max-w-3xl
          mx-auto
          leading-relaxed
        "
      >
        From provincial councils to central ministries — GovAsset is
        designed to scale across Sri Lanka&apos;s entire public sector.
      </p>

    </FadeSection>


    {/* ═══════════════════════════════════════
        DEPARTMENT CARDS
    ═══════════════════════════════════════ */}
    <FadeSection
      className="
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-7
      "
    >

      {departments.map(({ icon: Icon, name }, index) => (

        <div
          key={name}
          className="
            relative
            overflow-hidden

            min-h-[250px]

            bg-white

            rounded-[24px]

            border
            border-slate-200/80

            p-8

            shadow-[0_10px_35px_rgba(15,23,42,0.06)]

            transition-all
            duration-300

            hover:-translate-y-2
            hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)]
            hover:border-[#e8601c]/30

            group
          "
        >

          {/* SOFT ORANGE BACKGROUND GLOW */}
          <div
            className="
              absolute
              -top-16
              -right-16

              w-40
              h-40

              rounded-full

              bg-[#e8601c]/[0.05]
              blur-2xl

              transition-all
              duration-300

              group-hover:bg-[#e8601c]/10
            "
          />


          {/* CARD NUMBER */}
          <span
            className="
              absolute
              top-7
              right-7

              text-[38px]
              font-bold

              text-slate-100

              group-hover:text-orange-100

              transition-colors
              duration-300
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>


          {/* ICON */}
          <div
            className="
              relative
              z-10

              w-16
              h-16

              rounded-2xl

              bg-gradient-to-br
              from-orange-50
              to-orange-100

              border
              border-orange-100

              flex
              items-center
              justify-center

              mb-10

              transition-all
              duration-300

              group-hover:bg-[#e8601c]
              group-hover:border-[#e8601c]
              group-hover:scale-110
            "
          >
            <Icon
              size={28}
              strokeWidth={1.8}
              className="
                text-[#e8601c]

                group-hover:text-white

                transition-colors
                duration-300
              "
            />
          </div>


          {/* DEPARTMENT NAME */}
          <div className="relative z-10">

            <h3
              className="
                text-[19px]
                lg:text-[20px]

                font-bold

                text-[#0b1223]

                leading-[1.35]

                group-hover:text-[#e8601c]

                transition-colors
                duration-300
              "
            >
              {name}
            </h3>

            {/* SMALL DECORATIVE LINE */}
            <div
              className="
                w-10
                h-[3px]

                bg-[#e8601c]/30

                rounded-full

                mt-5

                transition-all
                duration-300

                group-hover:w-20
                group-hover:bg-[#e8601c]
              "
            />

          </div>


          {/* BOTTOM ORANGE HOVER LINE */}
          <div
            className="
              absolute
              left-0
              bottom-0

              h-[4px]
              w-0

              bg-[#e8601c]

              transition-all
              duration-500

              group-hover:w-full
            "
          />

        </div>

      ))}

    </FadeSection>

  </div>
</section>

      {/* ════════════════════════════════════════
    KNOWLEDGE HUB
════════════════════════════════════════ */}
<section className="bg-[#f8fafc] py-24 lg:py-28">
  <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

    {/* Heading */}
    <FadeSection className="text-center mb-16">
      <span className="inline-block text-[#e8601c] text-sm font-bold tracking-[0.18em] uppercase mb-4">
        Resources & Insights
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-[#0b1223] mb-5">
        Knowledge Hub
      </h2>

      <p className="text-[16px] md:text-[17px] text-[#0b1223]/60 max-w-2xl mx-auto leading-relaxed">
        Explore useful resources, expert insights, and practical information
        related to Industry asset management.
      </p>
    </FadeSection>


    {/* Cards */}
    <FadeSection className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      {/* WEBINARS */}
      <div
        className="
          bg-white
          rounded-[24px]
          overflow-hidden
          border
          border-slate-200/80
          shadow-[0_10px_35px_rgba(15,23,42,0.06)]
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)]
          group
        "
      >
        {/* Image */}
        <div className="p-6 pb-0">
          <div className="overflow-hidden rounded-2xl h-[260px]">
            <img
              src="/assets/images/Knowledge_Hub/webinars.jpg"
              alt="Industry asset management webinars"
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-7 pb-9 text-center">
          <h3 className="text-[24px] font-bold text-[#0b1223] mb-3">
            Webinars
          </h3>

          <p className="text-[15px] text-[#0b1223]/60 leading-relaxed mb-7">
            Join informative sessions on modern Industry asset management,
            compliance, technology, and digital transformation.
          </p>

          <a
            href="#"
            className="
              inline-flex
              items-center
              justify-center
              px-7
              py-3.5
              rounded-xl
              bg-[#e8601c]
              hover:bg-[#f07030]
              text-white
              text-[15px]
              font-semibold
              transition-all
              duration-200
            "
          >
            View Webinars
          </a>
        </div>
      </div>


      {/* THOUGHT LEADERSHIP */}
      <div
        className="
          bg-white
          rounded-[24px]
          overflow-hidden
          border
          border-slate-200/80
          shadow-[0_10px_35px_rgba(15,23,42,0.06)]
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)]
          group
        "
      >
        {/* Image */}
        <div className="p-6 pb-0">
          <div className="overflow-hidden rounded-2xl h-[260px]">
            <img
              src="/assets/images/Knowledge_Hub/thought-leadership.jpg"
              alt="Industry asset management thought leadership"
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-7 pb-9 text-center">
          <h3 className="text-[24px] font-bold text-[#0b1223] mb-3">
            Thought Leadership
          </h3>

          <p className="text-[15px] text-[#0b1223]/60 leading-relaxed mb-7">
            Discover expert perspectives on public sector asset strategy,
            lifecycle planning, governance, and digital innovation.
          </p>

          <a
            href="#"
            className="
              inline-flex
              items-center
              justify-center
              px-7
              py-3.5
              rounded-xl
              bg-[#e8601c]
              hover:bg-[#f07030]
              text-white
              text-[15px]
              font-semibold
              transition-all
              duration-200
            "
          >
            View Resources
          </a>
        </div>
      </div>


      {/* ARTICLES */}
      <div
        className="
          bg-white
          rounded-[24px]
          overflow-hidden
          border
          border-slate-200/80
          shadow-[0_10px_35px_rgba(15,23,42,0.06)]
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)]
          group
        "
      >
        {/* Image */}
        <div className="p-6 pb-0">
          <div className="overflow-hidden rounded-2xl h-[260px]">
            <img
              src="/assets/images/Knowledge_Hub/articles.jpg"
              alt="Industry asset management articles"
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-7 pb-9 text-center">
          <h3 className="text-[24px] font-bold text-[#0b1223] mb-3">
            Articles
          </h3>

          <p className="text-[15px] text-[#0b1223]/60 leading-relaxed mb-7">
            Read practical articles on asset registration, maintenance,
            auditing, compliance, AI decision support, and reporting.
          </p>

          <a
            href="#"
            className="
              inline-flex
              items-center
              justify-center
              px-7
              py-3.5
              rounded-xl
              bg-[#e8601c]
              hover:bg-[#f07030]
              text-white
              text-[15px]
              font-semibold
              transition-all
              duration-200
            "
          >
            View Articles
          </a>
        </div>
      </div>

    </FadeSection>
  </div>
</section>

     

      {/* ════════════════════════════════════════
          CTA BAND
      ════════════════════════════════════════ */}
      <section id="contact" className="bg-[#e8601c] py-16">
        <div className="max-w-screen-xl mx-auto px-5 lg:px-10">
          <FadeSection className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Transform Industry Asset Management?
              </h2>
              <p className="text-white/80 text-sm max-w-xl">
                We'll show you how GovAsset can streamline your entire
                department's asset lifecycle — from day one.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 flex-shrink-0">
              <a
                href="#"
                className="px-7 py-3.5 bg-white text-[#e8601c] font-bold rounded-lg hover:bg-orange-50 transition-colors text-sm whitespace-nowrap"
              >
                Request a Demo
              </a>
              <a
                href="#login"
                className="px-7 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-sm whitespace-nowrap"
              >
                Industry Login
              </a>
            </div>
          </FadeSection>
        </div>
      </section>
    </>
  );
}
