// Öffnet das Tipp-Fenster
function showTip() {
  document.getElementById('popupOverlay').classList.add('active');
  document.getElementById('tipPopup').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Schließt das Tipp-Fenster
function hideTip() {
  document.getElementById('popupOverlay').classList.remove('active');
  document.getElementById('tipPopup').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// checkAnswer bleibt wie gehabt, plus wir speichern optional die Auswahl
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) return; // nichts tun, wenn keine Auswahl

  const answer = selectedOption.value;
  // optional: Auswahl speichern, damit sie beim Zurückkehren wieder gesetzt werden kann
  try {
    sessionStorage.setItem('task4_selectedOption', answer);
  } catch (e) { /* ignore */ }

  if (answer === 'unbrauchbar') {
    window.location.href = "../../speeches/speech_task4_ok.html";
  } else {
    window.location.href = "../../speeches/speech_task4_nok.html";
  }
}

// goBack: markiert in sessionStorage, dass wir von Task4 kommen und geht zur Speech-Seite
function goBack() {
  try {
    sessionStorage.setItem('fromTask4', '1');
  } catch (e) { /* ignore */ }

  // Pfad anpassen falls deine Datei anders heißt/woanders liegt:
  window.location.href = "../../speeches/speech_task4_start.html";
}

// beim Laden der Aufgaben-Seite vorherige Auswahl wiederherstellen (optional)
document.addEventListener('DOMContentLoaded', () => {
  try {
    const prev = sessionStorage.getItem('task4_selectedOption');
    if (prev) {
      const el = document.querySelector('input[name="option"][value="' + prev + '"]');
      if (el) el.checked = true;
    }
  } catch (e) { /* ignore */ }
});