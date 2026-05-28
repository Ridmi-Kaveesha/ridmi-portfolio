import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

function useTypingEffect(text, speed = 60, startDelay = 0) {
  const [typedText, setTypedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer;

    const startTyping = () => {
      timer = setInterval(() => {
        i += 1;
        setTypedText(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timer);
          setIsDone(true);
        }
      }, speed);
    };

    const delayTimer = setTimeout(startTyping, startDelay);

    return () => {
      clearInterval(timer);
      clearTimeout(delayTimer);
    };
  }, [text, speed, startDelay]);

  return { typedText, isDone };
}

export default function Home() {
  const fullTitle = "Hi, I'm Ridmi Kaveesha";
  const roles = ["Frontend Developer", "UI/UX Designer", "QA Enthusiast"];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentRoleText, setCurrentRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { typedText: titleTyped, isDone: titleDone } = useTypingEffect(fullTitle, 50, 200);

  useEffect(() => {
    if (!titleDone) return;

    const currentFullRole = roles[currentRoleIndex];
    let timer;

    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = currentFullRole.slice(0, currentRoleText.length + 1);
        setCurrentRoleText(nextText);

        if (nextText === currentFullRole) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
        } else {
          timer = setTimeout(handleTyping, 60);
        }
      } else {
        const fontText = currentFullRole.slice(0, currentRoleText.length - 1);
        setCurrentRoleText(fontText);

        if (fontText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
          timer = setTimeout(handleTyping, 30);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 30 : 60);
    return () => clearTimeout(timer);
  }, [titleDone, currentRoleText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-64px)] bg-[#f3f1fa] flex items-center overflow-hidden py-12 lg:py-0"
    >
      {/* PURE BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-purple-200/30 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-100/20 rounded-full filter blur-[130px]"></div>
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-6 sm:px-8 lg:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-6">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center items-start order-2 lg:order-1">
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1e1b4b] whitespace-nowrap max-w-max">
              {titleTyped}
              {!titleDone && (
                <span className="inline-block w-[3px] h-[35px] sm:h-[45px] lg:h-[55px] ml-1 bg-indigo-900 animate-pulse align-middle">|</span>
              )}
            </h1>

            {/* Roles Subtitle */}
            <div className="mt-6 min-h-[36px] flex items-center text-left">
              {titleDone && (
                <p className="text-xl sm:text-2xl font-semibold text-slate-800">
                  <span className="text-indigo-900 font-bold border-r-2 border-indigo-900 pr-1">
                    {currentRoleText}
                  </span>
                </p>
              )}
            </div>

            {/* Paragraph Text */}
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-xl text-left leading-relaxed font-normal">
            Passionate Computer Science undergraduate specializing in UI/UX design and frontend development, dedicated to crafting clean, modern, and user-centric digital experiences.
            </p>

            {/* Action Buttons & Social Icons */}
            <div className="mt-8 flex flex-wrap items-center justify-start gap-5 w-full">
              
              {/* NAVBAR MATCHING COLOR WITH SCALE & HOVER EFFECT */}
              <a
                href="/projectpics/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4c1d95] text-white font-semibold text-sm tracking-wide shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#3b0764]"
              >
                <FaDownload className="text-xs" />
                Check Resume
              </a>

              <div className="hidden sm:block h-6 w-px bg-slate-300 mx-1"></div>

              <div className="flex items-center gap-3">
                <a href="https://github.com/Ridmi-Kaveesha" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 text-lg shadow-sm transition-all duration-300 hover:border-purple-400 hover:text-purple-600">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/ridmi-kaveesha-279876366" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 text-lg shadow-sm transition-all duration-300 hover:border-blue-400 hover:text-blue-600">
                  <FaLinkedin />
                </a>
                <a href="mailto:ridmikaveesha999@gmail.com" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 text-lg shadow-sm transition-all duration-300 hover:border-pink-400 hover:text-pink-600">
                  <FaEnvelope />
                </a>
              </div>

            </div>
          </div>

          {/* RIGHT IMAGE COLUMN */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-[320px] sm:w-[380px] lg:w-[430px] aspect-square flex items-center justify-center select-none">
              
              {/* Soft background aura */}
              <div className="absolute inset-2 rounded-full bg-purple-300/20 blur-3xl"></div>

              {/* LAYER 1: OUTER WAVES */}
              <div 
                className="absolute w-[96%] h-[96%] bg-purple-200/40 opacity-60"
                style={{ 
                  borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%",
                  animation: "fluid-shape-generator 14s ease-in-out infinite" 
                }}
              ></div>

              {/* LAYER 2: INTERMEDIATE BLOB GRADIENT */}
              <div 
                className="absolute w-[90%] h-[90%] bg-gradient-to-tr from-purple-300/40 via-pink-200/30 to-amber-100/40 opacity-80"
                style={{ 
                  borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%",
                  animation: "fluid-shape-generator 10s ease-in-out infinite reverse" 
                }}
              ></div>

              {/* LAYER 3: AVATAR MASKING BOX - RE-BALANCED TO PERFECT SIZE w-[70%] h-[70%] */}
              <div 
                className="absolute w-[70%] h-[70%] bg-white p-2.5 shadow-2xl border border-white/80 z-10 overflow-hidden flex items-center justify-center rounded-full"
              >
                <img
                  src="/my.png"
                  alt="Ridmi Kaveesha Portfolio Avatar"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* COMPACT CLEAN CSS ANIMATIONS */}
      <style>{`
        @keyframes fluid-shape-generator {
          0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          33% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
          66% { border-radius: 50% 50% 30% 70% / 40% 60% 35% 65%; }
        }
      `}</style>
    </section>
  );
}