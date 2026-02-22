// src/App.jsx
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects"; // ✅ real Projects component

// Temporary Contact section only
function Contact() {
  return (
    <div className="min-h-screen bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="about-title text-4xl text-[#1F2A53]">Contact</h2>
        <p className="mt-6 text-[#6B3BB9]">Contact section coming soon...</p>
      </div>
    </div>
  );
}

// Scroll offset fix
function SectionWrap({ id, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      {children}
    </section>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <SectionWrap id="home">
        <Home />
      </SectionWrap>

      <SectionWrap id="about">
        <About />
      </SectionWrap>

      <SectionWrap id="skills">
        <Skills />
      </SectionWrap>

      {/* ✅ REAL Projects section */}
      <SectionWrap id="projects">
        <Projects />
      </SectionWrap>

      <SectionWrap id="contact">
        <Contact />
      </SectionWrap>
    </>
  );
}