"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/scorecard/Button";
import Gauge from "@/components/scorecard/Gauge";
import { formatAnswersForExport } from "@/lib/scorecard/exportAnswers";
import { selectInsights } from "@/lib/scorecard/insights";
import { useLanguage } from "@/lib/scorecard/language";
import { computeScores } from "@/lib/scorecard/scoring";
import { UI_TEXT } from "@/lib/scorecard/uiText";
import type { Answer, Insight, Topic } from "@/lib/scorecard/types";

const CONTACT_STORAGE_KEY = "scorecard_contact";
const ANSWERS_STORAGE_KEY = "scorecard_answers";
const SUBMITTED_FLAG_KEY = "scorecard_submitted";
const SUBMISSION_ID_STORAGE_KEY = "scorecard_submission_id";

const HOME_URL = "https://fromto.fi";

export default function ResultsPage() {
  const { language } = useLanguage();
  const t = UI_TEXT[language].results;
  const insightText = (insight: Insight) => (language === "fi" ? insight.textFi : insight.text);

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
        <p className="font-serif text-lg text-jonas-text">{t.loading}</p>
      </main>
    );
  }

  if (answers.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold">{t.noResultsHeading}</h1>
        <p className="mt-3 font-serif text-jonas-text">{t.noResultsBody}</p>
        <div className="mt-6">
          <Button href="/questionnaire">{t.takeTestNow}</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-16 text-center">
      <h1 className="text-balance font-heading text-3xl font-bold sm:text-4xl">{t.overallHeading}</h1>
      <div className="mt-6">
        <Gauge score={scores.overall.scaled} label={t.overallGaugeLabel} size="large" />
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {(Object.keys(t.topicLabels) as Topic[]).map((topic) => (
          <Gauge key={topic} score={scores.byTopic[topic].scaled} label={t.topicLabels[topic]} />
        ))}
      </div>

      <h2 className="mt-16 font-heading text-2xl font-bold">{t.insightsHeading}</h2>
      <div className="mt-6 flex w-full flex-col gap-4 text-left">
        {insights.map((insight) => (
          <p key={insight.id} className="rounded-2xl bg-jonas-cream p-5 font-serif text-jonas-text">
            {insightText(insight)}
          </p>
        ))}
      </div>

      <div className="mt-16 w-full rounded-2xl border-2 border-black p-8">
        {conversationStarted ? (
          <>
            <h2 className="text-balance font-heading text-2xl font-bold">{t.thankYou}</h2>
            <div className="mt-6">
              <Button href={HOME_URL}>{t.returnHome}</Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-balance font-heading text-2xl font-bold">{t.ctaHeading}</h2>
            <div className="mt-6">
              <Button onClick={handleStartConversation}>{t.ctaAction}</Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
