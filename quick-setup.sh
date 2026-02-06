#!/bin/bash

# LingoVoice AI - Quick Setup Script
# This script automates the initial project setup

echo "🚀 LingoVoice AI - Quick Setup Starting..."
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Create project structure
echo -e "${BLUE}📁 Creating project structure...${NC}"
mkdir -p backend/utils
mkdir -p templates
mkdir -p static/js
mkdir -p screenshots
echo -e "${GREEN}✓ Project structure created${NC}"
echo ""

# Step 2: Create Python virtual environment
echo -e "${BLUE}🐍 Setting up Python virtual environment...${NC}"
python3 -m venv venv
echo -e "${GREEN}✓ Virtual environment created${NC}"
echo ""

# Step 3: Activate virtual environment and install dependencies
echo -e "${BLUE}📦 Installing Python dependencies...${NC}"
source venv/bin/activate
pip install --upgrade pip
pip install flask flask-cors python-dotenv requests
pip freeze > requirements.txt
echo -e "${GREEN}✓ Python dependencies installed${NC}"
echo ""

# Step 4: Initialize npm and install Node.js dependencies
echo -e "${BLUE}📦 Setting up Node.js environment...${NC}"
npm init -y
npm install lingo.dev dotenv
echo -e "${GREEN}✓ Node.js dependencies installed${NC}"
echo ""

# Step 5: Create .env template
echo -e "${BLUE}🔐 Creating environment configuration...${NC}"
cat > .env << EOL
# LingoVoice AI - Environment Variables
# Get your API keys from:
# - Lingo.dev: https://lingo.dev
# - Murf AI: https://murf.ai/api

LINGO_API_KEY=your_lingo_api_key_here
MURF_API_KEY=your_murf_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
EOL
echo -e "${GREEN}✓ .env file created${NC}"
echo -e "${YELLOW}⚠️  Remember to add your actual API keys to .env${NC}"
echo ""

# Step 6: Initialize git repository
echo -e "${BLUE}🔧 Initializing Git repository...${NC}"
git init
echo -e "${GREEN}✓ Git repository initialized${NC}"
echo ""

# Step 7: Create deployment files
echo -e "${BLUE}🚀 Creating deployment files...${NC}"

# Create Procfile
echo "web: python backend/app.py" > Procfile

# Create runtime.txt
echo "python-3.11" > runtime.txt

echo -e "${GREEN}✓ Deployment files created${NC}"
echo ""

# Step 8: Print next steps
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Add your API keys to .env file:"
echo "   - Get Lingo.dev API key: https://lingo.dev"
echo "   - Get Murf AI API key: https://murf.ai/api"
echo ""
echo "2. Create the application files (see SETUP_GUIDE.md):"
echo "   - backend/app.py"
echo "   - backend/utils/lingo_helper.py"
echo "   - backend/utils/lingo_translate.js"
echo "   - templates/index.html"
echo "   - static/js/app.js"
echo ""
echo "3. Start the development server:"
echo "   source venv/bin/activate"
echo "   python backend/app.py"
echo ""
echo "4. Open in browser:"
echo "   http://localhost:5000"
echo ""
echo -e "${YELLOW}📚 For detailed instructions, see SETUP_GUIDE.md${NC}"
echo ""
