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
const SUBMISSION_ID_STORAGE_KEY = "scorecard_submission_id";

const TOPIC_LABELS: Record<Topic, string> = {
  culture: "Brand values in culture",
  marketing: "Brand marketing and messaging",
  productMatching: "Product/service brand matching",
};

const CTA_COPY = {
  heading: "Why don't you talk with us more to see how we can help you develop further?",
  action: "Start the conversation",
};

const HOME_URL = "https://fromto.fi";

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [contact, setContact] = useState<{ firstName: string; lastName: string; email: string } | null>(
    null
  );
  const [conversationStarted, setConversationStarted] = useState(false);

  useEffect(() => {
    const rawAnswers = window.sessionStorage.getItem(ANSWERS_STORAGE_KEY);
    const rawContact = window.sessionStorage.getItem(CONTACT_STORAGE_KEY);
    setAnswers(rawAnswers ? JSON.parse(rawAnswers) : []);
    setContact(rawContact ? JSON.parse(rawContact) : null);

    // Normally set when the contact step is submitted; fall back to
    // generating one here so a direct/odd landing on this page still works.
    if (!window.sessionStorage.getItem(SUBMISSION_ID_STORAGE_KEY)) {
      window.sessionStorage.setItem(SUBMISSION_ID_STORAGE_KEY, crypto.randomUUID());
    }
  }, []);

  const scores = useMemo(() => (answers ? computeScores(answers) : null), [answers]);
  const insights = useMemo(() => (answers ? selectInsights(answers) : []), [answers]);

  function submitToApi(wantsContact: boolean) {
    if (!answers || !contact || !scores) return;
    const submissionId = window.sessionStorage.getItem(SUBMISSION_ID_STORAGE_KEY) ?? crypto.randomUUID();
    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        overallScore: scores.overall.scaled,
        cultureScore: scores.byTopic.culture.scaled,
        marketingScore: scores.byTopic.marketing.scaled,
        productScore: scores.byTopic.productMatching.scaled,
        finalFiveScore: scores.finalFive.total,
        branch: scores.finalFive.branch,
        wantsContact,
        answers: formatAnswersForExport(answers),
      }),
    }).catch(() => {
      // Best-effort: a failed lead-capture POST shouldn't block the respondent
      // from seeing their own results.
    });
  }

  useEffect(() => {
    if (!answers || !contact || !scores) return;
    if (window.sessionStorage.getItem(SUBMITTED_FLAG_KEY)) return;

    window.sessionStorage.setItem(SUBMITTED_FLAG_KEY, "true");
    submitToApi(false);
  }, [answers, contact, scores]);

  function handleStartConversation() {
    setConversationStarted(true);
    // Same submissionId as the initial page-load submit, so the Apps
    // Script updates that row's "Wants Contact" cell instead of appending
    // a duplicate one.
    submitToApi(true);
  }

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
        {conversationStarted ? (
          <>
            <h2 className="text-balance font-heading text-2xl font-bold">
              Thank you, we will be in touch with you within the next few days.
            </h2>
            <div className="mt-6">
              <Button href={HOME_URL}>Return to fromto.fi</Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-balance font-heading text-2xl font-bold">{CTA_COPY.heading}</h2>
            <div className="mt-6">
              <Button onClick={handleStartConversation}>{CTA_COPY.action}</Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
