// Function to update the time
function updateClocks() {
    const clocks = {
      'new-york': 'America/New_York',
      'london': 'Europe/London',
      'tokyo': 'Asia/Tokyo'
      // Add more time zones as needed
    };
  
    for (const [id, timeZone] of Object.entries(clocks)) {
      const date = new Date().toLocaleString('en-US', { timeZone });
      document.querySelector(`#${id} .time`).textContent = date;
    }
  }
  
  // Update clocks every second
  setInterval(updateClocks, 1000);
  
  // Initial update
  updateClocks();
  