function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  celciusTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;

  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let dateTimeElement = document.querySelector("#dateTime");
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);

  let mainIconElement = document.querySelector("#mainIcon");
  mainIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIconElement.setAttribute("alt", response.data.weather[0].main);
}
function search(city) {
  let apiKey = "7a9230f00d808688d0e6dca4ff6ca11d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let unitElement = document.querySelector("#degree-unit");
  search(cityInputElement.value);
  unitSwitcher.checked = false;
  unitElement.innerHTML = "°C";
}

function displayFahreinheitTemperature(event) {
  event.preventDefault();
  let fahreinheitTemperature = Math.round(celciusTemperature * 1.8 + 32);
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("inactiveLink");
  fahreinheitLink.classList.add("inactiveLink");

  temperatureElement.innerHTML = fahreinheitTemperature;
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  fahreinheitLink.classList.remove("inactiveLink");
  celciusLink.classList.add("inactiveLink");
}

function switchUnits(event) {
  let temperatureElement = document.querySelector("#temperature");
  let unitElement = document.querySelector("#degree-unit");
  let fahreinheitTemperature = Math.round(celciusTemperature * 1.8 + 32);

  if (unitSwitcher.checked) {
    temperatureElement.innerHTML = fahreinheitTemperature;
    unitElement.innerHTML = "°F";
  } else {
    temperatureElement.innerHTML = Math.round(celciusTemperature);
    unitElement.innerHTML = "°C";
  }
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahreinheitLink = document.querySelector("#fahreinheit-link");
fahreinheitLink.addEventListener("click", displayFahreinheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("London");

let unitSwitcher = document.querySelector("#unitswitcher");
unitSwitcher.addEventListener("change", switchUnits);
