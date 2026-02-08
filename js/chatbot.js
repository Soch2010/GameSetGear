document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  if (!form || !input || !chatMessages) {
    console.error("Chat elements not found");
    return;
  }

  /* ---------- UTILITIES ---------- */
  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("msg", sender);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function botTyping() {
    const typing = document.createElement("div");
    typing.classList.add("msg", "bot", "typing");
    typing.textContent = "Typing...";
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typing;
  }

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ---------- KNOWLEDGE ---------- */
  const KB = {
    greetings: [
      "Hey! 👋 I’m Game Set Gear AI. Ask me about rackets, shoes, or accessories.",
      "Hi! I help with tennis gear — rackets, shoes, strings, grips.",
    ],
    out: [
      "I can only answer questions about tennis gear 🎾",
      "That’s outside my tennis knowledge. Try asking about rackets or shoes!",
    ],
    rackets: [
      "For beginners, use a lighter racket with a larger head size (100–105 sq in).",
      "Intermediate players usually prefer 98–102 sq in rackets for balance.",
      "Advanced players often choose heavier rackets for control and stability.",
    ],
    shoes: [
      "Hard court shoes focus on durability and cushioning.",
      "Clay court shoes have special grip patterns for sliding.",
      "All-court shoes work well on most surfaces.",
    ],
  };

  function getBotReply(textRaw) {
    const text = normalize(textRaw);

    if (["hi", "hello", "hey"].includes(text)) {
      return pick(KB.greetings);
    }

    const tennisWords = [
      "tennis",
      "racket",
      "racquet",
      "shoe",
      "shoes",
      "string",
      "grip",
      "bag",
      "court",
      "spin",
      "power",
      "control",
    ];

    const isTennis = tennisWords.some((w) => text.includes(w));
    if (!isTennis) return pick(KB.out);

    if (text.includes("racket") || text.includes("racquet")) {
      return pick(KB.rackets);
    }

    if (text.includes("shoe")) {
      return pick(KB.shoes);
    }

    return "Tell me what tennis gear you’re looking for 🎾";
  }

  /* ---------- SUBMIT ---------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userText = input.value.trim();
    if (!userText) return;

    addMessage(userText, "user");
    input.value = "";

    const typingEl = botTyping();

    setTimeout(() => {
      try {
        typingEl.remove();
        const reply = getBotReply(userText);
        addMessage(reply, "bot");
      } catch (err) {
        console.error(err);
        typingEl.remove();
        addMessage("Something went wrong 🤕", "bot");
      }
    }, 500);
  });

  /* ---------- START MESSAGE ---------- */
  addMessage(
    "Hi! I’m Game Set Gear AI 🎾 Ask me about rackets, shoes, or accessories.",
    "bot",
  );
});
