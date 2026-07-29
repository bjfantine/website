import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { site } from "../content";
import "./TermsGate.css";

type Props = {
  onAgree: () => void;
};

export default function TermsGate({ onAgree }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <motion.div
      className="terms-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-gate-title"
    >
      <motion.div
        className="terms-gate__card"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="terms-gate__kicker">Rules of the Dead — Please Read Before Entering</p>
        <h1 id="terms-gate-title" className="terms-gate__title">
          Terms &amp; Conditions of Entry
        </h1>

        <ol className="terms-gate__list">
          <li>
            The Graveyard is a public mausoleum of scrapped projects,
            unfinished drafts, and lines that never truly found their home.
            Everything buried here is unfinished — perhaps one day I'll 
            resurrect my dead. Until then, they remain buried here.
          </li>
          <li>
            <strong>Don't be a grave robber!</strong> All substantially derivative 
            non-commerical work based on contents within The Graveyard requires accreditation,
            and all commerical works express permission. This agreement is internationally
            enforced by an Attribution-NonCommercial Creative Commons License.
            You can read more about your rights under a CC By-NC <a href="https://creativecommons.org/licenses/by-nc/4.0/legalcode.en">here</a>.
          </li>
        </ol>

        <label className="terms-gate__checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
          <span>
            I understand these works are unfinished and agree to credit the
            author or obtain their direct permission if necessary.
          </span>
        </label>

        <div className="terms-gate__actions">
          <Link to="/" className="btn terms-gate__leave">
            Turn back
          </Link>
          <button
            type="button"
            className="btn btn-ivy"
            disabled={!checked}
            onClick={onAgree}
          >
            I agree — let me in!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
