const J=window.JARVIS;
J.addChat=(type,text)=>{let box=J.$('#chatMessages'),entry=document.createElement('div');entry.className='chat-entry '+type;let label=document.createElement('small');label.textContent=type==='user'?'OPERATOR // INPUT':'JARVIS // RESPONSE';let pre=document.createElement('pre');pre.textContent=text;entry.append(label,pre);box.append(entry);box.scrollTop=box.scrollHeight};
J.respond=(text)=>{let t=text.trim(),u=t.toUpperCase();if(!t)return;
if(u==='ST'||u==='SETTINGS'){J.switchView('settings');return '[SYSTEM] SETTINGS PANEL OPENED.'}
if(u==='L'||u==='LOCK'){J.lock();return '[SECURITY] SESSION LOCK REQUESTED.'}
if(['UL','UNLOCK'].includes(u)){if(J.settings.allowUL){J.log('UL OVERRIDE COMMAND RECEIVED');J.unlock();return '[SECURITY] UL OVERRIDE ACCEPTED. DEMO LOCK BYPASSED.'}return '[DENIED] UL OVERRIDE IS DISABLED IN SETTINGS.'}
if(u==='1'||u==='HOME'||u==='COMMAND'){J.switchView('command');return '[INTERFACE] COMMAND CENTER ACTIVE.'}
if(u==='2'||u==='RADAR'||u==='MAP'){J.switchView('radar');return '[INTERFACE] GEOLOCATION RADAR ACTIVE.'}
if(u==='3'||u==='HOLO'||u==='HOLOGRAM'){J.switchView('hologram');return '[INTERFACE] GLOBAL HOLOGRAM ACTIVE. VIDEO CORE STARTED.'}
if(u==='4'||u==='TRACK'||u==='TRACKING'){J.switchView('tracking');return '[INTERFACE] PERSONAL TRACKING PANEL ACTIVE. START TRACKING MANUALLY.'}
if(u==='R'){document.body.classList.remove('accent-green','accent-amber');document.body.classList.add('accent-red');J.settings.accentColor='red';J.store.set('settings',J.settings);return '[THEME] RED ALERT INTERFACE ENABLED.'}
if(u==='B'){document.body.classList.remove('accent-green','accent-red','accent-amber');J.settings.accentColor='cyan';J.store.set('settings',J.settings);return '[THEME] BLUE / CYAN INTERFACE ENABLED.'}
if(u==='G'){document.body.classList.remove('accent-red','accent-amber');document.body.classList.add('accent-green');J.settings.accentColor='green';J.store.set('settings',J.settings);return '[THEME] RADAR GREEN INTERFACE ENABLED.'}
if(u==='A'){document.body.classList.remove('accent-red','accent-green');document.body.classList.add('accent-amber');J.settings.accentColor='amber';J.store.set('settings',J.settings);return '[THEME] AMBER INTERFACE ENABLED.'}
if(u==='STATUS'){return `[SYSTEM STATUS]\nTIME: ${new Date().toLocaleString()}\nINTERFACE: ${J.currentView.toUpperCase()}\nLOCATION: ${J.$('#locStatus').textContent}\nTRACKING: ${J.location.watchId===null?'OFF':'ON'}\nLOCK: AVAILABLE (DEMO)`}
if(u==='HELP'||u==='?'){return '[AVAILABLE COMMANDS]\n1 / HOME — COMMAND CENTER\n2 / RADAR — MAP INTERFACE\n3 / HOLO — EARTH VIDEO INTERFACE\n4 / TRACK — LOCATION HISTORY\nST — SETTINGS\nL — LOCK\nUL — BYPASS DEMO LOCK (IF ENABLED)\nR / B / G / A — CHANGE ACCENT COLOUR\nMAP <PLACE> — SEARCH MAP\nTRACK ON / TRACK OFF — LOCATION TRACKING\nSTATUS — SYSTEM STATUS\nHELP — COMMAND LIST'}
if(u.startsWith('MAP ')){J.switchView('radar');J.maps.search(t.slice(4));return '[MAP] SEARCH REQUEST SENT: '+t.slice(4)}
if(u==='TRACK ON'){J.switchView('tracking');J.$('#trackStart').click();return '[LOCATION] TRACKING START REQUESTED. BROWSER PERMISSION REQUIRED.'}
if(u==='TRACK OFF'){J.$('#trackStop').click();return '[LOCATION] TRACKING STOP REQUESTED.'}
if(/hello|hi\b|হ্যালো|নমস্কার/i.test(t))return '[GREETING] HELLO, OPERATOR.\n[JARVIS] SYSTEM IS READY. TYPE HELP FOR COMMANDS.';
if(/time|সময়|সময়/i.test(t))return '[CLOCK] '+new Date().toLocaleTimeString();
if(/date|তারিখ/i.test(t))return '[DATE] '+new Date().toLocaleDateString();
if(/weather|আবহাওয়া|আবহাওয়া/i.test(t))return '[WEATHER MODULE] LIVE WEATHER SERVICE IS NOT CONNECTED IN THIS FREE BUILD.';
if(/help|সাহায্য/i.test(t))return '[HELP] I CAN RUN INTERFACE COMMANDS, SEARCH MAPS, START USER-CONTROLLED LOCATION TRACKING, AND SHOW LOCAL STATUS. TYPE HELP FOR COMMAND LIST.';
return '[MESSAGE RECEIVED]\nLOCAL ASSISTANT MODE: ACTIVE\nADVANCED AI CORE: NOT CONNECTED\n\nI can process the built-in commands. For open-ended intelligent answers, a local AI model or online AI service must be connected separately.'};
J.sendChat=()=>{let input=J.$('#chatInput'),t=input.value.trim();if(!t)return;J.addChat('user',t);input.value='';let reply=J.respond(t);if(reply)J.addChat('response',reply)};
