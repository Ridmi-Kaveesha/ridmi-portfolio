import { useEffect, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // Body scroll lock when menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section highlight
  useEffect(() => {
    const ids = links.map((l) => l.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setActive(vis.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "bg-[#2B1453]/80 backdrop-blur",
        scrolled ? "shadow-lg shadow-black/10 border-b border-white/10" : ""
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand (Logo with Glow Animation) */}
        <button
          type="button"
          onClick={() => go("home")}
          className="relative flex items-center group focus:outline-none focus:ring-2 focus:ring-[#BDA6FF]/40 rounded-2xl"
          aria-label="Go to home"
        >
          {/* Glow background (bigger so it doesn't get cropped) */}
          <span
            className="
              pointer-events-none absolute -inset-3 rounded-full
              bg-[#BDA6FF]/25 blur-xl opacity-0
              transition duration-300
              group-hover:opacity-100
            "
          />

          <img
            src="/logo.png"
            alt="Ridmi logo"
            className="
              relative h-16 w-auto object-contain
              transition duration-300
              group-hover:scale-110 group-hover:rotate-3
            "
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={cn(
                  "text-sm font-semibold transition",
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                )}
              >
                <span className="relative">
                  {l.label}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-2 h-[2px] rounded-full bg-[#BDA6FF] transition-all",
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </span>
              </button>
            );
          })}
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid h-11 w-11 place-items-center rounded-2xl
                     bg-white/10 border border-white/15 text-white
                     hover:bg-white/15 transition
                     focus:outline-none focus:ring-2 focus:ring-[#BDA6FF]/40"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-300",
          open ? "max-h-[360px]" : "max-h-0"
        )}
      >
        <div className="px-4 sm:px-6 pb-6 pt-2 bg-[#2B1453]/95 border-t border-white/10">
          <div className="grid gap-2">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => go(l.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}