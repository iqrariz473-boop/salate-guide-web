import { useEffect, useRef, useState } from "react";

import { SearchIcon, LocateIcon, CloseIcon } from "./Icons.jsx";

import { searchCities } from "../services/cityApi.js";

import "./LocationSearch.css";

// =========================================================
// CONSTANTS
// =========================================================

const DEBOUNCE_DELAY = 450;

const MIN_SEARCH_LENGTH = 2;

const MAX_RESULTS = 8;

// =========================================================
// HELPERS
// =========================================================

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function formatLocation(city, country) {
  const cleanCity = String(city || "").trim();

  const cleanCountry = String(country || "").trim();

  if (!cleanCity) {
    return "";
  }

  if (!cleanCountry) {
    return cleanCity;
  }

  return `${cleanCity}, ${cleanCountry}`;
}

function getCityQuery(value) {
  return String(value || "")
    .split(",")[0]
    .trim();
}

// =========================================================
// COMPONENT
// =========================================================

function LocationSearch({
  city,
  country,
  onSearch,
  onLocate,
  locateStatus,
  locateError,
}) {
  // =======================================================
  // INPUT
  // =======================================================

  const [searchInput, setSearchInput] = useState(formatLocation(city, country));

  // =======================================================
  // SEARCH STATE
  // =======================================================

  const [cities, setCities] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);

  const [searchError, setSearchError] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const [formError, setFormError] = useState("");

  // =======================================================
  // REFS
  // =======================================================

  const inputRef = useRef(null);

  const abortControllerRef = useRef(null);

  const requestIdRef = useRef(0);

  /*
    Ye sabse important ref hai.

    false:
    Context/selected city se input update hua.

    true:
    User ne khud type kiya.
  */

  const userTypingRef = useRef(false);

  // =======================================================
  // SYNC WITH SELECTED CITY
  // =======================================================

  useEffect(() => {
    const formatted = formatLocation(city, country);

    /*
      Parent/context se city aayi hai.

      Isko user typing nahi samjhenge.
    */

    userTypingRef.current = false;

    /*
      Active search cancel.
    */

    abortControllerRef.current?.abort();

    requestIdRef.current += 1;

    /*
      Input update.
    */

    setSearchInput(formatted);

    /*
      IMPORTANT:

      Page change ya selected city par
      dropdown automatically open nahi hoga.
    */

    setShowSuggestions(false);

    setSearchLoading(false);

    setSearchError("");

    setFormError("");

    setActiveIndex(-1);
  }, [city, country]);

  // =======================================================
  // SEARCH EFFECT
  // =======================================================

  useEffect(() => {
    /*
      Agar user ne type nahi kiya
      to API search bilkul nahi hogi.
    */

    if (!userTypingRef.current) {
      return;
    }

    const rawValue = searchInput.trim();

    const query = getCityQuery(rawValue);

    // -----------------------------------------------------
    // EMPTY
    // -----------------------------------------------------

    if (!rawValue) {
      abortControllerRef.current?.abort();

      requestIdRef.current += 1;

      setCities([]);

      setSearchLoading(false);

      setSearchError("");

      setShowSuggestions(false);

      setActiveIndex(-1);

      return;
    }

    // -----------------------------------------------------
    // SHORT QUERY
    // -----------------------------------------------------

    if (query.length < MIN_SEARCH_LENGTH) {
      abortControllerRef.current?.abort();

      requestIdRef.current += 1;

      setCities([]);

      setSearchLoading(false);

      setSearchError("");

      setActiveIndex(-1);

      /*
        Dropdown open rahega taake user ko
        "Type at least 2 characters" message mile.
      */

      setShowSuggestions(true);

      return;
    }

    // -----------------------------------------------------
    // DEBOUNCE
    // -----------------------------------------------------

    const timer = setTimeout(async () => {
      /*
            Previous request cancel.
          */

      abortControllerRef.current?.abort();

      /*
            New controller.
          */

      const controller = new AbortController();

      abortControllerRef.current = controller;

      /*
            Request ID.
          */

      const requestId = ++requestIdRef.current;

      setSearchLoading(true);

      setSearchError("");

      setShowSuggestions(true);

      setActiveIndex(-1);

      try {
        const results = await searchCities(query, {
          signal: controller.signal,
        });

        /*
              Old request ignore.
            */

        if (requestId !== requestIdRef.current) {
          return;
        }

        /*
              Aborted request ignore.
            */

        if (controller.signal.aborted) {
          return;
        }

        /*
              Limit results.
            */

        const safeResults = Array.isArray(results)
          ? results.filter((item) => item?.city).slice(0, MAX_RESULTS)
          : [];

        setCities(safeResults);

        setActiveIndex(-1);
      } catch (error) {
        /*
              Abort is normal.
            */

        if (error?.name === "AbortError" || controller.signal.aborted) {
          return;
        }

        /*
              Old request ignore.
            */

        if (requestId !== requestIdRef.current) {
          return;
        }

        console.error("City search error:", error);

        setCities([]);

        setSearchError(
          error?.message || "Unable to search cities. Please try again.",
        );
      } finally {
        /*
              Only latest request
              changes loading.
            */

        if (requestId === requestIdRef.current) {
          setSearchLoading(false);
        }
      }
    }, DEBOUNCE_DELAY);

    // -----------------------------------------------------
    // CLEANUP
    // -----------------------------------------------------

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  // =======================================================
  // UNMOUNT CLEANUP
  // =======================================================

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();

      requestIdRef.current += 1;
    };
  }, []);

  // =======================================================
  // INPUT CHANGE
  // =======================================================

  function handleChange(event) {
    const value = event.target.value;

    /*
      Ab user manually type kar raha hai.
    */

    userTypingRef.current = true;

    setSearchInput(value);

    setFormError("");

    setSearchError("");

    setActiveIndex(-1);

    /*
      User ne clear kar diya.
    */

    if (!value.trim()) {
      abortControllerRef.current?.abort();

      requestIdRef.current += 1;

      setCities([]);

      setShowSuggestions(false);

      setSearchLoading(false);

      return;
    }

    /*
      User typing ke waqt dropdown open.
    */

    setShowSuggestions(true);
  }

  // =======================================================
  // SELECT CITY
  // =======================================================

  function handleCitySelect(selectedCity) {
    if (!selectedCity) {
      return;
    }

    const selectedCityName = selectedCity.city?.trim() || "";

    const selectedCountryName = selectedCity.country?.trim() || "";

    if (!selectedCityName) {
      return;
    }

    /*
      Ab selected value ko
      user typing nahi samjhenge.
    */

    userTypingRef.current = false;

    /*
      Active request cancel.
    */

    abortControllerRef.current?.abort();

    requestIdRef.current += 1;

    /*
      Input update.
    */

    const selectedLocation = formatLocation(
      selectedCityName,
      selectedCountryName,
    );

    setSearchInput(selectedLocation);

    /*
      Suggestions close.
    */

    setCities([]);

    setSearchLoading(false);

    setSearchError("");

    setFormError("");

    setShowSuggestions(false);

    setActiveIndex(-1);

    /*
      Parent/context update.
    */

    onSearch?.(selectedCityName, selectedCountryName);
  }

  // =======================================================
  // SUBMIT
  // =======================================================

  function handleSubmit(event) {
    event.preventDefault();

    const cleanValue = searchInput.trim();

    // -----------------------------------------------------
    // EMPTY
    // -----------------------------------------------------

    if (!cleanValue) {
      setFormError("Please enter a city.");

      inputRef.current?.focus();

      return;
    }

    // -----------------------------------------------------
    // LOADING
    // -----------------------------------------------------

    if (searchLoading) {
      return;
    }

    // -----------------------------------------------------
    // RESULTS
    // -----------------------------------------------------

    if (cities.length > 0) {
      const typedCity = normalize(getCityQuery(cleanValue));

      const typedCountry = normalize(cleanValue.split(",").slice(1).join(","));

      /*
        Exact city + country match.
      */

      let match = cities.find((item) => {
        const itemCity = normalize(item.city);

        const itemCountry = normalize(item.country);

        return (
          itemCity === typedCity &&
          (!typedCountry || itemCountry === typedCountry)
        );
      });

      /*
        Exact match na mile
        to first result.
      */

      if (!match) {
        match = cities[0];
      }

      handleCitySelect(match);

      return;
    }

    // -----------------------------------------------------
    // ERROR
    // -----------------------------------------------------

    if (searchError) {
      setFormError(searchError);

      return;
    }

    // -----------------------------------------------------
    // NO RESULTS
    // -----------------------------------------------------

    setFormError("Please select a city from the suggestions.");
  }

  // =======================================================
  // KEYBOARD
  // =======================================================

  function handleKeyDown(event) {
    // -----------------------------------------------------
    // ARROW DOWN
    // -----------------------------------------------------

    if (event.key === "ArrowDown" && cities.length > 0) {
      event.preventDefault();

      setShowSuggestions(true);

      setActiveIndex((current) => {
        if (current >= cities.length - 1) {
          return 0;
        }

        return current + 1;
      });

      return;
    }

    // -----------------------------------------------------
    // ARROW UP
    // -----------------------------------------------------

    if (event.key === "ArrowUp" && cities.length > 0) {
      event.preventDefault();

      setActiveIndex((current) => {
        if (current <= 0) {
          return cities.length - 1;
        }

        return current - 1;
      });

      return;
    }

    // -----------------------------------------------------
    // ENTER
    // -----------------------------------------------------

    if (event.key === "Enter" && activeIndex >= 0 && cities[activeIndex]) {
      event.preventDefault();

      handleCitySelect(cities[activeIndex]);

      return;
    }

    // -----------------------------------------------------
    // ESCAPE
    // -----------------------------------------------------

    if (event.key === "Escape") {
      setShowSuggestions(false);

      setActiveIndex(-1);

      inputRef.current?.blur();
    }
  }

  // =======================================================
  // CLEAR
  // =======================================================

  function handleClear() {
    userTypingRef.current = true;

    abortControllerRef.current?.abort();

    requestIdRef.current += 1;

    setSearchInput("");

    setCities([]);

    setSearchError("");

    setFormError("");

    setShowSuggestions(false);

    setSearchLoading(false);

    setActiveIndex(-1);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  // =======================================================
  // FOCUS
  // =======================================================

  function handleFocus() {
    /*
      Focus par API hit nahi hogi.

      Sirf existing results hon to
      suggestions show hongi.
    */

    if (cities.length > 0) {
      setShowSuggestions(true);

      return;
    }

    /*
      Agar user ne 1 character type kiya
      hua hai to message show hoga.
    */

    if (userTypingRef.current && searchInput.trim()) {
      setShowSuggestions(true);
    }
  }

  // =======================================================
  // BLUR
  // =======================================================

  function handleBlur() {
    /*
      Immediately close nahi kar rahe,
      taake suggestion button ka onClick
      execute ho sake.
    */

    setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        setShowSuggestions(false);

        setActiveIndex(-1);
      }
    }, 150);
  }

  // =======================================================
  // DERIVED VALUES
  // =======================================================

  const query = getCityQuery(searchInput);

  const isShortQuery = query.length < MIN_SEARCH_LENGTH;

  const shouldShowSuggestions =
    showSuggestions && searchInput.trim().length > 0;

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <form className="location-search" onSubmit={handleSubmit} role="search">
      {/* ===================================================
          SEARCH BOX
      =================================================== */}

      <div className="location-search__box">
        <div className="location-search__input-wrap">
          <SearchIcon
            className="location-search__search-icon"
            aria-hidden="true"
          />

          <label htmlFor="city-location-search" className="visually-hidden">
            Search for a city
          </label>

          <input
            ref={inputRef}
            id="city-location-search"
            type="text"
            value={searchInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search city..."
            autoComplete="off"
            spellCheck="false"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={shouldShowSuggestions}
            aria-controls="city-search-results"
            aria-activedescendant={
              activeIndex >= 0 ? `city-option-${activeIndex}` : undefined
            }
          />

          {/* =============================================
              LOADER
          ============================================= */}

          {searchLoading && (
            <span
              className="location-search__loader"
              aria-label="Searching cities"
              role="status"
            />
          )}

          {/* =============================================
              CLEAR
          ============================================= */}

          {!searchLoading && searchInput && (
            <button
              type="button"
              className="location-search__clear"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <CloseIcon width={16} height={16} />
            </button>
          )}
        </div>

        {/* =================================================
            LOCATION
        ================================================= */}

        <button
          type="button"
          className="location-search__locate"
          onClick={onLocate}
          disabled={locateStatus === "loading"}
          aria-label="Use my location"
          title="Use my location"
        >
          <LocateIcon width={21} height={21} />

          <span>
            {locateStatus === "loading" ? "Locating..." : "Use location"}
          </span>
        </button>
      </div>

      {/* ===================================================
          SUGGESTIONS
      =================================================== */}

      {shouldShowSuggestions && (
        <div
          id="city-search-results"
          className="location-search__suggestions"
          role="listbox"
        >
          {/* ===============================================
              SHORT QUERY
          =============================================== */}

          {isShortQuery && (
            <div className="location-search__message">
              Type at least {MIN_SEARCH_LENGTH} characters to search.
            </div>
          )}

          {/* ===============================================
              LOADING
          =============================================== */}

          {!isShortQuery && searchLoading && (
            <div className="location-search__message">Searching cities...</div>
          )}

          {/* ===============================================
              ERROR
          =============================================== */}

          {!isShortQuery && !searchLoading && searchError && (
            <div
              className="location-search__message location-search__message--error"
              role="alert"
            >
              {searchError}
            </div>
          )}

          {/* ===============================================
              NO RESULTS
          =============================================== */}

          {!isShortQuery &&
            !searchLoading &&
            !searchError &&
            cities.length === 0 && (
              <div className="location-search__message">No cities found.</div>
            )}

          {/* ===============================================
              RESULTS
          =============================================== */}

          {!searchLoading && !searchError && cities.length > 0 && (
            <div className="location-search__results">
              {/* HEADER */}

              <div className="location-search__results-header">
                <span>Cities</span>

                <small>{cities.length} found</small>
              </div>

              {/* CITY LIST */}

              {cities.map((item, index) => {
                const itemCity = item.city?.trim() || "";

                const itemCountry = item.country?.trim() || "";

                return (
                  <button
                    key={item.id ?? `${itemCity}-${itemCountry}-${index}`}
                    id={`city-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={activeIndex === index}
                    className={`location-search__suggestion ${
                      activeIndex === index
                        ? "location-search__suggestion--active"
                        : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleCitySelect(item)}
                  >
                    <span className="location-search__city-badge">CITY</span>

                    <span className="location-search__suggestion-info">
                      <strong>{itemCity}</strong>

                      <small>{itemCountry}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================================================
          FORM ERROR
      =================================================== */}

      {formError && (
        <p className="location-search__error" role="alert">
          {formError}
        </p>
      )}

      {/* ===================================================
          LOCATION ERROR
      =================================================== */}

      {locateStatus === "error" && locateError && (
        <p className="location-search__error" role="alert">
          {locateError}
        </p>
      )}
    </form>
  );
}

export default LocationSearch;
