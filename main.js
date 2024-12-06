// script.js
const recordButton = document.getElementById("recordButton");
const stopButton = document.getElementById("stopButton");
const messagesDiv = document.getElementById("messages");

let mediaRecorder;
let audioChunks = [];

// Solicitar permisos de audio al usuario
navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
    mediaRecorder = new MediaRecorder(stream);

    recordButton.addEventListener("click", () => {
    audioChunks = [];
    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
    });

    stopButton.addEventListener("click", () => {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
    });

    mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/ogg; codecs=opus" });
    const audioURL = URL.createObjectURL(audioBlob);
    addAudioMessage(audioURL);
    };
})
.catch(error => {
    console.error("No se pudo acceder al micrófono:", error);
    alert("Por favor, permite el acceso al micrófono para usar esta función.");
});

// Agregar un mensaje de voz a la página y eliminarlo en 5 segundos
function addAudioMessage(audioURL) {
const messageDiv = document.createElement("div");
messageDiv.classList.add("audio-message");

const audio = document.createElement("audio");
audio.src = audioURL;
audio.controls = true;

messageDiv.appendChild(audio);
messagesDiv.appendChild(messageDiv);

  // Eliminar el mensaje después de 5 segundos
setTimeout(() => {
    messagesDiv.removeChild(messageDiv);
}, 5000);
}
