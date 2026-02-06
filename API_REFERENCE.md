# 🔌 LingoVoice AI - API Reference

Complete API documentation for LingoVoice AI backend endpoints.

---

## 📡 Base URL

**Local Development:**
```
http://localhost:5000
```

**Production:** (Replace with your deployed URL)
```
https://your-app.com
```

---

## 🔑 Authentication

Currently, the API is designed for frontend use only and doesn't require authentication headers. 

API keys for Lingo.dev and Murf AI are stored securely in the backend `.env` file.

---

## 📋 Endpoints

### 1. GET `/`
**Description:** Serves the main application HTML page

**Response:**
```html
HTML page with the LingoVoice AI interface
```

---

### 2. POST `/api/translate`
**Description:** Translates text from source language to target language using Lingo.dev

**Request Body:**
```json
{
  "text": "string (required)",
  "source_language": "string (required)",
  "target_language": "string (required)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how are you?",
    "source_language": "en",
    "target_language": "hi"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "original_text": "Hello, how are you?",
  "translated_text": "नमस्ते, आप कैसे हैं?",
  "source_language": "en",
  "target_language": "hi"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Translation service unavailable"
}
```

**Supported Languages:**
- `en` - English
- `hi` - Hindi
- `zh` - Chinese (Mandarin)
- `es` - Spanish
- `fr` - French
- `de` - German

---

### 3. POST `/api/synthesize`
**Description:** Converts text to speech using Murf AI

**Request Body:**
```json
{
  "text": "string (required)",
  "language": "string (optional, default: 'hi-IN')",
  "voice_id": "string (optional, default: 'swara')"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "नमस्ते, आप कैसे हैं?",
    "language": "hi-IN",
    "voice_id": "swara"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "audio_url": "https://storage.murf.ai/audio/xyz123.mp3",
  "text": "नमस्ते, आप कैसे हैं?"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Voice synthesis failed"
}
```

**Available Voice IDs:**
| Language | Voice ID | Gender | Description |
|----------|----------|--------|-------------|
| Hindi | swara | Female | Natural, friendly |
| English | natalie | Female | Professional |
| English | michael | Male | Authoritative |
| Spanish | mateo | Male | Warm |
| French | gabrielle | Female | Elegant |
| German | werner | Male | Clear |
| Chinese | xiaomei | Female | Natural |

---

### 4. POST `/api/translate-and-speak`
**Description:** Complete pipeline - translates text and generates speech in one call

**Request Body:**
```json
{
  "text": "string (required)",
  "source_language": "string (required)",
  "target_language": "string (required)",
  "voice_id": "string (optional)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/translate-and-speak \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello world",
    "source_language": "en",
    "target_language": "hi",
    "voice_id": "swara"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "original_text": "Hello world",
  "translated_text": "नमस्ते दुनिया",
  "audio_url": "https://storage.murf.ai/audio/xyz123.mp3",
  "source_language": "en",
  "target_language": "hi"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Pipeline processing failed"
}
```

**Processing Time:**
- Translation: ~1-2 seconds
- Speech Synthesis: ~2-3 seconds
- **Total:** ~3-5 seconds

---

## 🔧 Error Codes

| HTTP Code | Meaning |
|-----------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key (backend) |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable - External API down |

---

## 📊 Rate Limits

### Lingo.dev
- Depends on your Lingo.dev plan
- Free tier: Check Lingo.dev dashboard
- Recommended: Cache translations when possible

### Murf AI
- Varies by subscription plan
- Free trial: Limited characters/month
- Check Murf AI dashboard for current limits

---

## 🧪 Testing with curl

### Test Translation
```bash
curl -X POST http://localhost:5000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Good morning","source_language":"en","target_language":"hi"}'
```

### Test Speech Synthesis
```bash
curl -X POST http://localhost:5000/api/synthesize \
  -H "Content-Type: application/json" \
  -d '{"text":"सुप्रभात","language":"hi-IN","voice_id":"swara"}'
```

### Test Complete Pipeline
```bash
curl -X POST http://localhost:5000/api/translate-and-speak \
  -H "Content-Type: application/json" \
  -d '{"text":"Good morning","source_language":"en","target_language":"hi","voice_id":"swara"}'
```

---

## 🐍 Testing with Python

```python
import requests

BASE_URL = "http://localhost:5000"

# Translation
response = requests.post(
    f"{BASE_URL}/api/translate",
    json={
        "text": "Hello world",
        "source_language": "en",
        "target_language": "hi"
    }
)
print(response.json())

# Speech Synthesis
response = requests.post(
    f"{BASE_URL}/api/synthesize",
    json={
        "text": "नमस्ते दुनिया",
        "language": "hi-IN",
        "voice_id": "swara"
    }
)
print(response.json())

# Complete Pipeline
response = requests.post(
    f"{BASE_URL}/api/translate-and-speak",
    json={
        "text": "Hello world",
        "source_language": "en",
        "target_language": "hi",
        "voice_id": "swara"
    }
)
data = response.json()
print(f"Translation: {data['translated_text']}")
print(f"Audio URL: {data['audio_url']}")
```

---

## 🌐 Testing with JavaScript

```javascript
// Translation
const translateText = async () => {
  const response = await fetch('http://localhost:5000/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: 'Hello world',
      source_language: 'en',
      target_language: 'hi'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// Speech Synthesis
const synthesizeSpeech = async () => {
  const response = await fetch('http://localhost:5000/api/synthesize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: 'नमस्ते दुनिया',
      language: 'hi-IN',
      voice_id: 'swara'
    })
  });
  
  const data = await response.json();
  console.log(data.audio_url);
};

// Complete Pipeline
const translateAndSpeak = async () => {
  const response = await fetch('http://localhost:5000/api/translate-and-speak', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: 'Hello world',
      source_language: 'en',
      target_language: 'hi',
      voice_id: 'swara'
    })
  });
  
  const data = await response.json();
  console.log(`Translation: ${data.translated_text}`);
  console.log(`Audio URL: ${data.audio_url}`);
  
  // Play audio
  const audio = new Audio(data.audio_url);
  audio.play();
};
```

---

## 🔒 Security Considerations

### API Keys
- **NEVER** expose API keys in frontend code
- Store in `.env` file (backend only)
- Add `.env` to `.gitignore`
- Use environment variables in production

### CORS
```python
# Flask CORS configuration
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins (development)

# Production: Restrict origins
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-frontend.com"]
    }
})
```

### Input Validation
- Validate all user inputs
- Sanitize text before processing
- Check language codes against whitelist
- Limit text length (e.g., max 500 characters)

---

## 📈 Performance Optimization

### Caching
```python
# Cache translations to reduce API calls
from functools import lru_cache

@lru_cache(maxsize=1000)
def translate_with_cache(text, source, target):
    return translate_with_lingo(text, source, target)
```

### Async Processing
```python
# For high-traffic scenarios
import asyncio
import aiohttp

async def async_translate(text, source, target):
    # Implement async translation
    pass
```

### Rate Limiting
```python
from flask_limiter import Limiter

limiter = Limiter(app, key_func=lambda: request.remote_addr)

@app.route("/api/translate", methods=["POST"])
@limiter.limit("10 per minute")
def translate_text():
    # ... translation logic
    pass
```

---

## 🐛 Common Issues

### Issue: 500 Error on Translation
**Possible Causes:**
- Invalid Lingo.dev API key
- Rate limit exceeded
- Network timeout

**Solution:**
```bash
# Check API key in .env
# Verify key is valid on Lingo.dev dashboard
# Check API usage/quota
```

### Issue: Audio Not Playing
**Possible Causes:**
- Invalid Murf AI API key
- Unsupported voice ID
- Audio file expired (72-hour limit)

**Solution:**
```bash
# Verify Murf API key
# Check voice ID is valid
# Re-generate audio if expired
```

---

## 📞 Support

For API issues:
- Lingo.dev: https://lingo.dev/go/discord
- Murf AI: https://murf.ai/api/docs

For application issues:
- GitHub Issues: [Your Repo URL]
- Email: your.email@example.com

---

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- POST `/api/translate` - Text translation
- POST `/api/synthesize` - Speech synthesis
- POST `/api/translate-and-speak` - Complete pipeline

---

**API Version:** 1.0  
**Last Updated:** February 6, 2026
