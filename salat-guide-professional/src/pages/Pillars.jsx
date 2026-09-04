import Seo from "../components/Seo.jsx";
import PillarCard from "../components/PillarCard.jsx";
import pillars from "../data/pillars.js";
import "./pages.css";

function Pillars() {
  return (
    <div className="page static-page">
      <Seo
        title="5 Pillars of Islam"
        description="Learn about the five pillars of Islam: Shahada, Salah, Zakat, Sawm, and Hajj."
      />

      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Foundations of faith</span>
          <h2>5 Pillars of Islam</h2>
          <p>
            The five pillars are the foundation of a Muslim's faith and
            practice. Tap "Learn more" on any card for a fuller
            explanation.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pillars;
