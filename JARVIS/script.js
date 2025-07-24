const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Speech synthesis (Text to Speech)
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.volume = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

// Greeting message based on time
function wishMe() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 12) speak("Good Morning Sir");
  else if (hour === 12) speak("Good Noon Sir");
  else if (hour > 12 && hour <= 17) speak("Good Afternoon Sir");
  else speak("Good Evening Sir");
}

// Init on page load
window.addEventListener("load", () => {
  speak("Initializing JARVIS...");
  wishMe();
});

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  content.textContent = "Listening...";
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
});

// Process voice commands
function takeCommand(message) {
  if (message.includes("hey") || message.includes("hello")) {
    speak("Hello Sir, How may I help you?");
  } else if (message.includes("open google")) {
    window.open("https://www.google.com", "_blank");
    speak("Opening Google");
  } else if (message.includes("open youtube")) {
    window.open("https://www.youtube.com", "_blank");
    speak("Opening YouTube");
  } else if (message.includes("open facebook")) {
    window.open("https://www.facebook.com", "_blank");
    speak("Opening Facebook");
  } else if (message.includes("what is") || message.includes("who is") || message.includes("what are")) {
    window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
    speak("Here is what I found on the internet.");
  } else if (message.includes("wikipedia")) {
    window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
    speak("Here is the Wikipedia result.");
  } else if (message.includes("time")) {
    const time = new Date().toLocaleTimeString();
    speak("The time is " + time);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleDateString();
    speak("Today's date is " + date);
  } else if (message.includes("calculator")) {
    speak("Sorry, I cannot open Calculator from a browser.");
  } else {
    window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
    speak("I found this information on Google.");
  }
}
