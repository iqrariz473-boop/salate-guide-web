import { useNavigate } from "react-router-dom";
import "./CityCard.css";

function CityCard({ name, country }) {
  const navigate = useNavigate();

  function handleViewTimes() {
    navigate(`/prayer-times?city=${encodeURIComponent(name)}&country=${encodeURIComponent(country)}`);
  }

  return (
    <div className="city-card">
      <div>
        <h3>{name}</h3>
        <p>{country}</p>
      </div>
      <button type="button" className="btn btn-outline btn-sm" onClick={handleViewTimes}>
        View Prayer Times
      </button>
    </div>
  );
}

export default CityCard;
