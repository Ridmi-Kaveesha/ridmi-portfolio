import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import projectsData from "../data/projects.json";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ArrowButton({ dir = "right", onClick, hidden, disabled }) {
  if (hidden) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group absolute top-1/2 -translate-y-1/2 z-20",
        "h-12 w-12 rounded-full",
        "bg-white/80 backdrop-blur border border-[#E8DDF8]",
        "shadow-md hover:shadow-lg transition",
        "focus:outline-none focus:ring-2 focus:ring-[#6B3BB9]/40",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        dir === "left" ? "-left-6" : "-right-6"
      )}
      aria-label={dir === "left" ? "Previous projects" : "Next projects"}
    >
      <span className="sr-only">{dir === "left" ? "Previous" : "Next"}</span>
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "mx-auto h-5 w-5 text-[#4A2E73] transition",
          "group-hover:scale-110"
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {dir === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

function StatusBadge({ status }) {
  if (!status) return null;
  const isOngoing = String(status).toLowerCase().includes("ongoing");

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        "bg-white/85 backdrop-blur border border-white/60 shadow-sm",
        isOngoing ? "text-[#B45309]" : "text-[#2E7D32]"
      )}
    >
      {status}
    </span>
  );
}

function ProjectCard({ project, onOpenCaseStudy }) {
  return (
    <div
      className={cn(
        "group h-full overflow-hidden rounded-3xl",
        "border border-[#E8DDF8] bg-white",
        "shadow-[0_20px_60px_rgba(18,16,46,0.08)]",
        "hover:shadow-[0_30px_80px_rgba(18,16,46,0.12)] transition"
      )}
    >
      {/* Image */}
      <div className="relative h-52 md:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <StatusBadge status={project.status} />
          {project.tags?.length
            ? project.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs",
                    "bg-white/80 backdrop-blur border border-white/60",
                    "text-[#4A2E73] shadow-sm"
                  )}
                >
                  {t}
                </span>
              ))
            : null}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-7">
        <h3 className="about-title text-3xl text-[#1F2A53] leading-tight">
          {project.title}
        </h3>

        {project.subtitle ? (
          <p className="mt-1 text-sm font-semibold text-[#6B3BB9]">
            {project.subtitle}
          </p>
        ) : null}

        <p className="mt-3 text-sm md:text-[15px] leading-6 text-[#3c3c55]/80">
          {project.desc}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className={cn(
              "px-6 py-2.5 rounded-2xl",
              "bg-[#4A2E73] text-white font-medium",
              "shadow-md transition",
              "hover:bg-[#5B3A8B] hover:shadow-lg",
              "focus:outline-none focus:ring-2 focus:ring-[#6B3BB9]/40"
            )}
          >
            View Case Study
          </button>

          {/* If you want this ALSO to open popup (not go external) */}
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="text-sm font-semibold text-[#6B3BB9] hover:underline"
          >
            Live →
          </button>
        </div>
      </div>
    </div>
  );
}

function CaseStudyModal({ project, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  if (!project) return null;

  const cs = project.caseStudy || {};

  // ✅ Portal: always renders above everything
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <div
        className={cn(
          "relative w-full max-w-3xl overflow-hidden rounded-3xl",
          "bg-white border border-[#E8DDF8]",
          "shadow-[0_40px_120px_rgba(0,0,0,0.25)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="about-title text-3xl text-[#1F2A53]">
                {project.title}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {project.subtitle ? (
                  <p className="text-[#6B3BB9] text-sm font-semibold">
                    {project.subtitle}
                  </p>
                ) : (
                  <p className="text-[#6B3BB9] text-sm">
                    {cs.role || "Case Study"}
                  </p>
                )}
                <StatusBadge status={project.status} />
              </div>
            </div>

            <button
              ref={closeBtnRef}
              onClick={onClose}
              className={cn(
                "h-10 w-10 rounded-full",
                "border border-[#E8DDF8] bg-white",
                "hover:bg-[#F6F2FF] transition",
                "focus:outline-none focus:ring-2 focus:ring-[#6B3BB9]/40"
              )}
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-[#E8DDF8]">
              <img
                src={project.image}
                alt={project.title}
                className="h-56 w-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              {cs.tools?.length ? (
                <>
                  <p className="text-sm font-semibold text-[#1F2A53]">
                    Technologies
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cs.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-3 py-1 text-xs bg-[#F3ECFF] text-[#4A2E73]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}

              {cs.highlights?.length ? (
                <>
                  <p className="mt-5 text-sm font-semibold text-[#1F2A53]">
                    Highlights
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-[#3c3c55]/85 list-disc pl-5">
                    {cs.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-end gap-3">
            {project.links?.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-2xl border border-[#E8DDF8] text-[#4A2E73] font-semibold hover:bg-[#F6F2FF] transition"
              >
                GitHub
              </a>
            ) : null}

            {project.links?.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-2xl bg-[#4A2E73] text-white font-semibold hover:bg-[#5B3A8B] transition"
              >
                Open Live
              </a>
            ) : null}

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl text-[#6B3BB9] hover:underline"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Projects() {
  const projects = Array.isArray(projectsData) ? projectsData : [];

  const [perPage, setPerPage] = useState(2);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setPerPage(mq.matches ? 1 : 2);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const pages = useMemo(() => {
    const out = [];
    for (let i = 0; i < projects.length; i += perPage) {
      out.push(projects.slice(i, i + perPage));
    }
    return out;
  }, [projects, perPage]);

  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  const canPrev = page > 0;
  const canNext = page < pages.length - 1;

  const [activeProject, setActiveProject] = useState(null);

  const [showAll, setShowAll] = useState(false);
  const allRef = useRef(null);

  const openAll = () => {
    setShowAll(true);
    setTimeout(
      () => allRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60
    );
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="section-heading md:text-left md:mb-0">
            <h2 className="section-title md:text-left">Projects</h2>
            <div className="section-underline md:mx-0" />
            <p className="section-subtitle md:text-left">
              Selected works & case studies
            </p>
          </div>

          <button
            type="button"
            onClick={openAll}
            className="px-6 py-2.5 rounded-2xl bg-[#4A2E73] text-white font-semibold shadow-md hover:shadow-lg hover:bg-[#5B3A8B] transition"
          >
            View More
          </button>
        </div>

        <div className="relative mt-10 md:mt-12">
          <ArrowButton
            dir="left"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            hidden={!canPrev}
            disabled={!canPrev}
          />
          <ArrowButton
            dir="right"
            onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
            hidden={!canNext}
            disabled={!canNext}
          />

          <div className="grid gap-7 md:grid-cols-2">
            {(pages[page] || []).map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onOpenCaseStudy={setActiveProject}
              />
            ))}
          </div>

          {pages.length > 1 ? (
            <div className="mt-7 flex justify-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition",
                    i === page ? "bg-[#4A2E73]" : "bg-[#E8DDF8] hover:bg-[#C9B7F6]"
                  )}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>

        {showAll ? (
          <div ref={allRef} className="mt-16 md:mt-20">
            <div className="flex items-center justify-between gap-4">
              <h3 className="about-title text-4xl text-[#1F2A53]">
                All Projects
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAll(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-[#6B3BB9] font-semibold hover:underline"
              >
                Hide
              </button>
            </div>

            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              {projects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onOpenCaseStudy={setActiveProject}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* ✅ Portal modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}