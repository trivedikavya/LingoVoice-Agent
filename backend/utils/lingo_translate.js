import { LingoDotDevEngine } from 'lingo.dev/sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FIX: Added { silent: true } to stop [dotenv] logs from leaking into the output
dotenv.config({ 
    path: path.resolve(__dirname, '../../.env'),
    silent: true 
});

async function translate() {
    const text = process.argv[2];
    const targetLang = process.argv[3];

    // Check for API Key immediately
    if (!process.env.LINGO_API_KEY) {
        process.stderr.write("ERROR: LINGO_API_KEY missing");
        process.exit(1);
    }

    const lingo = new LingoDotDevEngine({
        apiKey: process.env.LINGO_API_KEY
    });

    try {
        const translated = await lingo.localizeText(text, {
            sourceLocale: "en",
            targetLocale: targetLang
        });
        
        // Output ONLY the translation to stdout
        if (translated) {
            process.stdout.write(translated);
        } else {
            process.stderr.write("ERROR: Empty translation");
            process.exit(1);
        }
    } catch (error) {
        process.stderr.write("SDK Error: " + error.message);
        process.exit(1);
    }
}

translate();