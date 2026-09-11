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
// =========================================================
// CURRENT + NEXT PRAYER
// =========================================================

export function getCurrentAndNextPrayer(prayers) {
  if (!Array.isArray(prayers) || prayers.length === 0) {
    return {
      currentPrayer: null,
      nextPrayer: null,
      nextDayOffset: 0,
    };
  }

  const now = new Date();

  // Convert "4:20 AM" / "12:01 PM" to today's Date
  function getPrayerDate(time, dayOffset = 0) {
    if (!time) return null;

    const match = String(time)
      .trim()
      .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (!match) {
      return null;
    }

    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const period = match[3].toUpperCase();

    // Convert 12-hour → 24-hour
    if (period === "AM") {
      if (hour === 12) {
        hour = 0;
      }
    } else {
      if (hour !== 12) {
        hour += 12;
      }
    }

    const date = new Date(now);

    date.setDate(
      date.getDate() + dayOffset
    );

    date.setHours(
      hour,
      minute,
      0,
      0
    );

    return date;
  }

  // ---------------------------------------------------------
  // Create today's prayer dates
  // ---------------------------------------------------------

  const prayerDates = prayers
    .map((prayer) => ({
      ...prayer,
      date: getPrayerDate(prayer.time),
    }))
    .filter((prayer) => prayer.date);

  if (prayerDates.length === 0) {
    return {
      currentPrayer: null,
      nextPrayer: null,
      nextDayOffset: 0,
    };
  }

  // ---------------------------------------------------------
  // Find NEXT prayer
  // ---------------------------------------------------------

  let nextPrayer = prayerDates.find(
    (prayer) => prayer.date > now
  );

  let nextDayOffset = 0;

  // ---------------------------------------------------------
  // After Isha:
  // next prayer is tomorrow's Fajr
  // ---------------------------------------------------------

  if (!nextPrayer) {
    const firstPrayer = prayerDates[0];

    nextPrayer = {
      ...firstPrayer,
      date: getPrayerDate(
        firstPrayer.time,
        1
      ),
    };

    nextDayOffset = 1;
  }

  // ---------------------------------------------------------
  // Find CURRENT prayer
  // ---------------------------------------------------------

  let currentPrayer = null;

  for (let i = 0; i < prayerDates.length; i++) {
    const prayer = prayerDates[i];

    const next = prayerDates[i + 1];

    // Current prayer is active from its time
    // until the next prayer starts.

    if (
      now >= prayer.date &&
      next &&
      now < next.date
    ) {
      currentPrayer = prayer;
      break;
    }
  }

  // ---------------------------------------------------------
  // Before Fajr
  // ---------------------------------------------------------
  //
  // Example:
  // Current time = 3:30 AM
  // Fajr = 4:20 AM
  //
  // There is no current prayer yet.
  //

  if (!currentPrayer) {
    const fajr = prayerDates[0];

    if (now < fajr.date) {
      currentPrayer = null;
    }
  }

  // ---------------------------------------------------------
  // After Isha
  // ---------------------------------------------------------
  //
  // Example:
  // Current time = 9:00 PM
  // Isha = 7:40 PM
  //
  // Isha becomes current until midnight.
  //

  if (!currentPrayer) {
    const lastPrayer =
      prayerDates[prayerDates.length - 1];

    if (now >= lastPrayer.date) {
      currentPrayer = lastPrayer;
    }
  }

  return {
    currentPrayer,
    nextPrayer,
    nextDayOffset,
  };
}