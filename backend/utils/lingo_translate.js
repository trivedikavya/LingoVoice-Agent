import { LingoDotDevEngine } from 'lingo.dev/sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded silently to prevent log leakage into stdout
dotenv.config({ 
    path: path.resolve(__dirname, '../../.env'),
    silent: true 
});

async function translate() {
    const text = process.argv[2];
    const targetLang = process.argv[3]; // Received from Python backend

    if (!process.env.LINGO_API_KEY) {
        process.stderr.write("ERROR: LINGO_API_KEY missing");
        process.exit(1);
    }

    const lingo = new LingoDotDevEngine({
        apiKey: process.env.LINGO_API_KEY
    });

    try {
        // Explicitly setting targetLocale fixes the mirroring issue
        const translated = await lingo.localizeText(text, {
            sourceLocale: "en", // Assuming English source for speech capture
            targetLocale: targetLang
        });
        
        // Output result as UTF-8 Buffer for reliable Python capture
        if (translated) {
            process.stdout.write(Buffer.from(translated, 'utf-8'));
        } else {
            process.stderr.write("ERROR: Empty translation received");
            process.exit(1);
        }
    } catch (error) {
        process.stderr.write("SDK Error: " + error.message);
        process.exit(1);
    }
}

translate();