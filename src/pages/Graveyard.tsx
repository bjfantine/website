import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TermsGate from "../components/TermsGate";
import Tombstone from "../components/Tombstone";
import { fragments, graveyardIntro } from "../content";
import "./Graveyard.css";

const AGREED_KEY = "graveyard-terms-agreed";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Graveyard() {
  const [agreed, setAgreed] = useState(
    () => sessionStorage.getItem(AGREED_KEY) === "true"
  );
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openFragment =
    fragments.find((fragment) => fragment.id === openId) ?? null;

  return (
    <div className="graveyard-page">
      <AnimatePresence>
        {!agreed && (
          <TermsGate
            key="terms-gate"
            onAgree={() => {
              sessionStorage.setItem(AGREED_KEY, "true");
              setAgreed(true);
            }}
          />
        )}
      </AnimatePresence>

      <div className={"graveyard-content" + (agreed ? "" : " is-locked")}>
        <div className="graveyard-fog" aria-hidden="true" />

        <div className="container graveyard-intro">
          <p className="graveyard-intro__kicker">{graveyardIntro.title}</p>
          <h1 className="graveyard-intro__title">{graveyardIntro.subtitle}</h1>
          <p className="graveyard-intro__body">{graveyardIntro.body}</p>
        </div>

        <div className="container graveyard-plot">
          {fragments.map((fragment, index) => (
            <Tombstone
              key={fragment.id}
              fragment={fragment}
              index={index}
              onSelect={setOpenId}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openFragment && (
          <motion.div
            key="fragment-detail"
            className="fragment-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fragment-detail-title"
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpenId(null);
            }}
          >
            <motion.div
              className="fragment-detail__card"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <button
                type="button"
                className="fragment-detail__close"
                onClick={() => setOpenId(null)}
                aria-label="Close"
              >
                ×
              </button>
              <p className="fragment-detail__meta">
                {openFragment.years} · {openFragment.causeOfDeath}
              </p>
              <h2
                id="fragment-detail-title"
                className="fragment-detail__title"
              >
                {openFragment.title}
              </h2>
              <p className="fragment-detail__epitaph">
                "{openFragment.epitaph}"
              </p>
              <p className="fragment-detail__excerpt">
                {openFragment.excerpt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
