import os
import subprocess
import requests
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__, template_folder="../templates", static_folder="../static")
CORS(app)

# Securely retrieve API keys
LINGO_API_KEY = os.getenv("LINGO_API_KEY")
MURF_API_KEY = os.getenv("MURF_API_KEY")

@app.route("/")
def index():
    """Serves the main application UI"""
    return render_template("index.html")

@app.route("/api/translate-and-speak", methods=["POST"])
def translate_and_speak():
    """
    Complete pipeline: Translates via Node.js Bridge (Lingo SDK) 
    and synthesizes via Murf AI.
    """
    data = request.json
    text = data.get("text")
    target_lang = data.get("target_language", "hi")
    
    if not text:
        return jsonify({"success": False, "error": "No speech captured"}), 400

    # --- STEP 1: LINGO.DEV SDK BRIDGE ---
    try:
        # Get absolute path to the bridge script
        script_path = os.path.join(os.path.dirname(__file__), 'utils', 'lingo_translate.js')
        
        # FIX: Added encoding='utf-8' to handle Hindi and other characters
        result = subprocess.run(
            ['node', script_path, text, target_lang],
            capture_output=True,
            text=True,
            shell=True,
            encoding='utf-8'
        )

        # Handle process failures
        if result.returncode != 0:
            error_msg = result.stderr if result.stderr else "Unknown SDK Error"
            print(f"Node.js Error: {error_msg}")
            return jsonify({"success": False, "error": error_msg}), 500

        # Clean the output to ensure no stray log messages remain
        output = result.stdout.strip()
        if "injecting env" in output:
            # Fallback: Capture only the actual translation text
            translated_text = output.splitlines()[-1]
        else:
            translated_text = output
            
        if not translated_text:
            return jsonify({"success": False, "error": "Translation engine returned no content"}), 500
            
    except Exception as e:
        return jsonify({"success": False, "error": f"Backend Exception: {str(e)}"}), 500

    # --- STEP 2: MURF AI VOICE SYNTHESIS ---
    audio_url = None
    if MURF_API_KEY:
        try:
            # Verified Voice IDs from the Murf AI Library
            voice_map = {
                "hi": "shweta",      # Hindi (Female) - Verified for Gen2
                "es": "mateo",       # Spanish (Male)
                "fr": "gabrielle",   # French (Female)
                "en": "natalie",     # English (Female)
                "zh": "xiaomei",     # Chinese (Female)
                "de": "werner"       # German (Male)
            }
            voice_id = voice_map.get(target_lang, "natalie")

            # API request for speech generation
            res = requests.post(
                "https://api.murf.ai/v1/speech/generate",
                headers={
                    "api-key": MURF_API_KEY, 
                    "Content-Type": "application/json"
                },
                json={
                    "text": translated_text, 
                    "voice_id": voice_id,
                    "format": "MP3"
                }
            )
            
            if res.status_code == 200:
                audio_url = res.json().get("audioFile")
            else:
                # Capture specific Murf errors for debugging
                print(f"Murf API Error: {res.text}")
        except Exception as e:
            print(f"Murf Synthesis Exception: {e}")

    return jsonify({
        "success": True,
        "original_text": text,
        "translated_text": translated_text,
        "audio_url": audio_url
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)