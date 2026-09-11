/* =========================================================
   DATE & TIME UTILITIES
========================================================= */

/**
 * Format a complete date.
 *
 * Example:
 * Thursday, September 10, 2026
 */
export function formatFullDate(date = new Date()) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format month + year.
 *
 * Example:
 * September 2026
 */
export function formatMonthYear(month, year) {
  const date = new Date(year, month - 1, 1);

  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

/* =========================================================
   CLEAN TIME
========================================================= */

function cleanTime(rawTime) {
  if (rawTime === null || rawTime === undefined) {
    return "";
  }

  return String(rawTime)
    // Remove timezone / bracket information
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*PKT/gi, "")
    .trim()
    .split(/\s+/)[0];
}

/* =========================================================
   PARSE TIME
========================================================= */

/**
 * Converts a prayer time into hours/minutes.
 *
 * Supports:
 *
 * 15:32       → 15, 32
 * 03:32       → 3, 32
 * 3:32 PM     → 15, 32
 * 3:32 AM     → 3, 32
 */
function parseTime(rawTime) {
  if (rawTime === null || rawTime === undefined) {
    return null;
  }

  const raw = String(rawTime).trim();

  if (!raw) {
    return null;
  }

  /*
    First check whether AM / PM exists.
  */
  const periodMatch = raw.match(/\b(AM|PM)\b/i);

  const period = periodMatch
    ? periodMatch[1].toUpperCase()
    : null;

  /*
    Remove AM / PM before extracting hours/minutes.
  */
  const cleaned = raw
    .replace(/\b(AM|PM)\b/gi, "")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*PKT/gi, "")
    .trim();

  /*
    Find HH:MM
  */
  const match = cleaned.match(/(\d{1,2}):(\d{2})/);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  /*
    12-hour format → 24-hour format
  */
  if (period === "PM" && hours < 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  /*
    Without AM/PM, treat the value as 24-hour time.

    Example:
    15:32 → 15:32
    03:32 → 03:32
  */
  if (!period && (hours < 0 || hours > 23)) {
    return null;
  }

  if (hours < 0 || hours > 23) {
    return null;
  }

  return {
    hours,
    minutes,
  };
}

/* =========================================================
   12-HOUR FORMAT
========================================================= */

/**
 * Convert prayer time to 12-hour format.
 *
 * Examples:
 *
 * 05:12 → 5:12 AM
 * 12:30 → 12:30 PM
 * 15:32 → 3:32 PM
 * 03:32 PM → 3:32 PM
 */
export function to12Hour(rawTime) {
  const parsed = parseTime(rawTime);

  if (!parsed) {
    return "--";
  }

  const { hours, minutes } = parsed;

  const period = hours >= 12 ? "PM" : "AM";

  const hour12 =
    hours % 12 === 0
      ? 12
      : hours % 12;

  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

/* =========================================================
   DATE FROM PRAYER TIME
========================================================= */

/**
 * Create a Date object for a prayer time.
 *
 * Examples:
 *
 * 15:32 → today's 3:32 PM
 * 05:20 → today's 5:20 AM
 *
 * dayOffset:
 * 0  = today
 * 1  = tomorrow
 */
export function toDateOnDay(
  rawTime,
  baseDate = new Date(),
  dayOffset = 0
) {
  const parsed = parseTime(rawTime);

  if (!parsed) {
    return null;
  }

  const { hours, minutes } = parsed;

  const result = new Date(baseDate);

  result.setDate(
    result.getDate() + Number(dayOffset || 0)
  );

  result.setHours(
    hours,
    minutes,
    0,
    0
  );

  return result;
}

/* =========================================================
   ISO DATE
========================================================= */

/**
 * Convert Date to:
 *
 * YYYY-MM-DD
 */
export function toISODate(date = new Date()) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}