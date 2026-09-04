import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MenuIcon,
  CloseIcon,
  SearchIcon,
} from "./Icons.jsx";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Prayer Times", to: "/prayer-times" },
  { label: "Qibla", to: "/qibla" },
  { label: "Duas", to: "/duas" },
  { label: "Quran", to: "/quran" },
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/about" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    navigate(`/prayer-times?city=${encodeURIComponent(value)}`);
    closeMenu();
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">

        {/* =========================
            LOGO
        ========================== */}

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


        {/* =========================
            NAVIGATION
        ========================== */}

        <nav
          className={`navbar__nav ${
            isMenuOpen ? "navbar__nav--open" : ""
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


          {/* =========================
              MOBILE SEARCH
          ========================== */}

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


        {/* =========================
            DESKTOP SEARCH
        ========================== */}

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


        {/* =========================
            MOBILE MENU
        ========================== */}

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() =>
            setIsMenuOpen((open) => !open)
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
