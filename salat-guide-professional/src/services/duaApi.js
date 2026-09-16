// =========================================================
// DUA API
// =========================================================

const API_BASE_URL =
  "https://prayertimes.al-muslims.com/api";

const API_KEY =
  import.meta.env.VITE_PRAYER_API_KEY;


// =========================================================
// CACHE
// =========================================================

// Completed API responses
const chaptersCache = new Map();
const duasCache = new Map();

// Requests currently in progress
const chaptersRequests = new Map();
const duasRequests = new Map();


// =========================================================
// COMMON FETCH OPTIONS
// =========================================================

function getHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };
}


// =========================================================
// GET DUA CHAPTERS
// =========================================================

export async function getDuaChapters(
  lang = "english",
  signal
) {
  const cacheKey = lang;

  // -------------------------------------------------------
  // 1. RETURN CACHED DATA
  // -------------------------------------------------------

  if (chaptersCache.has(cacheKey)) {
    console.log(
      "✅ CHAPTERS FROM CACHE:",
      cacheKey
    );

    return chaptersCache.get(cacheKey);
  }


  // -------------------------------------------------------
  // 2. RETURN EXISTING REQUEST
  // -------------------------------------------------------

  if (chaptersRequests.has(cacheKey)) {
    console.log(
      "⏳ CHAPTERS REQUEST ALREADY RUNNING:",
      cacheKey
    );

    return chaptersRequests.get(cacheKey);
  }


  // -------------------------------------------------------
  // 3. API URL
  // -------------------------------------------------------

  const url =
    `${API_BASE_URL}/dua/chapters/?lang=${encodeURIComponent(
      lang
    )}`;


  console.log("=================================");
  console.log("DUA CHAPTERS REQUEST");
  console.log("=================================");
  console.log("URL:", url);
  console.log(
    "API KEY EXISTS:",
    Boolean(API_KEY)
  );


  // -------------------------------------------------------
  // 4. CREATE REQUEST
  // -------------------------------------------------------

  const requestPromise = fetch(url, {
    method: "GET",
    headers: getHeaders(),
    signal,
  })
    .then(async (response) => {

      console.log(
        "Dua chapters status:",
        response.status
      );


      if (!response.ok) {
        throw new Error(
          `Failed to fetch chapters. Status: ${response.status}`
        );
      }


      const result = await response.json();


      console.log(
        "Dua chapters response:",
        result
      );


      if (
        !result?.success ||
        !Array.isArray(result?.data)
      ) {
        throw new Error(
          result?.message ||
            "Invalid chapters API response"
        );
      }


      // ---------------------------------------------------
      // SAVE IN CACHE
      // ---------------------------------------------------

      chaptersCache.set(
        cacheKey,
        result.data
      );


      return result.data;
    })
    .finally(() => {

      // Request finished
      chaptersRequests.delete(cacheKey);
    });


  // -------------------------------------------------------
  // 5. SAVE RUNNING REQUEST
  // -------------------------------------------------------

  chaptersRequests.set(
    cacheKey,
    requestPromise
  );


  return requestPromise;
}


// =========================================================
// GET DUAS BY CHAPTER
// =========================================================

export async function getDuasByChapter(
  chapterId,
  {
    lang = "urdu",
    page = 1,
    limit = 25,
    signal,
  } = {}
) {

  if (!chapterId) {
    throw new Error(
      "Chapter ID is required"
    );
  }


  // -------------------------------------------------------
  // CACHE KEY
  // -------------------------------------------------------

  const cacheKey =
    `${chapterId}_${lang}_${page}_${limit}`;


  // -------------------------------------------------------
  // 1. RETURN CACHED DATA
  // -------------------------------------------------------

  if (duasCache.has(cacheKey)) {
    console.log(
      "✅ DUAS FROM CACHE:",
      cacheKey
    );

    return duasCache.get(cacheKey);
  }


  // -------------------------------------------------------
  // 2. RETURN EXISTING REQUEST
  // -------------------------------------------------------

  if (duasRequests.has(cacheKey)) {
    console.log(
      "⏳ DUAS REQUEST ALREADY RUNNING:",
      cacheKey
    );

    return duasRequests.get(cacheKey);
  }


  // -------------------------------------------------------
  // 3. CREATE QUERY PARAMS
  // -------------------------------------------------------

  const params = new URLSearchParams({
    lang,
    page: String(page),
    limit: String(limit),
  });


  // -------------------------------------------------------
  // 4. API URL
  // -------------------------------------------------------

  const url =
    `${API_BASE_URL}/dua/chapters/${chapterId}/duas?${params.toString()}`;


  console.log("=================================");
  console.log("DUA DETAILS REQUEST");
  console.log("=================================");
  console.log("URL:", url);
  console.log(
    "API KEY EXISTS:",
    Boolean(API_KEY)
  );


  // -------------------------------------------------------
  // 5. CREATE REQUEST
  // -------------------------------------------------------

  const requestPromise = fetch(url, {
    method: "GET",
    headers: getHeaders(),
    signal,
  })
    .then(async (response) => {

      console.log(
        "Dua details status:",
        response.status
      );


      if (!response.ok) {
        throw new Error(
          `Failed to fetch duas. Status: ${response.status}`
        );
      }


      const result =
        await response.json();


      console.log(
        "Dua details response:",
        result
      );


      if (
        !result?.success ||
        !Array.isArray(result?.items)
      ) {
        throw new Error(
          result?.message ||
            "Invalid duas API response"
        );
      }


      // ---------------------------------------------------
      // SAVE IN CACHE
      // ---------------------------------------------------

      duasCache.set(
        cacheKey,
        result
      );


      return result;
    })
    .finally(() => {

      // Request finished
      duasRequests.delete(cacheKey);
    });


  // -------------------------------------------------------
  // 6. SAVE RUNNING REQUEST
  // -------------------------------------------------------

  duasRequests.set(
    cacheKey,
    requestPromise
  );


  return requestPromise;
}


// =========================================================
// AUDIO URL
// =========================================================

const AUDIO_BASE_URL =
  "https://prayertimes.al-muslims.com";


export function getDuaAudioUrl(path) {

  // -------------------------------------------------------
  // Empty value
  // -------------------------------------------------------

  if (
    !path ||
    typeof path !== "string"
  ) {
    return "";
  }


  const value = path.trim();


  if (!value) {
    return "";
  }


  // -------------------------------------------------------
  // Already complete URL
  // -------------------------------------------------------

  if (
    /^https?:\/\//i.test(value)
  ) {
    return value;
  }


  // -------------------------------------------------------
  // Protocol-relative URL
  // Example: //example.com/audio.mp3
  // -------------------------------------------------------

  if (
    value.startsWith("//")
  ) {
    return `https:${value}`;
  }


  // -------------------------------------------------------
  // Absolute path
  // Example: /data/audio.mp3
  // -------------------------------------------------------

  if (
    value.startsWith("/")
  ) {
    return `${AUDIO_BASE_URL}${value}`;
  }


  // -------------------------------------------------------
  // Relative path
  // Example: data/audio.mp3
  // -------------------------------------------------------

  return `${AUDIO_BASE_URL}/${value}`;
}