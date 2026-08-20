import Button from "@/components/scorecard/Button";

const TOPICS = [
  "Brand values in culture",
  "Brand marketing and messaging",
  "Product/service brand matching",
];

function FounderPlaceholder({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden
      className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-jonas-cream font-heading text-xl font-bold text-jonas-text"
    >
      {initials}
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-20 text-center">
      <h1 className="text-balance font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
        Do you want a brand that goes much deeper than just the surface?
      </h1>

      <ul className="mt-10 flex flex-col gap-3 text-left font-serif text-lg text-jonas-text sm:flex-row sm:gap-6">
        {TOPICS.map((topic) => (
          <li key={topic} className="flex items-start gap-2 rounded-xl bg-jonas-cream px-4 py-3 sm:flex-1">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-yellow" aria-hidden />
            {topic}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Button href="/questionnaire">Take the test now</Button>
      </div>

      <div className="mt-14 flex items-center gap-4 rounded-2xl border border-jonas-text-muted/20 bg-white px-6 py-5 text-left">
        <div className="flex -space-x-3">
          <FounderPlaceholder initials="S" />
          <FounderPlaceholder initials="J" />
        </div>
        <p className="font-serif text-jonas-text">
          Brought to you by Sam &amp; Jonas — 50+ combined years in brand development and product
          building.
        </p>
      </div>

      <h2 className="mt-16 text-balance font-heading text-2xl font-bold sm:text-3xl">
        Take the test now and find out where you&apos;re doing well.
      </h2>

      <div className="mt-8">
        <Button href="/questionnaire">Take the test now</Button>
      </div>
    </main>
  );
}
