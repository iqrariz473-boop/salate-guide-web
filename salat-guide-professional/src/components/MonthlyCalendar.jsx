import { useEffect, useState } from "react";

import { getMonthlyPrayerTimes } from "../services/prayerService.js";

import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

import "./MonthlyCalendar.css";

/* =========================================================
   MONTH NAMES
========================================================= */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* =========================================================
   CURRENT DATE
========================================================= */

function getTodayInfo() {
  const date = new Date();

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {
  if (!date) return "—";

  return String(date)
    .replace("January", "Jan")
    .replace("February", "Feb")
    .replace("March", "Mar")
    .replace("April", "Apr")
    .replace("May", "May")
    .replace("June", "Jun")
    .replace("July", "Jul")
    .replace("August", "Aug")
    .replace("September", "Sep")
    .replace("October", "Oct")
    .replace("November", "Nov")
    .replace("December", "Dec");
}

/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(time) {
  if (!time) return "—";

  const value = String(time)
    .trim()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*PKT/gi, "")
    .trim();

  if (!value) return "—";

  /* Already AM / PM */
  if (/\b(AM|PM)\b/i.test(value)) {
    return value
      .replace(/\s+/g, " ")
      .replace(/\b(am|pm)\b/i, (match) =>
        match.toUpperCase()
      );
  }

  /* 24-hour format */
  const match = value.match(/^(\d{1,2}):(\d{2})/);

  if (!match) return value;

  let hours = Number(match[1]);
  const minutes = match[2];

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
}

/* =========================================================
   NORMALIZE DATE
========================================================= */

function normalizeDate(dateValue) {
  if (!dateValue) return null;

  const value = String(dateValue).trim();

  /* YYYY-MM-DD */
  let match = value.match(
    /^\d{4}-(\d{1,2})-(\d{1,2})$/
  );

  if (match) {
    return {
      month: Number(match[1]),
      day: Number(match[2]),
    };
  }

  /* DD-MM-YYYY or DD/MM/YYYY */
  match = value.match(
    /^(\d{1,2})[-/](\d{1,2})[-/]\d{4}$/
  );

  if (match) {
    return {
      day: Number(match[1]),
      month: Number(match[2]),
    };
  }

  /* DD September */
  match = value.match(
    /^(\d{1,2})\s+([A-Za-z]+)/
  );

  if (match) {
    const months = {
      jan: 1,
      january: 1,

      feb: 2,
      february: 2,

      mar: 3,
      march: 3,

      apr: 4,
      april: 4,

      may: 5,

      jun: 6,
      june: 6,

      jul: 7,
      july: 7,

      aug: 8,
      august: 8,

      sep: 9,
      sept: 9,
      september: 9,

      oct: 10,
      october: 10,

      nov: 11,
      november: 11,

      dec: 12,
      december: 12,
    };

    const monthName = match[2].toLowerCase();

    if (months[monthName]) {
      return {
        day: Number(match[1]),
        month: months[monthName],
      };
    }
  }

  /* Only day number */
  if (/^\d{1,2}$/.test(value)) {
    return {
      day: Number(value),
      month: new Date().getMonth() + 1,
    };
  }

  return null;
}

/* =========================================================
   MONTHLY CALENDAR
========================================================= */

function MonthlyCalendar({ city, country }) {
  const today = getTodayInfo();

  /* =======================================================
     SELECTED MONTH
  ======================================================= */

  const [selectedMonth, setSelectedMonth] =
    useState(today.month);

  const [selectedYear, setSelectedYear] =
    useState(today.year);

  /* =======================================================
     PRAYER DAYS
  ======================================================= */

  const [days, setDays] = useState([]);

  const [status, setStatus] =
    useState("loading");

  const [errorMessage, setErrorMessage] =
    useState("");

  /* =======================================================
     LOAD SELECTED MONTH
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    async function loadMonthlyPrayerTimes() {
      try {
        setStatus("loading");
        setErrorMessage("");
        setDays([]);

        const data =
          await getMonthlyPrayerTimes(
            city,
            country,
            selectedMonth,
            selectedYear
          );

        if (!isMounted) return;

        setDays(
          Array.isArray(data)
            ? data
            : []
        );

        setStatus("success");
      } catch (error) {
        if (!isMounted) return;

        setDays([]);

        setStatus("error");

        setErrorMessage(
          error?.message ||
            "Unable to load the monthly prayer calendar."
        );
      }
    }

    if (!city || !country) {
      setStatus("error");

      setErrorMessage(
        "City and country are required."
      );

      return;
    }

    loadMonthlyPrayerTimes();

    return () => {
      isMounted = false;
    };
  }, [
    city,
    country,
    selectedMonth,
    selectedYear,
  ]);

  /* =======================================================
     PREVIOUS MONTH
  ======================================================= */

  function goToPreviousMonth() {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(
        selectedYear - 1
      );
    } else {
      setSelectedMonth(
        selectedMonth - 1
      );
    }
  }

  /* =======================================================
     NEXT MONTH
  ======================================================= */

  function goToNextMonth() {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(
        selectedYear + 1
      );
    } else {
      setSelectedMonth(
        selectedMonth + 1
      );
    }
  }

  /* =======================================================
     CHECK TODAY
  ======================================================= */

  function isToday(day) {
    const normalized =
      normalizeDate(day?.date);

    if (!normalized) {
      return false;
    }

    return (
      normalized.day === today.day &&
      normalized.month === today.month &&
      selectedYear === today.year
    );
  }

  /* =======================================================
     CURRENT MONTH NAME
  ======================================================= */

  const monthName =
    MONTHS[selectedMonth - 1];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="monthly-calendar">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="monthly-calendar__header">

        <div className="monthly-calendar__nav">

          {/* PREVIOUS MONTH */}

          <button
            type="button"
            className="monthly-calendar__nav-btn"
            aria-label="Previous month"
            onClick={goToPreviousMonth}
          >
            ‹
          </button>

          {/* CURRENT MONTH */}

          <h2 className="monthly-calendar__current-month">
            {monthName} {selectedYear}
          </h2>

          {/* NEXT MONTH */}

          <button
            type="button"
            className="monthly-calendar__nav-btn"
            aria-label="Next month"
            onClick={goToNextMonth}
          >
            ›
          </button>

        </div>

      </div>

      {/* ===================================================
          LOADING
      =================================================== */}

      {status === "loading" && (
        <div className="monthly-calendar__state">
          <Loading />
        </div>
      )}

      {/* ===================================================
          ERROR
      =================================================== */}

      {status === "error" && (
        <div className="monthly-calendar__state">

          <ErrorMessage
            message={errorMessage}
          />

        </div>
      )}

      {/* ===================================================
          EMPTY
      =================================================== */}

      {status === "success" &&
        days.length === 0 && (
          <div className="monthly-calendar__state">
            No prayer times available for this month.
          </div>
        )}

      {/* ===================================================
          TABLE
      =================================================== */}

      {status === "success" &&
        days.length > 0 && (

          <div className="monthly-calendar__table-wrapper">

            <div className="monthly-calendar__scroll">

              <table className="monthly-calendar__table">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Fajr</th>
                    <th>Sunrise</th>
                    <th>Dhuhr</th>
                    <th>Asr</th>
                    <th>Maghrib</th>
                    <th>Isha</th>
                  </tr>
                </thead>

                <tbody>

                  {days.map((day, index) => {

                    const todayRow =
                      isToday(day);

                    return (
                      <tr
                        key={`${
                          day?.date ||
                          "day"
                        }-${index}`}
                        className={
                          todayRow
                            ? "monthly-calendar__today-row"
                            : ""
                        }
                      >

                        {/* DATE */}

                        <td>
                          <div className="monthly-calendar__date">
                            {formatDate(
                              day?.date
                            )}
                          </div>
                        </td>

                        {/* FAJR */}

                        <td>
                          {formatTime(
                            day?.fajr
                          )}
                        </td>

                        {/* SUNRISE */}

                        <td>
                          {formatTime(
                            day?.sunrise
                          )}
                        </td>

                        {/* DHUHR */}

                        <td>
                          {formatTime(
                            day?.dhuhr
                          )}
                        </td>

                        {/* ASR */}

                        <td>
                          {formatTime(
                            day?.asr
                          )}
                        </td>

                        {/* MAGHRIB */}

                        <td>
                          {formatTime(
                            day?.maghrib
                          )}
                        </td>

                        {/* ISHA */}

                        <td>
                          {formatTime(
                            day?.isha
                          )}
                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>
        )}

    </section>
  );
}

export default MonthlyCalendar;