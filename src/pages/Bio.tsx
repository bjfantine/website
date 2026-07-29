import { motion } from "framer-motion";
import { bio, site } from "../content";
import "./Bio.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Bio() {
  return (
    <motion.section
      className="bio-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container bio-page__inner">
        <div className="bio-page__photo-wrap">
          <img
            className="bio-page__photo"
            src={site.photo}
            alt={site.name}
            width={400}
            height={500}
          />
        </div>

        <div className="bio-page__copy">
          <p className="bio-copy__kicker">Bio</p>
          <h1 className="bio-copy__name">{site.name}</h1>

          {bio.paragraphs.map((paragraph, index) => (
            <p key={index} className="bio-copy__para">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
