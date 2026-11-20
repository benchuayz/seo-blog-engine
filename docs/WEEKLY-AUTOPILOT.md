# Weekly autopilot: 5 posts a week, published and indexed

Once the site is live and indexed, the engine can run itself. Every week it picks 5 topics,
writes 5 posts in your voice, publishes them, tells the search engines, checks last week's
posts got indexed, and sends you a short report.

The run is one command: `/seo-blog-engine weekly`. This page explains what it does and how
to schedule it.

## Before you switch it on

- The site is live, `npm run build` passes, and Search Console + IndexNow are set up
  (`docs/INDEXING.md`).
- `blog-engine.config.md` has a real proof bank and voice samples. Autopilot only uses what's
  in there. A thin config gives thin posts.
- `content/topic-backlog.md` has at least 15 approved topics (`docs/RESEARCH.md`).
- You've done one run by hand and liked the result.

## What one run does

1. **Check last week.** `inspect` every URL published in the last 30 days. Log the status.
   Anything not indexed after 7 days gets diagnosed by its reason (`docs/INDEXING.md`) and
   fixed or flagged.
2. **Pick 5 topics.** From the top of the backlog, plus `report` output once there's search
   data (queries ranking 8 to 30 come first). Skip anything whose keyword is already in
   `content/PUBLISHING-LOG.md`. Prefer finishing a cluster over starting a new one.
3. **Write 5 posts** with the `cook` steps, skipping the outline approval. Each one must pass
   the gates below or it's dropped from this run.
4. **Link them in.** Add each new post to its pillar's link list and to one older related
   post or buyer page. A new post nothing links to won't get indexed.
5. **Build.** `npm run build` must pass.
6. **Publish.** Commit and push. In `pr` mode, open a pull request and stop here; the rest
   runs after you merge. In `direct` mode, push to the main branch and the host deploys.
7. **Confirm live.** Each new URL returns 200 and shows the post title. Wait for the deploy;
   don't ping search engines about a 404.
8. **Tell the search engines.** `indexnow` for all new URLs. If a browser is available and
   signed in to Search Console, request indexing for the 5 new URLs. Otherwise list them in
   the report.
9. **Log and report.** Append to `content/PUBLISHING-LOG.md` and send a 10-line summary:
   what was published, what got indexed, what needs attention, what's next in the backlog.

## Quality gates (any fail = the post doesn't ship)

- Every number and client name is in the proof bank.
- Zero hits on the banned list in `docs/VOICE-AND-AI-SLOP.md` (search for the em dash
  character too).
- Primary keyword is unique on the site.
- Answers the question in the first paragraph.
- 4 to 6 FAQs, identical in the page and in the schema.
- Links to the offer page and at least two other pages.
- At least 1,000 words of real substance. No padding to get there.

If fewer than 5 posts pass, publish the ones that do and say why the others didn't.

## Pick where it runs

You need something that runs a prompt on a schedule, with access to the repo and the ability
to push. Pick one.

### A. Claude desktop app: scheduled task (easiest, runs on your computer)

In the Claude app, Code tab, create a scheduled task:

- **Folder:** your site's repo
- **When:** weekly, e.g. Monday 9am
- **Prompt:** `/seo-blog-engine weekly`

It runs with your logins, so it can also click "Request indexing" in Search Console through
the browser. Your computer has to be on.

### B. Claude Code cloud schedule (runs without your computer)

In Claude Code: `/schedule`, then describe it: "every Monday at 9am, run
/seo-blog-engine weekly in this repo." Manage it at claude.ai/code. Add `GSC_SA_JSON`
contents and `INDEXNOW_KEY` as secrets in the cloud environment if you want the indexing
steps to run there. Without them it still writes, publishes and reports.

### C. GitHub Actions (runs in your repo, any plan with an API key)

Copy `templates/weekly-posts.yml` to `.github/workflows/weekly-posts.yml` in your site's
repo. Add repository secrets: `ANTHROPIC_API_KEY`, and optionally `GSC_SA_JSON` (the file's
full contents) and `INDEXNOW_KEY`. It opens a pull request each week by default.

### D. Cron + headless CLI (any machine)

Claude Code:

```bash
# crontab -e   (Mondays 09:00)
0 9 * * 1 cd /path/to/site && claude -p "/seo-blog-engine weekly" --permission-mode acceptEdits --allowedTools "Bash(npm run build)" "Bash(git *)" "Bash(gh pr *)" "Bash(node *scripts/seo.mjs*)" "WebSearch" "WebFetch" >> .seo-weekly.log 2>&1
```

Codex:

```bash
0 9 * * 1 cd /path/to/site && codex exec --sandbox workspace-write "Follow skill/seo-blog-engine/SKILL.md, command: weekly" >> .seo-weekly.log 2>&1
```

Allow-list the exact commands it needs rather than turning permission checks off.

## Direct or pull request?

Start with `pr` for two weeks. Read the posts. Once you'd have merged them unchanged, switch
`publish_mode` to `direct` in `blog-engine.config.md`. You can switch back any time.

## Turning it down

Fewer posts: change `posts_per_week` in the config. Pause: disable the schedule. The backlog
and log stay where they are, so it picks up where it left off.
