// src/sections/Skills.jsx

import {
  SiFigma,
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiGit,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

const skills = [
  { name: "Figma", icon: SiFigma },
  { name: "React.js", icon: SiReact },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "PHP", icon: SiPhp },
  { name: "MongoDB", icon: SiMongodb },
  { name: "MySQL", icon: SiMysql },
  { name: "Java", icon: FaJava }, 
  { name: "Git", icon: SiGit },
];

function SkillCard({ name, icon: Icon }) {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-2xl bg-white/80 p-6 shadow-[0_10px_30px_rgba(20,20,60,0.08)] ring-1 ring-black/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(20,20,60,0.12)]">
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-fuchsia-400/0 to-sky-400/0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:from-purple-500/10 group-hover:via-fuchsia-400/10 group-hover:to-sky-400/10" />

      {/* Icon */}
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-[#4A2E73] shadow-md ring-1 ring-white/40 transition duration-300 group-hover:scale-110">
        <Icon className="h-8 w-8 text-white transition duration-300 group-hover:text-purple-200" />
      </div>

      {/* Name */}
      <p className="relative mt-4 text-sm font-semibold text-[#1F2A53]">
        {name}
      </p>

      {/* Animated underline */}
      <span className="mt-2 h-1 w-10 rounded-full bg-purple-500/20 transition duration-300 group-hover:w-16 group-hover:bg-purple-500/40" />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-wrap relative overflow-hidden">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="section-container">
        <div className="section-heading">
          <h2 className="section-title">Skills</h2>
          <div className="section-underline" />
          <p className="section-subtitle">Tools & technologies I use</p>
        </div>

        <div className="relative rounded-3xl bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 p-6 sm:p-10 ring-1 ring-black/5 shadow-[0_18px_60px_rgba(20,20,60,0.10)]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6">
            {skills.map((s) => (
              <SkillCard key={s.name} name={s.name} icon={s.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}