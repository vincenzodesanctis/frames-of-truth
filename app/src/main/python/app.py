import os
import io
import time
import uuid
import base64
import threading
import traceback
import requests
import json
import mimetypes
import sys
from flask import Flask, request, jsonify, send_from_directory, Response
from dotenv import load_dotenv
from PIL import Image, ExifTags
from astral import LocationInfo
from astral.sun import sun as astral_sun
from astral.moon import phase as moon_phase
from datetime import datetime

# ============================================================
# API KEYS HARDCODED PER APK ANDROID (default)
# ============================================================
# Le API key NON sono più hardcoded.
# L'utente le inserisce dal menu ⚙️ dell'app o le importa da un file .txt.
# Vengono salvate in SharedPreferences e passate a Python all'avvio.
os.environ["GROQ_API_KEY"] = ""
os.environ["GEOAPIFY_API_KEY"] = ""
os.environ["GEMINI_API_KEY"] = ""
os.environ["HF_TOKEN"] = ""
os.environ["OPENROUTER_API_KEY"] = ""

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    load_dotenv(os.path.join(BASE_DIR, ".env"))
except Exception:
    pass

WEB_DIR = os.path.join(BASE_DIR, "web")


def set_web_dir(path):
    global WEB_DIR
    WEB_DIR = path
    print(f"[DEBUG] WEB_DIR impostata a: {WEB_DIR}", file=sys.stderr, flush=True)


def set_api_keys(groq="", geoapify="", gemini="", hf="", openrouter=""):
    """
    Aggiorna le API key a runtime. Chiamata da Android al primo avvio
    e ogni volta che l'utente salva le chiavi dal menu Impostazioni.
    Se una stringa è vuota, mantiene il valore di default hardcoded.
    """
    global GEOAPIFY_API_KEY
    if groq:
        os.environ["GROQ_API_KEY"] = groq
    if geoapify:
        os.environ["GEOAPIFY_API_KEY"] = geoapify
        GEOAPIFY_API_KEY = geoapify
    if gemini:
        os.environ["GEMINI_API_KEY"] = gemini
    if hf:
        os.environ["HF_TOKEN"] = hf
    if openrouter:
        os.environ["OPENROUTER_API_KEY"] = openrouter
    print("[DEBUG] set_api_keys chiamata", file=sys.stderr, flush=True)


app = Flask(__name__)

GEOAPIFY_API_KEY = os.getenv("GEOAPIFY_API_KEY", "")

TASKS = {}
CURRENT_TASK_ID = None

_wiki_cache = {}
_lang_cache = {}
_wd_cache = {}
_geoapify_cache = {}

SUPPORTED_LANGS = ["it", "en", "fr", "de", "es", "pt", "nl"]

LANG_NAMES = {
    "it": "Italian", "en": "English", "fr": "French", "de": "German",
    "es": "Spanish", "pt": "Portuguese", "nl": "Dutch",
}

COUNTRY_TO_LANG = {
    "it": "it",
    "gb": "en", "us": "en", "au": "en", "ca": "en", "ie": "en", "nz": "en",
    "za": "en", "in": "en", "sg": "en", "ph": "en",
    "fr": "fr", "be": "fr",
    "de": "de", "at": "de", "ch": "de",
    "es": "es", "mx": "es", "ar": "es", "cl": "es", "co": "es", "pe": "es",
    "ve": "es", "uy": "es",
    "pt": "pt", "br": "pt",
    "nl": "nl",
}

LABELS = {
    "it": {"location": "Luogo", "image": "Descrizione immagine", "curiosity": "Curiosità"},
    "en": {"location": "Location", "image": "Image description", "curiosity": "Curiosity"},
    "fr": {"location": "Lieu", "image": "Description de l'image", "curiosity": "Curiosité"},
    "de": {"location": "Ort", "image": "Bildbeschreibung", "curiosity": "Kuriosität"},
    "es": {"location": "Ubicación", "image": "Descripción de la imagen", "curiosity": "Curiosidad"},
    "pt": {"location": "Localização", "image": "Descrição da imagem", "curiosity": "Curiosidade"},
    "nl": {"location": "Locatie", "image": "Afbeeldingsbeschrijving", "curiosity": "Curiositeit"},
}

MESSAGES = {
    "no_image": {
        "it": "Nessuna immagine ricevuta.", "en": "No image received.",
        "fr": "Aucune image reçue.", "de": "Kein Bild empfangen.",
        "es": "No se recibió ninguna imagen.", "pt": "Nenhuma imagem recebida.",
        "nl": "Geen afbeelding ontvangen.",
    },
    "no_gps_exif": {
        "it": "La foto non contiene dati GPS (EXIF). Non è possibile determinare dove è stata scattata. Carica una foto scattata con la geolocalizzazione attiva.",
        "en": "The photo does not contain GPS (EXIF) data. It is not possible to determine where it was taken. Upload a photo taken with geolocation enabled.",
        "fr": "La photo ne contient pas de données GPS (EXIF). Il n'est pas possible de déterminer où elle a été prise.",
        "de": "Das Foto enthält keine GPS-Daten (EXIF). Es ist nicht möglich festzustellen, wo es aufgenommen wurde.",
        "es": "La foto no contiene datos GPS (EXIF). No es posible determinar dónde fue tomada.",
        "pt": "A foto não contém dados GPS (EXIF). Não é possível determinar onde foi tirada.",
        "nl": "De foto bevat geen GPS-gegevens (EXIF). Het is niet mogelijk te bepalen waar deze is genomen.",
    },
    "vision_unavailable": {
        "it": "ATTENZIONE: la descrizione della foto NON è disponibile. NON inventare cosa c'è nella foto. Scrivi solo 'Descrizione non disponibile al momento.'",
        "en": "WARNING: the photo description is NOT available. DO NOT invent what is in the photo. Write only 'Description not available at the moment.'",
        "fr": "ATTENTION : la description de la photo n'est PAS disponible. N'inventez PAS ce qui se trouve sur la photo.",
        "de": "ACHTUNG: Die Bildbeschreibung ist NICHT verfügbar. Erfinden Sie NICHT, was auf dem Foto zu sehen ist.",
        "es": "ATENCIÓN: la descripción de la foto NO está disponible. NO inventes lo que hay en la foto.",
        "pt": "ATENÇÃO: a descrição da foto NÃO está disponível. NÃO invente o que está na foto.",
        "nl": "LET OP: de beschrijving van de foto is NIET beschikbaar. Verzin NIET wat er op de foto staat.",
    },
}


def log(msg):
    print(f"[DEBUG] {msg}", file=sys.stderr, flush=True)
    global CURRENT_TASK_ID
    if CURRENT_TASK_ID and CURRENT_TASK_ID in TASKS:
        TASKS[CURRENT_TASK_ID]["log"].append(msg)


def get_labels(lang):
    return LABELS.get(lang, LABELS["en"])


def msg(key, lang):
    entry = MESSAGES.get(key, {})
    return entry.get(lang, entry.get("en", ""))


def normalize_lang(code):
    if not code:
        return None
    code = code.lower().split("-")[0].split("_")[0]
    return code if code in SUPPORTED_LANGS else None


def get_request_lang():
    explicit = normalize_lang(request.args.get("lang") or request.form.get("lang"))
    if explicit:
        return explicit
    accept = request.headers.get("Accept-Language", "")
    for part in accept.split(","):
        code = normalize_lang(part.split(";")[0].strip())
        if code:
            return code
    return "en"


# ============================================================
# WRAPPER GROQ
# ============================================================
def groq_chat(model, messages, temperature=0.6, max_tokens=2000, **kwargs):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.getenv('GROQ_API_KEY', '')}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
        **kwargs
    }
    r = requests.post(url, headers=headers, json=payload, timeout=60)
    if r.status_code != 200:
        raise Exception(f"Groq API error {r.status_code}: {r.text[:300]}")
    data = r.json()

    class Msg:
        def __init__(self, c):
            self.content = c

    class Choice:
        def __init__(self, c):
            self.message = Msg(c)

    class Resp:
        def __init__(self, c):
            self.choices = [Choice(c)]

    content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
    return Resp(content)


# ============================================================
# GROQ VISION
# ============================================================
def groq_vision_attempt(image_bytes, lang):
    """Tenta la vision con Groq Qwen3.8-27B."""
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        max_side = 800
        if max(img.size) > max_side:
            ratio = max_side / max(img.size)
            img = img.resize((int(img.size[0] * ratio), int(img.size[1] * ratio)), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=70, optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        lang_instr = {
            "it": "Rispondi in italiano.", "en": "Answer in English.",
            "fr": "Réponds en français.", "de": "Antworte auf Deutsch.",
            "es": "Responde en español.", "pt": "Responda em português.",
            "nl": "Antwoord in het Nederlands.",
        }.get(lang, "Answer in English.")

        ask = (f"{lang_instr}\n\n"
               "Describe in great detail what you see in this photo. "
               "Write at least 6-8 COMPLETE sentences describing: 1) environment and background, "
               "2) people if any, 3) objects in foreground, 4) any visible logos/texts, "
               "5) atmosphere and event type. Describe ONLY what you see.")

        response = groq_chat(
            model="qwen/qwen3.8-27b",
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": ask},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}}
                ]
            }],
            temperature=0.3,
            max_tokens=800
        )
        label = (response.choices[0].message.content or "").strip()
        if label:
            log(f"Groq Vision OK: {label[:100]}...")
            return label
    except Exception as e:
        log(f"Groq Vision exception: {str(e)[:200]}")
    return None


# ============================================================
# GEMINI VISION (fallback via REST)
# ============================================================
def gemini_vision_rest(image_bytes, lang):
    """Fallback vision con Gemini via REST (senza SDK)."""
    api_key = os.getenv("GEMINI_API_KEY", "")
    if not api_key:
        return None
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        max_side = 800
        if max(img.size) > max_side:
            ratio = max_side / max(img.size)
            img = img.resize((int(img.size[0] * ratio), int(img.size[1] * ratio)), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=70, optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        lang_instr = {
            "it": "Rispondi in italiano.", "en": "Answer in English.",
            "fr": "Réponds en français.", "de": "Antworte auf Deutsch.",
            "es": "Responde en español.", "pt": "Responda em português.",
            "nl": "Antwoord in het Nederlands.",
        }.get(lang, "Answer in English.")
        ask = f"{lang_instr}\n\nDescribe in detail what you see in this photo (6-8 sentences)."

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
        payload = {
            "contents": [{
                "parts": [
                    {"text": ask},
                    {"inline_data": {"mime_type": "image/jpeg", "data": b64}}
                ]
            }]
        }
        r = requests.post(url, json=payload, timeout=30)
        if r.status_code == 200:
            data = r.json()
            try:
                text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                if text:
                    log(f"Gemini REST OK: {text[:100]}...")
                    return text
            except (KeyError, IndexError):
                log(f"Gemini REST: risposta inattesa")
        else:
            log(f"Gemini REST errore {r.status_code}: {r.text[:200]}")
    except Exception as e:
        log(f"Gemini REST exception: {str(e)[:200]}")
    return None


# ============================================================
# OPENROUTER TEXT (fallback via REST)
# ============================================================
def openrouter_text_rest(prompt, lang, system_msg=None, max_tokens=3000):
    """Fallback generazione testo con OpenRouter via REST."""
    api_key = os.getenv("OPENROUTER_API_KEY", "")
    if not api_key:
        return None
    try:
        target_lang = LANG_NAMES.get(lang, "English")
        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        if not system_msg:
            system_msg = f"You are a narrator. Answer in {target_lang}."
        payload = {
            "model": "meta-llama/llama-3.3-70b-instruct:free",
            "messages": [
                {"role": "system", "content": system_msg},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": max_tokens,
        }
        r = requests.post(url, headers=headers, json=payload, timeout=60)
        if r.status_code == 200:
            data = r.json()
            text = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
            if text:
                log(f"OpenRouter OK: {len(text)} caratteri")
                return text
        else:
            log(f"OpenRouter errore {r.status_code}: {r.text[:200]}")
    except Exception as e:
        log(f"OpenRouter exception: {str(e)[:200]}")
    return None


# ============================================================
# VISION: Groq -> Gemini fallback
# ============================================================
def descrivi_immagine(image_bytes, lang):
    log("Vision: provo Groq...")
    result = groq_vision_attempt(image_bytes, lang)
    if result:
        return result

    log("Vision: Groq fallito, provo Gemini REST...")
    result = gemini_vision_rest(image_bytes, lang)
    if result:
        return result

    log("Vision: tutti i provider hanno fallito")
    return None


# ============================================================
# GEOCODING
# ============================================================
def get_photon_details(lat, lng):
    try:
        url = "https://photon.komoot.io/reverse"
        params = {"lat": lat, "lon": lng, "limit": 1}
        headers = {"User-Agent": "FramesOfTruth/1.0"}
        r = requests.get(url, params=params, headers=headers, timeout=6)
        if r.status_code == 200:
            data = r.json()
            features = data.get("features", [])
            if features:
                props = features[0].get("properties", {})

                street = props.get("street", "") or ""
                if not street and props.get("osm_key") == "highway":
                    street = props.get("name", "") or ""

                if not street:
                    log("  Photon senza via, provo Nominatim...")
                    try:
                        url_nom = "https://nominatim.openstreetmap.org/reverse"
                        params_nom = {"lat": lat, "lon": lng, "format": "json", "zoom": 18, "addressdetails": 1}
                        headers_nom = {"User-Agent": "FramesOfTruth/1.0"}
                        r_nom = requests.get(url_nom, params=params_nom, headers=headers_nom, timeout=6)
                        if r_nom.status_code == 200:
                            data_nom = r_nom.json()
                            addr_nom = data_nom.get("address", {})
                            road_nom = addr_nom.get("road", "")
                            if road_nom:
                                street = road_nom
                                log(f"  Via trovata da Nominatim: {road_nom}")
                    except Exception as e:
                        log(f"  Nominatim exception (dentro Photon): {e}")

                return {
                    "name": props.get("name", ""),
                    "street": street,
                    "housenumber": props.get("housenumber", ""),
                    "postcode": props.get("postcode", ""),
                    "city": props.get("city", "") or props.get("district", ""),
                    "state": props.get("state", ""),
                    "country": props.get("country", ""),
                    "distance_m": 0,
                }
    except Exception as e:
        log(f"  Photon exception: {e}")

    try:
        url = "https://nominatim.openstreetmap.org/reverse"
        params = {"lat": lat, "lon": lng, "format": "json", "zoom": 18, "addressdetails": 1}
        headers = {"User-Agent": "FramesOfTruth/1.0"}
        r = requests.get(url, params=params, headers=headers, timeout=6)
        if r.status_code == 200:
            data = r.json()
            addr = data.get("address", {})
            city = addr.get("city") or addr.get("town") or addr.get("village") or addr.get("hamlet", "")
            return {
                "name": data.get("name", ""),
                "street": addr.get("road", ""),
                "housenumber": addr.get("house_number", ""),
                "postcode": addr.get("postcode", ""),
                "city": city,
                "state": addr.get("state", ""),
                "country": addr.get("country", ""),
                "distance_m": -1,
            }
    except Exception as e:
        log(f"  Nominatim exception: {e}")
    return {}


def get_pois_overpass(lat, lng, radius=500):
    cache_key = f"ovp:{round(lat,4)},{round(lng,4)},{radius}"
    if cache_key in _geoapify_cache:
        return _geoapify_cache[cache_key]

    query = f"""
    [out:json][timeout:25];
    (
      nwr(around:{radius},{lat},{lng})["building"="warehouse"]["name"];
      nwr(around:{radius},{lat},{lng})["building"="industrial"]["name"];
      nwr(around:{radius},{lat},{lng})["landuse"="industrial"]["name"];
      nwr(around:{radius},{lat},{lng})["office"="logistics"]["name"];
      nwr(around:{radius},{lat},{lng})["amenity"="post_depot"]["name"];
      nwr(around:{radius},{lat},{lng})["man_made"="works"]["name"];
      nwr(around:{radius},{lat},{lng})["building"="commercial"]["name"];
      nwr(around:{radius},{lat},{lng})["building"="retail"]["name"];
      nwr(around:{radius},{lat},{lng})["amenity"="place_of_worship"]["name"];
      nwr(around:{radius},{lat},{lng})["amenity"="police"]["name"];
      nwr(around:{radius},{lat},{lng})["amenity"="fire_station"]["name"];
      nwr(around:{radius},{lat},{lng})["amenity"="hospital"]["name"];
      nwr(around:{radius},{lat},{lng})["amenity"="school"]["name"];
      nwr(around:{radius},{lat},{lng})["amenity"="university"]["name"];
      nwr(around:{radius},{lat},{lng})["tourism"="attraction"]["name"];
      nwr(around:{radius},{lat},{lng})["tourism"="museum"]["name"];
    );
    out center tags;
    """
    try:
        r = requests.post(
            "https://overpass-api.de/api/interpreter",
            data={"data": query},
            headers={"User-Agent": "FramesOfTruth/1.0"},
            timeout=10
        )
        if r.status_code != 200:
            _geoapify_cache[cache_key] = []
            return []
        data = r.json()
        elements = data.get("elements", [])
        from math import radians, sin, cos, sqrt, atan2
        R = 6371000.0
        pois = []
        seen_names = set()
        for el in elements:
            tags = el.get("tags", {})
            name = tags.get("name")
            if not name or name in seen_names:
                continue
            elat = el.get("lat")
            elng = el.get("lon")
            if elat is None or elng is None:
                center = el.get("center", {})
                elat = center.get("lat")
                elng = center.get("lon")
            if elat is None or elng is None:
                continue
            dlat = radians(elat - lat)
            dlon = radians(elng - lng)
            a = sin(dlat/2)**2 + cos(radians(lat)) * cos(radians(elat)) * sin(dlon/2)**2
            dist_m = int(R * 2 * atan2(sqrt(a), sqrt(1-a)))
            tipo = "place"
            for k in ["amenity", "shop", "office", "tourism", "building", "landuse", "industrial", "man_made"]:
                if k in tags:
                    tipo = tags[k]
                    break
            cats = [f"osm.{tipo}"]
            place_url = f"https://www.openstreetmap.org/{el.get('type','node')}/{el.get('id')}"
            pois.append({
                "name": name, "type": tipo, "categories": cats,
                "lat": elat, "lng": elng, "distance_m": dist_m,
                "url": place_url, "group": "overpass",
            })
            seen_names.add(name)
        _geoapify_cache[cache_key] = pois
        return pois
    except Exception as e:
        log(f"  Overpass exception: {e}")
    _geoapify_cache[cache_key] = []
    return []


def get_pois_geoapify(lat, lng, radius=300):
    log(f"  Geoapify: inizio (lat={lat}, lng={lng}, radius={radius})")
    log(f"  Geoapify: chiave presente? {bool(GEOAPIFY_API_KEY)} (lunghezza: {len(GEOAPIFY_API_KEY) if GEOAPIFY_API_KEY else 0})")
    if not GEOAPIFY_API_KEY:
        log("  Geoapify non configurato")
        return []
    cache_key = f"{round(lat,4)},{round(lng,4)},{radius}"
    if cache_key in _geoapify_cache:
        return _geoapify_cache[cache_key]

    gruppi = [
        ("religione", "religion"),
        ("edifici", "building,heritage,memorial,man_made"),
        ("cultura_turismo", "tourism,entertainment,leisure"),
        ("commerciale", "commercial,catering"),
        ("servizi", "office,service,education,healthcare,emergency,childcare,amenity"),
        ("logistica", "office.logistics,office.company,production.factory,building.industrial"),
        ("sport", "sport,activity,ski"),
        ("trasporti", "public_transport,railway,parking,highway,airport"),
        ("natura", "natural,beach,national_park,island,waterway"),
        ("marittimo", "maritime"),
        ("politico", "political,administrative"),
        ("adult", "adult"),
        ("ricettivo", "accommodation,camping,rental"),
        ("industriale", "power,production"),
        ("animali", "pet"),
        ("geografico", "continent,country,populated_place,postal_code,low_emission_zone,traffic_signals"),
    ]

    from math import radians, sin, cos, sqrt, atan2
    R = 6371000.0
    pois = []
    seen_names = set()

    for nome_gruppo, cats in gruppi:
        url = "https://api.geoapify.com/v2/places"
        params = {
            "categories": cats,
            "filter": f"circle:{lng},{lat},{radius}",
            "limit": 20,
            "apiKey": GEOAPIFY_API_KEY,
        }
        success = False
        for tentativo in range(3):
            try:
                r = requests.get(url, params=params, timeout=10)
                if r.status_code == 200:
                    data = r.json()
                    for f in data.get("features", []):
                        props = f.get("properties", {})
                        name = props.get("name")
                        if not name or name in seen_names:
                            continue
                        coords = f.get("geometry", {}).get("coordinates", [])
                        if len(coords) < 2:
                            continue
                        elat, elng = coords[1], coords[0]
                        dlat = radians(elat - lat)
                        dlon = radians(elng - lng)
                        a = sin(dlat/2)**2 + cos(radians(lat)) * cos(radians(elat)) * sin(dlon/2)**2
                        dist_m = int(R * 2 * atan2(sqrt(a), sqrt(1-a)))
                        cs = props.get("categories", [])
                        tipo = cs[0].split(".")[-1] if cs else "place"
                        for c in cs:
                            if "." in c:
                                tipo = c.split(".")[-1]
                                break
                        place_id = props.get("place_id", "")
                        place_url = f"https://www.geoapify.com/place/{place_id}" if place_id else ""
                        pois.append({
                            "name": name, "type": tipo, "categories": cs,
                            "lat": elat, "lng": elng, "distance_m": dist_m,
                            "url": place_url, "group": nome_gruppo,
                        })
                        seen_names.add(name)
                    success = True
                    break
                else:
                    log(f"  Geoapify [{nome_gruppo}] HTTP {r.status_code}")
                    break
            except Exception as e:
                if tentativo < 2:
                    log(f"  Geoapify [{nome_gruppo}] tentativo {tentativo+1} fallito, riprovo tra 1s...")
                    time.sleep(1.0)
                else:
                    log(f"  Geoapify [{nome_gruppo}] exception definitiva: {str(e)[:100]}")
        time.sleep(0.4)

    try:
        overpass_pois = get_pois_overpass(lat, lng, radius=radius)
        for op in overpass_pois:
            if op["name"] not in seen_names:
                pois.append(op)
                seen_names.add(op["name"])
    except Exception as e:
        log(f"  Errore Overpass: {e}")

    pois.sort(key=lambda x: x["distance_m"])
    _geoapify_cache[cache_key] = pois[:50]
    return pois[:50]


# ============================================================
# WIKIDATA / GDELT / WIKIPEDIA
# ============================================================
def get_wikidata_entities(lat, lng, radius_km=1, limit=15, lang="en"):
    query = f"""
    SELECT ?item ?itemLabel ?itemDescription ?typeLabel WHERE {{
      SERVICE wikibase:around {{
        ?item wdt:P625 ?location .
        bd:serviceParam wikibase:center "Point({lng} {lat})"^^geo:wktLiteral .
        bd:serviceParam wikibase:radius "{radius_km}" .
      }}
      OPTIONAL {{ ?item wdt:P31 ?type . }}
      SERVICE wikibase:label {{ bd:serviceParam wikibase:language "{lang},en". }}
    }}
    LIMIT {limit}
    """
    url = "https://query.wikidata.org/sparql"
    headers = {"User-Agent": "FramesOfTruth/1.0", "Accept": "application/sparql-results+json"}
    try:
        r = requests.get(url, params={"query": query, "format": "json"}, headers=headers, timeout=10)
        if r.status_code == 200:
            data = r.json()
            entities = []
            for b in data.get("results", {}).get("bindings", []):
                label = b.get("itemLabel", {}).get("value", "")
                desc = b.get("itemDescription", {}).get("value", "")
                typ = b.get("typeLabel", {}).get("value", "")
                item_uri = b.get("item", {}).get("value", "")
                qid = item_uri.split("/")[-1] if item_uri else ""
                wd_url = f"https://www.wikidata.org/wiki/{qid}" if qid else ""
                if label and not label.startswith("Q"):
                    entities.append({"label": label, "description": desc, "type": typ, "url": wd_url})
            return entities
    except Exception as e:
        log(f"Errore Wikidata: {e}")
    return []


def get_gdelt_local_news(lat, lng, radius_km=25):
    radius_miles = int(radius_km * 0.621371)
    url = "https://api.gdeltproject.org/api/v2/doc/doc"
    params = {
        "query": f"near:{lat},{lng},{radius_miles}mi",
        "mode": "artlist", "maxrecords": "15", "format": "json", "sort": "datedesc",
    }
    try:
        r = requests.get(url, params=params, timeout=8)
        if r.status_code == 200 and r.text.strip():
            data = r.json()
            news = []
            for art in data.get("articles", []):
                title = art.get("title", "")
                if title:
                    news.append({
                        "title": title, "source": art.get("domain", ""),
                        "date": (art.get("seendate", "") or "")[:10],
                        "url": art.get("url", ""),
                    })
            return news
    except Exception as e:
        log(f"Errore GDELT: {e}")
    return []


def wiki_get(lang, params):
    key = lang + str(params)
    if key in _wiki_cache:
        return _wiki_cache[key]
    url = f"https://{lang}.wikipedia.org/w/api.php"
    headers = {"User-Agent": "FramesOfTruth/1.0"}
    try:
        r = requests.get(url, headers=headers, params=params, timeout=6)
        if r.status_code == 200:
            data = r.json()
            _wiki_cache[key] = data
            return data
    except Exception as e:
        log(f"Wiki error: {e}")
    return {}


def get_nearby_places(lat, lng, lang, radius=5000, limit=15):
    params = {"action":"query","list":"geosearch","gscoord":f"{lat}|{lng}","gsradius":radius,"gslimit":limit,"format":"json"}
    data = wiki_get(lang, params)
    pages = data.get("query", {}).get("geosearch", [])
    return sorted([{"id":p["pageid"],"name":p["title"],"lat":p["lat"],"lng":p["lon"],"distanza_km":round(p["dist"]/1000,2)} for p in pages], key=lambda x: x["distanza_km"])


def get_extract(pageid, lang):
    params = {"action":"query","prop":"extracts","exintro":False,"explaintext":True,"pageids":pageid,"format":"json"}
    data = wiki_get(lang, params)
    pages = data.get("query", {}).get("pages", {})
    for pid, page in pages.items():
        extract = page.get("extract", "")
        if extract:
            return extract[:1200]
    return ""


def cerca_sul_web(query, max_results=5, lang="en"):
    results = []
    for lg in [lang, "en"]:
        try:
            url = f"https://{lg}.wikipedia.org/w/api.php"
            params = {"action":"query","list":"search","srsearch":query,"srlimit":max_results,"format":"json"}
            r = requests.get(url, params=params, headers={"User-Agent": "FramesOfTruth/1.0"}, timeout=6)
            if r.status_code == 200:
                data = r.json()
                for item in data.get("query", {}).get("search", []):
                    title = item.get("title", "")
                    snippet = item.get("snippet", "").replace('<span class="searchmatch">', '').replace('</span>', '')
                    wiki_url = f"https://{lg}.wikipedia.org/wiki/{title.replace(' ', '_')}"
                    results.append({"title": title, "snippet": snippet, "url": wiki_url})
        except Exception:
            pass
    return results[:max_results * 2]


def rileva_lingua_da_coord(lat, lng, fallback_lang=None):
    key = f"{round(lat,2)},{round(lng,2)}"
    if key in _lang_cache:
        return _lang_cache[key]
    url = "https://nominatim.openstreetmap.org/reverse"
    params = {"lat": lat, "lon": lng, "format": "json", "zoom": 5}
    headers = {"User-Agent": "FramesOfTruth/1.0"}
    try:
        r = requests.get(url, params=params, headers=headers, timeout=6)
        if r.status_code == 200:
            data = r.json()
            country = data.get("address", {}).get("country_code", "").lower()
            lang = COUNTRY_TO_LANG.get(country, fallback_lang or "en")
            _lang_cache[key] = (lang, country)
            return lang, country
    except Exception as e:
        log(f"Errore Nominatim: {e}")
    _lang_cache[key] = (fallback_lang or "en", "")
    return fallback_lang or "en", ""


# ============================================================
# EXIF
# ============================================================
def _dms_to_decimal(dms, ref):
    try:
        d = float(dms[0]) + float(dms[1])/60.0 + float(dms[2])/3600.0
        if ref in ['S','W']:
            d = -d
        return d
    except:
        return None


def _to_float(val):
    try:
        if isinstance(val, tuple) and len(val) == 2:
            return float(val[0]) / float(val[1]) if val[1] != 0 else None
        return float(val)
    except Exception:
        return None


def _to_str(val):
    if isinstance(val, bytes):
        try:
            return val.decode("utf-8", errors="ignore").strip("\x00")
        except Exception:
            return val.decode("latin-1", errors="ignore").strip("\x00")
    return str(val).strip() if val is not None else None


def estrai_metadati_foto(image_bytes):
    meta = {
        "lat": None, "lng": None, "altitude": None, "altitude_ref": None,
        "direction": None, "speed": None, "gps_date": None, "gps_time": None,
        "gps_dop": None, "gps_processing": None,
        "datetime_original": None, "datetime_digitized": None,
        "make": None, "model": None, "software": None,
        "artist": None, "copyright": None, "image_description": None,
        "user_comment": None, "lens_model": None,
        "focal_length": None, "f_number": None, "iso": None,
        "exposure_time": None, "flash": None, "orientation": None,
        "image_format": None, "image_mode": None,
        "width": None, "height": None, "megapixels": None,
        "file_size_bytes": None, "file_size_human": None,
    }
    try:
        meta["file_size_bytes"] = len(image_bytes)
        if meta["file_size_bytes"] < 1024:
            meta["file_size_human"] = f"{meta['file_size_bytes']} B"
        elif meta["file_size_bytes"] < 1024 * 1024:
            meta["file_size_human"] = f"{meta['file_size_bytes'] / 1024:.1f} KB"
        else:
            meta["file_size_human"] = f"{meta['file_size_bytes'] / (1024 * 1024):.2f} MB"

        img = Image.open(io.BytesIO(image_bytes))
        meta["image_format"] = img.format
        meta["image_mode"] = img.mode
        meta["width"], meta["height"] = img.size
        if meta["width"] and meta["height"]:
            mp = (meta["width"] * meta["height"]) / 1_000_000
            meta["megapixels"] = round(mp, 1)

        exif_data = img._getexif()
        if not exif_data:
            return meta

        for tag_id, value in exif_data.items():
            tag = ExifTags.TAGS.get(tag_id, tag_id)
            if tag == "DateTimeOriginal":
                meta["datetime_original"] = _to_str(value)
            elif tag == "DateTimeDigitized":
                meta["datetime_digitized"] = _to_str(value)
            elif tag == "Make":
                meta["make"] = _to_str(value)
            elif tag == "Model":
                meta["model"] = _to_str(value)
            elif tag == "Software":
                meta["software"] = _to_str(value)
            elif tag == "Artist":
                meta["artist"] = _to_str(value)
            elif tag == "Copyright":
                meta["copyright"] = _to_str(value)
            elif tag == "ImageDescription":
                meta["image_description"] = _to_str(value)
            elif tag == "UserComment":
                meta["user_comment"] = _to_str(value)
            elif tag == "LensModel":
                meta["lens_model"] = _to_str(value)
            elif tag == "FocalLength":
                meta["focal_length"] = _to_float(value)
            elif tag == "FNumber":
                meta["f_number"] = _to_float(value)
            elif tag == "ISOSpeedRatings":
                meta["iso"] = _to_str(value)
            elif tag == "ExposureTime":
                meta["exposure_time"] = _to_float(value)
            elif tag == "Flash":
                meta["flash"] = _to_str(value)
            elif tag == "Orientation":
                meta["orientation"] = _to_str(value)
            elif tag == "GPSInfo":
                gps_tags = {}
                for key, val in value.items():
                    gps_tags[ExifTags.GPSTAGS.get(key, key)] = val
                lat_dms = gps_tags.get("GPSLatitude")
                lat_ref = gps_tags.get("GPSLatitudeRef", "N")
                lng_dms = gps_tags.get("GPSLongitude")
                lng_ref = gps_tags.get("GPSLongitudeRef", "E")
                if lat_dms and lng_dms:
                    meta["lat"] = _dms_to_decimal(lat_dms, lat_ref)
                    meta["lng"] = _dms_to_decimal(lng_dms, lng_ref)
                alt = gps_tags.get("GPSAltitude")
                alt_ref = gps_tags.get("GPSAltitudeRef", 0)
                if alt is not None:
                    alt_val = _to_float(alt)
                    if alt_ref in (1, b"\x01"):
                        alt_val = -alt_val if alt_val else alt_val
                    meta["altitude"] = round(alt_val, 1) if alt_val is not None else None
                    meta["altitude_ref"] = "below" if alt_ref in (1, b"\x01") else "above"
                direction = gps_tags.get("GPSImgDirection")
                if direction is not None:
                    meta["direction"] = round(_to_float(direction), 1) if _to_float(direction) else None
                speed = gps_tags.get("GPSSpeed")
                if speed is not None:
                    meta["speed"] = round(_to_float(speed), 2) if _to_float(speed) else None
                gps_date = gps_tags.get("GPSDateStamp")
                if gps_date:
                    meta["gps_date"] = _to_str(gps_date)
                gps_time = gps_tags.get("GPSTimeStamp")
                if gps_time:
                    try:
                        h = _to_float(gps_time[0]) or 0
                        m = _to_float(gps_time[1]) or 0
                        s = _to_float(gps_time[2]) or 0
                        meta["gps_time"] = f"{int(h):02d}:{int(m):02d}:{int(s):02d}"
                    except Exception:
                        pass
                dop = gps_tags.get("GPSDOP")
                if dop is not None:
                    meta["gps_dop"] = round(_to_float(dop), 2) if _to_float(dop) else None
                proc = gps_tags.get("GPSProcessingMethod")
                if proc:
                    meta["gps_processing"] = _to_str(proc)
        return meta
    except Exception as e:
        log(f"EXIF error: {e}")
        return meta


def calcola_dati_astronomici(lat, lng, dt_str):
    try:
        if not dt_str:
            return None
        dt = None
        for fmt in ["%Y:%m:%d %H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y:%m:%d", "%Y-%m-%d"]:
            try:
                dt = datetime.strptime(dt_str, fmt)
                break
            except ValueError:
                continue
        if dt is None:
            return None
        loc = LocationInfo(latitude=lat, longitude=lng)
        s = astral_sun(loc.observer, date=dt.date())
        sunrise = s["sunrise"]
        sunset = s["sunset"]
        solar_noon = s["noon"]
        day_length = sunset - sunrise
        day_hours = day_length.total_seconds() / 3600.0
        mphase = moon_phase(dt.date())
        if mphase < 1.85: phase_name = "New Moon"
        elif mphase < 5.53: phase_name = "Waxing Crescent"
        elif mphase < 9.22: phase_name = "First Quarter"
        elif mphase < 12.91: phase_name = "Waxing Gibbous"
        elif mphase < 16.61: phase_name = "Full Moon"
        elif mphase < 20.30: phase_name = "Waning Gibbous"
        elif mphase < 23.99: phase_name = "Last Quarter"
        else: phase_name = "Waning Crescent"
        return {
            "date": dt.strftime("%Y-%m-%d"),
            "sunrise": sunrise.strftime("%H:%M UTC"),
            "sunset": sunset.strftime("%H:%M UTC"),
            "solar_noon": solar_noon.strftime("%H:%M UTC"),
            "day_length_hours": round(day_hours, 2),
            "moon_phase": round(mphase, 1),
            "moon_phase_name": phase_name,
        }
    except Exception as e:
        log(f"Astro error: {e}")
        return None


def pulisci_sezioni_vuote(testo, labels):
    import re
    label_cur = labels.get('curiosity', 'Curiosity')
    pattern = (
        r'\*\*\s*' + re.escape(label_cur) + r'\s*:\s*\*\*'
        r'\s*'
        r'(?:-\s*(?:Nessun|Ningún|No hay|Keine|Aucun|Nenhum|Geen|No|None)[^\n]*)?'
        r'\s*$'
    )
    return re.sub(pattern, '', testo, flags=re.IGNORECASE | re.MULTILINE).rstrip()


# ============================================================
# GENERAZIONE STORIA (Groq -> OpenRouter fallback)
# ============================================================
def genera_storia(labels, soggetto, luogo_nome, indirizzo, poi_text, wiki_context, lat, lng, lang):
    target_lang = LANG_NAMES.get(lang, "English")
    vision_failed = (soggetto is None or soggetto == "VISIONE NON DISPONIBILE")
    if vision_failed:
        vision_warning = msg("vision_unavailable", lang)
        soggetto = "VISIONE NON DISPONIBILE"
    else:
        vision_warning = ""

    if luogo_nome == "questo luogo" or luogo_nome == "this place":
        luogo_instruction = (
            f"No specific location could be identified at these coordinates. "
            f"Write this sentence in {target_lang}: "
            f"'No specific location could be identified at these coordinates, but the photo was taken in {indirizzo}.'"
        )
    else:
        luogo_instruction = (
            f"You MUST start the section with a sentence stating that the photo was taken FROM **{luogo_nome}**, "
            f"which is located in {indirizzo}. "
            f"IMPORTANT: this is the LOCATION OF THE PHOTOGRAPHER (where the camera was), "
            f"NOT necessarily the subject of the photo. The subject may be a distant landscape, "
            f"a hill, a monument, or something visible far away. "
            f"Write this first sentence ENTIRELY in {target_lang} "
            f"(do NOT use English if {target_lang} is not English). "
            f"Then add 2-4 sentences of geographic context in {target_lang}."
        )

    prompt = f"""Answer in {target_lang}.

You are a narrator who tells about territories based on real, documented facts.

**Main place:** {luogo_nome}
**Geographic context:** {indirizzo}

**Nearby POIs:**
{poi_text if poi_text else "(no POI found)"}

**Historical context (Wikipedia):**
{wiki_context if wiki_context else "(no Wikipedia entry nearby)"}

**Coordinates:** {lat}, {lng}
**Photo description:**
{soggetto}
{vision_warning}

Write a text in three sections with bold labels:

**{labels['location']}:**
{luogo_instruction}

**{labels['image']}:**
Describe the photo using the vision description. Include ALL details.

**{labels['curiosity']}:**
Based on Wikipedia and POIs, tell curiosities. If none, write "- No documented event."

RULES: Complete ALL sentences. Do not invent names. The entire response in {target_lang}."""

    for model_name in ["openai/gpt-oss-120b", "openai/gpt-oss-20b"]:
        try:
            response = groq_chat(
                model=model_name,
                messages=[
                    {"role": "system", "content": f"You are a narrator. Answer in {target_lang}."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.6,
                max_tokens=4000
            )
            testo = (response.choices[0].message.content or "").strip()
            if testo:
                log(f"Groq {model_name} OK")
                return pulisci_sezioni_vuote(testo, labels)
        except Exception as e:
            log(f"Errore Groq {model_name}: {str(e)[:150]}")
            continue

    log("Storia: Groq fallito, provo OpenRouter...")
    testo = openrouter_text_rest(
        prompt, lang,
        system_msg=f"You are a narrator. Answer in {target_lang}.",
        max_tokens=4000
    )
    if testo:
        return pulisci_sezioni_vuote(testo, labels)

    return "(nessuna storia)"


# ============================================================
# RUN STORY TASK
# ============================================================
def run_story_task(task_id, browser_lat, browser_lng, image_bytes, place_id, place_name, use_browser_location, request_lang, exif_override=None):
    global CURRENT_TASK_ID
    CURRENT_TASK_ID = task_id
    start_time = time.time()
    MAX_TASK_SECONDS = 90

    def check_timeout():
        if time.time() - start_time > MAX_TASK_SECONDS:
            raise TimeoutError(f"Task superato il limite di {MAX_TASK_SECONDS}s")

    try:
        log("Avvio analisi...")
        if not image_bytes:
            TASKS[task_id]["error"] = msg("no_image", request_lang)
            TASKS[task_id]["done"] = True
            return

        meta_foto = estrai_metadati_foto(image_bytes)
        if exif_override:
            log(f"EXIF override ricevuto: lat={exif_override.get('lat')}, lng={exif_override.get('lng')}")
            if exif_override.get("lat") is not None:
                meta_foto["lat"] = exif_override["lat"]
            if exif_override.get("lng") is not None:
                meta_foto["lng"] = exif_override["lng"]
            for field in ["datetime_original", "make", "model", "altitude", "altitude_ref", "orientation"]:
                if exif_override.get(field) is not None:
                    meta_foto[field] = exif_override[field]

        exif_lat = meta_foto.get("lat")
        exif_lng = meta_foto.get("lng")

        if exif_lat is None or exif_lng is None:
            if use_browser_location and browser_lat and browser_lng:
                lat, lng = browser_lat, browser_lng
                gps_source = "browser_fallback"
                log(f"Nessun GPS nella foto. Uso posizione browser: {lat}, {lng}")
            else:
                log("Nessun GPS nella foto e nessun fallback richiesto.")
                TASKS[task_id]["error"] = msg("no_gps_exif", request_lang)
                TASKS[task_id]["error_type"] = "no_exif_gps"
                TASKS[task_id]["done"] = True
                return
        else:
            lat, lng = exif_lat, exif_lng
            gps_source = "exif"
            log(f"Coordinate GPS dalla foto: {lat}, {lng}")

        check_timeout()
        auto_lang, country = rileva_lingua_da_coord(lat, lng, fallback_lang=request_lang)
        if request_lang and request_lang in SUPPORTED_LANGS:
            lang = request_lang
        else:
            lang = auto_lang
        labels = get_labels(lang)

        photon_data = {}
        try:
            photon_data = get_photon_details(lat, lng)
        except Exception:
            pass
        check_timeout()

        osm_pois = []
        try:
            log("  Chiamo Geoapify...")
            osm_pois = get_pois_geoapify(lat, lng, radius=300)
            log(f"  Geoapify ha restituito {len(osm_pois)} POI")
        except Exception as e:
            log(f"  ERRORE Geoapify: {str(e)[:200]}")
            import traceback
            log(traceback.format_exc()[:500])
        check_timeout()

        MAX_DIST_POI_M = 50
        luogo_nome_finale = "questo luogo"
        luogo_principale = None

        via = (photon_data.get("street") or "").strip()
        civico = (photon_data.get("housenumber") or "").strip()
        citta = (photon_data.get("city") or "").strip()

        if via:
            indirizzo_fallback = f"{via} {civico}".strip() if civico else via
        elif citta:
            indirizzo_fallback = citta
        else:
            indirizzo_fallback = "questo luogo"

        poi_piu_vicino = None
        dist_poi = 99999
        if osm_pois:
            poi_piu_vicino = sorted(osm_pois, key=lambda x: x.get('distance_m', 99999))[0]
            dist_poi = poi_piu_vicino.get('distance_m', 99999)

        if poi_piu_vicino and dist_poi <= MAX_DIST_POI_M:
            luogo_principale = poi_piu_vicino
            luogo_nome_finale = poi_piu_vicino['name']
            log(f"Luogo scelto (POI Geoapify entro {MAX_DIST_POI_M}m): {luogo_nome_finale} a {dist_poi}m")
        else:
            luogo_nome_finale = indirizzo_fallback
            if poi_piu_vicino:
                log(f"Luogo scelto (indirizzo Photon): {luogo_nome_finale} (POI più vicino: {poi_piu_vicino['name']} a {dist_poi}m, oltre {MAX_DIST_POI_M}m -> NON usato come location)")
            else:
                log(f"Luogo scelto (indirizzo Photon): {luogo_nome_finale} (nessun POI Geoapify trovato)")

        wiki_context = ""
        try:
            wiki_places = get_nearby_places(lat, lng, lang, radius=10000, limit=5)
            if wiki_places:
                wiki_parts = []
                for wp in wiki_places[:3]:
                    extract = get_extract(wp["id"], lang)
                    if extract:
                        wiki_parts.append(f"- {wp['name']} ({wp['distanza_km']} km): {extract[:300]}")
                wiki_context = "\n".join(wiki_parts)
        except Exception:
            pass

        check_timeout()
        soggetto = descrivi_immagine(image_bytes, lang)
        if not soggetto:
            soggetto = "VISIONE NON DISPONIBILE"

        indirizzo_parts = []
        if photon_data.get("city"): indirizzo_parts.append(photon_data["city"])
        if photon_data.get("state"): indirizzo_parts.append(photon_data["state"])
        if photon_data.get("country"): indirizzo_parts.append(photon_data["country"])
        indirizzo_completo = ", ".join(indirizzo_parts)

        poi_text = ""
        if osm_pois:
            poi_lines = []
            for p in osm_pois[:10]:
                line = f"- {p['name']} ({p['type']}) a {p.get('distance_m', '?')}m"
                if p.get('url'):
                    line += f" [map: {p['url']}]"
                poi_lines.append(line)
            poi_text = "\n".join(poi_lines)

        check_timeout()
        storia = genera_storia(labels, soggetto, luogo_nome_finale, indirizzo_completo, poi_text, wiki_context, lat, lng, lang)

        astro_data = None
        dt_for_astro = meta_foto.get("datetime_original") or meta_foto.get("datetime_digitized")
        if dt_for_astro:
            astro_data = calcola_dati_astronomici(lat, lng, dt_for_astro)

        TASKS[task_id]["result"] = {
            "storia": storia, "soggetto": soggetto, "luogo": luogo_nome_finale,
            "indirizzo": indirizzo_completo, "lat": round(lat, 6), "lng": round(lng, 6),
            "gps_source": gps_source, "lang": lang, "labels": labels,
            "metadata": meta_foto, "astronomical": astro_data,
        }
        TASKS[task_id]["done"] = True
        log("Analisi completata!")
    except TimeoutError as e:
        log(f"TIMEOUT: {e}")
        TASKS[task_id]["error"] = f"Timeout: analisi troppo lunga ({str(e)})"
        TASKS[task_id]["done"] = True
    except Exception as e:
        TASKS[task_id]["error"] = str(e)
        TASKS[task_id]["done"] = True
        log(f"ERRORE: {e}")
        log(traceback.format_exc())
    finally:
        CURRENT_TASK_ID = None


# ============================================================
# ROUTES
# ============================================================
@app.route("/health")
def health():
    return "OK", 200


@app.route("/")
def index():
    index_path = os.path.join(WEB_DIR, "index.html")
    log(f"WEB_DIR = {WEB_DIR}")
    log(f"index.html esiste? {os.path.exists(index_path)}")
    if not os.path.exists(index_path):
        return f"<h1>Error: index.html not found</h1><p>WEB_DIR: {WEB_DIR}</p>", 404
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()
    return Response(content, mimetype="text/html")


@app.route("/<path:filename>")
def static_files(filename):
    filepath = os.path.join(WEB_DIR, filename)
    if not os.path.exists(filepath):
        return f"File not found: {filename}", 404

    if filename.endswith(".css"):
        mime_type = "text/css"
    elif filename.endswith(".js"):
        mime_type = "application/javascript"
    elif filename.endswith(".html"):
        mime_type = "text/html"
    elif filename.endswith(".json"):
        mime_type = "application/json"
    elif filename.endswith(".png"):
        mime_type = "image/png"
    elif filename.endswith(".jpg") or filename.endswith(".jpeg"):
        mime_type = "image/jpeg"
    elif filename.endswith(".svg"):
        mime_type = "image/svg+xml"
    elif filename.endswith(".ico"):
        mime_type = "image/x-icon"
    else:
        mime_type, _ = mimetypes.guess_type(filename)
        if mime_type is None:
            mime_type = "application/octet-stream"

    with open(filepath, "rb") as f:
        content = f.read()
    log(f"Servo {filename} come {mime_type} ({len(content)} bytes)")
    return Response(content, mimetype=mime_type)


@app.route("/api/places")
def api_places():
    try:
        lat = float(request.args.get("lat"))
        lng = float(request.args.get("lng"))
        radius = int(request.args.get("radius", 5000))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid coordinates"}), 400
    lang = get_request_lang()
    places = get_nearby_places(lat, lng, lang, radius)
    return jsonify({"places": places, "lang": lang})


@app.route("/api/detect_language")
def api_detect_language():
    try:
        lat = float(request.args.get("lat"))
        lng = float(request.args.get("lng"))
    except (TypeError, ValueError):
        return jsonify({"lang": "en", "source": "fallback"})
    try:
        url = "https://nominatim.openstreetmap.org/reverse"
        params = {"lat": lat, "lon": lng, "format": "json", "zoom": 5}
        headers = {"User-Agent": "FramesOfTruth/1.0"}
        r = requests.get(url, params=params, headers=headers, timeout=6)
        if r.status_code == 200:
            data = r.json()
            country = data.get("address", {}).get("country_code", "").lower()
            lang = COUNTRY_TO_LANG.get(country, "en")
            return jsonify({"lang": lang, "country": country, "source": "nominatim"})
    except Exception:
        pass
    return jsonify({"lang": "en", "source": "fallback"})


@app.route("/api/story", methods=["POST"])
def api_story():
    task_id = str(uuid.uuid4())
    TASKS[task_id] = {"log": [], "done": False, "result": None, "error": None, "error_type": None}

    browser_lat = request.form.get("browser_lat")
    browser_lng = request.form.get("browser_lng")
    if not browser_lat or not browser_lng:
        TASKS[task_id]["error"] = "Posizione mancante. Attendi la geolocalizzazione del browser."
        TASKS[task_id]["done"] = True
        return jsonify({"task_id": task_id, "error": "Posizione mancante"})

    browser_lat = float(browser_lat)
    browser_lng = float(browser_lng)
    place_id = request.form.get("place_id")
    place_name = request.form.get("place_name", "")
    use_browser_location = request.form.get("use_browser_location", "false").lower() == "true"
    request_lang = get_request_lang()
    exif_override_raw = request.form.get("exif_override", "")
    exif_override = {}
    if exif_override_raw:
        try:
            exif_override = json.loads(exif_override_raw)
        except Exception:
            pass
    image_bytes = None
    if "image" in request.files and request.files["image"].filename:
        file = request.files["image"]
        image_bytes = file.read()
        MAX_SIZE = 120 * 1024 * 1024
        if len(image_bytes) > MAX_SIZE:
            err = f"File troppo grande ({len(image_bytes) / (1024*1024):.1f} MB). Max 120 MB."
            TASKS[task_id]["error"] = err
            TASKS[task_id]["done"] = True
            return jsonify({"task_id": task_id, "error": err})

    threading.Thread(
        target=run_story_task,
        args=(task_id, browser_lat, browser_lng, image_bytes, place_id, place_name, use_browser_location, request_lang, exif_override),
        daemon=True
    ).start()

    return jsonify({"task_id": task_id, "lang": request_lang})


@app.route("/api/story/status/<task_id>")
def api_story_status(task_id):
    task = TASKS.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    return jsonify(task)


@app.route("/api/discover", methods=["POST"])
def api_discover():
    try:
        lat = float(request.form.get("lat"))
        lng = float(request.form.get("lng"))
        soggetto = request.form.get("soggetto", "")
        luogo = request.form.get("luogo", "")
        lang = get_request_lang()
        target_lang = LANG_NAMES.get(lang, "English")

        metadata_raw = request.form.get("metadata", "")
        astronomical_raw = request.form.get("astronomical", "")
        metadata = {}
        astronomical = {}
        try:
            if metadata_raw: metadata = json.loads(metadata_raw)
        except Exception:
            pass
        try:
            if astronomical_raw: astronomical = json.loads(astronomical_raw)
        except Exception:
            pass

        photon_data = {}
        try:
            photon_data = get_photon_details(lat, lng)
        except Exception:
            pass

        pois = []
        try:
            pois = get_pois_geoapify(lat, lng, radius=500)
        except Exception:
            pass

        wikidata_entities = []
        try:
            wikidata_entities = get_wikidata_entities(lat, lng, radius_km=5, limit=20, lang=lang)
        except Exception:
            pass

        wiki_places = []
        try:
            wiki_places = get_nearby_places(lat, lng, lang, radius=10000, limit=10)
        except Exception:
            pass

        gdelt_news = []
        try:
            gdelt_news = get_gdelt_local_news(lat, lng, radius_km=50)
        except Exception:
            pass

        web_results = []
        if soggetto and soggetto.strip() != "VISIONE NON DISPONIBILE":
            import re
            keywords = re.findall(r'\b[A-Z][A-Z0-9]{2,}\b', soggetto)
            keywords.extend(re.findall(r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b', soggetto))
            seen = set()
            keywords = [k for k in keywords if not (k.lower() in seen or seen.add(k.lower()))]
            for kw in keywords[:4]:
                query = f'{kw} {luogo}'
                try:
                    results = cerca_sul_web(query, max_results=3, lang=lang)
                    if results:
                        web_results.extend(results)
                except Exception:
                    pass
                time.sleep(0.5)

        parts = []
        parts.append(f"**Coordinates:** {lat:.6f}, {lng:.6f}")
        parts.append(f"**Map:** https://www.openstreetmap.org/?mlat={lat}&mlon={lng}#map=18/{lat}/{lng}")

        if photon_data.get("city") or photon_data.get("state") or photon_data.get("country"):
            parts.append("")
            parts.append("**Administrative location:**")
            loc = []
            if photon_data.get("city"): loc.append(photon_data["city"])
            if photon_data.get("state"): loc.append(photon_data["state"])
            if photon_data.get("country"): loc.append(photon_data["country"])
            parts.append(f"- {', '.join(loc)}")

        if soggetto:
            parts.append("")
            parts.append("**Photo subject:**")
            parts.append(soggetto)

        if metadata:
            meta_lines = ["**Photo metadata:**"]
            if metadata.get("datetime_original"):
                meta_lines.append(f"- Date/time: {metadata['datetime_original']}")
            dev = " ".join([x for x in [metadata.get("make"), metadata.get("model")] if x])
            if dev:
                meta_lines.append(f"- Device: {dev}")
            if metadata.get("software"):
                meta_lines.append(f"- Software: {metadata['software']}")
            if metadata.get("altitude") is not None:
                meta_lines.append(f"- Altitude: {metadata['altitude']} m")
            if metadata.get("direction") is not None:
                d = metadata["direction"]
                compass = ["N","NE","E","SE","S","SW","W","NW"][round(d/45)%8]
                meta_lines.append(f"- Direction: {d}° ({compass})")
            if metadata.get("width") and metadata.get("height"):
                meta_lines.append(f"- Resolution: {metadata['width']}x{metadata['height']}")
            if astronomical:
                meta_lines.append(f"- Sunrise: {astronomical.get('sunrise')}, Sunset: {astronomical.get('sunset')}")
                meta_lines.append(f"- Moon: {astronomical.get('moon_phase_name')}")
            parts.append("")
            parts.extend(meta_lines)

        if pois:
            parts.append("")
            parts.append("**Nearby POIs (500m):**")
            for p in pois[:15]:
                line = f"- {p['name']} ({p['type']}) at {p.get('distance_m', '?')}m"
                if p.get('url'):
                    line += f" [map: {p['url']}]"
                parts.append(line)

        if wiki_places:
            parts.append("")
            parts.append("**Nearby Wikipedia entries (10km):**")
            for wp in wiki_places[:8]:
                wiki_url = f"https://{lang}.wikipedia.org/wiki/{wp['name'].replace(' ', '_')}"
                parts.append(f"- {wp['name']} ({wp['distanza_km']} km) [source: {wiki_url}]")

        if wikidata_entities:
            parts.append("")
            parts.append("**Wikidata entities (5km):**")
            for e in wikidata_entities[:12]:
                line = f"- {e['label']}"
                if e.get('type'): line += f" ({e['type']})"
                if e.get('description'): line += f": {e['description']}"
                if e.get('url'): line += f" [source: {e['url']}]"
                parts.append(line)

        if gdelt_news:
            parts.append("")
            parts.append("**Recent news (GDELT):**")
            for n in gdelt_news[:8]:
                line = f"- [{n['date']}] {n['title']} ({n['source']})"
                if n.get('url'): line += f" [read: {n['url']}]"
                parts.append(line)

        if web_results:
            parts.append("")
            parts.append("**Web results:**")
            for r in web_results[:10]:
                line = f"- {r['title']}"
                if r.get('snippet'): line += f": {r['snippet'][:250]}"
                if r.get('url'): line += f" [source: {r['url']}]"
                parts.append(line)

        report = "\n".join(parts)

        prompt = f"""Answer in {target_lang}.

You are an investigator. Write an in-depth report in {target_lang}.

COORDINATES: {lat}, {lng}
PLACE: {luogo}
SUBJECT: {soggetto}

DATA:
{report}

Write sections:
1. Location
2. Surroundings
3. Wikipedia and Wikidata
4. News
5. Metadata and deductions
6. Investigative hypothesis

RULES: Use **bold** for section titles. Include ALL links. Do NOT invent facts.
Entire response in {target_lang}."""

        report_finale = None
        try:
            response = groq_chat(
                model="openai/gpt-oss-120b",
                messages=[
                    {"role": "system", "content": f"You are an investigator. Answer in {target_lang}."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=5000
            )
            report_finale = (response.choices[0].message.content or "").strip()
            if report_finale:
                log(f"Report Groq OK: {len(report_finale)} caratteri")
        except Exception as e:
            log(f"Errore Groq report: {e}")

        if not report_finale:
            log("Report: Groq fallito, provo OpenRouter...")
            report_finale = openrouter_text_rest(
                prompt, lang,
                system_msg=f"You are an investigator. Answer in {target_lang}.",
                max_tokens=5000
            )

        if not report_finale:
            report_finale = report

        return jsonify({"report": report_finale, "lang": lang})

    except Exception as e:
        log(f"ERRORE CRITICO: {e}")
        log(traceback.format_exc())
        return jsonify({"errore": str(e)}), 500


# ============================================================
# RUN FLASK (chiamato da Android)
# ============================================================
def run_flask():
    app.run(host="127.0.0.1", port=5000, debug=False, threaded=True)


if __name__ == "__main__":
    run_flask()