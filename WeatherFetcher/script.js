const apiKey = '3420430f1eef4379a20120417241607';

async function showWeather() {
    let value = await getValue();
    let data = await getWeather(value);
    let date = data.forecast.forecastday[0].date;

    document.getElementById('weather-place').innerHTML = data.location.name + ', ' + getFormattedDate(date);
    document.getElementById('weather-icon').src = data.forecast.forecastday[0].day.condition.icon;
    document.getElementById('weather-c').innerHTML = data.forecast.forecastday[0].day.avgtemp_c + '°C';
    document.getElementById('weather').innerHTML = data.forecast.forecastday[0].day.condition.text;

    console.log(data);
}

function getFormattedDate(date) {
    const dateObj = new Date(date);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-GB', options).format(dateObj);
}

async function getWeather(value) {
    let date = document.getElementById('future-weather-date').value;
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${value}&dt=${date}`;

    return fetch(url)
    .then(response => {
        if (!response.ok) throw new console.error("Error: " + response.statusText);
        return response.json();
    }).catch(error => console.error("Real error: " + error));
}

function getValue() {
    let value = document.getElementById('value').value;
    if (value === '') alert('Cannot be empty');
    
    return value;
}