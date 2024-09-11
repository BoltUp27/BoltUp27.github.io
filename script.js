// Function to update the time and weather
async function updateClocksAndWeather() {
  const clocks = {
    'new-york': 'America/New_York',
    'london': 'Europe/London',
    'tokyo': 'Asia/Tokyo',
    'sydney': 'Australia/Sydney',
    'cape-town': 'Africa/Johannesburg'
    // Add more time zones as needed
  };

  // Replace with your OpenWeatherMap API key
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const weatherUrls = {
    'new-york': `https://api.openweathermap.org/data/2.5/weather?q=New%20York,US&appid=${apiKey}&units=metric`,
    'london': `https://api.openweathermap.org/data/2.5/weather?q=London,GB&appid=${apiKey}&units=metric`,
    'tokyo': `https://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP&appid=${apiKey}&units=metric`,
    'sydney': `https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&appid=${apiKey}&units=metric`,
    'cape-town': `https://api.openweathermap.org/data/2.5/weather?q=Cape%20Town,ZA&appid=${apiKey}&units=metric`
    // Add more weather URLs as needed
  };

  for (const [id, timeZone] of Object.entries(clocks)) {
    const timeOptions = {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const time = new Date().toLocaleTimeString('en-US', timeOptions);
    document.querySelector(`#${id} .time`).textContent = time;

    // Fetch weather data
    try {
      const response = await fetch(weatherUrls[id]);
      const data = await response.json();
      const weather = `${data.weather[0].description}, ${Math.round(data.main.temp)}°C`;
      document.querySelector(`#${id} .weather`).textContent = weather;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      document.querySelector(`#${id} .weather`).textContent = 'Weather data not available';
    }
  }
}

// Update clocks and weather every second
setInterval(updateClocksAndWeather, 1000);

// Initial update
updateClocksAndWeather();

