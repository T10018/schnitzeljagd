// ===== KONFIGURATION =====
// Array mit den IDs aller AR-Modell-Elemente in der A-Frame Szene
// (aktuell nur ein Modell, Array ermöglicht spätere Erweiterung)
const modelIds = ['model1'];

// ===== LADE-ANZEIGE =====
// Referenz auf das GPS-Ladebildschirm-Element (wird ausgeblendet, sobald GPS bereit ist)
const gpsLoading = document.getElementById('gpsLoading');

// ===== GPS-EVENT-LISTENER =====
// Hört auf das A-Frame/AR.js-Ereignis "gps-camera-update-position"
// Dieses Ereignis wird ausgelöst, sobald das Gerät eine GPS-Position gefunden hat
document.querySelector('[gps-camera]').addEventListener('gps-camera-update-position', () => {
  // Ladebildschirm ausblenden, sobald GPS-Position ermittelt wurde
  if (gpsLoading) gpsLoading.style.display = 'none';
  
  // Timer starten – misst z.B. wie lange der Spieler an dieser Station ist
  startTimer();
});

// ===== FALLBACK-TIMER =====
// Falls die GPS-Suche zu lange dauert oder fehlschlägt:
// Nach 5000ms (= 5 Sekunden) wird der Ladebildschirm trotzdem ausgeblendet
// und der Timer gestartet, damit das Spiel nicht hängen bleibt
// Hinweis: Kommentar im Original sagt "15 Sekunden", tatsächlicher Wert ist aber 5000ms = 5 Sekunden
setTimeout(() => {
  if (gpsLoading) gpsLoading.style.display = 'none';
  startTimer(); // Timer auch ohne GPS-Fix starten
}, 5000);

// ===== WEITERLEITUNG =====
// Wird beim Klick auf den "Weiter"-Button aufgerufen
// Leitet zur Einführungs-Sprechszene von Aufgabe 2 weiter
function next() {
    window.location.href = "../../../speeches/speech_task2_start.html";
}