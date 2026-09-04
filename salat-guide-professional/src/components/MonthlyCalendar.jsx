import { useEffect, useState } from "react";
import { getMonthlyPrayerTimes } from "../services/prayerService.js";
import { formatMonthYear } from "../utils/dateUtils.js";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./Icons.jsx";
import Loading from "./Loading.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import "./MonthlyCalendar.css";

const now = new Date();

/* =========================================
   FORMAT TIME
========================================= */

function formatTime(time) {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  const hour = Number(hours);

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minutes} ${period}`;
}


/* =========================================
   MONTHLY CALENDAR
========================================= */

function MonthlyCalendar({ city, country }) {
  const [month, setMonth] = useState(
    now.getMonth() + 1
  );

  const [year, setYear] = useState(
    now.getFullYear()
  );

  const [days, setDays] = useState([]);

  const [status, setStatus] = useState("loading");

  const [errorMessage, setErrorMessage] =
    useState("");


  /* =========================================
     LOAD MONTHLY PRAYER TIMES
  ========================================== */

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

        setDays(result);
        setStatus("success");
      } catch (error) {
        if (isCancelled) return;

        setErrorMessage(
          error.message ||
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
  ========================================== */

  function goToPreviousMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }


  /* =========================================
     NEXT MONTH
  ========================================== */

  function goToNextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }


  return (
    <section className="monthly-calendar">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="monthly-calendar__header">

        <div className="monthly-calendar__title">
          <span className="monthly-calendar__icon">
            ☾
          </span>

          <div>
            <h3>
              Monthly Prayer Calendar
            </h3>

            <p>
              Prayer timings for {city}, {country}
            </p>
          </div>
        </div>


        {/* ===================================
            MONTH NAVIGATION
        ==================================== */}

        <div className="monthly-calendar__nav">

          <button
            type="button"
            className="btn"
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
            className="btn"
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
          LOADING
      ====================================== */}

      {status === "loading" && (
        <div className="monthly-calendar__state">
          <Loading label="Loading monthly calendar..." />
        </div>
      )}


      {/* =====================================
          ERROR
      ====================================== */}

      {status === "error" && (
        <div className="monthly-calendar__state">
          <ErrorMessage
            message={errorMessage}
          />
        </div>
      )}


      {/* =====================================
          EMPTY
      ====================================== */}

      {status === "success" &&
        days.length === 0 && (
          <div className="monthly-calendar__state">
            <ErrorMessage
              message={
                "No prayer times available for this month."
              }
            />
          </div>
        )}


      {/* =====================================
          CALENDAR
      ====================================== */}

      {status === "success" &&
        days.length > 0 && (

          <div className="monthly-calendar__table-wrapper">

            <div className="monthly-calendar__scroll">

              <table
                className="
                  table
                  monthly-calendar__table
                  align-middle
                "
              >

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

                  {days.map((day) => (
                    <tr key={day.date}>

                      <td className="monthly-calendar__date">
                        {day.date}
                      </td>

                      <td>
                        {formatTime(day.fajr)}
                      </td>

                      <td>
                        {formatTime(day.sunrise)}
                      </td>

                      <td>
                        {formatTime(day.dhuhr)}
                      </td>

                      <td>
                        {formatTime(day.asr)}
                      </td>

                      <td>
                        {formatTime(day.maghrib)}
                      </td>

                      <td>
                        {formatTime(day.isha)}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

    </section>
  );
}

export default MonthlyCalendar;
