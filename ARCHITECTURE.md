# Architecture



Technical overview of how Frames of Truth is built.



## Overview



Frames of Truth is an Android app with a Python backend running directly on the device. The UI is a WebView that loads HTML/CSS/JS, and the backend is a local Flask server that handles geocoding, POI search, Wikipedia lookups, and AI inference.



The two layers communicate over HTTP on `127.0.0.1:5000`.



## Stack



| Layer | Technology |

|-------|------------|

| Android host | Kotlin (AppCompatActivity) |

| Python runtime | Chaquopy 15.x (Python 3.8) |

| Backend | Flask |

| Frontend | HTML + CSS + JavaScript (WebView) |

| AI inference | Groq, OpenRouter, Gemini |

| Geocoding | Photon, Nominatim |

| POI search | Geoapify, Overpass |

| Wikipedia | MediaWiki API |

| Maps | Leaflet + OpenStreetMap tiles |

| EXIF parsing | MetadataExtractor (Kotlin), PIL (Python) |



## Data flow



When the user selects a photo, the following sequence runs:



1. **Photo selection**

   The user taps a button in the WebView. JavaScript calls `Android.openFileChooser()` or `Android.openCamera()`.



2. **File reading (Kotlin)**

   `MainActivity.kt` receives the file via `onActivityResult()`. It reads the bytes, checks if the file is HEIC (by magic bytes `ftyp`), extracts EXIF metadata using MetadataExtractor, and if HEIC converts the image to JPEG.



3. **Temp file creation**

   The processed image is saved as `pending_TIMESTAMP.jpg` in `filesDir/web/`, along with `pending_TIMESTAMP.exif.json` if EXIF override is needed. Then JavaScript is notified via `onFileReadyFromAndroid()`.



4. **Upload to backend**

   The WebView reads the temp files via `fetch()`, then POSTs them to `/api/story` on the local Flask server.



5. **Backend processing (Python)**

   `run_story_task()` performs the following steps:

   - Extract GPS coordinates from EXIF (or from the override JSON)

   - Reverse-geocode the location (Photon, with Nominatim as fallback)

   - Find nearby POIs (Geoapify, with Overpass as fallback)

   - Fetch Wikipedia / Wikidata context

   - Describe the image using a vision model (Groq Qwen 3.8, with Gemini fallback)

   - Generate the story using an LLM (Groq GPT-OSS, with OpenRouter fallback)



6. **Story rendering**

   The WebView polls `/api/story/status/<task_id>` every 400 ms, updates a mini-log, and when the task is done, renders the story and the map.



7. **Optional deep investigation**

   A second button POSTs to `/api/discover`, which does additional lookups (Wikidata, GDELT news, web search) and generates a 6-section investigative report.



8. **Cleanup**

   After the story is rendered, Kotlin deletes the temporary files via `Android.deleteTempFile()`.



## File structure



app/

├── src/main/

│ ├── java/com/example/echoesfromthepast/

│ │ └── MainActivity.kt # Android entry point

│ ├── python/

│ │ └── app.py # Flask backend

│ ├── assets/web/

│ │ ├── index.html # UI structure

│ │ ├── style.css # Styles

│ │ └── script.js # Frontend logic

│ ├── res/ # Android resources

│ │ ├── layout/activity_main.xml

│ │ ├── mipmap-*/ # App icons

│ │ └── xml/file_paths.xml # FileProvider config

│ └── AndroidManifest.xml

└── build.gradle # App build config





## Key Android components



### MainActivity.kt



Handles:

- WebView setup (JavaScript enabled, geolocation, file access)

- Runtime permissions (location, media location, storage)

- JavaScript Interface bridge (`Android.*` methods)

- File chooser and camera intents

- HEIC conversion and EXIF extraction

- Python/Flask startup via Chaquopy

- Temp file lifecycle



### JavaScript Interface (`Android` object)



| Method | Purpose |

|--------|---------|

| `openFileChooser()` | Opens the file picker (ACTION_OPEN_DOCUMENT) |

| `openCamera()` | Opens the camera (ACTION_IMAGE_CAPTURE) |

| `getApiKeys()` | Returns stored API keys as JSON |

| `saveApiKeys(...)` | Saves API keys to SharedPreferences and pushes to Python |

| `openApiKeyFile()` | Opens the file picker for `.txt` API key import |

| `deleteTempFile(name)` | Deletes a temporary file from `filesDir/web/` |



## Key Python components



### app.py



- `run_flask()` — starts Flask on 127.0.0.1:5000

- `set_web_dir(path)` — sets the web assets directory

- `set_api_keys(...)` — updates API keys at runtime

- `run_story_task(...)` — full story generation pipeline

- `descrivi_immagine(...)` — vision pipeline (Groq → Gemini)

- `genera_storia(...)` — text generation (Groq → OpenRouter)

- `get_photon_details(...)` — reverse geocoding

- `get_pois_geoapify(...)` — POI discovery

- `estrai_metadati_foto(...)` — EXIF parsing



## External APIs



| Service | Used for | Auth |

|---------|----------|------|

| [Groq](https://groq.com) | Vision + text inference | API key |

| [OpenRouter](https://openrouter.ai) | Fallback text inference | API key |

| [Gemini](https://ai.google.dev) | Fallback vision inference | API key |

| [Geoapify](https://www.geoapify.com) | POI discovery | API key |

| [Photon](https://photon.komoot.io) | Reverse geocoding | None |

| [Nominatim](https://nominatim.org) | Reverse geocoding fallback | None |

| [Overpass](https://overpass-api.de) | POI fallback | None |

| [Wikipedia](https://www.wikipedia.org) | Historical context | None |

| [Wikidata](https://www.wikidata.org) | Structured facts | None |

| [GDELT](https://www.gdeltproject.org) | Recent news | None |



## Storage



- **API keys**: Android `SharedPreferences` (private, not encrypted)

- **Temp files**: `filesDir/web/` (deleted after each session)

- **Camera cache**: `cacheDir/echoes_camera_*.jpg` (deleted on next launch)

- **No database**: every analysis is ephemeral



## Security notes



- Photos never leave the device unless the user enables an external API.

- Temporary files are deleted immediately after use.

- API keys are never hardcoded in the source code.

- The WebView loads from `127.0.0.1` only (no external content).





