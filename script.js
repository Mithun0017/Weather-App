const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const forecastContainer = document.querySelector(".forecast-container");
const apiKey = "3d674e400c8ffdd53f724ff55e3dd165";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      const forecastData = await getForecastData(city);
      displayWeatherInfo(weatherData);
      displayForecast(forecastData);
    } catch (error) {
      console.error(error);
      displayError("City not found or API error.");
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Could not fetch weather data");
  return await response.json();
}

async function getForecastData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Could not fetch forecast data");
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data;

  card.textContent = '';
  card.style.display = 'flex';

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.append(cityDisplay, tempDisplay, humidityDisplay, descDisplay, weatherEmoji);
}

function displayForecast(forecastData) {
  forecastContainer.textContent = '';
  forecastContainer.style.display = 'flex';

  const dailyData = [];
  forecastData.list.forEach(item => {
    if (item.dt_txt.includes("12:00:00")) {
      dailyData.push(item);
    }
  });

  dailyData.slice(0, 5).forEach(day => {
    const date = new Date(day.dt_txt);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = `${(day.main.temp - 273.15).toFixed(1)}°C`;
    const desc = day.weather[0].description;
    const emoji = getWeatherEmoji(day.weather[0].id);

    const card = document.createElement("div");
    card.classList.add("forecast-card");
    card.innerHTML = `
      <h3>${weekday}</h3>
      <p class="weatherEmoji">${emoji}</p>
      <p>${temp}</p>
      <p style="font-size: 0.9rem">${desc}</p>
    `;
    forecastContainer.appendChild(card);
  });
}

function getWeatherEmoji(id) {
  if (id >= 200 && id < 300) return "⛈️";
  if (id >= 300 && id < 500) return "🌦️";
  if (id >= 500 && id < 600) return "🌧️";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫️";
  if (id === 800) return "☀️";
  if (id > 800) return "☁️";
  return "❓";
}

function displayError(message) {
  card.textContent = '';
  forecastContainer.textContent = '';
  card.style.display = 'flex';
  forecastContainer.style.display = 'none';

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.appendChild(errorDisplay);
}
