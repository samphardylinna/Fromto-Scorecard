"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/scorecard/Button";
import ChoiceCard from "@/components/scorecard/ChoiceCard";
import ProgressRail from "@/components/scorecard/ProgressRail";
import { isWorkEmail } from "@/lib/scorecard/consumerEmailDomains";
import { getOrCreateSessionSeed, getSessionOptionOrder, getSessionQuestionOrder } from "@/lib/scorecard/randomize";
import type { Answer } from "@/lib/scorecard/types";

type Contact = { name: string; email: string };

const CONTACT_STORAGE_KEY = "scorecard_contact";
const ANSWERS_STORAGE_KEY = "scorecard_answers";

export default function QuestionnairePage() {
  const router = useRouter();
  const seed = useMemo(() => getOrCreateSessionSeed(), []);
  const questions = useMemo(() => getSessionQuestionOrder(seed), [seed]);

  const [stepIndex, setStepIndex] = useState(0); // 0 = contact form, 1..N = questions
  const [contact, setContact] = useState<Contact>({ name: "", email: "" });
  const [contactError, setContactError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const isContactStep = stepIndex === 0;
  const question = isContactStep ? null : questions[stepIndex - 1];
  const options = useMemo(
    () => (question ? getSessionOptionOrder(question, seed) : []),
    [question, seed]
  );
  const currentAnswer = question ? answers[question.id] : undefined;

  const canAdvance = isContactStep
    ? contact.name.trim().length > 0 && contact.email.trim().length > 0
    : question?.kind === "text" || currentAnswer !== undefined;

  function submitContact() {
    if (!contact.name.trim() || !contact.email.trim()) {
      setContactError("Please fill in both fields.");
      return;
    }
    if (!isWorkEmail(contact.email)) {
      setContactError("Please use your work email address, not a personal one.");
      return;
    }
    setContactError(null);
    window.sessionStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
    setStepIndex(1);
  }

  function selectSingle(optionId: string) {
    if (!question) return;
    const next: Answer = { questionId: question.id, kind: "single", optionId };
    const updated = { ...answers, [question.id]: next };
    setAnswers(updated);
    window.sessionStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(Object.values(updated)));
  }

  function toggleMulti(optionId: string) {
    if (!question) return;
    const existing = answers[question.id];
    const current = existing && existing.kind === "multi" ? existing.optionIds : [];
    const optionIds = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    const next: Answer = { questionId: question.id, kind: "multi", optionIds };
    const updated = { ...answers, [question.id]: next };
    setAnswers(updated);
    window.sessionStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(Object.values(updated)));
  }

  function setText(value: string) {
    if (!question) return;
    const next: Answer = { questionId: question.id, kind: "text", value };
    const updated = { ...answers, [question.id]: next };
    setAnswers(updated);
    window.sessionStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(Object.values(updated)));
  }

  function goNext() {
    if (isContactStep) {
      submitContact();
      return;
    }
    if (stepIndex >= questions.length) {
      router.push("/results");
      return;
    }
    setStepIndex(stepIndex + 1);
  }

  function goBack() {
    setStepIndex(Math.max(0, stepIndex - 1));
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-16">
      {!isContactStep && <ProgressRail current={stepIndex} total={questions.length} />}

      {isContactStep && (
        <div className="flex flex-col gap-6">
          <h1 className="font-heading text-3xl font-bold">Before we start</h1>
          <p className="font-serif text-jonas-text">
            We&apos;ll email your results and a couple of tailored insights — no spam, just this.
          </p>
          <label className="flex flex-col gap-2 text-left font-heading text-sm font-semibold uppercase tracking-wide text-jonas-text-muted">
            Your name
            <input
              type="text"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="rounded-xl border-2 border-jonas-text-muted/30 px-4 py-3 font-serif text-lg text-black normal-case focus:border-black focus:outline-none"
              autoComplete="name"
            />
          </label>
          <label className="flex flex-col gap-2 text-left font-heading text-sm font-semibold uppercase tracking-wide text-jonas-text-muted">
            Your work email
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="rounded-xl border-2 border-jonas-text-muted/30 px-4 py-3 font-serif text-lg text-black normal-case focus:border-black focus:outline-none"
              autoComplete="email"
            />
          </label>
          {contactError && <p className="text-sm font-medium text-red-700">{contactError}</p>}
        </div>
      )}

      {question && (
        <div className="flex flex-col gap-6">
          <h1 className="text-balance font-heading text-2xl font-bold sm:text-3xl">{question.prompt}</h1>

          {question.kind === "single" && (
            <div className="flex flex-col gap-3">
              {options.map((option) => (
                <ChoiceCard
                  key={option.id}
                  kind="single"
                  label={option.label}
                  selected={currentAnswer?.kind === "single" && currentAnswer.optionId === option.id}
                  onSelect={() => selectSingle(option.id)}
                />
              ))}
            </div>
          )}

          {question.kind === "multi" && (
            <div className="flex flex-col gap-3">
              {options.map((option) => (
                <ChoiceCard
                  key={option.id}
                  kind="multi"
                  label={option.label}
                  selected={
                    currentAnswer?.kind === "multi" && currentAnswer.optionIds.includes(option.id)
                  }
                  onSelect={() => toggleMulti(option.id)}
                />
              ))}
            </div>
          )}

          {question.kind === "text" && (
            <textarea
              value={currentAnswer?.kind === "text" ? currentAnswer.value : ""}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your answer here..."
              rows={5}
              className="rounded-xl border-2 border-jonas-text-muted/30 px-4 py-3 font-serif text-lg focus:border-black focus:outline-none"
            />
          )}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <Button variant="secondary" onClick={goBack} disabled={stepIndex === 0}>
          Back
        </Button>
        <Button onClick={goNext} disabled={!canAdvance}>
          {!isContactStep && stepIndex === questions.length ? "See results" : "Next"}
        </Button>
      </div>
    </main>
  );
}
