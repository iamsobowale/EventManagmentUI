function fetchEventData() {
  fetch('https://localhost:44313/api/v1/User/getallusersbyeventid/' + window.localStorage.getItem("eventId")) // Update the URL with your actual API endpoint
    .then(response => response.json())
    .then(data => {
      const eventsGrid = document.getElementById('events-grid');
      eventsGrid.innerHTML = '';
      console.log(data);
      data.data.forEach(event => {
        const eventCardHTML = `
          <div class="event-card">
          <br>
            <p>UserName: ${event.username}</p>
            <p>Email: ${event.email}</p>
            <p>Gender: ${event.gender}</p>
          </div>
        `;
        eventsGrid.insertAdjacentHTML('beforeend', eventCardHTML);
        
        document.getElementById(`${event.id}`).addEventListener('click', () => {
          cancelEvent(event.id);
        });
      });
    })
    .catch(error => console.error('Error fetching event data:', error));
}
window.onload = fetchEventData;