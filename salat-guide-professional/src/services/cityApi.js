// =========================================================
// CITY SEARCH API
// =========================================================

const CITY_SEARCH_API =
  "https://prayertimes.al-muslims.com/api/city/location-search";

const API_KEY =
  import.meta.env.VITE_PRAYER_API_KEY;


// =========================================================
// CACHE
// =========================================================

const citySearchCache = new Map();

const MAX_CACHE_SIZE = 50;


// =========================================================
// SEARCH CITIES
// =========================================================

export async function searchCities(
  query,
  options = {}
) {

  const cleanQuery =
    String(query || "").trim();

  const signal =
    options?.signal;


  // -------------------------------------------------------
  // Empty query
  // -------------------------------------------------------

  if (!cleanQuery) {
    return [];
  }


  // -------------------------------------------------------
  // API key
  // -------------------------------------------------------

  if (!API_KEY) {

    throw new Error(
      "Prayer API key is missing. Add VITE_PRAYER_API_KEY to your .env file."
    );

  }


  // -------------------------------------------------------
  // Cache key
  // -------------------------------------------------------

  const cacheKey =
    cleanQuery.toLowerCase();


  // -------------------------------------------------------
  // CACHE HIT
  // -------------------------------------------------------

  if (citySearchCache.has(cacheKey)) {

    return citySearchCache.get(cacheKey);

  }


  // -------------------------------------------------------
  // URL
  // -------------------------------------------------------

  const url =
    `${CITY_SEARCH_API}?q=${encodeURIComponent(cleanQuery)}` +
    `&countries_limit=15` +
    `&cities_limit=40`;


  try {

    const response =
      await fetch(url, {

        method: "GET",

        headers: {
          "x-api-key": API_KEY,
          Accept: "application/json",
        },

        signal,

      });


    // -----------------------------------------------------
    // HTTP ERROR
    // -----------------------------------------------------

    if (!response.ok) {

      throw new Error(
        `City search failed: ${response.status} ${response.statusText}`
      );

    }


    // -----------------------------------------------------
    // JSON
    // -----------------------------------------------------

    const data =
      await response.json();


    console.log(
      "CITY API RESPONSE:",
      data
    );


    // -----------------------------------------------------
    // API FAILURE
    // -----------------------------------------------------

    if (!data?.success) {
      return [];
    }


    const cities =
      data?.data?.cities;


    if (!Array.isArray(cities)) {
      return [];
    }


    // -----------------------------------------------------
    // CLEAN RESULTS
    // -----------------------------------------------------

    const cleanResults =
      cities
        .filter(
          (item) =>
            item?.city
        )
        .map((item) => ({
          ...item,
          city:
            item.city?.trim() || "",
          country:
            item.country?.trim() || "",
        }));


    // -----------------------------------------------------
    // CACHE RESULT
    // -----------------------------------------------------

    citySearchCache.set(
      cacheKey,
      cleanResults
    );


    // -----------------------------------------------------
    // LIMIT CACHE
    // -----------------------------------------------------

    if (
      citySearchCache.size >
      MAX_CACHE_SIZE
    ) {

      const firstKey =
        citySearchCache.keys().next().value;

      citySearchCache.delete(
        firstKey
      );

    }


    return cleanResults;

  } catch (error) {

    // Abort error ko normally propagate karo.
    // LocationSearch isko ignore karega.

    if (
      error?.name === "AbortError"
    ) {
      throw error;
    }


    console.error(
      "City search failed:",
      error
    );

    throw error;

  }

}