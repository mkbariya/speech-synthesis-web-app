const voiceSelect = document.getElementById("voice-select");

const synth = window.speechSynthesis;
let voices;

function addVoice() {
  voices = synth.getVoices();
  voices.forEach((voices) => {
    const option = document.createElement("option");
    option.textContent = `${voices.name} (${voices.lang})`;
    option.setAttribute("data-name", voices.name);
    option.setAttribute("data-lang", voices.lang);
    voiceSelect.appendChild(option);
    console.log(voices);
  });
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = addVoice;
}

function onSubmit(e) {
  e.preventDefault();
  const textInput = document.getElementById("text-input");
  const utterThis = new SpeechSynthesisUtterance(textInput.value);

  const selectOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
  console.log(selectOption);
  utterThis.voice = voices.find((voice) => voice.name === selectOption);
  synth.speak(utterThis);
}

addVoice();
document.getElementById("form").addEventListener("submit", onSubmit);
