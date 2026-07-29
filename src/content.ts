/**
 * ────────────────────────────────────────────────────────────────
 * EDIT ME
 * Every string in this file is placeholder content. Replace it with
 * the real thing — name, byline, bio, Substack URL, and the actual
 * scraps that belong in The Graveyard. Nothing elsewhere in the app
 * needs to change; the pages just render whatever's in here.
 * ────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "B.J. Fantine",
  initials: "BJF",
  byline: "Fiction with a body count and a punchline.",
  role: "Author",
  substackUrl: "https://bjfantine.substack.com",
  email: "bj@bjfantine.com",
  blueskyUrl: "https://bsky.app/profile/bjfantine.bsky.social",
  instagramUrl: "https://www.instagram.com/bjfantine/",
  // Replace with a real photo (jpg/png/webp all fine) — keep this path,
  // or update it here if you rename the file.
  photo: "/author-photo.svg",
};

export const bio = {
  paragraphs: [
    `${site.name} writes fiction the way other people set off fireworks in a parking lot — with enthusiasm, a little too close to the car, and no real plan for the aftermath. Work has appeared in places that pay in exposure and places that pay in actual money, sometimes even the same year.`,
    `A former [placeholder job — replace with something true and slightly absurd] and a current owner of too many notebooks, ${site.name.split(" ")[0]} writes about grief, bureaucracy, and the specific indignity of being a person, usually all in the same paragraph. The work has been called "unsettling," "very funny," and "unsettling because it's very funny," which feels about right.`,
    `${site.name.split(" ")[0]} lives [placeholder city], with [placeholder pet/plant/roommate], and is currently working on a novel that keeps changing its mind about what it wants to be. There is a Graveyard for the ideas that didn't make it. Visitors are welcome, but they have to sign something first.`,
  ],
};

export type HeroQuote = {
  text: string;
  author: string;
  source: string;
};

// A working writer's shelf, not a highlight reel — pulled from Quotes.rtf.
// The Vuong line is the one worth building a homepage around; the rest
// round it out with some humor and some heart.
export const heroQuotes: HeroQuote[] = [
  {
    text: "You once asked me what it means to be a writer. So here goes.",
    author: "Ocean Vuong",
    source: "On Earth We're Briefly Gorgeous",
  },
  {
    text: "Everything was beautiful and nothing hurt.",
    author: "Kurt Vonnegut",
    source: "Slaughterhouse-Five",
  },
  {
    text: "The robbing of a hot dog vendor is a symbolic act.",
    author: "John Kennedy Toole",
    source: "A Confederacy of Dunces",
  },
  {
    text: "The most pressing questions are naive ones.",
    author: "Wisława Szymborska",
    source: "The People on the Bridge",
  },
  {
    text: "This is exactly when you want to look good. When you making trouble.",
    author: "Maurice Carlos Ruffin",
    source: "The Ones Who Don't Say They Love You",
  },
  {
    text: "We've achieved something.",
    author: "James Roberts",
    source: "Transformers: More Than Meets the Eye #41",
  },
];

export type Fragment = {
  id: string;
  title: string;
  years: string;
  causeOfDeath: string;
  epitaph: string;
  excerpt: string;
};

export const graveyardIntro = {
  title: "The Graveyard",
  subtitle: "Where the good lines went to not quite make it.",
  body: "Everything buried here is unfinished on purpose and by accident, in roughly equal measure. Some of it might come back. Most of it won't. Read with a shovel, not a highlighter.",
};

// Replace these with your own abandoned drafts, cut lines, and
// paragraphs that never found their story. Keep — or don't — the
// tombstone conceit (title / years / cause of death / epitaph).
export const fragments: Fragment[] = [
  {
    id: "the-understudy",
    title: "The Understudy",
    years: "2021–2022",
    causeOfDeath: "Died of a third act that refused to show up",
    epitaph: "She was always ready. That was the problem.",
    excerpt:
      "By the ninth week of rehearsal, Marguerite had stopped waiting for the lead to break her ankle and started, quietly, hoping for something worse. Not fatal. Just inconvenient. A wrist. A nervous breakdown with a full recovery timeline of exactly one Tuesday matinee.",
  },
  {
    id: "instructions-for-drowning",
    title: "Instructions for Drowning (Politely)",
    years: "2023",
    causeOfDeath: "Died of trying too hard to be a metaphor",
    epitaph: "It went down easier than expected.",
    excerpt:
      "The trick, my grandmother said, is to apologize on the way down. Not to the water — the water doesn't care — but to whoever's on the shore, so they don't feel responsible for standing there, watching, doing the polite thing, which is nothing.",
  },
  {
    id: "concerning-the-neighbors-dog",
    title: "Concerning the Neighbor's Dog",
    years: "2020",
    causeOfDeath: "Died laughing, then died again of overwriting",
    epitaph: "He knew something. He wasn't telling.",
    excerpt:
      "The dog had the look of a witness who'd already been paid off. I'd wave, he'd stare, and somewhere behind that stare was the absolute certainty that he had seen what happened in 4B and had decided, dog-brained and merciful, to take it to his grave.",
  },
  {
    id: "the-last-good-year",
    title: "The Last Good Year",
    years: "2022–2024",
    causeOfDeath: "Died of being three different novels wearing a trench coat",
    epitaph: "It meant well. They all do.",
    excerpt:
      "Nobody tells you the last good year announces itself only in hindsight, usually while you're doing something humiliating, like crying in a Costco because the samples remind you of someone. That was mine. Free mozzarella stick. Total collapse.",
  },
  {
    id: "an-apology-in-advance",
    title: "An Apology, In Advance",
    years: "2024",
    causeOfDeath: "Died of not knowing who it was for",
    epitaph: "Sorry. In advance. You'll see why.",
    excerpt:
      "I'm writing this before I do the thing, not after, because after I won't be able to explain it without sounding like I'm asking for something. I'm not asking. I'm just telling you first, so it's not a surprise, so it's just a fact you already had.",
  },
  {
    id: "field-notes-on-leaving",
    title: "Field Notes on Leaving",
    years: "2023",
    causeOfDeath: "Died of arriving nowhere, on purpose",
    epitaph: "Packed light. Left heavier.",
    excerpt:
      "Every guide to leaving assumes you know what you're leaving. I only ever knew what I was leaving toward — a version of a kitchen, a version of quiet — and it turns out that's not a destination, it's a rumor you tell yourself at 2 a.m. in a rental car.",
  },
];
