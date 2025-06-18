# 🌤️ Weather App

A feature-rich, responsive weather application built with **HTML**, **CSS**, **vanilla JS**, and **Chart.js**. It supports unit toggling (°C/°F), automatic geolocation lookups, and displays a 5-day forecast graph.

---

## 🚀 Features

- **City search** via input box  
- **Unit toggle** (°C ↔ °F)  
- **Auto geolocation** on initial load  
- Displays **current weather**: temperature, “feels like”, humidity, wind, pressure, sunrise/sunset, and local time  
- Shows **5-day forecast** with cards and interactive Chart.js line graph  
- Sleek, dark card-based UI with responsive design :contentReference[oaicite:1]{index=1}

---

## 🛠️ How It Works

1. **Geolocation & City Search**  
   - Automatically determines the user's city using the browser’s geolocation API on page load.  
   - The “Search” button allows manual input for any desired city.

2. **Unit Toggle (°C / °F)**  
   - A responsive toggle switch lets users switch between metric (°C, km/h) and imperial (°F, mph) units.  
   - Switching units triggers new API requests and refreshes both current weather and forecast data.

3. **Current Weather Display**  
   - Fetches data from the OpenWeatherMap `/weather` endpoint.  
   - Updates the UI with city name, temperature, “feels like,” humidity, wind speed, pressure, sunrise/sunset times, and local time.  
   - Dynamically displays the correct weather icon based on `iconCode`.

4. **5‑Day Forecast + Chart**  
   - Uses the `/forecast` endpoint to retrieve 5-day weather data at 12:00 PM.  
   - Renders forecast cards and a responsive Chart.js line graph showing daily temperatures. :contentReference[oaicite:0]{index=0}

5. **Responsive UI Updates**  
   - Cards (`#weatherCard`) and forecast section (`#forecastContainer`) are hidden until data loads.  
   - Error handling alerts the user if the city is not found, via `alert()` or the UI.

6. **Chart.js Integration**  
   - Loads Chart.js via CDN for ease and performance. :contentReference[oaicite:1]{index=1}  
   - Initializes or updates the chart each time forecast data is refreshed, ensuring accurate visuals.

7. **Time Formatting Utility**  
   - Converts UNIX timestamps and timezone offsets to local “HH:MM” format for sunrise and sunset display.

---
