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

/* =========================================================
   MODERN FEATURES
========================================================= */

const FEATURES = [
  {
    icon: GlobeIcon,
    number: "01",
    title: "Prayer Times",
    description:
      "Get clear and reliable prayer times based on the city you choose, wherever you are.",
  },
  {
    icon: CompassIcon,
    number: "02",
    title: "Qibla Direction",
    description:
      "Quickly discover the direction of the Kaaba and keep your prayers aligned wherever life takes you.",
  },
  {
    icon: BookIcon,
    number: "03",
    title: "Islamic Resources",
    description:
      "Explore useful duas, Quran resources, prayer guidance and meaningful Islamic content.",
  },
  {
    icon: ShieldIcon,
    number: "04",
    title: "Simple Experience",
    description:
      "Everything is organized in one clean interface that feels easy on mobile, tablet and desktop.",
  },
];


/* =========================================================
   VALUES
========================================================= */

const VALUES = [
  {
    title: "Clarity",
    description:
      "We keep information simple, organized and easy to understand.",
  },
  {
    title: "Accessibility",
    description:
      "Our tools are designed to remain useful across different devices and locations.",
  },
  {
    title: "Purpose",
    description:
      "Every feature is built around making everyday prayer routines easier.",
  },
];


/* =========================================================
   ABOUT PAGE
========================================================= */

function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Salat Guide and our mission to make prayer times, Qibla, duas, Quran and Islamic resources simple and accessible."
      />


      {/* =====================================================
          PAGE BANNER
      ====================================================== */}

      <PageBanner
        image={aboutBanner}
        icon={MosqueIcon}
        title="About Salat Guide"
        description="Thoughtfully designed tools for a more connected prayer routine."
        variant="light"
      />


      <main className="about-page">


        {/* =====================================================
            MODERN INTRO / WELCOME
        ====================================================== */}

        <section className="about-modern-intro">
          <div className="container">

            <div className="about-modern-intro__grid">

              {/* LEFT */}
              <div className="about-modern-intro__content">

                <span className="about-eyebrow">
                  <span className="about-eyebrow__line"></span>
                  WHY SALAT GUIDE
                </span>

                <h2>
                  A simpler way to
                  <span> stay connected.</span>
                </h2>

                <p className="about-modern-intro__lead">
                  Salat Guide brings essential Islamic tools together in
                  one calm and accessible space, helping you spend less
                  time searching and more time focusing on your worship.
                </p>

                <div className="about-modern-intro__actions">

                  <div className="about-mini-point">
                    <span className="about-mini-point__icon">
                      ✓
                    </span>

                    <div>
                      <strong>Designed for everyday use</strong>
                      <p>
                        Simple tools without unnecessary complexity.
                      </p>
                    </div>
                  </div>

                  <div className="about-mini-point">
                    <span className="about-mini-point__icon">
                      ✓
                    </span>

                    <div>
                      <strong>Built around your prayer journey</strong>
                      <p>
                        Prayer times, Qibla and Islamic resources in one place.
                      </p>
                    </div>
                  </div>

                </div>

              </div>


              {/* RIGHT VISUAL */}
              <div className="about-modern-intro__visual">

                <div className="about-orbit about-orbit--one"></div>
                <div className="about-orbit about-orbit--two"></div>

                <div className="about-main-visual">

                  <img
                    src={aboutBanner}
                    alt="Islamic architecture"
                  />

                  <div className="about-floating-card about-floating-card--top">

                    <span className="about-floating-card__icon">
                      <MosqueIcon aria-hidden="true" />
                    </span>

                    <div>
                      <small>YOUR DAILY GUIDE</small>
                      <strong>Prayer made easier</strong>
                    </div>

                  </div>


                  <div className="about-floating-card about-floating-card--bottom">

                    <span className="about-floating-check">
                      ✓
                    </span>

                    <div>
                      <strong>Simple & Accessible</strong>
                      <small>Built for everyday moments</small>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            STATS
        ====================================================== */}

        <section className="about-stats">

          <div className="container">

            <div className="about-stats__grid">

              <div className="about-stat">
                <strong>5</strong>
                <span>Daily Prayers</span>
              </div>

              <div className="about-stat">
                <strong>24/7</strong>
                <span>Accessible Tools</span>
              </div>

              <div className="about-stat">
                <strong>01</strong>
                <span>Simple Platform</span>
              </div>

              <div className="about-stat">
                <strong>∞</strong>
                <span>Places to Explore</span>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FEATURES
        ====================================================== */}

        <section className="about-features">
          <div className="container">
            <div className="about-section-title">

              <span className="about-eyebrow">
                <span className="about-eyebrow__line"></span>
                WHAT YOU CAN DO
              </span>

              <h2>
                Everything important,
                <span> in one place.</span>
              </h2>

              <p>
                Practical tools and resources created to support
                different parts of your daily Islamic routine.
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

                    <div className="about-feature-card__number">
                      {feature.number}
                    </div>

                    <div className="about-feature-card__icon">
                      <Icon aria-hidden="true" />
                    </div>

                    <h3>{feature.title}</h3>

                    <p>{feature.description}</p>

                    <span className="about-feature-card__arrow">
                      →
                    </span>

                  </article>
                );

              })}

            </div>

          </div>

        </section>


        {/* =====================================================
            HOW IT HELPS
        ====================================================== */}

        <section className="about-help">

          <div className="container">

            <div className="about-help__header">

              <div>

                <span className="about-eyebrow">
                  <span className="about-eyebrow__line"></span>
                  BUILT WITH PURPOSE
                </span>

                <h2>
                  Less searching.
                  <span> More worship.</span>
                </h2>

              </div>

              <p>
                Salat Guide focuses on removing unnecessary steps from
                everyday prayer tasks so that useful information is
                always close when you need it.
              </p>

            </div>


            <div className="about-help__cards">

              <article className="about-help-card">

                <span className="about-help-card__number">
                  01
                </span>

                <div>
                  <h3>Choose your location</h3>

                  <p>
                    Select a city to access relevant prayer information
                    for your location.
                  </p>
                </div>

              </article>


              <article className="about-help-card">

                <span className="about-help-card__number">
                  02
                </span>

                <div>
                  <h3>Find what you need</h3>

                  <p>
                    Move between prayer times, Qibla, duas, Quran and
                    other Islamic resources.
                  </p>
                </div>

              </article>


              <article className="about-help-card">

                <span className="about-help-card__number">
                  03
                </span>

                <div>
                  <h3>Keep your routine simple</h3>

                  <p>
                    Use a clean interface designed to keep important
                    information easy to reach.
                  </p>
                </div>

              </article>

            </div>

          </div>

        </section>


        {/* =====================================================
            MISSION
        ====================================================== */}

        <section className="about-mission">

          <div className="container">

            <div className="about-mission__grid">

              <div className="about-mission__image">

                <img
                  src={aboutBanner}
                  alt="Beautiful Islamic architecture"
                />

                <div className="about-mission__badge">

                  <MosqueIcon aria-hidden="true" />

                  <div>
                    <strong>Salat Guide</strong>
                    <span>
                      Simple. Useful. Meaningful.
                    </span>
                  </div>

                </div>

              </div>


              <div className="about-mission__content">

                <span className="about-eyebrow">
                  <span className="about-eyebrow__line"></span>
                  OUR MISSION
                </span>

                <h2>
                  Technology that supports
                  <span> your daily Salah.</span>
                </h2>

                <p>
                  We believe digital tools should make everyday worship
                  more convenient without making the experience feel
                  complicated.
                </p>

                <p>
                  Salat Guide is created as a practical companion for
                  Muslims who want quick access to prayer information
                  and useful Islamic resources wherever they are.
                </p>


                <div className="about-mission__points">

                  <div>
                    <span>✓</span>
                    <p>Clear and practical information</p>
                  </div>

                  <div>
                    <span>✓</span>
                    <p>Simple navigation and modern design</p>
                  </div>

                  <div>
                    <span>✓</span>
                    <p>Useful tools for everyday prayer</p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            VALUES
        ====================================================== */}

        <section className="about-values">

          <div className="container">

            <div className="about-section-title">

              <span className="about-eyebrow">
                <span className="about-eyebrow__line"></span>
                WHAT MATTERS TO US
              </span>

              <h2>
                Simple principles,
                <span> meaningful experience.</span>
              </h2>

            </div>


            <div className="about-values__grid">

              {VALUES.map((value, index) => (

                <article
                  className="about-value-card"
                  key={value.title}
                >

                  <span className="about-value-card__number">
                    0{index + 1}
                  </span>

                  <h3>{value.title}</h3>

                  <p>{value.description}</p>

                </article>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="about-cta">

          <div className="container">

            <div className="about-cta__content">

              <span className="about-cta__icon">
                <MosqueIcon aria-hidden="true" />
              </span>

              <span className="about-cta__small">
                YOUR PRAYER JOURNEY
              </span>

              <h2>
                Keep what matters
                <span> close.</span>
              </h2>

              <p>
                Explore prayer times, Qibla direction, duas, Quran
                resources and more with Salat Guide.
              </p>

              <div className="about-cta__line"></div>
            </div>

          </div>

        </section>

      </main>
    </>
  );
}
export default About;