
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("https://crudcrud.com/api/3718c0c1a3884cc3b48c7824b3214c9f/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          alert("Login successful!");
          window.location.href = "index.html";
        } else {
          alert("Invalid email or password.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Failed to log in.");
      });
  });
}
