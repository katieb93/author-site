import { LAB_NAME } from "./photos";
import "./Envelope.css";

// A lavender photo-lab envelope with a few prints peeking out the top.
// Pass `href` to make it a link, or `onOpen` to make it a button.
export default function Envelope({ label, note, photos, countText, href, onOpen }) {
  const peek = photos.slice(0, 3);
  const Tag = href ? "a" : "button";

  return (
    <Tag
      className="envelope-card"
      href={href}
      type={href ? undefined : "button"}
      onClick={onOpen}
      aria-label={`${label}, ${photos.length} photos`}
    >
      <span className="env-peek" aria-hidden="true">
        {peek.map((p) => (
          <img
            key={p.name}
            className="env-print"
            src={p.src}
            alt=""
            loading="lazy"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        ))}
      </span>

      <span className="env-body">
        <span className="env-flap" aria-hidden="true" />
        <span className="env-lab">{LAB_NAME}</span>
        <span className="env-label">{label}</span>
        {note && <span className="env-note">{note}</span>}
        <span className="env-row">
          <span>☑ DOUBLE PRINTS</span>
          <span>{countText || `${photos.length} EXP`}</span>
        </span>
      </span>
    </Tag>
  );
}
