// IDs der AR-Modelle
const modelIds = ['model1'];

// Ladebildschirm beim Start
const gpsLoading = document.getElementById('gpsLoading');

document.querySelector('[gps-camera]').addEventListener('gps-camera-update-position', () => {
  if (gpsLoading) gpsLoading.style.display = 'none';
  startTimer();  // Timer startet, sobald GPS gefunden
});

// Fallback: Startet Timer nach 15 Sekunden trotzdem
setTimeout(() => {
  if (gpsLoading) gpsLoading.style.display = 'none';
  startTimer();  // Falls GPS zu lange braucht
}, 5000);

function next() {
// Fade-out-Effekt vor dem Seitenwechsel
  document.body.classList.add('fade-out');
  requestAnimationFrame(() => {
  setTimeout(() => {
    window.location.href = "../../../speeches/speech_task2_start.html";
  }, 500);
  });
}