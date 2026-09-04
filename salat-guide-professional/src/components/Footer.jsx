import { Link } from "react-router-dom";
import "./Footer.css";

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Prayer Times", to: "/prayer-times" },
  { label: "Cities", to: "/cities" },
  { label: "Prayer Guide", to: "/prayer-guide" },
  { label: "Pillars", to: "/pillars" },
  { label: "Qibla", to: "/qibla" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer__inner">

        {/* BRAND */}
        <div className="footer__brand-col">

          <Link to="/" className="footer__brand">

            <span className="footer__moon" aria-hidden="true">
              ☾
            </span>

            <span>Salat Guide</span>

          </Link>

          <p className="footer__description">
            Accurate Islamic prayer times, Qibla direction,
            and prayer guidance for Muslims worldwide.
          </p>

          <div className="footer__social">

            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}

          </div>

        </div>


        {/* EXPLORE */}
        <nav
          className="footer__column"
          aria-label="Explore"
        >

          <h3>Explore</h3>

          <span className="footer__line"></span>

          <ul>

            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}

          </ul>

        </nav>


        {/* LEGAL */}
        <div className="footer__column">

          <h3>Legal</h3>

          <span className="footer__line"></span>

          <ul>

            <li>
              <Link to="/privacy">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms">
                Terms
              </Link>
            </li>

          </ul>

        </div>


        {/* CONTACT */}
        <div className="footer__column footer__contact">

          <h3>Stay Connected</h3>

          <span className="footer__line"></span>


          <div className="footer__contact-item">

            <span className="footer__contact-icon">
              ✦
            </span>

            <div>
              <strong>Worldwide</strong>

              <p>
                Serving Muslims worldwide
              </p>
            </div>

          </div>


          <div className="footer__contact-item">

            <span className="footer__contact-icon">
              @
            </span>

            <div>
              <strong>Email</strong>

              <p>
                contact@salatguide.com
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* BOTTOM */}
      <div className="footer__bottom-wrapper">

        <div className="footer__bottom">

          <p>
            © {year}{" "}
            <strong>Salat Guide</strong>.
            All rights reserved.
          </p>

          <p className="footer__tagline">
            A simple companion for your daily prayers.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;