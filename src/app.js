let key = "6bc1680dd34806c7841222011879a9e8";
let city = "Berlin";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

function convertFahrenheitTemperature(event) {
  event.preventDefault();
  //remove the link effect on fahrenheit
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  //convert fahrenheit by selecting the fahrenheit id
  let fahrenheitTemperature = (celciusTemp + 9) / 5 + 32;
  let degreeElement = document.querySelector("#dayGrad");
  degreeElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelciusTemperature(event) {
  event.preventDefault();
  //remove the link effect on celcius
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  //convert celcius by selecting the celcius id
  let celciusTemperature = document.querySelector("#dayGrad");
  celciusTemperature.innerHTML = Math.round(celciusTemperature);
}
let celciusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheitDay");
fahrenheitLink.addEventListener("click", convertFahrenheitTemperature);

let celciusLink = document.querySelector("#celciusDay");
celciusLink.addEventListener("click", convertCelciusTemperature);
