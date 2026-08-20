import type { Insight, Question } from "./types";

/**
 * Source of truth for the scorecard. Converted once from `Scorecard .xlsx`
 * (Sheet1) cross-checked against the Miro board's Questionnaire frame —
 * the spreadsheet's own numeric ranges (e.g. "2-5", "6-10") were corrupted
 * into calendar dates by Excel's autoformat, so option wording here follows
 * Miro; point values follow the spreadsheet.
 *
 * Re-generate this file by hand if the spreadsheet or Miro board changes —
 * nothing reads either source at runtime.
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    order: 1,
    prompt: "How many times a week do you talk with an employee about your brand's story?",
    kind: "single",
    topics: ["culture"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q1-a", label: "0-1", score: 1 },
      { id: "q1-b", label: "2-5", score: 2 },
      { id: "q1-c", label: "6-10", score: 3 },
      { id: "q1-d", label: "10+", score: 4 },
    ],
  },
  {
    id: "q2",
    order: 2,
    prompt: "Do all your employees know your brand values?",
    kind: "single",
    topics: ["culture"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q2-a", label: "<60%", score: 1 },
      { id: "q2-b", label: "61-75%", score: 2 },
      { id: "q2-c", label: "76-90%", score: 3 },
      { id: "q2-d", label: "90-100%", score: 4 },
    ],
  },
  {
    id: "q3",
    order: 3,
    prompt:
      "How many ways can you name where the brand values concretely affect the way you personally work?",
    kind: "single",
    topics: ["culture"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q3-a", label: "0-1", score: 1 },
      { id: "q3-b", label: "2-5", score: 2 },
      { id: "q3-c", label: "6-10", score: 3 },
      { id: "q3-d", label: "10+", score: 4 },
    ],
  },
  {
    id: "q4",
    order: 4,
    prompt: "Can a 10 year old understand what your company does?",
    kind: "single",
    topics: ["culture", "marketing"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q4-a", label: "No", score: 2 },
      { id: "q4-b", label: "Yes", score: 4 },
    ],
  },
  {
    id: "q5",
    order: 5,
    prompt: "How much of your onboarding process is used for brand story and values?",
    kind: "single",
    topics: ["culture"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q5-a", label: "<10%", score: 1 },
      { id: "q5-b", label: "10-25%", score: 2 },
      { id: "q5-c", label: "25-50%", score: 3 },
      { id: "q5-d", label: ">50%", score: 4 },
    ],
  },
  {
    id: "q6",
    order: 6,
    prompt: "Out of 10 customers, how many would be able to tell you what your brand story is?",
    kind: "single",
    topics: ["marketing"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q6-a", label: "0", score: 1 },
      { id: "q6-b", label: "1", score: 2 },
      { id: "q6-c", label: "2-4", score: 3 },
      { id: "q6-d", label: "5+", score: 4 },
    ],
  },
  {
    id: "q7",
    order: 7,
    prompt:
      "How many features or designs in your product/service can you name which are there directly because of your brand story & values?",
    kind: "single",
    topics: ["productMatching"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q7-a", label: "0", score: 1 },
      { id: "q7-b", label: "1-5", score: 2 },
      { id: "q7-c", label: "6-10", score: 3 },
      { id: "q7-d", label: "11+", score: 4 },
    ],
  },
  {
    id: "q8",
    order: 8,
    prompt:
      "Your brand values show up clearly in your customer support and guide every interaction with a customer.",
    kind: "single",
    topics: ["productMatching"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q8-a", label: "No", score: 2 },
      { id: "q8-b", label: "Yes", score: 4 },
    ],
  },
  {
    id: "q9",
    order: 9,
    prompt: "When designing your product, you know exactly the kind of person you're aiming to delight.",
    kind: "single",
    topics: ["productMatching"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q9-a", label: "No", score: 2 },
      { id: "q9-b", label: "Yes", score: 4 },
    ],
  },
  {
    id: "q10",
    order: 10,
    prompt: "How much of your marketing is about who you are and where you're going?",
    kind: "single",
    topics: ["marketing"],
    randomizeOrder: true,
    randomizeOptions: true,
    options: [
      { id: "q10-a", label: "<5%", score: 1 },
      { id: "q10-b", label: "5-10%", score: 2 },
      { id: "q10-c", label: "10-15%", score: 3 },
      { id: "q10-d", label: ">20%", score: 4 },
    ],
  },

  // Q11-15: fixed order per Miro, unscored against the topic gauges — they
  // instead feed the "final five" total that gates the results-page CTA.
  {
    id: "q11",
    order: 11,
    prompt: "Which of the following best describes your current situation?",
    kind: "single",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: true,
    options: [
      { id: "q11-a", label: "Our focus is on making sure the product works", score: 1 },
      {
        id: "q11-b",
        label: "It all goes fine as long as I'm involved, the moment I step out the wheels fall off",
        score: 2,
      },
      {
        id: "q11-c",
        label:
          "We've done good, even though we've grown a lot, although I'd like to find a way to make it more repeatable.",
        score: 3,
      },
      { id: "q11-d", label: "We're proud of what we've achieved, but we are hungry to grow more", score: 4 },
    ],
  },
  {
    id: "q12",
    order: 12,
    prompt: "Which best describes the outcome you're looking for?",
    kind: "single",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: true,
    options: [
      { id: "q12-a", label: "This isn't really a focus for us", score: 1 },
      {
        id: "q12-b",
        label: "A clear method which can support our team to make the right choices and build a good brand",
        score: 2,
      },
      {
        id: "q12-c",
        label: "I want to make sure our brand and way of doing things is truly a living part of the organisation",
        score: 3,
      },
      { id: "q12-d", label: "A brand our core customers will love and I won't rest till we've built it", score: 4 },
    ],
  },
  {
    id: "q13",
    order: 13,
    prompt: "What's stopping you get there? (select as many as apply)",
    kind: "multi",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: true,
    options: [
      { id: "q13-a", label: "This is low priority for us", score: -3 },
      { id: "q13-b", label: "We don't have the time to focus on this", score: -1 },
      { id: "q13-c", label: "Our team doesn't seem to understand the mission", score: 0 },
      { id: "q13-d", label: "We don't have the financial resources", score: -2 },
      { id: "q13-e", label: "We don't have the right people", score: 1 },
      { id: "q13-f", label: "We don't seem to be doing the right thing", score: 2 },
      { id: "q13-g", label: "We don't have the know how", score: 3 },
    ],
  },
  {
    id: "q14",
    order: 14,
    prompt: "Which kind of solution would best suit your needs?",
    kind: "single",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: true,
    options: [
      { id: "q14-a", label: "A process our team can implement themselves", score: 1 },
      { id: "q14-b", label: "Online workshops where I can learn to do this myself", score: 2 },
      { id: "q14-c", label: "In-house brand director who would develop this for us", score: 3 },
      {
        id: "q14-d",
        label: "A fully outsourced solution where somebody will come in and fix this for us",
        score: 4,
      },
    ],
  },
  {
    id: "q15",
    order: 15,
    prompt: "Is there anything else you'd like to share with us?",
    kind: "text",
    topics: [],
    randomizeOrder: false,
    randomizeOptions: false,
  },
];

export const FINAL_FIVE_THRESHOLD = 5;

/**
 * Real copy pulled from the Miro board's Questionnaire frame, positioned
 * beside specific question blocks. Trigger conditions below are a first
 * pass inferred from each insight's vertical proximity to a question in
 * Miro — the board has no explicit connector confirming exact answer-level
 * triggers, so treat these mappings as a draft to review against the board
 * before launch, not a confirmed 1:1 link.
 */
export const INSIGHTS: Insight[] = [
  {
    id: "insight-q1-a",
    triggers: [
      { questionId: "q1", optionId: "q1-a" },
      { questionId: "q1", optionId: "q1-b" },
    ],
    text: "Make a conscious effort to coach team members to consider how to do a task in a manner that not just supports your brand values, but amplifies it — target making it a natural thought process for everyone in the company.",
  },
  {
    id: "insight-q1-b",
    triggers: [
      { questionId: "q1", optionId: "q1-b" },
      { questionId: "q1", optionId: "q1-c" },
    ],
    text: "Take time to consider and write up how your actions and work habits support, or fail to support, the brand values. Be open with the team about this, especially your shortcomings. Show them you're working on it and encourage them to do the same. Remember, only bad stuff flows down the hill; the stuff worth having must be grown upwards.",
  },
  {
    id: "insight-q2-a",
    triggers: [
      { questionId: "q2", optionId: "q2-a" },
      { questionId: "q2", optionId: "q2-b" },
    ],
    text: "Continue taking the time to work with team members on how the brand values concretely affect their work. Share specific examples from your own experience of how you shape your work to support the brand.",
  },
  {
    id: "insight-q2-b",
    triggers: [
      { questionId: "q2", optionId: "q2-b" },
      { questionId: "q2", optionId: "q2-c" },
    ],
    text: "Everything worth having in this world grows upwards; it doesn't flow down. Work with your leadership team to encourage them to consider how the brand values affect their work so it doesn't get stuck at your level. Give them the task of modelling it and teaching their team — the best way to learn something is to teach it.",
  },
  {
    id: "insight-q3-a",
    triggers: [
      { questionId: "q3", optionId: "q3-a" },
      { questionId: "q3", optionId: "q3-b" },
    ],
    text: "Everyone knows your brand values and story, but do they know how to apply them? Take the time to sit down with people and coach them through their day-to-day tasks, working through how the brand values and story affect the work they're doing.",
  },
  {
    id: "insight-q4-a",
    triggers: [{ questionId: "q4", optionId: "q4-a" }],
    text: "Is your brand story where you come from, where you're going, and what you want to achieve in the world — told as a story? Or is it still on a piece of paper from the boardroom table? Work on presenting your strategy and story so even a child could understand it. People get inspired by stories, not statistics. Give them a story.",
  },
  {
    id: "insight-q5-a",
    triggers: [
      { questionId: "q5", optionId: "q5-a" },
      { questionId: "q5", optionId: "q5-b" },
    ],
    text: "A well-crafted story works for investors and employees as well as customers. How well do you see the same story repeated across your marketing? Make sure the same message is being repeated across all functions of the company.",
  },
  {
    id: "insight-q6-a",
    triggers: [
      { questionId: "q6", optionId: "q6-a" },
      { questionId: "q6", optionId: "q6-b" },
    ],
    text: "You're putting a lot of time into onboarding your employees into the brand value and story, but it's not making its way through to the customers. Consider how you coach your team members on day-to-day tasks and strategic goals — is there a weak link in the story-telling chain?",
  },
  {
    id: "insight-q7-a",
    triggers: [
      { questionId: "q7", optionId: "q7-a" },
      { questionId: "q7", optionId: "q7-b" },
    ],
    text: "Your brand is one of the key differentiators for your product and one of the things that allows you to charge more than your competitors. If you can't name many features that support your brand, your sales team and customers likely can't either — and won't be able to justify your pricing. Work with your product team to connect features to your brand values, then take that message to sales.",
  },
  {
    id: "insight-q7-b",
    triggers: [
      { questionId: "q7", optionId: "q7-b" },
      { questionId: "q7", optionId: "q7-c" },
    ],
    text: "There's an art to knowing how many features you need in your products and services to make it feel like the brand. Work with your team to understand what your strategy demands your product has and what your brand requires — before you start any design work. The product is there to complete the strategy, not the strategy to sell the product.",
  },
  {
    id: "insight-q8-a",
    triggers: [{ questionId: "q8", optionId: "q8-a" }],
    text: "We are all most sensitive when we're upset. Customer support is the most important part of your business for improving your brand perception. Work hard with the team so they know what the brand is, they experience the brand inside the company, and they have the freedom to make it happen.",
  },
  {
    id: "insight-q10-a",
    triggers: [
      { questionId: "q10", optionId: "q10-a" },
      { questionId: "q10", optionId: "q10-b" },
    ],
    text: "Like attracts like. When the world knows who you are and where you're going, you'll find it much easier to attract customers, employees, and investors who match your business. Keep working with your team to find creative ways to broadcast the difference you're going to make.",
  },
];

/** Every completed survey surfaces at least this many insights. */
export const FREE_INSIGHT_COUNT = 3;
