'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-white/30 uppercase">contact</span>
        </motion.div>

        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center font-grotesk text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Have something in mind?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-16 text-center font-grotesk text-2xl font-bold text-[#7C5CFF]"
        >
          Let&apos;s Talk
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="font-inter text-xs text-green-300">Available for work</span>
              </div>

              <h3 className="font-grotesk text-xl font-bold text-white">Get in touch</h3>
              <p className="mt-2 font-inter text-sm text-white/50">
                Feel free to reach out through the form or via email.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail size={16} className="text-[#7C5CFF]" />
                  {personalInfo.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <MapPin size={16} className="text-[#7C5CFF]" />
                  {personalInfo.location}
                </div>
              </div>

              <a
                href={`mailto:${personalInfo.email}`}
                className="group mt-8 inline-flex items-center gap-2 font-inter text-sm font-medium text-white transition-colors hover:text-[#7C5CFF]"
              >
                Book a Call
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:rotate-45"
                />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl lg:col-span-3"
          >
            <div>
              <label className="mb-2 block font-inter text-sm text-white/60">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className={`w-full rounded-xl border bg-white/5 px-4 py-3 font-inter text-sm text-white placeholder-white/30 outline-none transition-all ${
                  errors.name ? 'border-red-400/50' : 'border-white/10 focus:border-[#7C5CFF]/30'
                }`}
              />
              {errors.name && (
                <p className="mt-1 flex items-center gap-1 font-inter text-xs text-red-400">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-inter text-sm text-white/60">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-white/5 px-4 py-3 font-inter text-sm text-white placeholder-white/30 outline-none transition-all ${
                  errors.email ? 'border-red-400/50' : 'border-white/10 focus:border-[#7C5CFF]/30'
                }`}
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 font-inter text-xs text-red-400">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-inter text-sm text-white/60">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 font-inter text-sm text-white placeholder-white/30 outline-none transition-all ${
                  errors.message ? 'border-red-400/50' : 'border-white/10 focus:border-[#7C5CFF]/30'
                }`}
              />
              {errors.message && (
                <p className="mt-1 flex items-center gap-1 font-inter text-xs text-red-400">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#7C5CFF] px-6 py-3.5 font-inter text-sm font-medium text-white transition-all duration-300 hover:bg-[#A970FF] disabled:opacity-60"
            >
              {status === 'sending' && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              {status === 'sent' && <CheckCircle2 size={18} />}
              {status === 'idle' && <Send size={16} />}
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
            </button>

            {status === 'sent' && (
              <p className="text-center font-inter text-sm text-green-400">
                Thanks! I&apos;ll get back to you soon.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
