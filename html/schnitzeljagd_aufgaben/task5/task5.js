// ===== ELEMENT-REFERENZEN =====
const collectBtn = document.getElementById('collectBtn');   // Einsammel-Button
const counterText = document.getElementById('counter');     // Zähler-Anzeige (z.B. "2 / 3")
let collected = 0; // Anzahl der bisher eingesammelten Modelle (startet bei 0)
const total = 3;   // Gesamtzahl der zu findenden Dorfbewohner

// ===== MODELL-KONFIGURATION =====
// IDs aller AR-Modelle in der A-Frame Szene
const modelIds = ['model1', 'model2', 'model3'];

// Set speichert die IDs bereits eingesammelter Modelle (verhindert Doppelzählung)
const collectedModels = new Set();

// ===== EINSAMMEL-LOGIK =====
// Wird beim Klick auf den "Einsammeln"-Button ausgeführt
collectBtn.addEventListener('click', () => {
  // Aktuelle GPS-Position der Kamera (= Position des Spielers) auslesen
  const cam = document.querySelector('[gps-camera]');
  const camPos = cam.components['gps-camera'].currentCoords;

  // Alle Modelle durchgehen und prüfen, ob sie in Reichweite sind
  modelIds.forEach(id => {
    // Bereits eingesammelte Modelle überspringen
    if (collectedModels.has(id)) return;

    // GPS-Koordinaten des aktuellen Modells aus dem HTML-Attribut auslesen
    const model = document.getElementById(id);
    const entityCoords = model.getAttribute('gps-entity-place');

    // Entfernung zwischen Spielerposition und Modellposition berechnen (Haversine-Formel)
    const dist = getDistance(
      camPos.latitude, camPos.longitude,
      entityCoords.latitude, entityCoords.longitude
    );

    // Modell einsammeln, wenn Spieler weniger als 15 Meter entfernt ist
    if (dist < 15) {
      model.parentNode.removeChild(model); // Modell aus der AR-Szene entfernen
      collectedModels.add(id);             // Modell als eingesammelt markieren
      collected++;                         // Zähler erhöhen
      counterText.innerText = `${collected} / ${total}`; // Anzeige aktualisieren

      // Alle Modelle eingesammelt → Endbildschirm anzeigen
      if (collected === total) {
        document.getElementById('endScreen').style.display = 'flex';
      }
    }
  });
});

// ===== ENTFERNUNGSBERECHNUNG (Haversine-Formel) =====
// Berechnet die Luftliniendistanz zwischen zwei GPS-Koordinaten in Metern
function getDistance(lat1, lon1, lat2, lon2) {
  // Hilfsfunktion: Grad in Bogenmaß (Radiant) umrechnen
  function toRad(x) {
    return x * Math.PI / 180;
  }

  const R = 6371e3;                    // Erdradius in Metern (6.371.000 m)
  const φ1 = toRad(lat1), φ2 = toRad(lat2); // Breitengrade in Radiant
  const Δφ = toRad(lat2 - lat1);      // Differenz der Breitengrade
  const Δλ = toRad(lon2 - lon1);      // Differenz der Längengrade

  // Haversine-Formel: berechnet den Zwischenwert 'a' für die Kugelgeometrie
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  
  // Endergebnis: Entfernung in Metern über den großen Kreisbogen
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ===== TIMER =====
const timerElement = document.getElementById('timer'); // Referenz auf Timer-Anzeige
let secondsElapsed = 0;  // Vergangene Sekunden seit Spielstart
let timerStarted = false; // Verhindert mehrfaches Starten des Timers
let timerInterval = null; // Referenz auf das Intervall (für späteres Stoppen)

// Startet den Spieltimer (wird nur einmal ausgeführt)
function startTimer() {
  if (timerStarted) return; // Abbrechen, falls Timer bereits läuft
  timerStarted = true;

  // Jede Sekunde die verstrichene Zeit aktualisieren
  timerInterval = setInterval(() => {
    secondsElapsed++;
    // Minuten und Sekunden berechnen und mit führenden Nullen formatieren (z.B. "02:05")
    const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const seconds = String(secondsElapsed % 60).padStart(2, '0');
    timerElement.innerText = `${minutes}:${seconds}`; // Timer-Anzeige aktualisieren
  }, 1000); // Intervall: 1000ms = 1 Sekunde

  // Tipp-Button einblenden, sobald das Spiel gestartet ist
  const tipBtn = document.getElementById('tipBtn');
  if (tipBtn) tipBtn.style.display = 'block';
}

// ===== GPS-LADEBILDSCHIRM =====
const gpsLoading = document.getElementById('gpsLoading');

// Sobald AR.js eine GPS-Position empfängt: Ladebildschirm ausblenden und Timer starten
document.querySelector('[gps-camera]').addEventListener('gps-camera-update-position', () => {
  if (gpsLoading) gpsLoading.style.display = 'none';
  startTimer(); // Timer startet, sobald GPS-Position gefunden wurde
});

// ===== FALLBACK-TIMER =====
// Falls GPS nach 5 Sekunden noch keine Position gefunden hat:
// Ladebildschirm trotzdem ausblenden und Spiel starten
// Hinweis: Kommentar im Original sagt "15 Sekunden", tatsächlicher Wert ist 5000ms = 5 Sekunden
setTimeout(() => {
  if (gpsLoading) gpsLoading.style.display = 'none';
  startTimer(); // Timer auch ohne GPS-Fix starten
}, 5000);

// ===== TIPP-POPUP ANZEIGEN =====
// Wird beim Klick auf den Glühbirnen-Button aufgerufen
function showTip() {
  // CSS-Klasse "active" hinzufügen: blendet Overlay und Popup ein
  document.getElementById('popupOverlay').classList.add('active');
  document.getElementById('tipPopup').classList.add('active');
  document.body.style.overflow = 'hidden'; // Scrollen im Hintergrund deaktivieren
}

// ===== TIPP-POPUP VERSTECKEN =====
// Wird beim Klick auf X, das Overlay oder per ESC aufgerufen
function hideTip() {
  // CSS-Klasse "active" entfernen: blendet Overlay und Popup aus
  document.getElementById('popupOverlay').classList.remove('active');
  document.getElementById('tipPopup').classList.remove('active');
  document.body.style.overflow = 'auto'; // Scrollen im Hintergrund wieder aktivieren
}

// ===== POPUP PER ESC-TASTE SCHLIEßEN =====
// Globaler Event-Listener: hört auf alle Tastendrücke im gesamten Dokument
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') hideTip(); // ESC-Taste gedrückt → Popup schließen
});