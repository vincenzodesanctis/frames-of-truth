# 📸🔍 Frames of Truth

> **Every photo hides a story. Uncover it.**

Frames of Truth is an Android app that analyzes the EXIF metadata of a photo, extracts its GPS coordinates, and uses **open-source AI models** to generate a narrative investigation about the place where the photo was taken.

Built for the **Hacktoberfest Open-Source AI Challenge 2026 — Week 1: Touch Grass** 🏆

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-orange)](https://hacktoberfest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Android](https://img.shields.io/badge/Android-7.0%2B-green)](https://developer.android.com)
[![Architecture](https://img.shields.io/badge/docs-architecture-blue)](ARCHITECTURE.md)
[![Changelog](https://img.shields.io/badge/docs-changelog-green)](CHANGELOG.md)

---

## 📱 Screenshots

<p>
<img src="https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/nkrtud0g9pt1am3yxukz.jpg" width="45%" alt="Main screen" />
<img src="https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/b7kteazme6hnmd1wv847.jpg" width="45%" alt="Story generated" />
</p>

<p>
<img src="https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/ttxgi00whyzu8p6khco1.jpg" width="45%" alt="Image description" />
<img src="https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/ksa3w34mtuaeqwrxtyw3.jpg" width="45%" alt="Investigative report" />
</p>

<p>
<img src="https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/90f0fqpwzf7r31baq5ok.jpg" width="45%" alt="API keys modal" />
</p>

---

## ✨ Features

- 📷 **Take or choose a photo** from your device
- 🗺️ **Automatic GPS extraction** from EXIF metadata (JPEG and HEIC)
- 🌍 **Geocoding** via Photon and Nominatim (OpenStreetMap)
- 📍 **POI discovery** via Geoapify and Overpass
- 📚 **Wikipedia / Wikidata integration** for historical context
- 🤖 **AI-powered narration** via Groq and OpenRouter (open-weight models)
- 🔍 **Deep investigative report** with 6 structured sections
- 🌐 **Multi-language support** (IT, EN, FR, DE, ES, PT, NL)
- 🔑 **User-configurable API keys** (saved locally, never shared)

---

## 🌱 Why "Touch Grass"?

The theme of Hacktoberfest Week 1 is **Touch Grass** — build something with open-source AI that gets people off the screen and into the world.

Frames of Truth does exactly that:

1. **You go outside** and take a photo of a place that interests you
2. **The app analyzes it** using open-source AI models
3. **It tells you the story** of that place — history, curiosities, and context
4. **You discover something new** about the world around you

The screen is the **shortest part** of the experience. The real value is in the place itself, not in the app.

---

## 🤖 Open-Source AI at the Core

- **Open-weight models** via [Groq](https://groq.com) (Qwen 3.8, GPT-OSS)
- **Fallback narration** via [OpenRouter](https://openrouter.ai) (Llama 3.3)
- **Vision fallback** via [Gemini](https://ai.google.dev) (REST API)

Why open source matters here:

- **No lock-in**: you can swap models without rewriting the app
- **Cost control**: free tiers on Groq and OpenRouter
- **Transparency**: the AI pipeline is fully visible in the code
- **Privacy**: photos are processed locally when possible

---

## 🚀 Getting Started

### Prerequisites

- Android Studio (Hedgehog or newer)
- Android device or emulator with **Android 7.0+ (API 24+)**
- Python 3.8+ (bundled via Chaquopy)
- A free **Groq API key** and a free **Geoapify API key**

### Installation

1. Clone this repository
2. Open the project in Android Studio
3. Build the APK
4. Install on your device
5. **On first launch, open the gear menu and enter your API keys**

### API Keys format

You can import API keys from a simple `.txt` file. Each key goes on its own line:

- `GROQ_API_KEY=gsk_xxxxxxxxxxxxx`
- `GEOAPIFY_API_KEY=xxxxxxxxxxxxx`
- `GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxx`
- `HF_TOKEN=hf_xxxxxxxxxxxxx`
- `OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx`

Lines starting with `#` are ignored. Missing fields remain unchanged.

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Mobile | Android (Kotlin) with **Chaquopy** |
| Backend | Python (Flask) as local HTTP server |
| Frontend | WebView with HTML/CSS/JS |
| AI Models | **Open-weight** via Groq and OpenRouter |
| Geocoding | OpenStreetMap (Photon, Nominatim, Overpass) |
| EXIF/HEIC | **MetadataExtractor** |

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

- [Chaquopy](https://chaquo.com/chaquopy/) for Python-Android integration
- [Groq](https://groq.com/) for fast LLM inference
- [Geoapify](https://www.geoapify.com/) for POI data
- [OpenStreetMap](https://www.openstreetmap.org/) contributors
- [Leaflet](https://leafletjs.com/) for maps

---

## 🌱 Hacktoberfest 2026

Built for the **Hacktoberfest Open-Source AI Challenge: Week 1**. Aligned with the **"Touch Grass"** theme.

**Tags**: `#hacktoberfest` `#open-source-ai` `#touchgrass` `#devchallenge` `#hf26challenge`

---

Made with ❤️ by [Vincenzo De Sanctis](https://github.com/vincenzodesanctis)
