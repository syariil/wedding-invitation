"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEDDING_DATE = new Date("2026-06-13T08:00:00");

function calculateTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) return null; // Hari H sudah tiba

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[3rem]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-lg md:text-xl font-bold font-mono text-white leading-none tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-sage-300 mt-0.5">
        {label}
      </span>
    </div>
  );
}

export default function CountdownBar() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sembunyikan saat scroll ke atas (hero), tampilkan saat scroll ke bawah
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        setVisible(false); // di hero, sembunyikan agar tidak tumpang tindih
      } else if (currentY > lastY) {
        setVisible(true); // scroll ke bawah — tampilkan
      } else {
        setVisible(true); // scroll ke atas — tetap tampilkan
      }
      lastY = currentY;
    };

    // Cek posisi awal
    if (window.scrollY < 80) setVisible(false);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!timeLeft) {
    // Hari H! Tampilkan pesan spesial
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-sage-800/90 backdrop-blur-md border-b border-white/10 py-2 px-4 text-center"
          >
            <p className="text-white font-serif text-sm md:text-base tracking-wide">
              🎊 Hari yang dinantikan telah tiba! Selamat kepada Risa & Rambo 🎊
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-sage-900/80 backdrop-blur-md border-b border-white/10"
        >
          <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-center gap-3 md:gap-5">
            {/* Label kiri */}
            <p className="hidden sm:block text-sage-300 text-xs tracking-widest uppercase font-medium whitespace-nowrap">
              Risa & Rambo
            </p>

            {/* Divider */}
            <span className="hidden sm:block text-sage-600 text-xs">✦</span>

            {/* Countdown units */}
            <div className="flex items-center gap-3 md:gap-5">
              <TimeUnit value={timeLeft.days} label="Hari" />
              <span className="text-sage-400 font-light text-lg mb-3">:</span>
              <TimeUnit value={timeLeft.hours} label="Jam" />
              <span className="text-sage-400 font-light text-lg mb-3">:</span>
              <TimeUnit value={timeLeft.minutes} label="Menit" />
              <span className="text-sage-400 font-light text-lg mb-3">:</span>
              <TimeUnit value={timeLeft.seconds} label="Detik" />
            </div>

            {/* Divider */}
            <span className="hidden sm:block text-sage-600 text-xs">✦</span>

            {/* Label kanan */}
            <p className="hidden sm:block text-sage-300 text-xs tracking-widest uppercase font-medium whitespace-nowrap">
              13 Juni 2026
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
