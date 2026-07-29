import { site } from "../content";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <span className="site-footer__name">{site.name}</span>
        <a className="site-footer__link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <a
          className="site-footer__link"
          href={site.substackUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Substack ↗
        </a>
        <a
          className="site-footer__link"
          href={site.blueskyUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Bluesky ↗
        </a>
        <a
          className="site-footer__link"
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram ↗
        </a>
      </div>
    </footer>
  );
}
