import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Seo from "../components/Seo.jsx";
import LocationSearch from "../components/LocationSearch.jsx";
import PrayerTimesCard from "../components/PrayerTimesCard.jsx";
import MonthlyCalendar from "../components/MonthlyCalendar.jsx";

import { useCityContext } from "../context/LocationContext.jsx";
import usePrayerTimes from "../hooks/usePrayerTimes.js";

import "./PrayerTimes.css";

function PrayerTimes() {
  const {
    city,
    country,
    selectCity,
    useMyLocation,
    locateStatus,
    locateError,
  } = useCityContext();

  const [searchParams, setSearchParams] = useSearchParams();

  /* =========================================================
     LIVE CURRENT DATE & TIME
  ========================================================= */

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* =========================================================
     URL CITY PARAMETERS
  ========================================================= */

  useEffect(() => {
    const paramCity = searchParams.get("city");
    const paramCountry = searchParams.get("country");

    if (paramCity && paramCountry) {
      selectCity(paramCity, paramCountry);
      setSearchParams({}, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     PRAYER TIMES
  ========================================================= */

  const {
    prayers,
    status,
    errorMessage,
    hijriDate,
    methodName,
    isFallback,
  } = usePrayerTimes(city, country);

  /* =========================================================
     FORMAT CURRENT TIME
  ========================================================= */

  const currentTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  /* =========================================================
     CURRENT DATE
  ========================================================= */

  const currentDate = currentDateTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* =========================================================
     CURRENT DAY
  ========================================================= */

  const currentDay = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
  });

  /* =========================================================
     PRAYER LIST
  ========================================================= */

  const prayerList = [
    {
      name: "Fajr",
      time: prayers?.Fajr,
    },
    {
      name: "Dhuhr",
      time: prayers?.Dhuhr,
    },
    {
      name: "Asr",
      time: prayers?.Asr,
    },
    {
      name: "Maghrib",
      time: prayers?.Maghrib,
    },
    {
      name: "Isha",
      time: prayers?.Isha,
    },
  ];

  /* =========================================================
     CONVERT PRAYER TIME TO DATE
  ========================================================= */

  const getPrayerDate = (time) => {
    if (!time) return null;

    const cleanTime = String(time).split(" ")[0];

    const parts = cleanTime.split(":");

    if (parts.length < 2) return null;

    let hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }

    const date = new Date(currentDateTime);

    date.setHours(hours, minutes, 0, 0);

    return date;
  };

  /* =========================================================
     VALID PRAYERS
  ========================================================= */

  const validPrayers = prayerList.filter(
    (prayer) => prayer.time
  );

  /* =========================================================
     CURRENT & NEXT PRAYER
  ========================================================= */

  let currentPrayer = null;
  let currentPrayerTime = null;

  let nextPrayer = null;
  let nextPrayerTime = null;

  if (validPrayers.length > 0) {
    const now = currentDateTime;

    for (let i = 0; i < validPrayers.length; i++) {
      const prayerDate = getPrayerDate(
        validPrayers[i].time
      );

      if (prayerDate && prayerDate > now) {
        nextPrayer = validPrayers[i].name;
        nextPrayerTime = validPrayers[i].time;

        if (i > 0) {
          currentPrayer = validPrayers[i - 1].name;
          currentPrayerTime = validPrayers[i - 1].time;
        }

        break;
      }
    }

    /* =======================================================
       AFTER ISHA
    ======================================================= */

    if (!nextPrayer && validPrayers.length > 0) {
      const lastPrayer =
        validPrayers[validPrayers.length - 1];

      currentPrayer = lastPrayer.name;
      currentPrayerTime = lastPrayer.time;

      nextPrayer = "Fajr";
      nextPrayerTime = validPrayers[0].time;
    }

    /* =======================================================
       BEFORE FAJR
    ======================================================= */

    if (!currentPrayer && validPrayers.length > 0) {
      currentPrayer = "Isha";
      currentPrayerTime =
        validPrayers[validPrayers.length - 1].time;
    }
  }

  return (
    <div className="page prayer-times-page">
      <Seo
        title="Prayer Times"
        description="Today's Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times, the current and next prayer, and a full monthly prayer calendar."
      />

      <div className="container">

        {/* =====================================================
            PAGE HEADING
        ===================================================== */}

        <div className="section-heading section-heading--left">
          <span className="section-eyebrow">
            Today's schedule
          </span>

          <h2>Prayer Times</h2>

          <p>
            Search any city to see today's prayer timings
            and the full month ahead.
          </p>
        </div>

        {/* =====================================================
            UNIQUE PRAYER STATUS
        ===================================================== */}

        <div className="prayer-status">

          {/* Current Time */}

          <div className="prayer-status__clock">
            <span className="prayer-status__moon">
              ☾
            </span>

            <div>
              <span className="prayer-status__label">
                Local Time
              </span>

              <strong>
                {currentTime}
              </strong>

              <small>
                {currentDay}
              </small>
            </div>
          </div>

          {/* Current Prayer */}

          <div className="prayer-status__current">
            <span className="prayer-status__mosque">
              🕌
            </span>

            <div>
              <span className="prayer-status__label">
                Current Prayer
              </span>

              <strong>
                {currentPrayer || "Prayer Time"}
              </strong>

              {currentPrayerTime && (
                <small>
                  Started at {currentPrayerTime}
                </small>
              )}
            </div>
          </div>

          {/* Next Prayer */}

          <div className="prayer-status__next">
            <div>
              <span className="prayer-status__label">
                Up Next
              </span>

              <strong>
                {nextPrayer || "Next Prayer"}
              </strong>

              {nextPrayerTime && (
                <small>
                  at {nextPrayerTime}
                </small>
              )}
            </div>

            <span className="prayer-status__arrow">
              →
            </span>
          </div>

        </div>

        {/* =====================================================
            CURRENT DATE
        ===================================================== */}

        <div className="prayer-date-line">
          <span>Today</span>

          <strong>
            {currentDate}
          </strong>

          {city && (
            <>
              <span className="prayer-date-line__dot">
                •
              </span>

              <span>
                {city}
                {country ? `, ${country}` : ""}
              </span>
            </>
          )}
        </div>

        {/* =====================================================
            LOCATION SEARCH
        ===================================================== */}

        <div className="prayer-times-page__search">
          <LocationSearch
            city={city}
            country={country}
            onSearch={selectCity}
            onLocate={useMyLocation}
            locateStatus={locateStatus}
            locateError={locateError}
          />
        </div>

        {/* =====================================================
            TODAY'S PRAYER TIMES
        ===================================================== */}

        <PrayerTimesCard
          city={city}
          country={country}
          status={status}
          errorMessage={errorMessage}
          prayers={prayers}
          hijriDate={hijriDate}
          methodName={methodName}
          isFallback={isFallback}
          onRetry={() => selectCity(city, country)}
        />

        {/* =====================================================
            MONTHLY CALENDAR
        ===================================================== */}

        <div className="prayer-times-page__calendar">
          <MonthlyCalendar
            city={city}
            country={country}
          />
        </div>

      </div>
    </div>
  );
}

export default PrayerTimes;