import { useEffect, useState } from "react";
import { getPrayerTimes } from "../services/prayerService.js";

/**
 * Loads today's prayer times for a city and exposes loading/error state.
 * Re-fetches whenever city or country changes.
 */
export default function usePrayerTimes(city, country) {
  const [prayers, setPrayers] = useState([]);
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [methodName, setMethodName] = useState("");
  const [isFallback, setIsFallback] = useState(false);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!city || !country) return;
    let isCancelled = false;

    async function loadTimes() {
      setStatus("loading");
      try {
        const result = await getPrayerTimes(city, country);
        if (isCancelled) return;

        if (result.prayers.every((prayer) => !prayer.time)) {
          setStatus("error");
          setErrorMessage("No prayer time data available for this city.");
          return;
        }

        setPrayers(result.prayers);
        setHijriDate(result.hijriDate);
        setGregorianDate(result.gregorianDate);
        setMethodName(result.methodName);
        setIsFallback(result.isFallback);
        setStatus("success");
      } catch (error) {
        if (isCancelled) return;
        setErrorMessage(error.message || "Unable to load prayer times. Please try again.");
        setStatus("error");
      }
    }

    loadTimes();

    return () => {
      isCancelled = true;
    };
  }, [city, country]);

  return { prayers, hijriDate, gregorianDate, methodName, isFallback, status, errorMessage };
}
