'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Newspaper, ArrowUpRight, Calendar } from 'lucide-react';

const newsItems = [
  {
    id: '1',
    category: 'Career',
    title: 'Promoted to Senior Associate at DIU',
    excerpt:
      'Recognized for leadership and impact across campus initiatives, now mentoring junior associates and representing the student body.',
    date: 'July 2025',
    badge: 'New',
  },
  {
    id: '2',
    category: 'Event',
    title: 'Coordinating DIU Career Fair 2025',
    excerpt:
      'Leading logistics and student-corporate communication for one of the largest university career fairs of the year.',
    date: 'June 2025',
    badge: 'Upcoming',
  },
  {
    id: '3',
    category: 'Project',
    title: 'Launched MotionReel — a browser video editor',
    excerpt:
      'A lightweight web-based video editing prototype built with canvas APIs and FFmpeg.wasm, inspired by my Premiere Pro workflow.',
    date: 'May 2025',
    badge: 'Release',
  },
  {
    id: '4',
    category: 'Community',
    title: 'Reopening Code Club mentorship sessions',
    excerpt:
      'Bringing back beginner-friendly coding workshops, mentoring the next wave of students in programming fundamentals.',
    date: 'April 2025',
    badge: 'Update',
  },
];

const badgeColors: Record<string, string> = {
  New: 'bg-[#7C5CFF]/15 text-[#7C5CFF]',
  Upcoming: 'bg-[#00E7FF]/15 text-[#00E7FF]',
  Release: 'bg-green-400/15 text-green-400',
  Update: 'bg-[#A970FF]/15 text-[#A970FF]',
};

export default function News() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="news" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span
            className="inline-flex items-center gap-2 font-inter text-xs tracking-[0.3em] uppercase"
            style={{ color: '#7C5CFF' }}
          >
            <Newspaper size={14} /> Latest News
          </span>
          <h2
            className="mt-4 font-grotesk text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Updates &amp; Announcements
          </h2>
          <p
            className="mt-4 font-inter text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            What I&apos;ve been up to lately — milestones, events, and releases.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {newsItems.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="theme-card group relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-wider ${badgeColors[item.badge]}`}
                  >
                    {item.badge}
                  </span>
                  <span
                    className="font-inter text-[10px] tracking-widest uppercase"
                    style={{ color: '#00E7FF' }}
                  >
                    {item.category}
                  </span>
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 transition-all duration-300 group-hover:rotate-45"
                  style={{ color: 'var(--text-faint)' }}
                />
              </div>

              <h3
                className="mt-4 font-grotesk text-lg font-bold transition-colors group-hover:text-[#7C5CFF]"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p
                className="mt-2 font-inter text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.excerpt}
              </p>

              <div
                className="mt-5 flex items-center justify-between border-t pt-4"
                style={{ borderColor: 'var(--border)' }}
              >
                <span
                  className="flex items-center gap-1.5 font-inter text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Calendar size={12} /> {item.date}
                </span>
                <button
                  className="font-inter text-xs font-medium transition-colors hover:text-[#7C5CFF]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
