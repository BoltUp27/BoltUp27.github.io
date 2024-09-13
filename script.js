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
    const optionsDate = {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const optionsTime = {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    const date = new Intl.DateTimeFormat('en-US', optionsDate).format(new Date());
    const time = new Intl.DateTimeFormat('en-US', optionsTime).format(new Date());

    document.querySelector(`#${id} .date`).textContent = `Date: ${date}`;
    document.querySelector(`#${id} .time`).textContent = `Time: ${time}`;
  }
}

// Update clocks every minute
setInterval(updateClocks, 60000);

// Initial update
updateClocks();
