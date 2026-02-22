// src/sections/Projects.jsx
const projects = [
  {
    title: "Handicraft Website",
    description:
      "Created a handicraft e-commerce website for traditional handcrafted products and modern artisanal designs, highlighting cultural craftsmanship with a contemporary appeal.",
    image: "/projects/handicraft.jpg",
    cta: "View Case Study",
    link: "#",
    reverse: false,
  },
  {
    title: "Travel Package Booking",
    description:
      "Developing a travel package booking platform where customers can browse packages, select a preferred plan, and proceed with online payments.",
    image: "/projects/travel.jpg",
    cta: "View Case Study",
    link: "#",
    reverse: true,
  },
];

function ProjectRow({ project }) {
  const content = (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#E9E4F5] via-[#F5F2FB] to-white p-8 md:p-10 shadow-[0_18px_60px_rgba(31,42,83,0.12)] ring-1 ring-black/5">
      <h3 className="text-2xl font-extrabold text-[#1F2A53]">
        {project.title}
      </h3>

      <p className="mt-5 text-[16px] leading-8 text-[#1F2A53]/90">
        {project.description}
      </p>

      <a
        href={project.link}
        className="mt-8 inline-flex items-center justify-center rounded-2xl px-8 py-3
                   bg-gradient-to-r from-[#4A2E73] to-[#6B3BB9]
                   text-white font-semibold shadow-md
                   transition duration-300 hover:scale-105 hover:shadow-xl
                   hover:from-[#6B3BB9] hover:to-[#8B5CF6]"
      >
        {project.cta}
      </a>

      {/* subtle bottom glow */}
      <div className="pointer-events-none absolute -bottom-10 left-10 h-20 w-56 rounded-full bg-purple-400/25 blur-3xl" />
    </div>
  );

  const image = (
    <div className="group overflow-hidden rounded-3xl shadow-[0_18px_60px_rgba(31,42,83,0.14)] ring-1 ring-black/5">
      <img
        src={project.image}
        alt={project.title}
        className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
      <div className={`md:col-span-6 ${project.reverse ? "md:order-2" : ""}`}>
        {content}
      </div>
      <div className={`md:col-span-6 ${project.reverse ? "md:order-1" : ""}`}>
        {image}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="about-title text-5xl text-[#1F2A53]">Projects</h2>
        <div className="mt-3 h-1 w-20 rounded-full bg-[#6B3BB9]" />

        <div className="mt-14 space-y-16">
          {projects.map((p) => (
            <ProjectRow key={p.title} project={p} />
          ))}
        </div>

        {/* View more button */}
        <div className="mt-20 flex justify-center">
          <button
            className="rounded-2xl px-10 py-4 text-lg font-semibold text-white
                       bg-gradient-to-r from-[#1F1247] to-[#4A2E73]
                       shadow-lg transition duration-300
                       hover:scale-105 hover:shadow-2xl"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
}