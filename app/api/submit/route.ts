import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isWorkEmail } from "@/lib/scorecard/consumerEmailDomains";

const SubmitSchema = z.object({
  // Stable per completed attempt (generated client-side once, at the start
  // of the attempt) — lets the Apps Script find and update the same Sheet
  // row for the later "wants contact" submission instead of appending a
  // duplicate.
  submissionId: z.string().trim().min(1).max(100),
  firstName: z.string().trim().min(1).max(200),
  lastName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  overallScore: z.number(),
  cultureScore: z.number(),
  marketingScore: z.number(),
  productScore: z.number(),
  finalFiveScore: z.number(),
  branch: z.enum(["book_call", "reading"]),
  wantsContact: z.boolean().default(false),
  // Every question's answer, keyed by question id (e.g. "q1") — human-
  // readable option labels, not internal ids. Capped generously per value;
  // the free-text question (Q15) is separately capped client-side.
  answers: z.record(z.string().max(20), z.string().max(1000)).default({}),
});

/**
 * Validates a completed scorecard submission, geo-tags it server-side from
 * Vercel's edge headers (never asked as a form field), and forwards it to
 * the Sheets-bound Apps Script Web App. See the build plan for the Apps
 * Script setup — service-account key creation is blocked by an
 * organization policy, so this deliberately avoids the Sheets API/Cloud
 * IAM path.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = SubmitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { email, ...rest } = parsed.data;

  if (!isWorkEmail(email)) {
    return NextResponse.json({ error: "Please use a work email address" }, { status: 400 });
  }

  const webAppUrl = process.env.SCORECARD_SHEETS_WEBAPP_URL;
  const sharedSecret = process.env.SCORECARD_SHEETS_SHARED_SECRET;

  if (!webAppUrl || !sharedSecret) {
    console.error("Missing SCORECARD_SHEETS_WEBAPP_URL or SCORECARD_SHEETS_SHARED_SECRET");
    return NextResponse.json({ error: "Lead capture is not configured" }, { status: 500 });
  }

  const country = request.headers.get("x-vercel-ip-country") ?? "unknown";
  const region = request.headers.get("x-vercel-ip-country-region") ?? "";
  const location = region ? `${region}, ${country}` : country;

  try {
    // Sent as query params, not a JSON body: Apps Script Web Apps route a
    // POST through an internal redirect to their real execution endpoint,
    // and that hop is unreliable for POST bodies (both the spec-compliant
    // auto-downgrade-to-GET, which drops the body entirely, and manually
    // re-POSTing to the redirect target, which intermittently 404s).
    // Query params survive that redirect either way, since Google carries
    // them into the execution URL it generates.
    const { answers, ...scores } = rest;
    const params = new URLSearchParams({
      secret: sharedSecret,
      submissionId: scores.submissionId,
      email,
      location,
      firstName: scores.firstName,
      lastName: scores.lastName,
      overallScore: String(scores.overallScore),
      cultureScore: String(scores.cultureScore),
      marketingScore: String(scores.marketingScore),
      productScore: String(scores.productScore),
      finalFiveScore: String(scores.finalFiveScore),
      branch: scores.branch,
      wantsContact: String(scores.wantsContact),
      ...answers,
    });

    const upstream = await fetch(`${webAppUrl}?${params.toString()}`, { method: "POST" });
    const upstreamText = await upstream.text();

    // Apps Script's ContentService always answers with HTTP 200, even when
    // the script itself reports an error (e.g. a secret mismatch) — so
    // `upstream.ok` alone can't tell success from failure. Check the body.
    let upstreamBody: unknown = null;
    try {
      upstreamBody = JSON.parse(upstreamText);
    } catch {
      // Non-JSON body (e.g. Google's HTML error page for an uncaught
      // script exception) — treated as a failure below.
    }

    const upstreamError =
      !upstream.ok ||
      !upstreamBody ||
      typeof upstreamBody !== "object" ||
      "error" in upstreamBody;

    if (upstreamError) {
      console.error("Apps Script webapp rejected the submission", upstream.status, upstreamText);
      return NextResponse.json({ error: "Failed to record submission" }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to reach Apps Script webapp", error);
    return NextResponse.json({ error: "Failed to record submission" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
