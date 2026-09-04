import { useState } from "react";

/**
 * Like useState, but persisted to localStorage under `key`. Used to
 * remember the user's last selected city between visits.
 */
export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  function updateValue(nextValue) {
    setValue(nextValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(nextValue));
    } catch {
      // localStorage may be unavailable (e.g. private browsing) — the app
      // still works, it just won't remember the choice next time.
    }
  }

  return [value, updateValue];
}
