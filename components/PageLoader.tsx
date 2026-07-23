'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    const doneTimer = setTimeout(() => {
      setFlying(true);
      setTimeout(() => {
        setLoading(false);
        onComplete?.();
      }, 700);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {/* S.H.S logo — centered, then flies to top-left */}
          <motion.div
            animate={
              flying
                ? {
                    x: typeof window !== 'undefined' ? -(window.innerWidth / 2 - 48) : -400,
                    y: typeof window !== 'undefined' ? -(window.innerHeight / 2 - 40) : -300,
                    scale: 0.45,
                  }
                : {}
            }
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10"
          >
            <span className="font-grotesk text-5xl font-bold tracking-tight text-white">
              S<span className="text-[#7C5CFF]">.</span>H<span className="text-[#00E7FF]">.</span>S
            </span>
          </motion.div>

          {/* Progress bar — hidden during fly animation */}
          {!flying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 w-56"
            >
              <div className="overflow-hidden rounded-full bg-white/5 h-[2px]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#00E7FF]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <motion.p
                className="mt-3 text-center font-inter text-[10px] tracking-[0.3em] text-white/30 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
