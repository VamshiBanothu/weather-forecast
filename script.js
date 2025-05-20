var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var apik = "b42e8c39412e8e43664af1fc41614865";

function convertion(val) {
    return (val - 273.15).toFixed(1);
}

btn.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apik)
        .then(res => res.json())
        .then(data => {
            var nameval = data['name'];
            var descrip = data['weather'][0]['description'];
            var temperature = data['main']['temp'];
            var wndspeed = data['wind']['speed'];

            city.innerHTML = 'Weather of <span>' + nameval + '</span>';
            temp.innerHTML = 'Temperature: <span>' + convertion(temperature) + ' °C</span>';
            description.innerHTML = 'Sky Conditions: <span>' + descrip + '</span>';
            wind.innerHTML = 'Wind Speed: <span>' + wndspeed + ' km/h</span>';

            const tempC = parseFloat(convertion(temperature));
            if (tempC < 20) {
                alert("Warning: Temperature is too low! Please do not go outside as the weather is too cold.");
            } else if (tempC >= 20 && tempC < 35) {
                alert("Great news! The temperature is perfect for going outside and enjoying your vacation.");
            } else {
                alert("Warning: Temperature is too high! Please avoid going out in the sun.");
            }
        })
        .catch(err => {
            alert('You have entered a wrong city name!');
        });
});
