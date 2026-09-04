import Seo from "../components/Seo.jsx";
import "./pages.css";

function Privacy() {
  return (
    <div className="page static-page">
      <Seo title="Privacy Policy" description="How Salat Guide handles your data." />
      <div className="container">
        <div className="section-heading section-heading--left">
          <span className="section-eyebrow">Legal</span>
          <h2>Privacy Policy</h2>
        </div>
        <div className="static-page__prose">
          <p>
            Salat Guide only requests your location, with your permission,
            to show accurate prayer times for where you are. Your last
            selected city is stored locally in your own browser
            (localStorage) so it's remembered on your next visit — it is
            not sent to or stored on any server we operate.
          </p>
          <p>
            Prayer time and calendar data is fetched from the public
            Aladhan API based on the city you search for or your detected
            location. Contact form submissions in this version of the
            site are handled locally in your browser and are not
            transmitted anywhere, since no backend is currently connected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
