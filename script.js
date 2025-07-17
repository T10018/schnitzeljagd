document.getElementById('start-button').addEventListener('click', () => {
  // Startscreen ausblenden
  document.getElementById('start-screen').style.display = 'none';

  // AR-Container anzeigen (später kommt AR-Kamera rein)
  document.getElementById('ar-container').style.display = 'block';

  // TODO: AR-Kamera aktivieren (in Schritt 2)
});
