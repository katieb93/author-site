import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

import lLine from "./assets/outterlg.svg";

import instagram from "./assets/Instagram.png";
import youtube from "./assets/YouTube.png";
import xicon from "./assets/X.png";
import tiktok from "./assets/TikTok.png";
import spotify from "./assets/Spotify.png";

import heroClean from "./assets/sweep.png";
import babeInTheHearthOpening from "./openings/babeinthehearth.md?raw";
import ourHouseIlluminatedOpening from "./openings/ourhouseilluminated.md?raw";
import babeSynopsis from "./openings/babesynopsis.md?raw";
import illuminatedSynopsis from "./openings/illuminatedsynopsis.md?raw";

const PROJECTS = [
  {
    id: "p1",
    title: "Babe in the Hearth",
    logline:
      "In an alternate-America where the state assigns marriages and mandates motherhood, a young woman begins to question the life she's built, until a devastating revelation about her husband drives her to flee across the Southwest with her daughters, chasing a freedom she's never been allowed to choose.",
    genre: "Literary Speculative",
    quote: "",
    compsLiterary:
      "The School for Good Mothers, Lily King, The Handmaid's Tale, The Road, When the World Tips Over",
    compsFilm: "Gilmore Girls, Station Eleven (TV Series)",
    openingPages: babeInTheHearthOpening,
    synopsis: babeSynopsis,
    chapterTitle: "CHAPTER ONE",
    chapterSub: "Age Twelve",
    spotifyUrl: "https://open.spotify.com/playlist/76cVDsN2sMautVhdZCAg0y?si=1b7b2c818d614b28",
  },
  {
    id: "p2",
    title: "Our House Illuminated",
    logline:
      "A seventeen-year-old child star fleeing scandal in Hollywood lands in rural Texas searching for her literary idol, but when her past resurfaces and threatens the fragile life she has built with two unlikely friends, she must decide whether to keep running from the truth or fight for the first place that has ever felt real.",
    genre: "Literary YA/Crossover",
    quote: "",
    compsLiterary:
      "Daisy Jones & The Six, Tomorrow, and Tomorrow, and Tomorrow, Sweet Bitter, Ottessa Moshfegh",
    compsFilm: "Almost Famous, Friday Night Lights, Euphoria",
    openingPages: ourHouseIlluminatedOpening,
    synopsis: illuminatedSynopsis,
    chapterTitle: "CHAPTER ONE",
    chapterSub: "",
    spotifyUrl: "https://open.spotify.com/playlist/5RUXPiNeBQPGEUhdi7NEky?si=c31e007c0e2848a5",
  },
  {
    id: "p3",
    title: "(Work-In-Progress)",
    logline:
      "A grad student begins slipping into parallel universes where a different roommate is dead each time, even as she falls for the boyfriend of the first girl to die.",
    genre: "Upmarket Speculative",
    quote: "",
    openingPages: "",
    synopsis: "",
    chapterTitle: "",
    chapterSub: "",
    spotifyUrl: "",
  },
];

function AccordionItem({ id, title, isOpen, onToggle, children }) {
  return (
    <section className="acc-item">
      <button
        className="acc-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        type="button"
      >
        <span className="acc-title">{title}</span>
        <span className="acc-caret">{isOpen ? "▾" : "▸"}</span>
      </button>

      <div
        className={`acc-panel ${isOpen ? "is-open" : ""}`}
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
      >
        <div className="acc-inner">{children}</div>
      </div>
    </section>
  );
}

function WorkModal({ project, onClose }) {
  const hasLogline = !!project.logline?.trim();
  const hasQuote = !!project.quote?.trim();
  const hasOpening = !!project.openingPages?.trim();
  const hasSynopsis = !!project.synopsis?.trim();
  const hasChapterTitle = !!project.chapterTitle?.trim();
  const hasChapterSub = !!project.chapterSub?.trim();
  const hasTitle = !!project.title?.trim();
  const hasGenre = !!project.genre?.trim();
  const hasCompsLiterary = !!project.compsLiterary?.trim();
  const hasCompsFilm = !!project.compsFilm?.trim();
  const hasComps = hasCompsLiterary || hasCompsFilm;
  const hasSpotify = !!project.spotifyUrl?.trim();

  const [open, setOpen] = useState({
    logline: hasLogline,
    quote: false,
    comps: false,
    opening: false,
    synopsis: false,
  });

  useEffect(() => {
    setOpen({
      logline: hasLogline,
      quote: false,
      comps: false,
      opening: false,
      synopsis: false,
    });
  }, [project, hasLogline]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = (id) =>
    setOpen((curr) => ({
      ...curr,
      [id]: !curr[id],
    }));

  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div>
            {hasTitle && <h3 className="modal-title">{project.title}</h3>}
            {hasGenre && (
              <div className="modal-meta">
                <span className="modal-pill">{project.genre}</span>
              </div>
            )}

            {hasSpotify && (
              <a
                className="modal-spotify-link"
                href={project.spotifyUrl}
                target="_blank"
                rel="noreferrer"
              >
                Spotify Playlist
                <img
                  className="spotify-icon modal-spotify-icon"
                  src={spotify}
                  alt="Spotify"
                />
              </a>
            )}
          </div>

          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-accordion">
          {hasLogline && (
            <AccordionItem
              id="logline"
              title="Logline"
              isOpen={open.logline}
              onToggle={() => toggle("logline")}
            >
              <p className="modal-logline">{project.logline}</p>
            </AccordionItem>
          )}

          {hasQuote && (
            <AccordionItem
              id="quote"
              title="Quotes"
              isOpen={open.quote}
              onToggle={() => toggle("quote")}
            >
              <blockquote className="modal-quote">{project.quote}</blockquote>
            </AccordionItem>
          )}

          {hasComps && (
            <AccordionItem
              id="comps"
              title="Comps"
              isOpen={open.comps}
              onToggle={() => toggle("comps")}
            >
              <div className="modal-comps">
                {hasCompsLiterary && (
                  <div className="comps-row">
                    <span className="comps-label">Literary</span>
                    <span className="comps-value">{project.compsLiterary}</span>
                  </div>
                )}

                {hasCompsFilm && (
                  <div className="comps-row">
                    <span className="comps-label">Film / TV</span>
                    <span className="comps-value">{project.compsFilm}</span>
                  </div>
                )}
              </div>
            </AccordionItem>
          )}

          {hasOpening && (
            <AccordionItem
              id="opening"
              title="Opening Pages"
              isOpen={open.opening}
              onToggle={() => toggle("opening")}
            >
              <div className="modal-prose">
                {(hasChapterTitle || hasChapterSub) && (
                  <div className="chapter-header">
                    {hasChapterTitle && (
                      <div className="chapter-title">{project.chapterTitle}</div>
                    )}
                    {hasChapterSub && (
                      <div className="chapter-sub">{project.chapterSub}</div>
                    )}
                  </div>
                )}

                <div className="markdown-pages">
                  <ReactMarkdown skipHtml>
                    {String(project.openingPages || "")}
                  </ReactMarkdown>
                </div>
              </div>
            </AccordionItem>
          )}

          {hasSynopsis && (
            <AccordionItem
              id="synopsis"
              title="Synopsis (Spoilers!)"
              isOpen={open.synopsis}
              onToggle={() => toggle("synopsis")}
            >
              <div className="modal-prose">
                <div className="markdown-pages">
                  <ReactMarkdown skipHtml>
                    {String(project.synopsis || "")}
                  </ReactMarkdown>
                </div>
              </div>
            </AccordionItem>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(null);

  const heroImgRef = useRef(null);
  const heroLockupRef = useRef(null);
  const heroTaglineRef = useRef(null);

  useEffect(() => {
    const header = document.querySelector(".site-header");

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;

        header?.classList.toggle("is-scrolled", y > 10);

        if (heroImgRef.current) {
          heroImgRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.06)`;
        }

        if (heroLockupRef.current) {
          heroLockupRef.current.style.transform = `translate3d(0, calc(-50% - ${y * 0.08}px), 0)`;
        }

        if (heroTaglineRef.current) {
          const opacity = Math.max(0, 1 - y / 320);
          heroTaglineRef.current.style.opacity = opacity;
        }

        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="header-inner brand">
          <div className="brand-name">Katie Elizabeth Brown | Writer</div>

          <nav className="nav">
            <a href="#about">About</a>
            <a href="#work">Manuscripts</a>

            <div className="nav-contact">
              <span className="nav-link">
                Contact <span className="nav-caret">▾</span>
              </span>

              <div className="contact-dropdown" role="menu" aria-label="Contact">
                <a
                  className="contact-item"
                  role="menuitem"
                  href="https://www.instagram.com/katieb10193/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagram} alt="Instagram" />
                </a>

                <a
                  className="contact-item"
                  role="menuitem"
                  href="https://www.youtube.com/@ByMeForMeContent/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={youtube} alt="YouTube" />
                </a>

                <a
                  className="contact-item"
                  role="menuitem"
                  href="https://open.spotify.com/user/22vb3wnjdcubu5xigzeobe45a?si=31562f5095f149dd"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={spotify} alt="Spotify" />
                </a>

                <a
                  className="contact-item"
                  role="menuitem"
                  href="https://www.tiktok.com/@bymeformeproductions"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={tiktok} alt="TikTok" />
                </a>

                <a
                  className="contact-item"
                  role="menuitem"
                  href="https://x.com/katieb10193/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={xicon} alt="X" />
                </a>

                <a
                  className="contact-email"
                  href="mailto:kate.liz.brown10193@gmail.com"
                >
                  kate.liz.brown10193@gmail.com
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-label="Hero">
          <img
            ref={heroImgRef}
            className="hero-img"
            src={heroClean}
            alt="Portrait of Katie"
          />

          <div className="hero-overlay" aria-hidden="true">
            <div ref={heroLockupRef} className="hero-lockup">
              <h1 className="hero-name">
                <span className="hero-katie">KATIE</span>

                <span className="hero-elizabeth">
                  <span className="hero-e">E</span>
                  <span className="hero-lizabeth">LIZABETH</span>
                </span>
              </h1>

              <p ref={heroTaglineRef} className="hero-tagline">
                Writing stories about young people in terrible circumstances
                just... trying their best.
              </p>
            </div>
          </div>
        </section>

        <section id="work" className="work-block">
          <div className="work-head">
            <h2 className="work-title">Manuscripts</h2>
            <p className="work-sub">Selected manuscripts & projects.</p>
          </div>

          <div className="card-grid">
            {PROJECTS.map((p) => (
              <article key={p.id} className="card">
                <div className="card-top">
                  {p.title?.trim() && <h3 className="card-title">{p.title}</h3>}

                  {p.genre?.trim() && (
                    <div className="pill-divider">
                      <span className="card-pill">{p.genre}</span>
                    </div>
                  )}
                </div>

                {p.logline?.trim() && (
                  <p className="card-logline">{p.logline}</p>
                )}

                {p.spotifyUrl?.trim() && (
                  <a
                    className="card-spotify-link"
                    href={p.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Listen to playlist{" "}
                    <img
                      className="spotify-icon"
                      src={spotify}
                      alt="Spotify"
                    />
                  </a>
                )}

                <button className="card-open" onClick={() => setActive(p)}>
                  Read more →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="about">
          <div className="about-me">
            <h1 className="work-title">About Me</h1>
            <p className="about-me-text">
              I am an Austin native with a lifelong love of story.
            </p>
            <p className="about-me-text">
              I earned my B.S. in Radio-Television-Film with a focus in
              screenwriting from the University of Texas at Austin, along with a
              certificate in creative writing, before moving to Los Angeles to
              complete my master’s degree in Writing and Producing for
              Television. While there, I had the opportunity to work with
              Universal Content Productions, Skybound Entertainment, and Amazon
              Studios during the Fleabag era.
            </p>
            <p className="about-me-text">
              I have since returned to Austin, where I have worked in UX writing
              and design and now serve as Web Content Assistant at the historic
              Paramount Theatre.
            </p>
            <p className="about-me-text">
              Raised across various Texas counties, I've always dreamed of
              coffee shops, quick-witted friends, and a constantly stimulated
              imagination. I found all three on the East Side of Austin, where
              my characters were shaped by the artists, musicians, novelists,
              and poets I met. I write and speak at a dizzying WPM, thanks to
              Lorelai Gilmore and Joshua Lyman, usually with LCD Soundsystem or
              R.E.M. playing in the background.
            </p>
          </div>
        </section>

        <img className="lLine" src={lLine} alt="" />

        <footer className="site-footer">
          <div className="footer-inner">
            <p className="footer-copy-1">I built this site from scratch.</p>
            <p className="footer-copy">Just sayin'.</p>
            <p className="footer-email">kate.liz.brown10193@gmail.com</p>

            <div className="footer-socials">
              <a
                href="https://x.com/katieb10193/"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>

              <a
                href="https://www.tiktok.com/@bymeformeproductions"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>

              <a
                href="https://open.spotify.com/user/22vb3wnjdcubu5xigzeobe45a?si=f7c9db4af6c748be"
                target="_blank"
                rel="noreferrer"
              >
                Spotify
              </a>

              <a
                href="https://www.youtube.com/@ByMeForMeContent"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>

              <a
                href="https://www.instagram.com/katieb10193/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </main>

      {active && <WorkModal project={active} onClose={() => setActive(null)} />}
    </>
  );
}