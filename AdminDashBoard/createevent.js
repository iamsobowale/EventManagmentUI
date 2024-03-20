const myformvalue = document.querySelector('#myform');
const names = document.querySelector('#eventName');
const description = document.querySelector('#eventDescription');
const date = document.querySelector('#eventDate');
const elocation = document.querySelector('#eventLocation');
const price = document.querySelector('#eventPrice');
const totaltickets = document.querySelector('#TotalTickets');

myformvalue.addEventListener('submit', (e) => {
  e.preventDefault();
});

let create = () => { 
  console.log("dggddghdgdg");
  const Data = {
      name: names.value,
      description: description.value,
      date: date.value,
      location: elocation.value,
      price: price.value,
      totaltickets: totaltickets.value
  };
  console.log("Authorization:" + "Bearer " + localStorage.getItem('token'))
  fetch('https://localhost:44313/api/v1/Event/create', {
    
      method: "POST",
      headers: { 
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(Data)
      
  })
  .then(res => res.json())
  .then(data => {
      console.log("2")
      console.log(data)
      if(data.success == true) {
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
