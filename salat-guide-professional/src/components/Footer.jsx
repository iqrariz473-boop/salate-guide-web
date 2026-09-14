import { Link } from "react-router-dom";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "Prayer Times", to: "/prayer-times" },
  { label: "Ramadan Times", to: "/ramadan-times" },
  { label: "Hijri Calendar", to: "/hijri-calendar" },
  { label: "Blog", to: "/blog" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const USEFUL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms and Conditions", to: "/terms" },
  { label: "FAQ", to: "/faq" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
  },
  {
    label: "Instagram",
    href: "#",
  },
  {
    label: "X",
    href: "#",
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer__inner">

        {/* =================================================
            BRAND
        ================================================= */}

        <div className="footer__brand-col">

          <Link to="/" className="footer__brand">

            <span
              className="footer__logo"
              aria-hidden="true"
            >
              ☾
            </span>

            <span>Salat Guide</span>

          </Link>

          <p className="footer__description">
            Salat Guide offers free, accurate prayer
            times, Ramadan timetables, and a full
            Islamic calendar for Muslims in cities
            across the world.
          </p>

          {/* SOCIAL */}

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


        {/* =================================================
            QUICK LINKS
        ================================================= */}

        <nav
          className="footer__column"
          aria-label="Quick Links"
        >

          <h3>Quick Links</h3>

          <span
            className="footer__line"
            aria-hidden="true"
          />

          <ul>

            {QUICK_LINKS.map((link) => (
              <li key={link.to}>

                <Link to={link.to}>
                  {link.label}
                </Link>

              </li>
            ))}

          </ul>

        </nav>


        {/* =================================================
            USEFUL LINKS
        ================================================= */}

        <nav
          className="footer__column"
          aria-label="Useful Links"
        >

          <h3>Useful Links</h3>

          <span
            className="footer__line"
            aria-hidden="true"
          />

          <ul>

            {USEFUL_LINKS.map((link) => (
              <li key={link.to}>

                <Link to={link.to}>
                  {link.label}
                </Link>

              </li>
            ))}

          </ul>

        </nav>


        {/* =================================================
            STAY CONNECTED
        ================================================= */}

        <div className="footer__column footer__contact">

          <h3>Stay Connected</h3>

          <span
            className="footer__line"
            aria-hidden="true"
          />


          {/* WORLDWIDE */}

          <div className="footer__contact-item">

            <span
              className="footer__contact-icon"
              aria-hidden="true"
            >
              ⌖
            </span>

            <div>

              <strong>Worldwide</strong>

              <p>
                Serving Muslims worldwide
              </p>

            </div>

          </div>


          {/* EMAIL */}

          <div className="footer__contact-item">

            <span
              className="footer__contact-icon"
              aria-hidden="true"
            >
              ✉
            </span>

            <div>

              <strong>Email</strong>

              <p>
                contact@salatguide.com
              </p>

            </div>

          </div>


          {/* PHONE */}

          <div className="footer__contact-item">

            <span
              className="footer__contact-icon"
              aria-hidden="true"
            >
              ☎
            </span>

            <div>

              <strong>Phone</strong>

              <p>
                +92 318 6868582
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          BOTTOM
      ================================================= */}

      <div className="footer__bottom-wrapper">

        <div className="footer__bottom">

          <p>
            Free Islamic prayer times at salatguide.com
          </p>

          <p>
            Copyright © {year} Salat Guide. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;