# Visuals and embeds

A wall of text loses readers by the third heading, and a reader who leaves fast tells Google
the page wasn't worth it. Every post this engine ships has at least one visual that helps the
reader *understand*, not decoration. And wherever a post talks about a video or a social
post, the reader sees it right there on the page.

## The rule

- **At least one comprehension visual per post.** An infographic, a diagram, a before/after,
  a screenshot of real results. A video embed alone doesn't count.
- **2 or 3 visuals max.** Each one sits in the section it explains.
- **Embed what you discuss.** Mention a YouTube video, a Reel, a TikTok, a LinkedIn post?
  Embed it at that point in the post. Telling people a video got 400K views is weak. Showing
  them the video is proof.
- **Every number on a visual comes from the post.** Never decorate with made-up stats.

## Making infographics from the post text

The agent writes the post first, then reads it back and asks: which section would a reader
understand faster as a picture? Then it matches the shape of the idea to a layout:

| The section is a... | Draw it as |
|---|---|
| numbered framework or steps | columns, one per step, numbered (`templates/infographic.html`) |
| process over time | a timeline with markers |
| set of results or stats | big-number cells, each with a two-line explainer |
| comparison (X vs Y, before/after) | two columns or a split bar, the winner in the accent colour |
| breakdown of a whole | a proportional bar, one segment highlighted |

How it's made:

1. Copy `templates/infographic.html`, swap in the text from the post, set `--accent` to the
   brand colour from `site.config.ts`.
2. Render at 2x:
   ```bash
   # macOS with Chrome
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
     --hide-scrollbars --force-device-scale-factor=2 --window-size=1600,900 \
     --screenshot="$PWD/out.png" infographic.html
   # anywhere with Node
   npx playwright screenshot --viewport-size="1600,900" --device-scale-factor=2 infographic.html out.png
   ```
3. Convert to JPEG or WebP and keep it under ~200KB. Save as
   `public/images/<post-slug>-<what-it-shows>.jpg`.
4. Look at the render before using it. Text cut off, overlapping, low contrast, or a number
   that isn't in the post means fix it and render again.
5. Add it to the post:
   ```ts
   { type: "image", src: "/images/<slug>-framework.jpg", alt: "Four steps: ...", width: 1600, height: 900, caption: "One line." }
   ```
   The `alt` text describes what the graphic says, in words. Google and screen readers read it.

Design rules that keep it looking expensive: dark background (or the site's own), one accent
colour used on one idea per graphic, big bold title ending in a period, lots of empty space,
short declarative copy, no em dashes. If the site has a light brand, flip the palette and keep
the rest.

Have an image model (DALL-E, Midjourney, Gemini, Higgsfield) and want a hero image? Fine for
mood, never for anything with numbers or text in it. Charts and frameworks are rendered from
HTML so every word is exact.

## Embedding your own content (why setup asks for your profiles)

During `setup`, the engine asks for your public profiles:

- YouTube channel
- Instagram, TikTok
- LinkedIn, X/Twitter
- podcast (Spotify / Apple link), newsletter

It does three things with them:

1. **Embeds your content in posts.** When a post covers a topic you've already made a video
   or post about, the agent finds it and embeds it. Your blog sends viewers to your channels,
   and your videos give the post proof and watch time.
2. **Writes posts from your content.** Your best videos and podcasts are post ideas that are
   already validated. The agent can turn a transcript into a post that embeds the original.
3. **Connects your identity.** Your profiles go into the author schema (`sameAs`), which tells
   Google and AI assistants that the person on the blog is the same person on YouTube and
   LinkedIn. That's how authority builds up across platforms.

Ask for the profile URLs only. Never a password.

Embed blocks:

```ts
{ type: "youtube", videoId: "dQw4w9WgXcQ", title: "...", uploadDate: "2026-01-10", durationSeconds: 512 } // emits VideoObject schema
{ type: "youtube", videoId: "...", vertical: true }                    // Shorts
{ type: "instagram", url: "https://www.instagram.com/reel/XXXX/" }
{ type: "tiktok", videoId: "7300000000000000000" }
{ type: "video", src: "/videos/clip.mp4", originalUrl: "https://...", originalLabel: "Original on Instagram" }
{ type: "linkcard", href: "https://www.linkedin.com/posts/...", source: "LinkedIn", title: "..." } // anything without an embed
```

Embedding someone else's video (a famous example you're breaking down) is fine with the
platform's own embed. Credit them by name in the caption. Don't download and re-host other
people's videos.
