import * as Matter from "matter-js";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "../content";
import "./IntroSequence.css";

type Props = {
  onComplete: () => void;
};

type Phase = "display" | "falling";

const EASE = [0.16, 1, 0.3, 1] as const;
const DISPLAY_MS = 2400;
const MAX_FALL_MS = 2200;

function splitChars(text: string) {
  return text.split("");
}

export default function IntroSequence({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("display");
  const nameRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bylineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const nameChars = splitChars(site.name);
  const bylineChars = splitChars(site.byline);

  useEffect(() => {
    const timer = setTimeout(() => setPhase("falling"), DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "falling") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const letterEls = [...nameRefs.current, ...bylineRefs.current].filter(
      (el): el is HTMLSpanElement => el !== null && el.textContent !== " "
    );

    if (prefersReducedMotion || letterEls.length === 0) {
      const timer = setTimeout(() => onCompleteRef.current(), 500);
      return () => clearTimeout(timer);
    }

    const engine = Matter.Engine.create();
    engine.gravity.y = 1.5;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    const wallOptions = { isStatic: true, restitution: 0.3, friction: 0.02 };
    const walls = [
      Matter.Bodies.rectangle(-20, viewportH / 2, 40, viewportH * 2, wallOptions),
      Matter.Bodies.rectangle(
        viewportW + 20,
        viewportH / 2,
        40,
        viewportH * 2,
        wallOptions
      ),
    ];
    Matter.World.add(engine.world, walls);

    const items = letterEls.map((el) => {
      const rect = el.getBoundingClientRect();
      const width = Math.max(rect.width, 4);
      const height = Math.max(rect.height, 4);
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;

      const body = Matter.Bodies.rectangle(centerX, centerY, width, height, {
        restitution: 0.35,
        friction: 0.06,
        frictionAir: 0.012,
        density: 0.0018,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.35);
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: Math.random() * 1.5,
      });
      Matter.World.add(engine.world, body);

      el.style.position = "fixed";
      el.style.left = `${rect.left}px`;
      el.style.top = `${rect.top}px`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.margin = "0";
      el.style.willChange = "transform";

      return { el, body, originX: centerX, originY: centerY };
    });

    let raf = 0;
    let done = false;
    const start = performance.now();

    function tick(now: number) {
      const delta = 16.666;
      Matter.Engine.update(engine, delta);

      let allClear = true;
      for (const item of items) {
        const { x, y } = item.body.position;
        const angle = item.body.angle;
        item.el.style.transform = `translate(${x - item.originX}px, ${
          y - item.originY
        }px) rotate(${angle}rad)`;
        if (y < viewportH + 120) allClear = false;
      }

      if (!done && (allClear || now - start > MAX_FALL_MS)) {
        done = true;
        onCompleteRef.current();
        return;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [phase]);

  return (
    <motion.div
      ref={containerRef}
      className="intro"
      animate={{ opacity: 1 }}
      aria-hidden="true"
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
        {nameChars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              nameRefs.current[i] = el;
            }}
            className="intro__letter"
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </span>
        ))}
      </motion.h1>
      <motion.p
        className="intro__byline"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
      >
        {bylineChars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              bylineRefs.current[i] = el;
            }}
            className="intro__letter"
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </span>
        ))}
      </motion.p>
    </motion.div>
  );
}
