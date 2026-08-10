import { useRef, useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
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
        threshold: 0.1,
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
   CONTACT INFORMATION
═══════════════════════════════════════════════════════ */

const contactInfo = [
  {
    icon: MapPin,
    title: "Project Location",
    lines: [
      "CoreGrid Student Project",
      "Western Province",
      "Sri Lanka",
    ],
  },

  {
    icon: Phone,
    title: "Contact",
    lines: [
      "+94 77 000 0000",
      "Project enquiries and demonstrations",
    ],
  },

  {
    icon: Mail,
    title: "Email",
    lines: [
      "coregrid.project@gmail.com",
      "Project and technical enquiries",
    ],
  },

  {
    icon: Clock,
    title: "Availability",
    lines: [
      "Monday – Friday",
      "9:00 AM – 5:00 PM",
      "Sri Lanka Standard Time",
    ],
  },
];

const enquiryTypes = [
  "Project Information",
  "Platform Demonstration",
  "Technical Question",
  "Academic Enquiry",
  "Collaboration",
  "Other",
];

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    ministry: "",
    phone: "",
    type: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false);

    setForm({
      name: "",
      email: "",
      ministry: "",
      phone: "",
      type: "",
      message: "",
    });
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}

      <section
        className="
          relative
          bg-[#0b1223]
          overflow-hidden
        "
      >
        {/* BACKGROUND */}

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_70%_20%,_#e8601c20_0%,_transparent_35%)]
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_10%_90%,_#2563eb12_0%,_transparent_35%)]
          "
        />

        {/* CONTAINER */}

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

            {/* LABEL */}


            {/* TITLE */}

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
              Let&apos;s Talk About
              <span className="text-[#e8601c]">
                {" "}
                Government Asset Management.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                text-lg
                lg:text-xl

                text-white/60

                leading-[1.8]

                max-w-[850px]
              "
            >
              Have a question about CoreGrid, the asset lifecycle,
              project architecture or platform demonstration? Send us
              a message and we&apos;ll get back to you.
            </p>

          </Fade>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CONTACT AREA
      ═══════════════════════════════════════════════ */}

      <section className="bg-[#f7f9fc] py-24 lg:py-28">

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

          <div
            className="
              grid
              lg:grid-cols-[1.35fr_0.65fr]

              gap-10
              xl:gap-14

              items-start
            "
          >

            {/* ═══════════════════════════════════════
                LEFT — CONTACT FORM
            ═══════════════════════════════════════ */}

            <Fade>

              <div
                className="
                  bg-white

                  rounded-[30px]

                  border
                  border-slate-200

                  p-8
                  md:p-10
                  lg:p-12
                  xl:p-14

                  shadow-[0_12px_40px_rgba(15,23,42,0.05)]
                "
              >

                {submitted ? (

                  /* SUCCESS */

                  <div
                    className="
                      min-h-[600px]

                      flex
                      flex-col

                      items-center
                      justify-center

                      text-center

                      px-6
                    "
                  >

                    <div
                      className="
                        w-20
                        h-20

                        rounded-full

                        bg-green-100

                        flex
                        items-center
                        justify-center

                        mb-7
                      "
                    >
                      <CheckCircle2
                        size={38}
                        className="text-green-600"
                      />
                    </div>

                    <h3
                      className="
                        text-2xl
                        md:text-3xl

                        font-bold

                        text-[#0b1223]

                        mb-4
                      "
                    >
                      Message Sent Successfully
                    </h3>

                    <p
                      className="
                        text-base
                        lg:text-lg

                        text-[#0b1223]/55

                        max-w-md

                        leading-[1.8]

                        mb-8
                      "
                    >
                      Thank you for contacting the CoreGrid project team.
                      Your message has been received successfully.
                    </p>

                    <button
                      onClick={resetForm}
                      className="
                        px-7
                        py-3.5

                        bg-[#e8601c]

                        text-white

                        font-semibold

                        rounded-xl

                        hover:bg-[#f07030]

                        transition-colors
                      "
                    >
                      Send Another Message
                    </button>

                  </div>

                ) : (

                  <>
                    {/* FORM HEADER */}

                    <div className="mb-10">

                      <span
                        className="
                          text-xs
                          font-bold

                          tracking-[0.20em]
                          uppercase

                          text-[#e8601c]
                        "
                      >
                        Contact Form
                      </span>

                      <h2
                        className="
                          text-2xl
                          md:text-3xl
                          lg:text-4xl

                          font-bold

                          text-[#0b1223]

                          mt-3
                          mb-4
                        "
                      >
                        Send Us a Message
                      </h2>

                      <p
                        className="
                          text-base
                          text-[#0b1223]/50
                        "
                      >
                        Fill in the form below and tell us how we can help.
                      </p>

                    </div>


                    {/* FORM */}

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >

                      {/* NAME + EMAIL */}

                      <div
                        className="
                          grid
                          md:grid-cols-2
                          gap-6
                        "
                      >

                        <div>

                          <label
                            className="
                              block
                              text-sm
                              font-semibold
                              text-[#0b1223]
                              mb-2.5
                            "
                          >
                            Full Name *
                          </label>

                          <input
                            required
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"

                            className="
                              w-full

                              px-5
                              py-4

                              rounded-xl

                              border
                              border-slate-200

                              bg-[#fafbfc]

                              text-[15px]
                              text-[#0b1223]

                              placeholder:text-slate-400

                              outline-none

                              focus:bg-white
                              focus:border-[#e8601c]
                              focus:ring-4
                              focus:ring-[#e8601c]/10

                              transition-all
                            "
                          />

                        </div>


                        <div>

                          <label
                            className="
                              block
                              text-sm
                              font-semibold
                              text-[#0b1223]
                              mb-2.5
                            "
                          >
                            Email Address *
                          </label>

                          <input
                            required
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="yourname@email.com"

                            className="
                              w-full

                              px-5
                              py-4

                              rounded-xl

                              border
                              border-slate-200

                              bg-[#fafbfc]

                              text-[15px]
                              text-[#0b1223]

                              placeholder:text-slate-400

                              outline-none

                              focus:bg-white
                              focus:border-[#e8601c]
                              focus:ring-4
                              focus:ring-[#e8601c]/10

                              transition-all
                            "
                          />

                        </div>

                      </div>

                      {/* DEPARTMENT + PHONE */}

                      <div
                        className="
                          grid
                          md:grid-cols-2
                          gap-6
                        "
                      >

                        <div>

                          <label
                            className="
                              block
                              text-sm
                              font-semibold
                              text-[#0b1223]
                              mb-2.5
                            "
                          >
                            Organisation / Department
                          </label>

                          <input
                            name="ministry"
                            value={form.ministry}
                            onChange={handleChange}
                            placeholder="Your organisation"

                            className="
                              w-full

                              px-5
                              py-4

                              rounded-xl

                              border
                              border-slate-200

                              bg-[#fafbfc]

                              text-[15px]
                              text-[#0b1223]

                              placeholder:text-slate-400

                              outline-none

                              focus:bg-white
                              focus:border-[#e8601c]
                              focus:ring-4
                              focus:ring-[#e8601c]/10

                              transition-all
                            "
                          />

                        </div>


                        <div>

                          <label
                            className="
                              block
                              text-sm
                              font-semibold
                              text-[#0b1223]
                              mb-2.5
                            "
                          >
                            Phone Number
                          </label>

                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+94 77 000 0000"

                            className="
                              w-full

                              px-5
                              py-4

                              rounded-xl

                              border
                              border-slate-200

                              bg-[#fafbfc]

                              text-[15px]
                              text-[#0b1223]

                              placeholder:text-slate-400

                              outline-none

                              focus:bg-white
                              focus:border-[#e8601c]
                              focus:ring-4
                              focus:ring-[#e8601c]/10

                              transition-all
                            "
                          />

                        </div>

                      </div>

                      {/* ENQUIRY TYPE */}

                      <div>

                        <label
                          className="
                            block
                            text-sm
                            font-semibold
                            text-[#0b1223]
                            mb-2.5
                          "
                        >
                          Enquiry Type *
                        </label>

                        <select
                          required
                          name="type"
                          value={form.type}
                          onChange={handleChange}

                          className="
                            w-full

                            px-5
                            py-4

                            rounded-xl

                            border
                            border-slate-200

                            bg-[#fafbfc]

                            text-[15px]
                            text-[#0b1223]

                            outline-none

                            focus:bg-white
                            focus:border-[#e8601c]
                            focus:ring-4
                            focus:ring-[#e8601c]/10

                            transition-all
                          "
                        >
                          <option value="">
                            Select an enquiry type
                          </option>

                          {enquiryTypes.map((type) => (
                            <option
                              key={type}
                              value={type}
                            >
                              {type}
                            </option>
                          ))}

                        </select>

                      </div>

                      {/* MESSAGE */}

                      <div>

                        <label
                          className="
                            block
                            text-sm
                            font-semibold
                            text-[#0b1223]
                            mb-2.5
                          "
                        >
                          Message *
                        </label>

                        <textarea
                          required
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={7}
                          placeholder="Tell us about your enquiry..."

                          className="
                            w-full

                            px-5
                            py-4

                            rounded-xl

                            border
                            border-slate-200

                            bg-[#fafbfc]

                            text-[15px]
                            text-[#0b1223]

                            placeholder:text-slate-400

                            outline-none

                            resize-none

                            focus:bg-white
                            focus:border-[#e8601c]
                            focus:ring-4
                            focus:ring-[#e8601c]/10

                            transition-all
                          "
                        />

                      </div>

                      {/* BUTTON */}

                      <button
                        type="submit"

                        className="
                          w-full

                          flex
                          items-center
                          justify-center

                          gap-3

                          px-8
                          py-4

                          bg-[#e8601c]

                          hover:bg-[#f07030]

                          text-white

                          text-base
                          font-bold

                          rounded-xl

                          shadow-lg
                          shadow-[#e8601c]/15

                          transition-all
                          duration-200

                          hover:-translate-y-0.5
                        "
                      >
                        <Send size={18} />

                        Send Message
                      </button>

                    </form>

                  </>

                )}

              </div>

            </Fade>

            {/* ═══════════════════════════════════════
                RIGHT — CONTACT DETAILS
            ═══════════════════════════════════════ */}

            <div className="space-y-6">

              {contactInfo.map(
                ({ icon: Icon, title, lines }) => (

                  <Fade key={title}>

                    <div
                      className="
                        bg-white

                        rounded-[24px]

                        border
                        border-slate-200

                        p-7
                        lg:p-8

                        flex
                        items-start

                        gap-5

                        shadow-[0_8px_25px_rgba(15,23,42,0.04)]

                        transition-all
                        duration-300

                        hover:border-[#e8601c]/30
                        hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)]
                      "
                    >

                      {/* ICON */}

                      <div
                        className="
                          w-14
                          h-14

                          rounded-2xl

                          bg-[#e8601c]/10

                          flex
                          items-center
                          justify-center

                          flex-shrink-0
                        "
                      >
                        <Icon
                          size={23}
                          className="text-[#e8601c]"
                        />
                      </div>

                      {/* TEXT */}

                      <div>

                        <h3
                          className="
                            text-lg
                            font-bold
                            text-[#0b1223]
                            mb-2
                          "
                        >
                          {title}
                        </h3>

                        {lines.map((line) => (

                          <p
                            key={line}
                            className="
                              text-sm
                              lg:text-[15px]

                              text-[#0b1223]/55

                              leading-[1.7]
                            "
                          >
                            {line}
                          </p>

                        ))}

                      </div>

                    </div>

                  </Fade>

                )
              )}


              

            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WESTERN PROVINCE SUPPORT
      ═══════════════════════════════════════════════ */}

      <section className="bg-white py-24 lg:py-28">

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

          <Fade className="text-center mb-14">

            <span
              className="
                text-xs
                font-bold

                uppercase
                tracking-[0.22em]

                text-[#e8601c]
              "
            >
              Regional Support
            </span>

            <h2
              className="
                text-3xl
                md:text-4xl
                lg:text-5xl

                font-bold

                text-[#0b1223]

                mt-4
                mb-5
              "
            >
              Western Province
            </h2>

            <p
              className="
                text-base
                lg:text-lg

                text-[#0b1223]/55

                max-w-2xl
                mx-auto

                leading-relaxed
              "
            >
              The current project scope represents regional support
              through the Western Province.
            </p>

          </Fade>


          <Fade>

            <div
              className="
                max-w-[1000px]

                mx-auto

                relative
                overflow-hidden

                bg-[#f8fafc]

                border
                border-slate-200

                rounded-[30px]

                p-9
                md:p-11
                lg:p-14

                flex
                flex-col
                md:flex-row

                items-start
                md:items-center

                gap-8

                shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                transition-all
                duration-300

                hover:border-[#e8601c]/30

                hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]
              "
            >

              {/* LARGE NUMBER */}

              <span
                className="
                  absolute
                  right-10
                  top-6

                  text-[90px]

                  font-black

                  text-slate-100

                  pointer-events-none
                "
              >
                01
              </span>


              {/* ICON */}

              <div
                className="
                  relative
                  z-10

                  w-20
                  h-20

                  rounded-[22px]

                  bg-[#e8601c]

                  flex
                  items-center
                  justify-center

                  flex-shrink-0

                  shadow-lg
                  shadow-[#e8601c]/15
                "
              >
                <MapPin
                  size={32}
                  className="text-white"
                />
              </div>


              {/* CONTENT */}

              <div className="relative z-10">

                <span
                  className="
                    text-xs

                    font-bold

                    uppercase
                    tracking-[0.18em]

                    text-[#e8601c]
                  "
                >
                  Sri Lanka
                </span>

                <h3
                  className="
                    text-2xl
                    md:text-3xl
                    lg:text-4xl

                    font-bold

                    text-[#0b1223]

                    mt-2
                    mb-4
                  "
                >
                  Western Province Support
                </h3>

                <p
                  className="
                    text-base
                    lg:text-lg

                    text-[#0b1223]/55

                    leading-[1.8]

                    max-w-3xl
                  "
                >
                  Regional project coordination and support for
                  organisations located within Sri Lanka&apos;s Western
                  Province.
                </p>

              </div>

            </div>

          </Fade>

        </div>
      </section>

    </>
  );
}