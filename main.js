fetchWeather();
setDate();

const button = document.querySelector(".fa");
button.addEventListener("click", fetchWeather);

const form = document.querySelector(".main-container__search__form");
form.addEventListener("submit", function(evt) {
    fetchWeather(evt);
});

function fetchWeather(evt="") {
    const location = getLocation();
    fetch(`//api.openweathermap.org/data/2.5/weather?q=${ encodeURIComponent(location)}&appid=155ffaf697d6471bec1bcc79bda4c6ac`)
    .then( response => {
        if(response.ok) {
            response.json().then( info => {
                console.log(info);
                setTodayInfo(info);
            })
            return fetch(`//api.openweathermap.org/data/2.5/forecast?q=${ encodeURIComponent(location)}&APPID=155ffaf697d6471bec1bcc79bda4c6ac`)
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
    if(evt) {
        evt.preventDefault();
    }
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
    let forecast__image;
    for(let i=0; i<5; i++) {
        document.querySelector(`.weather-card__bottom__forecast__${i+1}hour__temp`).textContent = calcTemp(info.list[i].main.temp);
        document.querySelector(`.weather-card__bottom__forecast__${i+1}hour__weather__text`).textContent = info.list[i].weather[0].main;
        forecast__image = document.querySelector(`.weather-card__bottom__forecast__${i+1}hour__weather__image`);
        forecast__image.classList.remove(forecast__image.classList[1]);
        document.querySelector(`.weather-card__bottom__forecast__${i+1}hour__weather__image`).classList.add(info.list[i].weather[0].main.toLowerCase());
    }
}


function calcTemp(temp) {
    return Math.round(temp-273.15) + "°";
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