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
      aria-label={`Read the fragment "${fragment.title}" — hover or focus to clear the grass and read the epitaph`}
    >
      <span className="tombstone__grave">
        <span className="tombstone__stone">
          <img className="tombstone__art" src="/tombstone-stone.png" alt="" aria-hidden="true" />
          <span className="tombstone__stone-top">
            <span className="tombstone__rip">Here Lies</span>
            <span className="tombstone__title">{fragment.title}</span>
            <span className="tombstone__years">{fragment.years}</span>
            <span className="tombstone__rule" aria-hidden="true" />
          </span>
          <span className="tombstone__cause">{fragment.causeOfDeath}</span>
          <img className="tombstone__grass" src="/tombstone-grass.png" alt="" aria-hidden="true" />
        </span>
        <svg
          className="tombstone__mound"
          viewBox="0 0 300 42"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`dirt-${fragment.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a4530" />
              <stop offset="100%" stopColor="#382a1c" />
            </linearGradient>
          </defs>
          <path
            d="M0,42 L0,24 C14,8 28,20 42,12 C58,2 70,18 88,10 C108,0 122,16 142,8 C160,1 172,14 190,9 C210,3 224,17 244,10 C262,4 276,15 288,11 C296,8 300,14 300,22 L300,42 Z"
            fill={`url(#dirt-${fragment.id})`}
          />
          <path
            d="M30,22 C44,14 54,20 60,16 M120,14 C132,8 142,13 150,10 M210,15 C222,9 234,13 242,11"
            stroke="#241a10"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
          <ellipse cx="95" cy="18" rx="7" ry="4" fill="#241a10" opacity="0.4" />
          <ellipse cx="205" cy="21" rx="9" ry="4.5" fill="#241a10" opacity="0.35" />
          <ellipse cx="150" cy="12" rx="5" ry="3" fill="#6b5238" opacity="0.6" />
        </svg>
      </span>
    </motion.button>
  );
}
