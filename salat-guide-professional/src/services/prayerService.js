// Talks to the free Aladhan Prayer Times API.
// This is the only file that knows about the API's URL shape
// and response format — components and hooks never call fetch()
// directly.

import { PRAYER_DEFINITIONS } from "../utils/prayerUtils.js";

/* =========================================================
   API URLs
========================================================= */

const TIMINGS_URL =
  "https://api.aladhan.com/v1/timingsByCity";

const CALENDAR_URL =
  "https://api.aladhan.com/v1/calendarByCity";

/* =========================================================
   CALCULATION METHOD
========================================================= */

// 2 = Islamic Society of North America (ISNA)
const CALCULATION_METHOD = 2;

/* =========================================================
   CLEAN TIME
========================================================= */

/**
 * Removes timezone text such as:
 * "(PKT)", "PKT", etc.
 *
 * Keeps only the actual prayer time.
 *
 * Examples:
 * "05:02 (PKT)" → "05:02"
 * "05:02 PKT"    → "05:02"
 */
function cleanTime(time) {
  if (!time) return "";

  return String(time)
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*PKT/gi, "")
    .trim();
}

/* =========================================================
   FALLBACK DATA
========================================================= */

/**
 * Demo data used only if the live API is unreachable.
 *
 * This allows the UI to remain usable when:
 * - Internet is unavailable
 * - API is temporarily down
 * - API request fails
 */
const FALLBACK_TIMINGS = {
  Fajr: "05:02",
  Sunrise: "06:24",
  Dhuhr: "12:14",
  Asr: "15:45",
  Maghrib: "18:03",
  Isha: "19:25",
};

/* =========================================================
   BUILD PRAYER LIST
========================================================= */

/**
 * Converts the API timings into the application's
 * standard prayer format.
 */
function buildPrayerList(timings) {
  return PRAYER_DEFINITIONS.map(
    ({ key, label, arabic }) => ({
      key,
      label,
      arabic,
      time: cleanTime(timings[key]),
    })
  );
}

/* =========================================================
   GET TODAY'S PRAYER TIMES
========================================================= */

/**
 * Fetches today's prayer timings for a city/country.
 *
 * @param {string} city
 * @param {string} country
 *
 * @returns {Promise<Object>}
 */
export async function getPrayerTimes(city, country) {
  const url =
    `${TIMINGS_URL}?city=${encodeURIComponent(
      city
    )}&country=${encodeURIComponent(
      country
    )}&method=${CALCULATION_METHOD}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to load prayer times.");
    }

    const payload = await response.json();

    const data = payload?.data;

    if (!data?.timings) {
      throw new Error("Prayer times were not found.");
    }

    return {
      prayers: buildPrayerList(data.timings),

      hijriDate: data?.date?.hijri
        ? `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`
        : "",

      gregorianDate:
        data?.date?.readable || "",

      methodName:
        data?.meta?.method?.name ||
        "Islamic Society of North America",

      isFallback: false,
    };
  } catch {
    /*
      If the API fails, return demo timings
      instead of breaking the entire UI.
    */

    return {
      prayers: buildPrayerList(
        FALLBACK_TIMINGS
      ),

      hijriDate: "",

      gregorianDate: "",

      methodName: "Demo data (offline)",

      isFallback: true,
    };
  }
}

/* =========================================================
   GET MONTHLY PRAYER TIMES
========================================================= */

/**
 * Fetches a full month of prayer timings
 * for a city/country.
 *
 * Returns:
 *
 * [
 *   {
 *     date,
 *     fajr,
 *     sunrise,
 *     dhuhr,
 *     asr,
 *     maghrib,
 *     isha
 *   }
 * ]
 *
 * @param {string} city
 * @param {string} country
 * @param {number|string} month
 * @param {number|string} year
 *
 * @returns {Promise<Array>}
 */
export async function getMonthlyPrayerTimes(
  city,
  country,
  month,
  year
) {
  const url =
    `${CALENDAR_URL}/${year}/${month}` +
    `?city=${encodeURIComponent(
      city
    )}` +
    `&country=${encodeURIComponent(
      country
    )}` +
    `&method=${CALCULATION_METHOD}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Unable to load the monthly prayer calendar. Please try again."
    );
  }

  const payload = await response.json();

  const days = payload?.data;

  if (!Array.isArray(days) || days.length === 0) {
    throw new Error(
      "No prayer times available for this month."
    );
  }

  return days.map((day) => ({
    date:
      day.date.gregorian.day +
      " " +
      day.date.gregorian.month.en,

    fajr: cleanTime(
      day.timings?.Fajr
    ),

    sunrise: cleanTime(
      day.timings?.Sunrise
    ),

    dhuhr: cleanTime(
      day.timings?.Dhuhr
    ),

    asr: cleanTime(
      day.timings?.Asr
    ),

    maghrib: cleanTime(
      day.timings?.Maghrib
    ),

    isha: cleanTime(
      day.timings?.Isha
    ),
  }));
}