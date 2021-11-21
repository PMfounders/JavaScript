var temperature = document.getElementById("temperature")
var feels_like = document.getElementById("feels_like")
var humidity = document.getElementById("humidity")
var wind = document.getElementById("wind")
var city = document.getElementById("city")
var characteristic = document.getElementById("characteristic")

var button = document.getElementById("get_data")

var temperature2 = document.getElementById("temperature2")
var feels_like2 = document.getElementById("feels_like2")
var humidity2 = document.getElementById("humidity2")
var wind2 = document.getElementById("wind2")
var characteristic2 = document.getElementById("characteristic2")

var buttonCity = document.getElementById("get_city_data")

function getLocationCoords() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            getWeatherData(position.coords.latitude, position.coords.longitude);
        })
    } else {
        alert('Your browser does not support Navigator API');
    }
}

function getWeatherData(latitude, longitude) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid='+'048f9f9f87c13d05edb008caed3990a0')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
       displayData(data);
       //console.log(data);
    });
      
}

function kToC(degree) {
    return Math.round(degree - 273)
}

function displayData(data) {
    city.innerHTML = "City/town: " + data.name
    temperature.innerHTML = 'Temperature: ' + kToC(data.main.temp) + '°C'
    feels_like.innerHTML = "Feels like: " + kToC(data.main.feels_like) + '°C' 
    humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
    wind.innerHTML = "Wind speed: " + data.wind.speed + ' m/s'
    characteristic.innerHTML = "Description: " + data.weather[0].description
}

button.addEventListener('click', getLocationCoords)

function getWeatherDataByCity() {
    var cityName = document.getElementById("cityName").value
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&appid=" + '048f9f9f87c13d05edb008caed3990a0')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
       displayDataCity(data);
       //console.log(data);
    }); 
}

function displayDataCity(data) {
    temperature2.innerHTML = 'Temperature: ' + kToC(data.main.temp) + '°C'
    feels_like2.innerHTML = "Feels like: " + kToC(data.main.feels_like) + '°C' 
    humidity2.innerHTML = "Humidity: " + data.main.humidity + "%"
    wind2.innerHTML = "Wind speed: " + data.wind.speed + ' m/s'
    characteristic2.innerHTML = "Description: " + data.weather[0].description
}

buttonCity.addEventListener("click", getWeatherDataByCity)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition

var cityName = document.getElementById("cityName")
var buttonRecord = document.getElementById("voice_record")

recognition.onresult = function (event) {
    cityName.value = Array.from(event.results).map(function (result) {
        return result[0]
    })
    .map(function (result) {
        //console.log(result.transcript);
        return result.transcript
    })
    if (event.results[0].isFinal) {
        p = document.createElement('p')
    }
}

function startButton(event) {
    final_transcript = '';
    recognition.lang = 'en';
    recognition.start();
}

recognition.start()
buttonRecord.addEventListener('click', startButton)
//recognition.addEventListener('end', recognition.start)