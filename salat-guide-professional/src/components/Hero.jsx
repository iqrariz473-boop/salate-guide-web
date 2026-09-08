import modernMosque from "../assets/images/modern-mosque.jpg";
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

          <span className="hero__eyebrow">
            <span className="hero__eyebrow-line"></span>
            YOUR DAILY ISLAMIC COMPANION
            <span className="hero__eyebrow-star">✦</span>
          </span>

          <h1 className="hero__title">
            Stay Connected
            <br />
            <span>With Your Salah</span>
          </h1>

          <div className="hero__divider">
            <span></span>
            <b>✦</b>
            <span></span>
          </div>

          <p className="hero__description">
            Accurate prayer times, Qibla direction, Quran reading,
            and daily Islamic tools — all in one peaceful place.
          </p>

          <div className="hero__features">

            <div className="hero__feature">
              <div className="hero__feature-icon">☪</div>
              <div className="hero__feature-text">
                <strong>Accurate Times</strong>
                <small>Reliable prayer schedule</small>
              </div>
            </div>

            <div className="hero__feature">
              <div className="hero__feature-icon">⌖</div>
              <div className="hero__feature-text">
                <strong>Any Location</strong>
                <small>Worldwide coverage</small>
              </div>
            </div>

            <div className="hero__feature">
              <div className="hero__feature-icon">◷</div>
              <div className="hero__feature-text">
                <strong>Always Updated</strong>
                <small>Current prayer times</small>
              </div>
            </div>

            <div className="hero__feature">
              <div className="hero__feature-icon">✓</div>
              <div className="hero__feature-text">
                <strong>100% Free</strong>
                <small>Open for everyone</small>
              </div>
            </div>

          </div>

          <div className="hero__quote">
            <span className="hero__quote-icon">۞</span>

            <div>
              <p>
                “Indeed, prayer has been decreed upon the believers
                a decree of specified times.”
              </p>

              <small>— Surah An-Nisa 4:103</small>
            </div>
          </div>

        </div>
      </div>

      <div className="hero__bottom-shape"></div>

    </section>
  );
}

export default Hero;