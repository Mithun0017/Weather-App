# 🌤️ Weather App

A modern, responsive web app that fetches **real-time weather and 5-day forecast** data from OpenWeatherMap API using HTML, CSS, and vanilla JavaScript.

---

## 🔍 Features

- 🌆 **City-based search**: Enter any city to retrieve current weather and forecast.
- 📅 **5-day forecast**: Displays daily weather at 12:00 PM for the next 5 days.
- 🌠 **Weather icons**: Visually expressive emoji-based weather conditions.
- 📱 **Responsive design**: Works well across desktop and mobile devices.
- ⚠️ **Error handling**: Friendly feedback when city is not found or input is empty.

---

## 🧩 How It Works

1. User submits a city name through the form.
2. JavaScript fetches:
   - Current weather (`/weather` endpoint)
   - Forecast data (`/forecast` endpoint)
3. Data is parsed and displayed in styled `.card` and `.forecast-container` elements.
4. Appropriate weather emojis are shown based on conditions (using `getWeatherEmoji(id)`).
5. Errors like invalid input or API issues are handled gracefully.

---

## 💻 Built With

| Layer        | Technologies                        |
|--------------|-------------------------------------|
| **HTML5**     | Semantic structure and form elements |
| **CSS3**      | Gradient background and card styles |
| **JavaScript**| Fetch API, DOM updates, async/await |
| **API**       | OpenWeatherMap (current + forecast) |

---

## 🚀 Getting Started

### Prerequisites

- A browser (Chrome, Firefox, Edge, etc.)
- OpenWeatherMap API key (sign up for free)

---
