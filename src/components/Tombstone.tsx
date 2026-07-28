import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Fragment } from "../content";
import "./Tombstone.css";

type Props = {
  fragment: Fragment;
  onSelect: (id: string) => void;
  index: number;
};

const GRASS_BLADES = [
  { rot: -24, h: 15 },
  { rot: -16, h: 23 },
  { rot: -8, h: 13 },
  { rot: -2, h: 19 },
  { rot: 4, h: 25 },
  { rot: 10, h: 14 },
  { rot: 17, h: 21 },
  { rot: 24, h: 16 },
];

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
      aria-label={`Read the fragment "${fragment.title}"`}
    >
      <span className="tombstone__stone">
        <span className="tombstone__rip">Here Lies</span>
        <span className="tombstone__title">{fragment.title}</span>
        <span className="tombstone__years">{fragment.years}</span>
        <span className="tombstone__rule" aria-hidden="true" />
        <span className="tombstone__cause-wrap">
          <span className="tombstone__cause">{fragment.causeOfDeath}</span>
          <span className="tombstone__cause-grass" aria-hidden="true">
            {GRASS_BLADES.map((blade, i) => (
              <span
                key={i}
                className="tombstone__blade"
                style={
                  {
                    "--rot": `${blade.rot}deg`,
                    "--h": `${blade.h}px`,
                    "--delay": `${i * 0.035}s`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </span>
      </span>
      <span className="tombstone__mound" aria-hidden="true" />
    </motion.button>
  );
}
