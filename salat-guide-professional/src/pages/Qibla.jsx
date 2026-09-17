import { useState } from "react";
import Seo from "../components/Seo.jsx";

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
    title: "Accurate Direction",
    text: "Get your Qibla bearing",
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
  /* =======================================================
     LOCATION STATE
  ======================================================= */

  const [location, setLocation] = useState(null);
  const [bearing, setBearing] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");

  /* =======================================================
     KAABA COORDINATES
  ======================================================= */

  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  /* =======================================================
     HELPERS
  ======================================================= */

  const toRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  const toDegrees = (radians) => {
    return (radians * 180) / Math.PI;
  };

  const normalizeDegrees = (degrees) => {
    return ((degrees % 360) + 360) % 360;
  };

  /* =======================================================
     CALCULATE QIBLA
  ======================================================= */

  const calculateQiblaBearing = (
    latitude,
    longitude
  ) => {
    const lat1 = toRadians(latitude);
    const lat2 = toRadians(KAABA_LAT);

    const deltaLongitude = toRadians(
      KAABA_LNG - longitude
    );

    const y =
      Math.sin(deltaLongitude) *
      Math.cos(lat2);

    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) *
        Math.cos(lat2) *
        Math.cos(deltaLongitude);

    const angle = Math.atan2(y, x);

    return Math.round(
      normalizeDegrees(toDegrees(angle))
    );
  };

  /* =======================================================
     DIRECTION NAME
  ======================================================= */

  const getDirectionName = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) {
      return "North";
    }

    if (degrees < 67.5) {
      return "North-East";
    }

    if (degrees < 112.5) {
      return "East";
    }

    if (degrees < 157.5) {
      return "South-East";
    }

    if (degrees < 202.5) {
      return "South";
    }

    if (degrees < 247.5) {
      return "South-West";
    }

    if (degrees < 292.5) {
      return "West";
    }

    return "North-West";
  };

  /* =======================================================
     FIND USER LOCATION
  ======================================================= */

  const findQiblaDirection = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");

      setLocationError(
        "Location services are not supported by your browser."
      );

      return;
    }

    setLocationStatus("loading");
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const accuracy =
          position.coords.accuracy;

        const qiblaBearing =
          calculateQiblaBearing(
            latitude,
            longitude
          );

        setLocation({
          latitude,
          longitude,
          accuracy,
        });

        setBearing(qiblaBearing);
        setLocationStatus("success");
      },

      (error) => {
        setLocationStatus("error");

        if (error.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access from your browser."
          );
        } else if (error.code === 2) {
          setLocationError(
            "Your location could not be detected. Please try again."
          );
        } else if (error.code === 3) {
          setLocationError(
            "Location request timed out. Please try again."
          );
        } else {
          setLocationError(
            "Unable to find your location. Please try again."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <>
      <Seo
        title="Qibla Direction"
        description="Find the exact direction of the Kaaba in Makkah from your current location."
      />

      <main className="qibla-page">

        {/* =================================================
            HERO
        ================================================= */}
<section className="qibla-hero">
  <div className="qibla-hero-overlay"></div>
  <div className="qibla-hero-pattern"></div>

  <div className="container">
    <div className="qibla-hero-inner">

      <div className="qibla-hero-content">

        <span className="qibla-hero-badge">
          <span className="qibla-hero-badge-dot"></span>
          QIBLA FINDER
        </span>

        <h1>
          Find Your <span>Qibla</span>
        </h1>

        <p className="qibla-hero-description">
          Discover the precise direction of the Holy Kaaba
          from your current location.
        </p>

        <div className="qibla-hero-actions">
          <button
            type="button"
            className="qibla-hero-button"
            onClick={findQiblaDirection}
          >
            <span>Find My Qibla</span>
            <span className="qibla-hero-button-arrow">→</span>
          </button>
        </div>

        <div className="qibla-hero-meta">
          <span>
            <strong>●</strong>
            Location Based
          </span>

          <span>
            <strong>●</strong>
            Accurate Bearing
          </span>

          <span>
            <strong>●</strong>
            Worldwide
          </span>
        </div>

      </div>

    </div>
  </div>
</section>

{/* =================================================
    MODERN QIBLA FINDER SECTION
================================================= */}

<section
  className="qibla-modern-section"
  id="qibla-compass"
>
  <div className="qibla-modern-bg-circle qibla-modern-bg-circle--one"></div>
  <div className="qibla-modern-bg-circle qibla-modern-bg-circle--two"></div>

  <div className="container">

    {/* TOP HEADER */}
    <div className="qibla-modern-header">

      <div className="qibla-modern-label">
        <span></span>
        SMART QIBLA FINDER
        <span></span>
      </div>

      <h2>
        Find Your
        <em> Qibla Direction</em>
      </h2>

      <p>
        Discover the direction of the Holy Kaaba from your
        current location with a simple and accurate
        location-based Qibla finder.
      </p>

    </div>


    {/* MAIN DASHBOARD */}
    <div className="qibla-modern-dashboard">

      {/* =================================================
          LEFT — INFORMATION
      ================================================= */}

      <div className="qibla-modern-info">

        <div className="qibla-modern-status">
          <span className="qibla-status-dot"></span>
          LOCATION BASED
        </div>

        <h3>
          Your path to the
          <strong> Holy Kaaba</strong>
        </h3>

        <p className="qibla-modern-description">
          Allow location access and Salat Guide will
          calculate the Qibla bearing from your current
          position.
        </p>


        {/* FEATURES */}

        <div className="qibla-modern-features">

          <div className="qibla-modern-feature">

            <div className="qibla-modern-feature-icon">
              ⌖
            </div>

            <div>
              <strong>Your Location</strong>
              <span>
                Uses your current position
              </span>
            </div>

          </div>


          <div className="qibla-modern-feature">

            <div className="qibla-modern-feature-icon">
              ◈
            </div>

            <div>
              <strong>Qibla Bearing</strong>
              <span>
                Calculates direction to Kaaba
              </span>
            </div>

          </div>


          <div className="qibla-modern-feature">

            <div className="qibla-modern-feature-icon">
              🕋
            </div>

            <div>
              <strong>Holy Kaaba</strong>
              <span>
                Makkah, Saudi Arabia
              </span>
            </div>

          </div>

        </div>


        {/* KAABA COORDINATES */}

        <div className="qibla-modern-kaaba">

          <div className="qibla-modern-kaaba-icon">
            🕋
          </div>

          <div>
            <small>DESTINATION</small>
            <strong>Kaaba · Makkah</strong>
          </div>

          <span>21.4225° N</span>

        </div>

      </div>


      {/* =================================================
          RIGHT — FINDER CARD
      ================================================= */}

      <div className="qibla-modern-finder">

        {/* Decorative compass */}

        <div className="qibla-modern-orbit qibla-modern-orbit--one"></div>
        <div className="qibla-modern-orbit qibla-modern-orbit--two"></div>
        <div className="qibla-modern-orbit qibla-modern-orbit--three"></div>


        {/* COMPASS SYMBOL */}

        <div className="qibla-modern-compass">

          <div className="qibla-modern-compass-ring">

            <span className="qibla-compass-n">N</span>
            <span className="qibla-compass-e">E</span>
            <span className="qibla-compass-s">S</span>
            <span className="qibla-compass-w">W</span>

            <div className="qibla-modern-compass-arrow">
              ↑
            </div>

            <div className="qibla-modern-compass-center">
              🕋
            </div>

          </div>

        </div>


        {/* FINDER CONTENT */}

        <div className="qibla-modern-finder-content">

          <span className="qibla-modern-finder-kicker">
            READY TO DISCOVER?
          </span>

          <h3>
            Find My
            <span> Qibla</span>
          </h3>

          <p>
            Use your device location to calculate
            the direction towards the Holy Kaaba.
          </p>


          {/* BUTTON */}

          <button
            type="button"
            className="qibla-modern-find-button"
            onClick={findQiblaDirection}
            disabled={locationStatus === "loading"}
          >

            <span className="qibla-modern-button-icon">
              {locationStatus === "loading" ? "◌" : "⌖"}
            </span>

            <span>
              {locationStatus === "loading"
                ? "Finding Location..."
                : locationStatus === "success"
                ? "Update My Qibla"
                : "Find My Qibla"}
            </span>

            <span className="qibla-modern-button-arrow">
              →
            </span>

          </button>


          {/* LOADING */}

          {locationStatus === "loading" && (
            <div className="qibla-modern-loading">

              <span className="qibla-modern-spinner"></span>

              <div>
                <strong>
                  Detecting your location
                </strong>

                <small>
                  Please allow location access
                  in your browser.
                </small>
              </div>

            </div>
          )}


          {/* SUCCESS */}

          {locationStatus === "success" &&
            location &&
            bearing !== null && (
              <div className="qibla-modern-result">

                <div className="qibla-result-heading">

                  <span>✓</span>

                  <div>
                    <strong>
                      Qibla Found
                    </strong>

                    <small>
                      Direction calculated successfully
                    </small>
                  </div>

                </div>


                <div className="qibla-result-bearing">

                  <small>QIBLA BEARING</small>

                  <strong>
                    {bearing}°
                  </strong>

                  <span>
                    {getDirectionName(bearing)}
                  </span>

                </div>


                <div className="qibla-result-location">

                  <div>
                    <small>LATITUDE</small>
                    <strong>
                      {location.latitude.toFixed(5)}
                    </strong>
                  </div>

                  <div>
                    <small>LONGITUDE</small>
                    <strong>
                      {location.longitude.toFixed(5)}
                    </strong>
                  </div>

                  <div>
                    <small>ACCURACY</small>
                    <strong>
                      {Math.round(location.accuracy)}m
                    </strong>
                  </div>

                </div>

              </div>
            )}


          {/* ERROR */}

          {locationStatus === "error" && (
            <div className="qibla-modern-error">

              <span>!</span>

              <div>

                <strong>
                  Location unavailable
                </strong>

                <p>
                  {locationError}
                </p>

                <button
                  type="button"
                  onClick={findQiblaDirection}
                >
                  Try Again
                </button>

              </div>

            </div>
          )}

        </div>


        {/* BOTTOM INFO */}

        <div className="qibla-modern-finder-footer">

          <span>✦</span>

          <p>
            Your location stays on your device
          </p>

          <span>✦</span>

        </div>

      </div>

    </div>


    {/* BOTTOM TRUST BAR */}

    <div className="qibla-modern-trust-bar">

      <div>
        <span>⌖</span>
        <div>
          <strong>Location Based</strong>
          <small>Current position</small>
        </div>
      </div>

      <i></i>

      <div>
        <span>◈</span>
        <div>
          <strong>Precise Bearing</strong>
          <small>Kaaba direction</small>
        </div>
      </div>

      <i></i>

      <div>
        <span>∞</span>
        <div>
          <strong>Worldwide</strong>
          <small>Works anywhere</small>
        </div>
      </div>

    </div>

  </div>
</section>

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section className="qibla-guide">

          <div className="container">

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

            <div className="qibla-steps">

              {STEPS.map((step) => (

                <article
                  className="qibla-step"
                  key={step.number}
                >

                  <div className="qibla-step-number">
                    {step.number}
                  </div>

                  <div className="qibla-step-icon">
                    {step.icon}
                  </div>

                  <div className="qibla-step-content">

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.text}
                    </p>

                  </div>

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

              <div className="qibla-about-decoration"></div>

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
                  Muslims around the world face the Kaaba
                  in Masjid al-Haram, Makkah, during their
                  daily prayers. The Qibla gives Muslims a
                  shared direction of worship wherever they
                  are.
                </p>

                <div className="qibla-about-points">

                  <div>
                    <span>
                      ✦
                    </span>

                    <p>
                      Sacred direction of prayer
                    </p>
                  </div>

                  <div>
                    <span>
                      ✦
                    </span>

                    <p>
                      Center of Masjid al-Haram
                    </p>
                  </div>

                  <div>
                    <span>
                      ✦
                    </span>

                    <p>
                      Faced by Muslims worldwide
                    </p>
                  </div>

                </div>

              </div>

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

            {/* NOTE */}

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
                QIBLA JOURNEY
            ================================================= */}

            <section className="qibla-journey">

              <div className="qibla-journey-container">

                <div className="qibla-journey-intro">

                  <div className="qibla-journey-heading">

                    <span className="qibla-journey-kicker">
                      QIBLA • SALAH • MINDFULNESS
                    </span>

                    <h2>
                      Make Your Direction
                      <br />
                      <span>
                        Part of Your Preparation.
                      </span>
                    </h2>

                  </div>

                  <p>
                    Finding the Qibla is the beginning.
                    Take a moment before Salah to slow down,
                    prepare yourself and give your attention
                    to the prayer ahead.
                  </p>

                </div>

                <div className="qibla-journey-layout">

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
                        <em>
                          of presence.
                        </em>
                      </h3>

                      <p>
                        Before beginning your prayer, step
                        away from distractions and allow
                        yourself a quiet moment. Knowing your
                        direction can help you physically
                        prepare for the Salah ahead.
                      </p>

                    </div>

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

                  <div className="qibla-checklist">

                    <div className="checklist-header">

                      <span>
                        QUICK CHECK
                      </span>

                      <h3>
                        Before you begin
                      </h3>

                    </div>

                    <div className="qibla-check-item">

                      <div className="check-number">
                        01
                      </div>

                      <div className="check-content">

                        <h4>
                          Find a suitable place
                        </h4>

                        <p>
                          Choose a clean and peaceful place
                          where you can perform Salah
                          comfortably.
                        </p>

                      </div>

                      <div className="check-mark">
                        ✓
                      </div>

                    </div>

                    <div className="qibla-check-item">

                      <div className="check-number">
                        02
                      </div>

                      <div className="check-content">

                        <h4>
                          Check your direction
                        </h4>

                        <p>
                          Use the compass to identify the
                          Qibla direction before starting
                          your prayer.
                        </p>

                      </div>

                      <div className="check-mark">
                        ✓
                      </div>

                    </div>

                    <div className="qibla-check-item">

                      <div className="check-number">
                        03
                      </div>

                      <div className="check-content">

                        <h4>
                          Reduce distractions
                        </h4>

                        <p>
                          Put aside unnecessary notifications
                          and give yourself space to focus
                          on Salah.
                        </p>

                      </div>

                      <div className="check-mark">
                        ✓
                      </div>

                    </div>

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

                <div className="qibla-world-strip">

                  <div className="world-strip-main">

                    <span className="world-strip-label">
                      A SHARED DIRECTION
                    </span>

                    <h3>
                      From every corner of the world,
                      <span>
                        {" "}Muslims face the Kaaba.
                      </span>
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

                <div className="qibla-journey-footer">

                  <span>
                    ✦
                  </span>

                  <p>
                    A precise direction can help prepare
                    the body.
                    <strong>
                      {" "}A sincere intention prepares
                      the heart.
                    </strong>
                  </p>

                  <span>
                    ✦
                  </span>

                </div>

              </div>

            </section>

          </div>

        </section>

        {/* =================================================
            FAQ
        ================================================= */}

        <section className="qibla-faq-section">

          <div className="qibla-faq-container">

            <div className="qibla-faq-intro">

              <div className="qibla-faq-intro-top">

                <span className="qibla-faq-badge">
                  QIBLA GUIDE
                </span>

                <span className="qibla-faq-line"></span>

              </div>

              <h2>
                Questions about
                <span>
                  {" "}Qibla?
                </span>
              </h2>

              <p>
                Learn more about the Qibla direction,
                compass accuracy, location access and
                how Muslims determine the direction of
                the Kaaba.
              </p>

              <div className="qibla-faq-mini-note">

                <span>
                  ✦
                </span>

                <p>
                  Simple answers for a more confident
                  Qibla experience.
                </p>

              </div>

            </div>

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
                    The Qibla is the direction Muslims
                    face during Salah. It is the direction
                    towards the Kaaba, located in
                    Masjid al-Haram in Makkah.
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
                    Facing the Qibla is part of the
                    prescribed direction for Salah. It
                    gives Muslims around the world a
                    shared direction of worship.
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
                    The compass uses your device's
                    location and orientation sensors to
                    determine the direction towards the
                    Kaaba from your current position.
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
                    Keeping your phone flat can help the
                    device sensors determine its
                    orientation more consistently.
                    Follow the instructions shown by the
                    compass on your device.
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
                    Phone compass readings can be affected
                    by movement, magnetic objects and
                    sensor calibration. Move away from
                    magnetic interference and keep the
                    device steady.
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
                    Yes. Once your location is available,
                    the Qibla direction can be calculated
                    from different places around the world.
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
