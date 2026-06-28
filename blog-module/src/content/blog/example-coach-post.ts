import type { BlogPost } from "@/lib/blog";

/**
 * EXAMPLE POST #2 — a different category, and it demonstrates two more blocks:
 * `scriptCard` (before/after with highlighted fill-ins) and `emailCapture`
 * (an inline lead form). Both render with zero assets, so this whole post
 * works on a fresh clone with nothing wired up.
 */
export const exampleCoachPost: BlogPost = {
  slug: "repurposing-system-one-podcast-twenty-pieces",
  title: "The Repurposing System: One Podcast, Twenty Pieces",
  metaTitle: "Turn One Podcast Into Twenty Posts",
  description:
    "A repeatable system for turning a single long recording into twenty pieces of short content without sounding like a robot or repeating yourself.",
  dek: "You already record the long thing. The waste is everything you don't cut out of it. Here's the system for turning one recording into twenty pieces that each stand on their own.",
  datePublished: "2026-02-03",
  category: "Coaches & Creators",
  bridgeSlug: "work-with-us",
  faqs: [
    {
      question: "Won't repurposing make my content repetitive?",
      answer:
        "Only if you clip the same idea twice. Done right, each piece carries one distinct idea from the recording, so a viewer who sees three of them learns three things instead of hearing the same line three ways.",
    },
    {
      question: "How many pieces can I realistically get from one recording?",
      answer:
        "A focused 45-minute conversation usually holds 8 to 12 strong standalone moments and a dozen smaller text pieces. Twenty is a normal yield once you stop hunting for perfect and start cutting for one clear idea per piece.",
    },
    {
      question: "Do I need to record differently for this to work?",
      answer:
        "It helps to make one clear point per answer instead of rambling, but you don't need to change your style. Most of the work is in the selection and the edit, not the recording.",
    },
  ],
  blocks: [
    { type: "lead", text: "You spend an hour recording. Then you post one clip and let the other fifty-nine minutes die on a hard drive." },
    { type: "p", text: "The expensive part already happened. You showed up, you thought out loud, you said something worth hearing. The cheap part, cutting it into pieces people can actually find, is the part most people skip." },
    { type: "callout", text: "Don't make more content. Get more out of the content you already made." },

    { type: "h2", text: "Step 1: Pull the standalone moments first" },
    { type: "p", text: "Before any editing, mark every spot where you made one clear point that survives without the question before it. Those are your clips. If a moment needs three minutes of setup to land, it isn't one." },

    { type: "h2", text: "Step 2: Give each piece one idea" },
    { type: "p", text: "A clip with one idea travels. A clip with three ideas confuses. When you find a rich moment with several points stacked together, that's not one clip, it's three." },

    { type: "h2", text: "Step 3: Write the hook last, from the payoff" },
    { type: "p", text: "Cut the moment first, then write the opening line to promise exactly what the moment delivers. Here's the before-and-after on a weak hook:" },
    { type: "scriptCard", label: "Before (vague) → after (specific)", lines: [
      "Before: In this clip I talk about [topic].",
      "After: The [number]-minute habit that [specific outcome] without [the thing they dread].",
      "(Same clip. The second one tells the viewer what they get for staying.)",
    ] },

    { type: "h2", text: "Step 4: Distribute on a schedule, not on a mood" },
    { type: "p", text: "Twenty pieces from one recording is only an advantage if they go out steadily. A queue beats willpower. Load them, schedule them, and the recording keeps paying you for weeks." },

    { type: "emailCapture", heading: "Want the full repurposing checklist?", body: "Drop your email and we'll send the step-by-step we use to turn one recording into a month of content.", buttonLabel: "Email it to me", resource: "Repurposing Checklist", accent: "brand" },

    { type: "takeaways", heading: "The short version", items: [
      "Mark standalone moments before you edit anything.",
      "One idea per piece. Split rich moments into several.",
      "Write the hook last, straight from the payoff.",
      "Queue and schedule so output never depends on your mood.",
    ] },

    { type: "bookingCta", heading: "Rather have this run for you?", body: "We take a single recording and hand back a month of ready-to-post content. Book a call and we'll show you the workflow.", buttonLabel: "Book a call" },

    { type: "related", heading: "Keep reading", links: [
      { href: "/blog/founder-videos-views-no-leads", label: "Why most founder videos get views and no leads" },
    ] },
  ],
};
