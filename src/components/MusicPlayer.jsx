"use client";

import { useState, useEffect, useRef } from "react";
import { Disc, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Fungsi untuk memutar musik pada interaksi pertama pengguna (mengatasi blokir autoplay browser)
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Autoplay dicegah oleh browser:", err);
          });
      }
      // Hapus event listener setelah interaksi pertama
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("scroll", handleFirstInteraction, {
      passive: true,
    });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      {/* 
        Catatan untuk pengguna: 
        Ganti src dengan path lagu Anda sendiri di folder public (misal: /lagu-pernikahan.mp3)
      */}
      <audio ref={audioRef} src="/lagu.mp3" loop preload="auto" />

      <button
        onClick={togglePlay}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-sage-800/80 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-lg hover:bg-sage-700 transition-colors border border-white/20"
        aria-label="Toggle Music">
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Disc className="w-6 h-6" />
          </motion.div>
        ) : (
          <Pause className="w-5 h-5" />
        )}
      </button>
    </>
  );
}
