# LingoVoice AI - Complete Setup Guide
## From Zero to Full Project

This guide will walk you through building LingoVoice AI step-by-step, from initial setup to final deployment.

---

## 📋 Prerequisites

Before starting, ensure you have:
- Python 3.8+ installed
- Node.js 16+ installed (for Lingo.dev SDK)
- Git installed
- A text editor (VS Code recommended)
- Active internet connection

---

## 🔑 Step 1: Get Your API Keys

### 1.1 Lingo.dev API Key
1. Go to https://lingo.dev
2. Sign up for a free account
3. Navigate to your dashboard
4. Generate an API key and save it securely
5. Copy your API key (looks like: `lingo_xxxxxxxxxxxxx`)

### 1.2 Murf AI API Key
1. Go to https://murf.ai/api
2. Sign up for an account (they offer free trial)
3. Navigate to API Dashboard
4. Generate an API key
5. Copy your API key

---

## 🚀 Step 2: Project Setup

### 2.1 Create Project Directory
```bash
# Create main project folder
mkdir LingoVoiceAI
cd LingoVoiceAI

# Create project structure
mkdir backend frontend static templates
mkdir backend/utils
```

### 2.2 Initialize Git Repository
```bash
git init
```

### 2.3 Create Python Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

---

## 📦 Step 3: Install Dependencies

### 3.1 Install Python Packages
```bash
# Install Flask and other backend dependencies
pip install flask flask-cors python-dotenv requests

# Install Lingo.dev SDK (if available for Python, otherwise we'll use API)
# Note: Lingo.dev primarily has JS SDK, we'll use REST API for Python
```

### 3.2 Install Frontend Dependencies (Optional - for Lingo.dev CLI)
```bash
# If you want to use Lingo.dev CLI for static translations
npm init -y
npm install lingo.dev
```

---

## 🔧 Step 4: Create Configuration Files

### 4.1 Create .env File
Create a file named `.env` in the root directory:

```bash
# .env file
LINGO_API_KEY=your_lingo_api_key_here
MURF_API_KEY=your_murf_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

### 4.2 Create .gitignore File
```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/

# Environment variables
.env
.env.local

# Flask
instance/
.webassets-cache

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Node modules (if using Lingo.dev CLI)
node_modules/
package-lock.json

# Cache
.lingo-cache/
```

---

## 💻 Step 5: Build the Backend

### 5.1 Create Flask Application (backend/app.py)
```python
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
import json

# Load environment variables
load_dotenv()

app = Flask(__name__, template_folder="../templates", static_folder="../static")
CORS(app)

# API Keys
LINGO_API_KEY = os.getenv("LINGO_API_KEY")
MURF_API_KEY = os.getenv("MURF_API_KEY")

@app.route("/")
def index():
    """Serve the main HTML page"""
    return render_template("index.html")

@app.route("/api/translate", methods=["POST"])
def translate_text():
    """
    Translate text using Lingo.dev API
    Expects JSON: {
        "text": "Hello",
        "source_language": "en",
        "target_language": "hi"
    }
    """
    try:
        data = request.get_json()
        text = data.get("text")
        source_lang = data.get("source_language", "en")
        target_lang = data.get("target_language", "hi")

        # Call Lingo.dev API for translation
        # Note: Using a generic translation approach
        # Lingo.dev doesn't have a direct public REST API endpoint
        # We'll use their SDK approach or fallback
        
        translation_result = translate_with_lingo(text, source_lang, target_lang)
        
        return jsonify({
            "success": True,
            "original_text": text,
            "translated_text": translation_result,
            "source_language": source_lang,
            "target_language": target_lang
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/api/synthesize", methods=["POST"])
def synthesize_speech():
    """
    Convert translated text to speech using Murf AI
    Expects JSON: {
        "text": "Translated text",
        "language": "hi",
        "voice_id": "hi-IN-swara"
    }
    """
    try:
        data = request.get_json()
        text = data.get("text")
        language = data.get("language", "hi-IN")
        voice_id = data.get("voice_id", "swara")  # Default Hindi voice

        # Call Murf AI API
        audio_url = generate_speech_murf(text, voice_id)
        
        return jsonify({
            "success": True,
            "audio_url": audio_url,
            "text": text
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/api/translate-and-speak", methods=["POST"])
def translate_and_speak():
    """
    Complete pipeline: Translate text and generate speech
    Expects JSON: {
        "text": "Hello world",
        "source_language": "en",
        "target_language": "hi",
        "voice_id": "swara"
    }
    """
    try:
        data = request.get_json()
        text = data.get("text")
        source_lang = data.get("source_language", "en")
        target_lang = data.get("target_language", "hi")
        voice_id = data.get("voice_id", "swara")

        # Step 1: Translate
        translated_text = translate_with_lingo(text, source_lang, target_lang)
        
        # Step 2: Generate Speech
        audio_url = generate_speech_murf(translated_text, voice_id)
        
        return jsonify({
            "success": True,
            "original_text": text,
            "translated_text": translated_text,
            "audio_url": audio_url,
            "source_language": source_lang,
            "target_language": target_lang
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

def translate_with_lingo(text, source_lang, target_lang):
    """
    Translate text using Lingo.dev approach
    
    Note: Lingo.dev SDK is primarily for JavaScript.
    For Python backend, we can either:
    1. Use a Node.js microservice
    2. Make HTTP requests to a Lingo.dev endpoint
    3. Use an alternative approach
    
    For this hackathon, we'll implement a workaround.
    In production, you'd integrate properly with Lingo.dev SDK.
    """
    
    # TEMPORARY: Using a placeholder
    # In real implementation, you would:
    # - Set up a Node.js service with Lingo.dev SDK
    # - Or use Lingo.dev's actual API endpoint if available
    
    # For demo purposes, returning the text with a marker
    # Replace this with actual Lingo.dev integration
    return f"[LINGO] {text} → {target_lang}"

def generate_speech_murf(text, voice_id):
    """
    Generate speech using Murf AI API
    """
    url = "https://api.murf.ai/v1/speech/generate"
    
    headers = {
        "api-key": MURF_API_KEY,
        "Content-Type": "application/json"
    }
    
    payload = {
        "text": text,
        "voiceId": voice_id,
        "model": "GEN2",
        "format": "MP3",
        "sampleRate": 44100,
        "channelType": "STEREO"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    
    result = response.json()
    audio_url = result.get("audioFile", "")
    
    return audio_url

if __name__ == "__main__":
    app.run(debug=True, port=5000)
```

### 5.2 Create Lingo Integration Helper (backend/utils/lingo_helper.py)

Since Lingo.dev SDK is JavaScript-based, we have two options:

**Option A: Node.js Bridge Service**
```python
# backend/utils/lingo_helper.py
import subprocess
import json

def translate_via_node(text, source_locale, target_locale):
    """
    Call Node.js script that uses Lingo.dev SDK
    """
    try:
        result = subprocess.run(
            ['node', 'backend/utils/lingo_translate.js', text, source_locale, target_locale],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        raise Exception(f"Translation failed: {e.stderr}")
```

**Option B: Direct API Calls**
```python
# backend/utils/lingo_helper.py
import requests
import os

def translate_text_lingo(text, source_locale, target_locale):
    """
    Translate using Lingo.dev localization engine
    
    Note: This is a conceptual implementation.
    Check Lingo.dev documentation for actual API endpoints.
    """
    api_key = os.getenv("LINGO_API_KEY")
    
    # Lingo.dev primarily works through SDK
    # For Python, we need to use their API if available
    # or create a Node.js microservice
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "text": text,
        "sourceLocale": source_locale,
        "targetLocale": target_locale
    }
    
    # This URL is conceptual - check Lingo.dev docs for actual endpoint
    # url = "https://api.lingo.dev/v1/translate"
    # response = requests.post(url, headers=headers, json=payload)
    # return response.json()["translatedText"]
    
    # Placeholder return
    return f"[Translated: {text}]"
```

---

## 🎨 Step 6: Build the Frontend

### 6.1 Create HTML Template (templates/index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LingoVoice AI - Real-time Speech Translation</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <header class="text-center mb-12">
            <h1 class="text-5xl font-bold text-indigo-900 mb-4">
                🌍 LingoVoice AI
            </h1>
            <p class="text-xl text-gray-600">
                Real-time Speech-to-Speech Translation powered by Lingo.dev & Murf AI
            </p>
        </header>

        <!-- Main Card -->
        <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <!-- Language Selection -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Source Language
                    </label>
                    <select id="sourceLanguage" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none">
                        <option value="en">English</option>
                        <option value="zh">Chinese (Mandarin)</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Target Language
                    </label>
                    <select id="targetLanguage" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none">
                        <option value="hi">Hindi</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                    </select>
                </div>
            </div>

            <!-- Speech Recognition Area -->
            <div class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">Speak Now</h2>
                    <button id="startRecording" class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd" />
                        </svg>
                        Start Recording
                    </button>
                </div>
                
                <div id="transcriptionBox" class="min-h-32 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <p class="text-gray-400 italic">Click "Start Recording" to begin...</p>
                </div>
            </div>

            <!-- Translation Display -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Translation</h2>
                <div id="translationBox" class="min-h-32 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <p class="text-gray-400 italic">Translation will appear here...</p>
                </div>
            </div>

            <!-- Audio Player -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Listen</h2>
                <div id="audioPlayerContainer" class="hidden">
                    <audio id="audioPlayer" controls class="w-full">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div id="audioPlaceholder" class="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-center text-gray-400">
                    Audio will play automatically after translation
                </div>
            </div>

            <!-- Status Indicator -->
            <div id="statusIndicator" class="p-4 rounded-lg hidden">
                <p id="statusText" class="text-center font-semibold"></p>
            </div>
        </div>

        <!-- Footer -->
        <footer class="text-center mt-12 text-gray-600">
            <p>Powered by <strong>Lingo.dev</strong> & <strong>Murf AI</strong></p>
            <p class="text-sm mt-2">Built for Hackathon 2026</p>
        </footer>
    </div>

    <script src="/static/js/app.js"></script>
</body>
</html>
```

### 6.2 Create JavaScript Application (static/js/app.js)
```javascript
// Web Speech API Recognition
let recognition;
let isRecording = false;

// DOM Elements
const startRecordingBtn = document.getElementById('startRecording');
const transcriptionBox = document.getElementById('transcriptionBox');
const translationBox = document.getElementById('translationBox');
const audioPlayer = document.getElementById('audioPlayer');
const audioPlayerContainer = document.getElementById('audioPlayerContainer');
const audioPlaceholder = document.getElementById('audioPlaceholder');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const sourceLanguageSelect = document.getElementById('sourceLanguage');
const targetLanguageSelect = document.getElementById('targetLanguage');

// Initialize Speech Recognition
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onstart = () => {
            console.log('Speech recognition started');
            updateStatus('Listening...', 'bg-blue-100 text-blue-800');
        };
        
        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            
            transcriptionBox.innerHTML = `<p class="text-gray-800">${transcript}</p>`;
            
            // If final result, process translation
            if (event.results[event.results.length - 1].isFinal) {
                processTranslation(transcript);
            }
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            updateStatus(`Error: ${event.error}`, 'bg-red-100 text-red-800');
        };
        
        recognition.onend = () => {
            console.log('Speech recognition ended');
            isRecording = false;
            startRecordingBtn.textContent = 'Start Recording';
            startRecordingBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
            startRecordingBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        };
    } else {
        alert('Speech recognition not supported in this browser. Please use Chrome or Edge.');
    }
}

// Toggle Recording
function toggleRecording() {
    if (!isRecording) {
        const sourceLang = sourceLanguageSelect.value;
        recognition.lang = getLanguageCode(sourceLang);
        recognition.start();
        isRecording = true;
        startRecordingBtn.textContent = 'Stop Recording';
        startRecordingBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        startRecordingBtn.classList.add('bg-red-600', 'hover:bg-red-700');
    } else {
        recognition.stop();
    }
}

// Get full language code for speech recognition
function getLanguageCode(lang) {
    const langMap = {
        'en': 'en-US',
        'zh': 'zh-CN',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'hi': 'hi-IN'
    };
    return langMap[lang] || 'en-US';
}

// Process Translation
async function processTranslation(text) {
    updateStatus('Translating with Lingo.dev...', 'bg-yellow-100 text-yellow-800');
    
    const sourceLanguage = sourceLanguageSelect.value;
    const targetLanguage = targetLanguageSelect.value;
    
    try {
        const response = await fetch('/api/translate-and-speak', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                source_language: sourceLanguage,
                target_language: targetLanguage,
                voice_id: getVoiceId(targetLanguage)
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            translationBox.innerHTML = `<p class="text-gray-800 text-lg">${data.translated_text}</p>`;
            updateStatus('Translation complete! Generating speech...', 'bg-green-100 text-green-800');
            
            // Play audio
            if (data.audio_url) {
                audioPlayer.src = data.audio_url;
                audioPlayerContainer.classList.remove('hidden');
                audioPlaceholder.classList.add('hidden');
                audioPlayer.play();
                updateStatus('Playing audio...', 'bg-green-100 text-green-800');
            }
        } else {
            throw new Error(data.error || 'Translation failed');
        }
    } catch (error) {
        console.error('Translation error:', error);
        updateStatus(`Error: ${error.message}`, 'bg-red-100 text-red-800');
        translationBox.innerHTML = `<p class="text-red-600">Translation failed. Please try again.</p>`;
    }
}

// Get Voice ID for Murf AI based on language
function getVoiceId(language) {
    const voiceMap = {
        'hi': 'swara',           // Hindi
        'en': 'natalie',         // English
        'es': 'mateo',           // Spanish
        'fr': 'gabrielle',       // French
        'de': 'werner',          // German
        'zh': 'xiaomei'          // Chinese
    };
    return voiceMap[language] || 'natalie';
}

// Update Status Indicator
function updateStatus(message, classes) {
    statusText.textContent = message;
    statusIndicator.className = `p-4 rounded-lg ${classes}`;
    statusIndicator.classList.remove('hidden');
    
    // Auto-hide success messages after 3 seconds
    if (classes.includes('bg-green')) {
        setTimeout(() => {
            statusIndicator.classList.add('hidden');
        }, 3000);
    }
}

// Event Listeners
startRecordingBtn.addEventListener('click', toggleRecording);

// Initialize on page load
window.addEventListener('load', () => {
    initializeSpeechRecognition();
});
```

---

## 🔗 Step 7: Proper Lingo.dev Integration

For proper Lingo.dev integration, create a Node.js bridge service:

### 7.1 Create Node.js Translation Service (backend/utils/lingo_translate.js)
```javascript
// backend/utils/lingo_translate.js
import { LingoDotDevEngine } from 'lingo.dev/sdk';

const lingoDotDev = new LingoDotDevEngine({
    apiKey: process.env.LINGODOTDEV_API_KEY
});

async function translateText() {
    const text = process.argv[2];
    const sourceLocale = process.argv[3];
    const targetLocale = process.argv[4];

    try {
        const translated = await lingoDotDev.localizeText(text, {
            sourceLocale: sourceLocale,
            targetLocale: targetLocale
        });
        
        console.log(translated);
    } catch (error) {
        console.error('Translation error:', error.message);
        process.exit(1);
    }
}

translateText();
```

### 7.2 Create package.json for Node dependencies
```json
{
  "name": "lingovoice-ai-translation",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "lingo.dev": "^latest"
  }
}
```

### 7.3 Install Node dependencies
```bash
npm install
```

---

## 🧪 Step 8: Testing

### 8.1 Test Backend API
```bash
# Activate virtual environment if not already active
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Run Flask app
python backend/app.py
```

### 8.2 Test in Browser
1. Open browser to `http://localhost:5000`
2. Select source and target languages
3. Click "Start Recording"
4. Speak in the source language
5. Watch translation appear
6. Listen to the generated audio

---

## 📝 Step 9: Create requirements.txt
```bash
pip freeze > requirements.txt
```

Your `requirements.txt` should contain:
```
Flask==3.0.0
flask-cors==4.0.0
python-dotenv==1.0.0
requests==2.31.0
```

---

## 🎥 Step 10: Prepare for Demo

### 10.1 Test Complete Flow
1. Test English → Hindi translation
2. Test Chinese → Hindi translation
3. Verify audio playback
4. Check error handling

### 10.2 Record Demo Video (1-3 minutes)
**Script outline:**
1. **Introduction (15 seconds)**
   - "Hi, I'm presenting LingoVoice AI"
   - "A real-time speech-to-speech translation agent"

2. **Technology Stack (20 seconds)**
   - "Powered by Lingo.dev for accurate translations"
   - "And Murf AI for natural voice synthesis"

3. **Live Demo (60 seconds)**
   - Show interface
   - Speak in English
   - Show translation to Hindi
   - Play audio output

4. **Features Highlight (20 seconds)**
   - Multiple language support
   - Real-time processing
   - Natural-sounding voices

5. **Closing (15 seconds)**
   - Thank you message
   - GitHub link

---

## 🚀 Step 11: Deployment (Optional)

### 11.1 Deploy to Render/Railway/Heroku
```bash
# Create Procfile for deployment
echo "web: python backend/app.py" > Procfile

# Create runtime.txt
echo "python-3.11" > runtime.txt
```

### 11.2 Environment Variables
Set these in your deployment platform:
- `LINGO_API_KEY`
- `MURF_API_KEY`
- `FLASK_ENV=production`

---

## 📊 Project Structure (Final)

```
LingoVoiceAI/
├── backend/
│   ├── app.py
│   └── utils/
│       ├── lingo_helper.py
│       └── lingo_translate.js
├── templates/
│   └── index.html
├── static/
│   └── js/
│       └── app.js
├── venv/
├── .env
├── .gitignore
├── requirements.txt
├── package.json
├── README.md
└── Procfile
```

---

## 🐛 Troubleshooting

### Issue: Speech Recognition Not Working
- **Solution**: Use Chrome or Edge browser
- Check microphone permissions

### Issue: Lingo.dev API Error
- **Solution**: Verify API key in `.env`
- Check quota/limits on Lingo.dev dashboard

### Issue: Murf AI Audio Not Playing
- **Solution**: Check API key
- Verify voice ID is correct
- Check browser console for CORS errors

### Issue: CORS Errors
- **Solution**: Ensure `flask-cors` is installed
- Verify CORS is configured in Flask app

---

## 📚 Resources

- Lingo.dev Docs: https://lingo.dev/en/sdk
- Murf AI Docs: https://murf.ai/api/docs
- Flask Documentation: https://flask.palletsprojects.com/
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

---

## ✅ Pre-Submission Checklist

- [ ] All API keys are in `.env` (not committed to Git)
- [ ] `.gitignore` is properly configured
- [ ] Application runs without errors
- [ ] Demo video is recorded (1-3 minutes)
- [ ] README.md is updated with:
  - [ ] Project description
  - [ ] Setup instructions
  - [ ] Technology stack
  - [ ] Screenshots/GIFs
- [ ] Code is commented
- [ ] Git repository is clean
- [ ] Pushed to GitHub

---

## 🎯 Success Criteria

Your project is ready when:
1. ✅ You can speak in one language
2. ✅ Translation appears in real-time
3. ✅ Audio plays automatically in target language
4. ✅ No console errors
5. ✅ Demo video shows complete flow

---

**Good luck with your hackathon! 🚀**

For questions or issues, refer to:
- Lingo.dev Discord: https://lingo.dev/go/discord
- Murf AI Support: Check their docs
