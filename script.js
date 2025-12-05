const ApiKey = '113c255fbd22fdaddd52596edc7145c5';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
    let city = document.getElementById("city").value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    // URL with city & API key 
    let url = `${ApiUrl}?q=${city}&appid=${ApiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod === 404) {
            alert("City not found!");
            return;
        }
        //  show weather info
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = data.main.temp + "°C";
        document.getElementById("condition").innerText = data.weather[0].description;

        // show weather icon img
        let iconCode = data.weather[0].icon;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Show result box 
        document.getElementById("result").classList.remove("hide");

    } catch (error) {
        alert("Error. Check your internet or API key...");
        console.error(error);
    }
}
// on Enter key press
document.getElementById("city").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();   // Call the function
    }
});
