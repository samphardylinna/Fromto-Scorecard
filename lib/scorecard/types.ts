export type Topic = "culture" | "marketing" | "productMatching";

export type QuestionKind = "single" | "multi" | "text";

export interface AnswerOption {
  id: string;
  label: string;
  /** Finnish translation of `label` — draft, pending human-translator review. */
  labelFi: string;
  /** Points earned if this option is selected. Can be negative (see Q13). */
  score: number;
}

export interface Question {
  id: string;
  /** Position in the fixed Miro order — Q1-10 are shuffled, Q11-15 are not. */
  order: number;
  prompt: string;
  /** Finnish translation of `prompt` — draft, pending human-translator review. */
  promptFi: string;
  kind: QuestionKind;
  /** Topic gauge(s) this question's score counts toward. Empty for Q11-15. */
  topics: Topic[];
  /** Whether this question's order can be shuffled (Q1-10 only). */
  randomizeOrder: boolean;
  /** Whether this question's own options can be shuffled. */
  randomizeOptions: boolean;
  options?: AnswerOption[];
  /** Multi-select only: caps how many options can be chosen at once. */
  maxSelections?: number;
}

export interface Insight {
  id: string;
  /** Question + option ids whose selection counts as a "match" for this insight. */
  triggers: { questionId: string; optionId: string }[];
  text: string;
  /** Finnish translation of `text` — draft, pending human-translator review. */
  textFi: string;
}

/** A respondent's answer to one question. */
export type Answer =
  | { questionId: string; kind: "single"; optionId: string }
  | { questionId: string; kind: "multi"; optionIds: string[] }
  | { questionId: string; kind: "text"; value: string };

export interface TopicScore {
  topic: Topic;
  earned: number;
  max: number;
  /** Normalized 0-9 display value, matching the Miro gauge scale. */
  scaled: number;
}

export interface ScoreSummary {
  overall: TopicScore;
  byTopic: Record<Topic, TopicScore>;
  finalFive: {
    total: number;
    branch: "book_call" | "reading";
  };
}
