// ===== ANTWORT ÜBERPRÜFEN =====
// Wird beim Klick auf "Überprüfen" aufgerufen
function checkAnswer() {
  // Eingabe des Spielers holen, Leerzeichen am Anfang/Ende entfernen und
  // in Kleinbuchstaben umwandeln (Groß-/Kleinschreibung wird ignoriert)
  const input = document.getElementById("userInput").value.trim().toLowerCase();
  
  // Korrekte Lösung: "Der Wagen im Park ist blockiert" (Caesar-Code -3 entschlüsselt)
  const solution = "der wagen im park ist blockiert";
  
  if (input === solution) {
    // Richtige Antwort: Weiterleitung zur Erfolgs-Seite
    window.location.href = "../../speeches/speech_task1_ok.html";
  } else {
    // Falsche Antwort: Fehlermeldung im Feedback-Element anzeigen
    document.getElementById("feedback").textContent = "Leider falsch – versuch es nochmal!";
  }
}

// ===== AUFGABE AUFGEBEN =====
// Wird beim Klick auf "Aufgeben" aufgerufen – leitet zur Misserfolgs-Seite weiter
function skipTask() {
  window.location.href = "../../speeches/speech_task1_nok.html";
}

// ===== TIPP-POPUP ANZEIGEN =====
// Wird beim Klick auf den Glühbirnen-Button aufgerufen
function showTip() {
  // CSS-Klasse "active" hinzufügen: blendet Overlay und Popup ein (per CSS-Animation)
  document.getElementById("popupOverlay").classList.add("active");
  document.getElementById("tipPopup").classList.add("active");
  
  // Scrollen im Hintergrund deaktivieren, solange das Popup offen ist
  document.body.style.overflow = "hidden";
}

// ===== TIPP-POPUP VERSTECKEN =====
// Wird beim Klick auf X, das Overlay oder per ESC aufgerufen
function hideTip() {
  // CSS-Klasse "active" entfernen: blendet Overlay und Popup aus (per CSS-Animation)
  document.getElementById("popupOverlay").classList.remove("active");
  document.getElementById("tipPopup").classList.remove("active");
  
  // Scrollen bleibt deaktiviert (Hinweis: hier könnte "auto" statt "hidden" sinnvoller sein,
  // damit der Hintergrund nach dem Schließen wieder scrollbar wird)
  document.body.style.overflow = "hidden";
}

// ===== POPUP PER ESC-TASTE SCHLIEßEN =====
// Globaler Event-Listener: hört auf alle Tastendrücke im gesamten Dokument
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") hideTip(); // ESC-Taste gedrückt → Popup schließen
});