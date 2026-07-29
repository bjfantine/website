/**
 * ────────────────────────────────────────────────────────────────
 * EDIT ME
 * Every string in this file is placeholder content. Replace it with
 * the real thing — name, byline, about copy, Substack URL, and the actual
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
  blueskyUrl: "https://bsky.app/profile/bjfantine.bsky.social",
  instagramUrl: "https://www.instagram.com/bjfantine/",
  photo: "/headshot_retouched.jpg",
  // Get a free access key at https://web3forms.com (just enter the inbox
  // email you want messages forwarded to — no account/password needed)
  // and paste it here. Until then the contact form will show an error.
  web3formsAccessKey: "c76162a3-a9bd-48d0-b947-64459fad16e0",
};

export const about = {
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

// The writer's own shelf — pulled from Quotes.rtf. The Vuong line is the
// one bolded in the source and the one worth building a homepage around;
// the rest are the mix of company worth being seen keeping.
export const heroQuotes: HeroQuote[] = [
  {
    text: "You once asked me what it means to be a writer. So here goes.",
    author: "Ocean Vuong",
    source: "On Earth We're Briefly Gorgeous",
  },
  {
    text: "The world is always someone else's.",
    author: "Clarice Lispector",
    source: "A Breath of Life",
  },
  {
    text: "It’s a common belief that something exists when it’s part of a narrative.",
    author: "Kathy Acker",
    source: "Great Expectations"
  },
  {
    text: "The robbing of a hot dog vendor is a symbolic act.",
    author: "John Kennedy Toole",
    source: "A Confederacy of Dunces",
  },
  {
    text: "There's times in your childhood / you could really do with a drink.",
    author: "Sasha Debevec-McKenney",
    source: "Joy is My Middle Name",
  },
  {
    text: "Everything alive / is listening.",
    author: "Robyn Schiff",
    source: "A Woman of Property",
  },
  {
    text: "We were all now old enough, ripened enough with wear and love, not to need to lighten every little bit of pain.",
    author: "Allan Gurganus",
    source: "Plays Well With Others",
  },
  {
    text: "Narratives in which one thing follows from the previous thing are usually imaginary.",
    author: "Sarah Manguso",
    source: "The Two Kinds of Decay",
  },
  {
    text: "The shards of storytelling are not always sharp.",
    author: "Beth Nguyen",
    source: "Owner of a Lonely Heart",
  },
  {
    text: "The most pressing questions are naive ones.",
    author: "Wisława Szymborska",
    source: "The People on the Bridge",
  },
  {
    text: "Nothing good can come out of a conversation in-line at the pharmacy.",
    author: "Anne Elizabeth Moore",
    source: "Gentrifier",
  },
  {
    text: "When we breathe, it takes us apart.",
    author: "Dennis Cooper",
    source: "The Tenderness of the Wolves",
  },
  {
    text: "Everything was beautiful and nothing hurt.",
    author: "Kurt Vonnegut",
    source: "Slaughterhouse-Five",
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
