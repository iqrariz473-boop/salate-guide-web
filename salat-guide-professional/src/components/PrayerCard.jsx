import { PRAYER_ICONS } from "./Icons.jsx";
import { to12Hour } from "../utils/dateUtils.js";
import "./PrayerCard.css";

/** A single prayer time tile: icon, English + Arabic name, time. */
function PrayerCard({ label, arabic, time, isActive, isNext }) {
  const Icon = PRAYER_ICONS[label];
  const stateLabel = isActive ? "Current" : isNext ? "Next" : "";

  return (
    <div
      className={`prayer-card ${isActive ? "prayer-card--active" : ""}`}
      aria-current={isActive ? "true" : undefined}
    >
      {stateLabel && <span className="prayer-card__badge">{stateLabel}</span>}
      {Icon && <Icon className="prayer-card__icon" aria-hidden="true" />}
      <p className="prayer-card__time">{to12Hour(time)}</p>
      <p className="prayer-card__label">{label}</p>
      <p className="prayer-card__arabic" lang="ar" dir="rtl">
        {arabic}
      </p>
    </div>
  );
}

export default PrayerCard;
