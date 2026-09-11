import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import LocationSearch from "./LocationSearch.jsx";
import {
  MenuIcon,
  CloseIcon,
  SearchIcon,
} from "./Icons.jsx";

import { useCityContext } from "../context/LocationContext.jsx";

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
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();

  /* =======================================================
     LOCATION CONTEXT
  ======================================================= */

  const {
    city,
    country,
    selectCity,
  } = useCityContext();

  /* =======================================================
     CLOSE MENU
  ======================================================= */

  function closeMenu() {
    setIsMenuOpen(false);
  }

  /* =======================================================
     SEARCH CITY
  ======================================================= */

  function handleSearchSubmit(event) {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    /*
      Allow:

      Lahore

      OR

      Dubai, UAE

      OR

      London, United Kingdom
    */

    let selectedCity = value;
    let selectedCountry = country;

    /*
      If user writes:

      Dubai, UAE

      split city + country
    */

    if (value.includes(",")) {
      const parts = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (parts.length >= 2) {
        selectedCity = parts[0];
        selectedCountry = parts
          .slice(1)
          .join(", ");
      }
    }

    /*
      IMPORTANT:

      Update shared LocationContext.

      This automatically causes:

      usePrayerTimes(city, country)

      to run again.
    */

    selectCity(
      selectedCity,
      selectedCountry
    );

    /*
      Go to Prayer Times page using React Router.

      This is NOT a browser reload.
    */

    navigate("/prayer-times");

    /*
      Clear search input.
    */

    setSearch("");

    /*
      Close mobile menu.
    */

    closeMenu();
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
            <span className="navbar__brand-moon">
              ☾
            </span>
          </span>

          <span className="navbar__brand-text">
            <span>Salat</span>
            <span>Guide</span>
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
                  {link.label}
                </NavLink>

              </li>
            ))}
          </ul>

          {/* ===============================================
              MOBILE SEARCH
          =============================================== */}

          <form
            className="navbar__search navbar__search--mobile"
            onSubmit={handleSearchSubmit}
          >

            <SearchIcon
              width={17}
              height={17}
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search city..."
              aria-label="Search city"
            />

            <button type="submit">
              Search
            </button>

          </form>

        </nav>

        {/* =================================================
            DESKTOP SEARCH
        ================================================= */}

        <div className="navbar__actions">

          <form
            className="navbar__search"
            onSubmit={handleSearchSubmit}
          >

            <SearchIcon
              width={18}
              height={18}
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search city..."
              aria-label="Search city"
            />

            <button type="submit">
              Search
            </button>

          </form>

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
            setIsMenuOpen(
              (open) => !open
            )
          }
        >
          {isMenuOpen ? (
            <CloseIcon />
          ) : (
            <MenuIcon />
          )}
        </button>

      </div>

    </header>
  );
}

export default Navbar;