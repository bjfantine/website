import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "../content";
import "./IntroSequence.css";

type Props = {
  onComplete: () => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function IntroSequence({ onComplete }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="intro"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={() => {
        if (exiting) onComplete();
      }}
      aria-hidden={exiting}
    >
      <motion.span
        className="intro__rule"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
      />
      <motion.h1
        className="intro__name"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
      >
        {site.name}
      </motion.h1>
      <motion.p
        className="intro__byline"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
      >
        {site.byline}
      </motion.p>
    </motion.div>
  );
}
