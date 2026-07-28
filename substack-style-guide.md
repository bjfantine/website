# Making bjfantine.substack.com match bjfantine.com

I looked at your live Substack (currently the default "BJ Publication" template,
no posts yet) without logging in — I don't have your credentials and won't ask
for them. Here's what that inspection found, and what to do with it.

## The constraint that shapes everything below

Substack's page is a versioned React app. Most of its CSS classes are
machine-generated and change on every redeploy (e.g. `buttonBase-GK1x3M`,
`balancedText-oQ__Kv`). A handful of plain, human-readable classes are clearly
meant as stable hooks for exactly this kind of customization — `.publication-name`,
`.subscribe-btn`, `.body`, `.available-content`. Custom CSS built on the stable
ones will hold up; anything built on the hashed ones can silently stop working
after Substack's next release.

So: **do the native Settings → Design changes first** — those are guaranteed
stable because Substack maintains them. Treat the Custom CSS block as a
supplementary layer for the details the native settings can't reach.

## 1. Settings → Design (do this first)

| Setting | Value |
|---|---|
| Accent color | `#EA6425` — this is the exact orange used site-wide on bjfantine.com. Substack's own default orange (`#FF6719`) is close but not identical; setting this locks the two together. |
| Publication name | `B.J. Fantine` (replace the default "BJ Publication") |
| Subtitle | Your byline — e.g. "Fiction with a body count and a punchline." |
| Logo / icon | A simple mark in the same language as the site favicon: an ink-black square with a cream arch (tombstone/nib shape) and a small orange bar underneath. Reuse [`public/favicon.svg`](public/favicon.svg) as the source. |
| Cover photo | Optional — if you use one, keep it in the cream/ink/orange palette rather than a stock photo, to avoid clashing with the rest. |
| Font pairing | Substack's font list is a closed set (not open to arbitrary Google Fonts), so I can't hand you an exact match without seeing your current picker options. Two things to check for: your body font is *already* set to **Spectral**, which is a good literary serif — no change needed there. For the heading/post-title font, pick whichever option in your list reads most like a bold book-jacket serif; avoid anything in the "clean tech sans" family, which is the opposite of what the main site is going for. |

## 2. Custom CSS (Settings → Design → Custom CSS, if your plan has it)

This uses only the classes above that look stable. Paste it, then reload the
public page and check it actually applied — if a rule does nothing, Substack's
markup for that element has likely changed and the selector needs updating.

```css
/* === B.J. Fantine — cohesion pass with bjfantine.com === */

:root {
  --site-ink: #15130f;
  --site-paper: #f3ecd9;
  --site-flame: #ea6425;
  --site-flame-dark: #b84a16;
}

/* Publication name in the nav bar */
.publication-name {
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* Subscribe button and other primary CTAs */
.subscribe-btn,
.primary {
  background-color: var(--site-flame) !important;
  border-color: var(--site-flame) !important;
  border-radius: 4px !important;
}

/* Post body: darker, warmer link color than Substack's stock orange
   (better contrast for body text than the brighter --site-flame) */
.body a,
.available-content a {
  color: var(--site-flame-dark);
}

/* Blockquotes inside posts — echoes the pull-quote styling used on the site */
.body blockquote,
.available-content blockquote {
  border-left: 3px solid var(--site-flame);
  padding-left: 1.25rem;
  font-style: italic;
  color: var(--site-ink);
}

/* Horizontal rules inside posts */
.body hr,
.available-content hr {
  border: none;
  border-top: 3px solid var(--site-ink);
}
```

## 3. What I couldn't check

- Your publication has no posts yet, so I couldn't inspect the actual article
  template (post title, byline, body wrapper) — only the homepage and About
  page. The `.body` / `.available-content` selectors above are Substack's
  commonly documented convention, but confirm them once you've published
  something. If a rule doesn't apply, send me a screenshot of the post and
  I'll adjust the selector.
- I couldn't see your Settings → Design panel itself (requires your login),
  so I can't confirm exactly which fonts are currently offered there.

## If you'd rather I apply this directly

I can't log into Substack on your behalf — I don't handle passwords or
account credentials. If you're already logged into Substack in your own
Chrome browser, I can drive that session with you step-by-step instead of
you pasting things in yourself. Otherwise, the table and CSS block above are
everything you need to do it in about five minutes.
