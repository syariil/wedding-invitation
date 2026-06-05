"use client";

import { useState, useEffect, useRef } from "react";
import { Disc, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userPaused = useRef(false);

  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current && !userPaused.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Menunggu interaksi user...");
          document.addEventListener("click", playOnInteract, { once: true });
          document.addEventListener("scroll", playOnInteract, { once: true });
          document.addEventListener("touchstart", playOnInteract, {
            once: true,
          });
        }
      }
    };

    const playOnInteract = async () => {
      if (audioRef.current && !userPaused.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Gagal memutar audio:", err);
        }
      }
    };

    attemptAutoplay();

    // CLEANUP FUNCTION: Sangat penting untuk mencegah audio ganda di React Strict Mode
    return () => {
      document.removeEventListener("click", playOnInteract);
      document.removeEventListener("scroll", playOnInteract);
      document.removeEventListener("touchstart", playOnInteract);

      // Matikan audio saat komponen dilepas dari layar (unmount)
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      userPaused.current = true;
    } else {
      audioRef.current.play();
      userPaused.current = false;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/lagu.mp3"
        loop
        preload="auto"
        // Atribut autoPlay DIHAPUS dari sini
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={togglePlay}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-sage-800/80 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-lg hover:bg-sage-700 transition-colors border border-white/20"
        aria-label="Toggle Music">
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            // Durasi dipercepat sedikit menjadi 3 detik
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            // Tambahkan border putus-putus (dashed) agar putarannya sangat jelas terlihat
            className="w-8 h-8 rounded-full border-[1.5px] border-dashed border-white flex items-center justify-center">
            {/* Icon sedikit dikecilkan agar pas di dalam cincin */}
            <Disc className="w-4 h-4" />
          </motion.div>
        ) : (
          <Pause className="w-5 h-5" />
        )}
      </button>
    </>
  );
}
