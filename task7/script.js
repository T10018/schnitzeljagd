function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) return;

  const answer = selectedOption.value;
  const totalPoints = 200;//parseInt(localStorage.getItem("points")) || 0;

  // Entscheidungslogik:
  if (totalPoints >= 264 && answer === "verteidigen") {
    showSuccess("Richtige Entscheidung: Die Brücke wird gehalten!");
  } else if (totalPoints >= 264 && answer === "zerstören") {
    showFailure("Falsche Entscheidung: Ihr hättet die Brücke verteidigen sollen.");
  } else if (totalPoints < 264 && answer === "verteidigen") {
    showFailure("Falsche Entscheidung: Mit so wenigen Truppen ist Verteidigung unmöglich.");
  } else if (totalPoints < 264 && answer === "zerstören") {
    showSuccess("Richtige Entscheidung: Rückzug durch Brückensprengung gesichert!");
  } else {
    showFailure("Unbekannter Fehler.");
  }
}

function showSuccess(text) {
  document.body.innerHTML = `<h1 style='text-align:center;margin-top:40vh;'>${text}</h1>`;
  // Optional: window.location.href = "nächste Seite";
}

function showFailure(text) {
  document.body.innerHTML = `<h1 style='text-align:center;margin-top:40vh;'>${text}</h1>`;
  // Optional: setTimeout(() => window.location.reload(), 3000);
}
