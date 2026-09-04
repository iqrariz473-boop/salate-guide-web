import useCountdown from "../hooks/useCountdown.js";
import "./PrayerCountdown.css";

function pad(value) {
  return String(value).padStart(2, "0");
}

/** Shows "Next Prayer: Asr, 03:45 PM" with a live HH:MM:SS countdown. */
function PrayerCountdown({ nextLabel, nextTime, targetDate }) {
  const { hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className="prayer-countdown">
      <div className="prayer-countdown__info">
        <span className="prayer-countdown__eyebrow">Next Prayer</span>
        <p className="prayer-countdown__name">{nextLabel}</p>
        <p className="prayer-countdown__time">{nextTime}</p>
      </div>
      <div className="prayer-countdown__timer" aria-live="polite">
        <span className="prayer-countdown__timer-label">Time remaining</span>
        <span className="prayer-countdown__timer-value">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </span>
      </div>
    </div>
  );
}

export default PrayerCountdown;
