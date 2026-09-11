import { PRAYER_DEFINITIONS } from "../utils/prayerUtils.js";

// =========================================================
// API CONFIGURATION
// =========================================================

const API_URL =
  "https://prayertimes.al-muslims.com/api/prayer/get-data";

const API_KEY =
  import.meta.env.VITE_PRAYER_API_KEY;


// =========================================================
// CACHE
// =========================================================
//
// Same city + country + year + month ke liye
// API sirf ek baar hit hogi.
//
// Example:
//
// Lahore + Pakistan + 2026 + 9
//              ↓
//          API request
//              ↓
//            CACHE
//
// Dobara Lahore search:
//              ↓
//          CACHE DATA
//              ↓
//        API request nahi
// =========================================================

const prayerCache = new Map();


// =========================================================
// IN-FLIGHT REQUEST CACHE
// =========================================================
//
// Agar ek hi waqt mein 2 components same data maangte hain,
// dono alag API requests nahi bhejenge.
//
// Dono same Promise use karenge.
// =========================================================

const pendingRequests = new Map();


// =========================================================
// CLEAN TIME
// =========================================================

function cleanTime(time) {
  if (!time) {
    return "";
  }

  return String(time)
    .replace(/\s*\([^)]*\)/g, "")
    .trim();
}


// =========================================================
// FALLBACK TIMINGS
// =========================================================
//
// Currently API error par fallback use nahi ho raha.
// Isko future use ke liye rakha gaya hai.
// =========================================================

const FALLBACK_TIMINGS = {
  fajr: "4:20 AM",
  sunrise: "5:43 AM",
  dhuhr: "12:01 PM",
  asr: "3:33 PM",
  maghrib: "6:17 PM",
  isha: "7:40 PM",
};


// =========================================================
// BUILD PRAYER LIST
// =========================================================

function buildPrayerList(timings = {}) {
  return PRAYER_DEFINITIONS.map(
    ({ key, label, arabic }) => ({
      key,
      label,
      arabic,

      time: cleanTime(
        timings[key] ||
        timings[key?.toLowerCase()]
      ),
    })
  );
}


// =========================================================
// CACHE KEY
// =========================================================

function createCacheKey(
  year,
  month,
  city,
  country
) {
  return [
    year,
    month,
    city.trim().toLowerCase(),
    country.trim().toLowerCase(),
  ].join("|");
}


// =========================================================
// FETCH MONTH DATA
// =========================================================
//
// IMPORTANT:
//
// API ka response:
// - today
// - calendar
// dono provide karta hai.
//
// Isliye same API response ko cache karenge.
//
// getPrayerTimes()
// aur
// getMonthlyPrayerTimes()
//
// dono isi function ko use karenge.
// =========================================================

async function fetchPrayerData(
  year,
  month,
  city,
  country
) {
  if (!API_KEY) {
    throw new Error(
      "Prayer API key is missing. Add VITE_PRAYER_API_KEY to your .env file."
    );
  }


  // -------------------------------------------------------
  // CACHE KEY
  // -------------------------------------------------------

  const cacheKey = createCacheKey(
    year,
    month,
    city,
    country
  );


  // -------------------------------------------------------
  // 1. CHECK COMPLETED CACHE
  // -------------------------------------------------------

  if (prayerCache.has(cacheKey)) {
    console.log(
      "PRAYER CACHE HIT:",
      city,
      country,
      year,
      month
    );

    return prayerCache.get(cacheKey);
  }


  // -------------------------------------------------------
  // 2. CHECK PENDING REQUEST
  // -------------------------------------------------------
  //
  // Agar request already chal rahi hai,
  // new fetch nahi karna.
  // -------------------------------------------------------

  if (pendingRequests.has(cacheKey)) {
    console.log(
      "PRAYER REQUEST ALREADY IN PROGRESS:",
      city,
      country
    );

    return pendingRequests.get(cacheKey);
  }


  // -------------------------------------------------------
  // 3. CREATE NEW REQUEST
  // -------------------------------------------------------

  const requestPromise =
    (async () => {

      const params =
        new URLSearchParams();

      params.set(
        "year",
        year
      );

      params.set(
        "month",
        month
      );

      params.set(
        "city",
        city
      );

      params.set(
        "country",
        country
      );


      const url =
        `${API_URL}?${params.toString()}`;


      console.log(
        "PRAYER API REQUEST:",
        url
      );


      const response =
        await fetch(
          url,
          {
            method: "GET",

            headers: {
              "x-api-key": API_KEY,
              Accept: "application/json",
            },
          }
        );


      if (!response.ok) {
        throw new Error(
          `Prayer API error: ${response.status} ${response.statusText}`
        );
      }


      const payload =
        await response.json();


      console.log(
        "PRAYER API RESPONSE:",
        payload
      );


      if (!payload?.success) {
        throw new Error(
          "Prayer API returned an unsuccessful response."
        );
      }


      // ---------------------------------------------------
      // SAVE SUCCESSFUL RESPONSE
      // ---------------------------------------------------

      prayerCache.set(
        cacheKey,
        payload
      );


      console.log(
        "PRAYER DATA CACHED:",
        cacheKey
      );


      return payload;

    })();


  // -------------------------------------------------------
  // SAVE PENDING REQUEST
  // -------------------------------------------------------

  pendingRequests.set(
    cacheKey,
    requestPromise
  );


  try {

    return await requestPromise;

  } finally {

    // Request complete hone ke baad
    // pending list se remove.

    pendingRequests.delete(
      cacheKey
    );

  }
}


// =========================================================
// GET TODAY'S PRAYER TIMES
// =========================================================

export async function getPrayerTimes(
  city,
  country
) {
  if (!city || !country) {
    throw new Error(
      "City and country are required."
    );
  }


  try {

    const now =
      new Date();


    const year =
      now.getFullYear();


    const month =
      now.getMonth() + 1;


    // -----------------------------------------------------
    // IMPORTANT
    // -----------------------------------------------------
    //
    // Ye function cache use karta hai.
    //
    // Agar same city/month pehle load ho chuka hai:
    //
    // API HIT ❌
    // CACHE ✅
    //
    // -----------------------------------------------------

    const payload =
      await fetchPrayerData(
        year,
        month,
        city,
        country
      );


    const today =
      payload?.today;


    if (!today?.timings) {
      throw new Error(
        "Today's prayer timings were not found."
      );
    }


    return {

      prayers:
        buildPrayerList(
          today.timings
        ),

      hijriDate:
        today.hijri || "",

      gregorianDate:
        today.gregorian || "",

      methodName:
        payload?.method_meta?.display_name ||
        payload?.method ||
        "University Of Islamic Sciences, Karachi",

      city:
        payload?.city ||
        city ||
        "",

      country:
        payload?.country ||
        country ||
        "",

      timezone:
        payload?.timezone ?? 5,

      isFallback:
        false,
    };

  } catch (error) {

    console.error(
      "Prayer Times API Error:",
      error
    );

    throw error;
  }
}


// =========================================================
// GET MONTHLY PRAYER TIMES
// =========================================================

export async function getMonthlyPrayerTimes(
  city,
  country,
  month,
  year
) {
  if (!city || !country) {
    throw new Error(
      "City and country are required."
    );
  }


  try {

    // -----------------------------------------------------
    // SAME CACHE
    // -----------------------------------------------------
    //
    // Monthly calendar bhi exactly same cached payload
    // use karega.
    //
    // Isliye:
    //
    // getPrayerTimes()
    // +
    // getMonthlyPrayerTimes()
    //
    // = ONE API REQUEST
    //
    // -----------------------------------------------------

    const payload =
      await fetchPrayerData(
        year,
        month,
        city,
        country
      );


    const days =
      payload?.calendar;


    if (
      !Array.isArray(days) ||
      days.length === 0
    ) {
      throw new Error(
        "No prayer times available for this month."
      );
    }


    return days.map(
      (day) => ({

        date:
          day?.gregorian || "",

        day:
          day?.day || "",

        weekday:
          day?.weekday || "",

        hijri:
          day?.hijri || "",

        fajr:
          cleanTime(
            day?.timings?.fajr
          ),

        sunrise:
          cleanTime(
            day?.timings?.sunrise
          ),

        dhuhr:
          cleanTime(
            day?.timings?.dhuhr
          ),

        asr:
          cleanTime(
            day?.timings?.asr
          ),

        maghrib:
          cleanTime(
            day?.timings?.maghrib
          ),

        isha:
          cleanTime(
            day?.timings?.isha
          ),
      })
    );

  } catch (error) {

    console.error(
      "Monthly Prayer API Error:",
      error
    );

    throw new Error(
      error?.message ||
      "Unable to load the monthly prayer calendar."
    );
  }
}


// =========================================================
// OPTIONAL: CLEAR PRAYER CACHE
// =========================================================
//
// Normally is function ki zaroorat nahi.
//
// Agar future mein "Refresh Prayer Times"
// button banana ho to:
//
// clearPrayerCache();
//
// use kar sakte hain.
// =========================================================

export function clearPrayerCache() {
  prayerCache.clear();

  console.log(
    "PRAYER CACHE CLEARED"
  );
}


// =========================================================
// OPTIONAL: CLEAR SPECIFIC CITY CACHE
// =========================================================

export function clearCityPrayerCache(
  city,
  country,
  year,
  month
) {
  const cacheKey =
    createCacheKey(
      year,
      month,
      city,
      country
    );

  prayerCache.delete(
    cacheKey
  );

  console.log(
    "CITY PRAYER CACHE CLEARED:",
    cacheKey
  );
}