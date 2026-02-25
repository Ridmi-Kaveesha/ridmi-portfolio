export default function About() {
    return (
      <section id="about" className="relative bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Title */}
          <div className="section-heading">
  <h2 className="section-title">About Me</h2>
  <div className="section-underline" />
  <p className="section-subtitle">A short intro & education details</p>
</div>
  
          {/* Cards */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            {/* Left Card */}
            <div className="md:col-span-5">
              <div className="rounded-2xl bg-gradient-to-br from-[#F2E9FF] via-[#EDE3FF] to-[#E5DAFF] p-10 shadow-[0_20px_60px_rgba(31,42,83,0.12)]">
                <p className="text-[17px] leading-8 text-[#1F2A53]/90">
                  A self-taught UI/UX designer with 3+ years of experience. I create
                  meaningful and delightful digital products that balance user needs
                  and business goals.
                </p>
              </div>
            </div>
  
            {/* Right Card */}
            <div className="md:col-span-7">
              <div className="rounded-2xl bg-gradient-to-br from-[#F2E9FF] via-[#EFE6FF] to-[#E6DCFF] p-10 shadow-[0_20px_60px_rgba(31,42,83,0.12)]">
                <h3 className="text-xl font-extrabold text-[#1F2A53]">
                  Education & Qualifications
                </h3>
                <div className="mt-2 h-[2px] w-36 rounded bg-[#6B3BB9]" />
  
                {/* Education items */}
                <div className="mt-8 space-y-7">
                  {/* Item 1 */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="text-[16px] font-bold text-[#6B3BB9]">
                        BSc (Hons) in Computer Science
                      </p>
                      <p className="text-[13px] font-semibold text-[#1F2A53]/70">
                        2023 – Present
                      </p>
                    </div>
                    <p className="mt-1 text-[14px] font-semibold text-[#1F2A53]/80">
                      SLIIT City University
                    </p>
                  </div>
  
                  {/* Item 2 */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="text-[16px] font-bold text-[#6B3BB9]">
                        GCE Advanced Level (Maths / Physics / Chemistry)
                      </p>
                    </div>
                    <p className="mt-1 text-[14px] font-semibold text-[#1F2A53]/80">
                      K/Gurulogomi Maha Vidyalaya
                    </p>
                  </div>
                </div>
  
                {/* Courses */}
                <div className="mt-10">
                  <h4 className="text-lg font-extrabold text-[#1F2A53]">Courses</h4>
                  <div className="mt-2 h-[2px] w-20 rounded bg-[#6B3BB9]" />
  
                  <ul className="mt-5 space-y-3 text-[15px] font-semibold text-[#6B3BB9]">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#6B3BB9]" />
                      <span>Project Management Course</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#6B3BB9]" />
                      <span>Web Development Course</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    );
  }