import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";

import {
  GlobeIcon,
  BookIcon,
  ShieldIcon,
  CompassIcon,
  MosqueIcon,
} from "../components/Icons.jsx";

import aboutBanner from "../assets/images/about-banner.jpg";

import "./pages.css";
import "./About.css";

const FEATURES = [
  {
    icon: GlobeIcon,
    number: "01",
    title: "Accurate Prayer Times",
    description:
      "Find reliable Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times based on your selected city.",
  },
  {
    icon: CompassIcon,
    number: "02",
    title: "Find the Qibla",
    description:
      "Use the Qibla direction feature to easily find the direction of the Kaaba wherever you are.",
  },
  {
    icon: BookIcon,
    number: "03",
    title: "Islamic Resources",
    description:
      "Explore helpful prayer guides, duas, Quran resources, and simple Islamic information.",
  },
  {
    icon: ShieldIcon,
    number: "04",
    title: "Simple & Accessible",
    description:
      "A clean and responsive experience designed to work smoothly across phones, tablets, and desktops.",
  },
];

function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Salat Guide, a simple and accessible platform for prayer times, Qibla direction, duas, Quran, and Islamic resources."
      />

      {/* =========================
          HERO BANNER
      ========================== */}
      <PageBanner
        image={aboutBanner}
        icon={MosqueIcon}
        title="About Salat Guide"
        description="A simple companion for your daily prayers, wherever life takes you."
        variant="light"
      />

      <main className="about-page">
        {/* =========================
            INTRODUCTION
        ========================== */}
        <section className="about-intro">
          <div className="container">
            <div className="about-intro__grid">
              <div className="about-intro__heading">
                <span className="about-eyebrow">
                  <span className="about-eyebrow__line"></span>
                  ABOUT US
                </span>

                <h2>
                  Stay Connected With Your{" "}
                  <span>Daily Salah</span>
                </h2>
              </div>

              <div className="about-intro__text">
                <p>
                  Salat Guide is designed to make daily prayer easier,
                  simpler, and more accessible. Whether you are at home,
                  traveling, or going about your daily routine, you can
                  quickly find the prayer information you need.
                </p>

                <p>
                  Our goal is to provide a clean and helpful space where
                  Muslims can check prayer times, find the Qibla direction,
                  explore duas, and discover useful Islamic resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            HIGHLIGHT
        ========================== */}
        <section className="about-highlight">
          <div className="container">
            <div className="about-highlight__box">
              <div className="about-highlight__pattern"></div>

              <div className="about-highlight__content">
                <span className="about-highlight__small">
                  YOUR DAILY COMPANION
                </span>

                <h2>
                  Prayer made <span>simple.</span>
                </h2>

                <p>
                  From your first prayer of the day to Isha at night, Salat
                  Guide helps you keep your daily Salah close at hand.
                </p>
              </div>

              <div className="about-highlight__icon">
                <MosqueIcon aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            FEATURES
        ========================== */}
        <section className="about-features">
          <div className="container">
            <div className="about-section-title">
              <span className="about-eyebrow">
                <span className="about-eyebrow__line"></span>
                WHAT WE OFFER
              </span>

              <h2>
                Everything You Need for Your{" "}
                <span>Prayer Journey</span>
              </h2>

              <p>
                Helpful tools and resources designed to make your everyday
                Islamic routine easier.
              </p>
            </div>

            <div className="about-feature-grid">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    className="about-feature-card"
                    key={feature.title}
                  >
                    <div className="about-feature-card__top">
                      <span className="about-feature-card__number">
                        {feature.number}
                      </span>

                      <div className="about-feature-card__icon">
                        <Icon aria-hidden="true" />
                      </div>
                    </div>

                    <h3>{feature.title}</h3>

                    <p>{feature.description}</p>

                    <div className="about-feature-card__bottom">
                      <span></span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================
            MISSION
        ========================== */}
        <section className="about-mission">
          <div className="container">
            <div className="about-mission__grid">
              <div className="about-mission__image">
                <img
                  src={aboutBanner}
                  alt="Islamic architecture"
                />

                <div className="about-mission__badge">
                  <MosqueIcon aria-hidden="true" />
                  <div>
                    <strong>Salat Guide</strong>
                    <span>Simple. Meaningful. Helpful.</span>
                  </div>
                </div>
              </div>

              <div className="about-mission__content">
                <span className="about-eyebrow">
                  <span className="about-eyebrow__line"></span>
                  OUR PURPOSE
                </span>

                <h2>
                  Making Your Daily{" "}
                  <span>Prayer Routine Easier</span>
                </h2>

                <p>
                  We believe technology can make everyday worship more
                  convenient without making it complicated.
                </p>

                <p>
                  Salat Guide brings essential prayer tools together in one
                  simple place, helping you spend less time searching and
                  more time focusing on your Salah.
                </p>

                <div className="about-mission__points">
                  <div>
                    <span>✓</span>
                    <p>Simple prayer information</p>
                  </div>

                  <div>
                    <span>✓</span>
                    <p>Useful Islamic resources</p>
                  </div>

                  <div>
                    <span>✓</span>
                    <p>Designed for everyday use</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            FINAL CTA
        ========================== */}
        <section className="about-cta">
          <div className="container">
            <div className="about-cta__content">
              <span className="about-cta__icon">
                <MosqueIcon aria-hidden="true" />
              </span>

              <h2>
                Keep Your Salah <span>Close</span>
              </h2>

              <p>
                Explore prayer times, Qibla direction, duas, Quran, and more
                with Salat Guide.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
