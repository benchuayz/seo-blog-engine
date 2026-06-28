import type { BlogPost } from "@/lib/blog";

/**
 * EXAMPLE POST #1 — the flagship shape.
 *
 * This is the structure the skill produces: lead hook, front-loaded proof,
 * a one-line callout thesis, numbered system sections that each handle an
 * objection, a mid-post CTA that bridges to your offer page, a takeaways
 * recap, and real buyer FAQs (which also become FAQPage schema).
 *
 * Replace the copy and the [illustrative numbers] with your own real proof.
 * Never ship a number you can't stand behind.
 */
export const exampleFounderPost: BlogPost = {
  slug: "founder-videos-views-no-leads",
  title: "Why Most Founder Videos Get Views and No Leads",
  metaTitle: "Founder Videos That Drive Leads",
  description:
    "Founder content that gets views but no leads has a targeting problem, not a production problem. Here's the system that fixes it.",
  dek: "Plenty of founder videos get watched. Far fewer move a single deal. The gap is almost never the camera. It's who the video was built for.",
  datePublished: "2026-01-15",
  category: "Founder Content",
  hookIdea: "Front-load the real problem (wrong audience), then give the system.",
  bridgeSlug: "work-with-us",
  faqs: [
    {
      question: "How long until founder content starts driving leads?",
      answer:
        "You'll usually see sharper, more consistent content inside 30 days. Lead impact tends to show up around month two to three, depending on your offer and sales cycle. Content compounds, so the curve gets steeper the longer it runs.",
    },
    {
      question: "Do I need a big audience for this to work?",
      answer:
        "No. A few hundred of the right viewers beats tens of thousands of the wrong ones. The whole point is to be found by the specific buyer who has the problem you solve, not to chase a follower count.",
    },
    {
      question: "How much of my time does this take?",
      answer:
        "Most founders we work with spend about 90 minutes a month on camera. The research, scripting, editing, and distribution sit with the team, so the engine keeps running on weeks you're slammed.",
    },
    {
      question: "What if I've tried content before and it flopped?",
      answer:
        "That's the normal starting point. Flops almost always trace back to making content for a general audience instead of one buyer with one problem. Fix the targeting and the same effort starts converting.",
    },
  ],
  blocks: [
    { type: "lead", text: "Most founders posting content run into the same wall. The videos get views. The views do nothing." },
    { type: "p", text: "You film something. It eats half a day. A few hundred people watch it. And the pipeline looks exactly the same on Friday as it did on Monday. So you slow down, then you stop, then you decide content doesn't work for a company like yours." },
    { type: "p", text: "The problem is rarely the production. It's that the video was built to be interesting to everyone instead of useful to one person: the buyer you actually want." },
    { type: "callout", text: "Same camera. Same founder. Different audience. That's usually the whole difference between content that decorates your feed and content that fills your calendar." },

    { type: "h2", text: "1. Decide what the video is for before you decide what it's about" },
    { type: "p", text: "Pick the one action you want a viewer to take after watching. Book a call. Join the list. Reply. Everything in the video bends toward that. A video with no job is a video that gets views and nothing else." },

    { type: "h2", text: "2. Make it for one buyer, not a category" },
    { type: "p", text: "\"Founders\" is not an audience. \"A bootstrapped SaaS founder stuck at 20 demos a month with no time to film\" is. Name the person. Use their words. The narrower the target, the more the right viewer feels like you read their mind." },

    { type: "h2", text: "3. Lead with the proof, not the backstory" },
    { type: "p", text: "Front-load the result you can point to, then explain how. Buyers decide whether to keep watching in the first few seconds, and a specific outcome earns that attention faster than a warm-up." },

    { type: "resource", href: "/work-with-us", eyebrow: "Free resource", title: "The founder content checklist", description: "The exact pre-publish checks we run so a video is built around a buyer's real problem instead of a feature list.", buttonLabel: "Get the checklist" },

    { type: "cta", heading: "", buttonLabel: "See how the done-for-you system works" },

    { type: "h2", text: "4. One clear next step, every time" },
    { type: "p", text: "End on the single action from step one. No menu of options. A confused viewer does nothing, and a video that asks for three things gets none of them." },

    { type: "takeaways", heading: "The short version", items: [
      "Give every video one job before you script it.",
      "Build it for one named buyer, not a whole category.",
      "Open with proof, then teach the how.",
      "Close on one clear next step and only one.",
    ] },

    { type: "related", heading: "Keep reading", links: [
      { href: "/blog/repurposing-system-one-podcast-twenty-pieces", label: "The repurposing system: one podcast, twenty pieces" },
    ] },
  ],
};
