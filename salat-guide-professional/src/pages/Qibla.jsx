import Seo from "../components/Seo.jsx";
import QiblaCompass from "../components/QiblaCompass.jsx";

import "./Qibla.css";


/* =========================================================
   FEATURES
========================================================= */

const FEATURES = [
  {
    icon: "➤",
    title: "Location Based",
    text: "Accurate direction from your location",
  },
  {
    icon: "◉",
    title: "Live Compass",
    text: "Real-time compass with live direction",
  },
  {
    icon: "◎",
    title: "Worldwide",
    text: "Qibla for every Muslim, anywhere",
  },
];


/* =========================================================
   HOW IT WORKS
========================================================= */

const STEPS = [
  {
    icon: "⌖",
    number: "01",
    title: "Allow Location",
    text: "Enable your location to allow us to calculate your exact position.",
  },
  {
    icon: "▣",
    number: "02",
    title: "Hold Your Device Flat",
    text: "Place your device on a flat surface away from magnetic objects.",
  },
  {
    icon: "✦",
    number: "03",
    title: "Face the Kaaba",
    text: "Follow the compass direction and turn yourself towards the Kaaba.",
  },
];


/* =========================================================
   QIBLA PAGE
========================================================= */

function Qibla() {
  return (
    <>
      <Seo
        title="Qibla Direction"
        description="Find the exact direction of the Kaaba in Makkah from your current location."
      />

      <main className="qibla-page">


        {/* =================================================
            HERO SECTION
        ================================================= */}

        <section className="qibla-hero">

          {/* Decorative background */}

          <div className="qibla-hero-pattern"></div>

          <div className="qibla-hero-overlay"></div>


          <div className="container qibla-hero-inner">


            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="qibla-hero-content">


              {/* EYEBROW */}

              <div className="qibla-eyebrow">

                <span className="qibla-eyebrow-line"></span>

                <div className="qibla-eyebrow-icon">
                  <span aria-hidden="true">
                    ⌖
                  </span>
                </div>

                <span>
                  QIBLA DIRECTION
                </span>

                <i aria-hidden="true">
                  ◆
                </i>

              </div>


              {/* MAIN HEADING */}

              <h1>
                Turn Towards
                <span>
                  The Holy Kaaba
                </span>
              </h1>


              {/* DESCRIPTION */}

              <p className="qibla-hero-description">
                Find the exact direction of the Kaaba in
                Makkah from your current location.
              </p>


              {/* =================================================
                  FEATURES
              ================================================= */}

              <div className="qibla-features">

                {FEATURES.map((feature, index) => (

                  <div
                    className="qibla-feature"
                    key={feature.title}
                  >

                    {/* ICON */}

                    <div className="qibla-feature-icon">
                      <span>
                        {feature.icon}
                      </span>
                    </div>


                    {/* CONTENT */}

                    <div className="qibla-feature-info">

                      <div className="qibla-feature-top">

                        <span>
                          0{index + 1}
                        </span>

                        <strong>
                          {feature.title}
                        </strong>

                      </div>

                      <p>
                        {feature.text}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
                RIGHT COMPASS
            ================================================= */}

            <div
              className="qibla-hero-compass"
              id="qibla-compass"
            >

              <div className="qibla-compass-wrapper">

                <QiblaCompass />

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section className="qibla-guide">

          <div className="container">


            {/* SECTION HEADING */}

            <div className="qibla-section-heading">

              <span className="section-kicker">
                ✦ HOW IT WORKS ✦
              </span>

              <h2>
                Find your Qibla in{" "}
                <em>
                  three simple steps
                </em>
              </h2>

              <p>
                Follow these simple steps to find the
                direction of the Holy Kaaba accurately.
              </p>

            </div>


            {/* =================================================
                STEPS
            ================================================= */}

            <div className="qibla-steps">

              {STEPS.map((step) => (

                <article
                  className="qibla-step"
                  key={step.number}
                >


                  {/* STEP NUMBER */}

                  <div className="qibla-step-number">
                    {step.number}
                  </div>


                  {/* ICON */}

                  <div className="qibla-step-icon">
                    {step.icon}
                  </div>


                  {/* CONTENT */}

                  <div className="qibla-step-content">

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.text}
                    </p>

                  </div>


                  {/* ARROW */}

                  <div
                    className="qibla-step-arrow"
                    aria-hidden="true"
                  >
                    →
                  </div>

                </article>

              ))}

            </div>


            {/* =================================================
                ABOUT KAABA
            ================================================= */}

            <div className="qibla-about">


              {/* DECORATION */}

              <div className="qibla-about-decoration"></div>


              {/* CONTENT */}

              <div className="qibla-about-content">

                <span className="section-kicker">
                  THE HOLY QIBLA
                </span>

                <h2>
                  The Kaaba
                  <span>
                    {" "}in Makkah
                  </span>
                </h2>

                <p>
                  Muslims around the world face the
                  Kaaba in Masjid al-Haram, Makkah,
                  during their daily prayers. The Qibla
                  gives Muslims a shared direction of
                  worship wherever they are.
                </p>


                {/* POINTS */}

                <div className="qibla-about-points">

                  <div>
                    <span>✦</span>
                    <p>
                      Sacred direction of prayer
                    </p>
                  </div>

                  <div>
                    <span>✦</span>
                    <p>
                      Center of Masjid al-Haram
                    </p>
                  </div>

                  <div>
                    <span>✦</span>
                    <p>
                      Faced by Muslims worldwide
                    </p>
                  </div>

                </div>

              </div>


              {/* KAABA ART */}

              <div className="qibla-kaaba-art">

                <div className="kaaba-ring">

                  <div className="kaaba-symbol">
                    🕋
                  </div>

                </div>

                <span>
                  MAKKAH
                </span>

              </div>

            </div>


            {/* =================================================
                INFORMATION NOTE
            ================================================= */}

            <div className="qibla-note">

              <div className="qibla-note-icon">
                ⓘ
              </div>

              <div>

                <strong>
                  Compass Accuracy
                </strong>

                <p>
                  For better compass accuracy, enable
                  location services and keep your device
                  away from magnetic objects.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}


export default Qibla;