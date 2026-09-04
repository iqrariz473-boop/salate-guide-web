# Salat Guide — Professional Prayer Times Website

A modern, multi-page Islamic prayer times website built with React,
React Router, and plain CSS.

## Features

- Live prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) for any city
- Current/next prayer detection with a live countdown, correctly handling
  the midnight rollover from Isha to the next day's Fajr
- "Use My Location" via the browser Geolocation API + reverse geocoding
- Last-selected city remembered between visits (localStorage)
- Dedicated Prayer Times page with a full, paginated monthly calendar
- Cities directory with search/filter
- 5 Pillars of Islam page with expandable detail cards
- Prayer Guide: Salah overview, the five daily prayers, Wudu basics, and
  prayer preparation
- Qibla page with a calculated compass bearing to the Kaaba, plus an
  optional live device-compass mode (clearly separated from the
  calculated-bearing fallback)
- Contact form with client-side validation and a simulated submit state
  (no backend yet — see `Contact.jsx` for where to wire one up)
- Responsive from 360px up to desktop, with a proper mobile nav menu
- Graceful loading, error, and empty states everywhere prayer data loads
- Offline-friendly demo fallback if the prayer times API is unreachable

## Tech stack

- React 18 (function components + hooks, no TypeScript)
- React Router v6
- Vite
- Plain CSS with a shared design-token system (`src/styles/global.css`)
- [Aladhan API](https://aladhan.com/prayer-times-api) for prayer timings — no API key required
- Browser Geolocation API + a free reverse-geocoding lookup for "Use My Location"

## Project structure

```
src/
├── components/    Reusable UI: Navbar, Footer, Hero, LocationSearch,
│                  PrayerTimesCard, PrayerCard, PrayerCountdown, CityCard,
│                  CityGrid, PillarCard, MonthlyCalendar, QiblaCompass,
│                  Loading, ErrorMessage, Seo, Icons
├── pages/         One file per route (Home, PrayerTimes, Cities, About,
│                  Pillars, PrayerGuide, Qibla, Contact, Privacy, Terms, NotFound)
├── context/       LocationContext.jsx — the site-wide selected city
├── services/      prayerService.js (Aladhan API) and locationService.js
│                  (geolocation + reverse geocoding) — the only files that
│                  call fetch()/navigator.geolocation
├── hooks/         usePrayerTimes, useCountdown, useLocalStorage
├── data/          Static content: featured cities, five pillars
├── utils/         dateUtils.js, prayerUtils.js (current/next prayer logic)
└── styles/        global.css — design tokens, resets, buttons, cards, forms
```

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

```bash
npm run build     # production build
npm run preview   # preview the production build locally
```

## API notes

- Prayer times: ISNA calculation method (method=2) via Aladhan's
  `timingsByCity` and `calendarByCity` endpoints. Change
  `CALCULATION_METHOD` in `src/services/prayerService.js` if you need a
  different one.
- If the timings request fails, `getPrayerTimes` returns clearly-flagged
  demo data (`isFallback: true`) so the UI stays usable instead of
  breaking.
- "Use My Location" uses `bigdatacloud.net`'s free reverse-geocoding
  endpoint (no key) to turn coordinates into a city/country pair.

## Future improvements

- Connect the Contact form to a real backend or email service
- Add more calculation-method options (Umm al-Qura, MWL, etc.) as a
  user preference
- Add automated tests for `prayerUtils.js` rollover logic
