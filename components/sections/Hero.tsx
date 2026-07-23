'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-end sm:items-center justify-center overflow-hidden pb-16 pt-32 sm:pt-20"
    >
      {/* Full-bleed portrait — brightened, blended */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0 flex items-center justify-center md:block"
      >
        <motion.img
          src="/WhatsApp_Image_2026-07-24_at_12.47.00_AM.jpeg"
          alt={personalInfo.name}
          className="h-full w-full object-contain object-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1.2 }}
          style={{
            mixBlendMode: 'lighten',
            filter: 'brightness(1.2) contrast(1.05)',
          }}
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-[#050505]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40" />
      </motion.div>

      {/* Floating subtle blobs */}
      <motion.div
        className="absolute top-1/4 left-[8%] h-64 w-64 rounded-full bg-[#7C5CFF]/10 blur-[120px]"
        animate={{ x: mousePos.x * 15, y: mousePos.y * 15 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[8%] h-80 w-80 rounded-full bg-[#00E7FF]/8 blur-[140px]"
        animate={{ x: mousePos.x * -20, y: mousePos.y * -20 }}
        transition={{ duration: 1 }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Small tagline above headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="mb-6 font-inter text-xs tracking-[0.3em] text-white/40 uppercase"
        >
                
        </motion.p>

        {/* Big bold headline */}
        {/* Split headline across the picture - moved down */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-center gap-4 my-auto mt-20 sm:mt-0">
          
          {/* Left side: Applied Differently */}
          <h1 className="font-grotesk text-3xl font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl text-center lg:text-left">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 3.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block bg-gradient-to-r from-[#7C5CFF] via-[#A970FF] to-[#00E7FF] bg-clip-text text-transparent"
              >
                Applied Differently
              </motion.span>
            </span>
          </h1>

          {/* Right side: Creative Developer */}
          <h1 className="font-grotesk text-3xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl text-center lg:text-right">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 3.0, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block"
              >
                Creative Developer
              </motion.span>
            </span>
          </h1>

        </div>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.6 }}
          className="mx-auto mt-8 max-w-xl font-inter text-sm leading-relaxed text-white/50 sm:text-base"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden rounded-full bg-[#7C5CFF] px-8 py-4 font-inter text-sm font-medium text-white transition-all duration-300 hover:bg-[#A970FF] hover:shadow-[0_0_30px_rgba(124,92,255,0.5)]"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full border border-white/15 bg-black/30 px-8 py-4 font-inter text-sm font-medium text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-black/50"
          >
            About Me
          </button>
        </motion.div>

        {/* Stats row — heynesh style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.0, duration: 0.6 }}
          className="mt-16 flex items-center justify-center gap-12 sm:gap-20"
        >
          {personalInfo.stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-grotesk text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-1 font-inter text-[10px] tracking-[0.2em] text-white/40 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
