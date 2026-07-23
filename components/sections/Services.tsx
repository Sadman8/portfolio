'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '@/data/portfolio';
import * as Icons from 'lucide-react';

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-white/30 uppercase">what you get</span>
        </motion.div>

        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Solutions That Deliver
        </motion.h2>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon =
              (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] || Icons.Sparkles;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative bg-[#050505] p-8 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#7C5CFF]/30 group-hover:bg-[#7C5CFF]/10">
                  <Icon size={20} className="text-[#7C5CFF]" />
                </div>
                <h3 className="font-grotesk text-lg font-bold text-white">{service.title}</h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-1.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 font-inter text-xs text-white/40"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#00E7FF]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
