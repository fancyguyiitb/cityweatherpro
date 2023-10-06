const apiKey = "7e1e9aaa960f0212960091fe7467ab00";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

console.log("hi");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); //when using class name, we add a dot

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block"; //handling error of wrong city name
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
    }
    document.querySelector(".weather").style.display = "block";
    //doesn't show any data until we enter some correct city name first
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
