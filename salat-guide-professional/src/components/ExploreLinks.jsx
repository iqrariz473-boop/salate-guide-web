import { Link } from "react-router-dom";
import {
  ClockIcon,
  MapPinIcon,
  BookIcon,
  ShieldIcon,
  CompassIcon,
  MosqueIcon,
  MailIcon,
} from "./Icons.jsx";
import exploreImage from "../assets/images/explore-banner.jpg";
import "./ExploreLinks.css";

const LINKS = [
  { label: "Prayer Times", to: "/prayer-times", icon: ClockIcon },
  { label: "Cities", to: "/cities", icon: MapPinIcon },
  { label: "Prayer Guide", to: "/prayer-guide", icon: BookIcon },
  { label: "5 Pillars", to: "/pillars", icon: ShieldIcon },
  { label: "Qibla", to: "/qibla", icon: CompassIcon },
  { label: "About", to: "/about", icon: MosqueIcon },
  { label: "Contact", to: "/contact", icon: MailIcon },
];

/** A quiet, full-width quick-links banner used to jump to every section of the site. */
function ExploreLinks() {
  return (
    <section
      className="explore-links"
      style={{ backgroundImage: `url(${exploreImage})` }}
    >
      <div className="explore-links__overlay" aria-hidden="true" />
      <div className="container explore-links__inner">
        <span className="section-eyebrow explore-links__eyebrow">Explore Salat Guide</span>
        <nav aria-label="Explore Salat Guide">
          <ul className="explore-links__list">
            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <Link to={link.to} className="explore-links__item">
                    <Icon aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default ExploreLinks;
