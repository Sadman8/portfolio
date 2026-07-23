'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import { MapPin, GraduationCap } from 'lucide-react';

const journey = [
  {
    year: "'19",
    title: 'Starting out with Code Club',
    desc: 'Led the British Council Code Club at Gazipur Public Library. Mentored 30+ students in programming fundamentals and problem-solving. Awarded Certificate of Appreciation.',
  },
  {
    year: "'24",
    title: 'Joined University',
    desc: 'Began B.Sc. in Software Engineering at Daffodil International University. Started building real-world projects and diving into algorithms, data structures, and design patterns.',
  },
  {
    year: "'24",
    title: 'Became Student Associate',
    desc: 'Selected as Student Associate in my 1st year. Managed peer support, campus activities, and coordinated career fairs including DIU Job Utsob 2024.',
  },
  {
    year: "'25",
    title: 'Promoted to Senior Associate',
    desc: 'Promoted based on demonstrated leadership and impact. Now leading university initiatives, mentoring junior associates, and representing the student body in strategic forums.',
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-white/30 uppercase">about me</span>
        </motion.div>

        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          About Me (&) My Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20 text-center font-inter text-sm text-white/40"
        >
          Start small, grow big.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-[1px] bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-16">
            {journey.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex ${isLeft ? 'sm:justify-start' : 'sm:justify-end'}`}
                >
                  {/* Year dot */}
                  <div className="absolute left-4 top-2 z-10 -translate-x-1/2 sm:left-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#7C5CFF]/30 bg-[#050505]">
                      <span className="font-grotesk text-xs font-bold text-[#7C5CFF]">{item.year}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-20 w-full sm:ml-0 sm:w-[calc(50%-3.5rem)] ${isLeft ? '' : ''}`}>
                    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#7C5CFF]/20 hover:bg-white/[0.05]">
                      <h3 className="font-grotesk text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-3 font-inter text-sm leading-relaxed text-white/50">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col items-center justify-center gap-8 border-t border-white/5 pt-12 sm:flex-row sm:gap-16"
        >
          <div className="flex items-center gap-3 text-sm text-white/50">
            <MapPin size={16} className="text-[#7C5CFF]" />
            {personalInfo.location}
          </div>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <GraduationCap size={16} className="text-[#7C5CFF]" />
            {personalInfo.degree}, {personalInfo.university}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
