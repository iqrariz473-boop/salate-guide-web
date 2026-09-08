import Seo from "../components/Seo.jsx";
import DuaBanner from "../components/DuaBanner.jsx";

import "./Duas.css";

/* =========================================================
   DUA CATEGORIES
========================================================= */

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

/* =========================================================
   DUA COLLECTION
========================================================= */

const DUAS = [
  {
    category: "Daily",
    title: "Dua Before Eating",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    meaning: "In the name of Allah.",
  },

  {
    category: "Daily",
    title: "Dua After Eating",
    arabic:
      "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration:
      "Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.",
    meaning:
      "All praise is for Allah who fed me this and provided it for me without any power or strength from me.",
  },

  {
    category: "Protection",
    title: "Dua for Protection",
    arabic:
      "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration:
      "A'udhu bi kalimatillahit-tammati min sharri ma khalaq.",
    meaning:
      "I seek refuge in the perfect words of Allah from the evil of what He has created.",
  },

  {
    category: "Forgiveness",
    title: "Dua for Forgiveness",
    arabic:
      "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration:
      "Rabbighfir li wa tub 'alayya innaka antat-Tawwabur-Rahim.",
    meaning:
      "My Lord, forgive me and accept my repentance. You are the Most Accepting of repentance, the Most Merciful.",
  },

  {
    category: "Morning & Evening",
    title: "Morning Dua",
    arabic:
      "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration:
      "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur.",
    meaning:
      "O Allah, by You we enter the morning, by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
  },

  {
    category: "Gratitude",
    title: "Dua for Gratitude",
    arabic:
      "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
    transliteration:
      "Rabbi awzi'ni an ashkura ni'mataka allati an'amta 'alayya.",
    meaning:
      "My Lord, enable me to be grateful for Your favor which You have bestowed upon me.",
  },
];

/* =========================================================
   TIPS
========================================================= */

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

/* =========================================================
   COMPONENT
========================================================= */

function Duas() {
  return (
    <>
      <Seo
        title="Duas"
        description="Beautiful Islamic duas for daily life, protection, forgiveness and gratitude."
      />

      <main className="dua-page">

        {/* =================================================
            BACKGROUND OVERLAY
        ================================================= */}

        <div className="dua-page__overlay" />

        {/* =================================================
            HERO
        ================================================= */}

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
            Beautiful supplications to bring peace, gratitude and
            remembrance into your daily life.
          </p>

          <div className="dua-page__ornament">
            <span></span>
            <b>✦</b>
            <span></span>
          </div>

        </section>

        {/* =================================================
            DUA OF THE DAY
        ================================================= */}

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

        {/* =================================================
            BEAUTIFUL DUAS
        ================================================= */}

        <section className="dua-page__collection">

          <div className="dua-section-heading">

            <span className="dua-section-heading__label">
              DAILY REMEMBRANCE
            </span>

            <h2>Beautiful Duas</h2>

            <p>
              Short and meaningful supplications for everyday moments.
            </p>

            <div className="dua-section-heading__line">
              <span></span>
              <b>✦</b>
              <span></span>
            </div>

          </div>

          <div className="dua-list">

            {DUAS.map((dua) => (
              <article className="dua-card" key={dua.title}>

                <div className="dua-card__header">

                  <div>
                    <span className="dua-card__category">
                      {dua.category}
                    </span>

                    <h3>{dua.title}</h3>
                  </div>

                  <button
                    type="button"
                    className="dua-card__bookmark"
                    aria-label={`Bookmark ${dua.title}`}
                  >
                    ♡
                  </button>

                </div>

                <div className="dua-card__arabic">
                  {dua.arabic}
                </div>

                <div className="dua-card__divider"></div>

                <p className="dua-card__transliteration">
                  {dua.transliteration}
                </p>

                <p className="dua-card__meaning">
                  <strong>Meaning:</strong> {dua.meaning}
                </p>

              </article>
            ))}

          </div>

        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="dua-page__categories">

          <div className="dua-section-heading">

            <span className="dua-section-heading__label">
              EXPLORE
            </span>

            <h2>Browse Duas by Category</h2>

            <p>
              Find meaningful duas for every moment of your daily life.
            </p>

            <div className="dua-section-heading__line">
              <span></span>
              <b>✦</b>
              <span></span>
            </div>

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

        {/* =================================================
            TIPS
        ================================================= */}

        <section className="dua-page__tips">

          <div className="dua-page__tips-title">

            <h2>Tips for Making Dua</h2>

            <span></span>

          </div>

          <div className="dua-tips-grid">

            {DUA_TIPS.map((tip) => (
              <article className="dua-tip" key={tip.title}>

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

        {/* =================================================
            QUOTE
        ================================================= */}

        <section className="dua-page__quote">

          <span className="dua-page__quote-mark">
            “
          </span>

          <p>
            Your Lord says, “Call upon Me; I will respond to you.”
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