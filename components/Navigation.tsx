'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'News', href: '#news' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl border-b py-3'
            : 'py-5'
        }`}
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--border)' : 'transparent',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-grotesk text-xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            S<span className="text-[#7C5CFF]">.</span>H<span className="text-[#00E7FF]">.</span>S
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="font-inter text-sm transition-colors duration-200 relative group"
                  style={{
                    color:
                      activeSection === link.href.slice(1)
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                  }}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] bg-[#7C5CFF] transition-all duration-300 ${
                      activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isLight ? <Moon size={16} /> : <Sun size={16} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            )}

            <button
              onClick={() => scrollTo('#contact')}
              className="flex items-center gap-2 rounded-full border px-5 py-2 font-inter text-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-secondary)',
              }}
            >
              Book a Call
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                aria-label="Toggle theme"
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-all"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                }}
              >
                {isLight ? <Moon size={14} /> : <Sun size={14} />}
              </button>
            )}
            <button
              className="transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-xl lg:hidden"
            style={{ backgroundColor: 'var(--nav-bg)' }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(link.href)}
                className="font-grotesk text-3xl font-medium transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
