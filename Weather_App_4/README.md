# 🌤️ PyQt5 Weather App

A modern desktop weather application built with **Python** and **PyQt5**. Users can enter a city name and instantly get the current weather, temperature in °C and °F, a representative emoji, and a descriptive text—all with robust error handling.

---

## 📂 Project Structure

```
Weather_App_4/
├── Weather_App.py   # Main PyQt5 app script
├── weather_icon.png # Window icon
└── README.md        # You’re viewing it!
```

---

## 🚀 Getting Started

### Requirements

- Python 3.x  
- PyQt5 and requests:
  ```bash
  pip install PyQt5
  pip install requests

---

### 🚀 Run the App

```bash
python Weather App.py
```
Enter a city and click GetWeather — results will display below with emoji and temperature.

---

### 🎯 Key Features

- **Enter city name** and fetch real-time data from OpenWeatherMap  
- Displays both **°C and °F** temperatures side-by-side  
- Shows a matching **emoji icon** based on weather conditions  
- **Full error handling**: invalid city, connection issues, API key errors, etc.  
- Modern, styled UI using PyQt5 **StyleSheet syntax** for clarity and visibility  

---

### 🧩 How It Works

1. **UI Setup**  
   Uses `QLabel`, `QLineEdit`, and `QPushButton` arranged in a vertical layout for easy interaction.  
   (QLineEdit is the standard one-line text input widget in PyQt5)

2. **API Call & Error Handling**  
   - Uses `requests.get()` to fetch data from the OpenWeatherMap API  
   - Implements thorough exception handling for HTTP errors and network issues, including `HTTPError`, `ConnectionError`, `Timeout`, and more

3. **Displaying Results**  
   - Converts temperature from Kelvin to **°C** and **°F**  
   - Selects a weather emoji based on `weather_id` via `get_weather_emoji(weather_id)`  
   - Updates PyQt widgets (`QLabel`) with the temperature, emoji, and description

4. **Styling**  
   - Applies consistent styling using `setStyleSheet()` and widget `objectName` for selectors  
   - Uses `Segoe UI Emoji` font on the emoji label for crisp icon display

---

## 📫 Contact

- **GitHub**: [@Mithun0017](https://github.com/Mithun0017)  
- **Email**: [mithun200617@gmail.com](mailto:mithun200617@gmail.com)

---

## 📝 Summary

> A user-friendly PyQt5 weather desktop app featuring real-time API calls, dynamic UI design, and robust error handling—ideal for exploring GUI architecture, HTTP requests, and Python desktop development.

---
