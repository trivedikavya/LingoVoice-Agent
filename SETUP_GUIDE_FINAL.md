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
