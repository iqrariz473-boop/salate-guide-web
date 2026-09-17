import modernMosque from "../assets/images/modern-mosque.jpg";

import {
  MoonStar,
  Compass,
  BookOpenText,
  Sparkles,
} from "lucide-react";

import "./Hero.css";

function Hero() {
  return (
    <section
      className="hero"
      id="home"
      style={{
        backgroundImage: `url(${modernMosque})`,
      }}
    >
      <div className="hero__overlay" aria-hidden="true"></div>

      <div className="hero__pattern" aria-hidden="true"></div>

      <div className="hero__glow hero__glow--one"></div>
      <div className="hero__glow hero__glow--two"></div>

      <div className="container hero__inner">
        <div className="hero__content">

          {/* EYEBROW */}
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-line"></span>

            YOUR ISLAMIC GUIDE

            <Sparkles
              className="hero__eyebrow-star"
              size={15}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>

          {/* TITLE */}
          <h1 className="hero__title">
            Stay Connected
            <br />
            <span>With Your Salah</span>
          </h1>

          {/* DIVIDER */}
          <div className="hero__divider" aria-hidden="true">
            <span></span>

            <Sparkles
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span></span>
          </div>

          {/* DESCRIPTION */}
          <p className="hero__description">
            Get prayer times, Qibla direction, Quran,
            and daily Islamic tools in one peaceful place.
          </p>

          {/* FEATURES */}
          <div className="hero__features">

            {/* Prayer Times */}
            <div className="hero__feature">
              <div className="hero__feature-icon">
                <MoonStar
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div className="hero__feature-text">
                <strong>Prayer Times</strong>
                <small>Never miss your Salah</small>
              </div>
            </div>

            {/* Qibla */}
            <div className="hero__feature">
              <div className="hero__feature-icon">
                <Compass
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div className="hero__feature-text">
                <strong>Qibla Direction</strong>
                <small>Find the Kaaba direction</small>
              </div>
            </div>

            {/* Quran & Duas */}
            <div className="hero__feature">
              <div className="hero__feature-icon">
                <BookOpenText
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div className="hero__feature-text">
                <strong>Quran & Duas</strong>
                <small>Daily spiritual guidance</small>
              </div>
            </div>

            {/* Islamic Tools */}
            <div className="hero__feature">
              <div className="hero__feature-icon">
                <Sparkles
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div className="hero__feature-text">
                <strong>Islamic Tools</strong>
                <small>Useful tools for your journey</small>
              </div>
            </div>

          </div>

          {/* QUOTE */}
          <div className="hero__quote">
            <span className="hero__quote-icon">
              ۞
            </span>

            <div>
              <p>
                “Indeed, prayer has been decreed upon the believers
                a decree of specified times.”
              </p>

              <small>
                — Surah An-Nisa 4:103
              </small>
            </div>
          </div>

        </div>
      </div>

      <div className="hero__bottom-shape"></div>
    </section>
  );
}

export default Hero;
