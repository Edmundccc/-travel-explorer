# Travel Explorer

A static single-page travel-guide site for 12 destinations across Asia-Pacific. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no backend.

![Travel Explorer homepage](screenshot.png)

## Features

- Browse 12 city guides with 3-day itineraries, food picks, transport tips, cost breakdowns, safety notes, and photo spots
- Trip budget calculator (travellers × days × daily spend, auto-fills per destination)
- SGD currency converter across 12 currencies
- Packing checklist (saved in browser via localStorage)
- Custom itinerary planner (add/remove activities by day and time)
- Live weather lookup via OpenWeather API
- Enquiry form with a viewer panel for saved submissions

## Run

Two options:

**Open directly:** double-click `index.html`. Most features work; weather requires an API key (see below).

**Local server (preferred):**

```powershell
cd travel-explorer
python -m http.server 8000 --bind 127.0.0.1
```

Then open <http://localhost:8000/>.

## Weather API key

The weather widget uses [OpenWeather](https://openweathermap.org/api). Without a key, it shows a friendly "add your key" panel instead of calling the API.

To enable it, open [script.js](script.js), find `OPENWEATHER_API_KEY`, and replace `"YOUR_API_KEY_HERE"` with a free key from openweathermap.org.

## Project structure

```
travel-explorer/
  index.html     # Markup + sections
  styles.css     # Design tokens via CSS custom properties
  script.js      # All logic; CITIES array is the single source of truth
  CLAUDE.md      # Architecture notes for AI-assisted editing
```

Adding a new city means appending one entry to the `CITIES` array in [script.js](script.js) — the card grid, dropdowns, and guide modal all pick it up automatically.

## Persistence

All user data (packing checklist, custom itinerary, saved enquiries) lives in `localStorage` under the `travelExplorer.*` namespace. Nothing leaves the browser.
