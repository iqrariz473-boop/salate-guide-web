import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { getCurrentPosition, reverseGeocode } from "../services/locationService.js";

const DEFAULT_CITY = { city: "Lahore", country: "Pakistan" };

const LocationContext = createContext(null);

/**
 * Holds the site-wide "selected city" — persisted to localStorage so a
 * returning visitor sees their last city again — plus the "Use My
 * Location" flow shared by the Home hero and the Prayer Times page.
 */
export function LocationProvider({ children }) {
  const [selected, setSelected] = useLocalStorage("salat-guide:last-city", DEFAULT_CITY);
  const [locateStatus, setLocateStatus] = useState("idle"); // idle | loading | error
  const [locateError, setLocateError] = useState("");

  function selectCity(city, country) {
    setSelected({ city, country });
    setLocateStatus("idle");
    setLocateError("");
  }

  async function useMyLocation() {
    setLocateStatus("loading");
    setLocateError("");
    try {
      const { latitude, longitude } = await getCurrentPosition();
      const { city, country } = await reverseGeocode(latitude, longitude);
      setSelected({ city, country });
      setLocateStatus("idle");
    } catch (error) {
      setLocateStatus("error");
      setLocateError(error.message || "Unable to determine your location.");
    }
  }

  const value = {
    city: selected.city,
    country: selected.country,
    selectCity,
    useMyLocation,
    locateStatus,
    locateError,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

/** Access the shared selected-city state from any component. */
export function useCityContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useCityContext must be used within a LocationProvider");
  }
  return context;
}
