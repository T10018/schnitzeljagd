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

// Prüft die ausgewählten Antworten
function checkAnswer() {
  const selected = Array.from(document.querySelectorAll('input[name="item"]:checked')).map(cb => cb.value);
  const correct = ['Brot', 'Bandagen', 'Gewehre'];
  const isCorrect = selected.length === correct.length && correct.every(item => selected.includes(item));
  if (isCorrect) {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:40vh;'>Nächste Aufgabe wird geladen...</h1>";
  }
}
