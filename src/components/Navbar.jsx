import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skill", id: "skills" },
    { label: "Project", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const [activeId, setActiveId] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // click handler: if not on home route -> go home then scroll
  const handleNavClick = (id) => (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      // wait next tick for DOM render
      setTimeout(() => scrollToId(id), 60);
    } else {
      scrollToId(id);
    }

    setActiveId(id);
  };

  // Active highlight on scroll ONLY when on "/"
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="h-16 bg-[#4A2E73]">
        <div className="mx-auto max-w-6xl h-full px-6 flex items-center">
          {/* Logo */}
          <div className="w-32 flex items-center">
            <img src="/logo.png" alt="RK Logo" className="h-20 w-auto" />
          </div>

          {/* Links */}
          <nav className="flex-1 flex justify-end pr-24 gap-10 text-white/95 text-sm font-semibold">
            {links.map((l) => {
              const isActive = location.pathname === "/" && activeId === l.id;

              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={handleNavClick(l.id)}
                  className={[
                    "relative px-4 py-2 rounded-full transition duration-200",
                    "hover:bg-white/15 hover:text-white",
                    "after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-white after:transition-all after:duration-200",
                    "hover:after:w-6",
                    isActive
                      ? "bg-white/20 text-white after:w-6"
                      : "text-white/90",
                  ].join(" ")}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}