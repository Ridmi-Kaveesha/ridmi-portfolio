import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function buildMailTo({ to, name, email, subject, message }) {
  const finalSubject = subject?.trim() || "Portfolio Contact";
  const body = [
    `Name: ${name || "-"}`,
    `Email: ${email || "-"}`,
    "",
    message || "",
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(
    finalSubject
  )}&body=${encodeURIComponent(body)}`;
}

/* ---------- Tooltip Icon ---------- */
function IconWithTooltip({ Icon, tip }) {
  return (
    <span className="relative inline-flex group">
      <span
        className={cn(
          "grid h-11 w-11 place-items-center rounded-2xl",
          "bg-[#F3ECFF]/80 border border-[#E8DDF8]",
          "shadow-[0_10px_30px_rgba(18,16,46,0.08)]",
          "transition group-hover:-translate-y-0.5"
        )}
      >
        <Icon className="h-5 w-5 text-[#6B3BB9]" />
      </span>

      <span
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full",
          "whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold",
          "bg-[#1F2A53] text-white shadow-xl",
          "opacity-0 translate-y-1 transition",
          "group-hover:opacity-100 group-hover:translate-y-0"
        )}
      >
        {tip}
        <span
          className="absolute left-1/2 top-full -translate-x-1/2 border-[7px] border-transparent border-t-[#1F2A53]"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}

function InfoRow({
  icon: Icon,
  tip,
  label,
  value,
  href,
  copyValue,
  onCopied,
  copied,
}) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4",
        "rounded-2xl border border-[#E8DDF8] bg-white/70",
        "px-4 py-3",
        "shadow-[0_12px_34px_rgba(18,16,46,0.06)]",
        "transition hover:shadow-[0_18px_45px_rgba(18,16,46,0.10)] hover:-translate-y-0.5",
        "hover:bg-[#F8F5FF]"
      )}
    >
      <div className="flex items-center gap-4 min-w-0">
        <IconWithTooltip Icon={Icon} tip={tip} />

        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#6B3BB9]/80">{label}</p>

          {href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="block truncate text-sm font-semibold text-[#1F2A53] hover:underline"
            >
              {value}
            </a>
          ) : (
            <p className="truncate text-sm font-semibold text-[#1F2A53]">
              {value}
            </p>
          )}
        </div>
      </div>

      {/* copy (optional) */}
      {copyValue ? (
        <button
          type="button"
          onClick={onCopied}
          className={cn(
            "sm:ml-auto inline-flex items-center justify-center gap-2",
            "w-full sm:w-auto",
            "rounded-xl px-3 py-2",
            "border border-[#E8DDF8] bg-white/70",
            "text-xs font-semibold text-[#6B3BB9]",
            "transition hover:bg-[#F3ECFF]"
          )}
          aria-label={`Copy ${label}`}
          title={`Copy ${label}`}
        >
          {copied ? (
            <FaCheck className="h-3.5 w-3.5" />
          ) : (
            <FaRegCopy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      ) : (
        <span className="sm:ml-auto text-[#6B3BB9]/50 hidden sm:inline">↗</span>
      )}
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/90">{label}</span>

      <div className="relative mt-2">
        <input
          {...props}
          className={cn(
            "w-full rounded-2xl px-4 py-3",
            "bg-white/10 text-white placeholder:text-white/55",
            "border outline-none transition",
            error
              ? "border-red-300/60 ring-2 ring-red-200/20"
              : "border-white/20 focus:border-white/35 focus:ring-2 focus:ring-white/20",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
          )}
        />
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-100/90">{error}</p>
      )}
    </label>
  );
}

function Textarea({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/90">{label}</span>

      <div className="relative mt-2">
        <textarea
          {...props}
          className={cn(
            "w-full rounded-2xl px-4 py-3 resize-none",
            "bg-white/10 text-white placeholder:text-white/55",
            "border outline-none transition",
            error
              ? "border-red-300/60 ring-2 ring-red-200/20"
              : "border-white/20 focus:border-white/35 focus:ring-2 focus:ring-white/20",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
          )}
        />
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-100/90">{error}</p>
      )}
    </label>
  );
}

/* ---- small reveal helper (no library) ---- */
function useRevealOnce() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}

export default function Contact() {
  const TO_EMAIL = "ridmikaveesha999@gmail.com";
  const PHONE = "0705084100";
  const LOCATION = "Sri Lanka";
  const LINKEDIN_URL = "https://www.linkedin.com/";

  const [form, setForm] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({});
  const [hint, setHint] = useState("");
  const [copiedKey, setCopiedKey] = useState("");

  const errors = useMemo(() => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";

    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "Minimum 10 characters required";

    return e;
  }, [form]);

  const mailto = useMemo(() => buildMailTo({ to: TO_EMAIL, ...form }), [form]);

  const onChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const canSubmit = Object.keys(errors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, message: true });
    if (!canSubmit) return;

    setHint("Opening your email app…");
    setTimeout(() => {
      window.location.href = mailto;
      setTimeout(() => setHint(""), 1200);
    }, 120);
  };

  const copy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1200);
    } catch {
      // ignore
    }
  };

  const [wrapRef, inView] = useRevealOnce();

  return (
    <section id="contact" className="section-wrap overflow-x-hidden">
      <div ref={wrapRef} className="section-container">
        {/* Section Title */}
        <div className="section-heading">
          <h2 className="section-title">Contact</h2>
          <div className="section-underline" />
          <p className="section-subtitle">Have a project in mind? Let’s connect.</p>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT INFO CARD */}
          <div
            className={cn(
              "lg:col-span-5",
              inView ? "fade-up" : "opacity-0 translate-y-3"
            )}
          >
            <div
              className={cn(
                "rounded-[28px] border border-[#E8DDF8] bg-white",
                "p-6 sm:p-7",
                "shadow-[0_22px_70px_rgba(18,16,46,0.10)]",
                "transition hover:shadow-[0_28px_85px_rgba(18,16,46,0.14)] hover:-translate-y-0.5"
              )}
            >
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1F2A53]">
                Contact Me
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#3c3c55]/85">
                I’m currently open to internships, freelance work, and
                collaboration. If you have something in mind, feel free to reach
                out.
              </p>

              <div className="mt-6 grid gap-4">
                <InfoRow
                  icon={FaEnvelope}
                  tip="Email"
                  label="Email"
                  value={TO_EMAIL}
                  href={`mailto:${TO_EMAIL}`}
                  copyValue={TO_EMAIL}
                  onCopied={() => copy("email", TO_EMAIL)}
                  copied={copiedKey === "email"}
                />

                <InfoRow
                  icon={FaPhoneAlt}
                  tip="Call"
                  label="Phone"
                  value={PHONE}
                  href={`tel:${PHONE}`}
                  copyValue={PHONE}
                  onCopied={() => copy("phone", PHONE)}
                  copied={copiedKey === "phone"}
                />

                <InfoRow
                  icon={FaMapMarkerAlt}
                  tip="Location"
                  label="Location"
                  value={LOCATION}
                />

                <InfoRow
                  icon={FaLinkedinIn}
                  tip="LinkedIn"
                  label="LinkedIn"
                  value="ridmi-kaveesha"
                  href={LINKEDIN_URL}
                />
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div
            className={cn(
              "lg:col-span-7",
              inView ? "fade-up" : "opacity-0 translate-y-3",
              "lg:[animation-delay:120ms]"
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-[28px]",
                "bg-gradient-to-br from-[#4A2E73] via-[#55308A] to-[#6B3BB9]",
                "shadow-[0_28px_90px_rgba(18,16,46,0.22)]"
              )}
            >
              {/* modern glows */}
              <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-fuchsia-300/15 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

              <form onSubmit={onSubmit} className="relative p-6 sm:p-7 md:p-9">
                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-white">
                    Send a message
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    I’ll reply as soon as possible.
                  </p>
                </div>

                <div className="grid gap-5">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@gmail.com"
                    value={form.email}
                    onChange={onChange("email")}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    error={touched.email && errors.email}
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      label="Name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={onChange("name")}
                    />

                    <Input
                      label="Subject"
                      type="text"
                      placeholder="Internship / Project"
                      value={form.subject}
                      onChange={onChange("subject")}
                    />
                  </div>

                  <Textarea
                    label="Message"
                    rows={6}
                    placeholder="Write your message..."
                    value={form.message}
                    onChange={onChange("message")}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    error={touched.message && errors.message}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                    <p className="text-xs font-semibold text-white/70">
                      {hint ? hint : " Keep it short & clear ✨"}
                    </p>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={cn(
                        "w-full sm:w-auto",
                        "px-9 py-3 rounded-2xl font-semibold text-white",
                        "bg-white/20 border border-white/25",
                        "shadow-[0_12px_30px_rgba(0,0,0,0.18)]",
                        "transition hover:bg-white/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      )}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FOOTER (NO ICONS) */}
        <footer className="mt-16 sm:mt-20 md:mt-24 border-t border-[#E8DDF8] pt-8 sm:pt-10">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-[#6B3BB9]">
              <a href="#about" className="hover:underline">
                About
              </a>
              <a href="#skills" className="hover:underline">
                Skills
              </a>
              <a href="#projects" className="hover:underline">
                Projects
              </a>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </div>

            <p className="mt-8 sm:mt-10 text-sm text-[#6B3BB9]">
              © {new Date().getFullYear()} Ridmi Kaveesha — All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}