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
        <p className="terms-gate__kicker">Cemetery Bylaws — Read Before Entering</p>
        <h1 id="terms-gate-title" className="terms-gate__title">
          Terms &amp; Conditions of Entry
        </h1>

        <ol className="terms-gate__list">
          <li>
            Everything beyond this gate is <strong>unfinished</strong> —
            drafts, fragments, and sentences that never got where they were
            going. None of it is offered as a completed work.
          </li>
          <li>
            Reading The Graveyard is free and will stay that way. No account,
            no email, no name required. Clicking "agree" below doesn't
            register your identity anywhere — this exists purely as a
            formality, for the record and for the dead.
          </li>
          <li>
            <strong>Unfinished is not the same as unclaimed.</strong>{" "}
            Substantially derivative work — free or paid, published or
            posted — based on material found here requires clear
            accreditation to {site.name}. Lifting a line from a grave is
            still plagiarism, even if the grave says "abandoned."
          </li>
          <li>
            By proceeding, you agree to the above and promise to treat the
            dead with a reasonable amount of respect.
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
            author for any substantially derivative use.
          </span>
        </label>

        <div className="terms-gate__actions">
          <Link to="/" className="btn terms-gate__leave">
            Turn back
          </Link>
          <button
            type="button"
            className="btn btn-flame"
            disabled={!checked}
            onClick={onAgree}
          >
            I agree — let me in
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
