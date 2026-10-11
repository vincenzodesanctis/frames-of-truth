package com.example.echoesfromthepast

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.webkit.GeolocationPermissions
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.chaquo.python.Python
import com.chaquo.python.android.AndroidPlatform
import org.json.JSONObject
import java.io.File
import java.io.FileOutputStream
import kotlin.concurrent.thread

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private var filePathCallback: ValueCallback<Array<Uri>>? = null
    private val FILE_CHOOSER_REQUEST_CODE = 1002
    private val PERMISSIONS_REQUEST_CODE = 1001
    private val CAMERA_REQUEST_CODE = 1003
    private val API_KEY_FILE_REQUEST_CODE = 1004
    private var cameraOutputUri: Uri? = null

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        requestRuntimePermissions()

        webView = findViewById(R.id.webView)
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            mediaPlaybackRequiresUserGesture = false
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_NO_CACHE
            loadWithOverviewMode = true
            useWideViewPort = true
        }
        webView.webViewClient = WebViewClient()

        // JavaScript Interface — TUTTI i metodi @JavascriptInterface vanno QUI dentro
        webView.addJavascriptInterface(object {
            @JavascriptInterface
            fun openFileChooser() {
                runOnUiThread { apriFileChooserSenzaCallback() }
            }

            @JavascriptInterface
            fun openCamera() {
                runOnUiThread { apriFotocamera() }
            }

            @JavascriptInterface
            fun getApiKeys(): String {
                val prefs = getSharedPreferences("echoes_prefs", MODE_PRIVATE)
                val json = JSONObject()
                try {
                    json.put("groq", prefs.getString("groq", "") ?: "")
                    json.put("geoapify", prefs.getString("geoapify", "") ?: "")
                    json.put("gemini", prefs.getString("gemini", "") ?: "")
                    json.put("hf", prefs.getString("hf", "") ?: "")
                    json.put("openrouter", prefs.getString("openrouter", "") ?: "")
                } catch (e: Exception) {
                    Log.e("EchoesAndroid", "Errore getApiKeys", e)
                }
                return json.toString()
            }

            @JavascriptInterface
            fun saveApiKeys(groq: String, geoapify: String, gemini: String, hf: String, openrouter: String) {
                val prefs = getSharedPreferences("echoes_prefs", MODE_PRIVATE)
                prefs.edit()
                    .putString("groq", groq)
                    .putString("geoapify", geoapify)
                    .putString("gemini", gemini)
                    .putString("hf", hf)
                    .putString("openrouter", openrouter)
                    .apply()
                Log.d("EchoesAndroid", "API keys salvate in SharedPreferences")

                thread {
                    try {
                        val py = Python.getInstance()
                        py.getModule("app").callAttr("set_api_keys", groq, geoapify, gemini, hf, openrouter)
                    } catch (e: Exception) {
                        Log.e("EchoesAndroid", "Errore aggiornamento API keys a runtime", e)
                    }
                }
            }

            @JavascriptInterface
            fun openApiKeyFile() {
                runOnUiThread { apriFileChooserChiavi() }
            }

            @JavascriptInterface
            fun deleteTempFile(filename: String) {
                thread {
                    try {
                        val f = File(File(filesDir, "web"), filename)
                        if (f.exists()) {
                            val deleted = f.delete()
                            Log.d("EchoesAndroid", "Cancellato $filename: $deleted")
                        }
                    } catch (e: Exception) {
                        Log.e("EchoesAndroid", "Errore delete temp file", e)
                    }
                }
            }
        }, "Android")

        webView.webChromeClient = object : WebChromeClient() {
            override fun onGeolocationPermissionsShowPrompt(
                origin: String?,
                callback: GeolocationPermissions.Callback?
            ) {
                callback?.invoke(origin, true, false)
            }

            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                return apriFileChooserConCallback(filePathCallback)
            }

            override fun onJsAlert(
                view: WebView?,
                url: String?,
                message: String?,
                result: android.webkit.JsResult?
            ): Boolean {
                androidx.appcompat.app.AlertDialog.Builder(this@MainActivity)
                    .setMessage(message)
                    .setPositiveButton(android.R.string.ok) { _, _ ->
                        result?.confirm()
                    }
                    .setCancelable(false)
                    .create()
                    .show()
                return true
            }
        }

        val webDir = File(filesDir, "web")
        extractAssets(webDir)

        // Pulisci i file temporanei della fotocamera (vecchie sessioni)
        try {
            val cacheFiles = cacheDir.listFiles()
            if (cacheFiles != null) {
                for (f in cacheFiles) {
                    if (f.name.startsWith("echoes_camera_")) {
                        f.delete()
                    }
                }
            }
        } catch (e: Exception) {
            Log.e("EchoesAndroid", "Errore pulizia cache", e)
        }

        // Pulizia residui di sessioni precedenti
        try {
            val webFiles = webDir.listFiles()
            if (webFiles != null) {
                for (f in webFiles) {
                    if (f.name.startsWith("pending_")) {
                        f.delete()
                    }
                }
            }
        } catch (e: Exception) {
            Log.e("EchoesAndroid", "Errore pulizia web dir", e)
        }

        avviaPythonFlask(webDir)
        attendiFlaskECaricaPagina()
    }

    // ============================================================
    // PERMESSI RUNTIME
    // ============================================================
    private fun requestRuntimePermissions() {
        val neededPerms = mutableListOf<String>()

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            neededPerms.add(Manifest.permission.ACCESS_FINE_LOCATION)
            neededPerms.add(Manifest.permission.ACCESS_COARSE_LOCATION)
        }

        if (android.os.Build.VERSION.SDK_INT >= 29) {
            if (ContextCompat.checkSelfPermission(this, "android.permission.ACCESS_MEDIA_LOCATION")
                != PackageManager.PERMISSION_GRANTED) {
                neededPerms.add("android.permission.ACCESS_MEDIA_LOCATION")
            }
        }

        if (android.os.Build.VERSION.SDK_INT <= 32) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
                neededPerms.add(Manifest.permission.READ_EXTERNAL_STORAGE)
            }
        }

        if (neededPerms.isNotEmpty()) {
            ActivityCompat.requestPermissions(this, neededPerms.toTypedArray(), PERMISSIONS_REQUEST_CODE)
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }

    // ============================================================
    // AVVIO PYTHON + FLASK
    // ============================================================
    private fun avviaPythonFlask(webDir: File) {
        thread {
            try {
                if (!Python.isStarted()) {
                    Python.start(AndroidPlatform(this))
                }
                val py = Python.getInstance()
                val module = py.getModule("app")

                val prefs = getSharedPreferences("echoes_prefs", MODE_PRIVATE)
                val groq = prefs.getString("groq", "") ?: ""
                val geoapify = prefs.getString("geoapify", "") ?: ""
                val gemini = prefs.getString("gemini", "") ?: ""
                val hf = prefs.getString("hf", "") ?: ""
                val openrouter = prefs.getString("openrouter", "") ?: ""

                if (groq.isNotEmpty() || geoapify.isNotEmpty() || gemini.isNotEmpty() ||
                    hf.isNotEmpty() || openrouter.isNotEmpty()) {
                    module.callAttr("set_api_keys", groq, geoapify, gemini, hf, openrouter)
                    Log.d("EchoesAndroid", "API keys caricate da SharedPreferences")
                }

                module.callAttr("set_web_dir", webDir.absolutePath)
                module.callAttr("run_flask")
            } catch (e: Exception) {
                Log.e("EchoesAndroid", "Errore avvio Python", e)
            }
        }
    }

    private fun attendiFlaskECaricaPagina() {
        thread {
            var attempts = 0
            var loaded = false
            while (attempts < 60 && !loaded) {
                try {
                    Thread.sleep(500)
                    val url = java.net.URL("http://127.0.0.1:5000/health")
                    val conn = url.openConnection() as java.net.HttpURLConnection
                    conn.connectTimeout = 1000
                    conn.requestMethod = "GET"
                    if (conn.responseCode == 200) loaded = true
                    conn.disconnect()
                } catch (e: Exception) {
                    attempts++
                }
            }
            runOnUiThread {
                webView.loadUrl("http://127.0.0.1:5000/")
            }
        }
    }

    // ============================================================
    // FILE CHOOSER
    // ============================================================
    private fun apriFileChooserSenzaCallback() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "image/*"
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION)
        }
        try {
            startActivityForResult(intent, FILE_CHOOSER_REQUEST_CODE)
        } catch (e: Exception) {
            Log.e("EchoesAndroid", "Errore apertura file chooser", e)
        }
    }

    private fun apriFileChooserConCallback(callback: ValueCallback<Array<Uri>>?): Boolean {
        if (filePathCallback != null) {
            filePathCallback?.onReceiveValue(null)
            filePathCallback = null
        }
        filePathCallback = callback

        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "image/*"
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION)
        }

        return try {
            startActivityForResult(intent, FILE_CHOOSER_REQUEST_CODE)
            true
        } catch (e: Exception) {
            Log.e("EchoesAndroid", "Errore apertura file chooser", e)
            filePathCallback = null
            false
        }
    }

    // File chooser per il file .txt delle API keys
    private fun apriFileChooserChiavi() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "text/plain"
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        try {
            startActivityForResult(intent, API_KEY_FILE_REQUEST_CODE)
        } catch (e: Exception) {
            Log.e("EchoesAndroid", "Errore apertura file chooser chiavi", e)
        }
    }

    // ============================================================
    // FOTOCAMERA
    // ============================================================
    private fun apriFotocamera() {
        try {
            val photoFile = File.createTempFile("echoes_camera_", ".jpg", cacheDir)
            val photoUri = androidx.core.content.FileProvider.getUriForFile(
                this,
                "${packageName}.fileprovider",
                photoFile
            )
            cameraOutputUri = photoUri

            val intent = Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE).apply {
                putExtra(android.provider.MediaStore.EXTRA_OUTPUT, photoUri)
                addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
            }

            startActivityForResult(intent, CAMERA_REQUEST_CODE)
        } catch (e: Exception) {
            Log.e("EchoesAndroid", "Errore apertura fotocamera", e)
        }
    }

    // ============================================================
    // RISULTATO ATTIVITÀ
    // ============================================================
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // File .txt chiavi API
        if (requestCode == API_KEY_FILE_REQUEST_CODE) {
            if (resultCode == RESULT_OK && data?.data != null) {
                thread {
                    try {
                        val stream = contentResolver.openInputStream(data.data!!)
                        val content = stream?.bufferedReader()?.use { it.readText() } ?: ""
                        stream?.close()
                        Log.d("EchoesAndroid", "File chiavi letto: ${content.length} caratteri")
                        runOnUiThread {
                            val quoted = JSONObject.quote(content)
                            webView.evaluateJavascript(
                                "javascript:onApiKeysFileLoaded($quoted)",
                                null
                            )
                        }
                    } catch (e: Exception) {
                        Log.e("EchoesAndroid", "Errore lettura file chiavi", e)
                    }
                }
            }
            return
        }

        if (requestCode == CAMERA_REQUEST_CODE) {
            if (resultCode == RESULT_OK && cameraOutputUri != null) {
                leggiFileEPassaAlJs(cameraOutputUri!!)
            }
            cameraOutputUri = null
            return
        }

        if (requestCode != FILE_CHOOSER_REQUEST_CODE) return

        if (filePathCallback != null) {
            val results: Array<Uri>? = if (resultCode == RESULT_OK && data != null) {
                val dataString = data.data
                if (dataString != null) arrayOf(dataString) else null
            } else null
            filePathCallback?.onReceiveValue(results)
            filePathCallback = null
            return
        }

        if (resultCode == RESULT_OK && data?.data != null) {
            leggiFileEPassaAlJs(data.data!!)
        }
    }

    // ============================================================
    // LEGGI FILE E PASSA AL JS
    // ============================================================
    private fun leggiFileEPassaAlJs(originalUri: Uri) {
        thread {
            try {
                var originalBytes: ByteArray? = null
                var usedUri: Uri = originalUri

                if (android.os.Build.VERSION.SDK_INT >= 29 &&
                    ContextCompat.checkSelfPermission(this, "android.permission.ACCESS_MEDIA_LOCATION")
                    == PackageManager.PERMISSION_GRANTED) {
                    try {
                        val uriOriginal = android.provider.MediaStore.setRequireOriginal(originalUri)
                        val stream = contentResolver.openInputStream(uriOriginal)
                        originalBytes = stream?.readBytes()
                        stream?.close()
                        usedUri = uriOriginal
                    } catch (e: SecurityException) {
                        originalBytes = null
                    } catch (e: Exception) {
                        originalBytes = null
                    }
                }

                if (originalBytes == null) {
                    try {
                        val stream = contentResolver.openInputStream(originalUri)
                        originalBytes = stream?.readBytes()
                        stream?.close()
                        usedUri = originalUri
                    } catch (e: Exception) {
                        Log.e("EchoesAndroid", "Errore lettura file", e)
                        originalBytes = null
                    }
                }

                if (originalBytes == null) {
                    Log.e("EchoesAndroid", "Impossibile leggere il file")
                    return@thread
                }

                if (originalBytes.size > 120 * 1024 * 1024) {
                    Log.e("EchoesAndroid", "File troppo grande: ${originalBytes.size / (1024 * 1024)} MB")
                    return@thread
                }

                val isHeic = isHeicFile(originalBytes)

                val webDir = File(filesDir, "web")
                webDir.mkdirs()
                val timestamp = System.currentTimeMillis()

                var finalBytes: ByteArray = originalBytes
                var finalMime: String = contentResolver.getType(usedUri) ?: "image/jpeg"
                var finalExt: String = "bin"
                var exifFilename: String = ""

                if (isHeic) {
                    val exifJson = extractExifJson(usedUri)

                    val bitmap = android.graphics.BitmapFactory.decodeByteArray(
                        originalBytes, 0, originalBytes.size
                    )
                    if (bitmap == null) {
                        Log.e("EchoesAndroid", "Impossibile decodificare HEIC")
                        return@thread
                    }

                    val baos = java.io.ByteArrayOutputStream()
                    bitmap.compress(android.graphics.Bitmap.CompressFormat.JPEG, 92, baos)
                    bitmap.recycle()
                    finalBytes = baos.toByteArray()
                    finalMime = "image/jpeg"
                    finalExt = "jpg"

                    exifFilename = "pending_${timestamp}.exif.json"
                    File(webDir, exifFilename).writeText(exifJson)
                } else {
                    finalExt = when {
                        finalMime.contains("png") -> "png"
                        finalMime.contains("webp") -> "webp"
                        else -> "jpg"
                    }
                }

                val filename = "pending_${timestamp}.${finalExt}"
                File(webDir, filename).writeBytes(finalBytes)

                runOnUiThread {
                    webView.evaluateJavascript(
                        "javascript:onFileReadyFromAndroid('$filename', '$finalMime', '$exifFilename')",
                        null
                    )
                }
            } catch (e: Exception) {
                Log.e("EchoesAndroid", "Errore lettura file", e)
            }
        }
    }

    // ============================================================
    // RILEVA HEIC
    // ============================================================
    private fun isHeicFile(bytes: ByteArray): Boolean {
        if (bytes.size < 12) return false
        val ftyp = String(bytes, 4, 4, Charsets.US_ASCII)
        if (ftyp != "ftyp") return false
        val brand = String(bytes, 8, 4, Charsets.US_ASCII)
        return brand in listOf("heic", "heix", "hevc", "hevx", "mif1", "msf1")
    }

    // ============================================================
    // ESTRAZIONE EXIF CON METADATAEXTRACTOR
    // ============================================================
    private fun extractExifJson(uri: Uri): String {
        try {
            val inputStream = contentResolver.openInputStream(uri)
                ?: return "{}"
            val metadata = com.drew.imaging.ImageMetadataReader.readMetadata(inputStream)
            inputStream.close()

            val json = JSONObject()

            val gpsDir = metadata.getFirstDirectoryOfType(
                com.drew.metadata.exif.GpsDirectory::class.java
            )
            if (gpsDir != null) {
                val geoLocation = gpsDir.geoLocation
                if (geoLocation != null && !geoLocation.isZero) {
                    json.put("lat", geoLocation.latitude)
                    json.put("lng", geoLocation.longitude)
                }

                val altitude = gpsDir.getDoubleObject(
                    com.drew.metadata.exif.GpsDirectory.TAG_ALTITUDE
                )
                if (altitude != null) {
                    val ref = gpsDir.getInteger(
                        com.drew.metadata.exif.GpsDirectory.TAG_ALTITUDE_REF
                    ) ?: 0
                    json.put("altitude", if (ref == 1) -altitude else altitude)
                    json.put("altitude_ref", if (ref == 1) "below" else "above")
                }
            }

            val exifDir = metadata.getFirstDirectoryOfType(
                com.drew.metadata.exif.ExifSubIFDDirectory::class.java
            )
            if (exifDir != null) {
                val datetime = exifDir.getString(
                    com.drew.metadata.exif.ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL
                )
                if (datetime != null) json.put("datetime_original", datetime)
            }

            val ifd0 = metadata.getFirstDirectoryOfType(
                com.drew.metadata.exif.ExifIFD0Directory::class.java
            )
            if (ifd0 != null) {
                val make = ifd0.getString(
                    com.drew.metadata.exif.ExifIFD0Directory.TAG_MAKE
                )
                if (make != null) json.put("make", make)

                val model = ifd0.getString(
                    com.drew.metadata.exif.ExifIFD0Directory.TAG_MODEL
                )
                if (model != null) json.put("model", model)

                val orientation = ifd0.getInteger(
                    com.drew.metadata.exif.ExifIFD0Directory.TAG_ORIENTATION
                )
                if (orientation != null) json.put("orientation", orientation.toString())
            }

            return json.toString()
        } catch (e: Exception) {
            Log.e("EchoesAndroid", "Errore estrazione EXIF", e)
            return "{}"
        }
    }

    // ============================================================
    // ESTRAZIONE ASSETS
    // ============================================================
    private fun extractAssets(targetDir: File) {
        if (targetDir.exists()) targetDir.deleteRecursively()
        targetDir.mkdirs()

        try {
            val files = assets.list("web") ?: emptyArray()
            for (filename in files) {
                val inputStream = assets.open("web/$filename")
                val outputFile = File(targetDir, filename)
                val outputStream = FileOutputStream(outputFile)
                inputStream.copyTo(outputStream)
                inputStream.close()
                outputStream.close()
            }
        } catch (e: Exception) {
            Log.e("EchoesAndroid", "Errore copia assets", e)
        }
    }

    // ============================================================
    // BACK PRESS
    // ============================================================
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            @Suppress("DEPRECATION")
            super.onBackPressed()
        }
    }
}