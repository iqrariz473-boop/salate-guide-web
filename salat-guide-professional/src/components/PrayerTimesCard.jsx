import PrayerCard from "./PrayerCard.jsx";
import PrayerCountdown from "./PrayerCountdown.jsx";
import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

import {
  getCurrentAndNextPrayer,
} from "../utils/prayerUtils.js";

import {
  to12Hour,
  toDateOnDay,
} from "../utils/dateUtils.js";

import "./PrayerTimesCard.css";

function PrayerTimesCard({
  city,
  country,
  status,
  errorMessage,
  prayers,
  hijriDate,
  methodName,
  isFallback,
  onRetry,
}) {

  /* =========================================================
     LOADING
  ========================================================= */

  if (status === "loading") {
    return (
      <div className="prayer-dashboard prayer-dashboard--plain">
        <Loading />
      </div>
    );
  }


  /* =========================================================
     ERROR
  ========================================================= */

  if (status === "error") {
    return (
      <div className="prayer-dashboard prayer-dashboard--plain">
        <ErrorMessage
          message={
            errorMessage ||
            "Unable to load prayer times."
          }
          onRetry={onRetry}
        />
      </div>
    );
  }


  /* =========================================================
     EMPTY DATA
  ========================================================= */

  if (!prayers || prayers.length === 0) {
    return (
      <div className="prayer-dashboard prayer-dashboard--plain">
        <ErrorMessage
          message="No prayer times available."
          onRetry={onRetry}
        />
      </div>
    );
  }


  /* =========================================================
     CURRENT + NEXT PRAYER

     IMPORTANT:
     Sunrise is INCLUDED so that:

     Fajr     → Current
     Sunrise  → Next

     After Sunrise:

     Sunrise  → Current
     Dhuhr    → Next
     ========================================================= */

  const {
    currentPrayer,
    nextPrayer,
    nextDayOffset,
  } = getCurrentAndNextPrayer(prayers);


  /* =========================================================
     NEXT PRAYER DATE
  ========================================================= */

  const targetDate = toDateOnDay(
    nextPrayer.time,
    new Date(),
    nextDayOffset
  );


  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="prayer-dashboard">

      {isFallback && (
        <p className="prayer-dashboard__fallback-note">
          Showing demo prayer times — live data is
          currently unavailable.
        </p>
      )}


      {/* =====================================================
          COUNTDOWN
      ===================================================== */}

      <PrayerCountdown
        nextLabel={nextPrayer.label}
        nextTime={to12Hour(nextPrayer.time)}
        targetDate={targetDate}
      />


      {/* =====================================================
          PRAYER CARDS
      ===================================================== */}

      <div className="prayer-dashboard__grid">

        {prayers.map((prayer) => {

          const isCurrent =
            prayer.key === currentPrayer?.key;

          const isNext =
            prayer.key === nextPrayer?.key;


          return (
            <PrayerCard
              key={prayer.key}

              label={prayer.label}

              arabic={prayer.arabic}

              time={prayer.time}

              isActive={isCurrent}

              isNext={isNext}
            />
          );
        })}

      </div>

    </div>
  );
}

export default PrayerTimesCard;