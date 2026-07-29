import { motion } from "framer-motion";
import "./SelectedWork.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const TEXT = "Coming Soon";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function SelectedWork() {
  return (
    <section className="selected-work-page">
      <div className="container selected-work__inner">
        <motion.h1
          className="selected-work__text"
          variants={container}
          initial="hidden"
          animate="visible"
          aria-label={`${TEXT}...`}
        >
          {TEXT.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letter}
              className="selected-work__char"
              aria-hidden="true"
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
          <span className="selected-work__dots" aria-hidden="true">
            <span className="selected-work__dot" />
            <span className="selected-work__dot" />
            <span className="selected-work__dot" />
          </span>
        </motion.h1>
      </div>
    </section>
  );
}
