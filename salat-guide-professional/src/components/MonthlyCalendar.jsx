import { useEffect, useMemo, useState } from "react";

import { getMonthlyPrayerTimes } from "../services/prayerService.js";

import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

import "./MonthlyCalendar.css";


/* =========================================
   CURRENT DATE
========================================= */

function getTodayInfo() {
  const date = new Date();

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(time) {
  if (!time) return "—";

  const value = String(time).trim();

  /*
    Handles:
    05:12
    5:12
    05:12 AM
    17:30
  */

  const amPmMatch = value.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );

  if (amPmMatch) {
    let hour = Number(amPmMatch[1]);

    const minutes = amPmMatch[2];

    const period =
      amPmMatch[3].toUpperCase();

    hour = hour % 12 || 12;

    return `${hour}:${minutes} ${period}`;
  }

  const timeMatch = value.match(
    /^(\d{1,2}):(\d{2})/
  );

  if (!timeMatch) return value;

  const hours = Number(timeMatch[1]);

  const minutes = timeMatch[2];

  const period =
    hours >= 12 ? "PM" : "AM";

  const hour12 =
    hours % 12 || 12;

  return `${hour12}:${minutes} ${period}`;
}


/* =========================================
   NORMALIZE DATE
========================================= */

function normalizeDate(dateValue) {
  if (!dateValue) return "";

  const value =
    String(dateValue).trim();

  /*
    API date examples:
    01
    1
    2026-09-01
    01-09-2026
    01/09/2026
  */

  if (/^\d{1,2}$/.test(value)) {
    return value.padStart(2, "0");
  }

  const parts =
    value.split(/[-/]/);

  if (parts.length === 3) {
    const possibleDay =
      Number(parts[2]);

    /* YYYY-MM-DD */

    if (parts[0].length === 4) {
      return parts[2].padStart(
        2,
        "0"
      );
    }

    /* DD-MM-YYYY */

    if (parts[2].length === 4) {
      return parts[0].padStart(
        2,
        "0"
      );
    }

    /* Fallback */

    if (!Number.isNaN(possibleDay)) {
      return parts[0].padStart(
        2,
        "0"
      );
    }
  }

  return value;
}


/* =========================================
   COMPONENT
========================================= */

function MonthlyCalendar({
  city,
  country,
}) {
  /*
    Current date is used internally only
    for loading the current month and
    highlighting today's row.
  */

  const today = useMemo(
    () => getTodayInfo(),
    []
  );

  /*
    Month navigation has been removed.
    Calendar always loads the current month.
  */

  const month = today.month;
  const year = today.year;

  const [days, setDays] =
    useState([]);

  const [status, setStatus] =
    useState("loading");

  const [errorMessage, setErrorMessage] =
    useState("");


  /* =========================================
     LOAD CURRENT MONTH
  ========================================= */

  useEffect(() => {
    if (!city || !country) return;

    let isCancelled = false;

    async function loadMonth() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const result =
          await getMonthlyPrayerTimes(
            city,
            country,
            month,
            year
          );

        if (isCancelled) return;

        setDays(
          Array.isArray(result)
            ? result
            : []
        );

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
  }, [
    city,
    country,
    month,
    year,
  ]);


  /* =========================================
     CHECK TODAY ROW
  ========================================= */

  function isToday(day) {
    if (
      year !== today.year ||
      month !== today.month
    ) {
      return false;
    }

    const normalizedApiDate =
      normalizeDate(day?.date);

    return (
      normalizedApiDate ===
      String(today.day).padStart(
        2,
        "0"
      )
    );
  }


  /* =========================================
     RENDER
  ========================================= */

  return (
    <section className="monthly-calendar">


      {/* =====================================
          LOADING
      ===================================== */}

      {status === "loading" && (
        <div className="monthly-calendar__state">

          <Loading
            label="Loading monthly calendar..."
          />

        </div>
      )}


      {/* =====================================
          ERROR
      ===================================== */}

      {status === "error" && (
        <div className="monthly-calendar__state">

          <ErrorMessage
            message={errorMessage}
          />

        </div>
      )}


      {/* =====================================
          EMPTY
      ===================================== */}

      {status === "success" &&
        days.length === 0 && (
          <div className="monthly-calendar__state">

            <ErrorMessage
              message="No prayer times available for this month."
            />

          </div>
        )}


      {/* =====================================
          PRAYER TABLE
      ===================================== */}

      {status === "success" &&
        days.length > 0 && (

          <div className="monthly-calendar__table-wrapper">

            <table className="monthly-calendar__table">

              {/* ===========================
                  TABLE HEADER
              =========================== */}

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


              {/* ===========================
                  TABLE BODY
              =========================== */}

              <tbody>

                {days.map(
                  (day, index) => {

                    const todayRow =
                      isToday(day);

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

                        {/* DATE */}

                        <td className="monthly-calendar__date">

                          <span>
                            {day?.date ||
                              "—"}
                          </span>

                          {todayRow && (
                            <small className="monthly-calendar__today-badge">
                              TODAY
                            </small>
                          )}

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
                  }
                )}

              </tbody>

            </table>

          </div>
        )}

    </section>
  );
}


export default MonthlyCalendar;