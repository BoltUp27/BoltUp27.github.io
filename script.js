// Function to update the time
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
    const timeOptions = {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const time = new Date().toLocaleTimeString('en-US', timeOptions);
    document.querySelector(`#${id} .time`).textContent = time;
  }
}

// Update clocks every second
setInterval(updateClocks, 1000);

// Initial update
updateClocks();
