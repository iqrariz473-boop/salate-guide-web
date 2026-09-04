import { useState } from "react";
import { SearchIcon, LocateIcon, CloseIcon } from "./Icons.jsx";
import "./LocationSearch.css";

/**
 * City/country search used on the Home hero and Prayer Times page.
 * Calls onSearch(city, country) on submit and onLocate() for
 * "Use My Location". Shows its own validation + locate error state.
 */
function LocationSearch({ city, country, onSearch, onLocate, locateStatus, locateError }) {
  const [cityInput, setCityInput] = useState(city);
  const [countryInput, setCountryInput] = useState(country);
  const [formError, setFormError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!cityInput.trim()) {
      setFormError("Please enter a city to search.");
      return;
    }
    setFormError("");
    onSearch(cityInput.trim(), countryInput.trim() || country);
  }

  function handleClear() {
    setCityInput("");
    setCountryInput("");
    setFormError("");
  }

  return (
    <form className="location-search" onSubmit={handleSubmit} role="search">
      <div className="location-search__fields">
        <div className="location-search__field">
          <SearchIcon className="location-search__icon" aria-hidden="true" />
          <label htmlFor="city-search" className="visually-hidden">
            City
          </label>
          <input
            id="city-search"
            type="text"
            value={cityInput}
            onChange={(event) => setCityInput(event.target.value)}
            placeholder="City, e.g. Lahore"
          />
        </div>

        <div className="location-search__field">
          <label htmlFor="country-search" className="visually-hidden">
            Country
          </label>
          <input
            id="country-search"
            type="text"
            value={countryInput}
            onChange={(event) => setCountryInput(event.target.value)}
            placeholder="Country (optional)"
          />
        </div>
      </div>

      <div className="location-search__actions">
        <button type="submit" className="btn btn-primary btn-sm">
          Find Prayer Times
        </button>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={onLocate}
          disabled={locateStatus === "loading"}
        >
          <LocateIcon width={16} height={16} />
          {locateStatus === "loading" ? "Locating..." : "Use My Location"}
        </button>
      </div>

      {formError && <p className="location-search__error">{formError}</p>}
      {locateStatus === "error" && locateError && (
        <p className="location-search__error">{locateError}</p>
      )}
    </form>
  );
}

export default LocationSearch;
