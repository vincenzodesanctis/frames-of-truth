// ============================================================
// I18N - Traduzioni
// ============================================================
var I18N = {
    it: {
        subtitle: "Ogni foto nasconde una storia. Scoprila.",
        controls_title: "Scatta o trascina una foto",
        controls_title_android: "Scatta o scegli una foto",
        drop_text: "Trascina qui la foto",
        drop_sub: "oppure",
        file_label: "Scegli dal dispositivo",
        camera_label: "Scatta foto",
        status_default: "Seleziona o trascina una foto per generare la storia automaticamente.",
        status_default_android: "Seleziona una foto per generare la storia automaticamente.",
        story_placeholder: "La storia apparira' qui...",
        discover_btn: "Avvia indagine approfondita",
        discover_title: "Report investigativo",
        discover_loading: "Investigazione in corso...",
        map_label: "Posizione della foto",
        analyzing: "Analisi in corso...",
        elaborating: "Elaborazione...",
        error_generic: "Errore",
        gps_not_found: "GPS non trovato nella foto",
        gps_fallback_text: "Puoi comunque procedere localizzando la posizione del dispositivo (browser).",
        gps_fallback_btn: "Procedi con la posizione del dispositivo",
        gps_detecting: "Rilevamento GPS in corso...",
        network_error: "Errore di rete",
        using_fallback: "Uso posizione del dispositivo come fallback...",
        source_gps: "GPS dispositivo",
        source_ip: "IP-based",
        sending_photo: "Invio foto al server...",
        photo_location: "Posizione della foto",
        photo_taken_here: "Foto scattata qui",
        file_not_available: "File non disponibile, ricarica la foto.",
        wait_geolocation: "Attendi la geolocalizzazione...",
        api_missing_title: "Configurazione richiesta",
        api_missing_msg: "Le API key non sono configurate. Apri il menu ⚙️ in alto a sinistra per inserirle o importarle da un file .txt.",
        api_saved_ok: "Chiavi salvate.",
        api_only_android: "Funzione disponibile solo nell'app Android.",
        api_import_ok_prefix: "Importate ",
        api_import_ok_suffix: " chiavi:\n\n",
        api_import_ok_footer: "\n\nClicca \"Salva\" per confermare.",
        api_import_none: "Nessuna chiave trovata nel file.\n\nFormato richiesto:\nNOME_CHIAVE=valore\n\nEsempio:\nGROQ_API_KEY=gsk_xxxxx",
        api_import_error: "Errore nel parsing del file:\n",
        api_error_openfile: "Errore apertura file chooser: ",
        api_error_opencamera: "Errore apertura fotocamera: ",
        api_keys: {
            title: "⚙️ API Keys",
            intro: "Inserisci le tue chiavi API manualmente oppure importale da un file <strong>.txt</strong>. Se lasci un campo vuoto, verrà usata la chiave di default.",
            import_btn: "📥 Importa da file .txt",
            format_summary: "📄 Formato del file .txt (clicca per aprire)",
            format_desc: "Il file deve essere un semplice testo con una chiave per riga nel formato <code>NOME_CHIAVE=valore</code>. Esempio:",
            format_note: "• Le righe che iniziano con <code>#</code> sono ignorate (commenti).<br>• I campi mancanti restano invariati.<br>• Il riconoscimento è automatico: <code>groq</code>, <code>geoapify</code>, <code>gemini</code>, <code>hf</code>/<code>hugging</code>, <code>openrouter</code>.",
            label_groq: "Groq API Key",
            label_geoapify: "Geoapify API Key",
            label_gemini: "Gemini API Key",
            label_hf: "Hugging Face Token",
            label_openrouter: "OpenRouter API Key",
            opt_gemini: "(opzionale — fallback vision)",
            opt_hf: "(opzionale)",
            opt_openrouter: "(opzionale — fallback testo)",
            get_groq: "Ottienila su",
            get_geoapify: "Ottienila su",
            get_gemini: "Ottienila su",
            get_hf: "Ottienilo su",
            get_openrouter: "Ottienila su",
            save: "Salva",
            cancel: "Annulla",
        },
    },
    en: {
        subtitle: "Every photo hides a story. Uncover it.",
        controls_title: "Take or drag a photo",
        controls_title_android: "Take or choose a photo",
        drop_text: "Drag your photo here",
        drop_sub: "or",
        file_label: "Choose from device",
        camera_label: "Take photo",
        status_default: "Select or drag a photo to generate the story automatically.",
        status_default_android: "Select a photo to generate the story automatically.",
        story_placeholder: "The story will appear here...",
        discover_btn: "Launch deep investigation",
        discover_title: "Investigative report",
        discover_loading: "Investigation in progress...",
        map_label: "Photo location",
        analyzing: "Analysis in progress...",
        elaborating: "Processing...",
        error_generic: "Error",
        gps_not_found: "GPS not found in photo",
        gps_fallback_text: "You can still proceed by locating the device position.",
        gps_fallback_btn: "Proceed with device location",
        gps_detecting: "Detecting GPS...",
        network_error: "Network error",
        using_fallback: "Using device location as fallback...",
        source_gps: "Device GPS",
        source_ip: "IP-based",
        sending_photo: "Sending photo to server...",
        photo_location: "Photo location",
        photo_taken_here: "Photo taken here",
        file_not_available: "File not available, reload the photo.",
        wait_geolocation: "Wait for geolocation...",
        api_missing_title: "Configuration required",
        api_missing_msg: "API keys are not configured. Open the ⚙️ menu in the top-left corner to enter them or import them from a .txt file.",
        api_saved_ok: "Keys saved.",
        api_only_android: "Function available only in the Android app.",
        api_import_ok_prefix: "Imported ",
        api_import_ok_suffix: " keys:\n\n",
        api_import_ok_footer: "\n\nClick \"Save\" to confirm.",
        api_import_none: "No keys found in the file.\n\nRequired format:\nKEY_NAME=value\n\nExample:\nGROQ_API_KEY=gsk_xxxxx",
        api_import_error: "Error parsing file:\n",
        api_error_openfile: "Error opening file chooser: ",
        api_error_opencamera: "Error opening camera: ",
        api_keys: {
            title: "⚙️ API Keys",
            intro: "Enter your API keys manually or import them from a <strong>.txt</strong> file. If a field is left empty, the default key will be used.",
            import_btn: "📥 Import from .txt file",
            format_summary: "📄 .txt file format (click to open)",
            format_desc: "The file must be a plain text with one key per line in the format <code>KEY_NAME=value</code>. Example:",
            format_note: "• Lines starting with <code>#</code> are ignored (comments).<br>• Missing fields remain unchanged.<br>• Automatic recognition: <code>groq</code>, <code>geoapify</code>, <code>gemini</code>, <code>hf</code>/<code>hugging</code>, <code>openrouter</code>.",
            label_groq: "Groq API Key",
            label_geoapify: "Geoapify API Key",
            label_gemini: "Gemini API Key",
            label_hf: "Hugging Face Token",
            label_openrouter: "OpenRouter API Key",
            opt_gemini: "(optional — vision fallback)",
            opt_hf: "(optional)",
            opt_openrouter: "(optional — text fallback)",
            get_groq: "Get it on",
            get_geoapify: "Get it on",
            get_gemini: "Get it on",
            get_hf: "Get it on",
            get_openrouter: "Get it on",
            save: "Save",
            cancel: "Cancel",
        },
    },
    fr: {
        subtitle: "Chaque photo cache une histoire. Découvre-la.",
        controls_title: "Prenez ou glissez une photo",
        controls_title_android: "Prenez ou choisissez une photo",
        drop_text: "Glissez votre photo ici",
        drop_sub: "ou",
        file_label: "Choisir depuis l'appareil",
        camera_label: "Prendre une photo",
        status_default: "Selectionnez ou glissez une photo pour generer l'histoire.",
        status_default_android: "Selectionnez une photo pour generer l'histoire.",
        story_placeholder: "L'histoire apparaitra ici...",
        discover_btn: "Lancer une enquête approfondie",
        discover_title: "Rapport d'investigation",
        discover_loading: "Investigation en cours...",
        map_label: "Emplacement de la photo",
        analyzing: "Analyse en cours...",
        elaborating: "Traitement...",
        error_generic: "Erreur",
        gps_not_found: "GPS introuvable dans la photo",
        gps_fallback_text: "Vous pouvez continuer avec la position de l'appareil.",
        gps_fallback_btn: "Continuer avec la position de l'appareil",
        gps_detecting: "Detection GPS...",
        network_error: "Erreur reseau",
        using_fallback: "Utilisation de la position de l'appareil...",
        source_gps: "GPS de l'appareil",
        source_ip: "Base sur l'IP",
        sending_photo: "Envoi de la photo...",
        photo_location: "Emplacement de la photo",
        photo_taken_here: "Photo prise ici",
        file_not_available: "Fichier non disponible.",
        wait_geolocation: "Attendez la geolocalisation...",
        api_missing_title: "Configuration requise",
        api_missing_msg: "Les clés API ne sont pas configurées. Ouvrez le menu ⚙️ en haut à gauche pour les saisir ou les importer depuis un fichier .txt.",
        api_saved_ok: "Clés enregistrées.",
        api_only_android: "Fonction disponible uniquement dans l'application Android.",
        api_import_ok_prefix: "Importées ",
        api_import_ok_suffix: " clés :\n\n",
        api_import_ok_footer: "\n\nCliquez sur \"Enregistrer\" pour confirmer.",
        api_import_none: "Aucune clé trouvée dans le fichier.\n\nFormat requis :\nNOM_CLE=valeur",
        api_import_error: "Erreur d'analyse du fichier :\n",
        api_error_openfile: "Erreur d'ouverture du sélecteur : ",
        api_error_opencamera: "Erreur d'ouverture de l'appareil photo : ",
        api_keys: {
            title: "⚙️ Clés API",
            intro: "Saisissez vos clés API manuellement ou importez-les depuis un fichier <strong>.txt</strong>. Si un champ est vide, la clé par défaut sera utilisée.",
            import_btn: "📥 Importer depuis un fichier .txt",
            format_summary: "📄 Format du fichier .txt (cliquez pour ouvrir)",
            format_desc: "Le fichier doit être un texte simple avec une clé par ligne au format <code>NOM_CLE=valeur</code>. Exemple :",
            format_note: "• Les lignes commençant par <code>#</code> sont ignorées (commentaires).<br>• Les champs manquants restent inchangés.<br>• Reconnaissance automatique : <code>groq</code>, <code>geoapify</code>, <code>gemini</code>, <code>hf</code>/<code>hugging</code>, <code>openrouter</code>.",
            label_groq: "Clé API Groq",
            label_geoapify: "Clé API Geoapify",
            label_gemini: "Clé API Gemini",
            label_hf: "Jeton Hugging Face",
            label_openrouter: "Clé API OpenRouter",
            opt_gemini: "(optionnel — fallback vision)",
            opt_hf: "(optionnel)",
            opt_openrouter: "(optionnel — fallback texte)",
            get_groq: "Obtenez-la sur",
            get_geoapify: "Obtenez-la sur",
            get_gemini: "Obtenez-la sur",
            get_hf: "Obtenez-le sur",
            get_openrouter: "Obtenez-la sur",
            save: "Enregistrer",
            cancel: "Annuler",
        },
    },
    de: {
        subtitle: "Jedes Foto verbirgt eine Geschichte. Entdecke sie.",
        controls_title: "Foto aufnehmen oder ziehen",
        controls_title_android: "Foto aufnehmen oder auswaehlen",
        drop_text: "Foto hierher ziehen",
        drop_sub: "oder",
        file_label: "Vom Geraet waehlen",
        camera_label: "Foto aufnehmen",
        status_default: "Waehle oder ziehe ein Foto.",
        status_default_android: "Waehle ein Foto.",
        story_placeholder: "Die Geschichte erscheint hier...",
        discover_btn: "Tiefgehende Untersuchung starten",
        discover_title: "Ermittlungsbericht",
        discover_loading: "Untersuchung laeuft...",
        map_label: "Foto-Standort",
        analyzing: "Analyse laeuft...",
        elaborating: "Verarbeitung...",
        error_generic: "Fehler",
        gps_not_found: "GPS im Foto nicht gefunden",
        gps_fallback_text: "Du kannst mit dem Geraetestandort fortfahren.",
        gps_fallback_btn: "Mit Geraetestandort fortfahren",
        gps_detecting: "GPS wird erkannt...",
        network_error: "Netzwerkfehler",
        using_fallback: "Geraetestandort wird verwendet...",
        source_gps: "Geraete-GPS",
        source_ip: "IP-basiert",
        sending_photo: "Foto wird gesendet...",
        photo_location: "Foto-Standort",
        photo_taken_here: "Foto hier aufgenommen",
        file_not_available: "Datei nicht verfuegbar.",
        wait_geolocation: "Warte auf Geolokalisierung...",
        api_missing_title: "Konfiguration erforderlich",
        api_missing_msg: "Die API-Schlüssel sind nicht konfiguriert. Öffne das Menü ⚙️ oben links, um sie einzugeben oder aus einer .txt-Datei zu importieren.",
        api_saved_ok: "Schlüssel gespeichert.",
        api_only_android: "Funktion nur in der Android-App verfügbar.",
        api_import_ok_prefix: "Importiert ",
        api_import_ok_suffix: " Schlüssel:\n\n",
        api_import_ok_footer: "\n\nKlicke auf \"Speichern\", um zu bestätigen.",
        api_import_none: "Keine Schlüssel in der Datei gefunden.\n\nErforderliches Format:\nNAME_SCHLUESSEL=wert",
        api_import_error: "Fehler beim Parsen der Datei:\n",
        api_error_openfile: "Fehler beim Öffnen der Dateiauswahl: ",
        api_error_opencamera: "Fehler beim Öffnen der Kamera: ",
        api_keys: {
            title: "⚙️ API-Schlüssel",
            intro: "Gib deine API-Schlüssel manuell ein oder importiere sie aus einer <strong>.txt</strong>-Datei. Wenn ein Feld leer bleibt, wird der Standardschlüssel verwendet.",
            import_btn: "📥 Aus .txt-Datei importieren",
            format_summary: "📄 Format der .txt-Datei (zum Öffnen klicken)",
            format_desc: "Die Datei muss einfacher Text mit einem Schlüssel pro Zeile im Format <code>NAME_SCHLUESSEL=wert</code> sein. Beispiel:",
            format_note: "• Zeilen, die mit <code>#</code> beginnen, werden ignoriert (Kommentare).<br>• Fehlende Felder bleiben unverändert.<br>• Automatische Erkennung: <code>groq</code>, <code>geoapify</code>, <code>gemini</code>, <code>hf</code>/<code>hugging</code>, <code>openrouter</code>.",
            label_groq: "Groq API-Schlüssel",
            label_geoapify: "Geoapify API-Schlüssel",
            label_gemini: "Gemini API-Schlüssel",
            label_hf: "Hugging Face Token",
            label_openrouter: "OpenRouter API-Schlüssel",
            opt_gemini: "(optional — Vision-Fallback)",
            opt_hf: "(optional)",
            opt_openrouter: "(optional — Text-Fallback)",
            get_groq: "Erhalte es auf",
            get_geoapify: "Erhalte es auf",
            get_gemini: "Erhalte es auf",
            get_hf: "Erhalte es auf",
            get_openrouter: "Erhalte es auf",
            save: "Speichern",
            cancel: "Abbrechen",
        },
    },
    es: {
        subtitle: "Cada foto esconde una historia. Descúbrela.",
        controls_title: "Toma o arrastra una foto",
        controls_title_android: "Toma o elige una foto",
        drop_text: "Arrastra tu foto aqui",
        drop_sub: "o",
        file_label: "Elegir del dispositivo",
        camera_label: "Tomar foto",
        status_default: "Selecciona o arrastra una foto.",
        status_default_android: "Selecciona una foto.",
        story_placeholder: "La historia aparecera aqui...",
        discover_btn: "Iniciar investigación profunda",
        discover_title: "Informe de investigacion",
        discover_loading: "Investigacion en curso...",
        map_label: "Ubicacion de la foto",
        analyzing: "Analisis en curso...",
        elaborating: "Procesando...",
        error_generic: "Error",
        gps_not_found: "GPS no encontrado en la foto",
        gps_fallback_text: "Puedes continuar con la ubicacion del dispositivo.",
        gps_fallback_btn: "Continuar con la ubicacion del dispositivo",
        gps_detecting: "Detectando GPS...",
        network_error: "Error de red",
        using_fallback: "Usando ubicacion del dispositivo...",
        source_gps: "GPS del dispositivo",
        source_ip: "Basado en IP",
        sending_photo: "Enviando foto...",
        photo_location: "Ubicacion de la foto",
        photo_taken_here: "Foto tomada aqui",
        file_not_available: "Archivo no disponible.",
        wait_geolocation: "Espera la geolocalizacion...",
        api_missing_title: "Configuración requerida",
        api_missing_msg: "Las claves API no están configuradas. Abre el menú ⚙️ en la esquina superior izquierda para introducirlas o importarlas desde un archivo .txt.",
        api_saved_ok: "Claves guardadas.",
        api_only_android: "Función disponible solo en la app Android.",
        api_import_ok_prefix: "Importadas ",
        api_import_ok_suffix: " claves:\n\n",
        api_import_ok_footer: "\n\nHaz clic en \"Guardar\" para confirmar.",
        api_import_none: "No se encontraron claves en el archivo.\n\nFormato requerido:\nNOMBRE_CLAVE=valor",
        api_import_error: "Error al analizar el archivo:\n",
        api_error_openfile: "Error al abrir el selector de archivos: ",
        api_error_opencamera: "Error al abrir la cámara: ",
        api_keys: {
            title: "⚙️ Claves API",
            intro: "Introduce tus claves API manualmente o impórtalas desde un archivo <strong>.txt</strong>. Si dejas un campo vacío, se usará la clave predeterminada.",
            import_btn: "📥 Importar desde archivo .txt",
            format_summary: "📄 Formato del archivo .txt (clic para abrir)",
            format_desc: "El archivo debe ser texto simple con una clave por línea en el formato <code>NOMBRE_CLAVE=valor</code>. Ejemplo:",
            format_note: "• Las líneas que comienzan con <code>#</code> se ignoran (comentarios).<br>• Los campos faltantes permanecen sin cambios.<br>• Reconocimiento automático: <code>groq</code>, <code>geoapify</code>, <code>gemini</code>, <code>hf</code>/<code>hugging</code>, <code>openrouter</code>.",
            label_groq: "Clave API Groq",
            label_geoapify: "Clave API Geoapify",
            label_gemini: "Clave API Gemini",
            label_hf: "Token Hugging Face",
            label_openrouter: "Clave API OpenRouter",
            opt_gemini: "(opcional — fallback vision)",
            opt_hf: "(opcional)",
            opt_openrouter: "(opcional — fallback texto)",
            get_groq: "Obténla en",
            get_geoapify: "Obténla en",
            get_gemini: "Obténla en",
            get_hf: "Obténlo en",
            get_openrouter: "Obténla en",
            save: "Guardar",
            cancel: "Cancelar",
        },
    },
    pt: {
        subtitle: "Cada foto esconde uma história. Descobre-a.",
        controls_title: "Tire ou arraste uma foto",
        controls_title_android: "Tire ou escolha uma foto",
        drop_text: "Arraste a sua foto aqui",
        drop_sub: "ou",
        file_label: "Escolher do dispositivo",
        camera_label: "Tirar foto",
        status_default: "Selecione ou arraste uma foto.",
        status_default_android: "Selecione uma foto.",
        story_placeholder: "A historia aparecera aqui...",
        discover_btn: "Iniciar investigação profunda",
        discover_title: "Relatorio de investigacao",
        discover_loading: "Investigacao em curso...",
        map_label: "Localizacao da foto",
        analyzing: "Analise em curso...",
        elaborating: "A processar...",
        error_generic: "Erro",
        gps_not_found: "GPS nao encontrado na foto",
        gps_fallback_text: "Pode continuar com a localizacao do dispositivo.",
        gps_fallback_btn: "Continuar com a localizacao do dispositivo",
        gps_detecting: "A detetar GPS...",
        network_error: "Erro de rede",
        using_fallback: "A usar localizacao do dispositivo...",
        source_gps: "GPS do dispositivo",
        source_ip: "Baseado em IP",
        sending_photo: "A enviar foto...",
        photo_location: "Localizacao da foto",
        photo_taken_here: "Foto tirada aqui",
        file_not_available: "Ficheiro nao disponivel.",
        wait_geolocation: "Aguarde a geolocalizacao...",
        api_missing_title: "Configuração necessária",
        api_missing_msg: "As chaves API não estão configuradas. Abre o menu ⚙️ no canto superior esquerdo para as inserir ou importar de um ficheiro .txt.",
        api_saved_ok: "Chaves guardadas.",
        api_only_android: "Função disponível apenas na app Android.",
        api_import_ok_prefix: "Importadas ",
        api_import_ok_suffix: " chaves:\n\n",
        api_import_ok_footer: "\n\nClica em \"Guardar\" para confirmar.",
        api_import_none: "Nenhuma chave encontrada no ficheiro.\n\nFormato necessário:\nNOME_CHAVE=valor",
        api_import_error: "Erro ao analisar o ficheiro:\n",
        api_error_openfile: "Erro ao abrir o seletor de ficheiros: ",
        api_error_opencamera: "Erro ao abrir a câmara: ",
        api_keys: {
            title: "⚙️ Chaves API",
            intro: "Introduz as tuas chaves API manualmente ou importa-as de um ficheiro <strong>.txt</strong>. Se deixares um campo vazio, será usada a chave predefinida.",
            import_btn: "📥 Importar de ficheiro .txt",
            format_summary: "📄 Formato do ficheiro .txt (clica para abrir)",
            format_desc: "O ficheiro deve ser texto simples com uma chave por linha no formato <code>NOME_CHAVE=valor</code>. Exemplo:",
            format_note: "• Linhas que começam com <code>#</code> são ignoradas (comentários).<br>• Campos em falta permanecem inalterados.<br>• Reconhecimento automático: <code>groq</code>, <code>geoapify</code>, <code>gemini</code>, <code>hf</code>/<code>hugging</code>, <code>openrouter</code>.",
            label_groq: "Chave API Groq",
            label_geoapify: "Chave API Geoapify",
            label_gemini: "Chave API Gemini",
            label_hf: "Token Hugging Face",
            label_openrouter: "Chave API OpenRouter",
            opt_gemini: "(opcional — fallback vision)",
            opt_hf: "(opcional)",
            opt_openrouter: "(opcional — fallback texto)",
            get_groq: "Obtém em",
            get_geoapify: "Obtém em",
            get_gemini: "Obtém em",
            get_hf: "Obtém em",
            get_openrouter: "Obtém em",
            save: "Guardar",
            cancel: "Cancelar",
        },
    },
    nl: {
        subtitle: "Elke foto verbergt een verhaal. Ontdek het.",
        controls_title: "Maak of sleep een foto",
        controls_title_android: "Maak of kies een foto",
        drop_text: "Sleep je foto hierheen",
        drop_sub: "of",
        file_label: "Kies van apparaat",
        camera_label: "Foto maken",
        status_default: "Selecteer of sleep een foto.",
        status_default_android: "Selecteer een foto.",
        story_placeholder: "Het verhaal verschijnt hier...",
        discover_btn: "Start diepgaand onderzoek",
        discover_title: "Onderzoeksrapport",
        discover_loading: "Onderzoek bezig...",
        map_label: "Fotolocatie",
        analyzing: "Analyse bezig...",
        elaborating: "Verwerken...",
        error_generic: "Fout",
        gps_not_found: "GPS niet gevonden in foto",
        gps_fallback_text: "Je kunt doorgaan met de locatie van het apparaat.",
        gps_fallback_btn: "Doorgaan met apparaatlocatie",
        gps_detecting: "GPS detecteren...",
        network_error: "Netwerkfout",
        using_fallback: "Apparaatlocatie wordt gebruikt...",
        source_gps: "Apparaat-GPS",
        source_ip: "IP-gebaseerd",
        sending_photo: "Foto naar server sturen...",
        photo_location: "Fotolocatie",
        photo_taken_here: "Foto hier genomen",
        file_not_available: "Bestand niet beschikbaar.",
        wait_geolocation: "Wacht op geolocatie...",
        api_missing_title: "Configuratie vereist",
        api_missing_msg: "De API-sleutels zijn niet geconfigureerd. Open het ⚙️-menu linksboven om ze in te voeren of te importeren uit een .txt-bestand.",
        api_saved_ok: "Sleutels opgeslagen.",
        api_only_android: "Functie alleen beschikbaar in de Android-app.",
        api_import_ok_prefix: "Geïmporteerd ",
        api_import_ok_suffix: " sleutels:\n\n",
        api_import_ok_footer: "\n\nKlik op \"Opslaan\" om te bevestigen.",
        api_import_none: "Geen sleutels gevonden in het bestand.\n\nVereist formaat:\nNAAM_SLEUTEL=waarde",
        api_import_error: "Fout bij het parseren van het bestand:\n",
        api_error_openfile: "Fout bij openen bestandskiezer: ",
        api_error_opencamera: "Fout bij openen camera: ",
        api_keys: {
            title: "⚙️ API-sleutels",
            intro: "Voer je API-sleutels handmatig in of importeer ze uit een <strong>.txt</strong>-bestand. Als een veld leeg blijft, wordt de standaardsleutel gebruikt.",
            import_btn: "📥 Importeren uit .txt-bestand",
            format_summary: "📄 Formaat van het .txt-bestand (klik om te openen)",
            format_desc: "Het bestand moet platte tekst zijn met één sleutel per regel in het formaat <code>NAAM_SLEUTEL=waarde</code>. Voorbeeld:",
            format_note: "• Regels die beginnen met <code>#</code> worden genegeerd (opmerkingen).<br>• Ontbrekende velden blijven ongewijzigd.<br>• Automatische herkenning: <code>groq</code>, <code>geoapify</code>, <code>gemini</code>, <code>hf</code>/<code>hugging</code>, <code>openrouter</code>.",
            label_groq: "Groq API-sleutel",
            label_geoapify: "Geoapify API-sleutel",
            label_gemini: "Gemini API-sleutel",
            label_hf: "Hugging Face Token",
            label_openrouter: "OpenRouter API-sleutel",
            opt_gemini: "(optioneel — vision fallback)",
            opt_hf: "(optioneel)",
            opt_openrouter: "(optioneel — tekst fallback)",
            get_groq: "Verkrijg het op",
            get_geoapify: "Verkrijg het op",
            get_gemini: "Verkrijg het op",
            get_hf: "Verkrijg het op",
            get_openrouter: "Verkrijg het op",
            save: "Opslaan",
            cancel: "Annuleren",
        },
    },
};

var FLAGS = { it: "🇮🇹", en: "🇬🇧", fr: "🇫🇷", de: "🇩🇪", es: "🇪🇸", pt: "🇵🇹", nl: "🇳🇱" };

// ============================================================
// I18N - Funzioni di supporto
// ============================================================
function getLang() {
    if (window._currentLang && I18N[window._currentLang]) return window._currentLang;
    var stored = localStorage.getItem("echoes_lang");
    if (stored && I18N[stored]) return stored;
    var browser = (navigator.language || "en").toLowerCase().split("-")[0];
    if (I18N[browser]) return browser;
    return "en";
}

function isAndroid() {
    return typeof Android !== 'undefined';
}

function setLang(code, isAutoDetected) {
    if (!I18N[code]) code = "en";
    if (!isAutoDetected) {
        try { localStorage.setItem("echoes_lang", code); } catch (e) {}
    }
    applyTranslations(code);
    var flagEl = document.getElementById("lang-flag");
    if (flagEl) flagEl.textContent = FLAGS[code] || "🌐";
    var codeEl = document.getElementById("lang-code");
    if (codeEl) codeEl.textContent = code.toUpperCase();
    var menuEl = document.getElementById("lang-menu");
    if (menuEl) menuEl.classList.remove("open");
    var opts = document.querySelectorAll(".lang-option");
    for (var i = 0; i < opts.length; i++) {
        if (opts[i].dataset.lang === code) {
            opts[i].classList.add("active");
        } else {
            opts[i].classList.remove("active");
        }
    }
    window._currentLang = code;
}

function t(key) {
    var lang = getLang();
    var dict = I18N[lang] || I18N.en;
    return dict[key] || (I18N.en[key] || key);
}

function applyTranslations(code) {
    var lang = code || getLang();
    var dict = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;

    function setEl(id, value) {
        var el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    setEl("app-subtitle", dict.subtitle);

    var ctrlTitle = document.getElementById("controls-title");
    if (ctrlTitle) {
        ctrlTitle.textContent = isAndroid() && dict.controls_title_android
            ? dict.controls_title_android
            : dict.controls_title;
    }

    setEl("drop-text", dict.drop_text);
    setEl("drop-sub", dict.drop_sub);

    var fl = document.getElementById("file-label-btn");
    if (fl) fl.textContent = "📁 " + dict.file_label;
    var cb = document.getElementById("camera-btn");
    if (cb) cb.textContent = "📷 " + (dict.camera_label || dict.file_label);

    setEl("story-text", dict.story_placeholder);
    setEl("discover-btn", dict.discover_btn);
    setEl("discover-title", dict.discover_title);
    setEl("map-label", dict.map_label);

    var statusEl = document.getElementById("status-text");
    if (statusEl) {
        var currentStatus = (statusEl.textContent || "").trim();
        var isDefault = false;
        for (var k in I18N) {
            if (I18N[k].status_default === currentStatus ||
                I18N[k].status_default_android === currentStatus) {
                isDefault = true;
                break;
            }
        }
        if (isDefault || currentStatus === "") {
            statusEl.textContent = isAndroid() && dict.status_default_android
                ? dict.status_default_android
                : dict.status_default;
        }
    }

    var loadingText = document.querySelector("#discover-loading p");
    if (loadingText) loadingText.textContent = dict.discover_loading;

    var fbBtn = document.getElementById("use-browser-loc-btn");
    if (fbBtn) fbBtn.textContent = dict.gps_fallback_btn;

    if (dict.api_keys) {
        applyApiKeysTranslations(dict);
    }
}

function applyApiKeysTranslations(dict) {
    var apiDict = dict.api_keys;
    if (!apiDict) return;

    var titleEl = document.querySelector("#api-modal .api-modal-header h2");
    if (titleEl) titleEl.textContent = apiDict.title;

    var introEl = document.querySelector("#api-modal .api-intro");
    if (introEl) introEl.innerHTML = apiDict.intro;

    var importBtn = document.getElementById("api-import-btn");
    if (importBtn) importBtn.textContent = apiDict.import_btn;

    var summaryEl = document.querySelector("#api-modal .api-format-help summary");
    if (summaryEl) summaryEl.textContent = apiDict.format_summary;

    var formatDescEl = document.querySelector("#api-modal .api-format-help .api-format-desc");
    if (formatDescEl) formatDescEl.innerHTML = apiDict.format_desc;

    var noteEl = document.querySelector("#api-modal .api-format-note");
    if (noteEl) noteEl.innerHTML = apiDict.format_note;

    var labelsMap = {
        "api-groq": apiDict.label_groq,
        "api-geoapify": apiDict.label_geoapify,
        "api-gemini": apiDict.label_gemini,
        "api-hf": apiDict.label_hf,
        "api-openrouter": apiDict.label_openrouter,
    };
    var optMap = {
        "api-gemini": apiDict.opt_gemini,
        "api-hf": apiDict.opt_hf,
        "api-openrouter": apiDict.opt_openrouter,
    };
    var getMap = {
        "api-groq": apiDict.get_groq,
        "api-geoapify": apiDict.get_geoapify,
        "api-gemini": apiDict.get_gemini,
        "api-hf": apiDict.get_hf,
        "api-openrouter": apiDict.get_openrouter,
    };

    Object.keys(labelsMap).forEach(function(id) {
        var field = document.getElementById(id);
        if (!field) return;
        var fieldContainer = field.closest('.api-field');
        if (!fieldContainer) return;

        var labelEl = fieldContainer.querySelector('label');
        if (labelEl) {
            var optText = optMap[id] ? ' <span class="api-optional">' + optMap[id] + '</span>' : '';
            var reqText = !optMap[id] ? ' <span class="api-required">*</span>' : '';
            labelEl.innerHTML = labelsMap[id] + reqText + optText;
        }

        var smallEl = fieldContainer.querySelector('small');
        if (smallEl && getMap[id]) {
            var link = smallEl.querySelector('a');
            if (link) {
                smallEl.innerHTML = getMap[id] + ' <a href="' + link.href + '" target="_blank">' + link.textContent + '</a>';
            }
        }
    });

    var saveBtn = document.getElementById("api-save");
    if (saveBtn) saveBtn.textContent = apiDict.save;
    var cancelBtn = document.getElementById("api-cancel");
    if (cancelBtn) cancelBtn.textContent = apiDict.cancel;
}

// ============================================================
// INIT — su DOMContentLoaded
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
    if (isAndroid()) {
        document.body.classList.add('android-app');
    }

    var langBtn = document.getElementById("lang-btn");
    var langMenu = document.getElementById("lang-menu");
    if (langBtn && langMenu) {
        langBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            langMenu.classList.toggle("open");
        });
        document.addEventListener("click", function() {
            langMenu.classList.remove("open");
        });
    }

    document.querySelectorAll(".lang-option").forEach(function(el) {
        el.addEventListener("click", function(e) {
            e.stopPropagation();
            var lang = el.getAttribute("data-lang");
            if (lang) setLang(lang);
        });
    });

    setLang(getLang(), true);

    var statusInit = document.getElementById("status-text");
    if (statusInit) {
        var lang0 = getLang();
        statusInit.textContent = isAndroid() && I18N[lang0].status_default_android
            ? I18N[lang0].status_default_android
            : I18N[lang0].status_default;
    }

    var btn = document.getElementById("discover-btn");
    if (btn) btn.addEventListener('click', avviaDiscover);

    checkApiKeysAtStartup();
});

// ============================================================
// CONTROLLO API KEY ALL'AVVIO
// ============================================================
function checkApiKeysAtStartup() {
    if (!isAndroid() || !Android.getApiKeys) return;
    try {
        var keys = JSON.parse(Android.getApiKeys());
        var missing = [];
        if (!keys.groq) missing.push("Groq");
        if (!keys.geoapify) missing.push("Geoapify");
        if (missing.length > 0) {
            var dict = I18N[getLang()] || I18N.en;
            setTimeout(function() {
                alert("⚠️ " + dict.api_missing_title + "\n\n" + dict.api_missing_msg + "\n\n• " + missing.join("\n• "));
            }, 800);
        }
    } catch (e) {
        console.error('Errore checkApiKeysAtStartup:', e);
    }
}

// ============================================================
// MAPPA (Leaflet)
// ============================================================
var map = L.map('map').setView([42.1116, 14.7083], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var markers = [];
var currentLat = null;
var currentLng = null;
var selectedPlace = null;
var gpsMarker = null;
var photoMarker = null;
var pollInterval = null;
var lastDiscoverData = null;
var lastLogIndex = 0;

function aggiornaGpsMarker(lat, lng) {
    if (gpsMarker) map.removeLayer(gpsMarker);
    gpsMarker = L.circleMarker([lat, lng], {
        radius: 6, color: '#2e6b2e', fillColor: '#4caf50', fillOpacity: 0.7
    }).addTo(map);
}

function mostraMappaFoto(lat, lng) {
    document.getElementById('map-container').classList.add('visible');
    if (photoMarker) map.removeLayer(photoMarker);
    photoMarker = L.marker([lat, lng], {
        icon: L.divIcon({
            className: 'custom-photo-marker',
            html: '<div style="background:#d32f2f;width:22px;height:22px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>',
            iconSize: [22, 22], iconAnchor: [11, 11]
        })
    }).addTo(map);
    photoMarker.bindPopup('<b>' + t("photo_taken_here") + '</b><br>' + lat.toFixed(5) + ', ' + lng.toFixed(5)).openPopup();
    map.setView([lat, lng], 15);
    setTimeout(function() { map.invalidateSize(); }, 100);
}

function caricaLuoghi(lat, lng) {
    fetch('/api/places?lat=' + lat + '&lng=' + lng + '&radius=5000&lang=' + getLang())
        .then(function(res) { return res.json(); })
        .then(function(data) {
            markers.forEach(function(m) { map.removeLayer(m); });
            markers = [];
            var places = data.places || [];
            places.forEach(function(place) {
                var marker = L.marker([place.lat, place.lng]).addTo(map);
                marker.bindPopup('<b>' + place.name + '</b><br>' + place.distanza_km + ' km');
                marker.on('click', function() {
                    selectedPlace = place;
                });
                markers.push(marker);
            });
        })
        .catch(function(err) { console.error('Errore luoghi:', err); });
}

// ============================================================
// GEOLOCALIZZAZIONE
// ============================================================
var geoOptions = { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 };
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        function(pos) {
            currentLat = pos.coords.latitude;
            currentLng = pos.coords.longitude;
            aggiornaGpsMarker(currentLat, currentLng);
            caricaLuoghi(currentLat, currentLng);
        },
        function(err) {
            console.warn('[Geoloc] Errore:', err.message);
            currentLat = 42.1116;
            currentLng = 14.7083;
        },
        geoOptions
    );
} else {
    currentLat = 42.1116;
    currentLng = 14.7083;
}

// ============================================================
// MINI LOG
// ============================================================
function showMiniLog() {
    var el = document.getElementById('mini-log');
    if (el) {
        el.style.display = 'block';
        el.classList.remove('error', 'done');
    }
    var content = document.getElementById('mini-log-content');
    if (content) content.innerHTML = '';
    lastLogIndex = 0;
}

function setMiniLogState(state) {
    var el = document.getElementById('mini-log');
    if (!el) return;
    el.classList.remove('error', 'done');
    if (state) el.classList.add(state);
}

function addMiniLog(text, cls) {
    var content = document.getElementById('mini-log-content');
    if (!content) return;
    var div = document.createElement('div');
    div.className = 'log-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    content.appendChild(div);
    var box = document.getElementById('mini-log');
    setTimeout(function() { box.scrollTop = box.scrollHeight; }, 10);
}

// ============================================================
// DRAG & DROP + VALIDAZIONE FILE
// ============================================================
var dropZone = document.getElementById('drop-zone');
var fileInput = document.getElementById('photo-input');
var preview = document.getElementById('preview');

var ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tif", ".tiff", ".heic", ".heif"];
var MAX_FILE_SIZE_MB = 120;

function humanSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

if (dropZone) {
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault(); e.stopPropagation();
        dropZone.classList.remove('dragover');
        var files = e.dataTransfer.files;
        if (!files || files.length === 0) return;
        var file = files[0];
        var sizeMb = file.size / (1024 * 1024);
        if (sizeMb > MAX_FILE_SIZE_MB) {
            alert("File troppo grande: " + humanSize(file.size));
            return;
        }
        handleFile(file);
    });
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');
    });
}

// ============================================================
// ANDROID — File pronto
// ============================================================
window.onFileReadyFromAndroid = function(filename, mimeType, exifFilename) {
    var fetchFile = fetch('/' + filename).then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.blob();
    });

    var fetchExif = (exifFilename && exifFilename.length > 0)
        ? fetch('/' + exifFilename).then(function(res) {
            if (!res.ok) return {};
            return res.json();
          }).catch(function() { return {}; })
        : Promise.resolve({});

    Promise.all([fetchFile, fetchExif])
        .then(function(results) {
            var blob = results[0];
            var exif = results[1];
            var file = new File([blob], filename, { type: mimeType });
            window._currentExif = exif;
            handleFile(file);
        })
        .catch(function(err) {
            console.error('[DEBUG] Errore fetch pending file:', err);
            alert('Errore caricamento foto: ' + err.message);
        });
};

// ============================================================
// ANDROID — Click handlers
// ============================================================
var fileLabelBtn = document.getElementById('file-label-btn');
if (fileLabelBtn) {
    fileLabelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isAndroid() && Android.openFileChooser) {
            try { Android.openFileChooser(); }
            catch (err) {
                var d = I18N[getLang()] || I18N.en;
                alert(d.api_error_openfile + err.message);
            }
        } else {
            fileInput.click();
        }
    });
}

var cameraBtn = document.getElementById('camera-btn');
if (cameraBtn) {
    cameraBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isAndroid() && Android.openCamera) {
            try { Android.openCamera(); }
            catch (err) {
                var d = I18N[getLang()] || I18N.en;
                alert(d.api_error_opencamera + err.message);
            }
        } else {
            fileInput.setAttribute('capture', 'environment');
            fileInput.click();
        }
    });
}

if (dropZone) {
    dropZone.addEventListener('click', function(e) {
        var fBtn = document.getElementById('file-label-btn');
        var cBtn = document.getElementById('camera-btn');
        if ((fBtn && (e.target === fBtn || fBtn.contains(e.target))) ||
            (cBtn && (e.target === cBtn || cBtn.contains(e.target)))) {
            return;
        }
        e.preventDefault();
        if (isAndroid() && Android.openFileChooser) {
            try { Android.openFileChooser(); }
            catch (err) {
                var d = I18N[getLang()] || I18N.en;
                alert(d.api_error_openfile + err.message);
            }
        } else {
            fileInput.click();
        }
    });
}

if (fileInput) {
    fileInput.addEventListener('change', function(e) {
        if (!e.target.files || e.target.files.length === 0) return;
        var file = e.target.files[0];
        var sizeMb = file.size / (1024 * 1024);
        if (sizeMb > MAX_FILE_SIZE_MB) {
            alert("File troppo grande");
            fileInput.value = "";
            return;
        }
        handleFile(file);
    });
}

// ============================================================
// HANDLE FILE
// ============================================================
function handleFile(file) {
    window._currentFile = file;
    var reader = new FileReader();
    reader.onload = function(ev) {
        if (preview) {
            preview.src = ev.target.result;
            preview.style.display = 'block';
            preview.onclick = function() { openLightbox(ev.target.result); };
        }
    };
    reader.readAsDataURL(file);
    if (!currentLat || !currentLng) { alert(t("wait_geolocation")); return; }
    generaStoria(file);
}

// ============================================================
// GENERAZIONE STORIA
// ============================================================
function generaStoria(file, useBrowserLocation) {
    var fileToSend = file || window._currentFile || (fileInput.files && fileInput.files[0]);
    if (!fileToSend) return;

    if (isAndroid() && Android.getApiKeys) {
        try {
            var keys = JSON.parse(Android.getApiKeys());
            if (!keys.groq || !keys.geoapify) {
                var dict = I18N[getLang()] || I18N.en;
                alert("⚠️ " + dict.api_missing_title + "\n\n" + dict.api_missing_msg);
                return;
            }
        } catch (e) {
            console.error('Errore check API keys:', e);
        }
    }

    var mapContainer = document.getElementById('map-container');
    if (mapContainer) mapContainer.classList.remove('visible');
    var storyText = document.getElementById('story-text');
    if (storyText) storyText.textContent = t("elaborating");
    var statusText = document.getElementById('status-text');
    if (statusText) statusText.textContent = t("analyzing");
    var coordsText = document.getElementById('coords-text');
    if (coordsText) coordsText.textContent = '';

    if (pollInterval) { clearInterval(pollInterval); pollInterval = null; }

    showMiniLog();
    addMiniLog(t("sending_photo"));

    var formData = new FormData();
    formData.append('image', fileToSend);
    formData.append('browser_lat', currentLat);
    formData.append('browser_lng', currentLng);
    formData.append('use_browser_location', useBrowserLocation ? 'true' : 'false');
    formData.append('lang', getLang());

    if (window._currentExif && Object.keys(window._currentExif).length > 0) {
        formData.append('exif_override', JSON.stringify(window._currentExif));
    }

    fetch('/api/story', { method: 'POST', body: formData })
    .then(function(res) {
        return res.json().then(function(data) {
            data._status = res.status;
            return data;
        }).catch(function() {
            return { error: 'HTTP ' + res.status };
        });
    })
    .then(function(data) {
        if (data.error) {
            setMiniLogState('error');
            addMiniLog('ERRORE: ' + data.error, 'error');
            return;
        }
        var taskId = data.task_id;
        lastLogIndex = 0;

        pollInterval = setInterval(function() {
            fetch('/api/story/status/' + taskId)
                .then(function(r) { return r.json(); })
                .then(function(task) {
                    if (task.log && task.log.length > lastLogIndex) {
                        for (var i = lastLogIndex; i < task.log.length; i++) {
                            var msg = task.log[i];
                            var cls = '';
                            if (msg.indexOf('ERRORE') === 0) cls = 'error';
                            else if (msg.indexOf('Analisi completata') === 0) cls = 'done';
                            addMiniLog(msg, cls);
                        }
                        lastLogIndex = task.log.length;
                    }

                    if (task.done) {
                        clearInterval(pollInterval); pollInterval = null;
                        if (task.error) {
                            setMiniLogState('error');
                            var st = document.getElementById('status-text');
                            if (task.error_type === 'no_exif_gps') {
                                if (st) st.textContent = t("gps_not_found");
                                var sText = document.getElementById('story-text');
                                if (sText) {
                                    sText.innerHTML =
                                        '<p style="color:#c62828;font-weight:600;">' + task.error + '</p>' +
                                        '<p style="color:#666;font-size:0.95em;margin-top:12px;">' + t("gps_fallback_text") + '</p>' +
                                        '<button id="use-browser-loc-btn">' + t("gps_fallback_btn") + '</button>';
                                    var btn2 = document.getElementById('use-browser-loc-btn');
                                    if (btn2) {
                                        btn2.addEventListener('click', function() {
                                            if (window._currentFile) {
                                                generaStoria(window._currentFile, true);
                                            }
                                        });
                                    }
                                }
                            } else {
                                if (st) st.textContent = t("error_generic");
                            }
                            return;
                        }

                        setMiniLogState('done');
                        var result = task.result;
                        if (result && result.storia) {
                            var srcLabel = result.gps_source === 'exif' ? 'GPS (EXIF)' : t("source_gps");
                            if (st) st.textContent = t("photo_location") + ': ' + result.luogo + ' | ' + srcLabel;
                            if (coordsText) coordsText.textContent = 'Coordinates: ' + result.lat + ', ' + result.lng;
                            mostraMappaFoto(result.lat, result.lng);
                            if (storyText) storyText.innerHTML = formatStory(result.storia);

                            lastDiscoverData = {
                                lat: result.lat, lng: result.lng,
                                soggetto: result.soggetto || '',
                                luogo: result.luogo || '',
                                lang: result.lang || 'en',
                                metadata: result.metadata || null,
                                astronomical: result.astronomical || null
                            };
                            var dw = document.getElementById('discover-wrapper');
                            if (dw) dw.style.display = 'block';
                            var dc = document.getElementById('discover-container');
                            if (dc) dc.style.display = 'none';
                        }
                    }
                })
                .catch(function(err) { console.error('Errore polling:', err); });
        }, 400);
    })
    .catch(function(err) {
        setMiniLogState('error');
        addMiniLog('ERRORE: ' + err, 'error');
    });
}

// ============================================================
// FORMATTAZIONE STORIA
// ============================================================
function formatStory(text) {
    var html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Converti i <br> (che il LLM genera come HTML) in veri tag HTML
    html = html.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
    html = html.replace(/&lt;BR\s*\/?&gt;/gi, '<br>');
    html = html.replace(/(https?:\/\/[^\s\)\]]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    html = html.replace(/^\*\*([^*\n]+):\*\*\s*$/gm, '@@H3@@$1:@@H3@@');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    var blocks = html.split(/\n\s*\n/);
    var out = [];
    blocks.forEach(function(block) {
        block = block.trim();
        if (!block) return;
        var titoloMatch = block.match(/^@@H3@@([^@]+):@@H3@@\s*$/);
        if (titoloMatch) { out.push('<h3>' + titoloMatch[1] + ':</h3>'); return; }
        var titoloInTesta = block.match(/^@@H3@@([^@]+):@@H3@@\s*\n([\s\S]+)$/);
        if (titoloInTesta) {
            out.push('<h3>' + titoloInTesta[1] + ':</h3>');
            var resto = titoloInTesta[2];
            if (resto.indexOf('\n- ') !== -1 || resto.indexOf('- ') === 0) {
                out.push('<ul>' + parseLista(resto) + '</ul>');
            } else {
                out.push('<p>' + resto.replace(/\n/g, '<br>') + '</p>');
            }
            return;
        }
        if (block.indexOf('\n- ') !== -1 || block.indexOf('- ') === 0) {
            out.push('<ul>' + parseLista(block) + '</ul>');
            return;
        }
        out.push('<p>' + block.replace(/\n/g, '<br>') + '</p>');
    });
    return out.join('\n');
}

function parseLista(text) {
    var lines = text.split('\n');
    var items = [];
    var current = null;
    lines.forEach(function(line) {
        if (line.trim().indexOf('- ') === 0) {
            if (current !== null) items.push(current);
            current = line.trim().substring(2);
        } else if (current !== null) {
            current += ' ' + line.trim();
        } else if (line.trim()) {
            items.push(line.trim());
        }
    });
    if (current !== null) items.push(current);
    return items.map(function(i) { return '<li>' + i + '</li>'; }).join('');
}

// ============================================================
// FORMATTAZIONE REPORT INVESTIGATIVO (sezioni numerate collassabili)
// ============================================================
function formatDiscoverReport(text) {
    // 1. Escape HTML e link
    var html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
    html = html.replace(/(https?:\/\/[^\s\)\]<>]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

    // 2. Split sul pattern "**N. Titolo**" (numero + punto + titolo)
    //    La regex fa lookahead: divide prima di ogni "**N. Titolo**"
    var parts = html.split(/(?=\*\*\s*\d+[\.\)]\s*[^*]+?\*\*)/);

    var sections = [];
    var current = null;

    function newSection(title) {
        current = { title: title.trim(), content: [] };
        sections.push(current);
    }

    parts.forEach(function(part) {
        if (!part.trim()) return;

        // Cerca "**N. Titolo**" all'inizio della parte
        var m = part.match(/^\*\*\s*(\d+[\.\)]\s*[^*]+?)\s*\*\*\s*[-—–:]*\s*/);
        if (m) {
            newSection(m[1]);
            var rest = part.substring(m[0].length).trim();
            // Rimuovi separatori residui (---, ##)
            rest = rest.replace(/^[-_=]{3,}\s*/, '').replace(/^#+\s*/, '');
            if (rest) current.content.push(rest);
        } else {
            // Contenuto prima della prima sezione numerata
            if (!current) newSection('Report');
            current.content.push(part.trim());
        }
    });

    // Fallback: nessuna sezione numerata trovata
    if (sections.length === 0) {
        newSection('Report');
        current.content.push(html.trim());
    }

    // 3. Renderizza le sezioni
    var out = [];
    sections.forEach(function(sec, idx) {
        var sid = 'rsec-' + idx + '-' + Math.random().toString(36).slice(2, 7);
        out.push('<div class="report-section" id="' + sid + '">');
        out.push('<h3 class="report-section-title" data-target="' + sid + '">' + sec.title + '</h3>');
        out.push('<div class="report-section-content">');

        var contentText = sec.content.join('\n\n');

        // Bold
        contentText = contentText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Processa riga per riga
        var lines = contentText.split('\n');
        var htmlLines = [];

        lines.forEach(function(line) {
            line = line.trim();
            if (!line) {
                htmlLines.push('<br>');
                return;
            }
            // Separatore ---
            if (/^[-_=]{3,}$/.test(line)) {
                htmlLines.push('<hr class="report-hr">');
                return;
            }
            // List item (con - * •)
            if (/^[-*•]\s+/.test(line)) {
                htmlLines.push('<div class="report-list-item">' + line.replace(/^[-*•]\s+/, '') + '</div>');
                return;
            }
            // Riga tabella markdown (contiene |)
            if (/^\|/.test(line)) {
                htmlLines.push('<div class="report-table-row">' + line + '</div>');
                return;
            }
            // Riga normale
            htmlLines.push('<div class="report-line">' + line + '</div>');
        });

        out.push(htmlLines.join(''));
        out.push('</div></div>');
    });

    // 4. Click handler per collassare/espandere
    setTimeout(function() {
        var titles = document.querySelectorAll('#discover-result .report-section-title');
        titles.forEach(function(title) {
            title.addEventListener('click', function() {
                var sid = title.getAttribute('data-target');
                var sec = document.getElementById(sid);
                if (sec) sec.classList.toggle('collapsed');
            });
        });
    }, 60);

    return out.join('\n');
}

// ============================================================
// LIGHTBOX
// ============================================================
function openLightbox(src) {
    var img = document.getElementById('lightbox-img');
    if (img) img.src = src;
    var lb = document.getElementById('lightbox');
    if (lb) lb.classList.add('active');
}
function closeLightbox() {
    var lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
}
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });

// ============================================================
// SCOPRI FATTI
// ============================================================
function avviaDiscover() {
    if (!lastDiscoverData) return;
    var btn = document.getElementById('discover-btn');
    var container = document.getElementById('discover-container');
    var loading = document.getElementById('discover-loading');
    var result = document.getElementById('discover-result');

    btn.disabled = true;
    btn.textContent = t("discover_loading");
    container.style.display = 'block';
    loading.style.display = 'block';
    result.innerHTML = '';

    var formData = new FormData();
    formData.append('lat', lastDiscoverData.lat);
    formData.append('lng', lastDiscoverData.lng);
    formData.append('soggetto', lastDiscoverData.soggetto);
    formData.append('luogo', lastDiscoverData.luogo);
    formData.append('lang', getLang());
    if (lastDiscoverData.metadata) {
        formData.append('metadata', JSON.stringify(lastDiscoverData.metadata));
    }
    if (lastDiscoverData.astronomical) {
        formData.append('astronomical', JSON.stringify(lastDiscoverData.astronomical));
    }

    fetch('/api/discover', { method: 'POST', body: formData })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            loading.style.display = 'none';
            btn.disabled = false;
            btn.textContent = t("discover_btn");
            if (data.errore) {
                result.innerHTML = '<p style="color:#ff6b6b;">Error: ' + data.errore + '</p>';
                return;
            }
            result.innerHTML = formatDiscoverReport(data.report || '');
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(function(err) {
            loading.style.display = 'none';
            btn.disabled = false;
            btn.textContent = t("discover_btn");
            result.innerHTML = '<p style="color:#ff6b6b;">' + t("network_error") + ': ' + err.message + '</p>';
        });
}

// ============================================================
// API KEYS SETTINGS MODAL
// ============================================================
(function() {
    function setupApiModal() {
        var apiBtn = document.getElementById('api-settings-btn');
        var apiModal = document.getElementById('api-modal');
        var apiClose = document.getElementById('api-modal-close');
        var apiCancel = document.getElementById('api-cancel');
        var apiSave = document.getElementById('api-save');

        if (!apiBtn || !apiModal) {
            console.warn('API modal elements not found');
            return;
        }

        function apriModal() {
            if (typeof Android !== 'undefined' && Android.getApiKeys) {
                try {
                    var keys = JSON.parse(Android.getApiKeys());
                    var el;
                    el = document.getElementById('api-groq'); if (el) el.value = keys.groq || '';
                    el = document.getElementById('api-geoapify'); if (el) el.value = keys.geoapify || '';
                    el = document.getElementById('api-gemini'); if (el) el.value = keys.gemini || '';
                    el = document.getElementById('api-hf'); if (el) el.value = keys.hf || '';
                    el = document.getElementById('api-openrouter'); if (el) el.value = keys.openrouter || '';
                } catch (e) {
                    console.error('Errore caricamento chiavi:', e);
                }
            }
            apiModal.classList.add('active');
        }

        function chiudiModal() {
            apiModal.classList.remove('active');
        }

        function salvaChiavi() {
            var groq = document.getElementById('api-groq').value.trim();
            var geoapify = document.getElementById('api-geoapify').value.trim();
            var gemini = document.getElementById('api-gemini').value.trim();
            var hf = document.getElementById('api-hf').value.trim();
            var openrouter = document.getElementById('api-openrouter').value.trim();

            if (typeof Android !== 'undefined' && Android.saveApiKeys) {
                Android.saveApiKeys(groq, geoapify, gemini, hf, openrouter);
                var d = I18N[getLang()] || I18N.en;
                alert(d.api_saved_ok);
                chiudiModal();
            } else {
                var d2 = I18N[getLang()] || I18N.en;
                alert(d2.api_only_android);
            }
        }

        apiBtn.addEventListener('click', apriModal);
        if (apiClose) apiClose.addEventListener('click', chiudiModal);
        if (apiCancel) apiCancel.addEventListener('click', chiudiModal);
        if (apiSave) apiSave.addEventListener('click', salvaChiavi);

        apiModal.addEventListener('click', function(e) {
            if (e.target === apiModal) chiudiModal();
        });

        document.querySelectorAll('.api-toggle').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var targetId = btn.getAttribute('data-target');
                var input = document.getElementById(targetId);
                if (!input) return;
                if (input.type === 'password') {
                    input.type = 'text';
                    btn.textContent = '🙈';
                } else {
                    input.type = 'password';
                    btn.textContent = '👁';
                }
            });
        });

        var importBtn = document.getElementById('api-import-btn');
        if (importBtn) {
            importBtn.addEventListener('click', function() {
                if (typeof Android !== 'undefined' && Android.openApiKeyFile) {
                    try { Android.openApiKeyFile(); }
                    catch (err) { alert('Errore: ' + err.message); }
                } else {
                    var input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.txt,text/plain';
                    input.onchange = function(e) {
                        var file = e.target.files[0];
                        if (!file) return;
                        var reader = new FileReader();
                        reader.onload = function(ev) {
                            window.onApiKeysFileLoaded(ev.target.result);
                        };
                        reader.readAsText(file);
                    };
                    input.click();
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupApiModal);
    } else {
        setupApiModal();
    }
})();

// ============================================================
// PARSER FILE .TXT DELLE API KEYS
// ============================================================
window.onApiKeysFileLoaded = function(content) {
    var d = I18N[getLang()] || I18N.en;
    try {
        var lines = content.split(/\r?\n/);
        var parsed = { groq: '', geoapify: '', gemini: '', hf: '', openrouter: '' };
        var trovati = 0;
        var dettagli = [];

        lines.forEach(function(rawLine) {
            var line = rawLine.trim();
            if (!line || line.charAt(0) === '#') return;
            var eq = line.indexOf('=');
            if (eq === -1) return;
            var key = line.substring(0, eq).trim().toLowerCase();
            var value = line.substring(eq + 1).trim();
            if (!value) return;

            if (key.indexOf('groq') !== -1) {
                parsed.groq = value; trovati++; dettagli.push('Groq');
            } else if (key.indexOf('geoapify') !== -1) {
                parsed.geoapify = value; trovati++; dettagli.push('Geoapify');
            } else if (key.indexOf('gemini') !== -1) {
                parsed.gemini = value; trovati++; dettagli.push('Gemini');
            } else if (key.indexOf('hf') !== -1 || key.indexOf('hugging') !== -1) {
                parsed.hf = value; trovati++; dettagli.push('HuggingFace');
            } else if (key.indexOf('openrouter') !== -1) {
                parsed.openrouter = value; trovati++; dettagli.push('OpenRouter');
            }
        });

        if (trovati === 0) {
            alert(d.api_import_none);
            return;
        }

        var el;
        el = document.getElementById('api-groq'); if (el && parsed.groq) el.value = parsed.groq;
        el = document.getElementById('api-geoapify'); if (el && parsed.geoapify) el.value = parsed.geoapify;
        el = document.getElementById('api-gemini'); if (el && parsed.gemini) el.value = parsed.gemini;
        el = document.getElementById('api-hf'); if (el && parsed.hf) el.value = parsed.hf;
        el = document.getElementById('api-openrouter'); if (el && parsed.openrouter) el.value = parsed.openrouter;

        alert(d.api_import_ok_prefix + trovati + d.api_import_ok_suffix + '• ' + dettagli.join('\n• ') + d.api_import_ok_footer);
    } catch (e) {
        alert(d.api_import_error + e.message);
    }
};