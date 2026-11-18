/* JARVIS application bootstrap */
window.JARVIS = {};
const J = window.JARVIS;
J.$ = selector => document.querySelector(selector);
J.store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem('jv_' + key)) ?? fallback; } catch (_) { return fallback; } },
  set(key, value) { try { localStorage.setItem('jv_' + key, JSON.stringify(value)); } catch (_) { J.toast?.('BROWSER STORAGE IS FULL OR DISABLED'); } }
};
J.defaults = { defaultView:'command', accentColor:'cyan', chatPosition:'right', animations:true, autoVideo:true, lockPassword:'AK@111', fakeBio:true, allowUL:true, historyEnabled:true, mapStart:'Kolkata, India', assistantLanguage:'both' };
J.settings = { ...J.defaults, ...J.store.get('settings', {}) };
J.toast = message => {
  const el = J.$('#toast'); if (!el) return;
  el.textContent = message; el.classList.add('show'); clearTimeout(J.toastTimer);
  J.toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
};
J.log = message => {
  const box = J.$('#terminalLog'); if (!box) return;
  const row = document.createElement('div'); row.textContent = '[' + new Date().toLocaleTimeString() + '] ' + message;
  box.append(row); box.scrollTop = box.scrollHeight;
};
J.setAccent = color => {
  document.body.classList.remove('accent-green','accent-red','accent-amber');
  if (color !== 'cyan') document.body.classList.add('accent-' + color);
  J.settings.accentColor = color; J.store.set('settings', J.settings);
  return `[THEME] ${color.toUpperCase()} INTERFACE ENABLED.`;
};
J.switchView = name => {
  if (!['command','radar','hologram','tracking','settings'].includes(name)) return;
  document.querySelectorAll('.interface').forEach(el => el.classList.remove('active'));
  const target = J.$('#view-' + name); if (!target) { J.log('VIEW NOT FOUND: ' + name); return; }
  target.classList.add('active'); J.currentView = name;
  if (name === 'hologram' && J.settings.autoVideo) { const video = J.$('#coreVideo'); if (video) video.play().catch(() => { if (J.$('#videoState')) J.$('#videoState').textContent = 'TAP TO PLAY VIDEO'; }); }
  J.log('INTERFACE ' + name.toUpperCase() + ' LOADED');
};
J.lock = () => {
  const screen = J.$('#lockScreen'); if (!screen) return;
  screen.classList.remove('hidden'); J.$('#unlockPassword').value = '';
  J.$('#lockMessage').textContent = 'LOCK ACTIVE // ACCESS RESTRICTED'; J.$('#lockCommand').value = '';
  J.log('SESSION LOCKED — DEMO UI');
};
J.unlock = () => { J.$('#lockScreen')?.classList.add('hidden'); J.toast('ACCESS GRANTED'); J.log('SESSION UNLOCKED — DEMO UI'); };
J.handleUnlockCommand = value => {
  if (String(value).trim().toUpperCase() === 'UL' && J.settings.allowUL) { J.log('UL DEMO OVERRIDE ACCEPTED'); J.unlock(); }
  else if (J.$('#lockMessage')) J.$('#lockMessage').textContent = 'INVALID COMMAND OR UL OVERRIDE DISABLED';
};

J.$('#lockBtn')?.addEventListener('click', J.lock);
J.$('#settingsBtn')?.addEventListener('click', () => J.switchView('settings'));
J.$('#homeBtn')?.addEventListener('click', () => J.switchView(J.settings.defaultView));
J.$('#unlockForm')?.addEventListener('submit', event => {
  event.preventDefault();
  if (J.$('#unlockPassword').value === J.settings.lockPassword) J.unlock();
  else J.$('#lockMessage').textContent = 'ACCESS DENIED // PASSWORD INCORRECT';
});
J.$('#lockCommandBtn')?.addEventListener('click', () => J.handleUnlockCommand(J.$('#lockCommand').value));
J.$('#lockCommand')?.addEventListener('keydown', event => { if (event.key === 'Enter') J.handleUnlockCommand(event.target.value); });
J.$('#scanBio')?.addEventListener('click', () => {
  if (!J.settings.fakeBio) { J.$('#bioText').textContent = 'SIMULATED BIOMETRICS DISABLED'; return; }
  const finger = J.$('#fingerprint'), label = J.$('#bioText'); finger.classList.add('scanning');
  label.textContent = 'SCANNING... VISUAL DEMO'; J.$('#lockMessage').textContent = 'VISUAL DEMO ONLY — ENTER PASSWORD';
  setTimeout(() => { finger.classList.remove('scanning'); label.textContent = 'DEMO SCAN COMPLETE — NOT VERIFIED'; }, 1800);
});
J.$('#chatClear')?.addEventListener('click', () => {
  J.$('#chatMessages').innerHTML = ''; localStorage.removeItem('jv_chat_history');
  J.addChat?.('response', '[SYSTEM] CHAT BUFFER CLEARED. TYPE HELP FOR COMMANDS.');
});
J.$('#voiceBtn')?.addEventListener('click', () => {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { J.toast('VOICE INPUT IS NOT SUPPORTED IN THIS BROWSER'); return; }
  const recognizer = new Recognition(); recognizer.lang = J.settings.assistantLanguage === 'bn' ? 'bn-IN' : 'en-IN';
  recognizer.onresult = event => { J.$('#chatInput').value = event.results[0][0].transcript; J.sendChat(); };
  recognizer.onerror = () => J.toast('VOICE RECOGNITION FAILED'); recognizer.start(); J.toast('LISTENING...');
});
J.$('#chatInput')?.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); J.sendChat(); } });
J.$('#sendBtn')?.addEventListener('click', () => J.sendChat());

const updateClock = () => {
  const now = new Date();
  if (J.$('#clock')) J.$('#clock').textContent = now.toLocaleTimeString();
  if (J.$('#holoTime')) J.$('#holoTime').textContent = now.toLocaleTimeString();
  if (J.$('#holoDate')) J.$('#holoDate').textContent = now.toLocaleDateString();
};
updateClock(); setInterval(updateClock, 1000);
if (navigator.getBattery) navigator.getBattery().then(battery => {
  J.deviceBattery = battery;
  const update = () => { const value = Math.round(battery.level * 100) + '%' + (battery.charging ? ' / CHARGING' : ''); if (J.$('#batteryStat')) J.$('#batteryStat').textContent = value; if (J.$('#holoBattery')) J.$('#holoBattery').textContent = value; };
  update(); battery.addEventListener('levelchange', update); battery.addEventListener('chargingchange', update);
}).catch(() => {});
window.addEventListener('error', event => J.log('RUNTIME ERROR: ' + (event.message || 'unknown')));
J.switchView(J.settings.defaultView);
J.log('ALL CORE MODULES INITIALISED');
