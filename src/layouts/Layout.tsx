import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Features", to: "/features" },
  { label: "Modules", to: "/modules" },
  { label: "AI Decision Support", to: "/ai-decision-support" },
   { label: "Pricing", to: "/pricing" },
 /* { label: "Contact", to: "/contact" }, */
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* ═══════════════════════════════════════════════════════
    NAVBAR — LARGE 2000PX VERSION
═══════════════════════════════════════════════════════ */}

<header
  className="
    fixed
    top-0
    left-0
    right-0
    z-50

    bg-white
    border-b
    border-slate-200/80

    shadow-[0_4px_25px_rgba(15,23,42,0.06)]
  "
>
  {/* 2000PX CONTAINER */}
  <div
    className="
      w-full
      max-w-[2000px]
      mx-auto

      px-6
      lg:px-10
      xl:px-12

      h-[105px]
      lg:h-[115px]
      xl:h-[125px]

      flex
      items-center
      justify-between

      gap-6
    "
  >
    {/* ═══════════════════════════════════════
        LARGE LOGO
    ═══════════════════════════════════════ */}
    <Link
      to="/"
      className="
        flex
        items-center
        flex-shrink-0
      "
    >
  <img
  src="/assets/images/logo.png"
  alt="CoreGrid Sri Lanka"
  className="
    w-auto
    object-contain

    h-[90px]
    lg:h-[110px]
    xl:h-[120px]
    2xl:h-[120px]
  "
/>
    </Link>

    {/* ═══════════════════════════════════════
        DESKTOP NAVIGATION
    ═══════════════════════════════════════ */}
    <nav
      className="
        hidden
        xl:flex

        flex-1

        items-center
        justify-center

        gap-1
        2xl:gap-2

        px-4
      "
    >
      {navLinks.map((link) => {
        const isActive =
          link.to === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(link.to);

        return (
          <Link
            key={link.label}
            to={link.to}
            className={`
              px-4
              2xl:px-5

              py-3
              2xl:py-3.5

              rounded-full

              text-[17px]
              2xl:text-[18px]

              font-semibold

              whitespace-nowrap

              transition-all
              duration-200

              ${
                isActive
                  ? `
                    bg-[#e8601c]
                    text-white
                    shadow-md
                    shadow-[#e8601c]/20
                  `
                  : `
                    text-slate-700

                    hover:text-[#e8601c]
                    hover:bg-orange-50
                  `
              }
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>

    {/* ═══════════════════════════════════════
         LOGIN
    ═══════════════════════════════════════ */}
    <div
      className="
        hidden
        xl:flex

        items-center

        flex-shrink-0
      "
    >
      <Link
        to="/login"
        className="
          px-7
          2xl:px-8

          py-3.5
          2xl:py-4

          bg-[#e8601c]

          hover:bg-[#f07030]

          text-white

          text-[17px]
          2xl:text-[18px]

          font-bold

          rounded-full

          whitespace-nowrap

          shadow-lg
          shadow-[#e8601c]/25

          transition-all
          duration-200

          hover:-translate-y-0.5
        "
      >
       Login
      </Link>
    </div>

    {/* ═══════════════════════════════════════
        MOBILE MENU BUTTON
    ═══════════════════════════════════════ */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="
        xl:hidden

        w-12
        h-12

        flex
        items-center
        justify-center

        text-slate-700

        hover:text-[#e8601c]
        hover:bg-orange-50

        rounded-xl

        transition-colors
      "
      aria-label="Toggle menu"
    >
      {menuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  </div>

  {/* ═══════════════════════════════════════
      MOBILE MENU
  ═══════════════════════════════════════ */}
  {menuOpen && (
    <div
      className="
        xl:hidden

        bg-white

        border-t
        border-slate-200

        shadow-lg
      "
    >
      <nav
        className="
          w-full
          max-w-[2000px]
          mx-auto

          px-6
          lg:px-10

          py-6

          flex
          flex-col

          gap-2
        "
      >
        {navLinks.map((link) => {
          const isActive =
            link.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(link.to);

          return (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`
                px-5
                py-4

                text-[17px]

                font-semibold

                rounded-xl

                transition-all

                ${
                  isActive
                    ? "bg-orange-50 text-[#e8601c]"
                    : "text-slate-700 hover:text-[#e8601c] hover:bg-orange-50"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}

        {/* MOBILE LOGIN */}
        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="
            mt-3

            px-5
            py-4

            bg-[#e8601c]

            hover:bg-[#f07030]

            text-white

            text-[17px]

            font-bold

            rounded-xl

            text-center

            transition-colors
          "
        >
          Client Login
        </Link>
      </nav>
    </div>
  )}
</header>
      {/* ── Page content ── */}
      <main className="flex-1 pt-24 sm:pt-28 lg:pt-32">
        <Outlet />
      </main>

      {/* ═══════════════════════════════════════════════════════
    FOOTER — FULL WIDTH LARGE VERSION
═══════════════════════════════════════════════════════ */}
<footer className="w-full bg-[#050c1b] border-t-[6px] border-[#e8601c]">

  {/* MAIN FOOTER */}
  <div
    className="
      w-full
      px-8
      sm:px-12
      lg:px-20
      xl:px-28
      2xl:px-36
      pt-20
      lg:pt-24
      pb-14
    "
  >
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-[1.7fr_1fr_1fr_1fr]
        gap-14
        lg:gap-20
        xl:gap-28
      "
    >

 {/* ═══════════════════════════════
    BRAND
═══════════════════════════════ */}
<div>

  {/* TEXT LOGO */}
  <div className="mb-7">

    <h2
      className="
        text-[32px]
        lg:text-[38px]
        xl:text-[42px]
        font-extrabold
        tracking-tight
        leading-none
      "
    >
      <span className="text-white">
        Core
      </span>

      <span className="text-[#e8601c]">
        Grid
      </span>
    </h2>

    <p
      className="
        text-[12px]
        lg:text-[13px]
        text-white/40
        uppercase
        tracking-[0.18em]
        mt-3
      "
    >
      Manage. Monitor. Maximize.
    </p>

  </div>


  {/* DESCRIPTION */}
  <p
    className="
      text-[16px]
      lg:text-[17px]
      text-white/60
      leading-[1.8]
      max-w-[440px]
    "
  >
    Sri Lanka&apos;s unified industry asset lifecycle management
    platform. Manage. Monitor. Maximize.
  </p>


  {/* SOCIAL BUTTONS */}
  <div className="flex flex-wrap gap-4 mt-8">

    {["LinkedIn", "Twitter", "YouTube"].map((social) => (
      <a
        key={social}
        href="#"
        className="
          px-5
          py-2.5
          text-[14px]
          font-medium
          text-white/60
          border
          border-white/20
          rounded-lg

          hover:text-white
          hover:border-[#e8601c]
          hover:bg-[#e8601c]/10

          transition-all
          duration-200
        "
      >
        {social}
      </a>
    ))}

  </div>

</div>

      {/* ═══════════════════════════════
          PLATFORM
      ═══════════════════════════════ */}
      <div>
        <h4
          className="
            text-[18px]
            lg:text-[20px]
            font-bold
            text-white
            mb-7
          "
        >
          Platform
        </h4>

        <ul className="space-y-4 text-[15px] lg:text-[16px] text-white/55">

          {[
            "Asset Registry",
            "Maintenance Management",
            "Transfers & Disposals",
            "Audit & Compliance",
            "GIS Mapping",
          ].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="
                  hover:text-[#e8601c]
                  transition-colors
                  duration-200
                "
              >
                {item}
              </a>
            </li>
          ))}

        </ul>
      </div>


      {/* ═══════════════════════════════
          DEPARTMENTS
      ═══════════════════════════════ */}
      <div>
        <h4
          className="
            text-[18px]
            lg:text-[20px]
            font-bold
            text-white
            mb-7
          "
        >
          Departments
        </h4>

        <ul className="space-y-4 text-[15px] lg:text-[16px] text-white/55">

          {[
            "Finance Ministry",
            "Provincial Councils",
            "Municipal Authorities",
            "Health Sector",
            "Education Sector",
            "Defense Assets",
          ].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="
                  hover:text-[#e8601c]
                  transition-colors
                  duration-200
                "
              >
                {item}
              </a>
            </li>
          ))}

        </ul>
      </div>


      {/* ═══════════════════════════════
          COMPANY
      ═══════════════════════════════ */}
      <div>
        <h4
          className="
            text-[18px]
            lg:text-[20px]
            font-bold
            text-white
            mb-7
          "
        >
          Company
        </h4>

        <ul className="space-y-4 text-[15px] lg:text-[16px] text-white/55">

          {[
            "About Us",
            "How It Works",
            "AI Decision Support",
            "Contact Us",
            "Client Login",
            "Privacy Policy",
          ].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="
                  hover:text-[#e8601c]
                  transition-colors
                  duration-200
                "
              >
                {item}
              </a>
            </li>
          ))}

        </ul>
      </div>

    </div>


    {/* ═══════════════════════════════════════
        BOTTOM DIVIDER
    ═══════════════════════════════════════ */}
    <div className="w-full h-px bg-white/10 mt-20" />


    {/* ═══════════════════════════════════════
        COPYRIGHT AREA
    ═══════════════════════════════════════ */}
    <div
      className="
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-6
        pt-10
      "
    >

      <p className="text-[14px] lg:text-[15px] text-white/40">
        © 2026 CoreGrid Sri Lanka. All Rights Reserved.
      </p>


      <div
        className="
          flex
          flex-wrap
          items-center
          justify-center
          gap-8
          lg:gap-10

          text-[14px]
          lg:text-[15px]
          text-white/40
        "
      >

        <a
          href="#"
          className="hover:text-white transition-colors"
        >
          Privacy
        </a>

        <a
          href="#"
          className="hover:text-white transition-colors"
        >
          Terms of Service
        </a>

        <a
          href="#"
          className="hover:text-white transition-colors"
        >
          Accessibility
        </a>

      </div>

    </div>

  </div>
</footer>
    </div>
  );
}
