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

// Update clocks every second
setInterval(updateClocks, 1000);

// Initial update
updateClocks();
