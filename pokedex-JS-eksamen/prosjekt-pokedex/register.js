// Registreringsskjema
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("new-username").value;
    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("new-password").value;

    try {
      const response = await fetch(
        "https://crudcrud.com/api/3718c0c1a3884cc3b48c7824b3214c9f/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: newUsername, email, password: newPassword }),
        }
      );
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "login.html";
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  });
}