import { useCallback, useEffect, useRef, useState } from "react";
import { Lightbox } from "./PrintStack";
import "./PhotoGrid.css";

const noSave = (e) => e.preventDefault();

// The tidy grid: photos keep their natural shape, lavender borders,
// fade up as you scroll to them, caption slides up on hover.
export default function PhotoGrid({ photos, showDates = false }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [shown, setShown] = useState(() => new Set());
  const gridRef = useRef(null);

  // Fade each photo in as it scrolls into view
  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".grid-item") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.dataset.index);
            setShown((prev) => new Set(prev).add(i));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [photos]);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i + 1) % photos.length),
    [photos.length]
  );

  return (
    <>
      <div className="photo-grid" ref={gridRef}>
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            data-index={i}
            className={`grid-item ${shown.has(i) ? "is-visible" : ""}`}
            style={{ "--delay": `${(i % 3) * 90}ms` }}
            onClick={() => setOpenIndex(i)}
            onContextMenu={noSave}
            aria-label={`Open photo: ${photo.caption || photo.alt}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              draggable={false}
            />
            {showDates && photo.date && (
              <span className="grid-date">{photo.date}</span>
            )}
            {photo.caption && (
              <span className="grid-caption">{photo.caption}</span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
