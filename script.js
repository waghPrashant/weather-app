const apiKey = "21dadbaab79f6d304104f83b62b25b31"; // Replace with your actual OpenWeather API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const result = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>🌡️ Temp: ${data.main.temp}°C</p>
          <p>🌥️ ${data.weather[0].description}</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬️ Wind: ${data.wind.speed} m/s</p>
        `;
        document.getElementById("weatherResult").innerHTML = result;
      } else {
        document.getElementById("weatherResult").innerHTML = "City not found.";
      }
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = "Error fetching data.";
    });
}

