\# Frames of Truth — User Guide



A step-by-step guide to install and use the app.



\---



\## 📥 1. Install the app



1\. Download the latest `app-debug.apk` from the \[Releases page](https://github.com/vincenzodesanctis/frames-of-truth/releases).

2\. On your Android device, open \*\*Settings → Security → Install unknown apps\*\* and enable it for your file manager.

3\. Tap the downloaded APK to install.



!\[Installation](docs/images/01-main-screen.png)



\---



\## 🔑 2. Get your API keys



Frames of Truth needs two free API keys.



\### Groq API key



1\. Go to \[console.groq.com/keys](https://console.groq.com/keys)

2\. Sign up (free)

3\. Click \*\*Create API Key\*\* and copy the string starting with `gsk\_...`



\### Geoapify API key



1\. Go to \[myprojects.geoapify.com](https://myprojects.geoapify.com/)

2\. Sign up (free)

3\. Create a new project and copy the API key



> Both services have generous free tiers — you won't pay anything for normal use.



\---



\## ⚙️ 3. Configure the app



1\. Open \*\*Frames of Truth\*\*

2\. Tap the \*\*⚙️ icon\*\* in the top-left corner

3\. Paste your \*\*Groq\*\* and \*\*Geoapify\*\* keys into the fields

4\. Tap \*\*Save\*\*



!\[API Keys Modal](docs/images/05-api-keys-modal.png)



\### Alternative: import from a `.txt` file



If you prefer, create a `.txt` file like this:



GROQ\_API\_KEY=gsk\_xxxxxxxxxxxxx

GEOAPIFY\_API\_KEY=xxxxxxxxxxxxx





Then in the app: \*\*⚙️ → 📥 Import from .txt file\*\* → select the file → Save.



\---



\## 📸 4. Take or choose a photo



Once the app is configured:



\- Tap \*\*📷 Take photo\*\* to open the camera

\- Tap \*\*📁 Choose from device\*\* to pick a photo from the gallery

\- You can also drag \& drop a photo on desktop browsers



!\[Main screen](docs/images/01-main-screen.png)



> \*\*Tip\*\*: For best results, use a photo with GPS metadata enabled.

> On Android: \*\*Camera → Settings → Location tags ON\*\*.

> On iPhone: \*\*Settings → Privacy → Location Services → Camera → While Using\*\*.



\---



\## 📖 5. Read the story



The app will automatically:



1\. Extract GPS coordinates from the photo's EXIF metadata

2\. Reverse-geocode the location (street, city, region)

3\. Find nearby points of interest (POIs)

4\. Fetch historical context from Wikipedia and Wikidata

5\. Describe the photo using a vision model

6\. Generate a story in \*\*three sections\*\*:

&#x20;  - \*\*Location\*\* — where the photo was taken from

&#x20;  - \*\*Image description\*\* — what's visible in the photo

&#x20;  - \*\*Curiosity\*\* — interesting facts about the place



!\[Story generated](docs/images/02-story-generated.png)

!\[Image description](docs/images/03-image-description.png)



\---



\## 🔍 6. Generate the investigative report



Tap \*\*"Launch deep investigation"\*\* to generate a 6-section report:



1\. \*\*Location\*\*

2\. \*\*Surroundings\*\*

3\. \*\*Wikipedia \& Wikidata\*\*

4\. \*\*Recent news\*\*

5\. \*\*Metadata and deductions\*\*

6\. \*\*Investigative hypothesis\*\*



Each section is \*\*collapsible\*\* — tap on the title to expand or collapse it.



!\[Investigative report](docs/images/04-investigative-report.png)



\---



\## 🌐 7. Change the language



Tap the \*\*flag icon\*\* in the top-right corner to switch between:



\- 🇮🇹 Italian

\- 🇬🇧 English

\- 🇫🇷 French

\- 🇩🇪 German

\- 🇪🇸 Spanish

\- 🇵🇹 Portuguese

\- 🇳🇱 Dutch



Your choice is saved and remembered next time you open the app.



\---



\## 🔒 8. Privacy



\- Photos are processed \*\*locally on your device\*\*.

\- API keys are stored in Android's \*\*private SharedPreferences\*\* and never leave your phone.

\- Temporary files (converted photos) are \*\*deleted immediately\*\* after the analysis.

\- No analytics, no tracking, no ads.



\---



\## ❓ FAQ



\### The app says "GPS not found in photo"



The photo's EXIF metadata has no GPS coordinates. This happens if:

\- Location was disabled when the photo was taken

\- The photo was downloaded from WhatsApp / Telegram / social media (they strip EXIF)

\- The photo was edited with software that removed EXIF



\*\*Solution\*\*: Use the \*\*"Proceed with device location"\*\* button to use your current position instead.



\### The photo loads but the story is not generated



Check that:

\- You have a working internet connection

\- You entered both API keys (Groq + Geoapify)

\- The photo is not corrupted (try another one)



\### The app is very slow on my device



Frames of Truth runs Python (Flask) and a WebView on your phone. On older devices this can be slow. Try:



\- Closing other apps before using Frames of Truth

\- Using a photo smaller than 5 MB

\- Using a device with at least 3 GB of RAM



\### Can I use the app offline?



Not fully. The GPS extraction and reverse geocoding work offline, but the AI narration requires an internet connection for now.



\### How do I report a bug or request a feature?



Open an issue on the \[GitHub Issues page](https://github.com/vincenzodesanctis/frames-of-truth/issues).



\---



\## 🙏 Credits



Built by \*\*Vincenzo De Sanctis\*\* — MIT License — Hacktoberfest 2026.



