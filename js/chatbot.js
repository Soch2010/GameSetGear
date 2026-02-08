const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

/* =========================================================
   GAME SET GEAR: WEBSITE-SPECIFIC "FAKE AI"
   - Works on GitHub Pages
   - No API key needed
   - Only answers tennis gear questions
========================================================= */

/* ---------- WEBSITE KNOWLEDGE BASE ---------- */
const KB = {
  greetings: [
    "Hey! 👋 I’m Game Set Gear AI. Ask me about rackets, shoes, or accessories.",
    "Hi! I can help you choose tennis gear — rackets, shoes, strings, grips, and more.",
    "Hello 😄 Ask me anything about tennis equipment and I’ll guide you!",
  ],

  outOfScope: [
    "I can only answer questions about tennis gear and this website 🟢",
    "That’s outside my tennis-gear knowledge. Ask me about rackets, shoes, or accessories 🎾",
    "I’m built only for Game Set Gear (tennis equipment). Try asking about a racket, shoes, or strings!",
  ],

  beginnerRacket: [
    "For beginners, go for a lighter racket with a bigger head size (around 100–105 sq in). It’s more forgiving and easier to swing.",
    "Beginner rackets should be lightweight and comfortable. A bigger head size gives you easier power and fewer mishits.",
  ],

  intermediateRacket: [
    "For intermediate players, a 100 sq in head size with balanced weight is usually best — power + control.",
    "Intermediate players often prefer a racket that gives control without feeling too heavy. A 98–102 sq in head is a great range.",
  ],

  advancedRacket: [
    "Advanced players usually prefer heavier rackets with smaller head sizes (95–98 sq in) for maximum control.",
    "If you’re advanced, a heavier racket helps stability and control, especially against fast shots.",
  ],

  shoesHardCourt: [
    "Hard court shoes should focus on durability and cushioning because hard courts wear shoes out faster.",
    "For hard courts: pick durable outsoles and good shock absorption — your knees will thank you.",
  ],

  shoesClay: [
    "Clay court shoes have special tread patterns for grip and controlled sliding.",
    "For clay: choose shoes with clay-specific outsole patterns so you don’t slip too much.",
  ],

  shoesAllCourt: [
    "All-court shoes are a safe option if you play on different surfaces. They’re balanced for grip and durability.",
    "If you play on multiple courts, all-court shoes are the best all-round choice.",
  ],

  strings: [
    "String tension affects control and power: higher tension = more control, lower tension = more power.",
    "If your shots fly long, increase tension slightly. If you struggle with power, lower tension slightly.",
  ],

  grips: [
    "Overgrips help with sweat and comfort. If your grip feels slippery, an overgrip is the easiest fix.",
    "If your hand slips while playing, try a tacky overgrip. If you sweat a lot, try an absorbent one.",
  ],

  dampeners: [
    "Vibration dampeners reduce the ‘ping’ sound and feel. They don’t massively change performance, but they improve comfort.",
    "Dampeners mainly change feel and sound. They’re great if you want a softer impact feeling.",
  ],

  bags: [
    "Tennis bags come in 3-racket, 6-racket, 9-racket sizes. Choose based on how much you carry (shoes, water, towels, etc.).",
    "If you carry shoes + accessories, a 6-racket bag is usually the sweet spot.",
  ],

  recommendationFlow: [
    "Tell me your skill level (beginner/intermediate/advanced) and what you want (power/control/spin) and I’ll recommend the best gear style.",
    "I can recommend gear if you tell me: skill level + play style + budget.",
  ],
};

/* ---------- QUICK PRODUCT STYLE RECOMMENDATIONS ---------- */
function recommendRacket(skill, style) {
  if (skill === "beginner") {
    if (style === "power")
      return "A lightweight 100–105 sq in racket with a slightly head-heavy balance.";
    if (style === "control")
      return "A lightweight 100 sq in racket with a balanced feel.";
    if (style === "spin")
      return "A 100 sq in racket with an open string pattern (16x19).";
    return "A lightweight racket (100–105 sq in) with good comfort.";
  }

  if (skill === "intermediate") {
    if (style === "power")
      return "A 100 sq in racket with moderate weight and an open pattern for easy power.";
    if (style === "control")
      return "A 98–100 sq in racket with a more stable frame for control.";
    if (style === "spin")
      return "A 100 sq in racket with an open pattern and faster swing speed.";
    return "A balanced 98–102 sq in racket for power + control.";
  }

  if (skill === "advanced") {
    if (style === "power")
      return "A heavier 98–100 sq in racket that stays stable on big shots.";
    if (style === "control")
      return "A heavier 95–98 sq in racket for precision and stability.";
    if (style === "spin")
      return "A stable 98 sq in racket with an open pattern and fast swing.";
    return "A heavier control-focused racket (95–98 sq in).";
  }

  return "Tell me if you're beginner, intermediate, or advanced and I’ll recommend the right racket type.";
}

/* ---------- UTILITIES ---------- */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender); // matches your CSS
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botTyping() {
  const typing = document.createElement("div");
  typing.classList.add("msg", "bot", "typing"); // matches your CSS
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

/* ---------- MAIN BOT LOGIC ---------- */
function getBotReply(userTextRaw) {
  const text = normalize(userTextRaw);

  // Greetings
  if (
    text === "hi" ||
    text === "hello" ||
    text === "hey" ||
    text.includes("good morning") ||
    text.includes("good evening")
  ) {
    return pickRandom(KB.greetings);
  }

  // Out-of-scope detection (non-tennis)
  const tennisKeywords = [
    "tennis",
    "racket",
    "racquet",
    "shoe",
    "shoes",
    "string",
    "strings",
    "tension",
    "grip",
    "overgrip",
    "bag",
    "dampener",
    "accessory",
    "accessories",
    "court",
    "clay",
    "hard",
    "serve",
    "spin",
    "control",
    "power",
    "beginner",
    "intermediate",
    "advanced",
  ];

  const isTennisRelated = tennisKeywords.some((kw) => text.includes(kw));

  // If not tennis related, refuse
  if (!isTennisRelated) {
    return pickRandom(KB.outOfScope);
  }

  // Beginner / intermediate / advanced racket advice
  if (
    text.includes("beginner") &&
    (text.includes("racket") || text.includes("racquet"))
  ) {
    return pickRandom(KB.beginnerRacket);
  }

  if (
    text.includes("intermediate") &&
    (text.includes("racket") || text.includes("racquet"))
  ) {
    return pickRandom(KB.intermediateRacket);
  }

  if (
    text.includes("advanced") &&
    (text.includes("racket") || text.includes("racquet"))
  ) {
    return pickRandom(KB.advancedRacket);
  }

  // Generic racket question
  if (text.includes("racket") || text.includes("racquet")) {
    // Detect style
    let style = "";
    if (text.includes("power")) style = "power";
    if (text.includes("control")) style = "control";
    if (text.includes("spin")) style = "spin";

    // Detect skill
    let skill = "";
    if (text.includes("beginner")) skill = "beginner";
    if (text.includes("intermediate")) skill = "intermediate";
    if (text.includes("advanced")) skill = "advanced";

    if (skill) return recommendRacket(skill, style);

    return "To recommend a racket, tell me your level (beginner/intermediate/advanced) and what you want: power, control, or spin 🎾";
  }

  // Shoes
  if (text.includes("shoe") || text.includes("shoes")) {
    if (text.includes("hard")) return pickRandom(KB.shoesHardCourt);
    if (text.includes("clay")) return pickRandom(KB.shoesClay);
    if (text.includes("all")) return pickRandom(KB.shoesAllCourt);

    return "What court do you play on most: hard court, clay court, or all-court?";
  }

  // Strings
  if (
    text.includes("string") ||
    text.includes("strings") ||
    text.includes("tension")
  ) {
    return pickRandom(KB.strings);
  }

  // Grips
  if (text.includes("grip") || text.includes("overgrip")) {
    return pickRandom(KB.grips);
  }

  // Dampeners
  if (text.includes("dampener") || text.includes("vibration")) {
    return pickRandom(KB.dampeners);
  }

  // Bags
  if (text.includes("bag") || text.includes("bags")) {
    return pickRandom(KB.bags);
  }

  // Accessories
  if (text.includes("accessory") || text.includes("accessories")) {
    return "Accessories include grips, strings, dampeners, wristbands, and bags. What are you looking for?";
  }

  // Default tennis response
  return pickRandom(KB.recommendationFlow);
}

/* ---------- FORM SUBMIT ---------- */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  const typingEl = botTyping();

  setTimeout(() => {
    typingEl.remove();
    const reply = getBotReply(userText);
    addMessage(reply, "bot");
  }, 600);
});

/* ---------- STARTER MESSAGE ---------- */
addMessage(
  "Hi! I’m Game Set Gear AI 🎾 Ask me about rackets, shoes, strings, grips, or accessories.",
  "bot",
);
