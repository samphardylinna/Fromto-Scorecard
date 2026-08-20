import { FINAL_FIVE_THRESHOLD, QUESTIONS } from "./config";
import type { Answer, Question, ScoreSummary, Topic, TopicScore } from "./types";

const TOPICS: Topic[] = ["culture", "marketing", "productMatching"];
const MAX_OPTION_SCORE = 4;
const GAUGE_SCALE = 9;

const FINAL_FIVE_QUESTION_IDS = ["q11", "q12", "q13", "q14"];

function questionById(id: string): Question {
  const question = QUESTIONS.find((q) => q.id === id);
  if (!question) throw new Error(`Unknown question id: ${id}`);
  return question;
}

/** Points earned for a single question, given the respondent's answer. */
export function scoreQuestion(question: Question, answer: Answer | undefined): number {
  if (!answer || !question.options) return 0;

  if (answer.kind === "single" && question.kind === "single") {
    const option = question.options.find((o) => o.id === answer.optionId);
    return option?.score ?? 0;
  }

  if (answer.kind === "multi" && question.kind === "multi") {
    return answer.optionIds.reduce((sum, optionId) => {
      const option = question.options!.find((o) => o.id === optionId);
      return sum + (option?.score ?? 0);
    }, 0);
  }

  return 0;
}

function scaleToGauge(earned: number, max: number): number {
  if (max === 0) return 0;
  return (earned / max) * GAUGE_SCALE;
}

function computeTopicScore(topic: Topic, answers: Map<string, Answer>): TopicScore {
  const topicQuestions = QUESTIONS.filter((q) => q.topics.includes(topic));
  const earned = topicQuestions.reduce((sum, q) => sum + scoreQuestion(q, answers.get(q.id)), 0);
  const max = topicQuestions.length * MAX_OPTION_SCORE;
  return { topic, earned, max, scaled: scaleToGauge(earned, max) };
}

/**
 * Computes the overall gauge, the three topic gauges, and the final-five
 * total that decides which results-page CTA branch to show.
 *
 * Formulas mirror `Scorecard .xlsx`: each topic's earned points are
 * normalized against that topic's max (4 pts × tagged-question count) and
 * scaled to the 0-9 range the Miro results mock uses. The final-five total
 * is a raw sum (no /9 scaling), compared directly against the threshold —
 * matching the spreadsheet's "Total score" cell.
 */
export function computeScores(answers: Answer[]): ScoreSummary {
  const answerMap = new Map(answers.map((a) => [a.questionId, a]));

  const byTopic = Object.fromEntries(
    TOPICS.map((topic) => [topic, computeTopicScore(topic, answerMap)])
  ) as Record<Topic, TopicScore>;

  const topicQuestionIds = new Set(QUESTIONS.filter((q) => q.order <= 10).map((q) => q.id));
  const overallEarned = QUESTIONS.filter((q) => topicQuestionIds.has(q.id)).reduce(
    (sum, q) => sum + scoreQuestion(q, answerMap.get(q.id)),
    0
  );
  const overallMax = topicQuestionIds.size * MAX_OPTION_SCORE;

  const finalFiveTotal = FINAL_FIVE_QUESTION_IDS.reduce(
    (sum, id) => sum + scoreQuestion(questionById(id), answerMap.get(id)),
    0
  );

  return {
    overall: {
      topic: "culture", // unused for the overall gauge; kept for shape consistency
      earned: overallEarned,
      max: overallMax,
      scaled: scaleToGauge(overallEarned, overallMax),
    },
    byTopic,
    finalFive: {
      total: finalFiveTotal,
      branch: finalFiveTotal >= FINAL_FIVE_THRESHOLD ? "book_call" : "reading",
    },
  };
}
