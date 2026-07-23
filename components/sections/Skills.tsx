'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '@/data/portfolio';
import { Code2, Server, Brain, Palette, Wrench, Users } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Code2 },
  { id: 'frontend', label: 'Frontend', icon: Code2 },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'ai', label: 'AI / ML', icon: Brain },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'soft', label: 'Soft Skills', icon: Users },
] as const;

export default function Skills() {
  const [active, setActive] = useState<string>('all');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#7C5CFF] uppercase">Skills</span>
          <h2 className="mt-4 font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl">
            What I bring to the table
          </h2>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 font-inter text-sm transition-all duration-300 ${
                  isActive
                    ? 'border-[#7C5CFF] bg-[#7C5CFF]/15 text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80'
                }`}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#7C5CFF]/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="font-grotesk text-base font-semibold text-white">{skill.name}</h3>
                </div>
                <span className="font-inter text-sm font-medium text-white/40">{skill.level}%</span>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#00E7FF]"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
