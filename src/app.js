let celciusTemp = null
let fahrenheitTemperature = null

let degreeElement = document.querySelector("#dayGrad")

function searchForCity (city) {
	let key = "1989ce48f0ddeb9155d07cad2fe7cac2"
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${ key }&units=metric`

	window.axios.get(apiUrl).then(({ data }) => {
		displayDate()
		showTemperature(data)
	}).catch((e) => {
		console.error(e)
		alert(`Couldn’t get weather data for city ${ city }`)
	})
}

function convertFahrenheitTemperature (event) {
	event.preventDefault()

	//remove the link effect on fahrenheit
	fahrenheitLink.classList.add("active")
	celciusLink.classList.remove("active")

	//convert fahrenheit by selecting the fahrenheit id and changing the day temperature
	let fahrenheitTemperature = ( celciusTemp + 9 ) / 5 + 32
	degreeElement.innerHTML = Math.round(fahrenheitTemperature)
}

function convertCelciusTemperature (event) {
	event.preventDefault()

	//remove the link effect on celcius
	celciusLink.classList.add("active")
	fahrenheitLink.classList.remove("active")

	//convert celcius by selecting the celcius id and changing the day temperature
	let celciusConversion = ( fahrenheitTemperature - 32 ) / 1.8
	degreeElement.innerHTML = Math.round(celciusConversion)
}

let fahrenheitLink = document.querySelector("#fahrenheitDay")
fahrenheitLink.addEventListener("click", convertFahrenheitTemperature)

let celciusLink = document.querySelector("#celciusDay")
celciusLink.addEventListener("click", convertCelciusTemperature)

function displayDate (dateString) {
	let newDate = document.querySelector("#currentDate")

	if (dateString) {
		date = new Date(dateString)
	} else {
		date = new Date()
	}

	newDate.innerHTML = date.toLocaleDateString('en-EN', {
		weekday: "short",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	})
}

function showTemperature (weatherData) {
	console.log(weatherData)

	let degrees = Math.round(weatherData.main.temp)
	degreeElement.innerHTML = `${ degrees }`

	let windElement = document.querySelector("#wind")
	windElement.innerHTML = `Wind: ${ Math.round(weatherData.wind.speed) } km/h`

	let humidityElement = document.querySelector("#humidity")
	humidityElement.innerHTML = `Humidity: ${ weatherData.main.humidity }%`

	let precipitationElement = document.querySelector("#precipitation")
	precipitationElement.innerHTML = `Precipitation: ${ precipitation.value }%`

	displayDate(weatherData.dt * 1000)

	let iconElement = document.querySelector("#icon")

	//change the value of icon attribute to...
	iconElement.setAttribute(
		"src",
		` https://openweathermap.org/img/wn/${ weatherData.weather[0].icon }.png`,
	)

	let descriptionElement = document.querySelector("#description")
	descriptionElement.innerHTML = weatherData.weather[0].description
}

function submitWeatherForm (event) {
	event.preventDefault()

	const today = new Date()

	let hours = today.getHours()
	let minutes = today.getMinutes()
	if (hours < 10 && minutes < 10) {
		hours = `0${ hours } `
		minutes = `0${ minutes }`
	}

	let cityInput = document.querySelector("#enterCity")
	let newCity = document.querySelector("#cityInput")

	if (cityInput.value.length >= 3) {
		newCity.innerHTML = `${ cityInput.value }  ${ hours }:${ minutes }`
		searchForCity(cityInput.value)
	} else {
		alert(`Please enter a city …`)
	}

	return false;
}

let weatherForm = document.querySelector("#weatherForm")
weatherForm.addEventListener("submit", submitWeatherForm)
