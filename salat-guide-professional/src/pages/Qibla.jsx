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

        <section
          className="qibla-hero"
          style={{

          }}
        >

          {/* Background Overlay */}

          <div className="qibla-hero-overlay"></div>

          <div className="container qibla-hero-inner">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="qibla-hero-content">

              {/* EYEBROW */}

              <div className="qibla-eyebrow">

                <div className="qibla-eyebrow-icon">
                  <span aria-hidden="true">⌖</span>
                </div>

                <span>QIBLA DIRECTION</span>

                <i>◆</i>

              </div>


              {/* MAIN HEADING */}

              <h1>
                Turn Towards
                <span>The Holy Kaaba</span>
              </h1>


              {/* DESCRIPTION */}

              <p className="qibla-hero-description">
                Find the exact direction of the Kaaba in
                Makkah from your current location.
              </p>


              {/* =================================================
                  FEATURE CARDS
              ================================================= */}

              <div className="qibla-features">

                {FEATURES.map((feature) => (
                  <div
                    className="qibla-feature"
                    key={feature.title}
                  >

                    <div className="qibla-feature-icon">
                      {feature.icon}
                    </div>

                    <div className="qibla-feature-info">

                      <strong>
                        {feature.title}
                      </strong>

                      <span>
                        {feature.text}
                      </span>

                    </div>

                  </div>
                ))}

              </div>

            </div>


            {/* =================================================
                RIGHT COMPASS CARD
            ================================================= */}

            <div
              className="qibla-hero-compass"
              id="qibla-compass"
            >

              {/* =================================================
                  COMPASS
              ================================================= */}

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

            <div className="qibla-guide-heading">

              <span>
                ✦ HOW IT WORKS ✦
              </span>

              <h2>
                Find your Qibla in{" "}
                <strong>
                  three simple steps
                </strong>
              </h2>

            </div>


            <div className="qibla-steps">

              {STEPS.map((step) => (
                <article
                  className="qibla-step"
                  key={step.number}
                >

                  <div className="qibla-step-icon">
                    {step.icon}
                  </div>

                  <div className="qibla-step-number">
                    {step.number}
                  </div>

                  <div className="qibla-step-content">

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.text}
                    </p>

                  </div>

                </article>
              ))}

            </div>


            {/* =================================================
                ABOUT KAABA
            ================================================= */}

            <div className="qibla-about">

              <div>

                <span>
                  THE HOLY QIBLA
                </span>

                <h2>
                  The Kaaba in Makkah
                </h2>

                <p>
                  Muslims around the world face the
                  Kaaba in Masjid al-Haram, Makkah,
                  during their daily prayers. The Qibla
                  gives Muslims a shared direction of
                  worship wherever they are.
                </p>

              </div>

              <div className="qibla-kaaba">
                🕋
              </div>

            </div>


            {/* =================================================
                INFO NOTE
            ================================================= */}

            <div className="qibla-note">

              <span>
                ⓘ
              </span>

              <p>
                For better compass accuracy, enable
                location services and keep your device
                away from magnetic objects.
              </p>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default Qibla;