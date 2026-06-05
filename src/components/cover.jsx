// src/components/Cover.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import Image from "next/image";

export default function Cover({ guestName }) {
  const [isOpened, setIsOpened] = useState(false);

  // Kunci scroll body saat cover masih tertutup
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [isOpened]);

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          key="wedding-cover"
          initial={{ y: 0 }}
          // Animasi saat tombol diklik (cover naik ke atas)
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sage-900 text-sage-50 overflow-hidden">
          {/* Background Image - Bisa disesuaikan dengan gambar Anda */}
          <Image
            src="/hero-bg.png"
            alt="Cover Background"
            fill
            priority
            className="object-cover object-center opacity-30 -z-10"
          />

          <div className="text-center z-10 px-6 max-w-lg flex flex-col items-center">
            <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-sage-200 font-semibold">
              The Wedding Of
            </p>

            <h1 className="text-5xl md:text-7xl font-serif mb-8 drop-shadow-lg">
              Risa & Rambo
            </h1>

            {/* Nama Tamu */}
            {guestName && (
              <div className="mb-10 p-6 border-y border-sage-500/30 w-full">
                <p className="text-sm mb-2 text-sage-300">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <h2 className="text-2xl font-serif capitalize text-white">
                  {guestName}
                </h2>
              </div>
            )}

            {/* Tombol pemicu musik & animasi */}
            <button
              onClick={() => setIsOpened(true)}
              className="inline-flex items-center gap-3 bg-sage-50 text-sage-900 px-8 py-3.5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 font-medium shadow-xl">
              <MailOpen className="w-5 h-5" />
              Buka Undangan
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
