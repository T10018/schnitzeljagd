// ===== TIPP-POPUP ANZEIGEN =====
// Wird beim Klick auf den Glühbirnen-Button aufgerufen
function showTip() {
  // CSS-Klasse "active" hinzufügen: blendet Overlay und Popup ein (per CSS-Animation)
  document.getElementById('popupOverlay').classList.add('active');
  document.getElementById('tipPopup').classList.add('active');
  
  // Scrollen im Hintergrund deaktivieren, solange das Popup offen ist
  document.body.style.overflow = 'hidden';
}

// ===== TIPP-POPUP VERSTECKEN =====
// Wird beim Klick auf X, das Overlay oder per ESC aufgerufen
function hideTip() {
  // CSS-Klasse "active" entfernen: blendet Overlay und Popup aus (per CSS-Animation)
  document.getElementById('popupOverlay').classList.remove('active');
  document.getElementById('tipPopup').classList.remove('active');
  
  // Scrollen im Hintergrund wieder aktivieren
  document.body.style.overflow = 'auto';
}

// ===== ANTWORT ÜBERPRÜFEN =====
// Wird beim Klick auf "Weiter" aufgerufen
function checkAnswer() {
  // Aktuell ausgewählten Radio-Button holen
  const selectedOption = document.querySelector('input[name="option"]:checked');
  
  // Abbrechen, falls der Spieler noch keine Option ausgewählt hat
  if (!selectedOption) return;

  // Wert des ausgewählten Radio-Buttons auslesen ("sichern" oder "unbrauchbar")
  const answer = selectedOption.value;
  
  // Auswahl im sessionStorage speichern, damit sie beim Zurücknavigieren wiederhergestellt werden kann
  // try/catch: verhindert Absturz, falls sessionStorage nicht verfügbar ist (z.B. privater Modus)
  try {
    sessionStorage.setItem('task4_selectedOption', answer);
  } catch (e) { /* Fehler ignorieren */ }

  if (answer === 'unbrauchbar') {
    // Richtige Antwort: Pulver unbrauchbar machen verhindert, dass der Feind es nutzen kann
    window.location.href = "../../speeches/speech_task4_ok.html";
  } else {
    // Falsche Antwort: Pulver sichern ist riskant – Feind könnte es erbeuten
    window.location.href = "../../speeches/speech_task4_nok.html";
  }
}

// ===== ZURÜCK-NAVIGATION =====
// Wird beim Klick auf "Zurück" aufgerufen
function goBack() {
  // Flag im sessionStorage setzen, damit die Speech-Seite weiß, dass wir von Task4 kommen
  // (wird dort genutzt, um direkt zur letzten Dialogzeile zu springen)
  try {
    sessionStorage.setItem('fromTask4', '1');
  } catch (e) { /* Fehler ignorieren */ }

  // Zurück zur Einführungs-Sprechszene von Aufgabe 4
  window.location.href = "../../speeches/speech_task4_start.html";
}

// ===== VORHERIGE AUSWAHL WIEDERHERSTELLEN =====
// Wird automatisch ausgeführt, sobald die Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
  // Gespeicherte Auswahl aus dem sessionStorage laden
  try {
    const prev = sessionStorage.getItem('task4_selectedOption');
    if (prev) {
      // Radio-Button mit dem gespeicherten Wert suchen und wieder anhaken
      const el = document.querySelector('input[name="option"][value="' + prev + '"]');
      if (el) el.checked = true; // Auswahl wiederherstellen, falls Element gefunden
    }
  } catch (e) { /* Fehler ignorieren */ }
});