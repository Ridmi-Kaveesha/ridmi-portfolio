import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

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

      <SectionWrap id="projects">
        <Projects />
      </SectionWrap>

      <SectionWrap id="contact">
        <Contact />
      </SectionWrap>
    </>
  );
}