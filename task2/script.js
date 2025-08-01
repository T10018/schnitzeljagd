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
  const warning = document.getElementById('warningMessage');

  // Wenn weniger als 3 ausgewählt wurden – Hinweis anzeigen
  if (selected.length < 3) {
    warning.style.display = 'block';
    return;
  }

  // Hinweis ausblenden, falls vorher gezeigt
  warning.style.display = 'none';

  const isCorrect = selected.length === correct.length && correct.every(item => selected.includes(item));

  if (isCorrect) {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:40vh;'>Richtig! Die nächste Aufgabe wird geladen...</h1>";
    ////window.location.href = "https://t10018.github.io/schnitzeljagd/task2/xxxxxxxx";
  } else {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:40vh;'>Leider falsch...</h1>";
    ////window.location.href = "https://t10018.github.io/schnitzeljagd/task2/xxxxxxxx";
  }
}
