# 🚀 LingoVoice AI - Complete Command Reference

This file contains **all commands in sequence** that you need to run to build the LingoVoice AI project from scratch.

---

## 📋 Phase 1: Initial Setup

### Step 1: Create Project Directory
```bash
# Create and navigate to project folder
mkdir LingoVoiceAI
cd LingoVoiceAI
```

### Step 2: Initialize Git
```bash
git init
```

### Step 3: Create Project Structure
```bash
# Create all necessary directories
mkdir backend
mkdir backend/utils
mkdir templates
mkdir static
mkdir static/js
mkdir screenshots
```

---

## 📋 Phase 2: Python Environment Setup

### Step 4: Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv
```

### Step 5: Activate Virtual Environment

**On Windows:**
```bash
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

### Step 6: Install Python Dependencies
```bash
# Install all required packages
pip install flask
pip install flask-cors
pip install python-dotenv
pip install requests
```

### Step 7: Generate requirements.txt
```bash
pip freeze > requirements.txt
```

---

## 📋 Phase 3: Node.js Setup (for Lingo.dev SDK)

### Step 8: Initialize npm
```bash
npm init -y
```

### Step 9: Install Lingo.dev SDK
```bash
npm install lingo.dev
```

### Step 10: Install Node Dependencies
```bash
# If you need additional dependencies
npm install dotenv
```

---

## 📋 Phase 4: Environment Configuration

### Step 11: Create .env File

**On Windows (PowerShell):**
```powershell
New-Item .env -ItemType File
```

**On macOS/Linux:**
```bash
touch .env
```

Then edit `.env` and add:
```env
LINGO_API_KEY=your_lingo_api_key_here
MURF_API_KEY=your_murf_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

---

## 📋 Phase 5: Create Application Files

You'll need to create these files manually or copy from the provided code:

### Step 12: Create Backend Files
```bash
# These will be created with your text editor
# Files to create:
# - backend/app.py
# - backend/utils/lingo_helper.py
# - backend/utils/lingo_translate.js
```

### Step 13: Create Frontend Files
```bash
# Files to create:
# - templates/index.html
# - static/js/app.js
```

### Step 14: Create Documentation Files
```bash
# Files to create:
# - README.md
# - .gitignore
# - SETUP_GUIDE.md
```

---

## 📋 Phase 6: Get API Keys

### Step 15: Obtain Lingo.dev API Key
```bash
# Open browser to:
# https://lingo.dev
# Sign up → Dashboard → Generate API Key
```

### Step 16: Obtain Murf AI API Key
```bash
# Open browser to:
# https://murf.ai/api
# Sign up → API Dashboard → Generate API Key
```

---

## 📋 Phase 7: Testing

### Step 17: Run the Flask Application
```bash
# Make sure virtual environment is activated
python backend/app.py
```

### Step 18: Open in Browser
```bash
# Open your browser and go to:
# http://localhost:5000
```

---

## 📋 Phase 8: Git Operations

### Step 19: Add Files to Git
```bash
git add .
```

### Step 20: Create Initial Commit
```bash
git commit -m "Initial commit: LingoVoice AI - Speech-to-Speech Translation"
```

### Step 21: Create GitHub Repository
```bash
# Go to GitHub and create a new repository
# Then link your local repo:
git remote add origin https://github.com/yourusername/LingoVoiceAI.git
```

### Step 22: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

## 📋 Phase 9: Development Workflow

### Step 23: Start Development Server
```bash
# Activate virtual environment first
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Run Flask app
python backend/app.py
```

### Step 24: Test API Endpoints (Optional)

**Using curl:**
```bash
# Test translation endpoint
curl -X POST http://localhost:5000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","source_language":"en","target_language":"hi"}'

# Test speech synthesis endpoint
curl -X POST http://localhost:5000/api/synthesize \
  -H "Content-Type: application/json" \
  -d '{"text":"नमस्ते","language":"hi-IN","voice_id":"swara"}'

# Test complete pipeline
curl -X POST http://localhost:5000/api/translate-and-speak \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","source_language":"en","target_language":"hi","voice_id":"swara"}'
```

---

## 📋 Phase 10: Deployment Preparation

### Step 25: Create Procfile (for Heroku/Railway)
```bash
echo "web: python backend/app.py" > Procfile
```

### Step 26: Create runtime.txt
```bash
echo "python-3.11" > runtime.txt
```

### Step 27: Update Environment Variables for Production
```bash
# Edit .env file and change:
# FLASK_ENV=production
# FLASK_DEBUG=False
```

---

## 📋 Phase 11: Deployment Commands

### Option A: Deploy to Heroku
```bash
# Install Heroku CLI first, then:
heroku login
heroku create lingovoice-ai
heroku config:set LINGO_API_KEY=your_key_here
heroku config:set MURF_API_KEY=your_key_here
git push heroku main
heroku open
```

### Option B: Deploy to Railway
```bash
# Install Railway CLI first, then:
railway login
railway init
railway add
railway up
```

### Option C: Deploy to Render
```bash
# No CLI needed - use Render dashboard
# 1. Connect GitHub repo
# 2. Add environment variables in dashboard
# 3. Click Deploy
```

---

## 📋 Phase 12: Testing Checklist

### Step 28: Functionality Tests
```bash
# Run each test manually in the browser:
# 1. Open http://localhost:5000
# 2. Select English as source language
# 3. Select Hindi as target language
# 4. Click "Start Recording"
# 5. Say "Hello, how are you?"
# 6. Verify transcription appears
# 7. Verify translation appears
# 8. Verify audio plays
```

---

## 📋 Common Maintenance Commands

### Update Dependencies
```bash
pip install --upgrade flask flask-cors python-dotenv requests
pip freeze > requirements.txt
```

### Clean Cache
```bash
# Remove Python cache
find . -type d -name "__pycache__" -exec rm -r {} +
find . -type f -name "*.pyc" -delete

# Remove Node cache
rm -rf node_modules
npm install
```

### Restart Development Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
python backend/app.py
```

### View Logs
```bash
# Flask logs appear in terminal
# For more detailed logging, check:
tail -f *.log
```

---

## 📋 Debugging Commands

### Check Python Version
```bash
python --version
```

### Check Virtual Environment
```bash
which python  # macOS/Linux
where python  # Windows
```

### Check Installed Packages
```bash
pip list
```

### Check Node Version
```bash
node --version
npm --version
```

### Check Environment Variables
```bash
# On macOS/Linux
printenv | grep LINGO
printenv | grep MURF

# On Windows (PowerShell)
Get-ChildItem Env: | Where-Object {$_.Name -like "*LINGO*"}
Get-ChildItem Env: | Where-Object {$_.Name -like "*MURF*"}
```

---

## 📋 Quick Reference: Daily Workflow

### Starting Work
```bash
cd LingoVoiceAI
source venv/bin/activate  # or venv\Scripts\activate on Windows
python backend/app.py
# Open http://localhost:5000 in browser
```

### Making Changes
```bash
# Edit files with your editor
# Server auto-reloads if FLASK_DEBUG=True
# Test changes in browser
```

### Committing Changes
```bash
git status
git add .
git commit -m "Description of changes"
git push
```

### Stopping Work
```bash
# Press Ctrl+C to stop Flask server
deactivate  # Deactivate virtual environment
```

---

## 📋 Emergency Fixes

### Port Already in Use
```bash
# On macOS/Linux
lsof -ti:5000 | xargs kill -9

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Corrupted Virtual Environment
```bash
# Delete and recreate
rm -rf venv  # or rmdir /s venv on Windows
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Git Issues
```bash
# Force push (use carefully!)
git push -f origin main

# Reset to last commit
git reset --hard HEAD

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

---

## 📋 Performance Testing

### Test API Response Time
```bash
time curl -X POST http://localhost:5000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","source_language":"en","target_language":"hi"}'
```

### Load Testing (Optional)
```bash
# Install Apache Bench first
ab -n 100 -c 10 http://localhost:5000/
```

---

## 🎯 Summary: Complete Command Flow

```bash
# 1. Setup
mkdir LingoVoiceAI && cd LingoVoiceAI
git init
mkdir -p backend/utils templates static/js

# 2. Python
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install flask flask-cors python-dotenv requests
pip freeze > requirements.txt

# 3. Node.js
npm init -y
npm install lingo.dev

# 4. Configuration
touch .env  # Create and edit with API keys

# 5. Run
python backend/app.py

# 6. Git
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

---

**All commands ready! Follow in sequence for success! 🚀**
