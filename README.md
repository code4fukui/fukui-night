# fukui-night

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A curated, interactive map of night spots in Fukui City, Japan, based on data from the Fukui Business Society.

## Demo

https://code4fukui.github.io/fukui-night/

The application features an interactive map and a filterable table of restaurants, bars, and other venues.

## Features

-   **Interactive Map**: Displays night spots across Fukui City's main areas (Fukui Eki-mae, Katamachi, etc.).
-   **Time-Based Filtering**: Shows only establishments that are open at a specific hour or right now.
-   **Robust Time Parsing**: Handles complex time notations, including overnight hours (e.g., `19:00-02:00`) and last-order (`L.O.`) times.
-   **Detailed Listings**: View each spot's category, address, hours, price range, seating, and a direct link to Google Maps.
-   **Table View**: A filterable and sortable table of all locations is available below the map.

## Technical Overview

This project is a static web application built with standard HTML, CSS, and JavaScript modules. It does not require a backend.

### Data Pipeline

The data is sourced from [fukui-night.com](https://fukui-night.com/). It is generated and processed using Deno scripts in a two-step pipeline:

1.  **`download.js`**: Scrapes establishment details (name, address, hours, etc.) from the source website into `fukui-night.csv`.
2.  **`addlatlng.js`**: Reads the intermediate CSV, resolves Google Maps URLs to latitude/longitude coordinates using `getLatLngFromGMap.js`, and writes the final `fukui-night_pos.csv` used by the application.

To regenerate the data, run the scripts:
```bash
deno run -A download.js
deno run -A addlatlng.js
```

## License

MIT License — see [LICENSE](LICENSE).