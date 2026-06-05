import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import CountdownBar from "@/components/CountdownBar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Undangan Pernikahan | Risa & Rambo",
  description: "Undangan pernikahan digital Risa dan Rambo",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-800">
        <CountdownBar />
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
