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

