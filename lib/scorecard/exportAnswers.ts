import { QUESTIONS } from "./config";
import type { Answer, Question } from "./types";

/** Free-text answers (Q15) are capped client-side to keep the lead-capture
 *  payload well under any practical URL-length limit — see the note in
 *  app/api/submit/route.ts on why query params are used instead of a body. */
export const FREE_TEXT_MAX_LENGTH = 300;

function optionLabel(question: Question, optionId: string): string {
  return question.options?.find((o) => o.id === optionId)?.label ?? "";
}

/**
 * Every question's answer as human-readable label(s), keyed for the
 * lead-capture Sheet row (not for scoring — see scoring.ts for that).
 *
 * A capped multi-select question (currently only Q13, max 3) gets one
 * export column per allowed slot — "q13_1", "q13_2", "q13_3" — each
 * holding one selected label in the order chosen, empty if unused. An
 * uncapped multi-select would instead join all selections into a single
 * "; "-separated string under the plain question id.
 */
export function formatAnswersForExport(answers: Answer[]): Record<string, string> {
  const answerMap = new Map(answers.map((a) => [a.questionId, a]));
  const out: Record<string, string> = {};

  for (const question of QUESTIONS) {
    const answer = answerMap.get(question.id);

    if (question.kind === "multi" && question.maxSelections) {
      const optionIds = answer?.kind === "multi" ? answer.optionIds : [];
      for (let slot = 0; slot < question.maxSelections; slot++) {
        out[`${question.id}_${slot + 1}`] = optionIds[slot] ? optionLabel(question, optionIds[slot]) : "";
      }
      continue;
    }

    if (!answer) {
      out[question.id] = "";
    } else if (answer.kind === "text") {
      out[question.id] = answer.value.trim();
    } else if (answer.kind === "single") {
      out[question.id] = optionLabel(question, answer.optionId);
    } else {
      out[question.id] = answer.optionIds.map((id) => optionLabel(question, id)).join("; ");
    }
  }

  return out;
}
