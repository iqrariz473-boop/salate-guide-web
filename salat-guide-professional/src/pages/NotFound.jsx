import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Seo from "../components/Seo.jsx";
import "./pages.css";
import "./NotFound.css";

/* =========================================================
   DAILY ISLAMIC CONTENT
========================================================= */

const DAILY_CONTENT = [
  {
    ayah:
      "Indeed, in the remembrance of Allah do hearts find rest.",
    reference: "Quran • 13:28",
    reflection:
      "Make a little space in your day for remembrance, reflection and gratitude.",
    dhikr: "SubhanAllah",
    dhikrMeaning: "Glory be to Allah",
  },
  {
    ayah:
      "So remember Me; I will remember you. And be grateful to Me.",
    reference: "Quran • 2:152",
    reflection:
      "Gratitude turns ordinary moments into opportunities to remember Allah.",
    dhikr: "Alhamdulillah",
    dhikrMeaning: "All praise belongs to Allah",
  },
  {
    ayah:
      "And whoever relies upon Allah — then He is sufficient for him.",
    reference: "Quran • 65:3",
    reflection:
      "Do your best, place your trust in Allah, and let your heart remain at peace.",
    dhikr: "Hasbunallahu wa ni'mal wakeel",
    dhikrMeaning: "Allah is sufficient for us",
  },
  {
    ayah:
      "For indeed, with hardship comes ease.",
    reference: "Quran • 94:5",
    reflection:
      "Difficult moments do not last forever. Keep patience and keep turning to Allah.",
    dhikr: "Astaghfirullah",
    dhikrMeaning: "I seek forgiveness from Allah",
  },
];

/* =========================================================
   SUNNAH REMINDERS
========================================================= */

const SUNNAH_REMINDERS = [
  "Begin your day with gratitude and remembrance of Allah.",
  "Smile and be kind — even a small act of kindness matters.",
  "Send blessings upon the Prophet ﷺ throughout your day.",
  "Make dua for your family and those who need your prayers.",
  "Keep your tongue moist with the remembrance of Allah.",
];

/* =========================================================
   STORAGE KEY
========================================================= */

const DHIKR_STORAGE_KEY = "salat-guide-dhikr-count";

/* =========================================================
   GET DAY INDEX
========================================================= */

function getDayIndex(length) {
  const now = new Date();

  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;

  const oneDay = 1000 * 60 * 60 * 24;

  const dayOfYear = Math.floor(diff / oneDay);

  return dayOfYear % length;
}

/* =========================================================
   GET INITIAL DHIKR COUNT
========================================================= */

function getInitialDhikrCount() {
  if (typeof window === "undefined") {
    return 0;
  }

  const saved = localStorage.getItem(DHIKR_STORAGE_KEY);

  if (!saved) {
    return 0;
  }

  const count = Number(saved);

  if (!Number.isFinite(count) || count < 0) {
    return 0;
  }

  return count;
}

/* =========================================================
   ISLAMIC DATE
========================================================= */

function getIslamicDate() {
  try {
    return new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    return "Islamic Calendar";
  }
}

/* =========================================================
   CURRENT DATE
========================================================= */

function getCurrentDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

/* =========================================================
   COMPONENT
========================================================= */

function NotFound() {
  const [dhikrCount, setDhikrCount] = useState(
    getInitialDhikrCount
  );

  const [isDhikrCompleted, setIsDhikrCompleted] =
    useState(false);

  /* =======================================================
     DAILY CONTENT
  ======================================================= */

  const dailyContent = useMemo(() => {
    const index = getDayIndex(DAILY_CONTENT.length);

    return DAILY_CONTENT[index];
  }, []);

  /* =======================================================
     SUNNAH
  ======================================================= */

  const sunnahReminder = useMemo(() => {
    const index = getDayIndex(SUNNAH_REMINDERS.length);

    return SUNNAH_REMINDERS[index];
  }, []);

  /* =======================================================
     SAVE DHIKR COUNT
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      DHIKR_STORAGE_KEY,
      String(dhikrCount)
    );
  }, [dhikrCount]);

  /* =======================================================
     DHIKR ACTIONS
  ======================================================= */

  function increaseDhikr() {
    setDhikrCount((previous) => previous + 1);
    setIsDhikrCompleted(false);
  }

  function resetDhikr() {
    setDhikrCount(0);
    setIsDhikrCompleted(false);
  }

  function completeDhikr() {
    setIsDhikrCompleted(true);
  }

  return (
    <div className="not-found-page">

      <Seo
        title="Quran | Salat Guide"
        description="Explore Quranic reflections, Islamic reminders, prayer times, Qibla and daily duas with Salat Guide."
      />

      {/* =====================================================
          HERO
          IMAGE IS ONLY USED IN THIS SECTION
      ===================================================== */}

      <section className="quran-hero">

        <div className="quran-image-overlay"></div>

        <div className="quran-pattern"></div>

        <div className="hero-inner">

          {/* TOP LABEL */}

          <div className="quran-top-label">
            <span>✦</span>

            QURAN • GUIDANCE • REFLECTION

            <span>✦</span>
          </div>


          {/* TITLE */}

          <h1>
            Let the Quran
            <span> Light Your Heart</span>
          </h1>


          {/* DECORATIVE LINE */}

          <div className="heading-line">
            <span></span>

            <b>✦</b>

            <span></span>
          </div>


          {/* DESCRIPTION */}

          <p className="not-found-description">
            Pause for a moment, reflect on the words of Allah,
            and carry their guidance into your everyday life.
          </p>


          {/* =================================================
              DATE STRIP
          ================================================= */}

          <div className="quran-date-strip">

            {/* ISLAMIC DATE */}

            <div className="date-item">

              <span className="date-icon">
                ☾
              </span>

              <div>
                <small>
                  ISLAMIC DATE
                </small>

                <strong>
                  {getIslamicDate()}
                </strong>
              </div>

            </div>


            <div className="date-divider"></div>


            {/* TODAY */}

            <div className="date-item">

              <span className="date-icon">
                ◷
              </span>

              <div>
                <small>
                  TODAY
                </small>

                <strong>
                  {getCurrentDate()}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PAGE CONTENT
          NO HERO IMAGE HERE
      ===================================================== */}

      <main className="quran-page-content">


        {/* ===================================================
            QUICK LINKS
        =================================================== */}

        <section className="quick-links-section">

          <div className="not-found-cards">


            {/* QURAN */}

            <Link
              to="/quran"
              className="not-found-card"
            >

              <div className="card-icon">
                📖
              </div>

              <h3>
                Explore Quran
              </h3>

              <p>
                Read the Holy Quran and reflect on its
                timeless guidance.
              </p>

              <span className="card-arrow">
                →
              </span>

            </Link>


            {/* PRAYER */}

            <Link
              to="/prayer-times"
              className="not-found-card"
            >

              <div className="card-icon">
                🕌
              </div>

              <h3>
                Prayer Times
              </h3>

              <p>
                Stay connected with your five daily
                prayers.
              </p>

              <span className="card-arrow">
                →
              </span>

            </Link>


            {/* QIBLA */}

            <Link
              to="/qibla"
              className="not-found-card"
            >

              <div className="card-icon">
                🧭
              </div>

              <h3>
                Find Qibla
              </h3>

              <p>
                Find the direction of the Kaaba from
                your location.
              </p>

              <span className="card-arrow">
                →
              </span>

            </Link>


            {/* DUA */}

            <Link
              to="/duas"
              className="not-found-card"
            >

              <div className="card-icon">
                🤲
              </div>

              <h3>
                Daily Duas
              </h3>

              <p>
                Remember Allah with beautiful daily
                supplications.
              </p>

              <span className="card-arrow">
                →
              </span>

            </Link>

          </div>

        </section>


        {/* ===================================================
            VERSE OF THE DAY
        =================================================== */}

        <section className="verse-section">

          <div className="daily-ayah-card">

            <div className="ayah-decoration">
              ❝
            </div>


            <div className="ayah-content">

              <span className="ayah-label">
                VERSE OF THE DAY
              </span>

              <p className="ayah-text">
                {dailyContent.ayah}
              </p>

              <span className="ayah-reference">
                {dailyContent.reference}
              </span>

            </div>


            <div className="ayah-symbol">
              ۞
            </div>

          </div>


          {/* REFLECTION */}

          <div className="daily-reflection">

            <span className="reflection-mini-label">
              TODAY'S REFLECTION
            </span>

            <p>
              {dailyContent.reflection}
            </p>

          </div>

        </section>


        {/* ===================================================
            DAILY IBADAH
        =================================================== */}

        <section className="islamic-tools">

          <div className="section-heading">

            <span>
              DAILY IBADAH
            </span>

            <h2>
              Small deeds, meaningful moments.
            </h2>

            <p>
              Simple reminders to help you stay connected
              with Allah throughout the day.
            </p>

          </div>


          <div className="tools-grid">


            {/* =================================================
                DHIKR
            ================================================= */}

            <div className="tool-card dhikr-tool">

              <div className="tool-top">

                <div className="tool-icon">
                  ت
                </div>

                <span>
                  DHIKR
                </span>

              </div>


              <h3>
                {dailyContent.dhikr}
              </h3>

              <p>
                {dailyContent.dhikrMeaning}
              </p>


              <div className="dhikr-counter">

                <div className="counter-number">
                  {dhikrCount}
                </div>

                <button
                  type="button"
                  onClick={increaseDhikr}
                  aria-label="Increase dhikr count"
                >
                  + Dhikr
                </button>

              </div>


              <div className="counter-actions">

                <button
                  type="button"
                  onClick={completeDhikr}
                  className={
                    isDhikrCompleted
                      ? "completed"
                      : ""
                  }
                >
                  {isDhikrCompleted
                    ? "✓ Completed"
                    : "Mark complete"}
                </button>

                <button
                  type="button"
                  onClick={resetDhikr}
                >
                  Reset
                </button>

              </div>

            </div>


            {/* =================================================
                SUNNAH
            ================================================= */}

            <div className="tool-card">

              <div className="tool-top">

                <div className="tool-icon">
                  ☀
                </div>

                <span>
                  SUNNAH REMINDER
                </span>

              </div>


              <h3>
                A beautiful habit
              </h3>

              <p className="sunnah-text">
                {sunnahReminder}
              </p>


              <div className="tool-footer">
                ✦ Daily reminder
              </div>

            </div>


            {/* =================================================
                DUA
            ================================================= */}

            <Link
              to="/duas"
              className="tool-card tool-link"
            >

              <div className="tool-top">

                <div className="tool-icon">
                  🤲
                </div>

                <span>
                  DAILY DUA
                </span>

              </div>


              <h3>
                Keep making dua
              </h3>

              <p>
                Turn to Allah in every situation.
                Ask, trust and remain hopeful.
              </p>


              <div className="tool-footer">
                Explore duas →
              </div>

            </Link>

          </div>

        </section>

      </main>


      {/* =====================================================
          FINAL QURAN CTA
      ===================================================== */}

      <section className="quran-reflection">

        <div className="reflection-container">

          <div className="reflection-icon">
            ☾
          </div>


          <div className="reflection-content">

            <span className="reflection-label">
              QURANIC REFLECTION
            </span>

            <h2>
              Let the Quran illuminate
              <span> your journey.</span>
            </h2>

            <p>
              Take a moment to pause and reconnect with
              the words of the Quran. Every verse can
              become a source of wisdom, comfort and guidance.
            </p>

          </div>


          <Link
            to="/quran"
            className="reflection-btn"
          >
            Read Quran

            <span>
              →
            </span>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default NotFound;