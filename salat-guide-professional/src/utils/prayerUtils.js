// Core "which prayer is it right now" logic, shared by the home page
// dashboard and the Prayer Times page.
//
// Kept separate from any component so the prayer rollover math
// can be tested independently.

/* =========================================================
   PRAYER DEFINITIONS
========================================================= */

export const PRAYER_DEFINITIONS = [
  {
    key: "Fajr",
    label: "Fajr",
    arabic: "الفجر",
  },
  {
    key: "Sunrise",
    label: "Sunrise",
    arabic: "الشروق",
  },
  {
    key: "Dhuhr",
    label: "Dhuhr",
    arabic: "الظهر",
  },
  {
    key: "Asr",
    label: "Asr",
    arabic: "العصر",
  },
  {
    key: "Maghrib",
    label: "Maghrib",
    arabic: "المغرب",
  },
  {
    key: "Isha",
    label: "Isha",
    arabic: "العشاء",
  },
];

/* =========================================================
   CLEAN TIME
========================================================= */

/**
 * Removes timezone text from a prayer time.
 *
 * Example:
 * "05:02 (PKT)" → "05:02"
 * "05:02 PKT"   → "05:02"
 */
function cleanTime(rawTime) {
  if (!rawTime) return "";

  return String(rawTime)
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*PKT/gi, "")
    .trim()
    .split(" ")[0];
}

/* =========================================================
   CONVERT TIME TO MINUTES
========================================================= */

/**
 * Converts "HH:MM" into total minutes after midnight.
 *
 * Example:
 * "05:30" → 330
 * "12:00" → 720
 */
function toMinutes(rawTime) {
  const cleanedTime = cleanTime(rawTime);

  if (!cleanedTime) {
    return null;
  }

  const [hoursStr, minutesStr] =
    cleanedTime.split(":");

  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return null;
  }

  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return hours * 60 + minutes;
}

/* =========================================================
   CURRENT + NEXT PRAYER
========================================================= */

/**
 * Given an ordered list of:
 *
 * [
 *   { key, label, time },
 *   ...
 * ]
 *
 * and the current time, determines:
 *
 * - Current prayer
 * - Next prayer
 * - Current prayer index
 * - Next prayer index
 * - Whether next prayer is tomorrow
 *
 * Correctly handles:
 *
 * Fajr → Dhuhr → Asr → Maghrib → Isha → Fajr
 *
 * Returns:
 *
 * {
 *   currentIndex,
 *   currentPrayer,
 *   nextIndex,
 *   nextPrayer,
 *   nextDayOffset
 * }
 *
 * nextDayOffset:
 * 0 = next prayer is today
 * 1 = next prayer is tomorrow
 */
export function getCurrentAndNextPrayer(
  prayers,
  now = new Date()
) {
  /* -------------------------------------------------------
     Validate prayer list
  ------------------------------------------------------- */

  if (!Array.isArray(prayers) || prayers.length === 0) {
    return {
      currentIndex: -1,
      currentPrayer: null,
      nextIndex: -1,
      nextPrayer: null,
      nextDayOffset: 0,
    };
  }

  /* -------------------------------------------------------
     Current time in minutes
  ------------------------------------------------------- */

  const nowMinutes =
    now.getHours() * 60 +
    now.getMinutes();

  /* -------------------------------------------------------
     Convert prayer times to minutes
  ------------------------------------------------------- */

  const times = prayers.map((prayer) =>
    toMinutes(prayer?.time)
  );

  /* -------------------------------------------------------
     Find latest prayer that has already started
  ------------------------------------------------------- */

  let currentIndex = -1;

  for (let i = 0; i < times.length; i += 1) {
    const prayerMinutes = times[i];

    if (
      prayerMinutes !== null &&
      prayerMinutes <= nowMinutes
    ) {
      currentIndex = i;
    }
  }

  /* -------------------------------------------------------
     Before Fajr

     Example:
     Current time = 04:30
     Fajr = 05:00

     Conceptually current prayer is yesterday's Isha.
     Next prayer is today's Fajr.
  ------------------------------------------------------- */

  if (currentIndex === -1) {
    return {
      currentIndex: prayers.length - 1,
      currentPrayer: prayers[prayers.length - 1],
      nextIndex: 0,
      nextPrayer: prayers[0],
      nextDayOffset: 0,
    };
  }

  /* -------------------------------------------------------
     Determine next prayer
  ------------------------------------------------------- */

  const isLast =
    currentIndex === prayers.length - 1;

  const nextIndex =
    isLast ? 0 : currentIndex + 1;

  /* -------------------------------------------------------
     Return result
  ------------------------------------------------------- */

  return {
    currentIndex,

    currentPrayer:
      prayers[currentIndex],

    nextIndex,

    nextPrayer:
      prayers[nextIndex],

    nextDayOffset:
      isLast ? 1 : 0,
  };
}