import { useEffect, useMemo, useRef, useState } from "react";

function useInView(options = { threshold: 0.18 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return [ref, inView];
}

function useTypewriter(text, start, speed = 16) {
  const [out, setOut] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    if (startedRef.current) return;
    startedRef.current = true;

    let i = 0;
    setOut("");

    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, start, speed]);

  return out;
}

export default function About() {
  const [leftRef, leftIn] = useInView();
  const [rightRef, rightIn] = useInView();

  const introParagraphs = useMemo(
    () => [
      "I am a passionate Computer Science undergraduate at SLIIT City University with a strong interest in frontend development and UI/UX design. I enjoy creating modern, responsive, and user-friendly web applications using technologies such as React.js, JavaScript, and MongoDB.",
      "I have developed several academic and personal projects including e-commerce websites, pharmacy management systems, and travel booking platforms. These experiences helped me improve my problem-solving skills and gain real-world development experience.",
      "I am continuously learning new technologies and improving my skills, with the goal of becoming a professional frontend developer and building impactful digital products."
    ],
    []
  );

  const fullText = useMemo(
    () => introParagraphs.join("\n\n"),
    [introParagraphs]
  );

  const typed = useTypewriter(fullText, leftIn, 14);

  return (
    <section className="relative bg-white py-14 sm:py-16 md:py-20 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="section-heading">
          <h2 className="section-title">About Me</h2>
          <div className="section-underline" />
          <p className="section-subtitle">A short intro & education details</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">

          {/* LEFT BOX */}
          <div className="md:col-span-6">
            <div
              ref={leftRef}
              className={[
                "card-anim flex h-full flex-col rounded-2xl bg-white",
                "p-6 sm:p-8 lg:p-10",
                "ring-1 ring-[#CDB8FF]",
                "md:min-h-[620px]",
                leftIn ? "reveal-in" : "reveal-init",
              ].join(" ")}
              style={{ transitionDelay: "60ms" }}
            >
              <h3 className="mb-5 sm:mb-6 flex items-center gap-3 text-xl sm:text-2xl font-extrabold text-[#1F2A53]">
                <span className="text-[#6B3BB9]">✦</span> About Me
              </h3>

              {/* 🔥 ALL PARAGRAPHS JUSTIFIED */}
              <div className="flex-1 text-[16px] leading-8 text-[#1F2A53]/85 space-y-6">
                {typed.split("\n\n").map((para, i) => (
                  <p key={i} className="text-justify">
                    {para}
                  </p>
                ))}

                {leftIn && typed.length < fullText.length && (
                  <span className="typing-cursor">|</span>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="md:col-span-6">
            <div
              ref={rightRef}
              className={[
                "card-anim flex h-full flex-col rounded-2xl bg-white",
                "p-6 sm:p-8 lg:p-10",
                "ring-1 ring-[#CDB8FF]",
                "md:min-h-[620px]",
                rightIn ? "reveal-in" : "reveal-init",
              ].join(" ")}
              style={{ transitionDelay: "140ms" }}
            >
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F2A53] break-words">
              🎓 Education & Qualifications
              </h3>

              <div className="mt-2 h-[2px] w-36 sm:w-44 rounded bg-[#6B3BB9]" />

              <div className="mt-7 sm:mt-8 space-y-6 sm:space-y-7">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-[15px] sm:text-[16px] font-bold text-[#6B3BB9] break-words">
                      BSc (Hons) in Computer Science
                    </p>
                    <p className="text-[12px] sm:text-[13px] font-semibold text-[#1F2A53]/60">
                      2023 – Present
                    </p>
                  </div>
                  <p className="mt-1 text-[13px] sm:text-[14px] font-semibold text-[#1F2A53]/75 break-words">
                    SLIIT City University
                  </p>
                </div>

                <div>
                  <p className="text-[15px] sm:text-[16px] font-bold text-[#6B3BB9] break-words">
                    GCE Advanced Level (Maths / Physics / Chemistry)
                  </p>
                  <p className="mt-1 text-[13px] sm:text-[14px] font-semibold text-[#1F2A53]/75 break-words">
                    K/Gurulogomi Maha Vidyalaya
                  </p>
                </div>
              </div>

              <div className="mt-10 sm:mt-12">
                <h4 className="text-lg sm:text-xl font-extrabold text-[#1F2A53]">
                🏅 Courses & Certifications
                </h4>
                <div className="mt-2 h-[2px] w-32 sm:w-40 rounded bg-[#6B3BB9]" />

                <ul className="mt-4 sm:mt-5 space-y-3 text-[14px] sm:text-[15px] font-semibold text-[#6B3BB9]">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#6B3BB9]" />
                    <span className="break-words">Web Development Course - University of Moratuwa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#6B3BB9]" />
                    <span className="break-words">
                      Project Management Course - Udemy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#6B3BB9]" />
                    <span className="break-words">Software Quality Assurance Course - University of Moratuwa</span>
                  </li>
                </ul>
              </div>

              <div className="flex-1" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}