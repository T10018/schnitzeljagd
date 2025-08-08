const gpsLoading = document.getElementById('gpsLoading');
const weiterBtn = document.getElementById('weiterBtn');

function showWeiterButton() {
  gpsLoading.style.display = 'none';
  weiterBtn.style.display = 'block';
}

// Wenn GPS-Position gefunden → Ladebildschirm ausblenden und Button zeigen
document.querySelector('[gps-camera]').addEventListener('gps-camera-update-position', () => {
  showWeiterButton();
});

// Sicherheits-Timeout: nach 15 Sekunden ebenfalls anzeigen
setTimeout(() => {
  showWeiterButton();
}, 15000);

function weiter() {
  window.location.href = "https://t10018.github.io/schnitzeljagd/task2/index.html";
}
