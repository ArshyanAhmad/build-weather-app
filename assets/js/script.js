const api_key = 'e64c322c8ff446bc8b135947230306'
const input_querry = document.querySelector('.input__field')
const searchBtn = document.querySelector('.btn')

const weatherIconMap = {
    '1000': 'wi wi-day-sunny',
    '1003': 'wi wi-night-clear',
    '1006': 'wi wi-cloudy',
    '1009': 'wi wi-day-cloudy',
    '1030': 'wi wi-fog',
    '1063': 'wi wi-day-showers',
    '1066': 'wi wi-snow',
    '1069': 'wi wi-day-sleet',
    '1072': 'wi wi-day-sleet',
    '1087': 'wi wi-day-thunderstorm',
    '1114': 'wi wi-snow',
    '1135': 'wi wi-smoke',
    '1147': 'wi wi-day-fog',
    '1150': 'wi wi-day-showers',
    '1153': 'wi wi-day-showers',
    '1168': 'wi wi-rain',
    '1171': 'wi wi-rain',
    '1180': 'wi wi-rain',
    '1183': 'wi wi-rain',
    '1186': 'wi wi-rain',
    '1189': 'wi wi-rain',
    '1192': 'wi wi-thunderstorm',
    '1195': 'wi wi-thunderstorm',
    '1198': 'wi wi-thunderstorm',
    '1201': 'wi wi-thunderstorm',
    '1204': 'wi wi-thunderstorm',
    '1207': 'wi wi-thunderstorm',
    '1210': 'wi wi-sleet',
    '1213': 'wi wi-snow',
    '1216': 'wi wi-snow',
    '1219': 'wi wi-snow',
    '1222': 'wi wi-snow',
    '1225': 'wi wi-snow',
    '1237': 'wi wi-hail',
    '1240': 'wi wi-rain',
    '1243': 'wi wi-rain',
    '1246': 'wi wi-rain',
    '1249': 'wi wi-rain',
    '1252': 'wi wi-rain',
    '1255': 'wi wi-rain',
    '1258': 'wi wi-rain',
    '1261': 'wi wi-thunderstorm',
    '1264': 'wi wi-thunderstorm',
    '1273': 'wi wi-thunderstorm',
    '1276': 'wi wi-thunderstorm',
    '1279': 'wi wi-thunderstorm',
    '1282': 'wi wi-thunderstorm',
};


searchBtn.addEventListener('click', () => {
    const query = input_querry.value;
    const endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${query}&days=1`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            // Process the data returned from the API
            console.log(data);
            // displayWeatherTimeline(data.forecast.forecastday[0].hour);
            displayData(data)
            displayForecast(data)
            displayTodayForecast(data)
            // console.log(data.forecast);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.log(error);
        });

})



function displayData(data) {

    const icon_code = data.current.condition.code;
    const iconImage = weatherIconMap[icon_code] || 'wi wi-na';

    const div = document.createElement('div')
    div.innerHTML = `
    <div class="main__text">
        <h1>${data.location.name}</h1>
        <span>${data.location.country}</span>

        <h2>${data.current.temp_c}&deg;</h2>
    </div>

    <div class="main__icon">
        <i class='${iconImage}'></i>
    </div>`

    div.classList.add('show__data')
    document.querySelector('.top__main').appendChild(div)
    input_querry.value = '';
}


function displayForecast(data) {
    console.log(data);

    const hour = data.forecast.forecastday[0].hour
    const first__div = document.querySelector('.first__div')
    first__div.style.display = 'inherit'

    hour.forEach(hour => {
        const timestamp = new Date(hour.time_epoch * 1000)
        const time = timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        const forecasteIcon = hour.condition.code
        const forecasteIconIMage = weatherIconMap[forecasteIcon] || 'wi wi-na'

        const div = document.createElement('div')
        div.innerHTML = `
            <h4>${time}</h4>
            <a href="#">
                <i class='${forecasteIconIMage}'></i>
            </a>
            <h2>${hour.temp_c}&deg;</h2>
        `
        document.querySelector('.header').style.gridTemplateColumns = "80px 2.4fr 1fr";
        document.querySelector('.data__wrapper').appendChild(div)

    });

}


function displayTodayForecast(data) {
    console.log(data);

    const rainTemprature = data.current.temp_c;
    const windSpeed = data.current.wind_kph;
    const rainChance = data.forecast.forecastday[0].hour[0].chance_of_rain;
    const uv = data.current.uv;

    const div = document.createElement('div')
    div.innerHTML = `
    <div>
    <li>
        <i class="fa-solid fa-temperature-three-quarters"></i>
        <span>Real Feel</span>
    </li>
    <h2>${rainTemprature}</h2>
</div>

<div>
    <li>
        <i class="fa-solid fa-wind"></i>
        <span>Wind</span>
    </li>
    <h2>${windSpeed} km/h</h2>
</div>

<div>
    <li>
        <i class="fa-solid fa-droplet"></i>
        <span>Chance of rain</span>
    </li>
    <h2>${rainChance}%</h2>
</div>

<div>
    <li>
        <i class="fa-solid fa-sun"></i>
        <span>UV Index</span>
    </li>
    <h2>${uv}</h2>
</div> `
    div.classList.add('show__data__second')
    document.querySelector('.second__div').style.display = 'block'
    document.querySelector('.right').style.display = 'block'
    document.querySelector('.second__div').appendChild(div)

}