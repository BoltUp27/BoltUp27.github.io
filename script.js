// Function to update the time and date for various time zones
function updateClocks() {
  const clocks = {
    'new-york': 'America/New_York',
    'london': 'Europe/London',
    'tokyo': 'Asia/Tokyo',
    'sydney': 'Australia/Sydney',
    'cape-town': 'Africa/Johannesburg'
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

// Function to initialize the map and geolocation
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 }, // Default coordinates
  });

  document.getElementById("locateButton").addEventListener("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Update map center to user's location
          map.setCenter(pos);

          // Add marker for user location
          new google.maps.Marker({
            position: pos,
            map: map,
          });
        },
        function() {
          handleLocationError(true, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter());
    }
  });
}

// Handle geolocation errors
function handleLocationError(browserHasGeolocation, pos) {
  const errorMessage = browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation.";
  console.error(errorMessage);
  alert(errorMessage);
}

// Initialize the map when the window loads
window.onload = function() {
  initMap();
  updateClocks(); // Initial clock update
  setInterval(updateClocks, 60000); // Update clocks every minute
};
