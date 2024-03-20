const myformvalue = document.querySelector('#myform');
const amount = document.querySelector('#amount');
myformvalue.addEventListener('submit', (e) => {
  e.preventDefault();
});
let create = () => { 
  console.log("dggddghdgdg",),
  Data = {
      userId: localStorage.getItem('id'),
      userEmail: localStorage.getItem('email'),
      balance:amount.value,
  };
  fetch('https://localhost:44313/api/v1/Wallet/fundwallet',
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
        var existingBalance = parseFloat(window.localStorage.getItem('balance')) || 0;
        window.localStorage.setItem("balance", data.data.amount+existingBalance);
    
        var url = data.data.url;
        if (url !== null) {
            window.open(url, '_blank');
        } else {
            alert("URL not available");
        }

         
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