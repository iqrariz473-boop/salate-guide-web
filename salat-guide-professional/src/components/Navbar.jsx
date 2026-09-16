import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  MenuIcon,
  CloseIcon,
} from "./Icons.jsx";

import "./Navbar.css";

/* =========================================================
   NAVIGATION LINKS
========================================================= */

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Prayer Times", to: "/prayer-times" },
  { label: "Qibla", to: "/qibla" },
  { label: "Duas", to: "/duas" },
  { label: "Quran", to: "/quran" },
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/about" },
];

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* =======================================================
     CLOSE MENU
  ======================================================= */

  function closeMenu() {
    setIsMenuOpen(false);
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <header className="navbar">

      <div className="container navbar__inner">

        {/* =================================================
            LOGO
        ================================================= */}

        <NavLink
          to="/"
          className="navbar__brand"
          onClick={closeMenu}
        >
          <span
            className="navbar__brand-mark"
            aria-hidden="true"
          >
            <span className="navbar__brand-glow" />

            <span className="navbar__brand-moon">
              ☾
            </span>
          </span>

          <span className="navbar__brand-text">
            <span className="navbar__brand-main">
              Salat
            </span>

            <span className="navbar__brand-sub">
              Guide
            </span>
          </span>
        </NavLink>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className={`navbar__nav ${
            isMenuOpen
              ? "navbar__nav--open"
              : ""
          }`}
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "navbar__link navbar__link--active"
                      : "navbar__link"
                  }
                >
                  <span className="navbar__link-text">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* =================================================
            CONTACT CTA
        ================================================= */}

        <div className="navbar__actions">
          <NavLink
            to="/contact"
            className="navbar__contact-btn"
            onClick={closeMenu}
          >
            <span className="navbar__contact-icon">
              ✦
            </span>

            <span>Contact</span>
          </NavLink>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() =>
            setIsMenuOpen((open) => !open)
          }
        >
          <span className="navbar__toggle-inner">
            {isMenuOpen ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;