import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import LocationSearch from "../components/LocationSearch.jsx";
import PrayerTimesCard from "../components/PrayerTimesCard.jsx";
import MonthlyCalendar from "../components/MonthlyCalendar.jsx";
import { useCityContext } from "../context/LocationContext.jsx";
import usePrayerTimes from "../hooks/usePrayerTimes.js";
import "./PrayerTimes.css";

function PrayerTimes() {
  const { city, country, selectCity, useMyLocation, locateStatus, locateError } = useCityContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // A city card elsewhere in the site can deep-link here with
  // ?city=&country= — adopt it once, then clear the URL params so the
  // shared context (and localStorage) becomes the single source of truth.
  useEffect(() => {
    const paramCity = searchParams.get("city");
    const paramCountry = searchParams.get("country");
    if (paramCity && paramCountry) {
      selectCity(paramCity, paramCountry);
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { prayers, status, errorMessage, hijriDate, methodName, isFallback } = usePrayerTimes(
    city,
    country
  );

  return (
    <div className="page prayer-times-page">
      <Seo
        title="Prayer Times"
        description="Today's Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times, the current and next prayer, and a full monthly prayer calendar."
      />

      <div className="container">
        <div className="section-heading section-heading--left">
          <span className="section-eyebrow">Today's schedule</span>
          <h2>Prayer Times</h2>
          <p>Search any city to see today's timings and the full month ahead.</p>
        </div>

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

        <div className="prayer-times-page__calendar">
          <MonthlyCalendar city={city} country={country} />
        </div>
      </div>
    </div>
  );
}

export default PrayerTimes;
