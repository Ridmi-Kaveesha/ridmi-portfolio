import data from "../data/projects.json";

function ProjectGridCard({ p }) {
  return (
    <article className="project-card group">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={p.image}
          alt={p.title}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {p.tags?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white/75 text-[#1F2A53] backdrop-blur-sm border border-white/40"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="about-title text-3xl text-[#1F2A53]">{p.title}</h3>
        <p className="mt-3 text-[#2b2f55]/80 leading-7">{p.description}</p>

        <div className="mt-6 flex gap-3 flex-wrap">
          <a
            href={p.caseStudyUrl || "#"}
            className="px-7 py-2.5 rounded-2xl bg-[#4A2E73] text-white font-semibold shadow-md transition hover:brightness-110"
          >
            Case Study
          </a>
          <a
            href={p.githubUrl || "#"}
            className="px-7 py-2.5 rounded-2xl border border-[#E8DDF8] text-[#4A2E73] font-semibold shadow-sm transition hover:bg-[#F3EEFF]"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

export default function AllProjects() {
  return (
    <div className="min-h-screen bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="about-title text-5xl text-[#1F2A53]">All Projects</h1>
        <p className="mt-4 text-[#6B3BB9]">All of my work in one place.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((p) => (
            <ProjectGridCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}