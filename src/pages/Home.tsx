import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import IntroSequence from "../components/IntroSequence";
import { heroQuotes, site } from "../content";
import "./Home.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const QUOTE_INTERVAL_MS = 7000;

type Props = {
  introDone: boolean;
  onIntroComplete: () => void;
};

export default function Home({ introDone, onIntroComplete }: Props) {
  const [introVisible, setIntroVisible] = useState(!introDone);
  const skippedIntro = introDone;
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((index) => (index + 1) % heroQuotes.length);
    }, QUOTE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const quote = heroQuotes[quoteIndex];

  return (
    <div className="home">
      {introVisible && (
        <IntroSequence
          onComplete={() => {
            setIntroVisible(false);
            onIntroComplete();
          }}
        />
      )}

      <motion.section
        className="hero"
        initial={skippedIntro ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: introVisible ? 0 : 1, y: introVisible ? 28 : 0 }}
        transition={{ duration: 0.85, ease: EASE }}
        style={{ pointerEvents: introVisible ? "none" : "auto" }}
      >
        <div className="container hero__inner">
          <p className="hero__kicker">Novelist</p>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quoteIndex}
              className="hero__quote"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="hero__quote-text">&ldquo;{quote.text}&rdquo;</p>
              <footer className="hero__quote-attr">
                {quote.author}, <cite>{quote.source}</cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <p className="hero__lede">{site.byline}</p>
          <div className="hero__actions">
            <Link to="/bio" className="btn btn-solid">
              Read the Bio
            </Link>
            <a
              href={site.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Latest on Substack ↗
            </a>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="teasers"
        initial={skippedIntro ? false : { opacity: 0 }}
        animate={{ opacity: introVisible ? 0 : 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        style={{ pointerEvents: introVisible ? "none" : "auto" }}
      >
        <div className="container teasers__grid">
          <Link to="/bio" className="teaser-card">
            <span className="teaser-card__index">01</span>
            <h2 className="teaser-card__title">Bio</h2>
            <p className="teaser-card__copy">
              Background, credits, and the occasional necessary fact.
            </p>
            <span className="teaser-card__cta">Read more →</span>
          </Link>

          <Link to="/selected-work" className="teaser-card">
            <span className="teaser-card__index">02</span>
            <h2 className="teaser-card__title">Selected Work</h2>
            <p className="teaser-card__copy">
              Longer work, gathered in one place. Coming soon.
            </p>
            <span className="teaser-card__cta">Take a look →</span>
          </Link>

          <a
            href={site.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="teaser-card"
          >
            <span className="teaser-card__index">03</span>
            <h2 className="teaser-card__title">Substack</h2>
            <p className="teaser-card__copy">
              Essays and new work, sent out as they're finished.
            </p>
            <span className="teaser-card__cta">Subscribe ↗</span>
          </a>

          <Link to="/graveyard" className="teaser-card teaser-card--grave">
            <span className="teaser-card__index">04</span>
            <h2 className="teaser-card__title">The Graveyard</h2>
            <p className="teaser-card__copy">
              Unfinished drafts and cut lines, kept and credited.
            </p>
            <span className="teaser-card__cta">Visit the graveyard →</span>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
