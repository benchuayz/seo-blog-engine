# Measurement (optional)

You can publish and rank without any of this. But if you want to know which posts
actually drive leads (not just traffic), wire up attribution. This is the part
that turns a blog into a pipeline channel you can defend in a budget meeting.

Everything here is optional and off by default.

## The one number that matters

Not pageviews. **Bookings (or signups) attributed to a specific post.** A post
with 300 views and 2 booked calls beats a post with 30,000 views and zero.

## How attribution works here

Every internal CTA the engine renders carries UTM params, and `utm_campaign` is
set to the post slug (`lib/utm.ts`). So when someone reads
`/blog/why-dashboards-are-slow`, clicks the CTA, and books a call, the booking
arrives tagged `utm_campaign=why-dashboards-are-slow`. Read that off your booking
tool and you know which post earned the call.

Convention used throughout:
- `utm_source` = the channel (organic, chatgpt, perplexity, linkedin)
- `utm_medium` = seo / ai / social
- `utm_campaign` = the post slug (the join key)

## Analytics (pick one)

- **Fathom Analytics** (privacy-friendly, no cookie banner). Set
  `NEXT_PUBLIC_FATHOM_SITE_ID`. The site ID is public; keep the API key
  (`FATHOM_API_KEY`) server-side if you pull reports programmatically.
- **Google Analytics 4.** Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.

Add the tracking snippet in `blog-module/src/app/layout.tsx`. Neither is included
by default so the module stays dependency-free.

## Email capture → your CRM/sheet

The `emailCapture` block POSTs `{ email, resource, source }` to
`/api/lead` (`blog-module/src/app/api/lead/route.ts`). With no webhook set it
returns success without storing the submitted address, so the form never looks broken. To actually capture
leads, set `LEAD_CAPTURE_WEBHOOK_URL` to any endpoint that accepts JSON:

- A **Google Apps Script** web app that appends a row to a Sheet (free, 10-minute
  setup).
- A **Zapier / Make** webhook into your CRM.
- Your own API.

Optionally set `LEAD_SLACK_WEBHOOK_URL` to ping a channel on each new lead.

Before a public launch, add a distributed rate limit for `/api/lead` through your
hosting firewall or a shared datastore. The included route rejects oversized and
malformed input, but a serverless in-memory counter would not reliably stop spam.

`resource` tags which offer they opted into; `source` is the post URL they came
from, so your sheet shows exactly which post generated which lead.

### Minimal Google Apps Script receiver

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    .appendRow([new Date(), data.email, data.resource, data.source]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy it as a web app ("anyone can access"), paste the `/exec` URL into
`LEAD_CAPTURE_WEBHOOK_URL`. Never commit that URL — it lives in `.env.local`.

## A simple weekly review

Once a week, look at three things and write one sentence of "so what":
1. Which posts got impressions/clicks in Search Console (are you being found?).
2. Which posts drove bookings/signups by `utm_campaign` (are you converting?).
3. Are you cited in ChatGPT/Perplexity for your target questions? (Ask them and
   check.) (GEO working?)

Write the next post about whatever question is converting, or whatever question
you're losing the AI citation on. That feedback loop is the whole game.

## Never commit secrets

API keys, webhook URLs, and sheet IDs go in `.env.local` (gitignored), never in
code or docs. The repo ships `.env.example` with placeholders only.
