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

// Tippfenster mit ESC schließen
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') hideTip();
});

// Prüft die ausgewählte Antwort
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) return; // Nichts tun, wenn keine Auswahl

  const answer = selectedOption.value;
  if (answer === 'unbrauchbar') {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:40vh;'>Richtige Lösung! Aufgabe erfüllt.</h1>";
  } else {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:40vh;'>Falsche Auswahl. Bitte nochmals versuchen.</h1>";
  }
}
