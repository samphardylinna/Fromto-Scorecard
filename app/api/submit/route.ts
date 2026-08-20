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
    const upstream = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: sharedSecret,
        email,
        location,
        ...rest,
      }),
    });

    if (!upstream.ok) {
      console.error("Apps Script webapp returned", upstream.status, await upstream.text());
      return NextResponse.json({ error: "Failed to record submission" }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to reach Apps Script webapp", error);
    return NextResponse.json({ error: "Failed to record submission" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
