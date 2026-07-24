import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";


export default function Home() {
  return (
    <>
      <Hero></Hero>
      <About></About>
      <Skills></Skills>
      <Projects></Projects>
      <Education></Education>
      <Contact></Contact>
    </>
  );
}
