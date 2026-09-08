import { Link } from "react-router-dom";

import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import PrayerTimesCard from "../components/PrayerTimesCard.jsx";

import { useCityContext } from "../context/LocationContext.jsx";
import usePrayerTimes from "../hooks/usePrayerTimes.js";

import "./Home.css";

/* =========================================================
   ISLAMIC TOOLS
========================================================= */

const ISLAMIC_TOOLS = [
  {
    id: "good-deeds",
    icon: "🌱",
    title: "Good Deed Ideas",
    description:
      "Discover simple meaningful deeds you can practice throughout your day.",
    to: "/good-deeds",
    action: "Get Ideas",
  },
  {
    id: "night-worship",
    icon: "🌙",
    title: "Night Worship Planner",
    description:
      "Build a peaceful nighttime worship routine with Tahajjud, Witr, and reflection.",
    to: "/night-worship",
    action: "Plan Tonight",
  },
  {
    id: "worship-streak",
    icon: "🔥",
    title: "Worship Streak",
    description:
      "Track your consistency and build a positive daily worship habit.",
    to: "/worship-streak",
    action: "View Streak",
  },
  {
    id: "islamic-reflection",
    icon: "💭",
    title: "Islamic Reflection",
    description:
      "Take a quiet moment each day to reflect on faith, gratitude, and personal growth.",
    to: "/reflection",
    action: "Reflect Today",
  },
  {
    id: "worship-challenge",
    icon: "🎯",
    title: "Worship Challenge",
    description:
      "Take part in simple 7-day and 30-day challenges to build meaningful habits.",
    to: "/worship-challenge",
    action: "Start Challenge",
  },
  {
    id: "ramadan-countdown",
    icon: "🌙",
    title: "Ramadan Countdown",
    description:
      "See how many days remain until Ramadan and prepare your heart for the blessed month.",
    to: "/ramadan-countdown",
    action: "View Countdown",
  },
];

/* =========================================================
   POPULAR CITIES
========================================================= */

const POPULAR_CITIES = [
  {
    city: "Lahore",
    country: "Pakistan",
    icon: "☾",
  },
  {
    city: "Karachi",
    country: "Pakistan",
    icon: "✦",
  },
  {
    city: "Islamabad",
    country: "Pakistan",
    icon: "⌖",
  },
  {
    city: "Dubai",
    country: "UAE",
    icon: "◈",
  },
  {
    city: "London",
    country: "United Kingdom",
    icon: "✧",
  },
  {
    city: "Makkah",
    country: "Saudi Arabia",
    icon: "♢",
  },
];

/* =========================================================
   FEATURES
========================================================= */

const FEATURES = [
  {
    icon: "◷",
    title: "Accurate Prayer Times",
    description:
      "Stay updated with daily Fajr, Dhuhr, Asr, Maghrib and Isha timings.",
  },
  {
    icon: "⌖",
    title: "Find Qibla",
    description:
      "Quickly discover the direction of the Kaaba from your location.",
  },
  {
    icon: "▣",
    title: "Quran Reading",
    description:
      "Take a peaceful moment to read and reflect on Quranic verses.",
  },
  {
    icon: "☾",
    title: "Daily Duas",
    description:
      "Keep meaningful duas close for everyday life and special moments.",
  },
];

/* =========================================================
   REUSABLE SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <div
      className={`home-section-heading ${
        centered ? "home-section-heading--center" : ""
      }`}
    >
      <span>{eyebrow}</span>

      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </div>
  );
}

/* =========================================================
   HOME COMPONENT
========================================================= */

function Home() {
  const { city, country, selectCity } = useCityContext();

  const {
    prayers,
    status,
    errorMessage,
    hijriDate,
    methodName,
    isFallback,
  } = usePrayerTimes(city, country);

  /* =======================================================
     CITY SELECT
  ======================================================= */

  function handleCitySelect(selectedCity, selectedCountry) {
    selectCity(selectedCity, selectedCountry);
  }

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}

      <Seo
        title="Home"
        description="Find accurate Islamic prayer times, Quran verses, Qibla direction and daily duas."
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero />

      {/* =====================================================
          PRAYER TIMES
      ===================================================== */}

      <section className="section home-prayer-section">
        <div className="container">
          <SectionHeading
            eyebrow="Today's Salah"
            title={`Prayer Times for ${city}`}
            description="Stay connected with your five daily prayers."
          />

          <PrayerTimesCard
            city={city}
            country={country}
            status={status}
            errorMessage={errorMessage}
            prayers={prayers}
            hijriDate={hijriDate}
            methodName={methodName}
            isFallback={isFallback}
            onRetry={() => selectCity(city, country)}
          />

          <div className="home__more-link">
            <Link
              to="/prayer-times"
              className="btn-link"
              aria-label="View full prayer times"
            >
              View full prayer times
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          QURAN VERSE
      ===================================================== */}

      <section className="home-quran-section">
        <div className="container">
          <div className="home-quran-card">
            <div
              className="home-quran-card__pattern"
              aria-hidden="true"
            />

            <div className="home-quran-card__content">
              <div className="home-quran-card__label">
                <span aria-hidden="true">▣</span>
                <span>Quran Verse of the Day</span>
              </div>

              <div
                className="home-quran-card__arabic"
                dir="rtl"
                lang="ar"
              >
                إِنَّ مَعَ الْعُسْرِ يُسْرًا
              </div>

              <p className="home-quran-card__translation">
                “Indeed, with hardship comes ease.”
              </p>

              <div className="home-quran-card__bottom">
                <span>Surah Ash-Sharh · 94:6</span>

                <Link
                  to="/quran"
                  aria-label="Read Quran"
                >
                  Read Quran
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK ISLAMIC TOOLS
      ===================================================== */}

      <section className="home-tools-section">
        <div className="container">
          <SectionHeading
            eyebrow="Explore"
            title="Quick Islamic Tools"
            description="Useful Islamic resources designed for everyday life."
            centered
          />

          <div className="home-tools-grid">
            {ISLAMIC_TOOLS.map((tool) => (
              <Link
                to={tool.to}
                className="home-tool-card"
                key={tool.id}
                aria-label={`${tool.title} - ${tool.action}`}
              >
                <div
                  className="home-tool-card__icon"
                  aria-hidden="true"
                >
                  {tool.icon}
                </div>

                <div className="home-tool-card__content">
                  <h3>{tool.title}</h3>

                  <p>{tool.description}</p>

                  <span className="home-tool-card__link">
                    {tool.action}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY SALAT GUIDE
      ===================================================== */}

      <section className="home-features-section">
        <div className="container">
          <SectionHeading
            eyebrow="Why Salat Guide?"
            title="Your Simple Islamic Companion"
            description="Helpful tools designed to make your daily worship easier and more meaningful."
            centered
          />

          <div className="home-features-grid">
            {FEATURES.map((feature) => (
              <article
                className="home-feature-card"
                key={feature.title}
              >
                <div
                  className="home-feature-card__icon"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

                <div className="home-feature-card__content">
                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR CITIES
      ===================================================== */}

      <section className="home-cities-section">
        <div className="container">
          <SectionHeading
            eyebrow="Worldwide"
            title="Popular Cities"
            description="Quickly find prayer times in cities around the world."
            centered
          />

          <div className="home-cities-grid">
            {POPULAR_CITIES.map((item) => (
              <button
                type="button"
                className="home-city-card"
                key={`${item.city}-${item.country}`}
                onClick={() =>
                  handleCitySelect(
                    item.city,
                    item.country
                  )
                }
                aria-label={`View prayer times for ${item.city}, ${item.country}`}
              >
                <span
                  className="home-city-card__icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <span className="home-city-card__info">
                  <strong>{item.city}</strong>
                  <small>{item.country}</small>
                </span>

                <span
                  className="home-city-card__arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            ))}
          </div>

          <div className="home-cities-action">
            <Link
              to="/prayer-times"
              className="home-outline-btn"
              aria-label="Explore prayer times"
            >
              Explore Prayer Times
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          DAILY REMINDER
      ===================================================== */}

      <section className="home-reminder-section">
        <div className="container">
          <div className="home-reminder">
            <div
              className="home-reminder__icon"
              aria-hidden="true"
            >
              ☾
            </div>

            <div className="home-reminder__content">
              <span>Daily Reminder</span>

              <h2>
                “Indeed, prayer prohibits immorality and wrongdoing.”
              </h2>

              <p>Surah Al-Ankabut · 29:45</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="home-cta-section">
        <div className="container">
          <div className="home-cta">
            <div className="home-cta__content">
              <span className="home-cta__eyebrow">
                Your Daily Companion
              </span>

              <h2>Make every prayer count.</h2>

              <p>
                Prayer times, Quran, Qibla and duas —
                everything you need in one simple place.
              </p>
            </div>

            <Link
              to="/prayer-times"
              className="home-cta__button"
              aria-label="Check prayer times"
            >
              Check Prayer Times
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;