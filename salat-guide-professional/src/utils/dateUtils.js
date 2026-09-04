// Shared date helpers used by prayer time features (today's date, month
// navigation, and converting API "HH:MM" strings into real Date objects).

/** e.g. "Tuesday, 1 September 2026" */
export function formatFullDate(date = new Date()) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** e.g. "Sep 2026" — used as a calendar heading. */
export function formatMonthYear(month, year) {
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

/** Strips a trailing " (PKT)"-style timezone suffix some APIs add. */
function cleanTime(rawTime) {
  return rawTime.split(" ")[0];
}

/** Converts "HH:MM" (24h) into a 12-hour "h:MM AM/PM" string. */
export function to12Hour(rawTime) {
  const [hoursStr, minutesStr] = cleanTime(rawTime).split(":");
  const hours = Number(hoursStr);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${minutesStr} ${period}`;
}

/**
 * Builds a real Date object for a "HH:MM" prayer time, on the given base
 * date. Pass dayOffset=1 to place it on the following day (used when the
 * next prayer has rolled over past midnight).
 */
export function toDateOnDay(rawTime, baseDate = new Date(), dayOffset = 0) {
  const [hoursStr, minutesStr] = cleanTime(rawTime).split(":");
  const result = new Date(baseDate);
  result.setDate(result.getDate() + dayOffset);
  result.setHours(Number(hoursStr), Number(minutesStr), 0, 0);
  return result;
}

/** Zero-padded "YYYY-MM-DD", handy for API params and cache keys. */
export function toISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
