const email = document.querySelector('#email');
const password = document.querySelector('#password');
const myformvalue = document.querySelector('#myform');
myformvalue.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(email.value);
});


let create = () => { 
  console.log("email value", email.value); 
  if(email.value == "") {
      document.getElementById('errorMessage').innerText = 'Email is required.';
      return;
  }
  Data = {
      email: email.value,
      password: password.value,
  };
  fetch('https://localhost:44313/api/v1/Auth/login',
  {
      method: "POST",
      headers: { 
          "content-type": "application/json" 
      },
      body: JSON.stringify(Data)
  })
  .then(res => res.json())
  .then(data => {
      console.log("2")
      console.log(data)
      if(data.success==true){
          window.localStorage.setItem("token", data.data.token);
          window.localStorage.setItem("email", data.data.email);
          window.localStorage.setItem("role", data.data.role);
          window.localStorage.setItem("id", data.data.userId);
          window.localStorage.setItem("balance", data.data.balance);
          alert(data.message);
          if(data.data.role=="User"){
            window.location.href = "/UserDashb/userdashboa.html";
          }
          else if(data.data.role=="Admin")
          {
            window.location.href = "/AdminDashBoard/admindashboard.html";
          }
      }
      else{
          alert(data.message);
          document.getElementById('errorMessage').innerText = 'Invalid email or password.';
      }
  })
  .catch(err => {
      console.log(err);
  })
  
}