const apiKey = "3d674e400c8ffdd53f724ff55e3dd165";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const unitToggle = document.getElementById("unitToggle");

let currentUnit = "metric"; // 'metric' = °C, 'imperial' = °F
let chart; // For Chart.js

// Event Listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    getForecast(city);
  }
});

unitToggle.addEventListener("change", () => {
  currentUnit = unitToggle.checked ? "imperial" : "metric";
  const city = document.getElementById("cityName").textContent.split(",")[0];
  if (city) {
    getWeather(city);
    getForecast(city);
  }
});

// Auto geolocation on load
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const city = await getCityByCoords(lat, lon);
        if (city) {
          getWeather(city);
          getForecast(city);
        }
      },
      (err) => console.error("Geolocation denied.")
    );
  }
});

// Fetch city name using reverse geocoding
async function getCityByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.name;
}

// Fetch current weather
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}`;
  const res = await fetch(url);
  if (!res.ok) return alert("City not found");
  const data = await res.json();
  updateCurrentWeather(data);
}

// Fetch 5-day forecast
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${currentUnit}`;
  const res = await fetch(url);
  if (!res.ok) return;
  const data = await res.json();
  updateForecast(data);
}

// Update current weather card
function updateCurrentWeather(data) {
  document.getElementById("weatherCard").classList.remove("hidden");

  const unitSymbol = currentUnit === "imperial" ? "°F" : "°C";

  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}${unitSymbol}`;
  document.getElementById("feelsLike").textContent = `Feels like ${Math.round(data.main.feels_like)}${unitSymbol}`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
  document.getElementById("wind").textContent = `${data.wind.speed} ${currentUnit === "imperial" ? "mph" : "km/h"}`;
  document.getElementById("description").textContent = data.weather[0].main;

  const iconCode = data.weather[0].icon;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const timezoneOffset = data.timezone * 1000;
  const localTime = new Date(Date.now() + timezoneOffset - new Date().getTimezoneOffset() * 60000);
  document.getElementById("localTime").textContent = `Local time: ${localTime.toLocaleTimeString()}`;

  document.getElementById("sunrise").textContent = formatUnixTime(data.sys.sunrise + data.timezone);
  document.getElementById("sunset").textContent = formatUnixTime(data.sys.sunset + data.timezone);
}

// Update 5-day forecast and render chart
function updateForecast(data) {
  const forecastContainer = document.getElementById("forecastContainer");
  const forecastCards = document.getElementById("forecastCards");
  const ctx = document.getElementById("forecastChart").getContext("2d");
  const unitSymbol = currentUnit === "imperial" ? "°F" : "°C";

  forecastContainer.classList.remove("hidden");
  forecastCards.innerHTML = "";

  const daily = data.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 5);
  const labels = [];
  const temps = [];

  daily.forEach(day => {
    const date = new Date(day.dt_txt);
    labels.push(date.toLocaleDateString(undefined, { weekday: "short" }));
    temps.push(Math.round(day.main.temp));

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <h4>${labels[labels.length - 1]}</h4>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
      <p>${Math.round(day.main.temp)}${unitSymbol}</p>
    `;
    forecastCards.appendChild(card);
  });

  // Draw chart
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `5-Day Forecast (${unitSymbol})`,
        data: temps,
        fill: false,
        borderColor: '#00c6ff',
        backgroundColor: '#00c6ff',
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#fff"
          }
        }
      }
    }
  });
}

// Format UNIX timestamp to readable time
function formatUnixTime(unix) {
  const date = new Date(unix * 1000);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  });
}
