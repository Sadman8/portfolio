'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { processSteps } from '@/data/portfolio';
import * as Icons from 'lucide-react';

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#7C5CFF] uppercase">Process</span>
          <h2 className="mt-4 font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl">
            How I bring ideas to life
          </h2>
        </motion.div>

        <div className="relative">
          {/* Horizontal line for desktop */}
          <div className="absolute top-12 left-0 hidden h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[step.icon] || Icons.Sparkles;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] transition-all duration-300 group-hover:border-[#7C5CFF]/40">
                    <div className="absolute inset-0 rounded-full bg-[#7C5CFF]/0 blur-[30px] transition-all duration-300 group-hover:bg-[#7C5CFF]/20" />
                    <Icon size={28} className="relative text-[#7C5CFF] transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#7C5CFF] font-grotesk text-xs font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-grotesk text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/50">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
