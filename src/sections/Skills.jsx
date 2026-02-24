// src/sections/Skills.jsx
const skills = [
    { name: "Figma", icon: "/skills/figma.png" },
    { name: "React", icon: "/skills/react.png" },
    { name: "C", icon: "/skills/c.png" },
    { name: "Node.js", icon: "/skills/node.png" },
    { name: "PHP", icon: "/skills/php.png" },
    { name: "JavaScript", icon: "/skills/js.png" },
    { name: "CSS3", icon: "/skills/css.png" },
    { name: "Next.js", icon: "/skills/next.png" },
    { name: "Tailwind CSS", icon: "/skills/tailwind.png" },
    { name: "HTML5", icon: "/skills/html.png" },
    { name: "Express.js", icon: "/skills/express.png" },
    { name: "MongoDB", icon: "/skills/mongodb.png" },
  ];
  
  function SkillChip({ name, icon }) {
    return (
      <div className="group flex flex-col items-center gap-3">
        {/* Icon circle */}
        <div className="relative">
          {/* outer glow ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-400/40 via-fuchsia-300/30 to-sky-300/30 blur-md opacity-0 transition duration-300 group-hover:opacity-100" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[#4A2E73] shadow-lg ring-1 ring-white/40 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
            <img
              src={icon}
              alt={name}
              className="h-10 w-10 object-contain drop-shadow"
              loading="lazy"
            />
          </div>
        </div>
  
        {/* Label pill */}
        <div className="relative">
          <div className="absolute inset-x-4 -bottom-2 h-2 rounded-full bg-purple-500/40 blur-md opacity-70" />
          <span className="relative inline-flex items-center justify-center rounded-xl bg-white px-5 py-2 text-sm font-semibold text-[#1F2A53] shadow-md ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-0.5">
            {name}
          </span>
        </div>
      </div>
    );
  }
  
  export default function Skills() {
    return (
      <section id="skills" className="relative bg-white px-6 py-24 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          {/* Title */}
          <div className="section-wrap">
      <div className="section-container">
        <div className="section-heading">
          <h2 className="section-title">Skills</h2>
          <div className="section-underline" />
          <p className="section-subtitle">Tools & technologies I use</p>
        </div>

        {/* your skills UI */}
      </div>
    </div>
  
          {/* Main Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 p-10 shadow-[0_18px_60px_rgba(20,20,60,0.10)] ring-1 ring-black/5">
            {/* subtle corner wave lines */}
            <div className="pointer-events-none absolute -right-12 -top-10 h-40 w-80 rotate-12 opacity-30">
              <svg viewBox="0 0 600 200" className="h-full w-full">
                <path
                  d="M0 140 C120 40, 240 240, 360 140 S600 40, 720 140"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                />
                <path
                  d="M0 160 C120 60, 240 260, 360 160 S600 60, 720 160"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="2"
                />
                <path
                  d="M0 180 C120 80, 240 280, 360 180 S600 80, 720 180"
                  fill="none"
                  stroke="#C4B5FD"
                  strokeWidth="2"
                />
              </svg>
            </div>
  
            {/* Skill grid */}
            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {skills.map((s) => (
                <SkillChip key={s.name} name={s.name} icon={s.icon} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }