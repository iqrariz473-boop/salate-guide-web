// Wraps the browser Geolocation API and a free reverse-geocoding lookup
// so "Use My Location" can resolve a city/country the same way a typed
// search does. Kept separate from prayerService because it deals with
// device location, not prayer time data.

/** Resolves the user's current coordinates, or rejects with a readable message. */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Your browser does not support location detection."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        reject(new Error("Unable to determine your location. Please allow location access, or search for a city instead."));
      },
      { timeout: 10000 }
    );
  });
}

/** Converts coordinates into a city/country pair using a free, no-key API. */
export async function reverseGeocode(latitude, longitude) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to determine your city from your location.");
  }

  const payload = await response.json();
  const city = payload.city || payload.locality || payload.principalSubdivision;
  const country = payload.countryName;

  if (!city || !country) {
    throw new Error("Unable to determine your city from your location.");
  }

  return { city, country };
}
