// Wraps the browser Geolocation API and a free reverse-geocoding lookup.
// "Use My Location" can resolve a city/country the same way a typed
// search does.
//
// Kept separate from prayerService because this file deals with
// device location, not prayer-time data.

/**
 * Gets the user's current coordinates using the browser Geolocation API.
 *
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    // Check whether the browser supports Geolocation.
    if (!("geolocation" in navigator)) {
      reject(
        new Error(
          "Your browser does not support location detection."
        )
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },

      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                "Location access was denied. Please allow location access or search for a city instead."
              )
            );
            break;

          case error.POSITION_UNAVAILABLE:
            reject(
              new Error(
                "Your location is currently unavailable. Please try again or search for a city instead."
              )
            );
            break;

          case error.TIMEOUT:
            reject(
              new Error(
                "Location detection timed out. Please try again or search for a city instead."
              )
            );
            break;

          default:
            reject(
              new Error(
                "Unable to determine your location. Please try again or search for a city instead."
              )
            );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

/**
 * Converts latitude/longitude into a city/country pair
 * using BigDataCloud's free reverse-geocoding API.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{city: string, country: string}>}
 */
export async function reverseGeocode(latitude, longitude) {
  const url =
    `https://api.bigdatacloud.net/data/reverse-geocode-client` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&localityLanguage=en`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Unable to determine your city from your location."
      );
    }

    const payload = await response.json();

    const city =
      payload.city ||
      payload.locality ||
      payload.principalSubdivision;

    const country = payload.countryName;

    if (!city || !country) {
      throw new Error(
        "Unable to determine your city from your location."
      );
    }

    return {
      city,
      country,
    };
  } catch (error) {
    // Preserve our readable errors.
    if (error instanceof Error && error.message) {
      throw error;
    }

    throw new Error(
      "Unable to determine your city from your location."
    );
  }
}