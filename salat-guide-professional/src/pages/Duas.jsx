import Seo from "../components/Seo.jsx";
import DuaBanner from "../components/DuaBanner.jsx";
import "./Duas.css";

const DUA_CATEGORIES = [
  {
    icon: "☀",
    title: "Daily Duas",
    text: "Essential duas for everyday life.",
  },
  {
    icon: "◐",
    title: "Morning & Evening",
    text: "Duas for morning and evening.",
  },
  {
    icon: "♢",
    title: "Protection",
    text: "Duas for safety and protection.",
  },
  {
    icon: "❧",
    title: "Forgiveness",
    text: "Seeking forgiveness from Allah.",
  },
  {
    icon: "♥",
    title: "Gratitude",
    text: "Thanking Allah for His blessings.",
  },
];

const DUA_TIPS = [
  {
    icon: "♥",
    title: "Be Sincere",
    text: "Make dua with a pure and sincere heart.",
  },
  {
    icon: "◷",
    title: "Best Times",
    text: "Make dua in blessed and peaceful moments.",
  },
  {
    icon: "♧",
    title: "Have Taqwa",
    text: "Have faith that Allah will accept your dua.",
  },
  {
    icon: "➤",
    title: "Never Give Up",
    text: "Keep making dua. Allah always listens.",
  },
];

function Duas() {
  return (
    <>
      <Seo
        title="Duas"
        description="Beautiful Islamic duas for daily life, protection, forgiveness and gratitude."
      />

      <main className="dua-page">

        {/* Background overlay */}
        <div className="dua-page__overlay" />

        {/* =========================================
            HERO
        ========================================= */}

        <section className="dua-page__hero">

          <div className="dua-page__breadcrumb">
            <span>⌂</span>
            <span>Home</span>
            <b>›</b>
            <span>Duas</span>
          </div>

          <div className="dua-page__decoration">
            <span></span>
            <i>✧</i>
            <span></span>
          </div>

          <h1>Duas</h1>

          <p>
            Supplications to strengthen your faith
            and bring peace to your heart.
          </p>

          <div className="dua-page__ornament">
            <span></span>
            <b>❀</b>
            <span></span>
          </div>

        </section>


        {/* =========================================
            DUA OF THE DAY
        ========================================= */}

        <section className="dua-page__main-card">

          <div className="dua-page__card-header">

            <span className="dua-page__badge">
              ☆ &nbsp; Dua of the Day
            </span>

            <button
              type="button"
              className="dua-page__bookmark"
              aria-label="Bookmark dua"
            >
              ♧
            </button>

          </div>

          <DuaBanner />

        </section>


        {/* =========================================
            CATEGORIES
        ========================================= */}

        <section className="dua-page__categories">

          <div className="dua-section-title">
            <span></span>
            <h2>Browse Duas by Category</h2>
            <span></span>
          </div>

          <div className="dua-category-grid">

            {DUA_CATEGORIES.map((category) => (
              <article
                className="dua-category-card"
                key={category.title}
              >

                <div className="dua-category-card__icon">
                  {category.icon}
                </div>

                <h3>{category.title}</h3>

                <p>{category.text}</p>

                <span className="dua-category-card__arrow">
                  →
                </span>

              </article>
            ))}

          </div>

        </section>


        {/* =========================================
            TIPS
        ========================================= */}

        <section className="dua-page__tips">

          <div className="dua-page__tips-title">

            <h2>Tips for Making Dua</h2>

            <span></span>

          </div>

          <div className="dua-tips-grid">

            {DUA_TIPS.map((tip) => (
              <article
                className="dua-tip"
                key={tip.title}
              >

                <div className="dua-tip__icon">
                  {tip.icon}
                </div>

                <div>
                  <h3>{tip.title}</h3>

                  <p>{tip.text}</p>
                </div>

              </article>
            ))}

          </div>

        </section>


        {/* =========================================
            QURAN QUOTE
        ========================================= */}

        <section className="dua-page__quote">

          <span className="dua-page__quote-mark">
            “
          </span>

          <p>
            Your Lord says, “Call upon Me;
            I will respond to you.”
          </p>

          <span className="dua-page__quote-mark">
            ”
          </span>

          <small>
            Surah Ghafir (40:60)
          </small>

        </section>

      </main>
    </>
  );
}

export default Duas;
