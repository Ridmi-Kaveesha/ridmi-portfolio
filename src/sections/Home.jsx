import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

export default function Home() {
  const fullTitle = "Hi, I’m Ridmi Kaveesha..";
  const [titleTyped, setTitleTyped] = useState("");
  const [titleDone, setTitleDone] = useState(false);

  const roles = ["Frontend Developer", "UI/UX Designer", "QA Enthusiast"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleTyped, setRoleTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Title typing
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTitleTyped(fullTitle.slice(0, i));
      if (i >= fullTitle.length) {
        clearInterval(interval);
        setTitleDone(true);
      }
    }, 55);

    return () => clearInterval(interval);
  }, []);

  // Roles auto typing
  useEffect(() => {
    if (!titleDone) return;

    const current = roles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, roleTyped.length + 1);
        setRoleTyped(next);

        if (next === current) {
          setTimeout(() => setIsDeleting(true), 900);
        }
      } else {
        const next = current.slice(0, roleTyped.length - 1);
        setRoleTyped(next);

        if (next === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [titleDone, roleTyped, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-64px)] hero-bg flex items-center overflow-hidden"
    >
      <div className="mx-auto max-w-6xl w-full px-6">
        <div className="grid grid-cols-12 items-center gap-y-10">
          
          {/* LEFT IMAGE */}
          <div className="col-span-12 md:col-span-5 flex justify-center md:justify-start">
            <div className="relative -mt-6">
              <div className="absolute -inset-12 rounded-full bg-purple-300/60 blur-3xl" />
              <img
                src="/girl.png"
                alt="profile"
                className="relative hero-float w-80 sm:w-96 md:w-[420px] lg:w-[460px] drop-shadow-xl md:translate-x-10"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-7 text-center md:text-left md:pl-16 md:translate-x-10">
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2A53]">
              {titleTyped}
              <span className="typing-cursor">|</span>
            </h1>

            {/* Auto Typing Roles */}
            <p className="mt-4 text-lg md:text-xl text-[#6B3BB9] font-semibold">
              {roleTyped}
              {titleDone && <span className="typing-cursor">|</span>}
            </p>

            {/* Resume Button */}
            <div className="mt-6">
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#4A2E73] to-[#6B3BB9] text-white font-medium shadow-md transition duration-300 hover:from-[#6B3BB9] hover:to-[#8B5CF6] hover:scale-105 hover:shadow-lg"
              >
                <FaDownload />
                Check Resume
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-6 justify-center md:justify-start">
              
              <a
                href="https://github.com/Ridmi-Kaveesha"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-[#4A2E73] text-lg transition hover:bg-[#6B3BB9] hover:text-white hover:scale-110"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/ridmi-kaveesha-279876366"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-[#4A2E73] text-lg transition hover:bg-[#6B3BB9] hover:text-white hover:scale-110"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:ridmikaveesha999@email.com"
                title="Email"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-[#4A2E73] text-lg transition hover:bg-[#6B3BB9] hover:text-white hover:scale-110"
              >
                <FaEnvelope />
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* Decorative bubbles */}
      <div className="pointer-events-none absolute bottom-10 right-10 hidden md:block">
        <div className="bubble bubble-lg" />
        <div className="bubble bubble-sm" />
        <div className="bubble bubble-md" />
      </div>
    </section>
  );
}