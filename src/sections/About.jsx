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
    if (startedRef.current) return; // type once
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

  const introText = useMemo(
    () =>
      `I am a passionate Computer Science undergraduate at SLIIT City University with a strong interest in frontend development and UI/UX design. I enjoy creating modern, responsive, and user-friendly web applications using technologies such as React.js, JavaScript, and MongoDB.

I have developed several academic and personal projects including e-commerce websites, pharmacy management systems, and travel booking platforms. These experiences helped me improve my problem-solving skills and gain real-world development experience.

I am continuously learning new technologies and improving my skills, with the goal of becoming a professional frontend developer and building impactful digital products.`,
    []
  );

  const typed = useTypewriter(introText, leftIn, 14);

  return (
    <section className="relative bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Title */}
        <div className="section-heading">
          <h2 className="section-title">About Me</h2>
          <div className="section-underline" />
          <p className="section-subtitle">A short intro & education details</p>
        </div>

        {/* Boxes */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT BOX */}
          <div className="md:col-span-6">
            <div
              ref={leftRef}
              className={[
                "card-anim flex h-full flex-col rounded-2xl bg-white p-10 ring-1 ring-[#CDB8FF] md:min-h-[620px]",
                leftIn ? "reveal-in" : "reveal-init",
              ].join(" ")}
              style={{ transitionDelay: "60ms" }}
            >
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-extrabold text-[#1F2A53]">
                <span className="text-[#6B3BB9]">✦</span> About Me
              </h3>

              {/* Typing text */}
              <div className="flex-1 whitespace-pre-line text-[16px] leading-8 text-[#1F2A53]/85">
                {typed}
                {leftIn && typed.length < introText.length && (
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
                "card-anim flex h-full flex-col rounded-2xl bg-white p-10 ring-1 ring-[#CDB8FF] md:min-h-[620px]",
                rightIn ? "reveal-in" : "reveal-init",
              ].join(" ")}
              style={{ transitionDelay: "140ms" }}
            >
              <h3 className="text-2xl font-extrabold text-[#1F2A53]">
                Education & Qualifications
              </h3>
              <div className="mt-2 h-[2px] w-44 rounded bg-[#6B3BB9]" />

              {/* Education */}
              <div className="mt-8 space-y-7">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-[16px] font-bold text-[#6B3BB9]">
                      BSc (Hons) in Computer Science
                    </p>
                    <p className="text-[13px] font-semibold text-[#1F2A53]/60">
                      2023 – Present
                    </p>
                  </div>
                  <p className="mt-1 text-[14px] font-semibold text-[#1F2A53]/75">
                    SLIIT City University
                  </p>
                </div>

                <div>
                  <p className="text-[16px] font-bold text-[#6B3BB9]">
                    GCE Advanced Level (Maths / Physics / Chemistry)
                  </p>
                  <p className="mt-1 text-[14px] font-semibold text-[#1F2A53]/75">
                    K/Gurulogomi Maha Vidyalaya
                  </p>
                </div>
              </div>

              {/* Courses */}
              <div className="mt-12">
                <h4 className="text-xl font-extrabold text-[#1F2A53]">
                  Courses & Certifications
                </h4>
                <div className="mt-2 h-[2px] w-40 rounded bg-[#6B3BB9]" />

                <ul className="mt-5 space-y-3 text-[15px] font-semibold text-[#6B3BB9]">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#6B3BB9]" />
                    <span>Web Development Course</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#6B3BB9]" />
                    <span>Project Management Course</span>
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