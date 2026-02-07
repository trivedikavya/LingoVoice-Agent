/**
 * LINGOVOICE AI - Core Logic v4.0
 * Features: AI Orb State Management, Dynamic Icons, 
 * and the 'Masterpiece Glow' Call-to-Action.
 */

// UI Element Mapping
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

// State Variables
let recognition;
let isRecording = false;
let capturedText = "";

// 1. Initialize High-Fidelity Speech Engine
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    // Real-time Visual Feedback during speech
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
        
        // Update the global captured text and display it live
        capturedText = finalTranscript || capturedText;
        transcriptBox.innerText = finalTranscript || interimTranscript || "Listening...";
        transcriptBox.scrollTop = transcriptBox.scrollHeight; // Auto-scroll for mobile visibility
    };

    // System cleanup when the session naturally ends
    recognition.onend = () => {
        if (isRecording) stopRecordingSession();
    };
} else {
    statusLabel.innerText = "Error: Browser Unsupported";
    transcriptBox.innerText = "Please use Google Chrome or Edge for voice features.";
}

// 2. Control: Capture Voice (Step 1)
recordBtn.onclick = () => {
    if (!isRecording) {
        startRecordingSession();
    } else {
        stopRecordingSession();
    }
};

function startRecordingSession() {
    isRecording = true;
    capturedText = "";
    recognition.lang = document.getElementById('sourceLanguage').value;
    
    try {
        recognition.start();
        
        // UI: Entering 'Active Listening' State
        document.body.classList.add('is-listening');
        orbIcon.className = "fa-solid fa-microphone text-white text-2xl animate-pulse";
        statusLabel.innerText = "Listening to Audio...";
        statusLabel.style.color = "#ef4444"; // Red for recording
        
        recordBtnText.innerText = "Finish Capture";
        micIcon.className = "fa-solid fa-circle-stop mr-2";
        
        // Lock secondary controls during new capture
        translateBtn.classList.remove('primary-glow');
        translateBtn.classList.add('opacity-20', 'pointer-events-none');
        resultDiv.classList.add('hidden');
        transcriptBox.innerText = "Speak now...";
    } catch (e) {
        console.error("Mic initialization error:", e);
    }
}

function stopRecordingSession() {
    isRecording = false;
    recognition.stop();

    // UI: Returning to 'Ready' State
    document.body.classList.remove('is-listening');
    orbIcon.className = "fa-solid fa-check text-white text-2xl";
    statusLabel.innerText = "Voice Captured";
    statusLabel.style.color = "#06b6d4"; // Cyan for success
    
    recordBtnText.innerText = "Capture Voice";
    micIcon.className = "fa-solid fa-microphone-lines mr-2";

    // TRIGGER THE GLOW: Only if valid text was captured
    if (capturedText.trim() !== "") {
        translateBtn.classList.add('primary-glow'); 
        translateBtn.classList.remove('opacity-20', 'pointer-events-none');
        statusLabel.innerText = "System Ready to Translate";
    }
}

// 3. Control: Translate & Synthesize (Step 2)
translateBtn.onclick = async () => {
    if (!capturedText) return;

    // UI: Entering 'Thinking' State
    translateBtn.classList.remove('primary-glow'); // Stop glowing while processing
    translateBtn.disabled = true;
    translateBtn.innerHTML = '<i class="fa-solid fa-atom animate-spin mr-2"></i> Processing...';
    
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
            // UI: Entering 'Speaking' State
            document.body.classList.remove('is-thinking');
            document.body.classList.add('is-speaking');
            orbIcon.className = "fa-solid fa-volume-high text-white text-2xl";
            
            resultDiv.classList.remove('hidden');
            translatedText.innerText = data.translated_text;
            
            // Auto-play the voice synthesis
            if (data.audio_url) {
                const audio = new Audio(data.audio_url);
                audio.play();
                statusLabel.innerText = "Playing Voice Output...";
                
                // Return to Standby after audio finishes
                audio.onended = () => {
                    document.body.classList.remove('is-speaking');
                    orbIcon.className = "fa-solid fa-robot text-white text-2xl";
                    statusLabel.innerText = "System Standby";
                };
            }
        } else {
            statusLabel.innerText = "System Error";
            alert("API Error: " + data.error);
        }
    } catch (error) {
        statusLabel.innerText = "Network Failure";
        orbIcon.className = "fa-solid fa-triangle-exclamation text-red-500 text-2xl";
        console.error("Server connection failed:", error);
    } finally {
        translateBtn.disabled = false;
        translateBtn.innerHTML = '<i class="fa-solid fa-sparkles mr-2"></i> Translate & Speak';
    }
};
