const API_KEY = "911486127b5e55831eec5257259f7ffd";
let iconoAnimado = document.getElementById('icono-animado');
const temperatureContainer = document.getElementById('temperature');
const body = document.body;

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
    .catch(error => console.log(error));
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity + "%",
        pressure: data.main.pressure + " hPa",
        temperature: Math.round(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    switch (data.weather[0].main) {
        case 'Clear':
            iconoAnimado.src = 'animated/day.svg';
            break;
        case 'Clouds':
            iconoAnimado.src = 'animated/cloudy-day-1.svg';
            break;
        case 'Rain':
            iconoAnimado.src = 'animated/rainy-7.svg';
            break;
        case 'Thunderstorm':
            iconoAnimado.src = 'animated/thunder.svg';
            break;
        default:
            iconoAnimado.src = 'animated/default.svg';
            break;
    }

    changeBackground(weatherData.temperature);
    const temperatureContainer = document.getElementById('temperature');
    const metricSymbolContainer = document.getElementById('metric-symbol');

    temperatureContainer.textContent = Math.round(data.main.temp);
    metricSymbolContainer.textContent = "°C";
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const changeBackground = temperature => {
    if (temperature >= 30) {
        body.style.backgroundImage = "url('https://media.istockphoto.com/id/696081090/es/foto/resumen-de-fondo-de-la-playa-arena-en-sombras-de-palmera.jpg?s=612x612&w=0&k=20&c=syR_-6Yg1wwBAkhoyT3l-Iqt1bdE8Jdfmp0Bcncevn4=')";
    } else if (temperature >= 20) {
        body.style.backgroundImage = "url('https://www.blogdelfotografo.com/wp-content/uploads/2014/03/Raining-petals_skoeber.jpg')";
    } else if (temperature >= 15) {
        body.style.backgroundImage = "url('https://st4.depositphotos.com/2627021/21088/i/600/depositphotos_210885256-stock-photo-wooden-table-with-red-leaves.jpg')";
    }else if (temperature >= 10) {
        body.style.backgroundImage = "url('https://coolwallpapers.me/picsup/5081898-forest-nature-road.jpg')";
    } else {
        body.style.backgroundImage = "url('https://www.lifeder.com/wp-content/uploads/2020/10/puesta-de-Sol-en-los-Andes-min-1024x683.jpg')";
    }
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}
