const myformvalue = document.querySelector('#myform');
myformvalue.addEventListener('submit', (e) => {
  e.preventDefault();
});
function fetchEventById(eventId) {
  fetch(`https://localhost:44313/api/v1/Event/get/` + window.localStorage.getItem("eventId"),)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(eventData => {
      document.getElementById("eventName").value = eventData.data.name;
      document.getElementById("eventDescription").value = eventData.data.description;
      document.getElementById("eventDate").value = eventData.data.date.split("T")[0];
      document.getElementById("eventLocation").value = eventData.data.location;
      document.getElementById("TotalTickets").value = eventData.data.totalTickets;
      document.getElementById("eventPrice").value = eventData.data.price;
    })
    .catch(error => {
      console.error('Error fetching event:', error);
    });
}


var update = () => {
  const Data = {
    id: window.localStorage.getItem("eventId"),
    name: document.getElementById("eventName").value,
    description: document.getElementById("eventDescription").value,
    date: document.getElementById("eventDate").value,
    location: document.getElementById("eventLocation").value,
    price: document.getElementById("eventPrice").value,
    totaltickets: document.getElementById("TotalTickets").value
  };
  console.log("2")
  fetch('https://localhost:44313/api/v1/Event/update', {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')
    },
    body: JSON.stringify(Data)
  })
    .then(res => res.json())
    .then(data => {
      
      if (data.success == true) {
        alert(data.message);
        window.location.href = "/AdminDashBoard/viewevents.html";
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      alert(data.message);
      console.log(err);
    });
}
fetchEventById();
