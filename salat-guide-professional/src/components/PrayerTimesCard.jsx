import PrayerCard from "./PrayerCard.jsx";
import PrayerCountdown from "./PrayerCountdown.jsx";
import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import { getCurrentAndNextPrayer } from "../utils/prayerUtils.js";
import { to12Hour, toDateOnDay, formatFullDate } from "../utils/dateUtils.js";
import "./PrayerTimesCard.css";

/**
 * The main prayer-times dashboard: location + date, a countdown to the
 * next prayer, and a grid of all six timings. Used on both the Home page
 * and the Prayer Times page. Handles loading/error/empty states itself.
 */
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
  if (status === "loading") {
    return (
      <div className="prayer-dashboard prayer-dashboard--plain">
        <Loading />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="prayer-dashboard prayer-dashboard--plain">
        <ErrorMessage message={errorMessage || "Unable to load prayer times."} onRetry={onRetry} />
      </div>
    );
  }

  if (!prayers || prayers.length === 0) {
    return (
      <div className="prayer-dashboard prayer-dashboard--plain">
        <ErrorMessage message="No prayer times available." onRetry={onRetry} />
      </div>
    );
  }

  const dailyPrayers = prayers.filter((prayer) => prayer.key !== "Sunrise");
  const { currentPrayer, nextPrayer, nextDayOffset } = getCurrentAndNextPrayer(dailyPrayers);
  const targetDate = toDateOnDay(nextPrayer.time, new Date(), nextDayOffset);

  return (
    <div className="prayer-dashboard">
      <div className="prayer-dashboard__header">
        <div>
          <p className="prayer-dashboard__location">
            {city}, {country}
          </p>
          <p className="prayer-dashboard__date">
            {formatFullDate()}
            {hijriDate ? ` \u00b7 ${hijriDate}` : ""}
          </p>
        </div>
        {methodName && <span className="prayer-dashboard__method">{methodName}</span>}
      </div>

      {isFallback && (
        <p className="prayer-dashboard__fallback-note">
          Showing demo prayer times — live data is currently unavailable.
        </p>
      )}

      <PrayerCountdown
        nextLabel={nextPrayer.label}
        nextTime={to12Hour(nextPrayer.time)}
        targetDate={targetDate}
      />

      <div className="prayer-dashboard__grid">
        {prayers.map((prayer) => (
          <PrayerCard
            key={prayer.key}
            label={prayer.label}
            arabic={prayer.arabic}
            time={prayer.time}
            isActive={prayer.key === currentPrayer.key}
            isNext={prayer.key === nextPrayer.key}
          />
        ))}
      </div>
    </div>
  );
}

export default PrayerTimesCard;
