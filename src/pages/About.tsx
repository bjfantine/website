import { motion } from "framer-motion";
import { about, site } from "../content";
import "./About.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <motion.section
      className="about-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container about-page__inner">
        <div className="about-page__photo-wrap">
          <img
            className="about-page__photo"
            src={site.photo}
            alt={site.name}
            width={400}
            height={500}
          />
        </div>

        <div className="about-page__copy">
          <p className="about-copy__kicker">About</p>
          <h1 className="about-copy__name">{site.name}</h1>

          {about.paragraphs.map((paragraph, index) => (
            <p key={index} className="about-copy__para">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
