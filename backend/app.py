import os
import subprocess
import requests
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, template_folder="../templates", static_folder="../static")
CORS(app)

# Secure API key retrieval
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
    
    if not text:
        return jsonify({"success": False, "error": "No speech captured"}), 400

    # --- STEP 1: LINGO.DEV SDK BRIDGE ---
    try:
        script_path = os.path.join(os.path.dirname(__file__), 'utils', 'lingo_translate.js')
        
        # Execute the Node.js bridge with UTF-8 encoding
        result = subprocess.run(
            ['node', script_path, text, target_lang],
            capture_output=True,
            text=True,
            shell=True,
            encoding='utf-8'
        )

        # Fix: Ensure stdout is at least an empty string to avoid NoneType errors
        raw_output = (result.stdout or "").strip()
        
        # Super Clean: Remove [dotenv] logs or other system messages
        lines = [line for line in raw_output.splitlines() if not line.startswith("[dotenv]")]
        translated_text = lines[-1].strip() if lines else ""
            
        if not translated_text:
            error_msg = result.stderr if result.stderr else "Engine returned no content"
            return jsonify({"success": False, "error": f"Translation failed: {error_msg}"}), 500
            
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

    # --- STEP 2: MURF AI VOICE SYNTHESIS ---
    audio_url = None
    if MURF_API_KEY:
        try:
            # Verified Voice IDs
            voice_map = {
                "hi": "shweta", "en": "natalie", "es": "mateo", 
                "fr": "gabrielle", "zh": "xiaomei", "de": "werner"
            }
            voice_id = voice_map.get(target_lang, "natalie")

            res = requests.post(
                "https://api.murf.ai/v1/speech/generate",
                headers={"api-key": MURF_API_KEY, "Content-Type": "application/json"},
                json={"text": translated_text, "voice_id": voice_id, "format": "MP3"}
            )
            
            if res.status_code == 200:
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
    