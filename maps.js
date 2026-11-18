const J=window.JARVIS;
J.maps={};
function createMap(id,center=[22.5726,88.3639],zoom=12){if(!window.L)return null;let map=L.map(id,{zoomControl:true}).setView(center,zoom);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);return map}
J.maps.command=createMap('commandMap');J.maps.radar=createMap('radarMap',[22.5726,88.3639],11);J.maps.tracking=createMap('trackingMap',[22.5726,88.3639],12);
J.maps.markers={};
J.maps.setMarker=(which,lat,lon,label='YOUR POSITION')=>{let m=J.maps[which];if(!m)return;m.setView([lat,lon],15);if(J.maps.markers[which])J.maps.markers[which].remove();J.maps.markers[which]=L.marker([lat,lon]).addTo(m).bindPopup(label).openPopup()};
J.maps.search=async(q)=>{if(!q.trim())return;try{let r=await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+encodeURIComponent(q));let a=await r.json();if(!a.length){J.toast('PLACE NOT FOUND');return}let p=a[0];J.maps.radar.setView([+p.lat,+p.lon],14);if(J.maps.markers.radar)J.maps.markers.radar.remove();J.maps.markers.radar=L.marker([+p.lat,+p.lon]).addTo(J.maps.radar).bindPopup(p.display_name).openPopup();J.$('#radarCoords').textContent=`MAP CENTER: ${(+p.lat).toFixed(4)}, ${(+p.lon).toFixed(4)}`;J.toast('MAP LOCATION FOUND')}catch{J.toast('MAP SEARCH FAILED — CHECK INTERNET')}};
J.$('#mapSearchBtn').onclick=()=>J.maps.search(J.$('#mapSearch').value);
J.$('#mapSearch').addEventListener('keydown',e=>{if(e.key==='Enter')J.maps.search(e.target.value)});
J.maps.invalidate=()=>setTimeout(()=>Object.values(J.maps).forEach(x=>{if(x&&x.invalidateSize)x.invalidateSize()}),150);
const observer=new MutationObserver(()=>J.maps.invalidate());document.querySelectorAll('.interface').forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));
