"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";
import { supabase } from "@/lib/supabase";

export default function RsvpSection({ defaultName }) {
  const [name, setName] = useState(defaultName || "");
  const [attendance, setAttendance] = useState("hadir");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Ambil data ucapan dari Supabase saat halaman dibuka
  useEffect(() => {
    fetchWishes();

    const channel = supabase
      .channel("wishes-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          // Tambahkan hanya jika belum ada di list (hindari duplikat)
          setWishes((prev) => {
            const alreadyExists = prev.some((w) => w.id === payload.new.id);
            if (alreadyExists) return prev;
            return [payload.new, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchWishes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil ucapan:", error);
    } else {
      setWishes(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);

    const { data, error } = await supabase
      .from("wishes")
      .insert([{ name: name.trim(), attendance, message: message.trim() }])
      .select()
      .single();

    if (error) {
      console.error("Gagal menyimpan ucapan:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } else {
      // Langsung tampilkan tanpa tunggu realtime
      setWishes((prev) => [data, ...prev]);
      setSubmitted(true);
      setMessage("");
      setTimeout(() => setSubmitted(false), 3000);
    }

    setSubmitting(false);
  };

  return (
    <section className="py-24 px-8 bg-sage-900/85 backdrop-blur-md text-sage-50 flex flex-col items-center text-center relative z-0 overflow-hidden">
      <Image
        src="/rsvp-bg.png"
        alt="RSVP Section Background"
        fill
        className="object-cover object-center opacity-40 -z-10"
      />
      <div className="max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-12 text-left">

        {/* RSVP FORM */}
        <FadeIn direction="right">
          <h2 className="text-4xl font-serif mb-6 tracking-wide text-center md:text-left">
            RSVP & Ucapan
          </h2>
          <p className="text-sage-200 mb-8 text-center md:text-left">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-xl text-sage-900"
          >
            {submitted && (
              <div className="mb-6 p-4 bg-sage-100 text-sage-800 rounded-xl border border-sage-300 text-sm font-medium text-center">
                ✅ Terima kasih! Ucapan dan konfirmasi Anda telah tersimpan.
              </div>
            )}

            <div className="mb-6">
              <label
                className="block text-sage-700 text-sm font-semibold mb-2"
                htmlFor="rsvp-name"
              >
                Nama Lengkap
              </label>
              <input
                className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400"
                type="text"
                id="rsvp-name"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sage-700 text-sm font-semibold mb-2"
                htmlFor="rsvp-attendance"
              >
                Kehadiran
              </label>
              <select
                className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400"
                id="rsvp-attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
              >
                <option value="hadir">✅ Hadir</option>
                <option value="tidak-hadir">❌ Maaf, Tidak Bisa Hadir</option>
              </select>
            </div>

            <div className="mb-8">
              <label
                className="block text-sage-700 text-sm font-semibold mb-2"
                htmlFor="rsvp-message"
              >
                Ucapan / Doa
              </label>
              <textarea
                className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 h-32 resize-none"
                id="rsvp-message"
                placeholder="Tuliskan ucapan untuk kedua mempelai..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-sage-800 text-white font-semibold py-4 rounded-xl hover:bg-sage-700 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Mengirim..." : "Kirim Konfirmasi"}
            </button>
          </form>
        </FadeIn>

        {/* MESSAGES LIST */}
        <FadeIn delay={0.2} direction="left" className="flex flex-col">
          <h3 className="text-2xl font-serif mb-6 mt-8 md:mt-0 text-center md:text-left">
            Pesan & Doa
          </h3>
          <div className="flex-1 bg-white/5 rounded-3xl p-6 border border-white/10 overflow-y-auto max-h-[600px] flex flex-col gap-4">
            {loading ? (
              <p className="text-sage-300 text-center italic py-10">
                Memuat ucapan...
              </p>
            ) : wishes.length === 0 ? (
              <p className="text-sage-300 text-center italic py-10">
                Belum ada ucapan. Jadilah yang pertama memberikan doa!
              </p>
            ) : (
              wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="bg-white text-sage-900 p-5 rounded-2xl shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sage-800 capitalize">
                      {wish.name}
                    </h4>
                    <span className="text-xs text-sage-500">
                      {new Date(wish.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        wish.attendance === "hadir"
                          ? "bg-sage-100 text-sage-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {wish.attendance === "hadir" ? "✓ Hadir" : "✗ Tidak Hadir"}
                    </span>
                  </div>
                  <p className="text-sage-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {wish.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
