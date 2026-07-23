'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '@/data/portfolio';
import { Briefcase, GraduationCap, Heart, ChevronDown, Building2 } from 'lucide-react';

const typeConfig = {
  work: { icon: Briefcase, color: '#7C5CFF', label: 'Work' },
  education: { icon: GraduationCap, color: '#00E7FF', label: 'Education' },
  volunteer: { icon: Heart, color: '#A970FF', label: 'Volunteer' },
};

export default function Experience() {
  const [expanded, setExpanded] = useState<string | null>(experiences[0].id);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#7C5CFF] uppercase">Experience</span>
          <h2 className="mt-4 font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl">
            My professional journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-[1px] bg-gradient-to-b from-[#7C5CFF]/40 via-white/10 to-transparent sm:left-1/2" />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const config = typeConfig[exp.type];
              const Icon = config.icon;
              const isExpanded = expanded === exp.id;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative flex ${isLeft ? 'sm:justify-start' : 'sm:justify-end'}`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 top-6 z-10 -translate-x-1/2 sm:left-1/2"
                    style={{ backgroundColor: config.color }}
                  >
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: config.color, boxShadow: `0 0 12px ${config.color}` }} />
                  </div>

                  <div className={`ml-12 w-full sm:ml-0 sm:w-[calc(50%-3rem)] ${isLeft ? '' : ''}`}>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : exp.id)}
                      className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-xl transition-all duration-300 hover:border-[#7C5CFF]/30 hover:bg-white/[0.05]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10"
                            style={{ backgroundColor: `${config.color}15` }}
                          >
                            <Icon size={18} style={{ color: config.color }} />
                          </div>
                          <div>
                            <span className="font-inter text-xs tracking-wide text-white/40 uppercase">
                              {exp.period}
                            </span>
                            <h3 className="mt-1 font-grotesk text-lg font-bold text-white">{exp.role}</h3>
                            <p className="mt-0.5 flex items-center gap-1.5 font-inter text-sm text-white/50">
                              <Building2 size={12} />
                              {exp.company}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`mt-1 shrink-0 text-white/30 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                          {exp.description.map((d, j) => (
                            <li key={j} className="flex items-start gap-2 font-inter text-sm text-white/60">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: config.color }} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
