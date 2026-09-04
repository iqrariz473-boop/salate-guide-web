import Seo from "../components/Seo.jsx";
import QiblaCompass from "../components/QiblaCompass.jsx";
import { CompassIcon } from "../components/Icons.jsx";

import qiblaBanner from "../assets/images/qibla-banner.jpg";

import "./Qibla.css";

const FEATURES = [
  {
    icon: "⌖",
    title: "Location Based",
    text: "Accurate direction from your location",
  },
  {
    icon: "◎",
    title: "Live Compass",
    text: "Real-time compass with live direction",
  },
  {
    icon: "◎",
    title: "Worldwide",
    text: "Qibla for every Muslim, anywhere",
  },
];

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
  const scrollToCompass = () => {
    document
      .getElementById("qibla-compass")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  return (
    <>
      <Seo
        title="Qibla Direction"
        description="Find the exact direction of the Kaaba in Makkah from your current location."
      />

      <main className="qibla-page">

        {/* =====================================
            HERO
        ===================================== */}

        <section
          className="qibla-hero"
          style={{
            backgroundImage: `url(${qiblaBanner})`,
          }}
        >

          <div className="qibla-hero-overlay"></div>

          <div className="container qibla-hero-inner">

            {/* LEFT CONTENT */}

            <div className="qibla-hero-content">

              <div className="qibla-eyebrow">
                <CompassIcon
                  width={23}
                  height={23}
                />

                <span>QIBLA DIRECTION</span>

                <i>◆</i>
              </div>

              <h1>
                Turn Towards
                <span>The Holy Kaaba</span>
              </h1>

              <p>
                Find the exact direction of the Kaaba in
                Makkah from your current location.
              </p>

              {/* FEATURES */}

              <div className="qibla-features">

                {FEATURES.map((feature) => (
                  <div
                    className="qibla-feature"
                    key={feature.title}
                  >
                    <div className="qibla-feature-icon">
                      {feature.icon}
                    </div>

                    <div>
                      <strong>{feature.title}</strong>

                      <span>{feature.text}</span>
                    </div>
                  </div>
                ))}

              </div>

              {/* LOCATION CARD */}

              <div className="qibla-location-card">

                <div className="qibla-location-icon">
                  <CompassIcon
                    width={46}
                    height={46}
                  />
                </div>

                <div className="qibla-location-content">

                  <h3>
                    Find Your Qibla Direction
                  </h3>

                  <p>
                    Allow location access to get your
                    accurate Qibla direction based on
                    your current position.
                  </p>

                  <button
                    type="button"
                    onClick={scrollToCompass}
                  >
                    <CompassIcon
                      width={20}
                      height={20}
                    />

                    Find My Qibla Direction
                  </button>

                </div>

              </div>

            </div>


            {/* RIGHT COMPASS */}

            <div
              className="qibla-hero-compass"
              id="qibla-compass"
            >

              <div className="qibla-compass-heading">

                <div>
                  <strong>
                    QIBLA COMPASS
                  </strong>

                  <span>
                    Direction to Makkah
                  </span>
                </div>

                <div className="qibla-live">
                  <i></i>
                  LIVE
                </div>

              </div>

              <div className="qibla-compass-wrapper">
                <QiblaCompass />
              </div>

              <div className="qibla-compass-location">

                <div>
                  <strong>
                    ⌖ Lahore, Pakistan
                  </strong>

                  <span>
                    Pakistan Standard Time (PKT)
                  </span>
                </div>

                <button type="button">
                  ↻ &nbsp; Calibrate
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            HOW IT WORKS
        ===================================== */}

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


            {/* =================================
                ABOUT KAABA
            ================================= */}

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


            <div className="qibla-note">

              <span>ⓘ</span>

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