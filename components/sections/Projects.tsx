'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/portfolio';
import { Search, ArrowUpRight, X } from 'lucide-react';
import type { Project } from '@/types';

const categories = ['All', 'Web App', 'Dashboard', 'Creative Tool', 'AI / ML', 'Design System'];

export default function Projects() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = projects.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="projects" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-white/30 uppercase">projects</span>
        </motion.div>

        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Selected Work
        </motion.h2>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-4 py-2 font-inter text-xs transition-all duration-300 ${
                  category === cat
                    ? 'border-[#7C5CFF] bg-[#7C5CFF]/10 text-white'
                    : 'border-white/10 bg-transparent text-white/40 hover:text-white/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-40 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-9 pr-4 font-inter text-sm text-white placeholder-white/30 outline-none transition-all focus:border-[#7C5CFF]/30 focus:w-52"
            />
          </div>
        </motion.div>

        {/* Project list — heynesh style large rows */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                onClick={() => setSelected(project)}
                className="group relative flex cursor-pointer items-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl transition-all duration-300 hover:border-[#7C5CFF]/20 hover:bg-white/[0.04]"
              >
                {/* Image */}
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-44">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/40" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-3">
                    <span className="font-inter text-[10px] tracking-widest text-[#00E7FF] uppercase">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="mt-1 font-grotesk text-lg font-bold text-white transition-colors group-hover:text-[#7C5CFF] sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 hidden font-inter text-sm text-white/40 sm:block sm:line-clamp-1">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-2 py-0.5 font-inter text-xs text-white/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={24}
                  className="hidden shrink-0 text-white/20 transition-all duration-300 group-hover:text-[#7C5CFF] group-hover:rotate-45 sm:block"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 rounded-full border border-white/10 bg-black/40 p-2 text-white/60 backdrop-blur-xl transition-colors hover:text-white"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>
              <div className="p-8">
                <span className="font-inter text-xs tracking-widest text-[#00E7FF] uppercase">
                  {selected.category}
                </span>
                <h3 className="mt-2 font-grotesk text-2xl font-bold text-white">{selected.title}</h3>
                <p className="mt-4 font-inter text-sm leading-relaxed text-white/60">
                  {selected.longDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-inter text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex gap-4">
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-inter text-sm text-white/80 transition-all hover:border-white/20 hover:bg-white/10"
                    >
                      View Code
                    </a>
                  )}
                  {selected.liveDemo && (
                    <a
                      href={selected.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-[#7C5CFF] px-5 py-2.5 font-inter text-sm text-white transition-all hover:bg-[#A970FF]"
                    >
                      Live Demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
