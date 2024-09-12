// Function to fetch sports events
async function fetchEvents() {
    // Sample API URLs (replace with actual endpoints)
    const nbaUrl = 'https://api.example.com/nba/events';
    const nflUrl = 'https://api.example.com/nfl/events';
    const mlbUrl = 'https://api.example.com/mlb/events';
  
    try {
      // Fetch NBA events
      const nbaResponse = await fetch(nbaUrl);
      const nbaData = await nbaResponse.json();
      displayEvents('nba-events', nbaData);
  
      // Fetch NFL events
      const nflResponse = await fetch(nflUrl);
      const nflData = await nflResponse.json();
      displayEvents('nfl-events', nflData);
  
      // Fetch MLB events
      const mlbResponse = await fetch(mlbUrl);
      const mlbData = await mlbResponse.json();
      displayEvents('mlb-events', mlbData);
    } catch (error) {
      console.error('Error fetching events:', error);
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
          <img src="${event.team1Logo}" alt="${event.team1}" class="team-logo">
          <span>vs</span>
          <img src="${event.team2Logo}" alt="${event.team2}" class="team-logo">
        </div>
        <h4>${event.title}</h4>
        <p>Date: ${event.date}</p>
        <p>Time: ${event.time}</p>
        <p>Location: ${event.location}</p>
      `;
  
      eventsContainer.appendChild(eventElement);
    });
  }
  
  // Initial fetch of events
  fetchEvents();
  
  // Refresh events every 30 minutes
  setInterval(fetchEvents, 30 * 60 * 1000); // 30 minutes
  