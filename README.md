# JARVIS V2 — Futuristic Personal Command System

## Run
1. Extract this ZIP.
2. Open the `JARVIS-V2` folder in VS Code.
3. Start with VS Code Live Server (recommended). Open `index.html`.
4. Internet is required for Leaflet, map tiles, geocoding and Google Fonts. Location works only on localhost or HTTPS and requires your permission.
5. The uploaded `core-video.mp4` is included in `assets/` and used in Global Hologram.

## Commands (type in the persistent Chat Panel)
- `1` or `HOME` — Command Center
- `2` or `RADAR` — Geolocation Radar
- `3` or `HOLO` — Global Hologram
- `4` or `TRACK` — Location Tracking
- `ST` — Settings
- `L` — Lock screen
- `UL` — Bypass the demo lock (if enabled in Settings)
- `R`, `B`, `G`, `A` — Red, Blue/Cyan, Green, Amber theme
- `MAP Kolkata` — Search map
- `TRACK ON` / `TRACK OFF` — Start/stop user-controlled location tracking
- `STATUS`, `HELP`

## Lock screen warning
The default demo password is `AK@111`. The biometric animation is only a visual demonstration: it does not scan or verify a fingerprint, face, or eye. `UL` is an intentional demo override if enabled. This is NOT real security. The password and command logic are in frontend JavaScript/local browser storage and can be inspected or bypassed by anyone with access to the website files/browser. Do not use this demo lock to protect private information or use this password anywhere else. For real authentication, use a backend session system or Android's native BiometricPrompt with secure credential storage.

## Location privacy and limitations
- Location is requested only after you tap Locate Me or Start Tracking.
- Tracking stops when you press Stop; this browser prototype only records while the page is open and the browser allows it. It does not reliably track in the background or when the page is closed.
- History is stored in local browser storage and can be exported or cleared.
- Do not use this for covertly tracking anyone. Only track your own device with clear consent.
- Browser geolocation requires HTTPS or localhost and explicit permission.
- Maps use OpenStreetMap tiles via Leaflet; geocoding uses the public Nominatim service and is subject to its usage policy.
- This web app cannot read all Android notifications, control arbitrary apps, or toggle protected system settings. A separate Android companion app with explicit permissions is needed for supported device integrations.

## AI
The chat is a command-aware local demo. It is not connected to a full language model yet. A real AI model needs to be integrated separately; hosted APIs may have limits or charges, while local models need suitable hardware.
