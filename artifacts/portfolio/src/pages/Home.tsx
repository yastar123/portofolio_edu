import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Expertise from "@/components/sections/Expertise";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main id="main-content" className="bg-background min-h-screen overflow-x-clip">
      <Navbar />
      <Hero />
      <About />
      <SectionDivider label="02 — Selected Works" />
      <Work />
      <SectionDivider variant="invert" label="03 — Technical Capabilities" />
      <Expertise />
      <SectionDivider label="04 — Timeline & History" />
      <Experience />
      <SectionDivider label="05 — Inquiries" />
      <Contact />
      <Footer />
    </main>
  );
}
