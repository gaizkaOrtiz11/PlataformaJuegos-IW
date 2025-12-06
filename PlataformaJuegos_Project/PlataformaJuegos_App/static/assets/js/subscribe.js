document.addEventListener("DOMContentLoaded", () => {
  // Get tags from the DOM
  const form = document.getElementById("subscribe");
  const emailInput = document.getElementById("exampleInputEmail1");

  form.addEventListener("submit", (event) => {
    event.preventDefault();  // Avoid reloading the page

    const email = emailInput.value.trim();

    // Check for email
    if (!email) {
      alert("No has introducido un correo electrónico");
      return;
    }

    // Check for @ and .
    if (!email.includes("@") || !email.includes(".")) {
      alert("El correo no es válido");
      return;
    }

    // If everything is right, send notification
    alert("¡Te has registrado en la newsletter de DeustoGames!");

    // Clear value for more emails
    emailInput.value = "";
  });
});