function searchCity(city) {
  let key = "1989ce48f0ddeb9155d07cad2fe7cac2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity.value}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function convertFahrenheitTemperature(event) {
  event.preventDefault();
  //remove the link effect on fahrenheit
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  //convert fahrenheit by selecting the fahrenheit id and changing the day temperature
  let fahrenheitTemperature = (celciusTemp + 9) / 5 + 32;
  let degreeElement = document.querySelector("#dayGrad");
  degreeElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelciusTemperature(event) {
  event.preventDefault();
  //remove the link effect on celcius
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  //convert celcius by selecting the celcius id and changing the day temperature
  let celciusTemperature = document.querySelector("#dayGrad");
  celciusTemperature.innerHTML = Math.round(celciusTemperature);
}
let celciusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheitDay");
fahrenheitLink.addEventListener("click", convertFahrenheitTemperature);

let celciusLink = document.querySelector("#celciusDay");
celciusLink.addEventListener("click", convertCelciusTemperature);

function displayDate(timestamp) {
  //this function will return the current date and month
  //voir ci cette partie block le code

  let today = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
  let day = days[today.getDay()];
  let date = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  if (hours < 10 && minutes < 10) {
    hours = `0${hours} `;
    minutes = `0${minutes}`;
  }
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Juni",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "Dezember",
  ];
  let month = months[date.getMonth()];
  let newDate = document.querySelector("#currentdate");

  newDate.innerHTML = `${day} ${date} ${month} `;
}
function showTemperature(response) {
  let degrees = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#dayGrad");
  currentTemperature.innerHTML = `${degrees}`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = `Precipitation: ${precipitation.value}%`;
  let dateElement = document.querySelector("#currentDate");
  dateElement.innerHTML = displayDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("description");

  //change the value of icon attribute to...
  iconElement.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  //change the value of description attribute to...
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayCity(event) {
  event.preventDefault();
  displayDate();
  let cityElement = document.querySelector("#enterCity");
  let newCity = document.querySelector("#cityInput");

  if (cityElement.value.length >= 3) {
    newCity.innerHTML = `${cityElement.value} ${hours}:${minutes}`;
    searchCity(cityElement.value);
  } else {
    alert(` please enter a city`);
  }
}

let citynames = document.querySelector("#citiesTemperature");
citynames.addEventListener("submit", displayCity);
