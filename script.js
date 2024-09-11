// Function to update the time and date
function updateClocks() {
  const clocks = {
    'new-york': 'America/New_York',
    'london': 'Europe/London',
    'tokyo': 'Asia/Tokyo',
    'sydney': 'Australia/Sydney',
    'cape-town': 'Africa/Johannesburg'
    // Add more time zones as needed
  };

  for (const [id, timeZone] of Object.entries(clocks)) {
    const options = {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const dateTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
    document.querySelector(`#${id} .time`).textContent = dateTime;
  }
}

// Function to update the weather information
async function updateWeather() {
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const cities = {
    'new-york': 'New York',
    'london': 'London',
    'tokyo': 'Tokyo',
    'sydney': 'Sydney',
    'cape-town': 'Cape Town'
  };

  for (const [id, city] of Object.entries(cities)) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      
      if (data.weather && data.weather.length > 0) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        document.querySelector(`#${id} .weather`).textContent = `Weather: ${weatherDescription}, Temp: ${temperature}°C`;
      } else {
        document.querySelector(`#${id} .weather`).textContent = 'Weather data not available';
      }
    } catch (error) {
      document.querySelector(`#${id} .weather`).textContent = 'Weather data not available';
    }
  }
}

// Update clocks and weather every minute
setInterval(() => {
  updateClocks();
  updateWeather();
}, 60000);

// Initial update
updateClocks();
updateWeather();
