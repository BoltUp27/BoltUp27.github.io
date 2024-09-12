// Function to update the time and date
function updateClocks() {
  const clocks = {
    'new-york': 'America/New_York',
    'london': 'Europe/London',
    'tokyo': 'Asia/Tokyo',
    'sydney': 'Australia/Sydney',
    'cape-town': 'Africa/Johannesburg'
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
    const timeElement = document.querySelector(`#${id} .time`);
    if (timeElement) {
      timeElement.textContent = `Date & Time: ${dateTime}`;
    } else {
      console.error(`Element #${id} .time not found`);
    }
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
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      if (data.weather && data.weather.length > 0) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const weatherElement = document.querySelector(`#${id} .weather`);
        if (weatherElement) {
          weatherElement.textContent = `Weather: ${weatherDescription}, Temp: ${temperature}°C`;
        } else {
          console.error(`Element #${id} .weather not found`);
        }
      } else {
        const weatherElement = document.querySelector(`#${id} .weather`);
        if (weatherElement) {
          weatherElement.textContent = 'Weather data not available';
        }
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      const weatherElement = document.querySelector(`#${id} .weather`);
      if (weatherElement) {
        weatherElement.textContent = 'Weather data not available';
      }
    }
  }
}

// Update clocks every second and weather every minute
setInterval(() => {
  updateClocks();
}, 1000); // Update clocks every second

setInterval(() => {
  updateWeather();
}, 60000); // Update weather every minute

// Initial updates
updateClocks();
updateWeather();
