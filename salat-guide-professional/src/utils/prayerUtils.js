// Core "which prayer is it right now" logic, shared by the home page
// dashboard and the Prayer Times page. Kept separate from any component
// so the rollover math can be tested/reasoned about on its own.

export const PRAYER_DEFINITIONS = [
  { key: "Fajr", label: "Fajr", arabic: "الفجر" },
  { key: "Sunrise", label: "Sunrise", arabic: "الشروق" },
  { key: "Dhuhr", label: "Dhuhr", arabic: "الظهر" },
  { key: "Asr", label: "Asr", arabic: "العصر" },
  { key: "Maghrib", label: "Maghrib", arabic: "المغرب" },
  { key: "Isha", label: "Isha", arabic: "العشاء" },
];

function cleanTime(rawTime) {
  return rawTime.split(" ")[0];
}

function toMinutes(rawTime) {
  const [hoursStr, minutesStr] = cleanTime(rawTime).split(":");
  return Number(hoursStr) * 60 + Number(minutesStr);
}

/**
 * Given an ordered list of { key, label, time } prayers (Fajr..Isha) and
 * the current time, works out which prayer is active now and which is
 * next — correctly rolling over past Isha into tomorrow's Fajr.
 *
 * Returns: {
 *   currentIndex, currentPrayer,
 *   nextIndex, nextPrayer, nextDayOffset (0 = today, 1 = tomorrow)
 * }
 */
export function getCurrentAndNextPrayer(prayers, now = new Date()) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const times = prayers.map((prayer) => toMinutes(prayer.time));

  let currentIndex = -1;
  for (let i = 0; i < times.length; i += 1) {
    if (times[i] <= nowMinutes) {
      currentIndex = i;
    }
  }

  // Before the first prayer of the day (before Fajr): "current" is
  // conceptually still yesterday's Isha, and next is today's Fajr.
  if (currentIndex === -1) {
    return {
      currentIndex: prayers.length - 1,
      currentPrayer: prayers[prayers.length - 1],
      nextIndex: 0,
      nextPrayer: prayers[0],
      nextDayOffset: 0,
    };
  }

  const isLast = currentIndex === prayers.length - 1;
  const nextIndex = isLast ? 0 : currentIndex + 1;

  return {
    currentIndex,
    currentPrayer: prayers[currentIndex],
    nextIndex,
    nextPrayer: prayers[nextIndex],
    nextDayOffset: isLast ? 1 : 0,
  };
}
