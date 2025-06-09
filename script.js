const apiKey = "21dadbaab79f6d304104f83b62b25b31"; // Replace with your OpenWeather API key

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
        getForecast(data.coord.lat, data.coord.lon);
      } else {
        document.getElementById("weatherResult").innerHTML = "City not found.";
      }
    });
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          displayWeather(data);
          getForecast(lat, lon);
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function displayWeather(data) {
  const html = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>🌥️ ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind: ${data.wind.speed} m/s</p>
  `;
  document.getElementById("weatherResult").innerHTML = html;
}

function getForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let forecastHTML = "<h3>7-Day Forecast:</h3>";
      data.daily.slice(0, 7).forEach(day => {
        const date = new Date(day.dt * 1000).toDateString();
        forecastHTML += `
          <p><strong>${date}</strong>: 🌡️ ${day.temp.day}°C, ${day.weather[0].description}</p>
        `;
      });
      document.getElementById("forecastResult").innerHTML = forecastHTML;
    });
}