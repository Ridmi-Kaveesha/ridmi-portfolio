import { useMemo, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Simple "mailto" submit (no backend needed).
 * Later you can replace with Formspree / EmailJS easily.
 */
function buildMailTo({ email, name, subject, message }) {
  const to = "ridmikaveesha999@gmail.com"; // <-- change if needed
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

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M8.2 3.6h2.2l1 4.4-1.6 1.5c1.3 2.6 3.4 4.7 6 6l1.5-1.6 4.4 1v2.2c0 .8-.5 1.5-1.3 1.7-1.2.3-2.6.5-4 .5-7.2 0-13-5.8-13-13 0-1.4.2-2.8.5-4 .2-.8.9-1.3 1.7-1.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 12.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.5 9.5V18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 6.5v.2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M10.5 18v-4.6c0-1.7 1-2.7 2.4-2.7 1.3 0 2.1.9 2.1 2.7V18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 12.3V18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4.2 3.8h15.6c.8 0 1.4.6 1.4 1.4v13.6c0 .8-.6 1.4-1.4 1.4H4.2c-.8 0-1.4-.6-1.4-1.4V5.2c0-.8.6-1.4 1.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.35"
      />
    </svg>
  );
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 3.8h10c1.8 0 3.2 1.4 3.2 3.2v10c0 1.8-1.4 3.2-3.2 3.2H7c-1.8 0-3.2-1.4-3.2-3.2V7c0-1.8 1.4-3.2 3.2-3.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <path
        d="M12 16.1a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M17.6 6.4h.1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoPill({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href || "#"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={cn(
        "group w-full max-w-md",
        "rounded-2xl bg-[#F3ECFF]/70",
        "border border-[#E8DDF8] shadow-sm",
        "px-4 py-3 flex items-center gap-3",
        "transition hover:shadow-md hover:-translate-y-0.5"
      )}
      onClick={(e) => {
        if (!href || href === "#") e.preventDefault();
      }}
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 border border-white shadow-sm">
        <Icon className="h-5 w-5 text-[#4A2E73]" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#6B3BB9]/80">{label}</p>
        <p className="truncate text-sm font-semibold text-[#1F2A53]">
          {value}
        </p>
      </div>

      <span className="ml-auto text-[#6B3BB9]/60 group-hover:text-[#6B3BB9]">
        ↗
      </span>
    </a>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/90">
        {label}
      </span>
      <input
        {...props}
        className={cn(
          "mt-2 w-full rounded-xl px-4 py-3",
          "bg-white/10 text-white placeholder:text-white/50",
          "border border-white/15",
          "outline-none",
          "focus:border-white/30 focus:ring-2 focus:ring-white/20",
          "transition"
        )}
      />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/90">
        {label}
      </span>
      <textarea
        {...props}
        className={cn(
          "mt-2 w-full rounded-xl px-4 py-3",
          "bg-white/10 text-white placeholder:text-white/50",
          "border border-white/15",
          "outline-none resize-none",
          "focus:border-white/30 focus:ring-2 focus:ring-white/20",
          "transition"
        )}
      />
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });

  const mailto = useMemo(() => buildMailTo(form), [form]);

  const onChange = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // mailto open
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Title (center) */}
        <div className="section-heading">
          <h2 className="section-title">Contact</h2>
          <div className="section-underline" />
          <p className="section-subtitle">
            Have a project in mind? Let’s connect.
          </p>
        </div>

        {/* Content */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT info */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[#E8DDF8] bg-white shadow-[0_18px_60px_rgba(18,16,46,0.08)] p-7">
              <p className="about-title text-2xl text-[#1F2A53]">
                Contact Me?
              </p>

              <p className="mt-4 text-sm leading-7 text-[#3c3c55]/85 max-w-md">
                I’m currently looking to join a cross-functional team that
                values improving people’s lives through accessible design.
                If you have a project in mind, feel free to reach out.
              </p>

              <div className="mt-7 grid gap-3">
                <InfoPill
                  icon={IconMail}
                  label="Email"
                  value="ridmikaveesha999@gmail.com"
                  href="mailto:ridmikaveesha999@gmail.com"
                />
                <InfoPill
                  icon={IconPhone}
                  label="Phone"
                  value="0705084100"
                  href="tel:0705084100"
                />
                <InfoPill
                  icon={IconPin}
                  label="Location"
                  value="Sri Lanka"
                  href="#"
                />
                <InfoPill
                  icon={IconLinkedIn}
                  label="LinkedIn"
                  value="ridmi-kaveesha"
                  href="https://www.linkedin.com/"
                />
              </div>
            </div>
          </div>

          {/* RIGHT form */}
          <div className="lg:col-span-7">
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl",
                "bg-gradient-to-br from-[#4A2E73] via-[#4A2E73] to-[#6B3BB9]",
                "shadow-[0_22px_70px_rgba(18,16,46,0.18)]"
              )}
            >
              {/* subtle glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />

              <form onSubmit={onSubmit} className="relative p-7 md:p-9">
                <div className="grid gap-5">
                  <Input
                    label="E-mail"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={onChange("email")}
                    required
                  />

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
                    placeholder="What’s this about?"
                    value={form.subject}
                    onChange={onChange("subject")}
                  />

                  <Textarea
                    label="Message"
                    rows={5}
                    placeholder="Write your message..."
                    value={form.message}
                    onChange={onChange("message")}
                    required
                  />

                  <div className="pt-2 flex items-center justify-center">
                    <button
                      type="submit"
                      className={cn(
                        "px-10 py-3 rounded-2xl font-semibold text-white",
                        "bg-white/20 border border-white/25",
                        "shadow-md backdrop-blur",
                        "transition hover:bg-white/25 hover:shadow-lg",
                        "active:scale-[0.98]"
                      )}
                    >
                      Send
                    </button>
                  </div>

                  <p className="text-center text-xs text-white/60">
                    This opens your mail app (mailto). You can connect a real
                    form service later.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#E8DDF8] pt-10">
          <div className="text-center">
            <p className="about-title text-2xl text-[#1F2A53]">
              Ridmi Kaveesha
            </p>

            <div className="mt-4 flex justify-center gap-8 text-sm font-semibold text-[#6B3BB9]">
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

            <div className="mt-6 flex justify-center gap-4">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-[#E8DDF8] bg-white shadow-sm hover:shadow-md transition"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-5 w-5 text-[#6B3BB9]" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-[#E8DDF8] bg-white shadow-sm hover:shadow-md transition"
                aria-label="Instagram"
              >
                <IconInstagram className="h-5 w-5 text-[#6B3BB9]" />
              </a>
            </div>

            <p className="mt-10 text-sm text-[#6B3BB9]">
              © {new Date().getFullYear()} Ridmi Kaveesha — All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}