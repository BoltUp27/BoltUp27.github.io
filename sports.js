const API_KEY = 'YOUR_SPORTSDATA_IO_API_KEY'; // Replace with your API key

// Function to fetch NBA events
async function fetchNbaEvents() {
  const today = new Date();
  const year = today.getFullYear();
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  
  const url = `https://www.balldontlie.io/api/v1/games?start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayEvents('nba-events', data.data);
  } catch (error) {
    console.error('Error fetching NBA events:', error);
  }
}

// Function to fetch NFL events
async function fetchNflEvents() {
  const nflUrl = `https://api.sportsdata.io/v4/nfl/scores/json/Games/2024`; // Update URL if necessary
  
  try {
    const response = await fetch(nflUrl, {
      headers: { 'User-Agent': 'YOUR_APP_NAME', 'Api-Key': API_KEY }
    });
    const data = await response.json();
    displayEvents('nfl-events', data);
  } catch (error) {
    console.error('Error fetching NFL events:', error);
  }
}

// Function to fetch MLB events
async function fetchMlbEvents() {
  const mlbUrl = `https://api.sportsdata.io/v4/mlb/scores/json/Games/2024`; // Update URL if necessary
  
  try {
    const response = await fetch(mlbUrl, {
      headers: { 'User-Agent': 'YOUR_APP_NAME', 'Api-Key': API_KEY }
    });
    const data = await response.json();
    displayEvents('mlb-events', data);
  } catch (error) {
    console.error('Error fetching MLB events:', error);
  }
}

// Function to display events
function displayEvents(elementId, events) {
  const eventsContainer = document.querySelector(`#${elementId} .events-list`);
  eventsContainer.innerHTML = ''; // Clear existing events

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'event';

    eventElement.innerHTML = `
      <div class="team-logos">
        <img src="${event.team1Logo || 'default_logo.png'}" alt="${event.team1 || 'Team 1'}" class="team-logo">
        <span>vs</span>
        <img src="${event.team2Logo || 'default_logo.png'}" alt="${event.team2 || 'Team 2'}" class="team-logo">
      </div>
      <h4>${event.title || 'Event Title'}</h4>
      <p>Date: ${event.date || 'Date Not Available'}</p>
      <p>Time: ${event.time || 'Time Not Available'}</p>
      <p>Location: ${event.location || 'Location Not Available'}</p>
    `;

    eventsContainer.appendChild(eventElement);
  });
}

// Initial fetch of events
fetchNbaEvents();
fetchNflEvents();
fetchMlbEvents();

// Refresh events every 30 minutes
setInterval(() => {
  fetchNbaEvents();
  fetchNflEvents();
  fetchMlbEvents();
}, 30 * 60 * 1000); // 30 minutes
