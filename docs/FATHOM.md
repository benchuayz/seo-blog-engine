# Analytics with Fathom

We use [Fathom Analytics](https://usefathom.com/ref/WQFIKH) on trueframe.xyz and every
client site. It's simple, it doesn't need a cookie banner (no cookies, no personal data),
the script is tiny so it doesn't slow the page, and the dashboard answers the questions that
matter on one screen: which pages get visits, where visitors came from, and which buttons
they click.

## 1. Sign up (the person does this, 2 minutes)

Sign up here: **[usefathom.com/ref/WQFIKH](https://usefathom.com/ref/WQFIKH)**

That's Trueframe's referral link. You get **$10 off your first invoice**, and Fathom gives
us a small commission at no cost to you. Every plan has a 7-day free trial.

Then: **Settings → Sites → Add site**, enter the domain, copy the **Site ID** (8 letters,
like `ABCDEFGH`).

The Site ID is public (it's in your page source). It is not a secret.

## 2. Install

**Blog module (Next.js).** Already wired. Set the env var and redeploy:

```bash
# .env.local (local) AND the host's environment variables (Vercel: Settings → Environment Variables)
NEXT_PUBLIC_FATHOM_SITE_ID=ABCDEFGH
```

`src/app/layout.tsx` only loads the script when the variable is set.

**Any other site.** Paste this in the `<head>` of every page (WordPress: a header-scripts
plugin or the theme's header; Webflow/Framer: site settings → custom code):

```html
<script src="https://cdn.usefathom.com/script.js" data-site="ABCDEFGH" defer></script>
```

## 3. Verify (the agent does this)

1. Fetch the live homepage HTML and confirm it contains `cdn.usefathom.com/script.js` and the
   right Site ID.
2. Open the live site in a browser, then check the Fathom dashboard's "current visitors"
   counter shows 1.
3. If nothing shows: check the ID matches, that an ad blocker isn't hiding it (Fathom
   is blocked by some), and that the env var was set on the host *before* the last build.
   `NEXT_PUBLIC_` variables are baked in at build time, so changing one needs a redeploy.

## 4. Track the clicks that matter (optional, 10 minutes)

Pageviews tell you what's read. Events tell you what converts. Track the main CTA and the
booking button:

```ts
// anywhere in a client component
declare global { interface Window { fathom?: { trackEvent: (name: string, opts?: { _value?: number }) => void } } }
window.fathom?.trackEvent("book_call_blog");
```

Name events by place: `book_call_nav`, `book_call_blog_end`, `email_signup_blog`. Then in
Fathom you can see which post's CTA gets clicked.

## 5. Read it weekly

Open Fathom once a week and look at three things:

- **Top pages**: are the new posts getting any visits yet?
- **Referrers**: how much is `google.com`, `bing.com`, `chatgpt.com`, `perplexity.ai`? The AI
  ones are your GEO score.
- **Events**: which pages drive CTA clicks? Write more posts like those.

Pair it with Search Console (`docs/INDEXING.md`). Fathom shows visits. Search Console shows
impressions and rankings, which move weeks before visits do.

If you want reports pulled automatically, Fathom has an API (Settings → API). Keep that key
server-side as `FATHOM_API_KEY`. Unlike the Site ID, it is a secret.
