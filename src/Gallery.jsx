import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Gallery.css";

// Every image in src/assets/photography/ is picked up automatically.
// Files are shown in filename order, so prefix them (01-, 02-, ...) to control order.
const files = import.meta.glob(
  "./assets/photography/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}",
  { eager: true, import: "default" }
);

// Optional: what's "written on the back" of each print, keyed by filename.
// PLACEHOLDER TEXT — swap in the real notes.
const CAPTIONS = {
  "Americana (Man Working on Car).jpg": "americana, somewhere off the highway",
  "Antibes beach.jpg": "antibes, the water was colder than it looked",
  "Antibes Hotel Selfie.jpg": "hotel mirror, antibes",
  "Antibes Lanterns.jpg": "lanterns in the old town, antibes",
  "Arles Farmers Market Spices.jpg": "spices at the saturday market, arles",
  "Arles Hidden Figures.jpg": "hidden figures, arles",
  "Arles Vincent Wall.jpg": "vincent's wall, arles",
  "AustinMotel.jpg": "austin motel, south congress",
  "Bubbles Selfie.jpg": "bubbles",
  "Cannes Beach.jpg": "cannes, late afternoon",
  "Cannes others selfie.jpg": "all of us, cannes",
  "Cannes.jpg": "cannes",
  "CinestillWalkCongress.jpg": "cinestill walk down congress",
  "Closer mom and baby.jpg": "mom and baby, up close",
  "ColorfulHouse.jpg": "the colorful house",
  "Deadbreakfast.jpg": "breakfast with the dead",
  "Dean Foot Up.jpg": "dean, foot up",
  "Ellie at Palomino.jpg": "ellie at the palomino",
  "FunRunningHalloween.jpg": "running, halloween night",
  "Girls chat Mueller.jpg": "girls talking, mueller",
  "Girls in the rain mueller.jpg": "caught in the rain at mueller",
  "GoatHouse.jpg": "the goat house",
  "GoatHouseTalafreako.jpg": "the goat house, again",
  "Halloween portrait'26.jpg": "halloween portrait, '26",
  "HalloweenStreet.jpg": "our street on halloween",
  "Kahla Dreamy.jpg": "kahla, dreamy",
  "Kahla Long Goodbye Hair.jpg": "kahla at the long goodbye",
  "Kahla to camera dreamy.jpg": "kahla, looking right at me",
  "Kelsey Black background.jpg": "kelsey",
  "Kelsey green teeth.jpg": "kelsey, green teeth",
  "KelseyleaningonSkeleton.jpg": "kelsey and her new friend",
  "Library Rooftop.jpg": "library rooftop",
  "Light on face car.jpg": "light through the car window",
  "McKenna Pal.jpg": "mckenna",
  "MeganTakingPic.jpg": "megan taking a picture of me taking a picture",
  "Mirror Room Selfie.jpg": "mirror room",
  "Mom and Baby - Nat's Party.jpg": "mom and baby at nat's party",
  "Mougins.jpg": "mougins",
  "Nat delighted with Dean.jpg": "nat, delighted with dean",
  "Natalie Long Goodbye Cheers.jpg": "natalie, cheers at the long goodbye",
  "Nice Beau Rivage.jpg": "beau rivage, nice",
  "Nice.jpg": "nice",
  "NoVacancy.jpg": "no vacancy",
  "Orangehouse.jpg": "the orange house",
  "Pal Big Eye selife.jpg": "big eye",
  "Panic Back.jpg": "panic, from behind",
  "Panic double.jpg": "panic, double exposure",
  "Paramount looking at pictures.jpg": "looking at pictures, the paramount",
  "Paramunt Best shot.jpg": "the paramount — best one on the roll",
  "Parmount Street Light.jpg": "streetlight outside the paramount",
  "Pink Oxfords Selfie.jpg": "pink oxfords",
  "Rachel in Blue.jpg": "rachel in blue",
  "Rachel in Yellow.jpg": "rachel in yellow",
  "Red Lips Pouty.jpg": "red lips",
  "Shipe Pool.jpg": "shipe pool, summer",
  "SkeletonsOrange.jpg": "skeletons on orange",
  "Stuffed Lamb.jpg": "the stuffed lamb",
  "Tav very serious.jpg": "tav, very serious",
  "Tracey at Radio.jpg": "tracey at radio",
  "Van Gogh yellow wall.jpg": "the yellow wall van gogh painted",
  "Yellow House in Hyde Park.jpg": "yellow house in hyde park",
};

// Optional: real date stamps, keyed by filename. Format like the camera did it.
// PLACEHOLDER DATES — swap in the real ones.
const DATES = {
  "Americana (Man Working on Car).jpg": "'25 8 3",
  "Antibes beach.jpg": "'25 6 12",
  "Antibes Hotel Selfie.jpg": "'25 6 11",
  "Antibes Lanterns.jpg": "'25 6 12",
  "Arles Farmers Market Spices.jpg": "'25 6 7",
  "Arles Hidden Figures.jpg": "'25 6 7",
  "Arles Vincent Wall.jpg": "'25 6 8",
  "AustinMotel.jpg": "'25 4 19",
  "Bubbles Selfie.jpg": "'25 5 2",
  "Cannes Beach.jpg": "'25 6 14",
  "Cannes others selfie.jpg": "'25 6 14",
  "Cannes.jpg": "'25 6 15",
  "CinestillWalkCongress.jpg": "'25 3 22",
  "Closer mom and baby.jpg": "'25 9 20",
  "ColorfulHouse.jpg": "'25 3 9",
  "Deadbreakfast.jpg": "'25 11 1",
  "Dean Foot Up.jpg": "'25 9 20",
  "Ellie at Palomino.jpg": "'25 7 18",
  "FunRunningHalloween.jpg": "'25 10 31",
  "Girls chat Mueller.jpg": "'25 4 5",
  "Girls in the rain mueller.jpg": "'25 4 5",
  "GoatHouse.jpg": "'25 2 16",
  "GoatHouseTalafreako.jpg": "'25 2 16",
  "Halloween portrait'26.jpg": "'26 10 31",
  "HalloweenStreet.jpg": "'25 10 31",
  "Kahla Dreamy.jpg": "'25 8 23",
  "Kahla Long Goodbye Hair.jpg": "'25 8 30",
  "Kahla to camera dreamy.jpg": "'25 8 23",
  "Kelsey Black background.jpg": "'25 10 25",
  "Kelsey green teeth.jpg": "'25 10 25",
  "KelseyleaningonSkeleton.jpg": "'25 10 25",
  "Library Rooftop.jpg": "'25 3 29",
  "Light on face car.jpg": "'25 7 6",
  "McKenna Pal.jpg": "'25 5 17",
  "MeganTakingPic.jpg": "'25 5 17",
  "Mirror Room Selfie.jpg": "'25 1 25",
  "Mom and Baby - Nat's Party.jpg": "'25 9 20",
  "Mougins.jpg": "'25 6 13",
  "Nat delighted with Dean.jpg": "'25 9 20",
  "Natalie Long Goodbye Cheers.jpg": "'25 8 30",
  "Nice Beau Rivage.jpg": "'25 6 10",
  "Nice.jpg": "'25 6 10",
  "NoVacancy.jpg": "'25 4 19",
  "Orangehouse.jpg": "'25 3 9",
  "Pal Big Eye selife.jpg": "'25 5 17",
  "Panic Back.jpg": "'25 12 6",
  "Panic double.jpg": "'25 12 6",
  "Paramount looking at pictures.jpg": "'25 2 8",
  "Paramunt Best shot.jpg": "'25 2 8",
  "Parmount Street Light.jpg": "'25 2 8",
  "Pink Oxfords Selfie.jpg": "'25 5 2",
  "Rachel in Blue.jpg": "'25 7 12",
  "Rachel in Yellow.jpg": "'25 7 12",
  "Red Lips Pouty.jpg": "'25 1 25",
  "Shipe Pool.jpg": "'25 7 26",
  "SkeletonsOrange.jpg": "'25 10 18",
  "Stuffed Lamb.jpg": "'25 11 15",
  "Tav very serious.jpg": "'25 11 15",
  "Tracey at Radio.jpg": "'25 3 1",
  "Van Gogh yellow wall.jpg": "'25 6 8",
  "Yellow House in Hyde Park.jpg": "'25 3 9",
};

// Photos without a date above get a made-up 90s date, counting forward
// from this one, like a roll shot over a few weeks. Set to null for no stamp.
const ROLL_START = new Date(1998, 5, 14); // June 14, 1998 (months start at 0)

// Printed on the lab envelope
const LAB_NAME = "1-HOUR PHOTO";

// true  = the pile is shuffled on every visit, so different photos end up on top
// false = always starts in filename order
const SHUFFLE_ON_LOAD = true;

// How spread out the pile is: 1 = tight stack, 2 = spread out, 3 = tossed across the table
const SPREAD = 2.2;

// How many prints to draw in the pile at once (the rest are "underneath")
const VISIBLE = 9;

// "01-east-side-morning.jpg" -> "East side morning" (used as alt text)
const altFromName = (name) => {
  const base = name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "Photograph";
};

// Repeatable "random" numbers so the pile is messy the same way every visit
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const stamp = (d) =>
  `'${String(d.getFullYear()).slice(2)} ${d.getMonth() + 1} ${String(
    d.getDate()
  ).padStart(2, " ")}`;

const PHOTOS = (() => {
  const day = ROLL_START ? new Date(ROLL_START) : null;
  return Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src], i) => {
      const name = path.split("/").pop();
      let date = DATES[name] || "";
      if (!date && day) {
        date = stamp(day);
        day.setDate(day.getDate() + Math.floor(rand(i * 13.7) * 3)); // 0–2 days later
      }
      return {
        src,
        name,
        alt: altFromName(name),
        caption: CAPTIONS[name] || "",
        date,
        // each print has its own messy angle and nudge in the pile
        r: (rand(i * 3.1) - 0.5) * 16 * (1 + (SPREAD - 1) * 0.4),
        x: (rand(i * 5.7) - 0.5) * 36 * SPREAD,
        y: (rand(i * 7.3) - 0.5) * 24 * SPREAD,
      };
    });
})();

const pad = (n) => String(n).padStart(2, "0");
const noSave = (e) => e.preventDefault();
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


function Lightbox({ index, onClose, onPrev, onNext }) {
  const photo = PHOTOS[index];

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

      {PHOTOS.length > 1 && (
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
        key={photo.name}
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
        <figcaption className="lightbox-caption">
          {photo.caption && (
            <span className="lightbox-note">{photo.caption}</span>
          )}
        </figcaption>
      </figure>

      {PHOTOS.length > 1 && (
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

export default function Gallery() {
  const [order, setOrder] = useState(() => {
    const o = PHOTOS.map((_, i) => i);
    if (SHUFFLE_ON_LOAD) {
      for (let i = o.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [o[i], o[j]] = [o[j], o[i]];
      }
    }
    return o;
  });
  const [anim, setAnim] = useState(null); // { i, type: "toss" | "return" }
  const [flipped, setFlipped] = useState(false);
  const [portrait, setPortrait] = useState({}); // which photos are vertical
  const [openIndex, setOpenIndex] = useState(null);
  const touchX = useRef(null);

  const top = order[0];
  // how far through the pile you are (not the photo's file number, since it's shuffled)
  const [seen, setSeen] = useState(1);
  const visible = useMemo(() => order.slice(0, VISIBLE), [order]);

  // ----- Flip through the stack -----
  const next = useCallback(() => {
    if (anim || PHOTOS.length < 2) return;
    setFlipped(false);
    setSeen((s) => (s % PHOTOS.length) + 1);
    if (prefersReducedMotion()) {
      setOrder((o) => [...o.slice(1), o[0]]);
      return;
    }
    setAnim({ i: order[0], type: "toss" });
  }, [anim, order]);

  const prev = useCallback(() => {
    if (anim || PHOTOS.length < 2) return;
    setFlipped(false);
    setSeen((s) => (s === 1 ? PHOTOS.length : s - 1));
    const last = order[order.length - 1];
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
    if (!prefersReducedMotion()) setAnim({ i: last, type: "return" });
  }, [anim, order]);

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
    () => setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length),
    []
  );
  const lightboxNext = useCallback(
    () => setOpenIndex((i) => (i + 1) % PHOTOS.length),
    []
  );
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  const markOrientation = (e, name) => {
    const img = e.currentTarget;
    const isPortrait = img.naturalHeight > img.naturalWidth;
    setPortrait((p) => (p[name] === isPortrait ? p : { ...p, [name]: isPortrait }));
  };

  if (PHOTOS.length === 0) return null;

  const topPhoto = PHOTOS[top];

  return (
    <section id="photography" className="gallery-block">
      <div className="work-head">
        <h2 className="work-title">Photography</h2>
        <p className="work-sub">Just picked these up. Flip through.</p>
      </div>

      <div
        className="print-stage"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Stack of photo prints. Left and right arrows flip through, Enter opens the top print, T turns it over."
      >
        {/* Photo lab envelope under the pile */}
        <div className="envelope" aria-hidden="true">
          <span className="envelope-flap" />
          <span className="envelope-lab">{LAB_NAME}</span>
          <span className="envelope-row">
            <span>☑ DOUBLE PRINTS</span>
            <span>
              {PHOTOS.length > 36
                ? `${Math.ceil(PHOTOS.length / 24)} ROLLS`
                : `${PHOTOS.length} EXP`}
            </span>
          </span>
          <span className="envelope-row envelope-name">
            <span>NAME</span>
            <span className="envelope-hand">Katie B.</span>
          </span>
        </div>

        {visible
          .map((i, slot) => ({ i, slot }))
          .reverse() // draw the bottom of the pile first
          .map(({ i, slot }) => {
            const photo = PHOTOS[i];
            const isTop = slot === 0;
            const tilt = isTop ? photo.r * 0.35 : photo.r;
            const classes = [
              "print",
              portrait[photo.name] && "is-portrait",
              isTop && "is-top",
              isTop && flipped && "is-flipped",
              anim?.i === i && anim.type === "toss" && "is-tossing",
              anim?.i === i && anim.type === "return" && "is-returning",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={photo.name}
                className={classes}
                style={{
                  "--x": `${isTop ? photo.x * 0.3 : photo.x}px`,
                  "--y": `${(isTop ? photo.y * 0.3 : photo.y) + slot * 3}px`,
                  "--r": `${tilt}deg`,
                  zIndex: VISIBLE - slot,
                }}
                onClick={isTop ? next : undefined}
                onContextMenu={noSave}
                onAnimationEnd={(e) => onAnimationEnd(e, i)}
                aria-hidden={!isTop}
              >
                <div className="print-inner">
                  {/* Front */}
                  <div className="print-face print-front">
                    <img
                      src={photo.src}
                      alt={isTop ? photo.alt : ""}
                      loading="lazy"
                      draggable={false}
                      onLoad={(e) => markOrientation(e, photo.name)}
                    />
                    {photo.date && (
                      <span className="date-stamp">{photo.date}</span>
                    )}
                  </div>

                  {/* Back */}
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
          disabled={PHOTOS.length < 2}
          aria-label="Previous print"
        >
          ‹
        </button>

        <span className="print-count" aria-live="polite">
          {pad(seen)} / {pad(PHOTOS.length)}
        </span>

        <button
          type="button"
          className="print-btn"
          onClick={next}
          disabled={PHOTOS.length < 2}
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
          index={openIndex}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
        />
      )}

      {/* screen readers: what's on top right now */}
      <p className="visually-hidden" aria-live="polite">
        {topPhoto.caption || topPhoto.alt}
      </p>
    </section>
  );
}