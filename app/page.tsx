"use client";

import Button from "@/components/scorecard/Button";
import { useLanguage } from "@/lib/scorecard/language";
import { UI_TEXT } from "@/lib/scorecard/uiText";

function FounderHeadshot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-16 w-16 flex-none overflow-hidden rounded-full border-2 border-white bg-jonas-cream">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

export default function LandingPage() {
  const { language } = useLanguage();
  const t = UI_TEXT[language].landing;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-12 text-center">
      <h1 className="text-balance font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
        {t.heading}
      </h1>

      <p className="mt-10 w-full text-balance text-center font-heading text-lg font-semibold text-jonas-text-muted sm:text-xl">
        {t.subheading}
      </p>

      <div className="mt-10 flex w-full flex-col items-center gap-8">
        <ul className="flex w-full flex-col gap-3 font-serif text-lg text-jonas-text">
          {t.topics.map((topic) => (
            <li
              key={topic}
              className="flex items-center justify-center gap-2 rounded-xl bg-jonas-cream px-4 py-3"
            >
              <span className="h-2 w-2 flex-none rounded-full bg-brand-yellow" aria-hidden />
              {topic}
            </li>
          ))}
        </ul>
        <p className="text-balance font-heading text-lg font-semibold text-jonas-text-muted sm:text-xl">
          {t.minutes}
        </p>
      </div>

      <div className="mt-10">
        <Button href="/questionnaire" className="px-12 py-5 text-xl">
          {t.cta}
        </Button>
      </div>

      <div className="mt-14 flex items-center justify-between gap-4 rounded-2xl border border-jonas-text-muted/20 bg-white px-6 py-5 text-left">
        <p className="font-serif text-jonas-text">{t.bio}</p>
        <div className="flex -space-x-3">
          <FounderHeadshot src="/images/sam-headshot.jpg" alt="Sam Hardy-Linna" />
          <FounderHeadshot src="/images/jonas-headshot.jpg" alt="Jonas Hakaniemi" />
        </div>
      </div>
    </main>
  );
}
