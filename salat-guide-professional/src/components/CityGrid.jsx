import CityCard from "./CityCard.jsx";
import "./CityGrid.css";

function CityGrid({ cities }) {
  if (cities.length === 0) {
    return <p className="city-grid__empty">No cities match your search.</p>;
  }

  return (
    <div className="city-grid">
      {cities.map((city) => (
        <CityCard key={`${city.name}-${city.country}`} name={city.name} country={city.country} />
      ))}
    </div>
  );
}

export default CityGrid;
