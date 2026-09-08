import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Seo from "../components/Seo.jsx";
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
  } = useCityContext();

  const [searchParams, setSearchParams] =
    useSearchParams();

  /* =========================================================
     LIVE CURRENT TIME
     Used for Current & Next Prayer calculation
  ========================================================= */

  const [currentDateTime, setCurrentDateTime] =
    useState(new Date());

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
      selectCity(
        paramCity,
        paramCountry
      );

      setSearchParams(
        {},
        { replace: true }
      );
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
  } = usePrayerTimes(
    city,
    country
  );

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

    const cleanTime =
      String(time).split(" ")[0];

    const parts =
      cleanTime.split(":");

    if (parts.length < 2) {
      return null;
    }

    const hours =
      Number(parts[0]);

    const minutes =
      Number(parts[1]);

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      return null;
    }

    const date =
      new Date(currentDateTime);

    date.setHours(
      hours,
      minutes,
      0,
      0
    );

    return date;
  };

  /* =========================================================
     VALID PRAYERS
  ========================================================= */

  const validPrayers =
    prayerList.filter(
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
    const now =
      currentDateTime;

    /* -------------------------------------------------------
       FIND NEXT PRAYER
    ------------------------------------------------------- */

    for (
      let i = 0;
      i < validPrayers.length;
      i++
    ) {
      const prayerDate =
        getPrayerDate(
          validPrayers[i].time
        );

      if (
        prayerDate &&
        prayerDate > now
      ) {
        nextPrayer =
          validPrayers[i].name;

        nextPrayerTime =
          validPrayers[i].time;

        /* -----------------------------------------------
           CURRENT PRAYER
        ----------------------------------------------- */

        if (i > 0) {
          currentPrayer =
            validPrayers[i - 1].name;

          currentPrayerTime =
            validPrayers[i - 1].time;
        }

        break;
      }
    }

    /* =======================================================
       AFTER ISHA
       Current = Isha
       Next = Tomorrow's Fajr
    ======================================================= */

    if (!nextPrayer) {
      const lastPrayer =
        validPrayers[
          validPrayers.length - 1
        ];

      currentPrayer =
        lastPrayer.name;

      currentPrayerTime =
        lastPrayer.time;

      nextPrayer = "Fajr";

      nextPrayerTime =
        validPrayers[0].time;
    }

    /* =======================================================
       BEFORE FAJR
       Current = Isha
       Next = Fajr
    ======================================================= */

    if (!currentPrayer) {
      currentPrayer = "Isha";

      currentPrayerTime =
        validPrayers[
          validPrayers.length - 1
        ].time;
    }
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="page prayer-times-page">

      {/* =====================================================
          SEO
      ===================================================== */}

      <Seo
        title="Prayer Times"
        description="Today's Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times for your city."
      />


      <div className="container">

        {/* ===================================================
            PAGE HEADING
        =================================================== */}

        <div className="section-heading section-heading--left">

          <span className="section-eyebrow">
            Daily Worship Schedule
          </span>

          <h1>
            Today’s Prayer Times
          </h1>

          <p>
            View accurate Fajr, Dhuhr, Asr,
            Maghrib, and Isha timings for your city.
          </p>

        </div>


        {/* ===================================================
            TODAY'S PRAYER TIMES
        =================================================== */}

        <PrayerTimesCard
          city={city}
          country={country}

          status={status}
          errorMessage={errorMessage}

          prayers={prayers}

          hijriDate={hijriDate}
          methodName={methodName}
          isFallback={isFallback}

          /* -----------------------------------------------
             CURRENT PRAYER
          ----------------------------------------------- */

          currentPrayer={currentPrayer}
          currentPrayerTime={currentPrayerTime}

          /* -----------------------------------------------
             NEXT PRAYER
          ----------------------------------------------- */

          nextPrayer={nextPrayer}
          nextPrayerTime={nextPrayerTime}

          /* -----------------------------------------------
             RETRY
          ----------------------------------------------- */

          onRetry={() =>
            selectCity(
              city,
              country
            )
          }
        />


        {/* ===================================================
            MONTHLY CALENDAR
        =================================================== */}

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