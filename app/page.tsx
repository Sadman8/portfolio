'use client';

import { useState } from 'react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import PageLoader from '@/components/PageLoader';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Navigation from '@/components/Navigation';
import CommandPalette from '@/components/CommandPalette';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  useSmoothScroll();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      {loaded && <Navigation />}

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Process />
        <Testimonials />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
