// ===== FINALE ENTSCHEIDUNG AUSWERTEN =====
// Wird beim Klick auf "Weiter" aufgerufen
// Kombiniert die Antwort des Spielers mit dem bisherigen Punktestand
// und leitet zum passenden Spielausgang weiter
function checkAnswer() {
  // Aktuell ausgewählten Radio-Button holen
  const selectedOption = document.querySelector('input[name="option"]:checked');
  
  // Abbrechen, falls der Spieler noch keine Option ausgewählt hat
  if (!selectedOption) return;

  // Wert des ausgewählten Radio-Buttons auslesen ("verteidigen" oder "zerstören")
  const answer = selectedOption.value;

  // Gesamtpunktestand des Spielers laden
  // Hinweis: localStorage-Version ist auskommentiert – aktuell wird ein fester Testwert (200)
  // verwendet, damit die Logik ohne echte Punktevergabe getestet werden kann
  // Im finalen Spiel sollte diese Zeile aktiviert werden:
  // const totalPoints = parseInt(localStorage.getItem("points")) || 0;
  const totalPoints = 200;

  // ===== ENTSCHEIDUNGSBAUM: 4 mögliche Spielausgänge =====
  // Der Ausgang hängt von zwei Faktoren ab:
  //   1. Punktestand (>= 264 = viele richtige Entscheidungen, < 264 = viele Fehler)
  //   2. Gewählte Option (verteidigen oder zerstören)

  if (totalPoints >= 264 && answer === "verteidigen") {
    // Bester Ausgang: Genug Punkte + Verteidigung → Brücke wird erfolgreich gehalten
    window.location.href = "../../speeches/speech_task7_case1.html";

  } else if (totalPoints >= 264 && answer === "zerstören") {
    // Guter Ausgang: Genug Punkte + Zerstörung → geordneter Rückzug, Stadt geht verloren
    window.location.href = "../../speeches/speech_task7_case2.html";

  } else if (totalPoints < 264 && answer === "verteidigen") {
    // Schlechter Ausgang: Zu wenig Punkte + Verteidigung → Brücke fällt dem Feind in die Hände
    window.location.href = "../../speeches/speech_task7_case3.html";

  } else if (totalPoints < 264 && answer === "zerstören") {
    // Alternativer Ausgang: Zu wenig Punkte + Zerstörung → Brücke brennt, aber zu hoher Preis
    window.location.href = "../../speeches/speech_task7_case4.html";

  } else {
    // Fehlerfall: Sollte durch die obigen Bedingungen nie erreicht werden
    alert("Unbekannter Fehler.");
  }
}