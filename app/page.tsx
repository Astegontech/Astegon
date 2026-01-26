import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Technologies from '@/components/Technologies';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';

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
