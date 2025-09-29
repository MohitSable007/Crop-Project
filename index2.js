// Shortcuts
const $ = sel => document.querySelector(sel);

// State
let state = { user: null };

// i18n dictionary
const i18n = {
  English: {
    welcome: "Welcome",
    genericTip: "Keep fields clean and irrigated on time."
  },
  Punjabi: {
    welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
    genericTip: "ਖੇਤ ਸਾਫ਼ ਰੱਖੋ ਅਤੇ ਸਮੇਂ ਤੇ ਸਿੰਚਾਈ ਕਰੋ।"
  },
  Hindi: {
    welcome: "स्वागत है",
    genericTip: "खेत साफ रखें और समय पर सिंचाई करें।"
  }
};

// Login
$("#loginBtn").addEventListener("click", () => {
  const name = $("#name").value.trim();
  if (!name) return alert("Enter name");

  state.user = {
    name,
    phone: $("#phone").value.trim(),
    language: $("#language").value
  };

  $("#login").classList.add("hidden");
  $("#dashboard").classList.remove("hidden");
  $("#farmer-name").textContent =
    `${i18n[state.user.language].welcome}, ${name}`;
  loadData();
});

// Fake Data Load
function loadData() {
  $("#weather").innerHTML = `<h3 class="font-bold">Weather</h3>
    <p>Sunny, 30°C. No rain today.</p>`;
  $("#soil").innerHTML = `<h3 class="font-bold">Soil</h3>
    <p>Loamy, pH 6.8. Moisture adequate.</p>`;
  $("#advisory").innerHTML = `<h3 class="font-bold">Crop Advisory</h3>
    <p>Ideal time for paddy irrigation. Watch for stem borer.</p>`;
  $("#mandi").innerHTML = `<h3 class="font-bold">Mandi Prices</h3>
    <ul><li>Wheat ₹2100/qtl</li><li>Paddy ₹1950/qtl</li></ul>`;
}

// Chatbot
function addChatBubble(text, sender) {
  const div = document.createElement("div");
  div.className = `my-1 p-2 rounded-lg max-w-[80%] ${
    sender === "me" ? "bg-green-200 ml-auto" : "bg-gray-200"
  }`;
  div.textContent = text;
  $("#chatbox").appendChild(div);
  $("#chatbox").scrollTop = $("#chatbox").scrollHeight;
}

function aiRespond(message) {
  const langKey = state.user?.language || "English";
  const lang = i18n[langKey] || i18n.English;
  const msg = (message || "").toLowerCase();

  let reply = lang.genericTip;

  if (msg.includes("weather") || msg.includes("ਮੌਸਮ") || msg.includes("मौसम")) {
    reply = "Next 3 days look dry — good for field work.";
  } else if (msg.includes("soil") || msg.includes("ਮਿੱਟੀ") || msg.includes("मिट्टी")) {
    reply = "Improve soil with compost; maintain NPK balance.";
  } else if (msg.includes("fertilizer") || msg.includes("ਖਾਦ") || msg.includes("खाद")) {
    reply = "Use split nitrogen applications; avoid excess urea.";
  } else if (msg.includes("pest") || msg.includes("ਕੀੜੇ") || msg.includes("कीट")) {
    reply = "Scout crops regularly; use pheromone traps if needed.";
  } else if (msg.includes("mandi") || msg.includes("ਭਾਵ") || msg.includes("मंडी")) {
    reply = "Check mandi section for today’s updated prices.";
  }

  addChatBubble(reply, "ai");
}

$("#chat-form").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("#chat-input");
  const text = input.value.trim();
  if (!text) return;
  addChatBubble(text, "me");
  aiRespond(text);
  input.value = "";
});
