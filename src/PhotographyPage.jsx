import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./Photography.css";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import PrintStack from "./PrintStack";
import PhotoGrid from "./PhotoGrid";
import { ROLLS, ALL_PHOTOS } from "./photos";

// One stack, with its own "Organize by grid" / "Stack 'em again" switch
function Roll({ roll, showTitle }) {
  const [asGrid, setAsGrid] = useState(false);
  const sectionRef = useRef(null);

  const toggle = () => {
    setAsGrid((g) => !g);
    // If the top of this stack is off screen, bring it back into view
    requestAnimationFrame(() => {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const label = asGrid ? "Stack 'em again" : "Organize by grid";

  return (
    <section
      className={`roll-section${asGrid ? " is-grid" : ""}`}
      id={roll.slug}
      ref={sectionRef}
    >
      <div className="roll-head">
        {showTitle && <h2 className="roll-title">{roll.label}</h2>}
        {roll.note && <p className="roll-note">{roll.note}</p>}
        <button type="button" className="roll-toggle" onClick={toggle}>
          {label}
        </button>
      </div>

      <div className="view-swap" key={asGrid ? "grid" : "stack"}>
        {asGrid ? (
          <>
            <PhotoGrid photos={roll.photos} />
            {roll.photos.length > 6 && (
              <div className="roll-foot">
                <button type="button" className="roll-toggle" onClick={toggle}>
                  {label}
                </button>
              </div>
            )}
          </>
        ) : (
          <PrintStack photos={roll.photos} first={roll.first} />
        )}
      </div>
    </section>
  );
}

export default function PhotographyPage() {
  // Same header-on-scroll effect as the home page
  useEffect(() => {
    const header = document.querySelector(".site-header");
    const onScroll = () =>
      header?.classList.toggle("is-scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [allGrid, setAllGrid] = useState(false);

  const switchView = () => {
    setAllGrid((g) => !g);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasPhotos = ROLLS.length > 0;

  return (
    <>
      <SiteHeader page="photography" />

      <main className="photo-page">
        <div className="work-head photo-page-head">
          <h1 className="work-title">Photography</h1>
          <p className="work-sub">
            All attempts as capturing what a singular moment was like, in the event words fail me.
          </p>

          {hasPhotos && (
            <button type="button" className="mode-toggle" onClick={switchView}>
              {allGrid ? "← Back to the stacks" : "See them all in a grid"}
            </button>
          )}
        </div>

        {!hasPhotos ? (
          <p className="photo-empty">No photos yet. Check back soon.</p>
        ) : (
          <div className="view-swap" key={allGrid ? "all" : "stacks"}>
            {allGrid ? (
              <section className="all-grid">
                <PhotoGrid photos={ALL_PHOTOS} />
                <div className="roll-foot">
                  <button type="button" className="mode-toggle" onClick={switchView}>
                    ← Back to the stacks
                  </button>
                </div>
              </section>
            ) : (
              <div className="roll-shelf">
                {ROLLS.map((roll) => (
                  <Roll key={roll.slug} roll={roll} showTitle={ROLLS.length > 1} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
