import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Fragment } from "../content";
import "./Tombstone.css";

type Props = {
  fragment: Fragment;
  onSelect: (id: string) => void;
  index: number;
};

type BladeCfg = {
  x: number;
  h: number;
  w: number;
  lean: number;
  shade: "a" | "b" | "c";
};

const BASE_Y = 150;

function bladePath(x: number, h: number, w: number, lean: number) {
  const tipX = x + lean;
  const tipY = BASE_Y - h;
  const c1y = BASE_Y - h * 0.35;
  const c2y = BASE_Y - h * 0.75;
  return `M ${x - w / 2} ${BASE_Y} C ${x - w / 2 + lean * 0.15} ${c1y} ${
    tipX - w * 0.2
  } ${c2y} ${tipX} ${tipY} C ${tipX + w * 0.2} ${c2y} ${
    x + w / 2 + lean * 0.15
  } ${c1y} ${x + w / 2} ${BASE_Y} Z`;
}

function departFactor(x: number) {
  const d = Math.abs(x - 100);
  return Math.max(0.45, 1.3 - d / 85);
}

function delayMs(x: number, i: number) {
  const d = Math.abs(x - 100);
  return Math.round(d * 1.1 + i * 4);
}

const SHADE_VAR: Record<BladeCfg["shade"], string> = {
  a: "var(--grave-moss)",
  b: "var(--grave-moss-dark)",
  c: "var(--grave-moss-light)",
};

const LEFT_BLADES: BladeCfg[] = [
  { x: 94, h: 122, w: 9, lean: -4, shade: "a" },
  { x: 84, h: 100, w: 7, lean: -7, shade: "b" },
  { x: 74, h: 116, w: 9, lean: -3, shade: "a" },
  { x: 63, h: 90, w: 7, lean: -9, shade: "c" },
  { x: 52, h: 106, w: 8, lean: -5, shade: "b" },
  { x: 40, h: 82, w: 7, lean: -11, shade: "a" },
  { x: 28, h: 94, w: 7, lean: -6, shade: "c" },
  { x: 16, h: 68, w: 6, lean: -9, shade: "b" },
  { x: 6, h: 54, w: 5, lean: -7, shade: "a" },
];

const RIGHT_BLADES: BladeCfg[] = [
  { x: 106, h: 118, w: 9, lean: 4, shade: "b" },
  { x: 117, h: 96, w: 7, lean: 7, shade: "a" },
  { x: 128, h: 112, w: 9, lean: 3, shade: "c" },
  { x: 139, h: 86, w: 7, lean: 9, shade: "a" },
  { x: 150, h: 102, w: 8, lean: 5, shade: "b" },
  { x: 162, h: 78, w: 7, lean: 10, shade: "c" },
  { x: 174, h: 90, w: 7, lean: 6, shade: "a" },
  { x: 186, h: 64, w: 6, lean: 8, shade: "b" },
  { x: 195, h: 50, w: 5, lean: 6, shade: "a" },
];

function GrassHalf({ blades, side }: { blades: BladeCfg[]; side: "left" | "right" }) {
  return (
    <>
      {blades.map((b, i) => (
        <g
          key={`${side}-${i}`}
          className="tombstone__blade-sway"
          style={{ animationDelay: `${i * 0.18}s` } as CSSProperties}
        >
          <path
            className={`tombstone__blade-shape tombstone__blade-shape--${side}`}
            d={bladePath(b.x, b.h, b.w, b.lean)}
            fill={SHADE_VAR[b.shade]}
            style={
              {
                "--depart": departFactor(b.x),
                "--delay": `${delayMs(b.x, i)}ms`,
              } as CSSProperties
            }
          />
        </g>
      ))}
    </>
  );
}

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
        <svg
          className="tombstone__ivy"
          viewBox="0 0 40 64"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M6 2 C 2 14, 14 18, 9 32 C 4 46, 15 50, 11 62"
            stroke="var(--grave-moss-dark)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polygon points="6,10 10,15 6,20 2,15" fill="var(--grave-moss-dark)" />
          <polygon points="15,26 19,31 15,36 11,31" fill="var(--grave-moss-dark)" />
          <polygon points="9,48 13,53 9,58 5,53" fill="var(--grave-moss-dark)" />
        </svg>

        <span className="tombstone__stone-top">
          <span className="tombstone__rip">Here Lies</span>
          <span className="tombstone__title">{fragment.title}</span>
          <span className="tombstone__years">{fragment.years}</span>
          <span className="tombstone__rule" aria-hidden="true" />
        </span>

        <span className="tombstone__stone-bottom">
          <span className="tombstone__cause">{fragment.causeOfDeath}</span>
          <svg
            className="tombstone__grass"
            viewBox="0 0 200 150"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
          >
            <GrassHalf blades={LEFT_BLADES} side="left" />
            <GrassHalf blades={RIGHT_BLADES} side="right" />
          </svg>
        </span>
      </span>
      <span className="tombstone__mound" aria-hidden="true" />
    </motion.button>
  );
}
