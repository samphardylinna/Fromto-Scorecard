import { QUESTIONS } from "./config";
import type { Answer, Question } from "./types";

/** Free-text answers (Q15) are capped client-side to keep the lead-capture
 *  payload well under any practical URL-length limit — see the note in
 *  app/api/submit/route.ts on why query params are used instead of a body. */
export const FREE_TEXT_MAX_LENGTH = 300;

function formatAnswer(question: Question, answer: Answer | undefined): string {
  if (!answer) return "";

  if (answer.kind === "text") return answer.value.trim();

  if (answer.kind === "single") {
    const option = question.options?.find((o) => o.id === answer.optionId);
    return option?.label ?? "";
  }

  if (answer.kind === "multi") {
    const labels = answer.optionIds
      .map((id) => question.options?.find((o) => o.id === id)?.label)
      .filter((label): label is string => Boolean(label));
    return labels.join("; ");
  }

  return "";
}

/**
 * Every question's answer as a human-readable label, keyed by question id —
 * for the lead-capture Sheet row, not for scoring (see scoring.ts for that).
 */
export function formatAnswersForExport(answers: Answer[]): Record<string, string> {
  const answerMap = new Map(answers.map((a) => [a.questionId, a]));
  return Object.fromEntries(
    QUESTIONS.map((q) => [q.id, formatAnswer(q, answerMap.get(q.id))])
  );
}
