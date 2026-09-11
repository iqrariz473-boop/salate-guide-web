
import {
  createContext,
  useContext,
  useState,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage.js";

import {
  getCurrentPosition,
  reverseGeocode,
} from "../services/locationService.js";


// =========================================================
// DEFAULT LOCATION
// =========================================================

const DEFAULT_CITY = {
  city: "Lahore",
  country: "Pakistan",
  latitude: 31.558,
  longitude: 74.35071,
};


// =========================================================
// LOCATION CONTEXT
// =========================================================

const LocationContext = createContext(null);


// =========================================================
// LOCATION PROVIDER
// =========================================================

export function LocationProvider({ children }) {

  // -------------------------------------------------------
  // Selected location
  // -------------------------------------------------------

  const [
    selected,
    setSelected,
  ] = useLocalStorage(
    "salat-guide:last-city",
    DEFAULT_CITY
  );


  // -------------------------------------------------------
  // Browser location status
  // -------------------------------------------------------

  const [
    locateStatus,
    setLocateStatus,
  ] = useState("idle");


  const [
    locateError,
    setLocateError,
  ] = useState("");


  // =======================================================
  // SELECT CITY FROM SEARCH
  // =======================================================

  function selectCity(
    city,
    country,
    latitude = null,
    longitude = null
  ) {

    setSelected({
      city,
      country,
      latitude,
      longitude,
    });


    setLocateStatus(
      "idle"
    );


    setLocateError("");
  }


  // =======================================================
  // USE MY CURRENT LOCATION
  // =======================================================

  async function useMyLocation() {

    setLocateStatus(
      "loading"
    );

    setLocateError("");


    try {

      // ---------------------------------------------------
      // Get browser GPS coordinates
      // ---------------------------------------------------

      const {
        latitude,
        longitude,
      } = await getCurrentPosition();


      // ---------------------------------------------------
      // Convert coordinates into city + country
      // ---------------------------------------------------

      const {
        city,
        country,
      } = await reverseGeocode(
        latitude,
        longitude
      );


      // ---------------------------------------------------
      // Save complete location
      // ---------------------------------------------------

      setSelected({
        city,
        country,
        latitude,
        longitude,
      });


      setLocateStatus(
        "idle"
      );


    } catch (error) {

      setLocateStatus(
        "error"
      );


      setLocateError(
        error?.message ||
        "Unable to determine your location."
      );
    }
  }


  // =======================================================
  // CONTEXT VALUE
  // =======================================================

  const value = {

    // City
    city:
      selected?.city || DEFAULT_CITY.city,


    // Country
    country:
      selected?.country || DEFAULT_CITY.country,


    // Exact coordinates
    latitude:
      selected?.latitude ??
      DEFAULT_CITY.latitude,


    longitude:
      selected?.longitude ??
      DEFAULT_CITY.longitude,


    // Functions
    selectCity,

    useMyLocation,


    // Location status
    locateStatus,

    locateError,
  };


  // =======================================================
  // PROVIDER
  // =======================================================

  return (
    <LocationContext.Provider
      value={value}
    >
      {children}
    </LocationContext.Provider>
  );
}


// =========================================================
// CUSTOM HOOK
// =========================================================

export function useCityContext() {

  const context =
    useContext(
      LocationContext
    );


  if (!context) {

    throw new Error(
      "useCityContext must be used within a LocationProvider"
    );
  }


  return context;
}
