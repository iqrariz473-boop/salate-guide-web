import Seo from "../components/Seo.jsx";
import { PRAYER_ICONS } from "../components/Icons.jsx";
import "./pages.css";

const DAILY_PRAYERS = [
  { key: "Fajr", time: "Dawn, before sunrise", note: "Marks the start of the fasting day during Ramadan." },
  { key: "Dhuhr", time: "Just after midday", note: "Prayed once the sun has passed its highest point." },
  { key: "Asr", time: "Mid-afternoon", note: "Prayed before the sun begins to turn orange." },
  { key: "Maghrib", time: "Just after sunset", note: "Prayed promptly once the sun has fully set." },
  { key: "Isha", time: "Night", note: "Prayed once twilight has faded and before midnight." },
];

const WUDU_STEPS = [
  "Make the intention (niyyah) to purify yourself for prayer.",
  "Wash both hands up to the wrists, three times.",
  "Rinse the mouth and nose with water, three times.",
  "Wash the face from hairline to chin, three times.",
  "Wash both arms up to the elbows, three times.",
  "Wipe the head once with wet hands.",
  "Wipe the ears once, inside and out.",
  "Wash both feet up to the ankles, three times.",
];

const BEFORE_PRAYER = [
  "Ensure your body, clothing, and prayer area are clean.",
  "Complete Wudu (ablution) if you don't already have it.",
  "Face the Qibla — see the Qibla page to find the direction from your location.",
  "Make your intention (niyyah) for the specific prayer you are performing.",
];

function PrayerGuide() {
  return (
    <div className="page static-page">
      <Seo
        title="Prayer Guide"
        description="An educational guide to Salah: what it is, why it matters, the five daily prayers, Wudu basics, and how to prepare for prayer."
      />

      <div className="container">
        <div className="section-heading section-heading--left">
          <span className="section-eyebrow">Learn</span>
          <h2>Prayer Guide</h2>
          <p>
            A general, respectful introduction to Salah for anyone new to
            the practice, or looking for a refresher. For detailed
            religious rulings, please consult a knowledgeable local scholar
            or imam.
          </p>
        </div>

        <section className="info-section">
          <h3>What is Salah?</h3>
          <p>
            Salah is the ritual prayer performed by Muslims five times a
            day. It combines physical movement — standing, bowing, and
            prostration — with recitation and remembrance of Allah, and is
            one of the five pillars of Islam.
          </p>
        </section>

        <section className="info-section">
          <h3>Importance of Salah</h3>
          <p>
            Salah is considered a direct link between a Muslim and Allah,
            performed at set times throughout the day. It structures a
            Muslim's daily routine around regular remembrance, discipline,
            and reflection.
          </p>
        </section>

        <section className="info-section">
          <h3>The Five Daily Prayers</h3>
          <div className="info-card-grid">
            {DAILY_PRAYERS.map((prayer) => {
              const Icon = PRAYER_ICONS[prayer.key];
              return (
                <div className="info-card" key={prayer.key}>
                  <Icon width={22} height={22} aria-hidden="true" />
                  <h4>{prayer.key}</h4>
                  <p>
                    <strong>{prayer.time}.</strong> {prayer.note}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="info-section">
          <h3>Before Prayer: Preparation</h3>
          <ul className="info-list">
            {BEFORE_PRAYER.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>

        <section className="info-section">
          <h3>Wudu Basics</h3>
          <p style={{ marginBottom: 14 }}>
            Wudu (ablution) is required before Salah. The general steps
            are:
          </p>
          <ol className="info-list" style={{ listStyle: "none" }}>
            {WUDU_STEPS.map((step, index) => (
              <li key={step}>
                <strong>{index + 1}.</strong> {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="info-section">
          <h3>General Prayer Steps</h3>
          <p>
            While details vary slightly between the different prayers,
            Salah generally follows a repeating cycle (rak'ah) of standing
            recitation, bowing (ruku), and two prostrations (sujood), with
            a seated pause in between and at the end. The number of
            rak'ahs differs for each of the five daily prayers.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrayerGuide;
