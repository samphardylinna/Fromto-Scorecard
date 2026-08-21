"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/scorecard/Button";
import Gauge from "@/components/scorecard/Gauge";
import { formatAnswersForExport } from "@/lib/scorecard/exportAnswers";
import { selectInsights } from "@/lib/scorecard/insights";
import { computeScores } from "@/lib/scorecard/scoring";
import type { Answer, Topic } from "@/lib/scorecard/types";

const CONTACT_STORAGE_KEY = "scorecard_contact";
const ANSWERS_STORAGE_KEY = "scorecard_answers";
const SUBMITTED_FLAG_KEY = "scorecard_submitted";

const TOPIC_LABELS: Record<Topic, string> = {
  culture: "Brand values in culture",
  marketing: "Brand marketing and messaging",
  productMatching: "Product/service brand matching",
};

const CTA_COPY = {
  book_call: {
    heading: "Why don't you talk with us more to see how we can help you develop further?",
    action: "Book a time with us",
    href: "#", // placeholder — booking link to be supplied
  },
  reading: {
    heading: "Have you read...",
    action: "See recommended reading",
    href: "#", // placeholder — final copy/link to be supplied
  },
} as const;

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [contact, setContact] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const rawAnswers = window.sessionStorage.getItem(ANSWERS_STORAGE_KEY);
    const rawContact = window.sessionStorage.getItem(CONTACT_STORAGE_KEY);
    setAnswers(rawAnswers ? JSON.parse(rawAnswers) : []);
    setContact(rawContact ? JSON.parse(rawContact) : null);
  }, []);

  const scores = useMemo(() => (answers ? computeScores(answers) : null), [answers]);
  const insights = useMemo(() => (answers ? selectInsights(answers) : []), [answers]);

  useEffect(() => {
    if (!answers || !contact || !scores) return;
    if (window.sessionStorage.getItem(SUBMITTED_FLAG_KEY)) return;

    window.sessionStorage.setItem(SUBMITTED_FLAG_KEY, "true");
    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        overallScore: scores.overall.scaled,
        cultureScore: scores.byTopic.culture.scaled,
        marketingScore: scores.byTopic.marketing.scaled,
        productScore: scores.byTopic.productMatching.scaled,
        finalFiveScore: scores.finalFive.total,
        branch: scores.finalFive.branch,
        answers: formatAnswersForExport(answers),
      }),
    }).catch(() => {
      // Best-effort: a failed lead-capture POST shouldn't block the respondent
      // from seeing their own results.
    });
  }, [answers, contact, scores]);

  if (!answers || !scores) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-serif text-lg text-jonas-text">Loading your results…</p>
      </main>
    );
  }

  if (answers.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold">No results yet</h1>
        <p className="mt-3 font-serif text-jonas-text">Take the assessment first to see your score.</p>
        <div className="mt-6">
          <Button href="/questionnaire">Take the test now</Button>
        </div>
      </main>
    );
  }

  const cta = CTA_COPY[scores.finalFive.branch];

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-16 text-center">
      <h1 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
        Your overall culture-based brand score is:
      </h1>
      <div className="mt-6">
        <Gauge score={scores.overall.scaled} label="Overall" size="large" />
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {(Object.keys(TOPIC_LABELS) as Topic[]).map((topic) => (
          <Gauge key={topic} score={scores.byTopic[topic].scaled} label={TOPIC_LABELS[topic]} />
        ))}
      </div>

      <h2 className="mt-16 font-heading text-2xl font-bold">Here&apos;s some things you could work on</h2>
      <div className="mt-6 flex w-full flex-col gap-4 text-left">
        {insights.map((insight) => (
          <p key={insight.id} className="rounded-2xl bg-jonas-cream p-5 font-serif text-jonas-text">
            {insight.text}
          </p>
        ))}
      </div>

      <div className="mt-16 w-full rounded-2xl border-2 border-black p-8">
        <h2 className="text-balance font-heading text-2xl font-bold">{cta.heading}</h2>
        <div className="mt-6">
          <Button href={cta.href}>{cta.action}</Button>
        </div>
      </div>
    </main>
  );
}
