document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.getElementById("send-btn");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");

  sendBtn.addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;

    appendMessage("user", userMessage);
    chatbotInput.value = "";
    getBotResponse(userMessage);
  }

  function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = message;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Texto de estado (opcional)
  function setStatus(text) {
    let s = document.getElementById("chat-status");
    if (!s) {
      s = document.createElement("div");
      s.id = "chat-status";
      s.style.fontSize = "0.9em";
      s.style.color = "#666";
      s.style.marginTop = "6px";
      chatbotMessages.parentNode.appendChild(s);
    }
    s.textContent = text;
  }

  async function getBotResponse(userMessage) {
    const apiKey = "CLAVE"; // <- Reemplaza aquí para pruebas LOCALES (inseguro)
    // Nota: no recomendado para producción. Mejor backend/serverless.

    // UI: desactivar botón y mostrar estado
    sendBtn.disabled = true;
    setStatus("Escribiendo...");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
          max_tokens: 150,
        }),
      });

      // lee el body como texto para poder inspeccionarlo si el JSON no es válido
      const rawText = await response.text();
      let data;
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch (parseErr) {
        console.error("No se pudo parsear JSON de respuesta:", parseErr, "rawText:", rawText);
        appendMessage("bot", "Respuesta inválida del servidor (no JSON). Revisa la consola.");
        return;
      }

      // Log completo para depuración
      console.info("OpenAI response status:", response.status);
      console.debug("OpenAI raw response:", data);

      // Manejo de errores en el body
      if (!response.ok) {
        // Si OpenAI devuelve un objeto { error: { message } }
        const msgFromBody = data?.error?.message ?? JSON.stringify(data);
        appendMessage("bot", `Error: ${response.status} — ${msgFromBody}`);
        return;
      }

      // Chequea si hay error dentro del JSON
      if (data?.error) {
        appendMessage("bot", `Error de la API: ${data.error.message || JSON.stringify(data.error)}`);
        return;
      }

      // Extrae el mensaje del asistente de forma segura
      const botMessage = data?.choices?.[0]?.message?.content;
      if (!botMessage) {
        // Muestra el JSON completo en consola y un mensaje al usuario
        console.warn("No se encontró choices[0].message.content:", data);
        appendMessage("bot", "Sin respuesta válida. Revisa la consola para más detalles.");
        return;
      }

      appendMessage("bot", botMessage);
    } catch (err) {
      // Error de red / CORS / bloqueos
      console.error("Fetch failed:", err);
      // Distingue errores comunes para dar pistas
      if (err instanceof TypeError) {
        appendMessage("bot", "Error de red o CORS (consulta la consola Network).");
      } else {
        appendMessage("bot", "Error inesperado. Revisa la consola.");
      }
    } finally {
      sendBtn.disabled = false;
      setStatus("");
    }
  }
});
