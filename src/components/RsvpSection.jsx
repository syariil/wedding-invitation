"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";

export default function RsvpSection({ defaultName }) {
  const [name, setName] = useState(defaultName || "");
  const [attendance, setAttendance] = useState("hadir");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedWishes = localStorage.getItem("wedding_wishes");
    if (savedWishes) {
      try {
        setWishes(JSON.parse(savedWishes));
      } catch (e) {
        console.error("Failed to parse wishes", e);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish = {
      id: Date.now(),
      name,
      attendance,
      message,
      date: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem("wedding_wishes", JSON.stringify(updatedWishes));
    setSubmitted(true);
    
    // Clear message but keep name and attendance
    setMessage("");
    
    // reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
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
          <h2 className="text-4xl font-serif mb-6 tracking-wide text-center md:text-left">RSVP & Ucapan</h2>
          <p className="text-sage-200 mb-8 text-center md:text-left">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl text-sage-900">
            {submitted && (
              <div className="mb-6 p-4 bg-sage-100 text-sage-800 rounded-xl border border-sage-300 text-sm font-medium text-center">
                Terima kasih! Pesan dan konfirmasi Anda telah terkirim.
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-sage-700 text-sm font-semibold mb-2" htmlFor="name">Nama Lengkap</label>
              <input 
                className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400" 
                type="text" 
                id="name" 
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sage-700 text-sm font-semibold mb-2" htmlFor="attendance">Kehadiran</label>
              <select 
                className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400" 
                id="attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
              >
                <option value="hadir">Hadir</option>
                <option value="tidak-hadir">Maaf, Tidak Bisa Hadir</option>
              </select>
            </div>
            
            <div className="mb-8">
              <label className="block text-sage-700 text-sm font-semibold mb-2" htmlFor="message">Ucapan / Doa</label>
              <textarea 
                className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 h-32 resize-none" 
                id="message" 
                placeholder="Tuliskan ucapan untuk kedua mempelai..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="w-full bg-sage-800 text-white font-semibold py-4 rounded-xl hover:bg-sage-700 transition duration-300">
              Kirim Konfirmasi
            </button>
          </form>
        </FadeIn>

        {/* MESSAGES LIST */}
        <FadeIn delay={0.2} direction="left" className="flex flex-col">
          <h3 className="text-2xl font-serif mb-6 mt-8 md:mt-0 text-center md:text-left">Pesan & Doa</h3>
          <div className="flex-1 bg-white/5 rounded-3xl p-6 border border-white/10 overflow-y-auto max-h-[600px] flex flex-col gap-4">
            {wishes.length === 0 ? (
              <p className="text-sage-300 text-center italic py-10">Belum ada ucapan. Jadilah yang pertama memberikan doa!</p>
            ) : (
              wishes.map((wish) => (
                <div key={wish.id} className="bg-white text-sage-900 p-5 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sage-800 capitalize">{wish.name}</h4>
                    <span className="text-xs text-sage-500">{wish.date}</span>
                  </div>
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${wish.attendance === 'hadir' ? 'bg-sage-100 text-sage-700' : 'bg-red-50 text-red-600'}`}>
                      {wish.attendance === 'hadir' ? '✓ Hadir' : '✗ Tidak Hadir'}
                    </span>
                  </div>
                  <p className="text-sage-700 text-sm leading-relaxed whitespace-pre-wrap">{wish.message}</p>
                </div>
              ))
            )}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
