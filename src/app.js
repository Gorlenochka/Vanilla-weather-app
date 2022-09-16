//Date and time

let dateToday = new Date();
let yearToday = dateToday.getFullYear();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let monthToday = months[dateToday.getMonth()];

let dataToday = dateToday.getDate();
if (dataToday < "10") {
  dataToday = `0${dataToday}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayToday = days[dateToday.getDay()];

let today = document.querySelector("#date-today");
today.innerHTML =
  dayToday + " " + dataToday + "." + monthToday + "." + yearToday;

let hour = dateToday.getHours();
if (hour < "10") {
  hour = `0${hour}`;
}

let min = dateToday.getMinutes();
if (min < "10") {
  min = `0${min}`;
}

let currentTime = document.querySelector("#time");
currentTime.innerHTML = hour + "." + min;

// forecast table

function formatweekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let data = date.getDate();
  if (data < "10") {
    data = `0${data}`;
  }
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let weekdaydata = data + "." + month + "." + year;
  return weekdaydata;
}

function displayForecast(response) {
  let forecastDays = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = "";

  forecastDays.forEach(function (forecastDay, index) {
    if (index < 7) {
      let forecastDayTempMax = Math.round(forecastDay.temp.max);
      let forecastDayTempMin = Math.round(forecastDay.temp.min);
      forecastHTML =
        forecastHTML +
        `
<tr>
          <th scope="row" class="weekday">${formatweekDay(forecastDay.dt)}</th>
          <td class="weekday-date">${formatDay(forecastDay.dt)}</td>
          <td class="temperature-weekday-max">${forecastDayTempMax}<sup>°С</sup></td>
          <td class="temperature-weekday-min">${forecastDayTempMin}<sup>°С</sup></td>
          <td>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="${forecastDay.weather[0].description}"
              class="image-weather-weekday"
            />
          </td>
          <td class="description-weather-weekday">${
            forecastDay.weather[0].description
          }</td>
        </tr>`;
    }
  });

  forecast.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

// Search

function getForecast(coordinates) {
  let apiKey = "4988ef9330d1f4546a10355cfd9c0b6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML = `${temperature}`;
  temperatureCelsius = Math.round(response.data.main.temp);
  let searchCity = document.querySelector("#search-city");
  searchCity.innerHTML = response.data.name;
  let precipitation = response.data.main.humidity;
  let precipitationToday = document.querySelector("#precipitation-today");
  precipitationToday.innerHTML = `${precipitation}`;
  let pressure = response.data.main.pressure;
  let pressureToday = document.querySelector("#pressure-today");
  pressureToday.innerHTML = `${pressure}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedToday = document.querySelector("#wind-speed-today");
  windSpeedToday.innerHTML = `${windSpeed}`;
  let icon = document.querySelector("#image-weather-today");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4988ef9330d1f4546a10355cfd9c0b6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchClick(event) {
  event.preventDefault();
  let searchInputValue = document.querySelector("#search-a-city");
  search(searchInputValue.value);
}

/* Celsius-Fahrenheit

function fahrenheit(event) {
  event.preventDefault();
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
  let temperatureToday = document.querySelector("#temperature");
  let temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
  temperatureToday.innerHTML = Math.round(temperatureFahrenheit);
 }

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML = temperatureCelsius;
}

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click", celsius);
let temperatureCelsius = null;
*/

let searchForm = document.querySelector("#go");
searchForm.addEventListener("click", searchClick);

search("Sumy");

// Current Position

function showPosition(position) {
  let currentPosition = position.data.city;
  let currentCity = document.querySelector("#search-city");
  currentCity.innerHTML = `${currentPosition}`;
  let apiKey = "4988ef9330d1f4546a10355cfd9c0b6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentPosition}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function current(event) {
  event.preventDefault();
  let apiKeyPosition = "d802faa0-10bd-11ec-b2fe-47a0872c6708";
  let apiUrlPosition = `https://geolocation-db.com/json/${apiKeyPosition}`;
  axios.get(apiUrlPosition).then(showPosition);
}

let currentForm = document.querySelector("#current");
currentForm.addEventListener("click", current);
