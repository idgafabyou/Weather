const apiKey = "b917f40f9aa94a699c4172224260702";

// Show current date & time
function updateDateTime() {
    const now = new Date();
    document.getElementById("dateTime").textContent =
        now.toLocaleDateString() + " • " + now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Auto detect user location on load
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeatherByCoords(position.coords.latitude, position.coords.longitude);
        });
    }
};

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Enter city name");

    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
}

async function getWeatherByCoords(lat, lon) {
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error");

        const data = await response.json();

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("weatherCard").classList.remove("hidden");

        changeBackground(data.weather[0].main);

    } catch (error) {
        alert("City not found or API error");
    }
}

// Change background based on weather
function changeBackground(weather) {
    const body = document.body;

    if (weather.includes("Cloud")) {
        body.style.background = "linear-gradient(135deg, #757F9A, #D7DDE8)";
    } else if (weather.includes("Rain")) {
        body.style.background = "linear-gradient(135deg, #314755, #26a0da)";
    } else if (weather.includes("Clear")) {
        body.style.background = "linear-gradient(135deg, #f7971e, #ffd200)";
    } else {
        body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    }
}
