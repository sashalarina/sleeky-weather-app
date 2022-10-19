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
function displayFutureForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
            <div class="col-3">
              <strong>${day}</strong>
              <img
                src="https://openweathermap.org/img/wn/04d@2x.png"
                alt=""
                width="60px"
                class="forecast-icon"
              />
              <div class="forecast-temperature">
                <span class="forecast-temp-max">18° </span>
                <span class="forecast-temp-min">12°</span>
              </div>
            </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
  search(cityInputElement.value);
  let unitElement = document.querySelector("#degree-unit");
  unitSwitcher.checked = false;
  unitElement.innerHTML = "°C";
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

search("London");

displayFutureForecast();

let unitSwitcher = document.querySelector("#unitswitcher");
unitSwitcher.addEventListener("change", switchUnits);
