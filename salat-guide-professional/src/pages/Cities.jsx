import { useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";
import CityGrid from "../components/CityGrid.jsx";
import { SearchIcon } from "../components/Icons.jsx";
import cities from "../data/cities.js";
import "./Cities.css";

function Cities() {
  const [query, setQuery] = useState("");

  const filteredCities = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return cities;
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(normalized) ||
        city.country.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <div className="page cities-page">
      <Seo
        title="Cities"
        description="Browse prayer times for popular cities worldwide, including Lahore, Karachi, London, Dubai, Makkah, and more."
      />

      <div className="container">
        <div className="section-heading section-heading--left">
          <span className="section-eyebrow">Browse</span>
          <h2>Cities</h2>
          <p>Find a city below, or use the search on the Prayer Times page for any location.</p>
        </div>

        <div className="cities-page__filter">
          <SearchIcon aria-hidden="true" />
          <label htmlFor="city-filter" className="visually-hidden">
            Filter cities
          </label>
          <input
            id="city-filter"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by city or country..."
          />
        </div>

        <CityGrid cities={filteredCities} />
      </div>
    </div>
  );
}

export default Cities;
