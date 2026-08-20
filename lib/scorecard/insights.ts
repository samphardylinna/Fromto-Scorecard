import { FREE_INSIGHT_COUNT, INSIGHTS } from "./config";
import type { Answer, Insight } from "./types";

function matchCount(insight: Insight, answers: Answer[]): number {
  return insight.triggers.reduce((count, trigger) => {
    const answer = answers.find((a) => a.questionId === trigger.questionId);
    if (!answer) return count;
    if (answer.kind === "single" && answer.optionId === trigger.optionId) return count + 1;
    if (answer.kind === "multi" && answer.optionIds.includes(trigger.optionId)) return count + 1;
    return count;
  }, 0);
}

/**
 * Weighted-random insight selection: every candidate's weight is its match
 * count squared, so insights matching more of the respondent's answers are
 * more likely to surface, without being a deterministic top-N pick (per the
 * brief: "more matches increase the likelihood of an insight appearing").
 *
 * Always returns at least FREE_INSIGHT_COUNT insights (the "free" insights
 * every completed survey gets), padding with zero-match candidates if the
 * respondent's answers didn't trigger enough.
 */
export function selectInsights(
  answers: Answer[],
  count: number = FREE_INSIGHT_COUNT,
  rng: () => number = Math.random
): Insight[] {
  const weighted = INSIGHTS.map((insight) => {
    const matches = matchCount(insight, answers);
    return { insight, weight: Math.max(matches, 0.15) ** 2 };
  });

  const pool = [...weighted];
  const selected: Insight[] = [];

  while (selected.length < Math.min(count, INSIGHTS.length) && pool.length > 0) {
    const totalWeight = pool.reduce((sum, w) => sum + w.weight, 0);
    let roll = rng() * totalWeight;
    let index = 0;
    for (; index < pool.length; index++) {
      roll -= pool[index].weight;
      if (roll <= 0) break;
    }
    const [picked] = pool.splice(Math.min(index, pool.length - 1), 1);
    selected.push(picked.insight);
  }

  return selected;
}
