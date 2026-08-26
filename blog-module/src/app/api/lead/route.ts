import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 10_000;
const MAX_EMAIL_LENGTH = 254;
const MAX_RESOURCE_LENGTH = 120;
const MAX_SOURCE_LENGTH = 2_048;

function cleanText(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== "string") return fallback;
  return value.replace(/[\r\n\t]/g, " ").trim().slice(0, maxLength) || fallback;
}

/**
 * Lead-capture endpoint for the blog email forms.
 *
 * It forwards { email, resource, source } to whatever webhook you set in
 * LEAD_CAPTURE_WEBHOOK_URL (a Google Apps Script web app, Zapier/Make hook,
 * or your CRM) and optionally pings Slack. With NEITHER env var set it returns
 * 200 without storing the submitted address, so the demo works before wiring it up.
 *
 * See docs/MEASUREMENT.md for the Apps Script + Sheet recipe.
 */
export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let payload: { email?: unknown; resource?: unknown; source?: unknown };
  try {
    const raw = await req.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
    }
    payload = JSON.parse(raw) as typeof payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (
    !email ||
    email.length > MAX_EMAIL_LENGTH ||
    /[<>\r\n]/.test(email) ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
  ) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const resource = cleanText(payload.resource, "Blog", MAX_RESOURCE_LENGTH);
  const source = cleanText(payload.source, "", MAX_SOURCE_LENGTH);

  const webhook = process.env.LEAD_CAPTURE_WEBHOOK_URL;
  const slack = process.env.LEAD_SLACK_WEBHOOK_URL;

  // No backend wired yet: succeed for the demo without writing personal data to logs.
  if (!webhook) {
    console.info("[lead] skipped because no webhook is configured");
    return NextResponse.json({ ok: true });
  }

  try {
    const webhookResponse = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, resource, source, ts: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!webhookResponse.ok) throw new Error(`Lead webhook returned ${webhookResponse.status}`);

    if (slack) {
      const slackResponse = await fetch(slack, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `New lead: ${email} - ${resource.replace(/[<>&]/g, "")}` }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!slackResponse.ok) throw new Error(`Slack webhook returned ${slackResponse.status}`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] forward failed", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ ok: false, error: "Upstream failed" }, { status: 502 });
  }
}
