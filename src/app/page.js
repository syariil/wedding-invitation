import { Calendar, MapPin, Heart, Clock } from "lucide-react";
import Image from "next/image";
import RsvpSection from "@/components/RsvpSection";
import GiftSection from "@/components/GiftSection";
import FadeIn from "@/components/FadeIn";
import MusicPlayer from "@/components/MusicPlayer";

export default async function Home({ searchParams }) {
  // In Next.js 15, searchParams is an asynchronous promise
  const params = await searchParams;
  const guestName = params?.to || params?.nama || null;

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-sage-900">
      <MusicPlayer />
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 text-center bg-sage-50 overflow-hidden z-0">
        <Image
          src="/hero-bg.png"
          alt="Floral Watercolor Background"
          fill
          priority
          className="object-cover object-center opacity-80 -z-10"
        />
        {/* Subtle Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/40 -z-10" />

        <FadeIn className="z-10 flex flex-col items-center">
          {guestName && (
            <div className="mb-12 p-6 md:px-12 bg-white/80 backdrop-blur-md rounded-3xl border border-sage-200 shadow-sm">
              <p className="text-sage-600 mb-2 font-medium">
                Kepada Yth. Bapak/Ibu/Saudara/i,
              </p>
              <h2 className="text-3xl font-serif text-sage-900 capitalize">
                {guestName}
              </h2>
              <p className="text-sage-500 text-sm mt-3">
                Kami mengundang Anda untuk hadir di hari bahagia kami.
              </p>
            </div>
          )}

          <p className="text-sm tracking-[0.3em] uppercase text-sage-700 mb-6 font-semibold">
            The Wedding Of
          </p>
          <h1 className="text-6xl md:text-8xl font-serif text-sage-900 mb-6 tracking-tight drop-shadow-sm">
            Risa <span className="text-sage-500 font-light">&</span> Rambo
          </h1>
          <p className="text-lg md:text-xl text-sage-800 italic font-serif">
            Sabtu, 13 Juni 2026
          </p>
        </FadeIn>
      </section>

      {/* 2. COUPLE SECTION */}
      <section className="py-24 px-8 bg-sage-100/50 backdrop-blur-sm flex flex-col items-center text-center relative z-0 overflow-hidden">
        <Image
          src="/couple-bg.png"
          alt="Couple Section Background"
          fill
          className="object-cover object-center opacity-50 -z-10"
        />
        <FadeIn className="max-w-3xl mx-auto w-full">
          <Heart className="w-8 h-8 text-sage-400 mx-auto mb-8" />
          <p className="text-sage-700 mb-16 leading-relaxed max-w-xl mx-auto italic">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa
            kasih dan sayang."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-16">
            {/* Groom */}
            <FadeIn
              delay={0.2}
              direction="left"
              className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-sage-300 mb-6 shadow-xl border-4 border-white overflow-hidden flex items-center justify-center text-sage-50 text-4xl font-serif">
                <Image
                  src="/w.png"
                  alt="Couple Section Background"
                  width={210}
                  height={210}
                  className="object-contain object-center rounded-full"
                />
              </div>
              <h2 className="text-3xl font-serif text-sage-900 mb-2">
                Risa Yulian Ode Inggi
              </h2>
              <p className="text-sage-600 text-sm">
                Putri dari Bpk. Jamaludin Dentau & Ibu Yana Wahid
              </p>
            </FadeIn>

            <FadeIn
              delay={0.4}
              className="text-5xl font-serif text-sage-800 font-light">
              &
            </FadeIn>

            {/* Bride */}
            <FadeIn
              delay={0.6}
              direction="right"
              className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-sage-300 mb-6 shadow-xl border-4 border-white overflow-hidden flex items-center justify-center text-sage-50 text-4xl font-serif">
                <Image
                  src="/m.png"
                  alt="Couple Section Background"
                  width={192}
                  height={192}
                  className="object-contain object-center rounded-full"
                />
              </div>
              <h2 className="text-3xl font-serif text-sage-900 mb-2">
                Laode Mesran
              </h2>
              <p className="text-sage-600 text-sm">
                Putri dari Bpk. Laode Rasiu & Ibu Musiya
              </p>
            </FadeIn>
          </div>
        </FadeIn>
      </section>

      {/* 3. EVENT DETAILS SECTION */}
      <section className="py-24 px-8 bg-white/60 backdrop-blur-sm flex flex-col items-center text-center relative z-0 overflow-hidden">
        <Image
          src="/event-bg.png"
          alt="Event Section Background"
          fill
          className="object-cover object-center opacity-60 -z-10"
        />
        <div className="max-w-4xl mx-auto w-full">
          <FadeIn>
            <h2 className="text-4xl font-serif text-sage-900 mb-16 tracking-wide">
              Waktu & Tempat
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Akad Nikah */}
            <FadeIn
              delay={0.2}
              direction="up"
              className="bg-sage-50 p-10 rounded-3xl shadow-sm border border-sage-100 flex flex-col items-center">
              <h3 className="text-2xl font-serif text-sage-800 mb-6">
                Akad Nikah
              </h3>
              <div className="flex items-center gap-3 text-sage-600 mb-4">
                <Calendar className="w-5 h-5" />
                <span>Sabtu, 13 Juni 2026</span>
              </div>
              <div className="flex items-center gap-3 text-sage-600 mb-8">
                <Clock className="w-5 h-5" />
                <span>09:00 WITA - Selesai</span>
              </div>
              <p className="font-semibold text-sage-900 mb-2">
                Kediaman Mempelai Wanita
              </p>
              <p className="text-sage-600 text-sm mb-8">
                Link. Kampung Baru, Kel. Dongkala
              </p>
              <a
                href="https://maps.app.goo.gl/cCxgaW6rxaVeP2zd7"
                className="inline-flex items-center gap-2 bg-sage-800 text-white px-6 py-3 rounded-full hover:bg-sage-700 transition duration-300 text-sm tracking-wide">
                <MapPin className="w-4 h-4" /> Buka di Google Maps
              </a>
            </FadeIn>

            {/* Resepsi */}
            <FadeIn
              delay={0.4}
              direction="up"
              className="bg-sage-50 p-10 rounded-3xl shadow-sm border border-sage-100 flex flex-col items-center">
              <h3 className="text-2xl font-serif text-sage-800 mb-6">
                Resepsi
              </h3>
              <div className="flex items-center gap-3 text-sage-600 mb-4">
                <Calendar className="w-5 h-5" />
                <span>Sabtu, 13 Juni 2026</span>
              </div>
              <div className="flex items-center gap-3 text-sage-600 mb-8">
                <Clock className="w-5 h-5" />
                <span>19:30 WIB - Selesai</span>
              </div>
              <p className="font-semibold text-sage-900 mb-2">
                Kediaman Mempelai Wanita
              </p>
              <p className="text-sage-600 text-sm mb-8">
                Link. Kampung Baru, Kel. Dongkala
              </p>
              <a
                href="https://maps.app.goo.gl/cCxgaW6rxaVeP2zd7"
                className="inline-flex items-center gap-2 bg-sage-800 text-white px-6 py-3 rounded-full hover:bg-sage-700 transition duration-300 text-sm tracking-wide">
                <MapPin className="w-4 h-4" /> Buka di Google Maps
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. GIFT SECTION */}
      <GiftSection />

      {/* 5. RSVP SECTION (Interactive) */}
      <RsvpSection defaultName={guestName || ""} />

      {/* FOOTER */}
      <footer className="py-8 bg-sage-900 text-center text-sage-400 text-sm">
        <p>
          Develop By{" "}
          <a href="https://www.instagram.com/syahrii_l">Muhamaad Syahril</a>
        </p>
        <p className="mt-2">&copy; 2026 Risa & Rambo</p>
      </footer>
    </main>
  );
}
