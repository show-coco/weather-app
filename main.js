fetchWeather();
setDate();

const button = document.querySelector("#button");
button.addEventListener("click", fetchWeather);

function fetchWeather() {
    const location = getLocation();
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ encodeURIComponent(location)}&appid=155ffaf697d6471bec1bcc79bda4c6ac`)
    .then( response => {
        if(response.ok) {
            response.json().then( info => {
                console.log(info);
                setTodayInfo(info);
            })
            return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${ encodeURIComponent(location)}&APPID=155ffaf697d6471bec1bcc79bda4c6ac`)
        }
    }).then( response => {
        if(response.ok) {
            response.json().then( info => {
                console.log(info);
                setForecastInfo(info);
            })
        }
    }) .catch( error => {
        console.error(error);
    })
}

function getLocation() {
    return document.querySelector("#location").value
}

function setTodayInfo(info) {
    document.querySelector(".weather-card__location__text").textContent = info.name.toUpperCase();
    document.querySelector(".weather-card__temperature").textContent = calcTemp(info.main.temp);
    document.querySelector(".weather-card__box__humidity__value").textContent = info.main.humidity + "%";
    document.querySelector(".weather-card__box__wind__value").textContent = Math.round(info.wind.speed) + " K/M";
}

function setForecastInfo(info) {
    const hour1 = info.list[0];
    document.querySelector(".weather-card__bottom__forecast__1hour__temp").textContent = calcTemp(hour1.main.temp);
    document.querySelector(".weather-card__bottom__forecast__1hour__weather").textContent = hour1.weather[0].main;
}

function calcTemp(temp) {
    return Math.round(temp-273.15) + " °";
}

function setDate() {
    const today = new Date();
    document.querySelector(".date__day-of-the-week").textContent = getWeekDay(today);
    document.querySelector(".date__day-and-month").textContent = `, ${today.getDate()}th ${getMonth(today)}`;
}

function getWeekDay(today) {
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekDayNum = today.getDay();
    return weekDay[weekDayNum];
}

function getMonth(today) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Ovtober", "November", "December"];
    const monthNum = today.getMonth();
    return month[monthNum];
}