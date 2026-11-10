import instagram from "./assets/Instagram.png";
import youtube from "./assets/YouTube.png";
import xicon from "./assets/X.png";
import tiktok from "./assets/TikTok.png";
import spotify from "./assets/Spotify.png";

// page="home"        -> links jump around the home page
// page="photography" -> links go back to the home page
export default function SiteHeader({ page = "home" }) {
  const onHome = page === "home";
  const home = onHome ? "" : "../";

  return (
    <header className="site-header">
      <div className="header-inner brand">
        {onHome ? (
          <div className="brand-name">Katie Elizabeth Brown | Writer</div>
        ) : (
          <a className="brand-name" href="../">
            Katie Elizabeth Brown | Writer
          </a>
        )}

        <nav className="nav">
          <a href={`${home}#about`}>About</a>
          <a href={`${home}#work`}>Manuscripts</a>
          <a
            href={onHome ? "photography/" : "./"}
            aria-current={onHome ? undefined : "page"}
          >
            Photography
          </a>

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
  );
}
