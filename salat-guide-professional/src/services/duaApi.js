// =========================================================
// DUA API
// =========================================================

const API_BASE_URL =
  "https://prayertimes.al-muslims.com/api";

// =========================================================
// HEADERS
// =========================================================

function getHeaders() {
  const apiKey =
    import.meta.env.VITE_PRAYER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "VITE_PRAYER_API_KEY is missing from .env"
    );
  }

  return {
    "x-api-key": apiKey,
    Accept: "application/json",
  };
}

// =========================================================
// REQUEST
// =========================================================

async function requestJson(url) {
  console.log("=================================");
  console.log("DUAS REQUEST");
  console.log("=================================");
  console.log("URL:", url);

  const apiKey =
    import.meta.env.VITE_PRAYER_API_KEY;

  console.log(
    "API KEY EXISTS:",
    Boolean(apiKey)
  );

  console.log(
    "API KEY LENGTH:",
    apiKey ? apiKey.length : 0
  );

  try {
    const response =
      await fetch(url, {
        method: "GET",

        headers: getHeaders(),
      });

    console.log(
      "DUA API STATUS:",
      response.status
    );

    const text =
      await response.text();

    console.log(
      "DUA API RESPONSE:",
      text
    );

    if (!response.ok) {
      throw new Error(
        `Dua API request failed with status ${response.status}`
      );
    }

    if (!text) {
      throw new Error(
        "Dua API returned an empty response."
      );
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        "Dua API returned invalid JSON."
      );
    }

    if (data?.success === false) {
      throw new Error(
        data?.message ||
        "Dua API returned an error."
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Dua API Error:",
      error
    );

    throw error;
  }
}

// =========================================================
// GET DUA CHAPTERS
// =========================================================

export async function getDuaChapters(
  lang = "english"
) {
  const params =
    new URLSearchParams({
      lang: String(lang),
    });

  const url =
    `${API_BASE_URL}/dua/chapters/?${params.toString()}`;

  return requestJson(url);
}

// =========================================================
// GET DUAS BY CHAPTER
// =========================================================

export async function getDuasByChapter(
  chapterId = 1,
  lang = "urdu",
  page = 1,
  limit = 25
) {
  const params =
    new URLSearchParams({
      lang: String(lang),
      page: String(page),
      limit: String(limit),
    });

  const url =
    `${API_BASE_URL}/dua/chapters/` +
    `${chapterId}/duas?${params.toString()}`;

  return requestJson(url);
}