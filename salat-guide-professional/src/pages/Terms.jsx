import Seo from "../components/Seo.jsx";
import "./pages.css";

function Terms() {
  return (
    <div className="page static-page">
      <Seo title="Terms" description="Terms of use for Salat Guide." />
      <div className="container">
        <div className="section-heading section-heading--left">
          <span className="section-eyebrow">Legal</span>
          <h2>Terms</h2>
        </div>
        <div className="static-page__prose">
          <p>
            Salat Guide provides prayer times, Qibla direction, and
            general Islamic educational content for informational purposes.
            Prayer timings are calculated estimates based on a standard
            calculation method and your searched or detected location —
            please confirm timings with your local mosque where precision
            matters.
          </p>
          <p>
            The educational content on this site (Prayer Guide, 5 Pillars)
            is general in nature and is not a substitute for guidance from
            a qualified local scholar or imam.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
