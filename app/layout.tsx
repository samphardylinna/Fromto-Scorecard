import type { Metadata } from "next";
import { Poppins, Zilla_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/scorecard/Header";
// TEMPORARY — dev-only page navigator, remove this import and its
// render below before launch (see components/scorecard/DevNav.tsx)
import DevNav from "@/components/scorecard/DevNav";

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Brand Scorecard | FromTo",
  description:
    "A short assessment of your brand's health across culture, marketing, and product — from the team at FromTo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${zillaSlab.variable} ${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-12 text-black">
        <Header />
        {children}
        {/* TEMPORARY — remove before launch */}
        <DevNav />
      </body>
    </html>
  );
}
