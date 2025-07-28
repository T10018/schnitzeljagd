// Referenzen zu HTML-Elementen
const collectBtn = document.getElementById('collectBtn');
const counterText = document.getElementById('counter');
let collected = 0; // Anzahl der eingesammelten Modelle
const total = 3;   // Gesamtzahl der Modelle

// IDs der AR-Modelle
const modelIds = ['model1', 'model2', 'model3'];
const collectedModels = new Set(); // Bereits eingesammelte Modelle

// Klick auf den Einsammel-Button
collectBtn.addEventListener('click', () => {
  const cam = document.querySelector('[gps-camera]');
  const camPos = cam.components['gps-camera'].currentCoords;

  modelIds.forEach(id => {
    if (collectedModels.has(id)) return;

    const model = document.getElementById(id);
    const entityCoords = model.getAttribute('gps-entity-place');

    // Entfernung zwischen Kamera und Modell berechnen
    const dist = getDistance(
      camPos.latitude, camPos.longitude,
      entityCoords.latitude, entityCoords.longitude
    );

    // Wenn in Reichweite (15 Meter)
    if (dist < 15) {
      model.parentNode.removeChild(model); // Modell aus Szene entfernen
      collectedModels.add(id);
      collected++;
      counterText.innerText = `Gefunden: ${collected} / ${total}`;

      // Wenn alle Modelle eingesammelt → Endbildschirm zeigen
      if (collected === total) {
        document.getElementById('endScreen').style.display = 'flex';
      }
    }
  });
});

// Haversine-Formel zur Entfernungsberechnung zwischen zwei GPS-Punkten
function getDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  const R = 6371e3; // Erdradius in Metern
  const φ1 = toRad(lat1), φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Ladebildschirm beim Start
const gpsLoading = document.getElementById('gpsLoading');

// Wenn GPS-Position gefunden → Ladebildschirm ausblenden
document.querySelector('[gps-camera]').addEventListener('gps-camera-update-position', () => {
  if (gpsLoading) gpsLoading.style.display = 'none';
});

// Sicherheits-Timeout: nach 15 Sekunden Ladebildschirm auch ohne GPS ausblenden
setTimeout(() => {
  if (gpsLoading) gpsLoading.style.display = 'none';
}, 15000);
