const startBtn = document.getElementById('startBtn');
const transcript = document.getElementById('transcript');
const translatedText = document.getElementById('translatedText');
const resultDiv = document.getElementById('result');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

startBtn.onclick = () => {
    recognition.start();
    startBtn.innerText = "Listening...";
    startBtn.classList.add('bg-red-600');
};

recognition.onresult = async (event) => {
    const text = event.results[0][0].transcript;
    transcript.innerText = `You said: "${text}"`;
    startBtn.innerText = "Start Recording";
    startBtn.classList.remove('bg-red-600');

    // Send to Python Backend
    const response = await fetch('/api/translate-and-speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: text,
            target_language: document.getElementById('targetLanguage').value
        })
    });

    const data = await response.json();
    if (data.success) {
        resultDiv.classList.remove('hidden');
        translatedText.innerText = data.translated_text;
        if (data.audio_url) {
            const audio = new Audio(data.audio_url);
            audio.play();
        }
    }
};