// Talks to the free Aladhan Prayer Times API. This is the only file that
// knows about the API's URL shape and response format — components and
// hooks never call fetch() directly.

import { PRAYER_DEFINITIONS } from "../utils/prayerUtils.js";

const TIMINGS_URL = "https://api.aladhan.com/v1/timingsByCity";
const CALENDAR_URL = "https://api.aladhan.com/v1/calendarByCity";
const CALCULATION_METHOD = 2; // Islamic Society of North America (ISNA)

/**
 * Removes timezone text such as "(PKT)", "PKT", etc.
 * Keeps only the actual time.
 */
function cleanTime(time) {
  if (!time) return "";

  return String(time)
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*PKT/gi, "")
    .trim();
}

/**
 * Demo data used only if the live API is unreachable, so the UI can
 * still be explored offline instead of showing a dead end.
 */
const FALLBACK_TIMINGS = {
  Fajr: "05:02",
  Sunrise: "06:24",
  Dhuhr: "12:14",
  Asr: "15:45",
  Maghrib: "18:03",
  Isha: "19:25",
};

function buildPrayerList(timings) {
  return PRAYER_DEFINITIONS.map(({ key, label, arabic }) => ({
    key,
    label,
    arabic,
    time: cleanTime(timings[key]),
  }));
}

/**
 * Fetches today's prayer timings for a city/country.
 * Falls back to demo data if the network request fails.
 */
export async function getPrayerTimes(city, country) {
  const url = `${TIMINGS_URL}?city=${encodeURIComponent(
    city
  )}&country=${encodeURIComponent(country)}&method=${CALCULATION_METHOD}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("bad status");
    }

    const payload = await response.json();
    const data = payload?.data;

    if (!data?.timings) {
      throw new Error("empty payload");
    }

    return {
      prayers: buildPrayerList(data.timings),

      hijriDate: `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`,

      gregorianDate: data.date.readable,

      methodName: data.meta.method.name,

      isFallback: false,
    };
  } catch {
    return {
      prayers: buildPrayerList(FALLBACK_TIMINGS),

      hijriDate: "",

      gregorianDate: "",

      methodName: "Demo data (offline)",

      isFallback: true,
    };
  }
}

/**
 * Fetches a full month of prayer timings for a city/country.
 * Returns an array of:
 * { date, fajr, sunrise, dhuhr, asr, maghrib, isha }
 */
export async function getMonthlyPrayerTimes(
  city,
  country,
  month,
  year
) {
  const url = `${CALENDAR_URL}/${year}/${month}?city=${encodeURIComponent(
    city
  )}&country=${encodeURIComponent(
    country
  )}&method=${CALCULATION_METHOD}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Unable to load the monthly prayer calendar. Please try again."
    );
  }

  const payload = await response.json();
  const days = payload?.data;

  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("No prayer times available for this month.");
  }

  return days.map((day) => ({
    date:
      day.date.gregorian.day +
      " " +
      day.date.gregorian.month.en,

    fajr: cleanTime(day.timings.Fajr),

    sunrise: cleanTime(day.timings.Sunrise),

    dhuhr: cleanTime(day.timings.Dhuhr),

    asr: cleanTime(day.timings.Asr),

    maghrib: cleanTime(day.timings.Maghrib),

    isha: cleanTime(day.timings.Isha),
  }));
}