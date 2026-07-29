import { motion } from "framer-motion";
import type { Fragment } from "../content";
import "./Tombstone.css";

type Props = {
  fragment: Fragment;
  onSelect: (id: string) => void;
  index: number;
};

export default function Tombstone({ fragment, onSelect, index }: Props) {
  return (
    <motion.button
      type="button"
      className="tombstone"
      onClick={() => onSelect(fragment.id)}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-label={`Read the fragment "${fragment.title}" — hover or focus to part the grass`}
    >
      <span className="tombstone__stone">
        <img className="tombstone__art" src="/tombstone-stone.png" alt="" aria-hidden="true" />
        <span className="tombstone__stone-top">
          <span className="tombstone__rip">Here Lies</span>
          <span className="tombstone__title">{fragment.title}</span>
          <span className="tombstone__years">{fragment.years}</span>
          <span className="tombstone__rule" aria-hidden="true" />
        </span>
        <span className="tombstone__cause">{fragment.causeOfDeath}</span>
        <img
          className="tombstone__grass tombstone__grass--left"
          src="/tombstone-grass-left.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="tombstone__grass tombstone__grass--right"
          src="/tombstone-grass-right.png"
          alt=""
          aria-hidden="true"
        />
      </span>
      <span className="tombstone__mound" aria-hidden="true" />
    </motion.button>
  );
}
