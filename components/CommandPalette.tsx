'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface CommandItem {
  label: string;
  href: string;
  icon: string;
}

const commands: CommandItem[] = [
  { label: 'About', href: '#about', icon: 'User' },
  { label: 'Skills', href: '#skills', icon: 'Sparkles' },
  { label: 'Projects', href: '#projects', icon: 'Code' },
  { label: 'Experience', href: '#experience', icon: 'Briefcase' },
  { label: 'Services', href: '#services', icon: 'Layers' },
  { label: 'Process', href: '#process', icon: 'Workflow' },
  { label: 'Testimonials', href: '#testimonials', icon: 'MessageSquare' },
  { label: 'Blog', href: '#blog', icon: 'BookOpen' },
  { label: 'Contact', href: '#contact', icon: 'Mail' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const handleKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen((o) => !o);
    }
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
              <Search size={18} className="text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections..."
                className="flex-1 bg-transparent text-white placeholder-white/30 outline-none font-inter text-sm"
              />
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-white/30">No results found</li>
              )}
              {filtered.map((cmd) => (
                <li key={cmd.href}>
                  <button
                    onClick={() => scrollTo(cmd.href)}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFF]" />
                    {cmd.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/5 px-5 py-3">
              <p className="font-inter text-xs text-white/30">
                Press <kbd className="rounded bg-white/10 px-1.5 py-0.5">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
