export default function Home() {
    return (
      <section
        id="home"
        className="relative min-h-[calc(100vh-64px)] bg-white flex items-center overflow-hidden"
      >
        <div className="mx-auto max-w-6xl w-full px-6">
          <div className="grid grid-cols-12 items-center">
            
            {/* LEFT: Image + Button */}
            <div className="col-span-12 md:col-span-5 flex justify-center md:justify-start">
              <div className="relative -mt-6">
                
                {/* Purple glow */}
                <div className="absolute -inset-12 rounded-full bg-purple-300/60 blur-3xl" />
  
                {/* Profile Image */}
                <img
                  src="/girl.png"
                  alt="profile"
                  className="relative w-64 md:w-72 drop-shadow-xl"
                />
  
                {/* Resume Button */}
                <div className="mt-4 flex justify-center md:justify-start md:pl-10">
                  <a
                    href="/CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex px-8 py-2.5 rounded-xl 
                    bg-gradient-to-r from-[#4A2E73] to-[#6B3BB9] 
                    text-white font-medium shadow-md 
                    transition duration-300 
                    hover:from-[#6B3BB9] hover:to-[#8B5CF6] 
                    hover:scale-105 hover:shadow-lg"
                  >
                    Check Resume
                  </a>
                </div>
              </div>
            </div>
  
            {/* RIGHT: Text */}
            <div className="col-span-12 md:col-span-7 mt-14 md:mt-0 text-center md:text-left md:-translate-x-32">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2A53]">
                Hi, I’m Ridmi Kaveesha..
              </h1>
  
              <p className="mt-4 text-lg text-[#6B3BB9]">
                Frontend Developer | UI/UX Designer | QA Enthusiast
              </p>
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