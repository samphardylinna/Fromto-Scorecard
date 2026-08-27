"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/scorecard/language";

const HOME_URL = "https://fromto.fi";

// Matches the compressed (shrunk) state of the main site's header —
// see Header.tsx in the Webpage repo — but static, since this standalone
// app has no scroll-driven expand/collapse state to react to.
export default function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="relative mx-auto flex h-[57px] w-full max-w-5xl items-center justify-between px-4">
        <Link href={HOME_URL} aria-label="The Fromto Company — home" className="block h-8 w-[80px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="" className="h-full w-full" />
        </Link>

        <div className="flex items-center gap-1 font-mono text-sm font-bold tracking-tight">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-current={language === "en"}
            className={language === "en" ? "text-black" : "text-black/40 hover:text-black/70"}
          >
            En
          </button>
          <span className="text-black/40">/</span>
          <button
            type="button"
            onClick={() => setLanguage("fi")}
            aria-current={language === "fi"}
            className={language === "fi" ? "text-black" : "text-black/40 hover:text-black/70"}
          >
            Fi
          </button>
        </div>
      </div>
    </header>
  );
}
