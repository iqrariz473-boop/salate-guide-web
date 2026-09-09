import { PRAYER_ICONS } from "./Icons.jsx";
import { to12Hour } from "../utils/dateUtils.js";
import "./PrayerCard.css";

function getPrayerIcon(label) {
  if (!label) return null;

  // exact match first (fast path)
  if (PRAYER_ICONS[label]) return PRAYER_ICONS[label];

  // fallback: case-insensitive / trimmed match, in case the label
  // coming from the data source is like "fajr" or " Fajr "
  const normalized = String(label).trim().toLowerCase();
  const matchKey = Object.keys(PRAYER_ICONS).find(
    (key) => key.toLowerCase() === normalized
  );

  if (matchKey) return PRAYER_ICONS[matchKey];

  // still nothing? log it so we can see the real value being passed
  if (typeof window !== "undefined") {
    console.warn(
      `[PrayerCard] No icon found for label: ${JSON.stringify(label)}`
    );
  }
  return null;
}

function PrayerCard({ label, arabic, time, isActive, isNext }) {
  const Icon = getPrayerIcon(label);
  const stateLabel = isActive ? "Current" : isNext ? "Next" : "";

  return (
    <div
      className={`prayer-card ${isActive ? "prayer-card--active" : ""} ${
        isNext ? "prayer-card--next" : ""
      }`}
      aria-current={isActive ? "true" : undefined}
    >
      {stateLabel && (
        <span className="prayer-card__badge">{stateLabel}</span>
      )}

      {Icon && (
        <Icon
          className="prayer-card__icon"
          aria-hidden="true"
        />
      )}

      <p className="prayer-card__time">{to12Hour(time)}</p>
      <p className="prayer-card__label">{label}</p>

      <p className="prayer-card__arabic" lang="ar" dir="rtl">
        {arabic}
      </p>
    </div>
  );
}

export default PrayerCard;