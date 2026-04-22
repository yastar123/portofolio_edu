import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Expertise from "@/components/sections/Expertise";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Expertise />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
