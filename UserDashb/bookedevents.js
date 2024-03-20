fetch('https://localhost:44313/api/v1/Booking/getallbyuserid/' + localStorage.getItem('id'))
    .then(response => response.json())
    .then(data => {
      const eventsRow = document.getElementById('events-grid');
        console.log(data);
        data.data.forEach(event => {
          const eventCardHTML = `
          <div class="event-card">
            <h4>${event.eventName}</h4>
            <p>Description: ${event.event.description}</p>
            <p>Date: ${event.event.date.split("T")[0]}</p>
            <p>Location: ${event.event.location}</p>
            <p>Price: #${event.price}</p>
            <div class="event-card .button-container">
              <button id="${event.id}" style="background-color: red; color: white;" class="button">Cancel Booking</button>
            </div>
          </div>
        `;
            eventsRow.innerHTML += eventCardHTML;
        });
        const bookNowButtons = document.querySelectorAll('.button');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventId = button.id;
            cancelBooking(eventId, ); // Call the createBooking function with the event ID
        });
    });
    })
    .catch(error => {
        console.error('Error fetching events:', error);
    });





    function cancelBooking(eventId) {
      const requestData = {
        eventid: eventId 
    };;

      fetch('https://localhost:44313/api/v1/Booking/cancelbooking/' + eventId, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
      })
      .then(res => res.json())
  .then(data => {
      console.log("2")
      console.log("data1", data)
      console.log("data2", data.data)
      if(data.success==true){
        var existingBalance = parseFloat(window.localStorage.getItem('balance')) || 0;
        window.localStorage.setItem("balance", existingBalance + data.data.price);
        alert(data.message)
        window.location.reload();
      }
      else{
        alert(data.message)
      }
  })
      .catch(error => {
          console.error('Error cancelling booking:', error);
      });
  }