function displayWeather(data) {
    const weather = data.weather[0];
    const temperature = data.main.temp;
    const description = weather.description;
    const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}.png`;

    const resultDiv = document.getElementById('weather-result');
    resultDiv.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="Weather icon" class="weather-icon">
        <p>${temperature}°C - ${description}</p>
    `;
    resultDiv.classList.add('visible');
}

function fetchWeather() {
    const locationInput = document.getElementById('location-input');
    if (locationInput.value === '') {
        alert('Please enter a city name.');
        return;
    }

    const location = locationInput.value;
    const apiKey = '75c7bcd35f434bb9d709f295d93c1168'; // Remember to replace YOUR_API_KEY with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    document.getElementById('weather-result').classList.remove('visible'); // Remove the visible class for fade effect on new searches

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Failed to fetch data:', error);
            const resultDiv = document.getElementById('weather-result');
            resultDiv.innerHTML = `<p>Failed to retrieve data. Please try another city.</p>`;
            resultDiv.classList.add('visible');
        });
}
