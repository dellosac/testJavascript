function showweatherDetails(event) {
    event.preventDefault();

    const city = document.getElementById("city").value.trim();
    const apiKey = "fc0a8c142fb7ca6e5f15eb6a021daac2";
    const apiGeocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    // Get latitude and longitude using Geocode API
    fetch(apiGeocodeUrl)
        // Get the response and use it as JSON
        .then((response) => response.json())
        .then((data) => {
            // Error checking
            if (!data.length) {
                console.log("City not found.");
                return;
            }

            // Create const for lat and lon using Geocode API data
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Build weather API URL *after* coordinates are available
            const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

            // Step 2: Get weather
            return fetch(apiWeatherUrl);
        })
        .then((response) => response.json())
        .then((weatherData) => {
            console.log("Weather data:", weatherData);
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = `<h2>Weather in ${weatherData.name}</h2>
                                  <p>Temperature: ${weatherData.main.temp} &#8457;</p>
                                  <p>Weather: ${weatherData.weather[0].description}</p>`;
        })
        .catch((error) => {
            console.error("Error fetching weather:", error);
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
        });
}

document
    .getElementById("weatherForm")
    .addEventListener("submit", showweatherDetails);
