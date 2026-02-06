@echo off
REM LingoVoice AI - Quick Setup Script for Windows
REM This script automates the initial project setup on Windows

echo.
echo ========================================
echo   LingoVoice AI - Quick Setup
echo ========================================
echo.

REM Step 1: Create project structure
echo [1/7] Creating project structure...
mkdir backend\utils 2>nul
mkdir templates 2>nul
mkdir static\js 2>nul
mkdir screenshots 2>nul
echo [OK] Project structure created
echo.

REM Step 2: Create Python virtual environment
echo [2/7] Setting up Python virtual environment...
python -m venv venv
echo [OK] Virtual environment created
echo.

REM Step 3: Activate virtual environment and install dependencies
echo [3/7] Installing Python dependencies...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install flask flask-cors python-dotenv requests
pip freeze > requirements.txt
echo [OK] Python dependencies installed
echo.

REM Step 4: Initialize npm and install Node.js dependencies
echo [4/7] Setting up Node.js environment...
call npm init -y
call npm install lingo.dev dotenv
echo [OK] Node.js dependencies installed
echo.

REM Step 5: Create .env template
echo [5/7] Creating environment configuration...
(
echo # LingoVoice AI - Environment Variables
echo # Get your API keys from:
echo # - Lingo.dev: https://lingo.dev
echo # - Murf AI: https://murf.ai/api
echo.
echo LINGO_API_KEY=your_lingo_api_key_here
echo MURF_API_KEY=your_murf_api_key_here
echo FLASK_ENV=development
echo FLASK_DEBUG=True
) > .env
echo [OK] .env file created
echo [WARNING] Remember to add your actual API keys to .env
echo.

REM Step 6: Initialize git repository
echo [6/7] Initializing Git repository...
git init
echo [OK] Git repository initialized
echo.

REM Step 7: Create deployment files
echo [7/7] Creating deployment files...
echo web: python backend/app.py > Procfile
echo python-3.11 > runtime.txt
echo [OK] Deployment files created
echo.

REM Print completion message
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Add your API keys to .env file:
echo    - Get Lingo.dev API key: https://lingo.dev
echo    - Get Murf AI API key: https://murf.ai/api
echo.
echo 2. Create the application files (see SETUP_GUIDE.md):
echo    - backend\app.py
echo    - backend\utils\lingo_helper.py
echo    - backend\utils\lingo_translate.js
echo    - templates\index.html
echo    - static\js\app.js
echo.
echo 3. Start the development server:
echo    venv\Scripts\activate
echo    python backend\app.py
echo.
echo 4. Open in browser:
echo    http://localhost:5000
echo.
echo For detailed instructions, see SETUP_GUIDE.md
echo.
pause
