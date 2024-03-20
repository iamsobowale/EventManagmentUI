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
              <button id="${event.id}" style="background-color: blue; color: white;" class="button">Book</button>
            </div>
          </div>
        `;
        eventsGrid.insertAdjacentHTML('beforeend', eventCardHTML);
        
        document.getElementById(`${event.id}`).addEventListener('click', () => {
          createBooking(event.id);
        });
      });
    })
    .catch(error => console.error('Error fetching event data:', error));
}
window.onload = fetchEventData;


function createBooking(eventId) {
  const requestData = {
    userid: localStorage.getItem('id'),
    eventid: eventId 
};;

  fetch('https://localhost:44313/api/v1/Booking/create', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
  })
  .then(res => res.json())
  .then(data => {
      if(data.success==true){
        var existingBalance = parseFloat(window.localStorage.getItem('balance')) || 0;
        console.log("existingBalance", data.data.price - existingBalance);
        window.localStorage.setItem("balance", existingBalance - data.data.price);
        window.location.reload();
        alert(data.message)
      }
      else{
        alert(data.message)
      }
  })
  .catch(error => {
      console.error( error);
  });
}
