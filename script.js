
const apiKey = "YOUR_API_KEY";

// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const error = document.getElementById("error");

const weatherResult = document.getElementById("weatherResult");

// Fetch Weather
async function getWeather(city) {

    if (city === "") {
        error.innerHTML = "⚠ Please enter a city name.";
        return;
    }

    error.innerHTML = "Loading...";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        console.log(data);

        cityName.textContent = `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            `${data.weather[0].main}
Feels Like: ${Math.round(data.main.feels_like)}°C`;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${data.wind.speed} km/h`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        weatherIcon.alt =
            data.weather[0].description;

        error.innerHTML = "";

    }
    catch (err) {

        cityName.textContent = "--";
        temperature.textContent = "--°C";
        description.textContent = "--";
        humidity.textContent = "--%";
        wind.textContent = "-- km/h";
        weatherIcon.src = "";

        error.innerHTML =
            "❌ City not found or API key is invalid.";

    }

}

// Search Button
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    getWeather(city);

});

// Press Enter
cityInput.addEventListener("keyup", function(event){

    if(event.key === "Enter"){
        getWeather(cityInput.value.trim());
    }

});

// Default City
window.onload = function(){

    getWeather("Delhi");

};