import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isWorkEmail } from "@/lib/scorecard/consumerEmailDomains";

const SubmitSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  overallScore: z.number(),
  cultureScore: z.number(),
  marketingScore: z.number(),
  productScore: z.number(),
  finalFiveScore: z.number(),
  branch: z.enum(["book_call", "reading"]),
});

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

/**
 * Apps Script Web App URLs (`/exec`) answer a POST with a redirect to the
 * actual execution endpoint. `fetch`'s default redirect handling follows
 * that automatically but — per the fetch spec — downgrades a POST to a
 * bodyless GET on a 301/302/303, so Apps Script's `doPost` receives no
 * body at all (`e.postData` ends up `undefined`). This re-issues the POST
 * with its original body against the redirect target instead of letting
 * fetch silently drop it.
 */
async function postFollowingRedirects(url: string, body: string, maxHops = 3): Promise<Response> {
  let target = url;
  for (let hop = 0; hop < maxHops; hop++) {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      redirect: "manual",
    });

    if (!REDIRECT_STATUSES.has(response.status)) return response;

    const location = response.headers.get("location");
    if (!location) return response;
    target = new URL(location, target).toString();
  }
  throw new Error(`Too many redirects following Apps Script webapp (>${maxHops})`);
}

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
    const upstream = await postFollowingRedirects(
      webAppUrl,
      JSON.stringify({
        secret: sharedSecret,
        email,
        location,
        ...rest,
      })
    );

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
