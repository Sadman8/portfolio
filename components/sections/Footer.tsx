'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.social.twitter, label: 'Twitter' },
    { icon: Instagram, href: personalInfo.social.instagram, label: 'Instagram' },
  ];

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative border-t border-white/5 py-16 px-6 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              className="font-grotesk text-2xl font-bold tracking-tight text-white"
            >
              S<span className="text-[#7C5CFF]">.</span>H<span className="text-[#00E7FF]">.</span>S
            </motion.button>
            <p className="mt-4 max-w-xs font-inter text-sm leading-relaxed text-white/40">
              {personalInfo.subtitle}
            </p>
          </div>

          {/* Nav */}
          <div className="md:justify-self-center">
            <h4 className="mb-4 font-grotesk text-sm font-semibold text-white/60 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-inter text-sm text-white/40 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:justify-self-end">
            <h4 className="mb-4 font-grotesk text-sm font-semibold text-white/60 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-[#7C5CFF]/40 hover:bg-[#7C5CFF]/10 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="font-inter text-xs text-white/30">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 font-inter text-xs text-white/40 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-[#7C5CFF]/40 group-hover:bg-[#7C5CFF]/10">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
