function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML = `${temperature}`;
  let precipitation = response.data.main.humidity;
  let precipitationToday = document.querySelector("#precipitation-today");
  precipitationToday.innerHTML = `${precipitation}`;
  let pressure = response.data.main.pressure;
  let pressureToday = document.querySelector("#pressure-today");
  pressureToday.innerHTML = `${pressure}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedToday = document.querySelector("#wind-speed-today");
  windSpeedToday.innerHTML = `${windSpeed}`;
}

let city = "Kyiv";
let searchCity = document.querySelector("#search-city");
searchCity.innerHTML = `${city}`;
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);

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

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayToday = days[dateToday.getDay()];

let today = document.querySelector("#date-today");
today.innerHTML = dayToday + " " + dataToday + "." + monthToday + "." + yearToday;

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
