import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./pages.css";
import "./NotFound.css";

// Existing image
import notFoundBanner from "../assets/images/qibla-banner.jpg";

function NotFound() {
  return (
    <div className="not-found-page">

      <Seo
        title="Quran | Salat Guide"
        description="Explore the Quran, prayer times, Qibla direction and duas with Salat Guide."
      />
      <section>
        {/* Background Overlay */}
        <div className="not-found-overlay"></div>

        <div className="not-found-content">
          {/* Small Heading */}
          <span className="not-found-eyebrow">
            QURAN • GUIDANCE • REFLECTION
          </span>

          {/* Main Heading */}
          <h1>
            Every Verse Holds
            <span> a Light</span>
          </h1>

          {/* Decorative Line */}
          <div className="heading-line">
            <span></span>
            ✦
            <span></span>
          </div>

          {/* Description */}
          <p className="not-found-description">
            Discover the timeless words of the Quran and let its wisdom
            bring peace, guidance, and light to your everyday journey.
          </p>


          {/* =========================================
              QUICK LINKS
          ========================================= */}
          <div className="not-found-cards">

            {/* Quran */}
            <Link
              to="/quran"
              className="not-found-card"
            >
              <div className="card-icon">
                📖
              </div>

              <h3>
                Explore Quran
              </h3>

              <p>
                Read the Holy Quran and reflect on its timeless guidance.
              </p>
            </Link>


            {/* Prayer */}
            <Link
              to="/prayer-times"
              className="not-found-card"
            >
              <div className="card-icon">
                🕌
              </div>

              <h3>
                Prayer Times
              </h3>

              <p>
                Stay connected with your five daily prayers.
              </p>
            </Link>


            {/* Qibla */}
            <Link
              to="/qibla"
              className="not-found-card"
            >
              <div className="card-icon">
                🧭
              </div>

              <h3>
                Find Qibla
              </h3>

              <p>
                Find the direction of the Kaaba from your location.
              </p>
            </Link>


            {/* Dua */}
            <Link
              to="/duas"
              className="not-found-card"
            >
              <div className="card-icon">
                🤲
              </div>

              <h3>
                Daily Duas
              </h3>

              <p>
                Remember Allah with beautiful daily supplications.
              </p>
            </Link>

          </div>
        </div>
      </section>

      {/* =========================================
          QURAN REFLECTION SECTION
      ========================================= */}
      <section className="quran-reflection">

        <div className="reflection-container">

          {/* Icon */}
          <div className="reflection-icon">
            ☾
          </div>


          {/* Text */}
          <div>

            <span className="reflection-label">
              QURANIC REFLECTION
            </span>

            <h2>
              Let the Quran illuminate
              <span> your journey.</span>
            </h2>

            <p>
              Take a moment to pause, reflect and reconnect with
              the words of the Quran. Every verse carries wisdom,
              comfort and guidance.
            </p>

          </div>


          {/* Button */}
          <Link
            to="/quran"
            className="reflection-btn"
          >
            Read Quran →
          </Link>

        </div>

      </section>

    </div>
  );
}

export default NotFound;