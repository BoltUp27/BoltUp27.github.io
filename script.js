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

    const dateElement = document.querySelector(`#${id} .date`);
    const timeElement = document.querySelector(`#${id} .time`);

    if (dateElement && timeElement) {
      dateElement.textContent = `Date: ${date}`;
      timeElement.textContent = `Time: ${time}`;
    } else {
      console.error(`Elements for ${id} not found.`);
    }
  }
}

// Update clocks every second for real-time updates
setInterval(updateClocks, 1000);

// Initial update
updateClocks();

// Function to initialize the map and geolocation
function initMap() {
  // Default map center
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 }, // Default coordinates
  });

  // Geolocation
  document.getElementById("locateButton").addEventListener("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Update map center
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
  alert(browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation.");
}

// Initialize the map when the window loads
window.onload = initMap;
