import os
import requests
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__, template_folder="../templates", static_folder="../static")
CORS(app)

# API Keys
LINGO_API_KEY = os.getenv("LINGO_API_KEY")
MURF_API_KEY = os.getenv("MURF_API_KEY")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/translate-and-speak", methods=["POST"])
def translate_and_speak():
    data = request.json
    text = data.get("text")
    target_lang = data.get("target_language", "hi")
    
    # --- 1. LINGO.DEV TRANSLATION ---
    # For the hackathon, we call the Lingo Localization Engine
    try:
        # Note: Replace with actual Lingo API endpoint
        translated_text = f"Localized by Lingo: {text} (in {target_lang})"
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

    # --- 2. MURF AI VOICE GENERATION ---
    audio_url = None
    if MURF_API_KEY:
        try:
            # Voice mapping based on language
            voice_id = "hi-IN-aravind" if target_lang == "hi" else "en-US-marcus"
            res = requests.post(
                "https://api.murf.ai/v1/speech/generate",
                headers={"api-key": MURF_API_KEY, "Content-Type": "application/json"},
                json={"text": translated_text, "voiceId": voice_id}
            )
            audio_url = res.json().get("audioFile")
        except Exception as e:
            print(f"Murf Error: {e}")

    return jsonify({
        "success": True,
        "translated_text": translated_text,
        "audio_url": audio_url
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)