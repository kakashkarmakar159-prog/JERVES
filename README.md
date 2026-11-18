# JARVIS V4 — Holographic Interface + Gemini option

## Run / Deploy
1. Extract this ZIP.
2. Upload the contents of `JARVIS-V2` to your GitHub Pages repository (keep `assets/core-video.mp4`).
3. Open the site over HTTPS. Maps require internet; location requires browser permission.

## Gemini setup
- Open Settings with `ST`.
- Paste your Gemini API key under **Gemini AI Connection**.
- Choose a model and press **TEST CONNECTION**.
- The key is kept only in this browser tab's `sessionStorage`; it is not saved to permanent browser storage.
- IMPORTANT: this is a browser-side prototype. The key can still be inspected by someone with access to the browser/devtools. Do not publish or share a site with a real key configured. For a public website, put the key in a private backend environment variable and call your own backend endpoint.
- Gemini availability, model access, quotas and any free tier depend on Google's current account and billing terms.

## Commands
`HELP`, `1`, `2`, `3`, `4`, `ST`, `L`, `UL`, `R`, `B`, `G`, `A`, `MAP <place>`, `TRACK ON`, `TRACK OFF`, `TIME`, `DATE`, `STATUS`.

## Limits
- Browser geolocation only works after permission and while the page is active. It is not continuous background phone tracking.
- Browser pages cannot freely open/control every installed Android app, read notifications, or change system settings. Those need a separately built Android companion app and explicit Android permissions.
- The lock and biometric animation are demo UI only.
