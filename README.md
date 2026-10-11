# 📸🔍 Frames of Truth



> \*\*Every photo hides a story. Uncover it.\*\*



Frames of Truth is an Android app that analyzes the EXIF metadata of a photo,

extracts its GPS coordinates, and uses \*\*open-source AI models\*\* to generate a

narrative investigation about the place where the photo was taken.



Built for the \*\*Hacktoberfest Open-Source AI Challenge 2026 — Week 1: Touch Grass\*\* 🏆



\[!\[Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-orange)](https://hacktoberfest.com)

\[!\[License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

\[!\[Android](https://img.shields.io/badge/Android-7.0%2B-green)](https://developer.android.com)



\---



\## ✨ Features



\- 📷 \*\*Take or choose a photo\*\* from your device

\- 🗺️ \*\*Automatic GPS extraction\*\* from EXIF metadata (JPEG and HEIC)

\- 🌍 \*\*Geocoding\*\* via Photon and Nominatim (OpenStreetMap)

\- 📍 \*\*POI discovery\*\* via Geoapify and Overpass

\- 📚 \*\*Wikipedia / Wikidata integration\*\* for historical context

\- 🤖 \*\*AI-powered narration\*\* via Groq and OpenRouter (open-weight models)

\- 🔍 \*\*Deep investigative report\*\* with 6 structured sections

\- 🌐 \*\*Multi-language support\*\* (IT, EN, FR, DE, ES, PT, NL)

\- 🔑 \*\*User-configurable API keys\*\* (saved locally, never shared)



\---



\## 🌱 Why "Touch Grass"?



The theme of Hacktoberfest Week 1 is \*\*Touch Grass\*\* — build something with

open-source AI that gets people off the screen and into the world.



Frames of Truth does exactly that:



1\. \*\*You go outside\*\* and take a photo of a place that interests you

2\. \*\*The app analyzes it\*\* using open-source AI models

3\. \*\*It tells you the story\*\* of that place — history, curiosities, and context

4\. \*\*You discover something new\*\* about the world around you



\---



\## 🤖 Open-Source AI at the Core



\- \*\*Open-weight models\*\* via \[Groq](https://groq.com) (Qwen 3.8, GPT-OSS)

\- \*\*Fallback narration\*\* via \[OpenRouter](https://openrouter.ai) (Llama 3.3)

\- \*\*Vision fallback\*\* via \[Gemini](https://ai.google.dev) (REST API)



\---



\## 🚀 Getting Started



\### Prerequisites



\- Android Studio (Hedgehog or newer)

\- Android device or emulator with \*\*Android 7.0+ (API 24+)\*\*

\- Python 3.8+ (bundled via Chaquopy)

\- A free \*\*Groq API key\*\* and a free \*\*Geoapify API key\*\*



\### Installation



1\. Clone this repository

2\. Open the project in Android Studio

3\. Build the APK: `Build → Build Bundle(s) / APK(s) → Build APK(s)`

4\. Install on your device

5\. \*\*On first launch, open the ⚙️ menu and enter your API keys\*\*



\### API Keys format



You can import API keys from a simple `.txt` file:



GROQ\_API\_KEY=gsk\_xxxxxxxxxxxxx

GEOAPIFY\_API\_KEY=xxxxxxxxxxxxx

GEMINI\_API\_KEY=AIzaSyxxxxxxxxxxxxx

HF\_TOKEN=hf\_xxxxxxxxxxxxx

OPENROUTER\_API\_KEY=sk-or-v1-xxxxxxxxxxxxx





\---



\## 🔧 Tech Stack



| Layer | Technology |

|-------|------------|

| Mobile | Android (Kotlin) with \*\*Chaquopy\*\* |

| Backend | Python (Flask) as local HTTP server |

| Frontend | WebView with HTML/CSS/JS |

| AI Models | \*\*Open-weight\*\* via Groq and OpenRouter |

| Geocoding | OpenStreetMap (Photon, Nominatim, Overpass) |

| EXIF/HEIC | \*\*MetadataExtractor\*\* |



\---



\## 🤝 Contributing



Contributions are welcome! See \[CONTRIBUTING.md](CONTRIBUTING.md) for details.



\---



\## 📄 License



This project is licensed under the MIT License — see the \[LICENSE](LICENSE) file.



\---



\## 🙏 Acknowledgments



\- \[Chaquopy](https://chaquo.com/chaquopy/) for Python-Android integration

\- \[Groq](https://groq.com/) for fast LLM inference

\- \[Geoapify](https://www.geoapify.com/) for POI data

\- \[OpenStreetMap](https://www.openstreetmap.org/) contributors

\- \[Leaflet](https://leafletjs.com/) for maps



\---



\## 🌱 Hacktoberfest 2026



Built for the \*\*Hacktoberfest Open-Source AI Challenge: Week 1\*\*.

Aligned with the \*\*"Touch Grass"\*\* theme.



\*\*Tags\*\*: `#hacktoberfest` `#open-source-ai` `#touchgrass` `#devchallenge` `#hf26challenge`



\---



\## 📖 User Guide



Read the \[User Guide](USER\_GUIDE.md) for step-by-step instructions on installation, API key setup, and usage.



\---



Made with ❤️ by \[Vincenzo De Sanctis](https://github.com/vincenzodesanctis)



