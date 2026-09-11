import { PRAYER_ICONS } from "./Icons.jsx";
import "./PrayerCard.css";

/* =========================================================
   GET PRAYER ICON
========================================================= */

function getPrayerIcon(label) {
  if (!label) {
    return null;
  }

  /* -------------------------------------------------------
     EXACT MATCH
  ------------------------------------------------------- */

  if (PRAYER_ICONS[label]) {
    return PRAYER_ICONS[label];
  }

  /* -------------------------------------------------------
     CASE-INSENSITIVE MATCH
  ------------------------------------------------------- */

  const normalized =
    String(label)
      .trim()
      .toLowerCase();

  const matchKey =
    Object.keys(PRAYER_ICONS).find(
      (key) =>
        key
          .trim()
          .toLowerCase() === normalized
    );

  if (matchKey) {
    return PRAYER_ICONS[matchKey];
  }

  /* -------------------------------------------------------
     ICON NOT FOUND
  ------------------------------------------------------- */

  if (
    typeof window !== "undefined"
  ) {
    console.warn(
      `[PrayerCard] No icon found for label: ${JSON.stringify(
        label
      )}`
    );
  }

  return null;
}

/* =========================================================
   PRAYER CARD
========================================================= */

function PrayerCard({
  label,
  arabic,
  time,
  isActive = false,
  isNext = false,
}) {
  /* =======================================================
     ICON
  ======================================================= */

  const Icon =
    getPrayerIcon(label);

  /* =======================================================
     STATE LABEL
  ======================================================= */

  const stateLabel =
    isActive
      ? "Current"
      : isNext
      ? "Next"
      : "";

  /* =======================================================
     CSS CLASS
  ======================================================= */

  const cardClassName = [
    "prayer-card",
    isActive
      ? "prayer-card--active"
      : "",
    isNext
      ? "prayer-card--next"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className={cardClassName}
      aria-current={
        isActive
          ? "true"
          : undefined
      }
    >

      {/* =================================================
          CURRENT / NEXT BADGE
      ================================================= */}

      {stateLabel && (
        <span className="prayer-card__badge">
          {stateLabel}
        </span>
      )}

      {/* =================================================
          PRAYER ICON
      ================================================= */}

      {Icon && (
        <Icon
          className="prayer-card__icon"
          aria-hidden="true"
        />
      )}

      {/* =================================================
          PRAYER TIME
      ================================================= */}

      <p className="prayer-card__time">
         {time || "--"}
      </p>

      {/* =================================================
          PRAYER NAME
      ================================================= */}

      <p className="prayer-card__label">
        {label}
      </p>

      {/* =================================================
          ARABIC NAME
      ================================================= */}

      {arabic && (
        <p
          className="prayer-card__arabic"
          lang="ar"
          dir="rtl"
        >
          {arabic}
        </p>
      )}

    </div>
  );
}

export default PrayerCard;