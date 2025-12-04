document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribe");
  const emailInput = document.getElementById("exampleInputEmail1");

  if (!form || !emailInput) {
    console.warn("Formulario de suscripción no encontrado.");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita recargar la página

    const email = emailInput.value.trim();

    if (!email) {
      alert("Por favor, introduce un correo electrónico.");
      return;
    }

    // Validación mínima
    if (!email.includes("@")) {
      alert("El correo parece inválido.");
      return;
    }

    // Aquí podrías enviar el correo al servidor en el futuro si quieres

    alert("¡Te has registrado en la newsletter de DeustoGames!");

    // Limpiar campo
    emailInput.value = "";
  });
});