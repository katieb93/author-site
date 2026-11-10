import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./PrintStack.css";

// How spread out the pile is: 1 = tight stack, 2 = spread out, 3 = tossed across the table
const SPREAD = 2.2;

// true  = each stack is shuffled every time it's shown
// false = always starts in filename order
const SHUFFLE_ON_OPEN = true;

// How many prints to draw in the pile at once (the rest are "underneath")
const VISIBLE = 9;

const pad = (n) => String(n).padStart(2, "0");
const noSave = (e) => e.preventDefault();
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const touchX = useRef(null);
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 50) onPrev();
    if (dx < -50) onNext();
    touchX.current = null;
  };

  return (
    <div
      className="lightbox-backdrop"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {photos.length > 1 && (
        <button
          className="lightbox-nav lightbox-prev"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onPrev}
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}

      <figure
        key={photo.id}
        className="lightbox-figure"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="lightbox-print">
          <img
            className="lightbox-img"
            src={photo.src}
            alt={photo.alt}
            draggable={false}
            onContextMenu={noSave}
          />
          {photo.date && <span className="date-stamp">{photo.date}</span>}
        </div>
        {photo.caption && (
          <figcaption className="lightbox-caption">
            <span className="lightbox-note">{photo.caption}</span>
          </figcaption>
        )}
      </figure>

      {photos.length > 1 && (
        <button
          className="lightbox-nav lightbox-next"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onNext}
          aria-label="Next photo"
        >
          ›
        </button>
      )}
    </div>
  );
}

export default function PrintStack({ photos, first }) {
  const count = photos.length;

  const [order, setOrder] = useState(() => {
    const o = photos.map((_, i) => i);
    if (SHUFFLE_ON_OPEN) {
      for (let i = o.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [o[i], o[j]] = [o[j], o[i]];
      }
    }
    // Put the chosen photo on top, keep the rest shuffled
    const pick = photos.findIndex((p) => p.name === first);
    if (pick !== -1) o.splice(o.indexOf(pick), 1), o.unshift(pick);
    return o;
  });
  const [seen, setSeen] = useState(1);
  const [anim, setAnim] = useState(null); // { i, type: "toss" | "return" }
  const [flipped, setFlipped] = useState(false);
  const [portrait, setPortrait] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  const touchX = useRef(null);

  const top = order[0];
  const visible = useMemo(() => order.slice(0, VISIBLE), [order]);

  // ----- Flip through the stack -----
  const next = useCallback(() => {
    if (anim || count < 2) return;
    setFlipped(false);
    setSeen((s) => (s % count) + 1);
    if (prefersReducedMotion()) {
      setOrder((o) => [...o.slice(1), o[0]]);
      return;
    }
    setAnim({ i: order[0], type: "toss" });
  }, [anim, order, count]);

  const prev = useCallback(() => {
    if (anim || count < 2) return;
    setFlipped(false);
    setSeen((s) => (s === 1 ? count : s - 1));
    const last = order[order.length - 1];
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
    if (!prefersReducedMotion()) setAnim({ i: last, type: "return" });
  }, [anim, order, count]);

  const onAnimationEnd = (e, i) => {
    if (!anim || anim.i !== i || e.target !== e.currentTarget) return;
    if (anim.type === "toss") setOrder((o) => [...o.slice(1), o[0]]);
    setAnim(null);
  };

  const turnOver = () => {
    if (!anim) setFlipped((f) => !f);
  };

  // ----- Keyboard (when the stack is focused) -----
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "Enter") {
      e.preventDefault();
      setOpenIndex(top);
    } else if (e.key === " " || e.key.toLowerCase() === "t") {
      e.preventDefault();
      turnOver();
    }
  };

  // ----- Swipe (phones) -----
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx < -40) next();
    else if (dx > 40) prev();
  };

  // Arrows inside the full-size view
  const lightboxPrev = useCallback(
    () => setOpenIndex((i) => (i - 1 + count) % count),
    [count]
  );
  const lightboxNext = useCallback(
    () => setOpenIndex((i) => (i + 1) % count),
    [count]
  );
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  const markOrientation = (e, id) => {
    const img = e.currentTarget;
    const isPortrait = img.naturalHeight > img.naturalWidth;
    setPortrait((p) =>
      p[id] === isPortrait ? p : { ...p, [id]: isPortrait }
    );
  };

  if (count === 0) return null;

  const topPhoto = photos[top];

  return (
    <div className="stack-wrap">
      <div
        className="print-stage"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Stack of photo prints. Left and right arrows flip through, Enter opens the top print, T turns it over."
      >
        {visible
          .map((i, slot) => ({ i, slot }))
          .reverse() // draw the bottom of the pile first
          .map(({ i, slot }) => {
            const photo = photos[i];
            const isTop = slot === 0;

            // how messy this print sits
            const r = photo.r * 16 * (1 + (SPREAD - 1) * 0.4);
            const x = photo.x * 36 * SPREAD;
            const y = photo.y * 24 * SPREAD;

            const classes = [
              "print",
              portrait[photo.id] && "is-portrait",
              isTop && "is-top",
              isTop && flipped && "is-flipped",
              anim?.i === i && anim.type === "toss" && "is-tossing",
              anim?.i === i && anim.type === "return" && "is-returning",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={photo.id}
                className={classes}
                style={{
                  "--x": `${isTop ? x * 0.3 : x}px`,
                  "--y": `${(isTop ? y * 0.3 : y) + slot * 3}px`,
                  "--r": `${isTop ? r * 0.35 : r}deg`,
                  zIndex: VISIBLE - slot,
                }}
                onClick={isTop ? next : undefined}
                onContextMenu={noSave}
                onAnimationEnd={(e) => onAnimationEnd(e, i)}
                aria-hidden={!isTop}
              >
                <div className="print-inner">
                  <div className="print-face print-front">
                    <img
                      src={photo.thumb}
                      alt={isTop ? photo.alt : ""}
                      loading="lazy"
                      draggable={false}
                      onLoad={(e) => markOrientation(e, photo.id)}
                    />
                    {photo.date && (
                      <span className="date-stamp">{photo.date}</span>
                    )}
                  </div>

                  {isTop && (
                    <div className="print-face print-back">
                      <span className="back-note">
                        {photo.caption || "no notes on this one"}
                      </span>
                      {photo.date && (
                        <span className="back-date">{photo.date}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      <div className="print-controls">
        <button
          type="button"
          className="print-btn"
          onClick={prev}
          disabled={count < 2}
          aria-label="Previous print"
        >
          ‹
        </button>

        <span className="print-count" aria-live="polite">
          {pad(seen)} / {pad(count)}
        </span>

        <button
          type="button"
          className="print-btn"
          onClick={next}
          disabled={count < 2}
          aria-label="Next print"
        >
          ›
        </button>
      </div>

      <div className="print-actions">
        <button type="button" className="print-action" onClick={turnOver}>
          {flipped ? "Turn back ↺" : "Turn over ↻"}
        </button>
        <button
          type="button"
          className="print-action"
          onClick={() => setOpenIndex(top)}
        >
          Look closer ⤢
        </button>
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
        />
      )}

      <p className="visually-hidden" aria-live="polite">
        {topPhoto.caption || topPhoto.alt}
      </p>
    </div>
  );
}
