import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { site } from "../content";
import "./Header.css";

type HeaderProps = {
  visible: boolean;
};

export default function Header({ visible }: HeaderProps) {
  return (
    <motion.header
      className="site-header"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -18 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <div className="site-header__inner container">
        <NavLink to="/" className="site-header__name">
          {site.name}
        </NavLink>
        <nav className="site-header__nav" aria-label="Primary">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              "site-header__link" + (isActive ? " is-active" : "")
            }
          >
            About B.J.
          </NavLink>
          <NavLink
            to="/selected-work"
            className={({ isActive }) =>
              "site-header__link" + (isActive ? " is-active" : "")
            }
          >
            Selected Work
          </NavLink>
          <a
            href={site.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__link"
          >
            Substack
          </a>
          <NavLink
            to="/graveyard"
            className={({ isActive }) =>
              "site-header__link site-header__link--grave" +
              (isActive ? " is-active" : "")
            }
          >
            The Graveyard
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              "site-header__link" + (isActive ? " is-active" : "")
            }
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </motion.header>
  );
}
