/* JARVIS local assistant core — works offline for built-in commands. */
const J = window.JARVIS;
J.addChat = (type, message) => {
  const box = J.$('#chatMessages');
  if (!box) return;
  const entry = document.createElement('article');
  entry.className = 'chat-entry ' + (type === 'user' ? 'user' : 'response');
  const label = document.createElement('small');
  label.textContent = type === 'user' ? 'OPERATOR // INPUT' : 'JARVIS // RESPONSE';
  const pre = document.createElement('pre');
  pre.textContent = String(message);
  entry.append(label, pre);
  box.append(entry);
  box.scrollTop = box.scrollHeight;
  try {
    const history = JSON.parse(localStorage.getItem('jv_chat_history') || '[]');
    history.push({ type, text: String(message), at: Date.now() });
    localStorage.setItem('jv_chat_history', JSON.stringify(history.slice(-60)));
  } catch (_) {}
};

J.restoreChat = () => {
  try {
    const history = JSON.parse(localStorage.getItem('jv_chat_history') || '[]');
    if (!history.length) return;
    const box = J.$('#chatMessages');
    box.innerHTML = '';
    history.slice(-30).forEach(x => { const entry=document.createElement('article'); entry.className='chat-entry '+(x.type==='user'?'user':'response'); const label=document.createElement('small'); label.textContent=x.type==='user'?'OPERATOR // INPUT':'JARVIS // RESPONSE'; const pre=document.createElement('pre'); pre.textContent=x.text; entry.append(label,pre); box.append(entry); }); box.scrollTop=box.scrollHeight;
  } catch (_) {}
};

J.respond = (raw) => {
  const t = String(raw || '').trim();
  const u = t.toUpperCase().replace(/\s+/g, ' ');
  if (!t) return '';

  if (u === 'ST' || /^(OPEN )?SETTINGS$/.test(u)) { J.switchView('settings'); return '[SYSTEM] SETTINGS PANEL OPENED.\nSelect options and press SAVE ALL SETTINGS.'; }
  if (u === 'L' || u === 'LOCK') { setTimeout(J.lock, 0); return '[SECURITY] LOCK SCREEN ACTIVATED. DEMO SECURITY ONLY.'; }
  if (u === 'UL' || u === 'UNLOCK') {
    if (J.settings.allowUL) { J.unlock(); return '[SECURITY] UL OVERRIDE ACCEPTED // DEMO LOCK BYPASSED.'; }
    return '[ACCESS DENIED] UL OVERRIDE IS DISABLED. ENTER YOUR PASSWORD.';
  }
  const views = { '1':'command', HOME:'command', COMMAND:'command', '2':'radar', RADAR:'radar', MAP:'radar', '3':'hologram', HOLO:'hologram', HOLOGRAM:'hologram', '4':'tracking', TRACK:'tracking', TRACKING:'tracking' };
  if (views[u]) { J.switchView(views[u]); return `[INTERFACE] ${views[u].toUpperCase()} MODULE ACTIVE.`; }

  if (['R','RED'].includes(u)) return J.setAccent('red');
  if (['B','BLUE','CYAN'].includes(u)) return J.setAccent('cyan');
  if (['G','GREEN'].includes(u)) return J.setAccent('green');
  if (['A','AMBER'].includes(u)) return J.setAccent('amber');

  if (u === 'STATUS' || u === 'SYSTEM STATUS') return `[SYSTEM DIAGNOSTICS]\nTIME: ${new Date().toLocaleString()}\nACTIVE VIEW: ${(J.currentView || 'command').toUpperCase()}\nLOCATION: ${J.$('#locStatus')?.textContent || 'UNKNOWN'}\nTRACKING: ${J.location?.watchId == null ? 'OFF' : 'ON'}\nMAP ENGINE: ${window.L ? 'ONLINE' : 'OFFLINE'}\nAI MODE: LOCAL RULE-BASED ASSISTANT`;
  if (u === 'HELP' || u === '?') return `[COMMAND DIRECTORY]\n1 / HOME — COMMAND CENTER\n2 / RADAR — MAP INTERFACE\n3 / HOLO — EARTH VIDEO\n4 / TRACK — LOCATION HISTORY\nST — OPEN SETTINGS\nL — LOCK SCREEN\nUL — DEMO UNLOCK (IF ENABLED)\nR / B / G / A — RED / BLUE / GREEN / AMBER THEME\nMAP <PLACE> — SEARCH A MAP LOCATION\nTRACK ON / TRACK OFF — START OR STOP LOCATION TRACKING\nTIME / DATE / STATUS — SYSTEM INFORMATION\nCLEAR — CLEAR CHAT HISTORY`;
  if (u === 'CLEAR') { J.$('#chatMessages').innerHTML = ''; localStorage.removeItem('jv_chat_history'); return '[SYSTEM] CHAT HISTORY CLEARED.'; }

  if (u.startsWith('MAP ')) { const place = t.slice(4).trim(); J.switchView('radar'); J.maps.search(place); return `[MAP ENGINE] SEARCHING FOR: ${place}\nMap provider: OpenStreetMap / Nominatim.`; }
  if (u === 'TRACK ON' || u === 'START TRACKING') { J.switchView('tracking'); J.$('#trackStart')?.click(); return '[LOCATION] TRACKING REQUEST SENT. APPROVE THE BROWSER LOCATION PROMPT.'; }
  if (u === 'TRACK OFF' || u === 'STOP TRACKING') { J.$('#trackStop')?.click(); return '[LOCATION] TRACKING STOP REQUESTED.'; }
  if (/^(TIME|WHAT TIME IS IT|সময়|সময়)$/.test(u)) return '[CLOCK] ' + new Date().toLocaleTimeString();
  if (/^(DATE|TODAY|TODAY'S DATE|তারিখ)$/.test(u)) return '[DATE] ' + new Date().toLocaleDateString();
  if (/^(HI|HELLO|HEY|হ্যালো|নমস্কার)(\b|$)/i.test(t)) return '[GREETING] HELLO, OPERATOR.\n[JARVIS] SYSTEM READY. TYPE HELP TO VIEW AVAILABLE COMMANDS.';
  if (/your name|তোমার নাম|কে তুমি/i.test(t)) return '[IDENTITY] I AM JARVIS — YOUR PERSONAL WEB-BASED COMMAND INTERFACE.';
  if (/who am i|আমার নাম কী|আমি কে/i.test(t)) return '[OPERATOR PROFILE] Your profile has not been configured. You can add a display name in a future profile module.';
  if (/weather|আবহাওয়া|আবহাওয়া/i.test(t)) return '[WEATHER MODULE] LIVE WEATHER IS NOT CONNECTED IN THIS BUILD. No live weather data will be invented.';
  if (/battery|ব্যাটারি/i.test(t)) return '[DEVICE MODULE] ' + (J.deviceBattery ? `BATTERY ${Math.round(J.deviceBattery.level * 100)}%` : 'Battery information is not exposed by this browser.');
  if (/location|লোকেশন|অবস্থান/i.test(t)) return '[GEO MODULE] Press LOCATE ME or use TRACK ON. Browser location permission is required; tracking only runs while this page remains open.';
  if (/thank|ধন্যবাদ/i.test(t)) return '[ACKNOWLEDGED] REQUEST COMPLETED. READY FOR THE NEXT COMMAND.';
  if (/^search\s+/i.test(t)) { const q = t.replace(/^search\s+/i, ''); J.switchView('radar'); J.maps.search(q); return `[SEARCH] MAP SEARCH STARTED FOR: ${q}`; }

  return `[MESSAGE RECEIVED // ${new Date().toLocaleTimeString()}]\nLOCAL ASSISTANT: ONLINE\n\nI can understand the built-in commands and basic questions, but this version is not connected to a full AI model. For general questions, connect an AI service through a secure backend; never place a private API key in public website JavaScript.`;
};

J.sendChat = () => {
  const input = J.$('#chatInput');
  if (!input) return;
  const message = input.value.trim();
  if (!message) { J.toast('TYPE A MESSAGE OR COMMAND FIRST'); input.focus(); return; }
  J.addChat('user', message);
  input.value = '';
  input.style.height = '';
  const send = J.$('#sendBtn');
  if (send) { send.disabled = true; send.textContent = 'PROCESSING…'; }
  window.setTimeout(() => {
    try {
      const answer = J.respond(message);
      if (answer) J.addChat('response', answer);
    } catch (err) {
      console.error('JARVIS chat error:', err);
      J.addChat('response', '[ERROR] COMMAND PROCESSING FAILED. ' + (err.message || 'Unknown error'));
      J.log('CHAT ERROR: ' + (err.message || err));
    } finally {
      if (send) { send.disabled = false; send.textContent = 'TRANSMIT ↗'; }
      input.focus();
    }
  }, 220);
};

J.restoreChat();
