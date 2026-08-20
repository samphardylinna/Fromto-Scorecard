import { QUESTIONS } from "./config";
import type { AnswerOption, Question } from "./types";

const SESSION_SEED_KEY = "scorecard_seed";

/** Deterministic 32-bit PRNG so a given seed always shuffles the same way. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stringToSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * One seed per browser session (sessionStorage, not persisted across tabs
 * or after the tab closes) so a back-navigation or re-render never
 * reshuffles a quiz already in progress.
 */
export function getOrCreateSessionSeed(): number {
  if (typeof window === "undefined") return 0;

  const existing = window.sessionStorage.getItem(SESSION_SEED_KEY);
  if (existing) return Number(existing);

  const seed = Math.floor(Math.random() * 2 ** 31);
  window.sessionStorage.setItem(SESSION_SEED_KEY, String(seed));
  return seed;
}

/**
 * Full 15-question order for this session: Q1-10 shuffled, Q11-15 fixed in
 * Miro's original sequence, appended after.
 */
export function getSessionQuestionOrder(seed: number): Question[] {
  const shuffleable = QUESTIONS.filter((q) => q.randomizeOrder).sort((a, b) => a.order - b.order);
  const fixed = QUESTIONS.filter((q) => !q.randomizeOrder).sort((a, b) => a.order - b.order);
  return [...seededShuffle(shuffleable, seed), ...fixed];
}

/** Per-question option shuffle, seeded off the session seed + question id. */
export function getSessionOptionOrder(question: Question, seed: number): AnswerOption[] {
  if (!question.randomizeOptions || !question.options) return question.options ?? [];
  const questionSeed = seed ^ stringToSeed(question.id);
  return seededShuffle(question.options, questionSeed);
}
