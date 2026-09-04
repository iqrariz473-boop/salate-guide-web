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
          <div className="home-section-heading">
            <span>Today's Salah</span>

            <h2>Prayer Times for {city}</h2>

            <p>
              Stay connected with your five daily prayers.
            </p>
          </div>

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
            <Link to="/prayer-times" className="btn-link">
              View full prayer times
              <span>→</span>
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
                <span>▣</span>
                <span>Quran Verse of the Day</span>
              </div>

              <div className="home-quran-card__arabic">
                إِنَّ مَعَ الْعُسْرِ يُسْرًا
              </div>

              <p className="home-quran-card__translation">
                “Indeed, with hardship comes ease.”
              </p>

              <div className="home-quran-card__bottom">
                <span>Surah Ash-Sharh · 94:6</span>

                <Link to="/quran">
                  Read Quran
                  <span>→</span>
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
          <div className="home-section-heading home-section-heading--center">
            <span>Explore</span>

            <h2>Quick Islamic Tools</h2>

            <p>
              Useful Islamic resources designed for everyday life.
            </p>
          </div>

          <div className="home-tools-grid">
            {ISLAMIC_TOOLS.map((tool) => (
              <Link
                to={tool.to}
                className="home-tool-card"
                key={tool.id}
              >
                <div className="home-tool-card__icon">
                  {tool.icon}
                </div>

                <div className="home-tool-card__content">
                  <h3>{tool.title}</h3>

                  <p>{tool.description}</p>

                  <span className="home-tool-card__link">
                    {tool.action}

                    <span>→</span>
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
          <div className="home-section-heading home-section-heading--center">
            <span>Why Salat Guide?</span>

            <h2>Your Simple Islamic Companion</h2>

            <p>
              Helpful tools designed to make your daily worship
              easier and more meaningful.
            </p>
          </div>

          <div className="home-features-grid">
            {FEATURES.map((feature) => (
              <div
                className="home-feature-card"
                key={feature.title}
              >
                <div className="home-feature-card__icon">
                  {feature.icon}
                </div>

                <div className="home-feature-card__content">
                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR CITIES
      ===================================================== */}

      <section className="home-cities-section">
        <div className="container">
          <div className="home-section-heading home-section-heading--center">
            <span>Worldwide</span>

            <h2>Popular Cities</h2>

            <p>
              Quickly find prayer times in cities around the world.
            </p>
          </div>

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
              >
                <span className="home-city-card__icon">
                  {item.icon}
                </span>

                <span className="home-city-card__info">
                  <strong>{item.city}</strong>

                  <small>{item.country}</small>
                </span>

                <span className="home-city-card__arrow">
                  →
                </span>
              </button>
            ))}
          </div>

          <div className="home-cities-action">
            <Link
              to="/prayer-times"
              className="home-outline-btn"
            >
              Explore Prayer Times

              <span>→</span>
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
            <div className="home-reminder__icon">
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
            >
              Check Prayer Times

              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
