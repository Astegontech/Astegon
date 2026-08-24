import Hero from '@/features/home/components/Hero';
import About from '@/features/home/components/About';
import Services from '@/features/home/components/Services';
import Projects from '@/features/home/components/Projects';
import Technologies from '@/features/home/components/Technologies';
import Pricing from '@/features/home/components/Pricing';
import Contact from '@/features/home/components/Contact';

const styles = {
  main: "min-h-screen bg-[#000000] selection:bg-indigo-500/30"
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Technologies />
      <Pricing />
      <Contact />
    </main>
  );
}
