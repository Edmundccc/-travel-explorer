# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Travel Explorer is a static single-page travel-guide site built with **only** vanilla HTML, CSS, and JS — no frameworks, no build step, no backend, no `package.json`. Three files total: [index.html](index.html), [styles.css](styles.css), [script.js](script.js). All persistence is `localStorage`.

## Run / serve

There is no build, lint, or test toolchain. Two ways to view the app:

- **Local file**: double-click `index.html`. Most features work, but `fetch()` to OpenWeather is fine from `file://`.
- **Local HTTP server** (preferred, matches how it's been developed):
  ```powershell
  cd C:\Users\terti\travel-explorer
  python -m http.server 8000 --bind 127.0.0.1
  ```
  Then open `http://localhost:8000/`. Python's `http.server` does not cache — just refresh after edits.

The server has been run in the background during prior sessions; check with `Get-NetTCPConnection -LocalPort 8000 -State Listen` and stop with `Stop-Process -Id <pid>` if needed.

## Architecture

### Single source of truth: `CITIES`

The `CITIES` array at the top of [script.js](script.js) drives almost every dynamic part of the page. Adding or editing a city automatically updates:

- The city card grid (`renderCityCards`)
- The destination `<select>` in the Trip Budget Calculator (`populateCityDropdowns`)
- The destination `<select>` in the Enquiry Form (same)
- The Guide Modal content (`openGuideModal` reads `city.guide.*`)
- The Budget Calculator's autofilled daily-spend default
- The Enquiry Viewer's pretty destination label (looks up the id back to a name)

Each city has a fixed shape: `{ id, name, country, img, flight, budgetSGD, season, blurb, guide: { overview, itinerary[], food[], transport, costs, safety[], photoSpots[] } }`. The `id` is referenced by `data-open-city` attributes and by the saved-enquiry records.

### Boot order

Every feature initialiser is a `init*` function called once from a single `DOMContentLoaded` handler (see the `// Boot` block in [script.js](script.js)). Order matters in a few places: `renderCityCards()` and `populateCityDropdowns()` must run before anything that selects on those generated elements.

### Sections + scroll-spy

The `<nav>` and the `sections` array inside `initNav()` must stay in sync — both list the same section ids in page order: `home, guides, cities, reviews, tools, weather, safety, enquiry`. The IntersectionObserver toggles `.is-active` on the matching `<a>`. When adding/removing a section, update both the HTML nav and that array.

### localStorage namespace

All keys live under `travelExplorer.*` and are listed in the `LS_KEYS` constant. The `readJSON` / `writeJSON` helpers in [script.js](script.js) handle parse errors and quota silently — use them rather than calling `localStorage` directly.

### OpenWeather

`OPENWEATHER_API_KEY` is a constant at the top of [script.js](script.js), defaulting to `"YOUR_API_KEY_HERE"`. `fetchWeather()` checks for this sentinel and renders a friendly "add your key" panel instead of calling the API — preserve that behaviour when editing the weather flow.

### FX rates

`FX_RATES_FROM_SGD` is a static table (SGD as base). A live-rates stub for `exchangerate.host` is left as a commented block right below the table. If swapping to live, mutate the same object so the rest of the converter works unchanged.

### HTML escaping

User-controlled strings (itinerary entries, saved enquiries) are rendered via template literals into `innerHTML`. Always pass them through the `escapeHTML()` utility before interpolating — there are no other XSS guards.

### Styling system

[styles.css](styles.css) uses CSS custom properties at `:root` (`--ink`, `--accent`, `--font-display`, etc.). Reuse these tokens rather than hardcoding. The page rhythm alternates white sections and `var(--bg-alt)` via the `.section--alt` modifier; check neighbouring sections before adding a new one. A `@media (prefers-reduced-motion: reduce)` block at the bottom kills animations — new motion should also respect it.

## Images

All imagery comes from Unsplash. Direct `images.unsplash.com/photo-...` URLs are used (not the deprecated `source.unsplash.com` random endpoint) so reloads don't shuffle.
