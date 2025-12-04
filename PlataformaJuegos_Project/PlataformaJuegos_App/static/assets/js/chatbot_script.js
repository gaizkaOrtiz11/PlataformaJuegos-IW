// Conseguir elementos del DOM
document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.getElementById("send-btn");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");

  // Prompt de sistema (contexto constante para cada mensaje)
  const systemPrompt = `
Eres Deusti, la inteligencia artificial de DeustoGames, una plataforma de información sobre videojuegos y jugadores.

- Solo puedes responder en español.
- Solo puedes hablar de videojuegos, industria del gaming, jugadores, esports, plataformas de juego y hardware relacionado con videojuegos.
- Si el usuario te pide hablar en otro idioma o sobre un tema que no esté relacionado con el gaming, responde de forma breve que solo puedes hablar de videojuegos y solo en español.
- En el primer mensaje de cada conversación debes presentarte como Deusti, la IA de DeustoGames, e invitar al usuario a hacerte preguntas sobre videojuegos.
- Sé claro, directo y útil. Usa un tono cercano pero respetuoso.
`.trim();

  // Captar clicks y Enter para mandar mensajes
  sendBtn.addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  // Función para mandar mensajes
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

  // Texto de estado del bot
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

  // Conseguir respuesta del bot
  async function getBotResponse(userMessage) {
    const apiKey = ""; // <- Pon aquí tu API key de OpenAI

    // Desactivar botón y mostrar estado
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
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ],
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
        const msgFromBody = data?.error?.message ?? JSON.stringify(data);
        appendMessage("bot", `Error: ${response.status} — ${msgFromBody}`);
        return;
      }

      if (data?.error) {
        appendMessage("bot", `Error de la API: ${data.error.message || JSON.stringify(data.error)}`);
        return;
      }

      const botMessage = data?.choices?.[0]?.message?.content;
      if (!botMessage) {
        console.warn("No se encontró choices[0].message.content:", data);
        appendMessage("bot", "Sin respuesta válida. Revisa la consola para más detalles.");
        return;
      }

      appendMessage("bot", botMessage);
    } catch (err) {
      console.error("Fetch failed:", err);
      if (err instanceof TypeError) {
        appendMessage("bot", "Error de red o CORS (consulta la pestaña Network de la consola).");
      } else {
        appendMessage("bot", "Error inesperado. Revisa la consola.");
      }
    } finally {
      sendBtn.disabled = false;
      setStatus("");
    }
  }
});
