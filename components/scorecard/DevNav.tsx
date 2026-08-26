"use client";

import { usePathname, useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/scorecard/config";
import type { Answer } from "@/lib/scorecard/types";

/**
 * TEMPORARY — dev-only page navigator for manually clicking through the
 * funnel without re-answering all 15 questions each time. Remove this
 * component (and its import in app/layout.tsx) before launch.
 */

const PAGES = ["/", "/questionnaire", "/results"];

const ANSWERS_STORAGE_KEY = "scorecard_answers";
const CONTACT_STORAGE_KEY = "scorecard_contact";
const SUBMITTED_FLAG_KEY = "scorecard_submitted";
const SEED_STORAGE_KEY = "scorecard_seed";
const SUBMISSION_ID_STORAGE_KEY = "scorecard_submission_id";

function buildDummyAnswers(): Answer[] {
  return QUESTIONS.map((q): Answer => {
    if (q.kind === "text") {
      return { questionId: q.id, kind: "text", value: "Dev preview answer." };
    }
    if (q.kind === "multi") {
      const optionIds = (q.options ?? []).slice(0, 2).map((o) => o.id);
      return { questionId: q.id, kind: "multi", optionIds };
    }
    const options = q.options ?? [];
    const middle = options[Math.floor((options.length - 1) / 2)];
    return { questionId: q.id, kind: "single", optionId: middle.id };
  });
}

export default function DevNav() {
  const router = useRouter();
  const pathname = usePathname();
  const index = PAGES.indexOf(pathname);

  function goTo(target: string) {
    if (target === "/results" && !window.sessionStorage.getItem(ANSWERS_STORAGE_KEY)) {
      window.sessionStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(buildDummyAnswers()));
      window.sessionStorage.setItem(
        CONTACT_STORAGE_KEY,
        JSON.stringify({ firstName: "Dev", lastName: "Preview", email: "dev-preview@example.com" })
      );
      window.sessionStorage.setItem(SUBMISSION_ID_STORAGE_KEY, crypto.randomUUID());
    }
    router.push(target);
  }

  function reset() {
    window.sessionStorage.removeItem(ANSWERS_STORAGE_KEY);
    window.sessionStorage.removeItem(CONTACT_STORAGE_KEY);
    window.sessionStorage.removeItem(SUBMITTED_FLAG_KEY);
    window.sessionStorage.removeItem(SEED_STORAGE_KEY);
    window.sessionStorage.removeItem(SUBMISSION_ID_STORAGE_KEY);
    router.push("/");
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-3 border-t-2 border-dashed border-orange-500 bg-orange-100 px-4 py-2 font-mono text-xs text-orange-900">
      <span className="font-bold uppercase tracking-wide">Dev nav</span>
      <button
        type="button"
        onClick={() => index > 0 && goTo(PAGES[index - 1])}
        disabled={index <= 0}
        className="rounded border border-orange-400 bg-white px-3 py-1 disabled:opacity-40"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={() => index >= 0 && index < PAGES.length - 1 && goTo(PAGES[index + 1])}
        disabled={index < 0 || index >= PAGES.length - 1}
        className="rounded border border-orange-400 bg-white px-3 py-1 disabled:opacity-40"
      >
        Forward →
      </button>
      <button
        type="button"
        onClick={reset}
        className="rounded border border-orange-400 bg-white px-3 py-1"
      >
        Reset
      </button>
      <span className="opacity-60">{pathname}</span>
    </div>
  );
}
