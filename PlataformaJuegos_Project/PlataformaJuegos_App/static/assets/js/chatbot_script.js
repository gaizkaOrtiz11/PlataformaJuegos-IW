document.addEventListener("DOMContentLoaded", function () {
  // Get elements of the DOM
  const sendBtn = document.getElementById("send-btn");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");

  // Context for the API
  const promptContext = `
  Eres Deusti, la inteligencia artificial de DeustoGames, una plataforma de información sobre videojuegos y jugadores.
  - Solo puedes responder en español.
  - Solo puedes hablar de videojuegos, industria del gaming, jugadores, esports, plataformas de juego y todo lo relacionado con videojuegos.
  - Si el usuario te pide hablar en otro idioma o sobre un tema que no esté relacionado con el gaming, responde de forma breve que solo puedes hablar de videojuegos y solo en español.
  - Sé claro, directo y útil. Usa un tono cercano pero respetuoso.
  `.trim();


  // Send message with click
  sendBtn.addEventListener("click", sendMessage);

  //Send message with enter
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") { sendMessage(); }
  });

  // Show messages in the chat
  function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = message;
    chatbotMessages.appendChild(msg);  // Add div to the chat container
  }


  // Send user's message
  function sendMessage() {
    const userMessage = chatbotInput.value.trim();  // Text inside the input
    if (!userMessage) return;

    appendMessage("user", userMessage);
    chatbotInput.value = "";  // Clear input
    getBotResponse(userMessage);
  }


  // Show chat status (Escribiendo...)
  function setStatus(text) {
    let s = document.getElementById("chat-status");
    if (!s) {
      s = document.createElement("div");
      s.id = "chat-status";
      s.style.fontSize = "15px";
      s.style.color = "#666";
      s.style.marginTop = "6px";
      chatbotMessages.parentNode.appendChild(s);
    }
    s.textContent = text;
  }

  // Call to the OpenAI API
  async function getBotResponse(userMessage) {
    const apiKey = "";  // <- Add secret API key

    sendBtn.disabled = true;
    setStatus("Escribiendo...");

    // 1) Try Sending API call
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                   "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({ model: "gpt-3.5-turbo",
                               messages: [ { role: "system", content: promptContext },
                                           { role: "user", content: userMessage } ],
                               max_tokens: 150 }),
      });

      // If there is an error in the API call:
      if (!response.ok) {
        appendMessage("bot", "Ha ocurrido un error al conectar con el servidor");
        console.error("Error HTTP:", response.status, await response.text());
        return;
      }

      // 2) If there isn't an error: get bot response from the API
      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      // If there is an error in the response
      if (!botMessage) {
        appendMessage("bot", "No he podido generar una respuesta");
        console.warn("Respuesta sin contenido:", data);
        return;
      }

      // 3) If there isn't an error: send response
      appendMessage("bot", botMessage);

    // If we can't call the API
    } catch (err) {
      console.error("Fetch error:", err);
      appendMessage("bot", "Error de red o del servidor");

    // 4) Executes always with or without error (enable sendBtn)
    } finally {
      sendBtn.disabled = false;
      setStatus("");
    }
  }
});
