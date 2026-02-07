// DOM Elements
const recordBtn = document.getElementById('recordBtn');
const recordBtnText = document.getElementById('recordBtnText');
const micIcon = document.getElementById('micIcon');
const transcriptBox = document.getElementById('transcript');
const translationStep = document.getElementById('translationStep');
const translateBtn = document.getElementById('translateBtn');
const resultDiv = document.getElementById('result');
const translatedText = document.getElementById('translatedText');

let recognition;
let isRecording = false;
let capturedText = "";

// Initialize Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    // Handle the speech-to-text results
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
        
        // Update the global captured text and display it in the UI
        capturedText = finalTranscript;
        transcriptBox.innerText = finalTranscript || interimTranscript || "Listening...";
    };

    // When recording ends, check if we have text to enable Step 2
    recognition.onend = () => {
        if (capturedText.trim() !== "") {
            // Unlock the translation section
            translationStep.classList.remove('opacity-50', 'pointer-events-none');
        }
    };
    
    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        stopRecordingUI();
    };
} else {
    transcriptBox.innerText = "Speech Recognition not supported in this browser. Please use Chrome.";
}

// Function to reset UI after recording stops
function stopRecordingUI() {
    isRecording = false;
    recordBtnText.innerText = "Start Recording";
    micIcon.classList.remove('text-red-500', 'animate-pulse');
}

// STEP 1: Toggle Recording
recordBtn.onclick = () => {
    if (!isRecording) {
        // Start Recording Logic
        capturedText = "";
        recognition.lang = document.getElementById('sourceLanguage').value;
        recognition.start();
        isRecording = true;
        recordBtnText.innerText = "Stop Recording";
        micIcon.classList.add('text-red-500', 'animate-pulse');
        transcriptBox.innerText = "Listening...";
        
        // Hide previous results and lock translation step until new speech is done
        translationStep.classList.add('opacity-50', 'pointer-events-none');
        resultDiv.classList.add('hidden');
    } else {
        // Stop Recording Logic
        recognition.stop();
        stopRecordingUI();
    }
};

// STEP 2: Translate and Speak
translateBtn.onclick = async () => {
    if (!capturedText) return;

    // UI Feedback for processing
    translateBtn.disabled = true;
    translateBtn.innerText = "Processing...";

    try {
        // Send the captured text to your Python backend
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
            // Display the translation
            resultDiv.classList.remove('hidden');
            translatedText.innerText = data.translated_text;
            
            // Play the generated Murf AI audio if available
            if (data.audio_url) {
                const audio = new Audio(data.audio_url);
                audio.play();
            }
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Translation request failed:", error);
    } finally {
        // Reset button state
        translateBtn.disabled = false;
        translateBtn.innerText = "Now Translate It";
    }
};
