import { useEffect, useRef, useState } from "react";
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
  Check,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   FADE ANIMATION
═══════════════════════════════════════════════════════ */

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
      {
        threshold: 0.08,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return {
    ref,
    visible,
  };
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
        transition-all
        duration-700
        ease-out

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

/* ═══════════════════════════════════════════════════════
   MODULE DATA
═══════════════════════════════════════════════════════ */

const modules = [
  {
    id: "asset-registry",
    icon: ClipboardList,
    label: "Asset Registry",

    features: [
      "Guided asset onboarding with category-specific information",
      "Unique QR code and barcode generation for each asset",
      "GPS location capture during asset registration",
      "Photo and document attachment for asset records",
      "Department and responsible officer assignment",
    ],
  },

  {
    id: "maintenance",
    icon: Wrench,
    label: "Maintenance Management",

    features: [
      "Preventive maintenance scheduling",
      "Maintenance request and work order management",
      "Field officer and technician assignment",
      "Maintenance status and progress tracking",
      "Complete maintenance history for every asset",
    ],
  },

  {
    id: "transfers",
    icon: RefreshCw,
    label: "Transfers & Disposals",

    features: [
      "Inter-department asset transfer requests",
      "Controlled approval workflows",
      "Transfer status tracking",
      "Receiving department confirmation",
      "Structured asset disposal workflow",
    ],
  },

  {
    id: "audit",
    icon: ShieldCheck,
    label: "Audit & Compliance",

    features: [
      "Traceable audit history for important asset activities",
      "Asset verification workflows",
      "Role-based approval for controlled actions",
      "Lifecycle activity records",
      "Reporting support for compliance review",
    ],
  },

  {
    id: "gis",
    icon: MapPin,
    label: "GIS Mapping",

    features: [
      "View assets using geographic locations",
      "Location information linked to asset records",
      "GPS-supported field updates",
      "Visualise assets by department or category",
      "Support location-based asset verification",
    ],
  },

  {
    id: "ai",
    icon: BrainCircuit,
    label: "AI Decision Support",

    features: [
      "Analyse asset condition and lifecycle information",
      "Generate structured recommendations",
      "Support repair, transfer and disposal evaluation",
      "Present evidence for authorised review",
      "Human approval before high-impact actions",
    ],
  },

  {
    id: "users",
    icon: Users,
    label: "User & Access Management",

    features: [
      "Role-based access control",
      "Department-scoped user access",
      "Different permission levels for system users",
      "Controlled access to sensitive asset information",
      "User activity and access tracking",
    ],
  },

  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics & Reporting",

    features: [
      "Asset summary dashboards",
      "Department-level reporting",
      "Asset condition analysis",
      "Maintenance activity reporting",
      "Exportable reports for operational review",
    ],
  },

  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile App",

    features: [
      "Mobile access for field operations",
      "QR code scanning for asset lookup",
      "Asset condition updates from the field",
      "Photo capture and supporting evidence",
      "Maintenance and verification activities",
    ],
  },

  {
    id: "notifications",
    icon: Bell,
    label: "Notifications & Alerts",

    features: [
      "Maintenance reminders",
      "Approval and workflow notifications",
      "Asset status alerts",
      "Decision-support notifications",
      "User-specific notification delivery",
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   FEATURES PAGE
═══════════════════════════════════════════════════════ */

export default function Features() {
  return (
    <div className="w-full bg-white">

      {/* ═══════════════════════════════════════════════
          INTRO / HERO
      ═══════════════════════════════════════════════ */}

     {/* ═══════════════════════════════════════════════
    FEATURES HERO — SAME STYLE AS ABOUT HERO
═══════════════════════════════════════════════ */}

<section
  className="
    relative
    bg-[#0b1223]
    overflow-hidden
  "
>
  {/* BACKGROUND GLOW */}
  <div
    className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_18%_20%,_#e8601c18_0%,_transparent_32%)]
    "
  />

  <div
    className="
      w-full
      max-w-[2000px]
      mx-auto

      px-6
      lg:px-10
      xl:px-12

      py-28
      lg:py-32
      xl:py-36

      relative
      z-10
    "
  >
    <Fade className="max-w-[980px]">




      {/* HEADING */}
      <h1
        className="
          text-4xl
          sm:text-5xl
          lg:text-6xl
          xl:text-[66px]

          font-bold

          text-white

          leading-[1.08]
          tracking-tight

          max-w-[950px]
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

          leading-[1.75]

          text-white/55
        "
      >
        CoreGrid brings every aspect of asset lifecycle management
        into one integrated platform — from registration and maintenance
        through to AI-assisted decisions, reporting and full lifecycle
        accountability.
      </p>

    </Fade>
  </div>
</section>


      {/* ═══════════════════════════════════════════════
          MODULE CARDS
      ═══════════════════════════════════════════════ */}

      <section className="bg-[#fafbfc]">

        <div
          className="
            w-full
            max-w-[2000px]
            mx-auto

            px-6
            lg:px-10
            xl:px-12

            py-20
            lg:py-28
          "
        >

          <div
            className="
              grid

              md:grid-cols-2
              xl:grid-cols-3

              gap-7
              lg:gap-8
              xl:gap-9
            "
          >

            {modules.map((mod, index) => {
              const Icon = mod.icon;

              return (
                <Fade key={mod.id}>

                  <article
                    className="
                      group

                      relative
                      overflow-hidden

                      h-full
                      min-h-[500px]
                      lg:min-h-[520px]

                      bg-white

                      border
                      border-slate-200

                      rounded-[26px]

                      p-8
                      lg:p-9
                      xl:p-10

                      shadow-[0_8px_30px_rgba(15,23,42,0.035)]

                      transition-all
                      duration-300

                      hover:-translate-y-1.5

                      hover:border-[#e8601c]/30

                      hover:shadow-[0_24px_60px_rgba(15,23,42,0.09)]
                    "
                  >

                    {/* DECORATIVE NUMBER */}

                    <span
                      className="
                        absolute
                        top-7
                        right-8

                        text-[56px]
                        lg:text-[64px]

                        font-black

                        leading-none

                        text-slate-100

                        select-none
                        pointer-events-none
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

                        bg-[#fff0e8]

                        flex
                        items-center
                        justify-center

                        mb-9

                        transition-all
                        duration-300

                        group-hover:bg-[#e8601c]
                        group-hover:scale-105
                      "
                    >
                      <Icon
                        size={27}
                        strokeWidth={1.8}

                        className="
                          text-[#e8601c]

                          transition-colors
                          duration-300

                          group-hover:text-white
                        "
                      />
                    </div>


                    {/* MODULE TITLE */}

                    <h2
                      className="
                        relative
                        z-10

                        text-[22px]
                        lg:text-[24px]
                        xl:text-[25px]

                        font-bold

                        text-[#17191d]

                        leading-tight

                        pr-14

                        mb-8
                      "
                    >
                      {mod.label}
                    </h2>


                    {/* FEATURE LIST */}

                    <div
                      className="
                        relative
                        z-10

                        space-y-5
                      "
                    >

                      {mod.features.map((feature) => (

                        <div
                          key={feature}
                          className="
                            flex
                            items-start

                            gap-4
                          "
                        >

                          <Check
                            size={20}
                            strokeWidth={2.2}

                            className="
                              text-[#16a34a]

                              flex-shrink-0

                              mt-[2px]
                            "
                          />

                          <p
                            className="
                              text-[15px]
                              lg:text-[16px]

                              leading-[1.65]

                              text-slate-500
                            "
                          >
                            {feature}
                          </p>

                        </div>

                      ))}

                    </div>


                    {/* HOVER GLOW */}

                    <div
                      className="
                        absolute

                        -top-24
                        -right-24

                        w-56
                        h-56

                        rounded-full

                        bg-[#e8601c]/0

                        blur-3xl

                        transition-all
                        duration-500

                        group-hover:bg-[#e8601c]/[0.05]
                      "
                    />


                    {/* BOTTOM ORANGE LINE */}

                    <div
                      className="
                        absolute

                        bottom-0
                        left-0

                        h-[4px]

                        w-0

                        bg-[#e8601c]

                        transition-all
                        duration-500

                        group-hover:w-full
                      "
                    />

                  </article>

                </Fade>
              );
            })}

          </div>

        </div>

      </section>


      {/* ═══════════════════════════════════════════════
          BOTTOM PLATFORM STATEMENT
      ═══════════════════════════════════════════════ */}

      {/* ═══════════════════════════════════════════════
    MODULES CTA
═══════════════════════════════════════════════ */}

<section className="bg-white pb-20 lg:pb-28">
  <div className="w-full max-w-[2000px] mx-auto px-6 lg:px-10 xl:px-12">

    <div
      className="
        w-full
        border
        border-slate-200
        rounded-[24px]

        px-8
        md:px-12
        lg:px-16

        py-12
        lg:py-16

        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between

        gap-10

        bg-white

        hover:border-slate-300
        hover:shadow-lg
        hover:shadow-slate-200/40

        transition-all
        duration-300
      "
    >

      {/* LEFT CONTENT */}
      <div>
        <h2
          className="
            text-3xl
            md:text-4xl
            lg:text-[42px]

            font-bold
            tracking-tight
            leading-tight

            text-[#111827]
          "
        >
          Want to see how the modules connect?
        </h2>

        <p
          className="
            mt-4

            text-lg
            md:text-xl
            lg:text-[22px]

            text-slate-500
            leading-relaxed
          "
        >
          Explore the complete CoreGrid asset management architecture.
        </p>
      </div>


      {/* RIGHT BUTTON */}
      <Link
        to="/modules"
        className="
          group

          flex
          items-center
          justify-center
          gap-5

          flex-shrink-0

          px-9
          lg:px-11

          py-5
          lg:py-6

          bg-[#111827]
          hover:bg-[#e8601c]

          text-white

          text-lg
          lg:text-xl

          font-semibold

          rounded-2xl

          transition-all
          duration-300

          shadow-sm
          hover:shadow-xl
          hover:shadow-[#e8601c]/20
        "
      >
        View Modules

        <span
          className="
            text-2xl
            transition-transform
            duration-300
            group-hover:translate-x-2
          "
        >
          →
        </span>
      </Link>

    </div>

  </div>
</section>

    </div>
  );
}