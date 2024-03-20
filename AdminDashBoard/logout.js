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