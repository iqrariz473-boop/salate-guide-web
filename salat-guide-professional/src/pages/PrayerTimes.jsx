import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Seo from "../components/Seo.jsx";
import PrayerTimesCard from "../components/PrayerTimesCard.jsx";
import MonthlyCalendar from "../components/MonthlyCalendar.jsx";
import LocationSearch from "../components/LocationSearch.jsx";

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

  const [searchParams, setSearchParams] =
    useSearchParams();

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

      {/* =====================================================
          TODAY'S PRAYER TIMES
      ===================================================== */}

      <section className="section home-prayer-section">

        <div className="container">

          {/* =================================================
              HEADING + SEARCH
          ================================================= */}

          <div className="prayer-heading-row">

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


            {/* =================================================
                SAME SEARCH BAR
            ================================================= */}

            <div className="prayer-heading-search">

              <LocationSearch
                city={city}
                country={country}

                onSearch={(
                  selectedCity,
                  selectedCountry
                ) => {
                  selectCity(
                    selectedCity,
                    selectedCountry
                  );
                }}

                onLocate={useMyLocation}

                locateStatus={locateStatus}

                locateError={locateError}
              />

            </div>

          </div>


          {/* =================================================
              TODAY'S PRAYER CARD
          ================================================= */}

          <PrayerTimesCard
            city={city}
            country={country}
            status={status}
            errorMessage={errorMessage}
            prayers={prayers}
            hijriDate={hijriDate}
            methodName={methodName}
            isFallback={isFallback}

            onRetry={() => {
              if (!city || !country) return;

              selectCity(
                city,
                country
              );
            }}
          />


          {/* =================================================
              MONTHLY PRAYER CALENDAR
          ================================================= */}

          <section className="calendar-section">

            <MonthlyCalendar
              city={city}
              country={country}
            />

          </section>


          {/* =================================================
              MORE LINK
          ================================================= */}

          <div className="home__more-link">

            <Link
              to="/prayer-times"
              className="btn-link"
              aria-label="View full prayer times"
            >
              View full prayer times

              <span aria-hidden="true">
                →
              </span>

            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PrayerTimes;