\# Frames of Truth — User Guide



A step-by-step guide for using the app.



\## 📥 1. Install the app



1\. Download the latest `app-debug.apk` from the \[Releases page](link)

2\. On your Android device, enable installation from unknown sources

3\. Tap the APK to install



\## 🔑 2. Get your API keys



The app needs two free API keys:



\- \*\*Groq\*\* → \[console.groq.com/keys](https://console.groq.com/keys)

&#x20; Sign up, click "Create API Key", copy the `gsk\_...` string

\- \*\*Geoapify\*\* → \[myprojects.geoapify.com](https://myprojects.geoapify.com/)

&#x20; Sign up, create a project, copy the API key



\## ⚙️ 3. Configure the app



1\. Open Frames of Truth

2\. Tap the ⚙️ icon in the top-left corner

3\. Paste your Groq and Geoapify keys

4\. Tap "Save"



Alternatively, create a `.txt` file like this and import it:



GROQ\_API\_KEY=gsk\_xxxxxxxxxxxxx

GEOAPIFY\_API\_KEY=xxxxxxxxxxxxx





\## 📸 4. Take or choose a photo



\- Tap \*\*Take photo\*\* to use the camera

\- Tap \*\*Choose from device\*\* to pick a photo from the gallery



\*\*Tip\*\*: for best results, use a photo with GPS metadata enabled. On Android: Camera settings → Location tags ON.



\## 📖 5. Read the story



The app will:

1\. Extract GPS coordinates from the photo

2\. Find the location and nearby POIs

3\. Generate a story in 3 sections (Location, Image description, Curiosity)



\## 🔍 6. Generate the investigative report



Tap \*\*"Launch deep investigation"\*\* for a 6-section report:

1\. Location

2\. Surroundings

3\. Wikipedia \& Wikidata

4\. Recent news

5\. Metadata and deductions

6\. Investigative hypothesis



Click on section titles to collapse/expand them.



\## ❓ FAQ



\*\*The app says "GPS not found"\*\* → Your photo has no GPS in its EXIF. Use "Proceed with device location" to use the phone's current position.



\*\*The story is in English, but I want Italian\*\* → Tap the flag icon in the top-right corner to change the language.



\*\*The app crashes on startup\*\* → Make sure you have given all permissions (Location, Camera, Media location).





