var balance = window.localStorage.getItem('balance');
console.log(balance);
document.getElementById('bala').innerText = balance;

// Add event listener to the signout button
document.addEventListener('DOMContentLoaded', function() {
  var signoutBtn = document.querySelector('.signout-btn');
  if (signoutBtn) {
      signoutBtn.addEventListener('click', function() {
          // Clear local storage
          localStorage.clear();
          // Redirect to signin page
          window.location.href = "/LoginPage/login.html"; // Replace with the actual URL of your signin page
      });
  }
});
