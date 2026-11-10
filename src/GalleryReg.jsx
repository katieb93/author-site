import { useCallback, useEffect, useState } from "react";
import "./Gallery.css";

// Every image in src/assets/photography/ is picked up automatically.
// Files are shown in filename order, so prefix them (01-, 02-, ...) to control order.
const files = import.meta.glob(
  "./assets/photography/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}",
  { eager: true, import: "default" }
);

// Optional: captions keyed by filename. Leave a photo out to show no caption.
const CAPTIONS = {
  // "01-east-side-morning.jpg": "East Austin, early morning",
};

// "01-east-side-morning.jpg" -> "East side morning"
const altFromName = (name) => {
  const base = name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "Photograph";
};

const PHOTOS = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const name = path.split("/").pop();
    return {
      src,
      name,
      alt: altFromName(name),
      caption: CAPTIONS[name] || "",
    };
  });

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

  // Basic swipe support on phones
  const [touchX, setTouchX] = useState(null);
  const onTouchStart = (e) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (dx > 50) onPrev();
    if (dx < -50) onNext();
    setTouchX(null);
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
        className="lightbox-figure"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img className="lightbox-img" src={photo.src} alt={photo.alt} />
        <figcaption className="lightbox-caption">
          {photo.caption && <span>{photo.caption}</span>}
          <span className="lightbox-count">
            {index + 1} / {PHOTOS.length}
          </span>
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
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length),
    []
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i + 1) % PHOTOS.length),
    []
  );

  if (PHOTOS.length === 0) return null;

  return (
    <section id="photography" className="gallery-block">
      <div className="work-head">
        <h2 className="work-title">Photography</h2>
        <p className="work-sub">Things I've seen along the way.</p>
      </div>

      <div className="gallery-grid">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.name}
            className="gallery-item"
            onClick={() => setOpenIndex(i)}
            type="button"
            aria-label={`Open photo: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            {photo.caption && (
              <span className="gallery-caption">{photo.caption}</span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
