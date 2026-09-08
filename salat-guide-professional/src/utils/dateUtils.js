export function formatFullDate(date = new Date()) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonthYear(month, year) {
  const date = new Date(year, month - 1, 1);

  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function cleanTime(rawTime) {
  if (!rawTime) return "";

  return String(rawTime)
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*PKT/gi, "")
    .trim()
    .split(" ")[0];
}

export function to12Hour(rawTime) {
  const cleanedTime = cleanTime(rawTime);

  if (!cleanedTime) return "--";

  const [hoursStr, minutesStr] = cleanedTime.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return "--";
  }

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function toDateOnDay(
  rawTime,
  baseDate = new Date(),
  dayOffset = 0
) {
  const cleanedTime = cleanTime(rawTime);

  if (!cleanedTime) return null;

  const [hoursStr, minutesStr] = cleanedTime.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  const result = new Date(baseDate);

  result.setDate(result.getDate() + Number(dayOffset));
  result.setHours(hours, minutes, 0, 0);

  return result;
}

export function toISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}