const apiKey = "b917f40f9aa94a699c4172224260702";

// Auto detect location
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeatherByCoords(position.coords.latitude, position.coords.longitude);
        });
    }
};

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Enter city name");

    fetchWeather(city);
}

async function getWeatherByCoords(lat, lon) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&aqi=no`
    );
    const data = await response.json();
    displayWeather(data);
}

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no`
        );

        const data = await response.json();

        if (data.error) {
            alert(data.error.message);
            return;
        }

        displayWeather(data);

    } catch {
        alert("Network error");
    }
}

function displayWeather(data) {
    document.getElementById("location").textContent =
        `${data.location.name}, ${data.location.country}`;

    document.getElementById("temp").textContent =
        `${data.current.temp_c}°C`;

    document.getElementById("condition").textContent =
        data.current.condition.text;

    document.getElementById("icon").src =
        "https:" + data.current.condition.icon;

    document.getElementById("currentWeather").classList.remove("hidden");

    // Forecast
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    data.forecast.forecastday.forEach(day => {
        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <p>${new Date(day.date).toLocaleDateString()}</p>
            <img src="https:${day.day.condition.icon}">
            <p>${day.day.avgtemp_c}°C</p>
        `;

        forecastDiv.appendChild(card);
    });
}
