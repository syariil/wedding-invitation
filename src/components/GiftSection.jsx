"use client";
import { useState } from "react";
import { CreditCard, Gift, Copy, CheckCircle } from "lucide-react";
import Image from "next/image";
import FadeIn from "./FadeIn";

export default function GiftSection() {
  const [copiedRekening, setCopiedRekening] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedRekening(text);
    setTimeout(() => setCopiedRekening(""), 2000);
  };

  return (
    <section className="py-24 px-8 bg-white/60 backdrop-blur-md flex flex-col items-center text-center relative z-0 overflow-hidden">
      <Image
        src="/couple-bg.png"
        alt="Gift Section Background"
        fill
        className="object-cover object-center opacity-40 -z-10"
      />
      <div className="max-w-3xl mx-auto w-full">
        <FadeIn>
          <Gift className="w-10 h-10 text-sage-400 mx-auto mb-6" />
          <h2 className="text-4xl font-serif text-sage-900 mb-6 tracking-wide">
            Wedding Gift
          </h2>
          <p className="text-sage-600 mb-12 leading-relaxed max-w-xl mx-auto">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
            Namun, apabila Bapak/Ibu/Saudara/i hendak memberikan tanda kasih,
            dapat melalui:
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Transfer Bank 1 */}
          <FadeIn
            delay={0.2}
            direction="up"
            className="bg-white p-8 rounded-3xl shadow-sm border border-sage-100 flex flex-col items-center">
            <CreditCard className="w-8 h-8 text-sage-300 mb-4" />
            <h3 className="text-xl font-bold text-sage-800 mb-2">MANDIRI</h3>
            <p className="text-sage-600 mb-1">A.n LDMESRAN</p>
            <p className="text-2xl font-mono text-sage-900 tracking-wider mb-6">
              1620010697872
            </p>

            <button
              onClick={() => copyToClipboard("1620010697872")}
              className="flex items-center gap-2 bg-sage-100 text-sage-800 px-6 py-3 rounded-full hover:bg-sage-200 transition duration-300 text-sm font-medium">
              {copiedRekening === "1620010697872" ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" /> Tersalin
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Salin No. Rekening
                </>
              )}
            </button>
          </FadeIn>

          {/* Transfer Bank 2 */}
          <FadeIn
            delay={0.4}
            direction="up"
            className="bg-white p-8 rounded-3xl shadow-sm border border-sage-100 flex flex-col items-center">
            <CreditCard className="w-8 h-8 text-sage-300 mb-4" />
            <h3 className="text-xl font-bold text-sage-800 mb-2">MANDIRI</h3>
            <p className="text-sage-600 mb-1">A.n RISA YULIAN ODE INGGI</p>
            <p className="text-2xl font-mono text-sage-900 tracking-wider mb-6">
              1510020584287
            </p>

            <button
              onClick={() => copyToClipboard("1510020584287")}
              className="flex items-center gap-2 bg-sage-100 text-sage-800 px-6 py-3 rounded-full hover:bg-sage-200 transition duration-300 text-sm font-medium">
              {copiedRekening === "1510020584287" ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" /> Tersalin
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Salin No. Rekening
                </>
              )}
            </button>
          </FadeIn>
        </div>

        {/* Kirim Kado */}
        <FadeIn
          delay={0.6}
          direction="up"
          className="mt-8 bg-white p-8 rounded-3xl shadow-sm border border-sage-100 flex flex-col items-center">
          <Gift className="w-8 h-8 text-sage-300 mb-4" />
          <h3 className="text-xl font-bold text-sage-800 mb-4">Kirim Kado</h3>
          <p className="text-sage-600 text-center mb-6 max-w-md">
            Penerima: Risa / Rambo
            <br />
            Link. Kampung Baru, Kel. Dongkala, Kec. Kabaena Timur
          </p>
          <button
            onClick={() =>
              copyToClipboard(
                "Link. Kampung Baru, Kel. Dongkala, Kec. Kabaena Timur",
              )
            }
            className="flex items-center gap-2 border-2 border-sage-200 text-sage-800 px-6 py-3 rounded-full hover:bg-sage-50 transition duration-300 text-sm font-medium">
            {copiedRekening ===
            "Link. Kampung Baru, Kel. Dongkala, Kec. Kabaena Timur" ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" /> Alamat
                Tersalin
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Salin Alamat
              </>
            )}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
