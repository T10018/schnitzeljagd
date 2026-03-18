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

// ===== POPUP PER ESC-TASTE SCHLIEßEN =====
// Globaler Event-Listener: hört auf alle Tastendrücke im gesamten Dokument
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') hideTip(); // ESC-Taste gedrückt → Popup schließen
});

// ===== ANTWORT ÜBERPRÜFEN =====
// Wird beim Klick auf "Weiter" aufgerufen
function checkAnswer() {
  // Alle aktuell angehakten Checkboxen sammeln und deren value-Attribute in ein Array umwandeln
  const selected = Array.from(document.querySelectorAll('input[name="item"]:checked'))
                        .map(cb => cb.value);

  // Die korrekte Auswahl: Brot (Nahrung), Bandagen (Medizin) und Gewehrkiste (Waffen)
  // = genau 100 kg (30 + 20 + 50) und taktisch sinnvoll
  const correct = ['Brot', 'Bandagen', 'Gewehre'];
  
  // Referenz auf das Warnmeldungs-Element
  const warning = document.getElementById('warningMessage');

  // Mindestanzahl-Prüfung: weniger als 3 ausgewählt → Warnmeldung anzeigen und abbrechen
  if (selected.length < 3) {
    warning.style.display = 'block'; // Warnmeldung einblenden
    return;                          // Funktion vorzeitig beenden (keine Weiterleitung)
  }

  // Warnmeldung ausblenden, falls sie beim vorherigen Versuch angezeigt wurde
  warning.style.display = 'none';

  // Korrektheitsprüfung:
  // 1. Gleiche Anzahl ausgewählter Objekte wie in der Lösung
  // 2. Jedes korrekte Objekt ist in der Auswahl des Spielers enthalten
  const isCorrect = selected.length === correct.length && 
                    correct.every(item => selected.includes(item));

  if (isCorrect) {
    // Richtige Auswahl: Weiterleitung zur Erfolgs-Seite
    window.location.href = "../../speeches/speech_task2_ok.html";
  } else {
    // Falsche Auswahl (z.B. zu viele oder falsche Gegenstände): Weiterleitung zur Misserfolgs-Seite
    window.location.href = "../../speeches/speech_task2_nok.html";
  }
}