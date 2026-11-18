# JARVIS V2 — Enhanced Local Demo

## Run
- Keep the complete `JARVIS-V2` folder structure.
- Open `index.html` with VS Code Live Server, or deploy the folder contents to GitHub Pages.
- Internet is needed for the map tiles, map search/geocoding, and optional web fonts.

## Chat commands
`HELP`, `1`, `2`, `3`, `4`, `ST`, `L`, `UL`, `R`, `B`, `G`, `A`, `MAP <place>`, `TRACK ON`, `TRACK OFF`, `TIME`, `DATE`, `STATUS`, `CLEAR`.

## Notes / limitations
- The chat is a local command assistant with basic intent replies. It is not connected to a full AI model and cannot answer arbitrary questions like a cloud AI chatbot.
- Location tracking requires explicit browser permission and works only while the page is open. It is not background phone tracking.
- Lock, password, biometric animation, and UL are demo UI only, not real security. Do not use them to protect private information.
- Browser support for battery and speech recognition varies by device/browser.
- The custom site CSS is embedded inside `index.html`; JavaScript modules remain separate in `js/`.
