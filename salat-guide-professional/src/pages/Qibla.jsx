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
            {/* =================================================
    QIBLA JOURNEY / FINAL SECTION
================================================= */}

<section className="qibla-journey">

  <div className="qibla-journey-container">

    {/* =================================================
        SECTION INTRO
    ================================================= */}

    <div className="qibla-journey-intro">

      <div className="qibla-journey-heading">

        <span className="qibla-journey-kicker">
          QIBLA • SALAH • MINDFULNESS
        </span>

        <h2>
          Make Your Direction
          <br />
          <span>Part of Your Preparation.</span>
        </h2>

      </div>

      <p>
        Finding the Qibla is the beginning. Take a moment
        before Salah to slow down, prepare yourself and
        give your attention to the prayer ahead.
      </p>

    </div>


    {/* =================================================
        FEATURE AREA
    ================================================= */}

    <div className="qibla-journey-layout">


      {/* =================================================
          LARGE LEFT PANEL
      ================================================= */}

      <div className="qibla-preparation-panel">

        <div className="preparation-top">

          <span>
            BEFORE SALAH
          </span>

          <div className="preparation-icon">
            ۞
          </div>

        </div>

        <div className="preparation-content">

          <h3>
            Create a moment
            <br />
            <em>of presence.</em>
          </h3>

          <p>
            Before beginning your prayer, step away from
            distractions and allow yourself a quiet moment.
            Knowing your direction can help you physically
            prepare for the Salah ahead.
          </p>

        </div>


        {/* Decorative compass */}

        <div className="preparation-compass">

          <div className="mini-compass-ring">

            <span className="compass-north">
              N
            </span>

            <span className="compass-east">
              E
            </span>

            <span className="compass-south">
              S
            </span>

            <span className="compass-west">
              W
            </span>

            <div className="mini-compass-arrow">
              ↑
            </div>

            <div className="mini-compass-center">
              🕋
            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          RIGHT CHECKLIST
      ================================================= */}

      <div className="qibla-checklist">

        <div className="checklist-header">

          <span>
            QUICK CHECK
          </span>

          <h3>
            Before you begin
          </h3>

        </div>


        {/* CHECK 01 */}

        <div className="qibla-check-item">

          <div className="check-number">
            01
          </div>

          <div className="check-content">

            <h4>
              Find a suitable place
            </h4>

            <p>
              Choose a clean and peaceful place where
              you can perform Salah comfortably.
            </p>

          </div>

          <div className="check-mark">
            ✓
          </div>

        </div>


        {/* CHECK 02 */}

        <div className="qibla-check-item">

          <div className="check-number">
            02
          </div>

          <div className="check-content">

            <h4>
              Check your direction
            </h4>

            <p>
              Use the compass to identify the Qibla
              direction before starting your prayer.
            </p>

          </div>

          <div className="check-mark">
            ✓
          </div>

        </div>


        {/* CHECK 03 */}

        <div className="qibla-check-item">

          <div className="check-number">
            03
          </div>

          <div className="check-content">

            <h4>
              Reduce distractions
            </h4>

            <p>
              Put aside unnecessary notifications and
              give yourself space to focus on Salah.
            </p>

          </div>

          <div className="check-mark">
            ✓
          </div>

        </div>


        {/* CHECK 04 */}

        <div className="qibla-check-item">

          <div className="check-number">
            04
          </div>

          <div className="check-content">

            <h4>
              Begin with intention
            </h4>

            <p>
              Prepare your heart and mind before
              beginning your prayer.
            </p>

          </div>

          <div className="check-mark">
            ✓
          </div>

        </div>

      </div>

    </div>


    {/* =================================================
        WORLDWIDE STRIP
    ================================================= */}

    <div className="qibla-world-strip">

      <div className="world-strip-main">

        <span className="world-strip-label">
          A SHARED DIRECTION
        </span>

        <h3>
          From every corner of the world,
          <span> Muslims face the Kaaba.</span>
        </h3>

      </div>


      <div className="world-locations">

        <div className="world-location">
          <strong>01</strong>
          <span>Asia</span>
        </div>

        <div className="world-location">
          <strong>02</strong>
          <span>Europe</span>
        </div>

        <div className="world-location">
          <strong>03</strong>
          <span>Africa</span>
        </div>

        <div className="world-location">
          <strong>04</strong>
          <span>Americas</span>
        </div>

        <div className="world-location">
          <strong>05</strong>
          <span>Oceania</span>
        </div>

      </div>

    </div>


    {/* =================================================
        FINAL MESSAGE
    ================================================= */}

    <div className="qibla-journey-footer">

      <span>✦</span>

      <p>
        A precise direction can help prepare the body.
        <strong> A sincere intention prepares the heart.</strong>
      </p>

      <span>✦</span>

    </div>

  </div>

</section>

          </div>


        </section>
{/* =================================================
    QIBLA FAQ SECTION
================================================= */}

<section className="qibla-faq-section">

  <div className="qibla-faq-container">

    {/* =================================================
        FAQ INTRO
    ================================================= */}

    <div className="qibla-faq-intro">

      <div className="qibla-faq-intro-top">

        <span className="qibla-faq-badge">
          QIBLA GUIDE
        </span>

        <span className="qibla-faq-line"></span>

      </div>

      <h2>
        Questions about
        <span> Qibla?</span>
      </h2>

      <p>
        Learn more about the Qibla direction, compass
        accuracy, location access and how Muslims
        determine the direction of the Kaaba.
      </p>

      <div className="qibla-faq-mini-note">
        <span>✦</span>
        <p>
          Simple answers for a more confident Qibla experience.
        </p>
      </div>

    </div>


    {/* =================================================
        FAQ LIST
    ================================================= */}

    <div className="qibla-faq-list">

      <details className="qibla-faq-item">
        <summary>
          <span className="qibla-faq-number">
            01
          </span>

          <span className="qibla-faq-question">
            What is the Qibla?
          </span>

          <span className="qibla-faq-toggle">
            +
          </span>
        </summary>

        <div className="qibla-faq-answer">
          <p>
            The Qibla is the direction Muslims face during
            Salah. It is the direction towards the Kaaba,
            located in Masjid al-Haram in Makkah.
          </p>
        </div>
      </details>


      <details className="qibla-faq-item">
        <summary>
          <span className="qibla-faq-number">
            02
          </span>

          <span className="qibla-faq-question">
            Why does the Qibla direction matter?
          </span>

          <span className="qibla-faq-toggle">
            +
          </span>
        </summary>

        <div className="qibla-faq-answer">
          <p>
            Facing the Qibla is part of the prescribed
            direction for Salah. It gives Muslims around
            the world a shared direction of worship.
          </p>
        </div>
      </details>


      <details className="qibla-faq-item">
        <summary>
          <span className="qibla-faq-number">
            03
          </span>

          <span className="qibla-faq-question">
            How does the Qibla compass work?
          </span>

          <span className="qibla-faq-toggle">
            +
          </span>
        </summary>

        <div className="qibla-faq-answer">
          <p>
            The compass uses your device's location and
            orientation sensors to determine the direction
            towards the Kaaba from your current position.
          </p>
        </div>
      </details>


      <details className="qibla-faq-item">
        <summary>
          <span className="qibla-faq-number">
            04
          </span>

          <span className="qibla-faq-question">
            Why should I keep my phone flat?
          </span>

          <span className="qibla-faq-toggle">
            +
          </span>
        </summary>

        <div className="qibla-faq-answer">
          <p>
            Keeping your phone flat can help the device
            sensors determine its orientation more
            consistently. Follow the instructions shown
            by the compass on your device.
          </p>
        </div>
      </details>


      <details className="qibla-faq-item">
        <summary>
          <span className="qibla-faq-number">
            05
          </span>

          <span className="qibla-faq-question">
            Why is my compass direction changing?
          </span>

          <span className="qibla-faq-toggle">
            +
          </span>
        </summary>

        <div className="qibla-faq-answer">
          <p>
            Phone compass readings can be affected by
            movement, magnetic objects and sensor
            calibration. Move away from magnetic
            interference and keep the device steady.
          </p>
        </div>
      </details>


      <details className="qibla-faq-item">
        <summary>
          <span className="qibla-faq-number">
            06
          </span>

          <span className="qibla-faq-question">
            Can I find the Qibla anywhere in the world?
          </span>

          <span className="qibla-faq-toggle">
            +
          </span>
        </summary>

        <div className="qibla-faq-answer">
          <p>
            Yes. Once your location is available, the
            Qibla direction can be calculated from
            different places around the world.
          </p>
        </div>
      </details>

    </div>

  </div>

</section>

      </main>
    </>
  );
}


export default Qibla;