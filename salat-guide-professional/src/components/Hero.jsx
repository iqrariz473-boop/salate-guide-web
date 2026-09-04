import heroImage from "../assets/images/hero-mosque.jpg";
import "./Hero.css";

function Hero() {
  return (
    <section
      className="hero"
      id="home"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Background Overlay */}
      <div className="hero__overlay" aria-hidden="true"></div>

      {/* Decorative Islamic Pattern */}
      <div className="hero__pattern" aria-hidden="true"></div>

      {/* Hero Content */}
      <div className="container hero__inner">
        <div className="hero__content">

          {/* Eyebrow */}
          <span className="hero__eyebrow">
            Prayer Times, Worldwide
          </span>

          {/* Heading */}
          <h1 className="hero__title">
            Prayer Times for Muslims
            <br className="hero__desktop-break" />
            Around the World
          </h1>

          {/* Gold Divider */}
          <div className="hero__divider">
            <span></span>
            <b>✦</b>
            <span></span>
          </div>

          {/* Description */}
          <p className="hero__description">
            Find accurate Fajr, Dhuhr, Asr, Maghrib, and Isha
            times based on your location. Salat Guide keeps your
            prayers on schedule wherever you are.
          </p>

          {/* Features */}
          <div className="hero__features">

            {/* Feature 1 */}
            <div className="hero__feature">
              <div className="hero__feature-icon">
                ☪
              </div>

              <div className="hero__feature-text">
                <strong>Accurate Times</strong>
                <small>Trusted sources</small>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="hero__feature">
              <div className="hero__feature-icon">
                ◎
              </div>

              <div className="hero__feature-text">
                <strong>Any Location</strong>
                <small>Worldwide coverage</small>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="hero__feature">
              <div className="hero__feature-icon">
                ◷
              </div>

              <div className="hero__feature-text">
                <strong>Always Updated</strong>
                <small>Latest prayer times</small>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="hero__feature">
              <div className="hero__feature-icon">
                ✓
              </div>

              <div className="hero__feature-text">
                <strong>100% Free</strong>
                <small>For everyone</small>
              </div>
            </div>

          </div>

          {/* Quran Quote */}
          <div className="hero__quote">
            <span className="hero__quote-icon">۞</span>

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

      {/* Bottom Decorative Curve */}
      <div className="hero__bottom-shape" aria-hidden="true"></div>
    </section>
  );
}

export default Hero;