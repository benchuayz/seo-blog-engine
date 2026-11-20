# Getting indexed

A page that isn't indexed can't rank. This is the step most people skip, and it's why
good blogs sit at zero traffic for months. Do all of it once at launch, then the weekly
run keeps it going.

What you'll set up:

1. Google Search Console, verified for the whole domain
2. Your sitemap submitted
3. A service account so the agent can check index status itself
4. IndexNow, so Bing (and the AI assistants that use Bing) hear about new posts instantly
5. Bing Webmaster Tools
6. Manual "Request indexing" for your most important pages

## 1. Verify the domain in Search Console

Go to [search.google.com/search-console](https://search.google.com/search-console), sign
in with the Google account the business will keep, **Add property → Domain** (not URL
prefix), enter `yourdomain.com`.

Google gives you a TXT record like `google-site-verification=abc123`. Add it at your DNS
provider (wherever your nameservers point: Vercel, Cloudflare, GoDaddy, Namecheap...):

| Type | Name / Host | Value |
|---|---|---|
| TXT | `@` (or blank) | `google-site-verification=abc123` |

Click Verify. It can take a few minutes up to an hour. A Domain property covers `www`, bare,
`http` and `https` in one go, so you never wonder which one Google is looking at. Once
verified, there's no need for a verification tag on the site.

Agent: if you have CLI or API access to the DNS provider, add the record yourself. If not,
give the person the exact row above and wait.

## 2. Submit the sitemap

In Search Console: **Sitemaps → Add a new sitemap →** `sitemap.xml` → Submit. You only do
this once. Google re-reads it on its own after that, and new posts appear in it
automatically.

- **"Couldn't fetch"** right after submitting is normal. Check again the next day.
- **Still "Couldn't fetch" after 3+ days** while the URL opens fine in a browser: submit the
  same sitemap at a second path. The blog module can serve one by copying
  `src/app/sitemap.ts` to a route like `src/app/sitemap-main.xml/route.ts`. We had a
  sitemap stuck on "Couldn't fetch" for weeks; the alternate path was fetched within minutes.
  Don't keep resubmitting the stuck one.

## 3. Service account (lets the agent check indexing without a browser)

One-time, about 10 minutes:

1. [console.cloud.google.com](https://console.cloud.google.com) → create a project (any
   name).
2. **APIs & Services → Library →** enable **Google Search Console API**.
3. **IAM & Admin → Service Accounts → Create**. No roles needed. Open it → **Keys → Add key →
   JSON**. A file downloads.
4. Move the file somewhere outside the repo and lock it down:
   ```bash
   mkdir -p ~/.config/seo-engine && mv ~/Downloads/*.json ~/.config/seo-engine/gsc-sa.json
   chmod 600 ~/.config/seo-engine/gsc-sa.json
   ```
5. In Search Console: **Settings → Users and permissions → Add user**, paste the service
   account's email (`...@...iam.gserviceaccount.com`), permission **Full**.
6. Add to `.env.local`:
   ```bash
   SITE_URL=https://www.yourdomain.com
   GSC_SITE=sc-domain:yourdomain.com
   GSC_SA_JSON=/Users/you/.config/seo-engine/gsc-sa.json
   ```

Test it:

```bash
node --env-file=.env.local scripts/seo.mjs inspect https://www.yourdomain.com/
```

Commands:

| Command | What it does |
|---|---|
| `inspect <url...>` | Indexed or not, and Google's reason. 2,000 checks a day. |
| `report [days]` | Top pages, pages that need a better title, queries worth a new post. |
| `sitemap` | Submits the sitemap by API. Needs owner-level access; if it returns 403, submit by hand in step 2 (you only need to once). |

## 4. IndexNow (Bing, Yandex and friends)

IndexNow tells Bing and the other participating engines about a new URL the moment you
publish it. Google doesn't use it, but Bing's index feeds a lot of AI search, so this
matters for getting cited.

```bash
node scripts/seo.mjs indexnow-key            # writes blog-module/public/<key>.txt, prints the key
# add INDEXNOW_KEY=<key> to .env.local, deploy, then:
node --env-file=.env.local scripts/seo.mjs indexnow https://www.yourdomain.com/blog/new-post
```

The key file must be live at `https://www.yourdomain.com/<key>.txt` before pinging. Not on
the blog module? Put the `<key>.txt` file in your site's public root: `indexnow-key <dir>`.

## 5. Bing Webmaster Tools

[bing.com/webmasters](https://www.bing.com/webmasters) → sign in → **Import from Google
Search Console**. One click, it copies the site and sitemap over.

## 6. Request indexing (the button with no API)

Google has no API to request indexing for normal pages (the "Indexing API" is only for job
postings and livestreams; don't use it for blog posts). The button lives in the Search
Console UI:

1. Paste the full URL in the search bar at the top of Search Console.
2. Wait for the inspection (up to a minute).
3. Click **Request indexing**. Wait for "Indexing requested".

Google allows roughly 10 of these a day. Spend them on: the homepage, the offer page, buyer
pages, then the newest posts. Don't re-request a URL that's already queued.

Agent: if you have a browser tool and the person is signed in to Search Console, do this
for them. Otherwise list the URLs for them to paste. Either way, the sitemap and internal
links get pages found eventually; the button only makes it faster.

## Reading Google's reason (fix by the reason, never guess)

Run `inspect` on any page that isn't indexed after a week and match the coverage state:

| Search Console says | What it means | Fix |
|---|---|---|
| URL is unknown to Google | Never found | Link to it from the nav, homepage or an indexed post. Check it's in the sitemap. Request indexing. |
| Discovered, currently not indexed | Found, not worth crawling yet | More internal links in, ideally from pages that already rank. Earn an external link. Be patient on a new domain. |
| Crawled, currently not indexed | Read it, didn't think it was worth keeping | Make it more useful and more specific: real examples, proof, a clearer answer up top. Merge it if it overlaps another post. |
| Duplicate, Google chose different canonical | Two URLs look like the same page | Fix the www/bare split or near-duplicate posts. Canonical tags must point at the one URL you want. |
| Excluded by noindex tag | You told it not to | Remove the noindex. |
| Page with redirect / Not found (404) | The URL in the sitemap isn't the real page | Fix the sitemap or the link. |
| Alternate page with proper canonical | Working as intended | Nothing. |

"Referring page: None detected" in the inspection means the page is orphaned. That was the
root cause on our own site. See `docs/SITE-STRUCTURE.md`.

## What to expect

- **Week 1 to 2:** homepage and main pages indexed. A few impressions, mostly your brand name.
- **Week 3 to 6:** posts start getting impressions on page 2 and 3 of Google. Clicks are rare.
  This is normal. Keep publishing.
- **Week 6 to 12:** some posts reach page 1 for long, specific questions. First clicks and the
  first leads from search.

The bottleneck after that is links from other sites. Directory listings for your industry,
podcast guest appearances (show notes link back), guest posts, and getting listed on
"best X for Y" roundups. One real link from a relevant site is worth more than ten posts.

## Track it

Once a week, compare against last week: how many pages are indexed (Search Console → Pages),
total impressions, and which queries are new. The weekly autopilot logs this in
`content/PUBLISHING-LOG.md`.
