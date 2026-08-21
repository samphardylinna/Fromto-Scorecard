import Link from "next/link";

const HOME_URL = "https://fromto.fi";

// Matches the compressed (shrunk) state of the main site's header —
// see Header.tsx in the Webpage repo — but static, since this standalone
// app has no scroll-driven expand/collapse state to react to.
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="relative mx-auto flex h-[57px] w-full max-w-5xl items-center justify-between px-4">
        <Link href={HOME_URL} aria-label="The Fromto Company — home" className="block h-8 w-[80px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="" className="h-full w-full" />
        </Link>

        <div className="flex items-center gap-1 font-mono text-sm font-bold tracking-tight">
          <span className="text-black" aria-current="true">
            En
          </span>
          <span className="text-black/40">/</span>
          <span className="cursor-not-allowed text-black/40" title="Finnish coming soon" aria-disabled="true">
            Fi
          </span>
        </div>
      </div>
    </header>
  );
}
