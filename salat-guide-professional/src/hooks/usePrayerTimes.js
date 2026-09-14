import {
  useEffect,
  useState,
} from "react";

import {
  getPrayerTimes,
} from "../services/prayerService.js";

function usePrayerTimes(
  city,
  country
) {
  const [prayers, setPrayers] =
    useState([]);

  const [status, setStatus] =
    useState("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [hijriDate, setHijriDate] =
    useState("");

  const [gregorianDate, setGregorianDate] =
    useState("");

  const [methodName, setMethodName] =
    useState("");

  const [isFallback, setIsFallback] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPrayerTimes() {
      if (!city || !country) {
        setPrayers([]);
        setStatus("idle");
        setErrorMessage("");
        return;
      }

      if (cancelled) return;

      setStatus("loading");
      setErrorMessage("");

      const result =
        await getPrayerTimes(
          city,
          country
        );

      if (cancelled) return;

      setPrayers(
        Array.isArray(
          result?.prayers
        )
          ? result.prayers
          : []
      );

      setHijriDate(
        result?.hijriDate || ""
      );

      setGregorianDate(
        result?.gregorianDate || ""
      );

      setMethodName(
        result?.methodName || ""
      );

      setIsFallback(
        Boolean(
          result?.isFallback
        )
      );

      /*
        API failure is handled internally.
        UI continues with fallback data.
      */

      setErrorMessage("");

      setStatus(
        result?.isFallback
          ? "fallback"
          : "success"
      );
    }

    loadPrayerTimes();

    return () => {
      cancelled = true;
    };
  }, [city, country]);

  return {
    prayers,
    status,
    errorMessage,
    hijriDate,
    gregorianDate,
    methodName,
    isFallback,
  };
}

export default usePrayerTimes;