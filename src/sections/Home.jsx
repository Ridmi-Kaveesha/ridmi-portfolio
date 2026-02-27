import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

export default function Home() {
  // Title typing
  const fullTitle = "Hi, I’m Ridmi Kaveesha..";
  const [titleTyped, setTitleTyped] = useState("");
  const [titleDone, setTitleDone] = useState(false);

  // Roles (type one-by-one, then show all together)
  const roles = ["Frontend Developer", "UI/UX Designer", "QA Enthusiast"];
  const [roleStep, setRoleStep] = useState(0);
  const [roleTyped, setRoleTyped] = useState("");
  const [doneRoles, setDoneRoles] = useState([]);

  // Show controls
  const [showRoleLine, setShowRoleLine] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  // 1) Title typing
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTitleTyped(fullTitle.slice(0, i));
      if (i >= fullTitle.length) {
        clearInterval(t);
        setTitleDone(true);
        setTimeout(() => setShowRoleLine(true), 250);
      }
    }, 55);

    return () => clearInterval(t);
  }, []);

  // 2) Roles typing sequence (no delete)
  useEffect(() => {
    if (!titleDone) return;
    if (!showRoleLine) return;
    if (roleStep >= roles.length) return;

    const current = roles[roleStep];

    const timer = setTimeout(() => {
      const next = current.slice(0, roleTyped.length + 1);
      setRoleTyped(next);

      if (next === current) {
        setDoneRoles((prev) => [...prev, current]);
        setRoleTyped("");

        setTimeout(() => {
          setRoleStep((s) => s + 1);
        }, 350);
      }
    }, 55);

    return () => clearTimeout(timer);
  }, [titleDone, showRoleLine, roleStep, roleTyped]);

  // 3) After all roles completed -> show button then icons
  useEffect(() => {
    if (doneRoles.length !== roles.length) return;

    const t1 = setTimeout(() => setShowBtn(true), 250);
    const t2 = setTimeout(() => setShowIcons(true), 550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [doneRoles.length]);

  const allRolesDone = doneRoles.length === roles.length;

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-64px)] hero-bg flex items-center overflow-x-hidden"
    >
      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {/* Mobile: 1 col | Desktop: 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 md:gap-y-10">
          {/* IMAGE */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -inset-10 sm:-inset-12 rounded-full bg-purple-300/60 blur-3xl" />

              <img
                src="/girl.png"
                alt="profile"
                className="
                  relative hero-float drop-shadow-xl
                  w-[260px] xs:w-[300px] sm:w-[360px] md:w-[420px] lg:w-[460px]
                  mx-auto md:mx-0
                  md:translate-x-10
                "
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-7 text-center md:text-left md:pl-12 lg:pl-16 md:translate-x-6 lg:translate-x-10">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2A53] leading-tight break-words">
              {titleTyped}
              {titleTyped.length < fullTitle.length && (
                <span className="typing-cursor">|</span>
              )}
            </h1>

            {/* Roles line */}
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#6B3BB9] font-semibold min-h-[28px]">
              {!showRoleLine ? null : (
                <>
                  {!allRolesDone ? (
                    <span className="fade-up">
                      {doneRoles.length > 0 && (
                        <span className="break-words">
                          {doneRoles.join(" | ")}
                          <span className="mx-2 opacity-70">|</span>
                        </span>
                      )}

                      <span className="break-words">
                        {roleTyped}
                        <span className="typing-cursor">|</span>
                      </span>
                    </span>
                  ) : (
                    <span className="fade-up break-words">
                      {roles.join(" | ")}
                    </span>
                  )}
                </>
              )}
            </p>

            {/* Resume Button */}
            <div className={`mt-6 ${showBtn ? "fade-up" : "opacity-0"}`}>
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-2
                  w-full sm:w-auto
                  px-7 sm:px-8 py-2.5
                  rounded-xl
                  bg-gradient-to-r from-[#4A2E73] to-[#6B3BB9]
                  text-white font-medium
                  shadow-md transition duration-300
                  hover:from-[#6B3BB9] hover:to-[#8B5CF6] hover:scale-105 hover:shadow-lg
                "
              >
                <FaDownload />
                Check Resume
              </a>
            </div>

            {/* Social Icons */}
            <div
              className={`
                mt-7 flex items-center gap-5 sm:gap-6
                justify-center md:justify-start
                ${showIcons ? "fade-up" : "opacity-0"}
              `}
            >
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