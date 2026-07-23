'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/data/portfolio';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-white/30 uppercase">clients</span>
        </motion.div>

        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          From People I&apos;ve Worked With
        </motion.h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-10 backdrop-blur-xl sm:p-14"
            >
              <Quote size={36} className="mb-6 text-[#7C5CFF]/30" />
              <p className="font-grotesk text-xl font-medium leading-relaxed text-white/80 sm:text-2xl">
                {testimonials[index].content}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10">
                  <img
                    src={testimonials[index].avatar}
                    alt={testimonials[index].name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-grotesk text-base font-bold text-white">
                    {testimonials[index].name}
                  </h4>
                  <p className="font-inter text-sm text-white/40">
                    {testimonials[index].role}, {testimonials[index].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-[#7C5CFF]' : 'w-1.5 bg-white/20'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
