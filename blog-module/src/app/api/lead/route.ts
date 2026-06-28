import { NextResponse } from "next/server";

/**
 * Lead-capture endpoint for the blog email forms.
 *
 * It forwards { email, resource, source } to whatever webhook you set in
 * LEAD_CAPTURE_WEBHOOK_URL (a Google Apps Script web app, Zapier/Make hook,
 * or your CRM) and optionally pings Slack. With NEITHER env var set it simply
 * logs and returns 200, so the demo works before you wire anything up.
 *
 * See docs/MEASUREMENT.md for the Apps Script + Sheet recipe.
 */
export async function POST(req: Request) {
  let payload: { email?: string; resource?: string; source?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { email, resource = "Blog", source = "" } = payload;
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const webhook = process.env.LEAD_CAPTURE_WEBHOOK_URL;
  const slack = process.env.LEAD_SLACK_WEBHOOK_URL;

  // No backend wired yet — log and succeed so the form never looks broken.
  if (!webhook) {
    console.log("[lead] (no webhook set)", { email, resource, source });
    return NextResponse.json({ ok: true });
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, resource, source, ts: new Date().toISOString() }),
    });
    if (slack) {
      await fetch(slack, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `New lead: ${email} — ${resource}` }),
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] forward failed", err);
    return NextResponse.json({ ok: false, error: "Upstream failed" }, { status: 502 });
  }
}
