# 🚀 LingoVoice AI - Complete Setup Guide
## From Zero to Full Glassmorphic Speech Translation Agent

**📚 The complete guide to building LingoVoice AI from scratch with Glassmorphic UI and reactive AI Orb**

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Clone or create project
git clone https://github.com/trivedikavya/LingoVoice-Agent.git
cd LingoVoice-Agent

# 2. Get API keys from lingo.dev and murf.ai/api

# 3. Copy all provided files from outputs to your project

# 4. Setup environment
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
npm install

# 5. Configure .env with your API keys

# 6. Run
python backend/app.py

# 7. Open http://localhost:5000
```

---

## 📦 What You've Received

You now have **complete, ready-to-use files**:

### Backend Files ✅
- `app.py` - Complete Flask server with all 3 API endpoints
- `lingo_translate.js` - Node.js bridge for Lingo.dev SDK

### Frontend Files ✅
- `index.html` - Full Glassmorphic UI with AI Orb (200+ lines)
- `app.js` - Complete JavaScript with AI Orb controller (400+ lines)

### Documentation Files ✅
- `README.md` - Professional project documentation
- `TECHNICAL_DEEP_DIVE.md` - Engineering story and challenges
- `API_REFERENCE.md` - Complete API documentation
- `COMMANDS.md` - All commands in sequence
- `.gitignore` - Security and ignore rules
- `quick-setup.sh` / `quick-setup.bat` - Automated setup scripts

---

## 🎨 The Glassmorphic UI Features

Your UI includes:

### AI Orb States
- **Idle (Blue)** - Gentle floating animation
- **Listening (Red)** - Pulsing animation when capturing speech
- **Thinking (Purple)** - Bouncing while translating
- **Speaking (Green)** - Flowing while playing audio
- **Error (Orange)** - Shaking on errors

### Visual Effects
- Frosted glass morphism cards
- Dynamic mesh background
- Cyan glow on active buttons
- Smooth state transitions
- Responsive design for mobile and desktop

---

## 📋 Step-by-Step Setup

### Step 1: Get API Keys (10 minutes)

#### Lingo.dev API Key
1. Visit https://lingo.dev
2. Sign up for free account
3. Go to Dashboard
4. Click "Generate API Key"
5. Copy key (format: `lingo_xxxxxxxxxxxxx`)

#### Murf AI API Key
1. Visit https://murf.ai/api
2. Sign up (they offer free trial)
3. Navigate to API Dashboard
4. Generate API key
5. Copy key

**Save both keys securely!**

---

### Step 2: Project Structure (5 minutes)

Create this exact structure:

```
LingoVoice-Agent/
├── backend/
│   ├── app.py                    ← Copy from outputs
│   └── utils/
│       └── lingo_translate.js    ← Copy from outputs
├── templates/
│   └── index.html                ← Copy from outputs
├── static/
│   └── js/
│       └── app.js                ← Copy from outputs
├── .env                          ← Create manually
├── .gitignore                    ← Copy from outputs
├── requirements.txt              ← Create with pip freeze
├── package.json                  ← Create with npm init
└── README.md                     ← Copy from outputs
```

---

### Step 3: Copy Files (2 minutes)

**Copy these files from outputs to your project:**

1. `app.py` → `backend/app.py`
2. `lingo_translate.js` → `backend/utils/lingo_translate.js`
3. `index.html` → `templates/index.html`
4. `app.js` → `static/js/app.js`
5. `.gitignore` → `.gitignore` (root)
6. `README.md` → `README.md` (root)

---

### Step 4: Install Dependencies (5 minutes)

```bash
# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Install Python packages
pip install flask flask-cors python-dotenv requests
pip freeze > requirements.txt

# Install Node.js packages
npm init -y
npm install lingo.dev dotenv
```

---

### Step 5: Configure Environment (3 minutes)

Create `.env` file:

```env
LINGO_API_KEY=your_lingo_dev_api_key_here
MURF_API_KEY=your_murf_ai_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

**⚠️ Replace with your actual API keys!**

---

### Step 6: Test Locally (5 minutes)

```bash
# Activate virtual environment (if not already)
source venv/bin/activate

# Run the server
python backend/app.py
```

You should see:
```
==================================================
🌍 LingoVoice AI Server
==================================================
📍 Running on: http://localhost:5000
```

**Open browser to http://localhost:5000**

---

### Step 7: Test the Application

1. **Click "Start Listening"**
   - AI Orb turns red
   - Speak: "Hello, how are you?"

2. **Watch the Process**
   - Orb turns purple (translating)
   - Translation appears
   - Orb turns green (playing audio)

3. **Try Different Languages**
   - English → Hindi
   - Chinese → Spanish
   - French → German

---

## 🎥 Recording Your Demo Video

### Video Structure (1-3 minutes)

**[0:00-0:15] Hook**
```
"I didn't build just another translator - 
I built a communications terminal from the future."
```

**[0:15-0:30] Tech Stack**
```
"Powered by Lingo.dev's context-aware engine
and Murf AI's Gen2 neural voices that sound
indistinguishable from humans."
```

**[0:30-1:30] Live Demo**
- Show the Glassmorphic UI
- Click "Start Listening"
- Speak in English
- Show orb states (red → purple → green)
- Play the Hindi audio output
- Switch to Chinese → Spanish
- Show it works flawlessly

**[1:30-2:00] Innovation**
```
"I built a custom Python-Node.js bridge to leverage
Lingo.dev's JavaScript SDK while keeping a robust
Flask backend. This hybrid architecture is the key
to combining the best of both worlds."
```

**[2:00-2:15] The Why**
```
"Because the best AI apps aren't just about algorithms
- they're about how those algorithms make people feel."
```

### Recording Tips
- Record in 1080p minimum
- Use good lighting
- Clear audio (use decent microphone)
- Show your face at the start/end
- Screen record the UI demo
- Keep it under 3 minutes
- Add subtle background music (optional)

---

## 🚀 Deployment Options

### Option 1: Render (Recommended - Free Tier Available)

1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect GitHub repo
4. Configure:
   - **Build**: `pip install -r requirements.txt && npm install`
   - **Start**: `python backend/app.py`
5. Add environment variables (LINGO_API_KEY, MURF_API_KEY)
6. Deploy!

### Option 2: Railway

```bash
railway login
railway init
railway variables set LINGO_API_KEY=your_key
railway variables set MURF_API_KEY=your_key
railway up
```

### Option 3: Heroku

```bash
heroku create lingovoice-ai
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/python
heroku config:set LINGO_API_KEY=your_key
heroku config:set MURF_API_KEY=your_key
git push heroku main
```

---

## 🐛 Common Issues & Fixes

### "Speech recognition not working"
**Fix:** Use Chrome/Edge, check mic permissions

### "400 error from Murf AI"
**Fix:** Verify API key, check voice ID is Gen2 compatible:
- Hindi: `shweta`
- English: `natalie`
- Spanish: `enrique`
- French: `amara`
- German: `werner`
- Chinese: `baolin`

### "Translation returns same language"
**Fix:** Test Node.js bridge:
```bash
node backend/utils/lingo_translate.js "Hello" "en" "hi"
```

### "AI Orb not animating"
**Fix:** Hard refresh browser (Ctrl+Shift+R), check console (F12)

### "Port 5000 already in use"
**Fix:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows (then kill PID)
```

---

## ✅ Pre-Submission Checklist

Before submitting:

- [ ] All 6 languages tested and working
- [ ] AI Orb animations smooth and responsive
- [ ] Audio playback working for all voices
- [ ] No console errors
- [ ] Demo video recorded (1-3 min)
- [ ] Screenshots taken (at least 4)
- [ ] README.md filled with your details
- [ ] Code pushed to GitHub
- [ ] API keys NOT in code (check .gitignore)
- [ ] .env file NOT committed
- [ ] (Optional) Deployed to production

---

## 📚 File Details

### `app.py` - Backend Server
- **Lines**: ~300
- **Key Functions**:
  - `/api/translate` - Translation only
  - `/api/synthesize` - Speech synthesis only
  - `/api/translate-and-speak` - Complete pipeline
  - `translate_with_lingo()` - Calls Node.js bridge
  - `generate_speech_murf()` - Calls Murf AI API

### `lingo_translate.js` - Node Bridge
- **Lines**: ~50
- **Purpose**: Connects Python to Lingo.dev SDK
- **Key Feature**: Context-aware localization

### `index.html` - UI Template
- **Lines**: ~200
- **Features**:
  - Glassmorphic design
  - AI Orb with 5 states
  - Responsive grid layout
  - Custom animations
  - Dark mode optimized

### `app.js` - Frontend Logic
- **Lines**: ~400
- **Key Features**:
  - AI Orb controller
  - Web Speech API integration
  - Translation pipeline
  - Error handling
  - Debug utilities

---

## 🎯 Success Metrics

Your project is **submission-ready** when:

1. ✅ Voice input works (Web Speech API)
2. ✅ Translation happens (Lingo.dev)
3. ✅ Audio output plays (Murf AI Gen2)
4. ✅ AI Orb changes states smoothly
5. ✅ All 6 languages work
6. ✅ No console errors
7. ✅ Demo video shows complete flow
8. ✅ Code is on GitHub
9. ✅ Documentation is clear

---

## 💡 Pro Tips for Winning

1. **Emphasize the Hybrid Architecture**
   - Python + Node.js bridge is innovative
   - Shows deep technical understanding
   - Solves real integration challenge

2. **Highlight the UX**
   - Glassmorphic UI is premium
   - AI Orb provides clear feedback
   - Feels like a polished product

3. **Demonstrate Impact**
   - Real-world use case (language barriers)
   - Emotional connection (human voices)
   - Scalable solution (supports many languages)

4. **Tell the Story**
   - Reference the "challenges" you overcame
   - Explain the "mirroring bug" fix
   - Talk about Gen2 voice migration

---

## 📞 Need Help?

### Documentation
- [Lingo.dev Docs](https://lingo.dev/en/get-started)
- [Murf AI Docs](https://murf.ai/api/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

### Community
- [Lingo.dev Discord](https://lingo.dev/go/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/flask)

### Your Docs
- `TECHNICAL_DEEP_DIVE.md` - Full engineering story
- `API_REFERENCE.md` - All endpoints documented
- `COMMANDS.md` - Every command you need

---

<div align="center">

## 🏆 You're Ready to Win This Hackathon! 🏆

**Everything you need is provided. Just follow this guide step-by-step.**

Built with ❤️ for Hackathon 2026

[🌐 GitHub Repo](https://github.com/trivedikavya/LingoVoice-Agent)

</div>
