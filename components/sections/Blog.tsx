'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { blogPosts } from '@/data/portfolio';
import { Clock, ArrowUpRight, Tag } from 'lucide-react';

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const featured = blogPosts.find((p) => p.featured);
  const recent = blogPosts.filter((p) => !p.featured);

  return (
    <section id="blog" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#7C5CFF] uppercase">Blog</span>
          <h2 className="mt-4 font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Thoughts & insights
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured post */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-[#7C5CFF]/30"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-[#7C5CFF] px-3 py-1 font-inter text-xs font-medium text-white">
                  Featured
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 font-inter text-xs text-white/40">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                </div>
                <h3 className="mt-4 font-grotesk text-2xl font-bold text-white transition-colors group-hover:text-[#7C5CFF]">
                  {featured.title}
                </h3>
                <p className="mt-3 font-inter text-sm leading-relaxed text-white/50">{featured.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 font-inter text-xs text-white/50">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight size={20} className="text-white/30 transition-all group-hover:text-[#7C5CFF] group-hover:rotate-45" />
                </div>
              </div>
            </motion.article>
          )}

          {/* Recent posts */}
          <div className="space-y-6">
            {recent.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="group flex gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#7C5CFF]/30"
              >
                <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 font-inter text-xs text-white/40">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  </div>
                  <h3 className="mt-2 font-grotesk text-base font-bold text-white transition-colors group-hover:text-[#7C5CFF]">
                    {post.title}
                  </h3>
                  <p className="mt-1 font-inter text-sm text-white/50 line-clamp-2">{post.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
