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
const SHADES = ["a", "b", "c"] as const;

function bladePath(x: number, h: number, w: number, lean: number) {
  const tipX = x + lean;
  const tipY = BASE_Y - h;
  const tipR = Math.max(w * 0.16, 1);
  const bellyY = BASE_Y - h * 0.42;
  const bellyW = w * 0.66;
  const leanMid = lean * 0.45;

  return [
    `M ${x - w / 2} ${BASE_Y}`,
    `Q ${x - bellyW + leanMid} ${bellyY} ${tipX - tipR} ${tipY + tipR * 1.4}`,
    `Q ${tipX - tipR * 0.4} ${tipY} ${tipX} ${tipY}`,
    `Q ${tipX + tipR * 0.4} ${tipY} ${tipX + tipR} ${tipY + tipR * 1.4}`,
    `Q ${x + bellyW + leanMid} ${bellyY} ${x + w / 2} ${BASE_Y}`,
    "Z",
  ].join(" ");
}

function departFactor(x: number) {
  const d = Math.abs(x - 100);
  return Math.max(0.5, 1.4 - d / 80);
}

function delayMs(x: number, i: number) {
  const d = Math.abs(x - 100);
  return Math.round(d * 0.9 + i * 3);
}

// Deterministic pseudo-random in [0, 1) — no Math.random so every render
// (and every tombstone) grows the same natural-looking clump.
function pseudoRandom(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

function makeBlades(count: number, mirror: 1 | -1): BladeCfg[] {
  const blades: BladeCfg[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const spread = 4 + t * 93;
    const x = 100 + mirror * spread;
    const r1 = pseudoRandom(i * 3.1 + (mirror === 1 ? 11 : 41));
    const r2 = pseudoRandom(i * 7.7 + (mirror === 1 ? 23 : 59));
    const heightBase = 134 - t * 78;
    const h = heightBase * (0.72 + r1 * 0.55);
    const w = 6 + r2 * 4.5;
    const lean = mirror * (3 + t * 9 + r1 * 5);
    const shade = SHADES[i % 3];
    blades.push({ x, h, w, lean, shade });
  }
  return blades;
}

const SHADE_VAR: Record<BladeCfg["shade"], string> = {
  a: "var(--grave-moss)",
  b: "var(--grave-moss-dark)",
  c: "var(--grave-moss-light)",
};

const LEFT_BLADES = makeBlades(15, -1);
const RIGHT_BLADES = makeBlades(15, 1);

function GrassHalf({ blades, side }: { blades: BladeCfg[]; side: "left" | "right" }) {
  return (
    <>
      {blades.map((b, i) => (
        <g
          key={`${side}-${i}`}
          className="tombstone__blade-sway"
          style={{ animationDelay: `${i * 0.12}s` } as CSSProperties}
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
