import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
// import Projects from '@/components/sections/Projects';
import Technologies from '@/components/sections/Technologies';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] selection:bg-indigo-500/30">
      <Hero />
      <About />
      <Services />
      {/* <Projects /> */}
      <Technologies />
      <Pricing />
      <Contact />
    </main>
  );
}
