

document.getElementById("search-btn").addEventListener("click", function () {
    let city = document.getElementById("city-input").value.trim();
    if (city) fetchWeather(city);
    console.log(city);
});

function fetchWeather(city) {
    fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }).then( data => updateWeather(data)).catch(error => showError(error));
}

function updateWeather(data){
 document.getElementById("weather-city").textContent = data.name;
 document.getElementById("weather-temp").textContent = data.main.temp;
 document.getElementById("weather-desc").textContent = data.weather[0].description;
 document.getElementById("weather-humidity").textContent = data.main.humidity;
}

function showError(error){
    document.getElementById("weather-city").textContent = "Error";
    document.getElementById("weather-temp").textContent = "";
    document.getElementById("weather-desc").textContent = "";
    document.getElementById("weather-humidity").textContent = "";
}