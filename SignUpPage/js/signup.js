
const createemail = document.querySelector('#email');
const createpassword = document.querySelector('#password');
const createusername = document.querySelector('#username');
const creategender = document.querySelector('#genderbutton');
const myformvalue = document.querySelector('#myform');
myformvalue.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(email.value);
});
let create = () => { 
  Data = {
      email: createemail.value,
      password: createpassword.value,
      username:createusername.value,
      gender: creategender.value
  };
  fetch('https://localhost:44313/api/v1/User/create',
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
      console.log(data.data)
      if(data.success==true){
          alert(data.message);
          window.location.href = "/LoginPage/login.html";
      }
      else{
          //if email and password is wrong
          alert(data.message);
          document.getElementById('errorMessage').innerText = 'Please fill all the fields correctly.';
      }
  })
  .catch(err => {
      console.log(err);
  })
}