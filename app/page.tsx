import Button from "@/components/scorecard/Button";

const TOPICS = [
  "Brand values in your culture",
  "Brand marketing and messaging",
  "Product/service brand matching",
];

function FounderHeadshot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-16 w-16 flex-none overflow-hidden rounded-full border-2 border-white bg-jonas-cream">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-12 text-center">
      <h1 className="text-balance font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
        Do you want a brand that goes much deeper than just the surface?
      </h1>

      <p className="mt-10 w-full text-balance text-left font-heading text-lg font-semibold text-jonas-text-muted sm:text-xl">
        This test will help you measure and improve your...
      </p>

      <div className="mt-10 flex w-full flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-col gap-3 text-left font-serif text-lg text-jonas-text">
          {TOPICS.map((topic) => (
            <li key={topic} className="flex items-start gap-2 rounded-xl bg-jonas-cream px-4 py-3">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-yellow" aria-hidden />
              {topic}
            </li>
          ))}
        </ul>

        <Button href="/questionnaire">Take the test now</Button>
      </div>

      <div className="mt-14 flex items-center justify-between gap-4 rounded-2xl border border-jonas-text-muted/20 bg-white px-6 py-5 text-left">
        <p className="font-serif text-jonas-text">
          Brought to you by Sam and Jonas, who have between them over 50 years of experience in
          brand development, product design and service design. Now they are on a mission to help
          others build lasting and dynamic brands from the inside out.
        </p>
        <div className="flex -space-x-3">
          <FounderHeadshot src="/images/sam-headshot.jpg" alt="Sam Hardy-Linna" />
          <FounderHeadshot src="/images/jonas-headshot.jpg" alt="Jonas Hakaniemi" />
        </div>
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
