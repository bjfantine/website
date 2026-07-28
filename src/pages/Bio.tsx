import { useState } from "react";
import { motion } from "framer-motion";
import { bio, site } from "../content";
import "./Bio.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Bio() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <motion.section
      className="bio-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container bio-page__grid">
        <div className="bio-photo">
          <div className="bio-photo__frame">
            {!photoFailed ? (
              <img
                src="/author-photo.jpg"
                alt={bio.photoAlt}
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div className="bio-photo__placeholder">
                <span className="bio-photo__initials">{site.initials}</span>
                <span className="bio-photo__hint">
                  Add a photo at
                  <br />
                  <code>public/author-photo.jpg</code>
                </span>
              </div>
            )}
          </div>
          <p className="bio-photo__caption">{site.name}</p>
        </div>

        <div className="bio-copy">
          <p className="bio-copy__kicker">Bio</p>
          <h1 className="bio-copy__name">{site.name}</h1>
          {bio.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                "bio-copy__para" + (index === 0 ? " bio-copy__para--lead" : "")
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
