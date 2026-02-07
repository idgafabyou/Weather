const apiKey = "73e575d199c278805c89e3fbe7f81ef3";

// Auto detect location
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            () => {
                console.log("Location denied");
            }
        );
    }
};

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Enter city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

async function getWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (response.status !== 200) {
            alert(data.message);
            return;
        }

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

    } catch (error) {
        console.error(error);
        alert("Network error or CORS issue");
    }
}
