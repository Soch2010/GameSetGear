const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botTyping() {
  const typing = document.createElement("div");
  typing.classList.add("message", "bot", "typing");
  typing.textContent = "Typing...";
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typing;
}

async function getAIResponse(userText) {
  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
    return "⚠️ Error: AI could not respond. Check your Netlify function logs.";
  }

  return data.reply;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  const typingEl = botTyping();

  const reply = await getAIResponse(userText);

  typingEl.remove();
  addMessage(reply, "bot");
});
