import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import IntroSequence from "../components/IntroSequence";
import { site } from "../content";
import "./Home.css";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  introDone: boolean;
  onIntroComplete: () => void;
};

export default function Home({ introDone, onIntroComplete }: Props) {
  const [introVisible, setIntroVisible] = useState(!introDone);
  const skippedIntro = introDone;

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
          <p className="hero__kicker">Author of things that bite back</p>
          <h1 className="hero__headline">
            Stories with a <em>pulse</em>,<br />
            not a <span className="hero__strike">tragic ending</span>{" "}
            requirement.
          </h1>
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
              Credits, credentials, and the one true fact that explains
              everything else.
            </p>
            <span className="teaser-card__cta">Meet the author →</span>
          </Link>

          <a
            href={site.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="teaser-card"
          >
            <span className="teaser-card__index">02</span>
            <h2 className="teaser-card__title">Substack</h2>
            <p className="teaser-card__copy">
              Essays, updates, and whatever else refused to stay in a
              drawer.
            </p>
            <span className="teaser-card__cta">Subscribe ↗</span>
          </a>

          <Link to="/graveyard" className="teaser-card teaser-card--grave">
            <span className="teaser-card__index">03</span>
            <h2 className="teaser-card__title">The Graveyard</h2>
            <p className="teaser-card__copy">
              Every line that didn't make it, buried with its dates and
              cause of death.
            </p>
            <span className="teaser-card__cta">Enter if you dare →</span>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
