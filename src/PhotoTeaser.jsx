import { ROLLS, ALL_PHOTOS } from "./photos";
import "./Photography.css";

// The small "I take pictures too" section on the home page:
// three prints fanned out, linking to the photography page.
export default function PhotoTeaser() {
  if (ALL_PHOTOS.length === 0) return null;

  // One print from each stack, for variety
  const fan = ROLLS.map((r) => r.photos[0]).slice(0, 3);
  for (const p of ALL_PHOTOS) {
    if (fan.length >= 3) break;
    if (!fan.includes(p)) fan.push(p);
  }

  return (
    <section id="photography" className="teaser-block">
      <div className="work-head">
        <h2 className="work-title">Photography</h2>
        <p className="work-sub">I take pictures too.</p>
      </div>

      <div className="teaser-body">
        <a
          className="teaser-fan"
          href="photography/"
          aria-label={`See all ${ALL_PHOTOS.length} photos`}
        >
          {fan.map((p) => (
            <img
              key={p.id}
              className="teaser-print"
              src={p.thumb}
              alt=""
              loading="lazy"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          ))}
        </a>

        <a className="teaser-link" href="photography/">
          See all {ALL_PHOTOS.length} →
        </a>
      </div>
    </section>
  );
}
