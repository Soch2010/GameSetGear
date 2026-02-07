const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

addMessage(
  "Hey! 👋 Ask me anything about tennis rackets, shoes, or accessories on Game Set Gear.",
  "bot"
);

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";

  addMessage("Typing...", "bot");

  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // remove Typing...
    chatMessages.lastChild.remove();

    addMessage(data.reply || "No reply received.", "bot");
  } catch (err) {
    chatMessages.lastChild.remove();
    addMessage("Error connecting to the AI.", "bot");
  }
});
