import { useEffect, useMemo, useState } from "react";

import { getMonthlyPrayerTimes } from "../services/prayerService.js";
import { formatMonthYear } from "../utils/dateUtils.js";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./Icons.jsx";

import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

import "./MonthlyCalendar.css";


/* =========================================
   MONTHS
========================================= */

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


/* =========================================
   CURRENT DATE
========================================= */

function getTodayInfo() {
  const date = new Date();

  return {
    date,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),

    dayName: date.toLocaleDateString("en-US", {
      weekday: "long",
    }),

    fullDate: date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };
}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(time) {
  if (!time) return "—";

  /*
    Handles:
    05:12
    5:12
    05:12 AM
    17:30
  */

  const value = String(time).trim();

  const amPmMatch = value.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );

  if (amPmMatch) {
    let hour = Number(amPmMatch[1]);
    const minutes = amPmMatch[2];
    const period = amPmMatch[3].toUpperCase();

    hour = hour % 12 || 12;

    return `${hour}:${minutes} ${period}`;
  }

  const timeMatch = value.match(
    /^(\d{1,2}):(\d{2})/
  );

  if (!timeMatch) return value;

  const hours = Number(timeMatch[1]);
  const minutes = timeMatch[2];

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${minutes} ${period}`;
}


/* =========================================
   NORMALIZE DATE
========================================= */

function normalizeDate(dateValue) {
  if (!dateValue) return "";

  const value = String(dateValue).trim();

  /*
    Expected API date examples:
    01
    1
    2026-09-01
    01-09-2026
    01/09/2026
  */

  if (/^\d{1,2}$/.test(value)) {
    return value.padStart(2, "0");
  }

  const parts = value.split(/[-/]/);

  if (parts.length === 3) {
    const possibleDay = Number(parts[2]);

    if (parts[0].length === 4) {
      return parts[2].padStart(2, "0");
    }

    if (parts[2].length === 4) {
      return parts[0].padStart(2, "0");
    }

    if (!Number.isNaN(possibleDay)) {
      return parts[0].padStart(2, "0");
    }
  }

  return value;
}


/* =========================================
   COMPONENT
========================================= */

function MonthlyCalendar({ city, country }) {
  const today = useMemo(() => getTodayInfo(), []);

  const [month, setMonth] = useState(today.month);
  const [year, setYear] = useState(today.year);

  const [days, setDays] = useState([]);

  const [status, setStatus] = useState("loading");

  const [errorMessage, setErrorMessage] = useState("");


  /* =========================================
     LOAD MONTH
  ========================================= */

  useEffect(() => {
    if (!city || !country) return;

    let isCancelled = false;

    async function loadMonth() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const result = await getMonthlyPrayerTimes(
          city,
          country,
          month,
          year
        );

        if (isCancelled) return;

        setDays(Array.isArray(result) ? result : []);
        setStatus("success");
      } catch (error) {
        if (isCancelled) return;

        setErrorMessage(
          error?.message ||
            "Unable to load the monthly prayer calendar."
        );

        setStatus("error");
      }
    }

    loadMonth();

    return () => {
      isCancelled = true;
    };
  }, [city, country, month, year]);


  /* =========================================
     PREVIOUS MONTH
  ========================================= */

  function goToPreviousMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((currentYear) => currentYear - 1);
    } else {
      setMonth((currentMonth) => currentMonth - 1);
    }
  }


  /* =========================================
     NEXT MONTH
  ========================================= */

  function goToNextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((currentYear) => currentYear + 1);
    } else {
      setMonth((currentMonth) => currentMonth + 1);
    }
  }


  /* =========================================
     SELECT MONTH
  ========================================= */

  function selectMonth(index) {
    setMonth(index + 1);
  }


  /* =========================================
     GO TO TODAY
  ========================================= */

  function goToToday() {
    setMonth(today.month);
    setYear(today.year);
  }


  /* =========================================
     CHECK TODAY ROW
  ========================================= */

  function isToday(day) {
    if (year !== today.year || month !== today.month) {
      return false;
    }

    const normalizedApiDate = normalizeDate(day?.date);

    return normalizedApiDate ===
      String(today.day).padStart(2, "0");
  }


  return (
    <section className="monthly-calendar">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="monthly-calendar__header">

        <div className="monthly-calendar__title">

          <span className="monthly-calendar__icon">
            ☾
          </span>

          <div>
            <h3>Monthly Prayer Calendar</h3>

            <p>
              Prayer timings for {city}, {country}
            </p>
          </div>

        </div>


        {/* ===================================
            MONTH NAVIGATION
        =================================== */}

        <div className="monthly-calendar__nav">

          <button
            type="button"
            className="monthly-calendar__nav-btn"
            onClick={goToPreviousMonth}
            aria-label="Previous month"
          >
            <ChevronLeftIcon
              width={18}
              height={18}
            />
          </button>


          <span className="monthly-calendar__current-month">
            {formatMonthYear(month, year)}
          </span>


          <button
            type="button"
            className="monthly-calendar__nav-btn"
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            <ChevronRightIcon
              width={18}
              height={18}
            />
          </button>

        </div>

      </div>


      {/* =====================================
          PROMINENT CURRENT DATE
      ===================================== */}

      <div className="monthly-calendar__today-card">

        <div className="monthly-calendar__today-icon">
          📅
        </div>


        <div className="monthly-calendar__today-content">

          <span className="monthly-calendar__today-label">
            TODAY
          </span>

          <strong>
            {today.fullDate}
          </strong>

          <span className="monthly-calendar__today-day">
            {today.dayName}
          </span>

        </div>


        <button
          type="button"
          className="monthly-calendar__today-button"
          onClick={goToToday}
        >
          View Today
        </button>

      </div>


      {/* =====================================
          12 MONTH SELECTOR
      ===================================== */}

      <div className="monthly-calendar__months">

        {MONTHS.map((monthName, index) => {
          const isActive = month === index + 1;

          return (
            <button
              key={monthName}
              type="button"
              className={
                isActive
                  ? "monthly-calendar__month active"
                  : "monthly-calendar__month"
              }
              onClick={() => selectMonth(index)}
            >

              <span className="monthly-calendar__month-short">
                {monthName.substring(0, 3)}
              </span>

              <small>
                {monthName}
              </small>

            </button>
          );
        })}

      </div>


      {/* =====================================
          LOADING
      ===================================== */}

      {status === "loading" && (
        <div className="monthly-calendar__state">
          <Loading label="Loading monthly calendar..." />
        </div>
      )}


      {/* =====================================
          ERROR
      ===================================== */}

      {status === "error" && (
        <div className="monthly-calendar__state">
          <ErrorMessage message={errorMessage} />
        </div>
      )}


      {/* =====================================
          EMPTY
      ===================================== */}

      {status === "success" && days.length === 0 && (
        <div className="monthly-calendar__state">

          <ErrorMessage
            message="No prayer times available for this month."
          />

        </div>
      )}


      {/* =====================================
          TABLE
      ===================================== */}

      {status === "success" && days.length > 0 && (

        <div className="monthly-calendar__table-wrapper">

          <div className="monthly-calendar__scroll">

            <table className="monthly-calendar__table">

              <thead>

                <tr>

                  <th scope="col">
                    Date
                  </th>

                  <th scope="col">
                    Fajr
                  </th>

                  <th scope="col">
                    Sunrise
                  </th>

                  <th scope="col">
                    Dhuhr
                  </th>

                  <th scope="col">
                    Asr
                  </th>

                  <th scope="col">
                    Maghrib
                  </th>

                  <th scope="col">
                    Isha
                  </th>

                </tr>

              </thead>


              <tbody>

                {days.map((day, index) => {

                  const todayRow = isToday(day);

                  return (
                    <tr
                      key={
                        day?.date ||
                        `${month}-${year}-${index}`
                      }
                      className={
                        todayRow
                          ? "monthly-calendar__today-row"
                          : ""
                      }
                    >

                      <td className="monthly-calendar__date">

                        <span>
                          {day?.date || "—"}
                        </span>

                        {todayRow && (
                          <small className="monthly-calendar__today-badge">
                            TODAY
                          </small>
                        )}

                      </td>

                      <td>
                        {formatTime(day?.fajr)}
                      </td>

                      <td>
                        {formatTime(day?.sunrise)}
                      </td>

                      <td>
                        {formatTime(day?.dhuhr)}
                      </td>

                      <td>
                        {formatTime(day?.asr)}
                      </td>

                      <td>
                        {formatTime(day?.maghrib)}
                      </td>

                      <td>
                        {formatTime(day?.isha)}
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