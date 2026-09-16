import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Seo from "../components/Seo.jsx";
import PrayerTimesCard from "../components/PrayerTimesCard.jsx";
import MonthlyCalendar from "../components/MonthlyCalendar.jsx";
import LocationSearch from "../components/LocationSearch.jsx";

import { useCityContext } from "../context/LocationContext.jsx";
import usePrayerTimes from "../hooks/usePrayerTimes.js";

import "./PrayerTimes.css";

/* =========================================================
   PAKISTAN CITIES
========================================================= */

const PAKISTAN_CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Bahawalpur",
  "Sargodha",
  "Abbottabad",
  "Mardan",
  "Gujrat",
  "Sahiwal",
  "Jhelum",
  "Rahim Yar Khan",
  "Kasur",
  "Sheikhupura",
  "Okara",
  "Wah Cantonment",
  "Mingora",
  "Dera Ghazi Khan",
  "Mirpur",
  "Nawabshah",
  "Larkana",
  "Sukkur",
  "Hyderabad",
  "Muzaffarabad",
  "Gilgit",
  "Skardu",
  "Attock",
  "Bannu",
  "Chakwal",
  "Chiniot",
  "Daska",
  "Haripur",
  "Jhang",
  "Kamoke",
  "Khanewal",
  "Kohat",
  "Lodhran",
  "Mansehra",
  "Mandi Bahauddin",
  "Nowshera",
  "Pakpattan",
  "Swabi",
  "Tando Adam",
  "Vehari",
];

/* =========================================================
   FAQ DATA
========================================================= */

const FAQS = [
  {
    question: "How are today's prayer times calculated?",
    answer:
      "Prayer times are calculated according to the geographical location of your selected city. The calculation uses the position of the sun, latitude, longitude, and the selected calculation method.",
  },
  {
    question: "Why can prayer times be different between cities?",
    answer:
      "Every city has a different geographical position. Sunrise, sunset, solar noon, and other astronomical values therefore change from one location to another.",
  },
  {
    question: "Why can my mosque have slightly different timings?",
    answer:
      "Local mosques may use a different calculation method, additional precautionary minutes, or a different Asr calculation method. Small differences are therefore possible.",
  },
  {
    question: "Can I search for another city?",
    answer:
      "Yes. Use the location search at the top of this page to find another city. Once selected, the prayer schedule will update according to that location.",
  },
  {
    question: "Do prayer times change every day?",
    answer:
      "Yes. Prayer times change throughout the year because the position of the sun changes continuously. This affects Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha.",
  },
  {
    question: "Which Asr method should I use?",
    answer:
      "The Standard method is commonly associated with Shafi'i, Maliki and Hanbali calculations, while the Hanafi method uses a later Asr time. Follow the method normally used by your local mosque or community.",
  },
];

/* =========================================================
   PAGE
========================================================= */

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

  const [openFaq, setOpenFaq] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [visibleCities, setVisibleCities] = useState(24);

  /* =======================================================
     URL CITY
  ======================================================= */

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
        {
          replace: true,
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =======================================================
     PRAYER DATA
  ======================================================= */

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

  /* =======================================================
     CITY FILTER
  ======================================================= */

  const filteredCities =
    PAKISTAN_CITIES.filter((item) =>
      item
        .toLowerCase()
        .includes(
          citySearch.toLowerCase()
        )
    );

  const displayedCities =
    filteredCities.slice(
      0,
      visibleCities
    );

  /* =======================================================
     FAQ
  ======================================================= */

  function toggleFaq(index) {
    setOpenFaq((current) =>
      current === index
        ? null
        : index
    );
  }

  /* =======================================================
     CITY SELECT
  ======================================================= */

  function handleCitySelect(cityName) {
    selectCity(
      cityName,
      "Pakistan"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="page prayer-times-page">

      <Seo
        title="Prayer Times"
        description="Accurate daily prayer times, Islamic date, Qibla direction and prayer information for your city."
      />
{/* =====================================================
    PRAYER TIMES HERO
===================================================== */}

<section className="prayer-times-hero">

  <div
    className="prayer-times-hero__overlay"
    aria-hidden="true"
  />

  <div
    className="prayer-times-hero__glow"
    aria-hidden="true"
  />

  <div className="container prayer-times-hero__inner">

    <div className="prayer-times-hero__content">

      <span className="prayer-times-hero__eyebrow">
        <span></span>
        DAILY WORSHIP SCHEDULE
        <b>✦</b>
      </span>

      <h1>
        Prayer Times
        <br />
        <span>For Your Location</span>
      </h1>

      <div className="prayer-times-hero__divider">
        <i></i>
        <b>✦</b>
        <i></i>
      </div>

      <p>
        Stay connected with your five daily
        prayers. Find accurate Salah timings,
        Islamic dates and prayer information
        for your city.
      </p>

      <div className="prayer-times-hero__badges">

        {/* DAILY TIMES */}
        <div className="prayer-times-hero__badge">

          <span>◷</span>

          <div>
            <strong>
              Daily Times
            </strong>

            <small>
              Updated schedule
            </small>
          </div>

        </div>

        {/* LOCATION */}
        <div className="prayer-times-hero__badge">

          <span>⌖</span>

          <div>
            <strong>
              Your Location
            </strong>

            <small>
              City based timings
            </small>
          </div>

        </div>

        {/* ISLAMIC DATE */}
        <div className="prayer-times-hero__badge">

          <span>☾</span>

          <div>
            <strong>
              Islamic Date
            </strong>

            <small>
              Hijri information
            </small>
          </div>

        </div>

      </div>

    </div>

  </div>

  <div className="prayer-times-hero__bottom"></div>

</section>

      {/* =====================================================
          MAIN PRAYER SECTION
      ===================================================== */}

      <section className="section home-prayer-section">

        <div className="container">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="prayer-heading-row">

            <div className="section-heading">

              <span className="section-eyebrow">
                Daily Worship Schedule
              </span>

              <h2>
                Today’s Prayer Times
              </h2>

              <p>
                Find accurate Salah timings for
                Fajr, Dhuhr, Asr, Maghrib and Isha
                according to your location.
              </p>

            </div>

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
              PRAYER CARD
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
              MONTHLY CALENDAR
          ================================================= */}

          <section className="calendar-section">

            <MonthlyCalendar
              city={city}
              country={country}
            />

          </section>

        </div>

      </section>


      {/* =====================================================
          PRAYER INFORMATION
      ===================================================== */}

      <section className="prayer-details-section">

        <div className="container">

          <div className="prayer-details-header">

            <span className="section-eyebrow">
              Prayer Information
            </span>

            <h2>
              Know Your Prayer Schedule
            </h2>

            <p>
              Important information about your
              location, prayer calculation and
              daily Islamic schedule.
            </p>

          </div>


          {/* =================================================
              CALCULATION
          ================================================= */}

          <div className="prayer-calculation-card">

            <div className="calculation-top">

              <div className="calculation-icon">
                ✦
              </div>

              <div>

                <span className="info-label">
                  Prayer Calculation
                </span>

                <h3>
                  Calculation Method
                </h3>

              </div>

            </div>

            <div className="calculation-content">

              <div className="calculation-method-box">

                <span>
                  Current Method
                </span>

                <strong>
                  {methodName ||
                    "Karachi / University of Islamic Sciences"}
                </strong>

              </div>

              <div className="asr-method-box">

                <span>
                  Asr Calculation
                </span>

                <strong>
                  Standard
                </strong>

              </div>

            </div>

          </div>


          {/* =================================================
              LOCATION INFORMATION
          ================================================= */}

          <div className="prayer-location-grid">

            <div className="prayer-detail-box">

              <span className="detail-icon">
                📍
              </span>

              <div>

                <span>
                  Current Location
                </span>

                <strong>
                  {city || "Lahore"},{" "}
                  {country || "Pakistan"}
                </strong>

              </div>

            </div>


            <div className="prayer-detail-box">

              <span className="detail-icon">
                ◷
              </span>

              <div>

                <span>
                  Timezone
                </span>

                <strong>
                  UTC +05:00
                </strong>

              </div>

            </div>


            <div className="prayer-detail-box">

              <span className="detail-icon">
                N
              </span>

              <div>

                <span>
                  Latitude
                </span>

                <strong>
                  31.5580° N
                </strong>

              </div>

            </div>


            <div className="prayer-detail-box">

              <span className="detail-icon">
                E
              </span>

              <div>

                <span>
                  Longitude
                </span>

                <strong>
                  74.3507° E
                </strong>

              </div>

            </div>

          </div>


          {/* =================================================
              SUN POSITION
          ================================================= */}

          <div className="sun-position-card">

            <div className="sun-position-header">

              <div>

                <span className="info-label">
                  Solar Schedule
                </span>

                <h3>
                  Sun Position
                </h3>

              </div>

              <span className="sun-symbol">
                ☀
              </span>

            </div>


            <div className="sun-position-items">

              <div className="sun-item">

                <span className="sun-item-icon">
                  ◒
                </span>

                <div>

                  <span>
                    Sunrise
                  </span>

                  <strong>
                    05:46 AM
                  </strong>

                </div>

              </div>


              <div className="sun-line" />


              <div className="sun-item">

                <span className="sun-item-icon">
                  ◉
                </span>

                <div>

                  <span>
                    Solar Noon
                  </span>

                  <strong>
                    11:59 AM
                  </strong>

                </div>

              </div>


              <div className="sun-line" />


              <div className="sun-item">

                <span className="sun-item-icon">
                  ◓
                </span>

                <div>

                  <span>
                    Sunset
                  </span>

                  <strong>
                    06:10 PM
                  </strong>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              DATE + QIBLA
          ================================================= */}

          <div className="prayer-extra-grid">

            {/* DATE */}

            <div className="date-information-card">

              <div className="date-card-header">

                <div>

                  <span className="info-label">
                    Islamic Calendar
                  </span>

                  <h3>
                    Today’s Date
                  </h3>

                </div>

                <span className="date-symbol">
                  ☾
                </span>

              </div>


              <div className="islamic-date">

                3 Rabi' al-Thani

                <small>
                  1448 AH
                </small>

              </div>


              <div className="date-details">

                <div>

                  <span>
                    Gregorian
                  </span>

                  <strong>
                    Tuesday, 15 September 2026
                  </strong>

                </div>


                <div>

                  <span>
                    Islamic Month
                  </span>

                  <strong>
                    Rabi' al-Thani
                  </strong>

                </div>


                <div>

                  <span>
                    Days Remaining
                  </span>

                  <strong>
                    27 Days
                  </strong>

                </div>

              </div>

            </div>


            {/* QIBLA */}

            <div className="qibla-information-card">

              <div className="qibla-card-header">

                <div>

                  <span className="info-label">
                    Direction of Prayer
                  </span>

                  <h3>
                    Qibla Direction
                  </h3>

                </div>

                <span className="qibla-symbol">
                  ◈
                </span>

              </div>


              <div className="qibla-content">

                <div className="qibla-compass">

                  <span className="compass-n">
                    N
                  </span>

                  <span className="compass-e">
                    E
                  </span>

                  <span className="compass-s">
                    S
                  </span>

                  <span className="compass-w">
                    W
                  </span>

                  <span className="compass-center">
                    ↑
                  </span>

                </div>


                <div className="qibla-degree">

                  <strong>
                    260°
                  </strong>

                  <span>
                    From North
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PAKISTAN CITIES
      ===================================================== */}

      <section className="pakistan-cities-section">

        <div className="container">

          <div className="pakistan-cities-header">

            <span className="section-eyebrow">
              Explore Pakistan
            </span>

            <h2>
              Prayer Times in Other Cities
            </h2>

            <p>
              Select another Pakistani city to
              quickly view its daily prayer schedule.
            </p>

          </div>


          <div className="city-search-box">

            <span>
              ⌕
            </span>

            <input
              type="search"
              value={citySearch}
              onChange={(event) => {
                setCitySearch(
                  event.target.value
                );

                setVisibleCities(24);
              }}
              placeholder="Search a city..."
              aria-label="Search cities in Pakistan"
            />

            {citySearch && (
              <button
                type="button"
                onClick={() => {
                  setCitySearch("");
                  setVisibleCities(24);
                }}
                aria-label="Clear city search"
              >
                ×
              </button>
            )}

          </div>


          <div className="pakistan-city-grid">

            {displayedCities.map(
              (cityName) => (

                <button
                  key={cityName}
                  type="button"
                  className={
                    cityName.toLowerCase() ===
                    city?.toLowerCase()
                      ? "pakistan-city active"
                      : "pakistan-city"
                  }
                  onClick={() =>
                    handleCitySelect(
                      cityName
                    )
                  }
                >

                  <span className="city-pin">
                    ⌖
                  </span>

                  <span>
                    {cityName}
                  </span>

                  <span className="city-arrow">
                    →
                  </span>

                </button>

              )
            )}

          </div>


          {displayedCities.length === 0 && (

            <div className="city-empty">

              <span>
                ⌕
              </span>

              <h3>
                City not found
              </h3>

              <p>
                Try searching with another city name.
              </p>

            </div>

          )}


          {visibleCities <
            filteredCities.length && (

            <div className="city-load-more">

              <button
                type="button"
                onClick={() =>
                  setVisibleCities(
                    (current) =>
                      current + 12
                  )
                }
              >
                Load More Cities
              </button>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          PRAYER TIPS
      ===================================================== */}

      <section className="prayer-tips-section">

        <div className="container">

          <div className="prayer-tips-header">

            <span className="section-eyebrow">
              Worship Guide
            </span>

            <h2>
              Make Your Salah More Meaningful
            </h2>

            <p>
              Simple reminders to help you build
              consistency around your five daily prayers.
            </p>

          </div>


          <div className="prayer-tips-grid">

            <article className="prayer-tip-card">

              <span className="tip-number">
                01
              </span>

              <div className="tip-icon">
                ◷
              </div>

              <h3>
                Pray on Time
              </h3>

              <p>
                Organize your daily routine around
                the five prayer times and try not
                to delay Salah unnecessarily.
              </p>

            </article>


            <article className="prayer-tip-card">

              <span className="tip-number">
                02
              </span>

              <div className="tip-icon">
                ◈
              </div>

              <h3>
                Find the Qibla
              </h3>

              <p>
                Make sure you are facing the Qibla
                before beginning your prayer,
                especially when travelling.
              </p>

            </article>


            <article className="prayer-tip-card">

              <span className="tip-number">
                03
              </span>

              <div className="tip-icon">
                ✦
              </div>

              <h3>
                Prepare Before Adhan
              </h3>

              <p>
                Keep your prayer space ready and
                make Wudu before the prayer time
                begins whenever possible.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="prayer-faq-section">

        <div className="container">

          <div className="prayer-faq-header">

            <span className="section-eyebrow">
              Help & Guidance
            </span>

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Learn more about prayer calculations,
              locations and daily Salah timings.
            </p>

          </div>


          <div className="prayer-faq-list">

            {FAQS.map(
              (faq, index) => {

                const isOpen =
                  openFaq === index;

                return (
                  <div
                    className={
                      isOpen
                        ? "prayer-faq-item open"
                        : "prayer-faq-item"
                    }
                    key={faq.question}
                  >

                    <button
                      type="button"
                      className="prayer-faq-question"
                      onClick={() =>
                        toggleFaq(index)
                      }
                      aria-expanded={isOpen}
                    >

                      <span className="faq-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span className="faq-question-text">
                        {faq.question}
                      </span>

                      <span className="faq-plus">
                        {isOpen
                          ? "−"
                          : "+"}
                      </span>

                    </button>


                    {isOpen && (

                      <div className="prayer-faq-answer">

                        <p>
                          {faq.answer}
                        </p>

                      </div>

                    )}

                  </div>
                );
              }
            )}

          </div>


          <div className="prayer-faq-note">

            <span>
              ۞
            </span>

            <div>

              <strong>
                Keep Salah at the heart of your day
              </strong>

              <p>
                Use Salat Guide to organize your
                day around prayer and remembrance.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PrayerTimes;