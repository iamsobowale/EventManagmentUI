function fetchEventData() {
  fetch('https://localhost:44313/api/v1/Event/getall') // Update the URL with your actual API endpoint
    .then(response => response.json())
    .then(data => {
      const eventsGrid = document.getElementById('events-grid');
      eventsGrid.innerHTML = ''; // Clear existing content
      console.log(data);
      // Loop through the fetched data and generate event cards
      data.data.forEach(event => {
        const eventCardHTML = `
          <div class="event-card">
            <h4>${event.name}</h4>
            <p>Description: ${event.description}</p>
            <p>Date: ${event.date.split("T")[0]}</p>
            <p>Location: ${event.location}</p>
            <p>Price: #${event.price}</p>
            <div class="event-card .button-container">
              <button id="${event.id}" style="background-color: red; color: white;" class="button">Cancel Now</button>
              <button id="$${event.id}" class="button view-participants-btn" onclick="redirectToParticipants('${event.id}')">View Participants</button>
            </div>
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


function cancelEvent(eventId) {
  fetch(`https://localhost:44313/api/v1/Event/delete/${eventId}`, {
    method: 'DELETE',
    headers: { 
      "content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')
  },
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    window.location.reload();
    console.log(data);
    // Optionally, you can update UI or show a message to the user
  })
  .catch(error => console.error('Error canceling event:', error));
}

function redirectToParticipants(eventId) {
  window.localStorage.setItem('eventId', eventId);
  window.location.href = "/AdminDashBoard/viewparticpant.html";
}