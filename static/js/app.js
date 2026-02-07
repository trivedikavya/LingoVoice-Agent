/**
 * LINGOVOICE AI - Frontend Logic v5.2
 * Features: High-end UI states, Masterpiece Glow, and Global Voice Support.
 */

const aiOrb = document.getElementById('aiOrb');
const orbIcon = document.getElementById('orbIcon');
const statusLabel = document.getElementById('statusLabel');
const recordBtn = document.getElementById('recordBtn');
const recordBtnText = document.getElementById('recordBtnText');
const micIcon = document.getElementById('micIcon');
const transcriptBox = document.getElementById('transcript');
const translateBtn = document.getElementById('translateBtn');
const resultDiv = document.getElementById('result');
const translatedText = document.getElementById('translatedText');

let recognition;
let isRecording = false;
let capturedText = "";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        capturedText = finalTranscript || capturedText;
        transcriptBox.innerText = finalTranscript || interimTranscript || "Listening...";
        transcriptBox.scrollTop = transcriptBox.scrollHeight;
    };

    recognition.onend = () => {
        if (isRecording) stopRecordingSession();
    };
} else {
    statusLabel.innerText = "Error: Browser Unsupported";
}

recordBtn.onclick = () => {
    if (!isRecording) {
        startRecordingSession();
    } else {
        recognition.stop();
    }
};

function startRecordingSession() {
    isRecording = true;
    capturedText = "";
    recognition.lang = document.getElementById('sourceLanguage').value;
    
    try {
        recognition.start();
        document.body.classList.add('is-listening');
        orbIcon.className = "fa-solid fa-microphone text-white text-2xl animate-pulse";
        statusLabel.innerText = "Listening to Audio...";
        statusLabel.style.color = "#ef4444";
        
        recordBtnText.innerText = "Finish Capture";
        micIcon.className = "fa-solid fa-circle-stop mr-2";
        
        translateBtn.classList.remove('primary-glow');
        translateBtn.classList.add('opacity-20', 'pointer-events-none');
        resultDiv.classList.add('hidden');
    } catch (e) { console.error(e); }
}

function stopRecordingSession() {
    isRecording = false;
    recognition.stop();
    document.body.classList.remove('is-listening');
    orbIcon.className = "fa-solid fa-check text-white text-2xl";
    statusLabel.innerText = "Voice Captured";
    statusLabel.style.color = "#06b6d4";
    
    recordBtnText.innerText = "Capture Voice";
    micIcon.className = "fa-solid fa-microphone-lines mr-2";

    if (capturedText.trim() !== "") {
        translateBtn.classList.add('primary-glow'); 
        translateBtn.classList.remove('opacity-20', 'pointer-events-none');
        statusLabel.innerText = "Ready to Translate";
    }
}

translateBtn.onclick = async () => {
    if (!capturedText) return;

    translateBtn.classList.remove('primary-glow');
    translateBtn.disabled = true;
    translateBtn.innerHTML = '<i class="fa-solid fa-atom animate-spin mr-2"></i> Thinking...';
    
    document.body.classList.add('is-thinking');
    orbIcon.className = "fa-solid fa-brain text-white text-2xl animate-bounce";
    statusLabel.innerText = "AI Processing...";

    try {
        const response = await fetch('/api/translate-and-speak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: capturedText,
                target_language: document.getElementById('targetLanguage').value
            })
        });

        const data = await response.json();
        
        if (data.success) {
            document.body.classList.remove('is-thinking');
            document.body.classList.add('is-speaking');
            orbIcon.className = "fa-solid fa-volume-high text-white text-2xl";
            
            resultDiv.classList.remove('hidden');
            translatedText.innerText = data.translated_text;
            
            if (data.audio_url) {
                const audio = new Audio(data.audio_url);
                audio.play();
                statusLabel.innerText = "Playing Voice Output...";
                
                audio.onended = () => {
                    document.body.classList.remove('is-speaking');
                    orbIcon.className = "fa-solid fa-robot text-white text-2xl";
                    statusLabel.innerText = "System Standby";
                };
            }
        }
    } catch (error) {
        statusLabel.innerText = "System Error";
    } finally {
        translateBtn.disabled = false;
        translateBtn.innerHTML = '<i class="fa-solid fa-sparkles mr-2"></i> Translate & Speak';
    }
};
