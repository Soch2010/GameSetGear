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

  /* ---------- KNOWLEDGE BASE ---------- */
  const KB = {
    greetings: [
      "Hey! 👋 I’m Game Set Gear AI. Ask me about rackets, shoes, or accessories.",
      "Hi! I help with tennis gear — rackets, shoes, strings, grips.",
    ],

    out: [
      "I can only answer questions about tennis gear 🎾",
      "That’s outside my tennis knowledge. Try asking about rackets or accessories!",
    ],

    rackets: [
      "Beginners should look for a lighter racket with a larger head size (100–105 sq in).",
      "Intermediate players usually prefer 98–102 sq in rackets for balance.",
      "Advanced players often choose heavier rackets for more control and stability.",
    ],

    shoes: [
      "Hard court shoes focus on durability and cushioning.",
      "Clay court shoes have herringbone patterns for grip and sliding.",
      "All-court shoes work well on most surfaces.",
    ],

    grips: [
      "Overgrips improve comfort, sweat absorption, and overall feel.",
      "Tacky overgrips give better hold, while dry overgrips last longer.",
    ],

    wilsonProOvergrip: [
      "The Wilson Pro Overgrip is 0.6 mm thick and made from polyurethane.",
      "It has a tacky feel with excellent grip memory.",
      "This overgrip offers high sweat absorption but medium durability.",
      "The perforated surface helps control moisture during long matches.",
      "Great choice if you want comfort and feel over long-lasting durability.",
    ],

    prosCons: [
      "Pros: Excellent tackiness, strong sweat absorption, very comfortable.",
      "Cons: Wears out faster and needs frequent replacement.",
    ],

    spin: [
      "For more spin, use a spin-friendly racket, polyester strings, and a secure overgrip so the racket doesn’t twist.",
      "Spin comes from fast swing speed, string snapback, and good grip stability.",
    ],
  };

  /* ---------- BOT LOGIC ---------- */
  function getBotReply(textRaw) {
    const text = normalize(textRaw);

    /* Greetings */
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
      "overgrip",
      "bag",
      "accessory",
      "spin",
      "power",
      "control",
    ];

    const isTennis = tennisWords.some((w) => text.includes(w));
    if (!isTennis) return pick(KB.out);

    /* RACKETS */
    if (text.includes("racket") || text.includes("racquet")) {
      return pick(KB.rackets);
    }

    /* SHOES */
    if (text.includes("shoe")) {
      return pick(KB.shoes);
    }

    /* OVERGRIPS */
    if (text.includes("overgrip") || text.includes("grip")) {
      if (
        text.includes("best") ||
        text.includes("good") ||
        text.includes("recommend")
      ) {
        return "A good overgrip should feel comfortable, absorb sweat well, and give a secure hold. The Wilson Pro Overgrip is popular for its tacky feel and moisture absorption.";
      }

      if (text.includes("wilson")) {
        return pick(KB.wilsonProOvergrip);
      }

      return pick(KB.grips);
    }

    /* SPIN */
    if (text.includes("spin")) {
      return pick(KB.spin);
    }

    /* PROS / CONS */
    if (text.includes("pros") || text.includes("cons")) {
      return pick(KB.prosCons);
    }

    return "I can help with specific products on this page — try asking about grips, shoes, or spin 🎾";
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
