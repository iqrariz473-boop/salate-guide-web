import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Seo from "../components/Seo.jsx";

import {
  getDuaChapters,
  getDuasByChapter,
  getDuaAudioUrl,
} from "../services/duaApi.js";

import "./Duas.css";

/* =========================================================
   CATEGORY NAMES
========================================================= */

const CATEGORY_NAMES = {
  1: "Morning & Evening",
  2: "Daily Life",
  3: "Food & Fasting",
  4: "Protection & Difficulties",
  5: "Travel",
  6: "Prayer",
  7: "Remembrance",
  8: "Hajj & Umrah",
  9: "General",
  10: "Weather & Nature",
  11: "Health & Funeral",
};

/* =========================================================
   STORAGE
========================================================= */

const LANGUAGE_STORAGE_KEY =
  "salat-guide-dua-language";

const FAVORITES_STORAGE_KEY =
  "salat-guide-dua-favorites";

const LAST_READ_DUA_KEY =
  "salat-guide-last-read-dua";

const VIEWED_CHAPTERS_KEY =
  "salat-guide-viewed-chapters";

/* =========================================================
   LANGUAGES
========================================================= */

const LANGUAGE_OPTIONS = [
  {
    value: "english",
    label: "English",
    native: "English",
  },
  {
    value: "urdu",
    label: "Urdu",
    native: "اردو",
  },
  {
    value: "arabic",
    label: "Arabic",
    native: "العربية",
  },
  {
    value: "hindi",
    label: "Hindi",
    native: "हिन्दी",
  },
  {
    value: "bengali",
    label: "Bengali",
    native: "বাংলা",
  },
  {
    value: "turkish",
    label: "Turkish",
    native: "Türkçe",
  },
  {
    value: "indonesian",
    label: "Indonesian",
    native: "Bahasa Indonesia",
  },
  {
    value: "malay",
    label: "Malay",
    native: "Bahasa Melayu",
  },
  {
    value: "persian",
    label: "Persian",
    native: "فارسی",
  },
  {
    value: "french",
    label: "French",
    native: "Français",
  },
  {
    value: "spanish",
    label: "Spanish",
    native: "Español",
  },
  {
    value: "german",
    label: "German",
    native: "Deutsch",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getSafeText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

function getChapterTitle(chapter) {
  return (
    chapter?.title ||
    chapter?.name ||
    chapter?.chapter_name ||
    `Chapter ${chapter?.id || ""}`
  );
}

function getChapterArabic(chapter) {
  return (
    chapter?.arabic ||
    chapter?.arabic_title ||
    chapter?.arabic_name ||
    ""
  );
}

function getDuaArabic(dua) {
  return (
    dua?.arabic ||
    dua?.arabic_text ||
    dua?.text_ar ||
    ""
  );
}

function getDuaTransliteration(dua) {
  return (
    dua?.transliteration ||
    dua?.transliteration_text ||
    dua?.transliterationText ||
    ""
  );
}

function getDuaTranslation(dua) {
  return (
    dua?.translation ||
    dua?.translation_text ||
    dua?.translated_text ||
    ""
  );
}

function getDuaReference(dua) {
  return (
    dua?.reference ||
    dua?.source ||
    dua?.hadith ||
    ""
  );
}

/* =========================================================
   DUA ROW
========================================================= */

function DuaRow({
  chapter,
  index,
  isFavorite,
  onFavorite,
  onOpen,
}) {
  const title = getChapterTitle(chapter);
  const arabic = getChapterArabic(chapter);

  return (
    <article className="duas-table__row">
      <div
        className="duas-table__cell duas-table__cell--id"
        data-label="No."
      >
        <span className="duas-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div
        className="duas-table__cell duas-table__cell--title"
        data-label="Chapter"
      >
        <div className="duas-chapter-info">
          <div className="duas-chapter-info__top">
            <h3>{title}</h3>

            {chapter?.category_id && (
              <span className="duas-category-badge">
                {CATEGORY_NAMES[chapter.category_id] ||
                  `Category ${chapter.category_id}`}
              </span>
            )}
          </div>

          {arabic && (
            <p
              className="duas-chapter-info__arabic"
              dir="rtl"
            >
              {arabic}
            </p>
          )}
        </div>
      </div>

      <div
        className="duas-table__cell duas-table__cell--preview"
        data-label="Description"
      >
        <p>
          {chapter?.description ||
            chapter?.summary ||
            "Explore authentic supplications and duas from this chapter."}
        </p>
      </div>

      <div
        className="duas-table__cell duas-table__cell--favorite"
        data-label="Favorite"
      >
        <button
          type="button"
          className={`duas-favorite ${
            isFavorite ? "is-active" : ""
          }`}
          onClick={() => onFavorite(chapter.id)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          title={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <span aria-hidden="true">
            {isFavorite ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div
        className="duas-table__cell duas-table__cell--action"
        data-label="Action"
      >
        <button
          type="button"
          className="duas-open-button"
          onClick={() => onOpen(chapter)}
        >
          <span>Open</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   DUA DETAIL CARD
========================================================= */
function DuaDetailCard({ dua, index, chapterId }) {
  const arabic = getDuaArabic(dua);
  const transliteration = getDuaTransliteration(dua);
  const translation = getDuaTranslation(dua);
  const reference = getDuaReference(dua);

  /*
   * IMPORTANT:
   * API ka actual audio URL available ho to pehle wahi use karein.
   * Agar API audio nahi deti to chapterId + index se URL banega.
   */

  const rawAudio =
    dua?.url ||
    dua?.audio ||
    dua?.audio_url ||
    dua?.audioUrl ||
    dua?.audio_file ||
    dua?.audioFile ||
    dua?.recitation ||
    "";

  const audioUrl =
    rawAudio ||
    `https://appslogie.com/data/hisnulmuslimaudios/dua${String(
      chapterId
    ).padStart(3, "0")}_${index + 1}.mp3`;

  return (
    <article className="dua-detail-card">

      <div className="dua-detail-card__number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="dua-detail-card__content">

        <div className="dua-detail-card__top">

          <div className="dua-detail-card__badge">
            Supplication {index + 1}
          </div>

          {reference && (
            <div className="dua-detail-card__source">
              Authentic Source
            </div>
          )}

        </div>

        {arabic && (
          <div className="dua-detail-card__section dua-detail-card__section--arabic">

            <span className="dua-detail-card__label">
              Arabic
            </span>

            <div className="dua-detail-card__arabic-wrap">

              <span
                className="dua-detail-card__ornament"
                aria-hidden="true"
              >
                ۞
              </span>

              <p
                className="dua-detail-card__arabic"
                dir="rtl"
              >
                {arabic}
              </p>

              <span
                className="dua-detail-card__ornament"
                aria-hidden="true"
              >
                ۞
              </span>

            </div>
          </div>
        )}

        {transliteration && (
          <div className="dua-detail-card__section">

            <span className="dua-detail-card__label">
              Transliteration
            </span>

            <p className="dua-detail-card__transliteration">
              {transliteration}
            </p>

          </div>
        )}

        {translation && (
          <div className="dua-detail-card__section">

            <span className="dua-detail-card__label">
              Translation
            </span>

            <p className="dua-detail-card__translation">
              {translation}
            </p>

          </div>
        )}

        {reference && (
          <div className="dua-detail-card__reference">

            <div className="dua-detail-card__reference-icon">
              ✦
            </div>

            <div>
              <span>Reference</span>
              <p>{reference}</p>
            </div>

          </div>
        )}

        {/* =====================================================
            AUDIO
        ===================================================== */}

        {audioUrl ? (
          <div className="dua-detail-card__audio">

            <div className="dua-detail-card__audio-head">

              <div className="dua-detail-card__audio-icon">
                ♪
              </div>

              <div>
                <strong>
                  Listen to this Dua
                </strong>

                <span>
                  Audio Recitation
                </span>
              </div>

            </div>

            <audio
              key={audioUrl}
              className="dua-audio-player"
              controls
              preload="metadata"
            >
              <source
                src={audioUrl}
                type="audio/mpeg"
              />

              Your browser does not support
              audio playback.
            </audio>

            <div className="dua-detail-card__audio-url">
              Audio ready
            </div>

          </div>
        ) : (
          <div className="dua-detail-card__audio-unavailable">

            <span>♪</span>

            <div>
              <strong>
                Audio unavailable
              </strong>

              <small>
                Audio recitation is not available
                for this dua.
              </small>
            </div>

          </div>
        )}

      </div>
    </article>
  );
}

/* =========================================================
   EXPLORE BY INTENTION
========================================================= */

function DuaCategoryExplorer({
  categories,
  chapters,
  onSelectCategory,
}) {
  const categoryIcons = {
    1: "☀",
    2: "⌂",
    3: "◉",
    4: "✦",
    5: "✈",
    6: "۞",
    7: "☽",
    8: "◇",
    9: "✧",
    10: "☁",
    11: "♡",
  };

  return (
    <section className="dua-category-explorer">
      <div className="dua-category-explorer__header">
        <div>
          <span className="dua-section-eyebrow">
            Explore by Intention
          </span>

          <h2>
            Find the Right Dua
          </h2>

          <p>
            Browse supplications according to
            different moments and needs of life.
          </p>
        </div>
      </div>

      <div className="dua-category-grid">
        {categories.map((id) => {
          const count =
            chapters.filter(
              (chapter) =>
                String(
                  chapter?.category_id
                ) === String(id)
            ).length;

          return (
            <button
              key={id}
              type="button"
              className="dua-category-card"
              onClick={() =>
                onSelectCategory(id)
              }
            >
              <span className="dua-category-card__icon">
                {categoryIcons[id] || "✦"}
              </span>

              <span className="dua-category-card__content">
                <strong>
                  {CATEGORY_NAMES[id] ||
                    `Category ${id}`}
                </strong>

                <small>
                  {count}{" "}
                  {count === 1
                    ? "chapter"
                    : "chapters"}
                </small>
              </span>

              <span className="dua-category-card__arrow">
                →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   DUA JOURNEY
========================================================= */

function DuaJourney({
  chapters,
  favorites,
  viewedChapters,
  lastRead,
  onContinue,
}) {
  const totalChapters =
    chapters.length;

  const exploredCount =
    viewedChapters.filter((id) =>
      chapters.some(
        (chapter) =>
          chapter.id === id
      )
    ).length;

  const progress =
    totalChapters > 0
      ? Math.min(
          100,
          Math.round(
            (exploredCount /
              totalChapters) *
              100
          )
        )
      : 0;

  function handleContinue() {
    if (!lastRead) {
      return;
    }

    const chapter =
      chapters.find(
        (item) =>
          item.id === lastRead.id
      );

    if (chapter) {
      onContinue(chapter);
    }
  }

  return (
    <section className="dua-journey">
      <div className="dua-journey__inner">
        <div className="dua-journey__header">
          <div>
            <span className="dua-section-eyebrow">
              Your Personal Collection
            </span>

            <h2>
              Your Dua Journey
            </h2>

            <p>
              Keep track of the chapters you
              have explored and the duas you
              want to revisit.
            </p>
          </div>

          <div className="dua-journey__percentage">
            <strong>
              {progress}%
            </strong>

            <span>
              Explored
            </span>
          </div>
        </div>

        <div className="dua-journey__progress">
          <div className="dua-journey__progress-track">
            <span
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="dua-journey__progress-info">
            <span>
              {exploredCount} of{" "}
              {totalChapters} chapters
            </span>

            <span>
              Keep exploring
            </span>
          </div>
        </div>

        <div className="dua-journey__stats">
          <div className="dua-journey__stat">
            <span className="dua-journey__stat-icon">
              ◈
            </span>

            <div>
              <strong>
                {totalChapters}
              </strong>

              <span>
                Total Chapters
              </span>
            </div>
          </div>

          <div className="dua-journey__stat">
            <span className="dua-journey__stat-icon">
              ♥
            </span>

            <div>
              <strong>
                {favorites.length}
              </strong>

              <span>
                Saved Chapters
              </span>
            </div>
          </div>

          <div className="dua-journey__stat">
            <span className="dua-journey__stat-icon">
              ✓
            </span>

            <div>
              <strong>
                {exploredCount}
              </strong>

              <span>
                Chapters Explored
              </span>
            </div>
          </div>
        </div>

        {lastRead ? (
          <div className="dua-journey__continue">
            <div className="dua-journey__continue-icon">
              ۞
            </div>

            <div className="dua-journey__continue-content">
              <span>
                Pick Up Where You Left Off
              </span>

              <strong>
                {lastRead.title}
              </strong>

              {lastRead.arabic && (
                <p dir="rtl">
                  {lastRead.arabic}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={
                !chapters.some(
                  (item) =>
                    item.id ===
                    lastRead.id
                )
              }
            >
              Continue
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="dua-journey__empty">
            <div>
              <span>۞</span>
            </div>

            <div>
              <strong>
                Your reading journey starts here
              </strong>

              <p>
                Open any chapter above and it
                will appear here for easy access
                later.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   PAUSE & REFLECT
========================================================= */

function DuaReflection() {
  const reflections = [
    {
      arabic:
        "وَقُل رَّبِّ زِدْنِي عِلْمًا",
      text:
        "And say: My Lord, increase me in knowledge.",
      reference:
        "Surah Taha 20:114",
    },
    {
      arabic:
        "فَاذْكُرُونِي أَذْكُرْكُمْ",
      text:
        "So remember Me; I will remember you.",
      reference:
        "Surah Al-Baqarah 2:152",
    },
    {
      arabic:
        "وَعَلَى اللَّهِ فَتَوَكَّلُوا",
      text:
        "And upon Allah rely, if you are believers.",
      reference:
        "Surah Al-Ma'idah 5:23",
    },
  ];

  const [index, setIndex] =
    useState(0);

  const reflection =
    reflections[index];

  function handleNext() {
    setIndex(
      (current) =>
        (current + 1) %
        reflections.length
    );
  }

  return (
    <section className="dua-reflection">
      <div className="dua-reflection__inner">
        <div className="dua-reflection__icon">
          ۞
        </div>

        <div className="dua-reflection__content">
          <span>
            Pause &amp; Reflect
          </span>

          <h2>
            A Moment of Remembrance
          </h2>

          <p
            className="dua-reflection__arabic"
            dir="rtl"
          >
            {reflection.arabic}
          </p>

          <p className="dua-reflection__text">
            {reflection.text}
          </p>

          <small>
            {reflection.reference}
          </small>
        </div>

        <button
          type="button"
          className="dua-reflection__next"
          onClick={handleNext}
          aria-label="Show another reflection"
        >
          ↻
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   QUICK DASHBOARD
========================================================= */

function DuaQuickDashboard({
  chapters,
  favorites,
  lastRead,
  onContinue,
  onOpenRandom,
}) {
  const todayDua =
    chapters.length > 0
      ? chapters[0]
      : null;

  const morningDua =
    chapters.find(
      (chapter) =>
        String(
          chapter?.category_id
        ) === "1"
    ) || chapters[0];

  const favoriteCount =
    favorites.length;

  const lastReadExists =
    lastRead &&
    chapters.some(
      (chapter) =>
        chapter.id ===
        lastRead.id
    );

  return (
    <section className="dua-quick-dashboard">
      <div className="dua-quick-dashboard__inner">

        <div className="dua-quick-dashboard__header">
          <div>
            <span className="dua-section-eyebrow">
              Your Daily Companion
            </span>

            <h2>
              Stay Connected With Your Duas
            </h2>

            <p>
              Continue your journey, revisit
              saved chapters, or discover a new
              dua today.
            </p>
          </div>
        </div>

        <div className="dua-quick-dashboard__grid">

          {/* TODAY'S DUA */}
          <article className="dua-quick-card dua-quick-card--featured">
            <div className="dua-quick-card__top">
              <span className="dua-quick-card__icon">
                ۞
              </span>

              <span className="dua-quick-card__label">
                Today's Dua
              </span>
            </div>

            <h3>
              {todayDua
                ? getChapterTitle(todayDua)
                : "Begin Your Dua Journey"}
            </h3>

            <p>
              A beautiful reminder to keep your
              heart connected with Allah.
            </p>

            {todayDua && (
              <button
                type="button"
                className="dua-quick-card__link"
                onClick={() =>
                  onContinue(todayDua)
                }
              >
                Continue reading
                <span>→</span>
              </button>
            )}
          </article>

          {/* MORNING DUA */}
          <article className="dua-quick-card">
            <div className="dua-quick-card__top">
              <span className="dua-quick-card__icon">
                ☀
              </span>

              <span className="dua-quick-card__label">
                Morning Dua
              </span>
            </div>

            <h3>
              {morningDua
                ? getChapterTitle(
                    morningDua
                  )
                : "Morning & Evening"}
            </h3>

            <p>
              Start your day with remembrance,
              gratitude and protection.
            </p>

            {morningDua && (
              <button
                type="button"
                className="dua-quick-card__link"
                onClick={() =>
                  onContinue(morningDua)
                }
              >
                Read morning duas
                <span>→</span>
              </button>
            )}
          </article>

          {/* FAVORITES */}
          <article className="dua-quick-card">
            <div className="dua-quick-card__top">
              <span className="dua-quick-card__icon">
                ♥
              </span>

              <span className="dua-quick-card__label">
                Favorites
              </span>
            </div>

            <div className="dua-quick-card__stat">
              {favoriteCount}
            </div>

            <h3>
              Saved duas
            </h3>

            <p>
              Your favorite chapters are saved
              for easy access.
            </p>

            <button
              type="button"
              className="dua-quick-card__link"
              onClick={() => {
                if (
                  favoriteCount > 0
                ) {
                  window.scrollTo({
                    top: 0,
                    behavior:
                      "smooth",
                  });
                }
              }}
            >
              Open favorites
              <span>→</span>
            </button>
          </article>

          {/* LAST READ */}
          <article className="dua-quick-card">
            <div className="dua-quick-card__top">
              <span className="dua-quick-card__icon">
                ◷
              </span>

              <span className="dua-quick-card__label">
                Last Read
              </span>
            </div>

            <h3>
              {lastReadExists
                ? lastRead.title
                : "No chapter yet"}
            </h3>

            <p>
              {lastReadExists
                ? "Continue from where you last stopped."
                : "Open a chapter and your progress will appear here."}
            </p>

            {lastReadExists && (
              <button
                type="button"
                className="dua-quick-card__link"
                onClick={() => {
                  const chapter =
                    chapters.find(
                      (item) =>
                        item.id ===
                        lastRead.id
                    );

                  if (chapter) {
                    onContinue(
                      chapter
                    );
                  }
                }}
              >
                Continue reading
                <span>→</span>
              </button>
            )}

            {lastReadExists && (
              <small className="dua-quick-card__time">
                Just now
              </small>
            )}
          </article>

          {/* DAILY STREAK */}
          <article className="dua-quick-card dua-quick-card--streak">
            <div className="dua-quick-card__top">
              <span className="dua-quick-card__icon">
                🔥
              </span>

              <span className="dua-quick-card__label">
                Daily Streak
              </span>
            </div>

            <div className="dua-quick-card__streak-number">
              <strong>
                7
              </strong>

              <span>
                Days
              </span>
            </div>

            <h3>
              Keep it up!
            </h3>

            <div className="dua-streak-dots">
              {Array.from(
                { length: 7 },
                (_, index) => (
                  <span
                    key={index}
                    className="is-active"
                  />
                )
              )}
            </div>
          </article>

          {/* RANDOM DUA */}
          <article className="dua-quick-card dua-quick-card--random">
            <div className="dua-quick-card__top">
              <span className="dua-quick-card__icon">
                ✦
              </span>

              <span className="dua-quick-card__label">
                Random Dua
              </span>
            </div>

            <h3>
              Discover Dua
            </h3>

            <p>
              Let today bring you a new
              supplication to reflect upon.
            </p>

            <button
              type="button"
              className="dua-quick-card__link"
              onClick={
                onOpenRandom
              }
            >
              Get inspired
              <span>→</span>
            </button>
          </article>

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DAILY DUA FEATURE
========================================================= */

function DailyDuaFeature({
  duas,
  language,
}) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [copied, setCopied] =
    useState(false);

  const availableDuas =
    Array.isArray(duas)
      ? duas.filter(Boolean)
      : [];

  const currentDua =
    availableDuas.length > 0
      ? availableDuas[
          currentIndex %
            availableDuas.length
        ]
      : null;

  const arabic = currentDua
    ? getDuaArabic(currentDua)
    : "";

  const transliteration =
    currentDua
      ? getDuaTransliteration(
          currentDua
        )
      : "";

  const translation =
    currentDua
      ? getDuaTranslation(
          currentDua
        )
      : "";

  function handleNewDua() {
    if (
      availableDuas.length <= 1
    ) {
      return;
    }

    setCopied(false);

    setCurrentIndex((current) => {
      const next =
        Math.floor(
          Math.random() *
            availableDuas.length
        );

      if (next === current) {
        return (
          (current + 1) %
          availableDuas.length
        );
      }

      return next;
    });
  }

  async function handleCopy() {
    if (!currentDua) {
      return;
    }

    const copyText = [
      arabic,
      transliteration,
      translation,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(
        copyText
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Unable to copy dua:",
        error
      );
    }
  }

  if (!currentDua) {
    return null;
  }

  return (
    <section className="daily-dua-feature">
      <div className="daily-dua-feature__pattern" />

      <div className="daily-dua-feature__inner">
        <div className="daily-dua-feature__header">
          <span className="daily-dua-feature__eyebrow">
            Daily Inspiration
          </span>

          <h2>
            A Dua for Your Day
          </h2>

          <p>
            Take a moment, reflect, and make
            this beautiful supplication part
            of your day.
          </p>
        </div>

        <div className="daily-dua-card">
          <div className="daily-dua-card__ornament">
            <span>۞</span>
          </div>

          <div className="daily-dua-card__content">
            {arabic && (
              <div className="daily-dua-card__arabic">
                <p dir="rtl">
                  {arabic}
                </p>
              </div>
            )}

            {transliteration && (
              <div className="daily-dua-card__translation-block">
                <span>
                  Transliteration
                </span>

                <p>
                  {transliteration}
                </p>
              </div>
            )}

            {translation && (
              <div className="daily-dua-card__translation-block">
                <span>
                  {language === "urdu"
                    ? "ترجمہ"
                    : "Translation"}
                </span>

                <p>
                  {translation}
                </p>
              </div>
            )}

            <div className="daily-dua-card__actions">
              <button
                type="button"
                className="daily-dua-card__button"
                onClick={handleCopy}
              >
                <span>
                  {copied ? "✓" : "⧉"}
                </span>

                {copied
                  ? "Copied"
                  : "Copy Dua"}
              </button>

              <button
                type="button"
                className="daily-dua-card__button daily-dua-card__button--primary"
                onClick={handleNewDua}
                disabled={
                  availableDuas.length <= 1
                }
              >
                <span>↻</span>
                New Dua
              </button>
            </div>
          </div>
        </div>

        <div className="daily-dua-feature__footer">
          <span>✦</span>

          <p>
            Make dua with sincerity and trust
            in Allah.
          </p>

          <span>✦</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DUA FAQ
========================================================= */

function DuaFAQ() {
  const faqs = [
    {
      question: "What is a Dua?",
      answer:
        "Dua is a personal supplication and a way of turning to Allah with hope, gratitude, need and trust. Muslims can make dua for guidance, forgiveness, protection, ease and many other needs.",
    },
    {
      question:
        "When is the best time to make Dua?",
      answer:
        "Dua can be made at any time. Certain moments are especially encouraged, such as during sujood, before breaking a fast, in the last part of the night, and at other times mentioned in authentic Islamic teachings.",
    },
    {
      question:
        "Can I make Dua in my own language?",
      answer:
        "Yes. You can ask Allah in the language you understand. Learning authentic Arabic duas is beneficial, while making a personal supplication in your own language allows you to express your feelings and needs clearly.",
    },
    {
      question:
        "Does Dua always get answered immediately?",
      answer:
        "Not necessarily. A believer should make dua with patience and trust in Allah. An answer may come in a different form, at a different time, or Allah may protect a person from something harmful instead.",
    },
    {
      question:
        "How should I make Dua?",
      answer:
        "Make dua sincerely, praise Allah, send blessings upon the Prophet ﷺ, ask Allah with humility and hope, and avoid giving up when the answer takes time. Sincerity and trust are important parts of making dua.",
    },
    {
      question:
        "What is the difference between Dua and Dhikr?",
      answer:
        "Dua is asking Allah for something or seeking His help, while Dhikr means remembering and mentioning Allah through words and acts of remembrance. Both are important forms of worship.",
    },
  ];

  const [openIndex, setOpenIndex] =
    useState(null);

  function handleToggle(index) {
    setOpenIndex((current) =>
      current === index
        ? null
        : index
    );
  }

  return (
    <section className="dua-faq">
      <div className="dua-faq__inner">

        {/* HEADER */}

        <div className="dua-faq__header">
          <span className="dua-section-eyebrow">
            Questions &amp; Guidance
          </span>

          <h2>
           Frequently asked questions about Duas
          </h2>

          <p>
            Find simple answers to common
            questions about making dua and
            keeping your heart connected with
            Allah.
          </p>
        </div>

        {/* FAQ LIST */}

        <div className="dua-faq__list">
          {faqs.map((faq, index) => {
            const isOpen =
              openIndex === index;

            return (
              <article
                key={faq.question}
                className={`dua-faq__item ${
                  isOpen
                    ? "is-open"
                    : ""
                }`}
              >
                <button
                  type="button"
                  className="dua-faq__question"
                  onClick={() =>
                    handleToggle(index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="dua-faq__question-icon">
                    ?
                  </span>

                  <span className="dua-faq__question-text">
                    {faq.question}
                  </span>

                  <span
                    className={`dua-faq__arrow ${
                      isOpen
                        ? "is-open"
                        : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className={`dua-faq__answer ${
                    isOpen
                      ? "is-open"
                      : ""
                  }`}
                >
                  <div className="dua-faq__answer-inner">
                    <p>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* NOTE */}

        <div className="dua-faq__note">
          <span className="dua-faq__note-icon">
            ۞
          </span>

          <div>
            <strong>
              Keep learning, keep making Dua
            </strong>

            <p>
              May your supplications bring you
              closer to Allah and fill your heart
              with peace and hope.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Duas() {
  const modalBodyRef =
    useRef(null);

  const [duaPage, setDuaPage] =
    useState(1);

  const [hasMoreDuas, setHasMoreDuas] =
    useState(false);

  const [
    loadingMoreDuas,
    setLoadingMoreDuas,
  ] = useState(false);

  const [chapters, setChapters] =
    useState([]);

  const [
    selectedChapter,
    setSelectedChapter,
  ] = useState(null);

  const [duas, setDuas] =
    useState([]);

  const [featuredDuas, setFeaturedDuas] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [duaLoading, setDuaLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [duaError, setDuaError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  /* =======================================================
     LANGUAGE
  ======================================================= */

  const [language, setLanguage] =
    useState(() => {
      try {
        return (
          localStorage.getItem(
            LANGUAGE_STORAGE_KEY
          ) || "english"
        );
      } catch {
        return "english";
      }
    });

  const [
    languageOpen,
    setLanguageOpen,
  ] = useState(false);

  /* =======================================================
     FAVORITES
  ======================================================= */

  const [favorites, setFavorites] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            FAVORITES_STORAGE_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch {
        return [];
      }
    });

  /* =======================================================
     DUA JOURNEY
  ======================================================= */

  const [lastRead, setLastRead] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            LAST_READ_DUA_KEY
          );

        return saved
          ? JSON.parse(saved)
          : null;
      } catch {
        return null;
      }
    });

  const [
    viewedChapters,
    setViewedChapters,
  ] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          VIEWED_CHAPTERS_KEY
        );

      const parsed = saved
        ? JSON.parse(saved)
        : [];

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch {
      return [];
    }
  });

  /* =======================================================
     SELECTED LANGUAGE
  ======================================================= */

  const selectedLanguage =
    useMemo(() => {
      return (
        LANGUAGE_OPTIONS.find(
          (option) =>
            option.value === language
        ) ||
        LANGUAGE_OPTIONS[0]
      );
    }, [language]);

  /* =======================================================
     SAVE LANGUAGE
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
      );
    } catch (err) {
      console.warn(
        "Unable to save dua language:",
        err
      );
    }
  }, [language]);

  /* =======================================================
     SAVE FAVORITES
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (err) {
      console.warn(
        "Unable to save dua favorites:",
        err
      );
    }
  }, [favorites]);

  /* =======================================================
     SAVE LAST READ
  ======================================================= */

  useEffect(() => {
    try {
      if (lastRead) {
        localStorage.setItem(
          LAST_READ_DUA_KEY,
          JSON.stringify(lastRead)
        );
      }
    } catch (err) {
      console.warn(
        "Unable to save last read dua:",
        err
      );
    }
  }, [lastRead]);

  /* =======================================================
     SAVE VIEWED CHAPTERS
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        VIEWED_CHAPTERS_KEY,
        JSON.stringify(viewedChapters)
      );
    } catch (err) {
      console.warn(
        "Unable to save viewed chapters:",
        err
      );
    }
  }, [viewedChapters]);

  /* =======================================================
     LOAD CHAPTERS
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadChapters() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getDuaChapters(
            language
          );

        if (!cancelled) {
          setChapters(
            Array.isArray(data)
              ? data
              : []
          );
        }
      } catch (err) {
        console.error(
          "Dua chapters error:",
          err
        );

        if (!cancelled) {
          setChapters([]);

          setError(
            err?.message ||
              "Unable to load dua chapters."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadChapters();

    return () => {
      cancelled = true;
    };
  }, [language]);

  /* =======================================================
     LOAD FEATURED DUA
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedDua() {
      if (!chapters.length) {
        setFeaturedDuas([]);
        return;
      }

      try {
        const firstChapter =
          chapters[0];

        const result =
          await getDuasByChapter(
            firstChapter.id,
            {
              lang: language,
              page: 1,
              limit: 25,
            }
          );

        const items =
          Array.isArray(
            result?.items
          )
            ? result.items
            : Array.isArray(result)
            ? result
            : [];

        if (!cancelled) {
          setFeaturedDuas(
            items.filter(Boolean)
          );
        }
      } catch (err) {
        console.error(
          "Featured dua error:",
          err
        );

        if (!cancelled) {
          setFeaturedDuas([]);
        }
      }
    }

    loadFeaturedDua();

    return () => {
      cancelled = true;
    };
  }, [chapters, language]);

  /* =======================================================
     LANGUAGE DROPDOWN
  ======================================================= */

  useEffect(() => {
    if (!languageOpen) {
      return;
    }

    function handleOutsideClick(
      event
    ) {
      const languageElement =
        event.target.closest(
          ".duas-language"
        );

      if (!languageElement) {
        setLanguageOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setLanguageOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [languageOpen]);

  /* =======================================================
     MODAL ESCAPE
  ======================================================= */

  useEffect(() => {
    if (!selectedChapter) {
      return;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        handleCloseChapter();
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [selectedChapter]);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (!selectedChapter) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedChapter]);

  /* =======================================================
     LANGUAGE CHANGE
  ======================================================= */

  function handleLanguageChange(
    newLanguage
  ) {
    setLanguage(newLanguage);
    setLanguageOpen(false);

    setSelectedChapter(null);
    setDuas([]);

    setFeaturedDuas([]);

    setDuaError("");
    setSearch("");
    setCategory("all");

    setDuaPage(1);
    setHasMoreDuas(false);
  }

  /* =======================================================
     OPEN CHAPTER
  ======================================================= */

  async function handleOpenChapter(
    chapter
  ) {
    if (!chapter) {
      return;
    }

    try {
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTop = 0;
      }

      const chapterTitle =
        getChapterTitle(chapter);

      const chapterArabic =
        getChapterArabic(chapter);

      const readData = {
        id: chapter.id,
        title: chapterTitle,
        arabic: chapterArabic,
        category:
          CATEGORY_NAMES[
            chapter.category_id
          ] ||
          "Dua Collection",
        timestamp: Date.now(),
      };

      setLastRead(readData);

      setViewedChapters(
        (current) => {
          if (
            current.includes(
              chapter.id
            )
          ) {
            return current;
          }

          return [
            ...current,
            chapter.id,
          ];
        }
      );

      setSelectedChapter(chapter);
      setDuas([]);
      setDuaError("");
      setDuaLoading(true);

      setDuaPage(1);
      setHasMoreDuas(false);

      const result =
        await getDuasByChapter(
          chapter.id,
          {
            lang: language,
            page: 1,
            limit: 25,
          }
        );

      const items =
        Array.isArray(
          result?.items
        )
          ? result.items
          : Array.isArray(result)
          ? result
          : [];

      setDuas(items);

      const total = Number(
        result?.total ??
          result?.meta?.total ??
          result?.pagination?.total ??
          0
      );

      const apiHasMore =
        result?.has_more ??
        result?.hasMore ??
        result?.meta?.has_more ??
        result?.meta?.hasMore ??
        result?.pagination?.has_more ??
        result?.pagination?.hasMore;

      if (
        typeof apiHasMore ===
        "boolean"
      ) {
        setHasMoreDuas(
          apiHasMore
        );
      } else if (total > 0) {
        setHasMoreDuas(
          items.length < total
        );
      } else {
        setHasMoreDuas(
          items.length === 25
        );
      }
    } catch (err) {
      console.error(
        "Dua detail error:",
        err
      );

      setDuaError(
        err?.message ||
          "Unable to load this dua."
      );
    } finally {
      setDuaLoading(false);
    }
  }

  /* =======================================================
     LOAD MORE DUAS
  ======================================================= */

  async function handleLoadMoreDuas() {
    if (
      !selectedChapter ||
      loadingMoreDuas ||
      !hasMoreDuas
    ) {
      return;
    }

    const nextPage =
      duaPage + 1;

    try {
      setLoadingMoreDuas(true);
      setDuaError("");

      const result =
        await getDuasByChapter(
          selectedChapter.id,
          {
            lang: language,
            page: nextPage,
            limit: 25,
          }
        );

      const newItems =
        Array.isArray(
          result?.items
        )
          ? result.items
          : Array.isArray(result)
          ? result
          : [];

      if (newItems.length > 0) {
        setDuas((current) => [
          ...current,
          ...newItems,
        ]);

        setDuaPage(nextPage);
      }

      const total = Number(
        result?.total ??
          result?.meta?.total ??
          result?.pagination?.total ??
          0
      );

      const apiHasMore =
        result?.has_more ??
        result?.hasMore ??
        result?.meta?.has_more ??
        result?.meta?.hasMore ??
        result?.pagination?.has_more ??
        result?.pagination?.hasMore;

      if (
        typeof apiHasMore ===
        "boolean"
      ) {
        setHasMoreDuas(
          apiHasMore
        );
      } else if (total > 0) {
        setHasMoreDuas(
          duas.length +
            newItems.length <
            total
        );
      } else {
        setHasMoreDuas(
          newItems.length === 25
        );
      }
    } catch (err) {
      console.error(
        "Load more duas error:",
        err
      );

      setDuaError(
        err?.message ||
          "Unable to load more duas."
      );
    } finally {
      setLoadingMoreDuas(false);
    }
  }

  /* =======================================================
     CLOSE CHAPTER
  ======================================================= */

  function handleCloseChapter() {
    setSelectedChapter(null);
    setDuas([]);
    setDuaError("");
    setDuaPage(1);
    setHasMoreDuas(false);
    setLoadingMoreDuas(false);
  }

  /* =======================================================
     FAVORITE
  ======================================================= */

  function handleFavorite(
    chapterId
  ) {
    setFavorites((current) => {
      if (
        current.includes(
          chapterId
        )
      ) {
        return current.filter(
          (id) =>
            id !== chapterId
        );
      }

      return [
        ...current,
        chapterId,
      ];
    });
  }

  /* =======================================================
     RANDOM CHAPTER
  ======================================================= */

  function handleRandomChapter() {
    if (!chapters.length) {
      return;
    }

    const randomIndex =
      Math.floor(
        Math.random() *
          chapters.length
      );

    const randomChapter =
      chapters[randomIndex];

    handleOpenChapter(
      randomChapter
    );
  }

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {
    const ids = chapters
      .map(
        (chapter) =>
          chapter?.category_id
      )
      .filter(
        (id) =>
          id !== null &&
          id !== undefined &&
          id !== ""
      )
      .map(String);

    return [...new Set(ids)].sort(
      (a, b) =>
        Number(a) - Number(b)
    );
  }, [chapters]);

  /* =======================================================
     FILTER CHAPTERS
  ======================================================= */

  const filteredChapters =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return chapters.filter(
        (chapter) => {
          const title =
            getSafeText(
              getChapterTitle(
                chapter
              )
            ).toLowerCase();

          const arabic =
            getSafeText(
              getChapterArabic(
                chapter
              )
            ).toLowerCase();

          const description =
            getSafeText(
              chapter?.description
            ).toLowerCase();

          const matchesSearch =
            !query ||
            title.includes(query) ||
            arabic.includes(query) ||
            description.includes(
              query
            );

          const matchesCategory =
            category === "all" ||
            String(
              chapter?.category_id
            ) ===
              String(category);

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      chapters,
      search,
      category,
    ]);

  /* =======================================================
     RESULTS TEXT
  ======================================================= */

  const resultsText =
    useMemo(() => {
      if (loading) {
        return "Loading chapters...";
      }

      if (
        search ||
        category !== "all"
      ) {
        return `${filteredChapters.length} of ${chapters.length} chapters`;
      }

      return `${chapters.length} chapters available`;
    }, [
      loading,
      search,
      category,
      filteredChapters.length,
      chapters.length,
    ]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <Seo
        title="Daily Duas | Salat Guide"
        description="Explore authentic Islamic duas and supplications for prayer, daily life, travel, protection and more."
      />

      <main className="duas-page">

        {/* =================================================
            TOP IMAGE
        ================================================= */}

        <section className="duas-top-image">
          <img
            src="/images/5d0f10c3-342d-480e-8c6e-dd402ce82f01.png"
            alt="Islamic Duas"
          />

          <div className="duas-top-image__overlay" />

          <div className="duas-top-image__content">
            <span>
              Dua &amp; Supplications
            </span>

            <h2>
              Daily Duas
            </h2>
          </div>
        </section>

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="duas-header">
          <div className="duas-header__inner">
            <div className="duas-header__content">
              <span className="duas-eyebrow">
                Daily Supplications
              </span>

              <h1>
                Beautiful Duas
              </h1>

              <p>
                Explore authentic duas for
                prayer, daily life, travel,
                protection and more.
              </p>
            </div>

            <div className="duas-header__count">
              <strong>
                {chapters.length}
              </strong>

              <span>
                Chapters
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="duas-content">

          {/* =================================================
              CONTROLS
          ================================================= */}

          <div className="duas-controls">

            {/* LANGUAGE */}

            <div className="duas-language">
              <button
                type="button"
                className={`duas-language__button ${
                  languageOpen
                    ? "is-open"
                    : ""
                }`}
                onClick={() =>
                  setLanguageOpen(
                    (current) =>
                      !current
                  )
                }
                aria-haspopup="listbox"
                aria-expanded={
                  languageOpen
                }
              >
                <span
                  className="duas-language__globe"
                  aria-hidden="true"
                >
                  🌐
                </span>

                <span className="duas-language__current">
                  <span className="duas-language__label">
                    {
                      selectedLanguage.label
                    }
                  </span>

                  <span className="duas-language__native">
                    {
                      selectedLanguage.native
                    }
                  </span>
                </span>

                <span
                  className={`duas-language__arrow ${
                    languageOpen
                      ? "is-open"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {languageOpen && (
                <div
                  className="duas-language__menu"
                  role="listbox"
                  aria-label="Language selection"
                >
                  <div className="duas-language__menu-header">
                    <span>
                      Language
                    </span>

                    <small>
                      Choose your language
                    </small>
                  </div>

                  <div className="duas-language__options">
                    {LANGUAGE_OPTIONS.map(
                      (option) => {
                        const isSelected =
                          language ===
                          option.value;

                        return (
                          <button
                            key={
                              option.value
                            }
                            type="button"
                            className={`duas-language__option ${
                              isSelected
                                ? "is-selected"
                                : ""
                            }`}
                            onClick={() =>
                              handleLanguageChange(
                                option.value
                              )
                            }
                            role="option"
                            aria-selected={
                              isSelected
                            }
                          >
                            <span className="duas-language__option-icon">
                              {isSelected
                                ? "✓"
                                : "•"}
                            </span>

                            <span className="duas-language__option-text">
                              <span className="duas-language__option-label">
                                {
                                  option.label
                                }
                              </span>

                              <span className="duas-language__option-native">
                                {
                                  option.native
                                }
                              </span>
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SEARCH */}

            <div className="duas-search">
              <span
                className="duas-search__icon"
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                type="search"
                placeholder="Search duas..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                aria-label="Search duas"
              />

              {search && (
                <button
                  type="button"
                  className="duas-search__clear"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* CATEGORY */}

            <select
              className="duas-category"
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
              aria-label="Select dua category"
            >
              <option value="all">
                All Categories
              </option>

              {categories.map(
                (id) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {CATEGORY_NAMES[id] ||
                      `Category ${id}`}
                  </option>
                )
              )}
            </select>
          </div>

          {/* =================================================
              RESULTS INFO
          ================================================= */}

          <div className="duas-results-info">
            <div>
              <strong>
                {resultsText}
              </strong>

              {(search ||
                category !==
                  "all") && (
                <span>
                  {" "}
                  matching your filters
                </span>
              )}
            </div>

            {favorites.length >
              0 && (
              <span className="duas-results-favorites">
                ♥ {favorites.length}{" "}
                saved
              </span>
            )}
          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="duas-state duas-state--loading">
              <div className="duas-spinner" />

              <h3>
                Loading Duas
              </h3>

              <p>
                Please wait while we
                load the supplications.
              </p>
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="duas-state duas-state--error">
              <div className="duas-state__icon">
                !
              </div>

              <h3>
                Unable to load Duas
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="duas-state__button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>
            </div>
          )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            filteredChapters.length ===
              0 && (
              <div className="duas-state">
                <div className="duas-state__icon">
                  ◌
                </div>

                <h3>
                  No Duas Found
                </h3>

                <p>
                  Try another search
                  term or choose a
                  different category.
                </p>

                {(search ||
                  category !==
                    "all") && (
                  <button
                    type="button"
                    className="duas-state__button"
                    onClick={() => {
                      setSearch("");
                      setCategory(
                        "all"
                      );
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}

          {/* =================================================
              TABLE
          ================================================= */}

          {!loading &&
            !error &&
            filteredChapters.length >
              0 && (
              <div className="duas-table">
                <div className="duas-table__head">
                  <div>
                    No.
                  </div>

                  <div>
                    Chapter
                  </div>

                  <div>
                    Description
                  </div>

                  <div>
                    Favorite
                  </div>

                  <div>
                    Action
                  </div>
                </div>

                <div className="duas-table__body">
                  {filteredChapters.map(
                    (
                      chapter,
                      index
                    ) => (
                      <DuaRow
                        key={
                          chapter.id ??
                          index
                        }
                        chapter={
                          chapter
                        }
                        index={
                          index
                        }
                        isFavorite={favorites.includes(
                          chapter.id
                        )}
                        onFavorite={
                          handleFavorite
                        }
                        onOpen={
                          handleOpenChapter
                        }
                      />
                    )
                  )}
                </div>
              </div>
            )}
        </section>

        {/* =================================================
            MODAL
        ================================================= */}

        {selectedChapter && (
          <div
            className="duas-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dua-modal-title"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                handleCloseChapter();
              }
            }}
          >
            <div className="duas-modal__panel">

              {/* MODAL HEADER */}

              <div className="duas-modal__header">
                <div className="duas-modal__chapter-mark">
                  <span>۞</span>
                </div>

                <div className="duas-modal__header-content">
                  <span className="duas-modal__eyebrow">
                    Dua Chapter
                  </span>

                  <h2 id="dua-modal-title">
                    {getChapterTitle(
                      selectedChapter
                    )}
                  </h2>

                  {getChapterArabic(
                    selectedChapter
                  ) && (
                    <p
                      dir="rtl"
                      className="duas-modal__arabic-title"
                    >
                      {getChapterArabic(
                        selectedChapter
                      )}
                    </p>
                  )}

                  <div className="duas-modal__meta">
                    <span>
                      ✦ {duas.length}{" "}
                      supplications
                      loaded
                    </span>

                    <span>
                      •{" "}
                      {
                        selectedLanguage.label
                      }
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="duas-modal__close"
                  onClick={
                    handleCloseChapter
                  }
                  aria-label="Close chapter"
                >
                  ×
                </button>
              </div>

              {/* MODAL BODY */}

              <div
                className="duas-modal__body"
                ref={modalBodyRef}
              >
                {duaLoading && (
                  <div className="duas-modal__state">
                    <div className="duas-spinner" />

                    <p>
                      Loading
                      supplications...
                    </p>
                  </div>
                )}

                {!duaLoading &&
                  duaError && (
                    <div className="duas-modal__state duas-modal__state--error">
                      <div className="duas-state__icon">
                        !
                      </div>

                      <h3>
                        Unable to load
                        supplications
                      </h3>

                      <p>
                        {duaError}
                      </p>
                    </div>
                  )}

                {!duaLoading &&
                  !duaError &&
                  duas.length ===
                    0 && (
                    <div className="duas-modal__state">
                      <div className="duas-state__icon">
                        ◌
                      </div>

                      <h3>
                        No
                        supplications
                        found
                      </h3>

                      <p>
                        There are no
                        duas available
                        in this chapter.
                      </p>
                    </div>
                  )}

                {!duaLoading &&
                  !duaError &&
                  duas.length > 0 && (
                    <>
                      <div className="dua-details-list">
                        {duas.map(
                          (
                            dua,
                            index
                          ) => (
                            <DuaDetailCard
                              key={
                                dua.id ??
                                index
                              }
                              dua={
                                dua
                              }
                              index={
                                index
                              }
                            />
                          )
                        )}
                      </div>

                      {hasMoreDuas && (
                        <div className="duas-load-more">
                          <div className="duas-load-more__decoration">
                            <span>
                              ✦
                            </span>

                            <span>
                              ✦
                            </span>

                            <span>
                              ✦
                            </span>
                          </div>

                          <p>
                            More
                            supplications
                            are
                            available
                            in this
                            chapter.
                          </p>

                          <button
                            type="button"
                            className="duas-load-more__button"
                            onClick={
                              handleLoadMoreDuas
                            }
                            disabled={
                              loadingMoreDuas
                            }
                          >
                            {loadingMoreDuas ? (
                              <>
                                <span className="duas-load-more__spinner" />

                                Loading
                                more
                                duas...
                              </>
                            ) : (
                              <>
                                <span>
                                  Load
                                  More
                                  Duas
                                </span>

                                <span aria-hidden="true">
                                  ↓
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {!hasMoreDuas &&
                        duas.length >
                          0 && (
                          <div className="duas-end-message">
                            <span>
                              ✦
                            </span>

                            <p>
                              You
                              have
                              reached
                              the end
                              of this
                              chapter.
                            </p>

                            <span>
                              ✦
                            </span>
                          </div>
                        )}
                    </>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            CONTENT BEFORE FOOTER
        ================================================= */}

        {!loading &&
          !error &&
          chapters.length > 0 && (
            <>

              {/* =================================================
                  EXPLORE BY INTENTION
              ================================================= */}

              <DuaCategoryExplorer
                categories={
                  categories
                }
                chapters={
                  chapters
                }
                onSelectCategory={(
                  categoryId
                ) => {
                  setCategory(
                    String(
                      categoryId
                    )
                  );

                  window.scrollTo({
                    top: 0,
                    behavior:
                      "smooth",
                  });
                }}
              />

              {/* =================================================
                  DUA JOURNEY
              ================================================= */}

              <DuaJourney
                chapters={
                  chapters
                }
                favorites={
                  favorites
                }
                viewedChapters={
                  viewedChapters
                }
                lastRead={
                  lastRead
                }
                onContinue={
                  handleOpenChapter
                }
              />

              {/* =================================================
                  PAUSE & REFLECT
              ================================================= */}

              <DuaReflection />

              {/* =================================================
                  QUICK DASHBOARD
              ================================================= */}

              <DuaQuickDashboard
                chapters={
                  chapters
                }
                favorites={
                  favorites
                }
                lastRead={
                  lastRead
                }
                onContinue={
                  handleOpenChapter
                }
                onOpenRandom={
                  handleRandomChapter
                }
              />

              {/* =================================================
                  DAILY DUA
              ================================================= */}

              <DailyDuaFeature
                duas={
                  featuredDuas
                }
                language={
                  language
                }
              />

              {/* =================================================
                  FAQ / COMMON QUESTIONS
              ================================================= */}

              <DuaFAQ />
{/* =========================================================
   TODAY'S DUA
========================================================= */}

<section className="todays-dua-section">
  <div className="todays-dua-header">
    <span className="todays-dua-label">Today's Dua</span>
    <h2>Morning Dua</h2>
    <p>
      Begin your day with remembrance, gratitude, and a peaceful heart.
    </p>
  </div>

  <div className="todays-dua-card">
    <div className="todays-dua-icon">
      🌅
    </div>

    <div className="todays-dua-content">
      <span className="todays-dua-badge">Morning Dua</span>

      <h3>
        Start your morning with Allah's remembrance
      </h3>

      <p className="todays-dua-arabic">
        أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ
      </p>

      <p className="todays-dua-description">
        Begin your morning by remembering Allah and seeking
        His blessings, guidance, and protection throughout the day.
      </p>

      <button
        type="button"
        className="todays-dua-link"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        Continue reading
        <span>→</span>
      </button>
    </div>
  </div>
</section>
            </>

          )}

      </main>
    </>

  );
}
