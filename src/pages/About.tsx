import { useRef, useEffect, useState } from "react";
import {
  Target,
  Eye,
  ShieldCheck,
  QrCode,
  Wrench,
  ArrowLeftRight,
  ClipboardCheck,
  BrainCircuit,
  Layers3,
  Smartphone,
  Database,
  Server,
  Users,
} from "lucide-react";

/* ─────────────────────────────────────────
   Fade Animation
───────────────────────────────────────── */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Fade({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */

const capabilities = [
  {
    icon: QrCode,
    number: "01",
    title: "Asset Registry & Identification",
    description:
      "Maintain structured records for physical assets with configurable asset types, custom attributes and QR-based identification.",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Maintenance Management",
    description:
      "Support fault reporting, maintenance records, assignments, progress tracking, cost capture and completion.",
  },
  {
    icon: ArrowLeftRight,
    number: "03",
    title: "Transfer & Disposal",
    description:
      "Manage controlled asset transfers and disposal workflows with approval, evidence and lifecycle tracking.",
  },
  {
    icon: ClipboardCheck,
    number: "04",
    title: "Audit & Verification",
    description:
      "Support physical verification campaigns, discrepancy management and traceable audit records.",
  },
  {
    icon: BrainCircuit,
    number: "05",
    title: "AI-Assisted Decisions",
    description:
      "Analyse lifecycle information and provide structured recommendations while keeping authorised officers in control.",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Controlled & Auditable",
    description:
      "Apply role-based access, deterministic validation and human approval before high-impact lifecycle decisions.",
  },
];

const principles = [
  {
    icon: Layers3,
    title: "One Integrated Platform",
    description:
      "Web, mobile, API, database and AI services work together around one consistent asset lifecycle.",
  },
  {
    icon: Users,
    title: "Human in Control",
    description:
      "AI supports decisions rather than replacing authorised officers. High-impact actions require human approval.",
  },
  {
    icon: ShieldCheck,
    title: "Accountability by Design",
    description:
      "Important actions and lifecycle changes are designed to remain traceable and auditable.",
  },
  {
    icon: Target,
    title: "Configurable by Design",
    description:
      "Asset types, departments, locations and custom attributes can be configured for different organisational needs.",
  },
];

const technologies = [
  {
    logo: "/assets/technologies/React.svg",
    title: "React",
    label: "Management Web Application",
  },
  {
    logo: "/assets/technologies/Flutter.svg",
    title: "Flutter",
    label: "Field Operations Application",
  },
  {
    logo: "/assets/technologies/donet.svg",
    title: "ASP.NET Core",
    label: "REST API & Business Layer",
  },
  {
    logo: "/assets/technologies/PostgresSQL.svg",
    title: "PostgreSQL",
    label: "Central Data Platform",
  },
  {
    logo: "/assets/technologies/langgraph.svg",
    title: "LangGraph",
    label: "Agentic AI Workflow",
  },
];

export default function About() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}

      <section className="relative bg-[#0b1223] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#e8601c20_0%,_transparent_55%)]" />

        <div
          className="
            relative
            w-full
            max-w-[2000px]
            mx-auto
            px-6
            lg:px-10
            xl:px-12
            py-28
            lg:py-36
          "
        >
          <Fade className="max-w-[1050px]">

            
            <h1
              className="
                text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
                font-bold
                text-white
                leading-[1.08]
                tracking-tight
                mb-8
              "
            >
              A Smarter Approach to
              <span className="text-[#e8601c]">
                {" "}Public Asset Management.
              </span>
            </h1>

            <p
              className="
                text-lg
                lg:text-xl
                text-white/60
                leading-relaxed
                max-w-[850px]
              "
            >
              CoreGrid is a student-developed intelligent asset lifecycle
              management platform designed to explore how public-sector
              organisations can manage physical assets through one secure,
              configurable and accountable digital system.
            </p>

          </Fade>
        </div>
      </section>


{/* ═══════════════════════════════════════════
    ABOUT THE PROJECT
═══════════════════════════════════════════ */}

<section className="bg-white py-24 lg:py-32">
  <div
    className="
      w-full
      max-w-[2000px]
      mx-auto
      px-6
      lg:px-10
      xl:px-12
    "
  >

    <Fade
      className="
        grid
        lg:grid-cols-[0.9fr_1.1fr]
        gap-16
        lg:gap-20
        xl:gap-28
        2xl:gap-36
        items-center
      "
    >

      {/* ═══════════════════════════════
          LEFT SIDE
      ═══════════════════════════════ */}
      <div className="w-full">

        {/* SMALL LABEL */}
        <span
          className="
            inline-block
            text-xs
            font-bold
            tracking-[0.22em]
            uppercase
            text-[#e8601c]
            mb-4
          "
        >
          The Project
        </span>


        {/* TITLE */}
        <h2
          className="
            text-3xl
            md:text-4xl
            lg:text-5xl
            xl:text-[54px]
            font-bold
            text-[#0b1223]
            leading-[1.1]
            tracking-tight
            mb-10
            lg:mb-12
          "
        >
          Why CoreGrid
          ?
        </h2>


        {/* LOGO */}
        <div
          className="
            w-full
            flex
            items-center
            justify-center
            lg:justify-start
          "
        >
          <img
            src="/assets/images/logo.png"
            alt="CoreGrid Sri Lanka"
            className="
              w-full
              max-w-[520px]
              lg:max-w-[580px]
              xl:max-w-[640px]
              2xl:max-w-[680px]
              h-auto
              object-contain
            "
          />
        </div>

      </div>


      {/* ═══════════════════════════════
          RIGHT SIDE
      ═══════════════════════════════ */}
      <div
        className="
          w-full
          max-w-[900px]
          lg:pl-4
          xl:pl-8
        "
      >

        {/* SMALL LABEL */}
        <span
          className="
            inline-block
            text-xs
            font-bold
            tracking-[0.22em]
            uppercase
            text-[#e8601c]
            mb-5
          "
        >
          Unified Asset Management
        </span>


        {/* RIGHT TITLE */}
        <h3
          className="
            text-2xl
            md:text-3xl
            lg:text-[34px]
            xl:text-[38px]
            font-bold
            text-[#0b1223]
            leading-[1.2]
            tracking-tight
            max-w-[760px]
            mb-8
          "
        >
          Bringing the Complete Asset Lifecycle Into One Platform
        </h3>


        {/* PARAGRAPH 1 */}
        <p
          className="
            text-base
            md:text-lg
            lg:text-[18px]
            xl:text-[19px]
            text-[#0b1223]/60
            leading-[1.9]
            max-w-[850px]
            mb-7
          "
        >
          Managing large numbers of physical assets can become difficult
          when information is distributed across spreadsheets, paper
          records and separate departmental processes.
        </p>


        {/* PARAGRAPH 2 */}
        <p
          className="
            text-base
            md:text-lg
            lg:text-[18px]
            xl:text-[19px]
            text-[#0b1223]/60
            leading-[1.9]
            max-w-[850px]
          "
        >
          CoreGrid explores a unified digital approach where assets can
          be registered, identified, maintained, transferred, verified,
          audited and eventually disposed of through a controlled
          lifecycle. The platform also introduces AI-assisted analysis
          while ensuring that important decisions remain under
          authorised human control.
        </p>


        {/* ═══════════════════════════════
            FEATURE HIGHLIGHTS
        ═══════════════════════════════ */}
        <div
          className="
            grid
            sm:grid-cols-3
            gap-6
            lg:gap-8
            mt-12
          "
        >

          {/* CENTRALIZED */}
          <div
            className="
              border-l-[3px]
              border-[#e8601c]
              pl-5
              py-1
            "
          >
            <h4
              className="
                text-base
                lg:text-[17px]
                font-bold
                text-[#0b1223]
              "
            >
              Centralised
            </h4>

            <p
              className="
                text-sm
                text-[#0b1223]/45
                mt-1
              "
            >
              One platform
            </p>
          </div>


          {/* ACCOUNTABLE */}
          <div
            className="
              border-l-[3px]
              border-[#e8601c]
              pl-5
              py-1
            "
          >
            <h4
              className="
                text-base
                lg:text-[17px]
                font-bold
                text-[#0b1223]
              "
            >
              Accountable
            </h4>

            <p
              className="
                text-sm
                text-[#0b1223]/45
                mt-1
              "
            >
              Auditable actions
            </p>
          </div>


          {/* INTELLIGENT */}
          <div
            className="
              border-l-[3px]
              border-[#e8601c]
              pl-5
              py-1
            "
          >
            <h4
              className="
                text-base
                lg:text-[17px]
                font-bold
                text-[#0b1223]
              "
            >
              Intelligent
            </h4>

            <p
              className="
                text-sm
                text-[#0b1223]/45
                mt-1
              "
            >
              AI-assisted
            </p>
          </div>

        </div>

      </div>

    </Fade>

  </div>
</section>
      {/* ═══════════════════════════════════════════
          MISSION / VISION
          NO IMAGE
      ═══════════════════════════════════════════ */}

      <section className="bg-[#f7f9fc] py-24 lg:py-28">

        <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

          <Fade className="text-center mb-16">

            <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#e8601c]">
              Our Direction
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0b1223] mt-4">
              Purpose Behind the Platform
            </h2>

          </Fade>


          <Fade className="grid md:grid-cols-2 gap-8">

            {/* MISSION */}

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-[28px]
                p-10
                lg:p-12
                min-h-[330px]
                shadow-[0_10px_35px_rgba(15,23,42,0.05)]
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#e8601c]/10
                  flex
                  items-center
                  justify-center
                  mb-8
                "
              >
                <Target size={25} className="text-[#e8601c]" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-[#0b1223] mb-5">
                Our Mission
              </h3>

              <p className="text-base lg:text-lg text-[#0b1223]/60 leading-[1.8]">
                To design an integrated asset management platform that improves
                visibility, accountability and lifecycle coordination while
                demonstrating how modern web, mobile and AI technologies can
                support public-sector asset operations.
              </p>

            </div>


            {/* VISION */}

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-[28px]
                p-10
                lg:p-12
                min-h-[330px]
                shadow-[0_10px_35px_rgba(15,23,42,0.05)]
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#e8601c]/10
                  flex
                  items-center
                  justify-center
                  mb-8
                "
              >
                <Eye size={25} className="text-[#e8601c]" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-[#0b1223] mb-5">
                Our Vision
              </h3>

              <p className="text-base lg:text-lg text-[#0b1223]/60 leading-[1.8]">
                To demonstrate a future where physical assets can be managed
                through reliable digital records, transparent workflows,
                field-based verification and responsible AI-assisted decision
                support.
              </p>

            </div>

          </Fade>

        </div>

      </section>


     {/* ═══════════════════════════════════════════
    THE CHALLENGE & OUR APPROACH
═══════════════════════════════════════════ */}

<section className="bg-white py-24 lg:py-32">
  <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

    {/* SECTION HEADER */}
    <Fade className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">

      <span
        className="
          text-xs
          font-bold
          tracking-[0.22em]
          uppercase
          text-[#e8601c]
        "
      >
        The Core Idea
      </span>

      <h2
        className="
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-bold
          text-[#0b1223]
          mt-4
          mb-6
        "
      >
        Why CoreGrid Was Designed
      </h2>

      <p
        className="
          text-lg
          lg:text-xl
          text-[#0b1223]/55
          leading-[1.8]
          max-w-3xl
          mx-auto
        "
      >
        Public-sector asset management requires more than simply storing
        asset information. CoreGrid explores how the complete asset
        lifecycle can be managed through one connected, transparent and
        accountable digital platform.
      </p>

    </Fade>


    {/* TWO LARGE CARDS */}
    <Fade
      className="
        grid
        lg:grid-cols-2
        gap-8
        xl:gap-12
      "
    >

      {/* ═══════════════════════════
          THE CHALLENGE
      ═══════════════════════════ */}
      <div
        className="
          relative
          overflow-hidden
          bg-[#f7f9fc]
          border
          border-slate-200
          rounded-[32px]
          p-10
          lg:p-12
          xl:p-14
          min-h-[500px]
        "
      >

        {/* NUMBER */}
        <span
          className="
            absolute
            top-8
            right-10
            text-7xl
            font-bold
            text-slate-200/60
          "
        >
          01
        </span>

        {/* ICON */}
        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-[#e8601c]/10
            flex
            items-center
            justify-center
            mb-9
          "
        >
          <ClipboardCheck
            size={28}
            className="text-[#e8601c]"
          />
        </div>


        <span
          className="
            text-xs
            font-bold
            tracking-[0.20em]
            uppercase
            text-[#e8601c]
          "
        >
          The Challenge
        </span>


        <h3
          className="
            text-2xl
            lg:text-3xl
            font-bold
            text-[#0b1223]
            mt-3
            mb-8
          "
        >
          Managing Assets Across Separate Processes
        </h3>


        <div className="space-y-5">

          {[
            "Asset information spread across different records",
            "Limited visibility of asset location and condition",
            "Manual maintenance and transfer processes",
            "Difficulty maintaining complete audit histories",
            "Limited information available for timely decisions",
          ].map((item) => (

            <div
              key={item}
              className="
                flex
                items-start
                gap-4
              "
            >
              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#e8601c]
                  mt-2.5
                  flex-shrink-0
                "
              />

              <p
                className="
                  text-base
                  lg:text-lg
                  text-[#0b1223]/60
                  leading-relaxed
                "
              >
                {item}
              </p>
            </div>

          ))}

        </div>

      </div>


      {/* ═══════════════════════════
          OUR APPROACH
      ═══════════════════════════ */}
      <div
        className="
          relative
          overflow-hidden
          bg-[#0b1223]
          rounded-[32px]
          p-10
          lg:p-12
          xl:p-14
          min-h-[500px]
        "
      >

        {/* DECORATION */}
        <div
          className="
            absolute
            -top-32
            -right-32
            w-[350px]
            h-[350px]
            rounded-full
            bg-[#e8601c]/10
            blur-3xl
          "
        />


        {/* NUMBER */}
        <span
          className="
            absolute
            top-8
            right-10
            text-7xl
            font-bold
            text-white/[0.05]
          "
        >
          02
        </span>


        {/* ICON */}
        <div
          className="
            relative
            w-16
            h-16
            rounded-2xl
            bg-[#e8601c]
            flex
            items-center
            justify-center
            mb-9
          "
        >
          <Layers3
            size={28}
            className="text-white"
          />
        </div>


        <span
          className="
            relative
            text-xs
            font-bold
            tracking-[0.20em]
            uppercase
            text-[#e8601c]
          "
        >
          Our Approach
        </span>


        <h3
          className="
            relative
            text-2xl
            lg:text-3xl
            font-bold
            text-white
            mt-3
            mb-8
          "
        >
          One Connected Asset Lifecycle
        </h3>


        <div className="relative space-y-5">

          {[
            "Centralised and configurable asset records",
            "QR-based asset identification and verification",
            "Maintenance, transfer and disposal workflows",
            "Role-based approvals and traceable audit records",
            "AI-assisted insights with authorised human control",
          ].map((item) => (

            <div
              key={item}
              className="
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  w-7
                  h-7
                  rounded-full
                  bg-[#e8601c]/15
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <ShieldCheck
                  size={14}
                  className="text-[#e8601c]"
                />
              </div>

              <p
                className="
                  text-base
                  lg:text-lg
                  text-white/60
                  leading-relaxed
                "
              >
                {item}
              </p>

            </div>

          ))}

        </div>

      </div>

    </Fade>

  </div>
</section>
     {/* ═══════════════════════════════════════════
    TECHNOLOGY
═══════════════════════════════════════════ */}

<section className="bg-[#f7f9fc] py-24 lg:py-28 overflow-hidden">

  <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

    {/* HEADER */}
    <Fade className="text-center mb-16">

      <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#e8601c]">
        Technology
      </span>

      <h2 className="
        text-3xl
        md:text-4xl
        lg:text-5xl
        font-bold
        text-[#0b1223]
        mt-4
        mb-5
      ">
        Built as an Integrated System
      </h2>

      <p className="
        text-lg
        text-[#0b1223]/55
        max-w-3xl
        mx-auto
        leading-relaxed
      ">
        The project combines web, mobile, backend, data, identity and
        AI technologies within a single architecture.
      </p>

    </Fade>

  </div>


  {/* MOVING TECHNOLOGY LOGOS */}
  <Fade>

    <div className="relative w-full overflow-hidden">

      {/* LEFT FADE */}
      <div
        className="
          absolute
          left-0
          top-0
          bottom-0
          w-20
          md:w-32
          lg:w-48
          bg-gradient-to-r
          from-[#f7f9fc]
          to-transparent
          z-10
          pointer-events-none
        "
      />

      {/* RIGHT FADE */}
      <div
        className="
          absolute
          right-0
          top-0
          bottom-0
          w-20
          md:w-32
          lg:w-48
          bg-gradient-to-l
          from-[#f7f9fc]
          to-transparent
          z-10
          pointer-events-none
        "
      />


      {/* MOVING TRACK */}
      <div className="technology-track flex w-max">

        {[...technologies, ...technologies].map((technology, index) => (

          <div
            key={`${technology.title}-${index}`}
            className="
              group
              flex
              items-center
              gap-5
              mx-3
              md:mx-4
              bg-white
              border
              border-slate-200
              rounded-2xl
              px-7
              py-6
              min-w-[280px]
              md:min-w-[320px]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]
              hover:border-[#e8601c]/30
            "
          >

            {/* REAL LOGO */}
            <div
              className="
                w-16
                h-16
                flex
                items-center
                justify-center
                flex-shrink-0
              "
            >
              <img
                src={technology.logo}
                alt={`${technology.title} logo`}
                className="
                  w-12
                  h-12
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </div>


            {/* TEXT */}
            <div>

              <h3 className="
                text-lg
                md:text-xl
                font-bold
                text-[#0b1223]
              ">
                {technology.title}
              </h3>

              <p className="
                text-sm
                text-[#0b1223]/50
                mt-1
                leading-relaxed
              ">
                {technology.label}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  </Fade>

</section>

      
    </>
  );
}