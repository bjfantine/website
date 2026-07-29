import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { site } from "../content";
import "./Contact.css";

const EASE = [0.16, 1, 0.3, 1] as const;

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — real visitors never fill this in.
    if (data.get("botcheck")) {
      setStatus("sent");
      return;
    }

    if (!site.web3formsAccessKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsAccessKey,
          subject: `New message from ${data.get("name")} via bjfantine.com`,
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.section
      className="contact-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container contact-page__inner">
        <p className="contact-page__kicker">Contact</p>
        <h1 className="contact-page__title">Get in Touch</h1>
        <p className="contact-page__lede">
          For events, press, edits, or just to say hello — the form goes
          straight to the inbox. Otherwise, find {site.name} here:
        </p>

        <div className="contact-page__grid">
          <div className="contact-page__socials">
            <a
              className="contact-page__social-link"
              href={site.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Substack ↗
            </a>
            <a
              className="contact-page__social-link"
              href={site.blueskyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluesky ↗
            </a>
            <a
              className="contact-page__social-link"
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="checkbox"
              name="botcheck"
              className="contact-form__honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <label className="contact-form__field">
              <span>Name</span>
              <input type="text" name="name" required autoComplete="name" />
            </label>

            <label className="contact-form__field">
              <span>Email</span>
              <input type="email" name="email" required autoComplete="email" />
            </label>

            <label className="contact-form__field">
              <span>Message</span>
              <textarea name="message" rows={6} required />
            </label>

            <button
              type="submit"
              className="btn btn-solid contact-form__submit"
              disabled={status === "sending" || status === "sent"}
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                ? "Sent"
                : "Send message"}
            </button>

            {status === "sent" && (
              <p className="contact-form__note contact-form__note--ok">
                Thanks — that's on its way.
              </p>
            )}
            {status === "error" && (
              <p className="contact-form__note contact-form__note--error">
                Something went wrong. Try again in a moment, or reach out on
                Bluesky or Instagram instead.
              </p>
            )}
          </form>
        </div>
      </div>
    </motion.section>
  );
}
