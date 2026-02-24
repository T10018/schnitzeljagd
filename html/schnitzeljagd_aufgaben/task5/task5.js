const gpsLoading = document.getElementById('gpsLoading');
const camera = document.querySelector('[gps-camera]');
const model = document.getElementById('testModel');

// Modell erst anzeigen, wenn GPS da ist
model.setAttribute('visible', false);

// GPS-Event von AR.js
camera.addEventListener('gps-camera-update-position', (e) => {
  const coords = camera.components['gps-camera'].currentCoords;

  if (!coords) return;

  console.log(
    'GPS FIX:',
    coords.latitude,
    coords.longitude,
    'accuracy:',
    coords.accuracy
  );

  // Ladebildschirm ausblenden
  if (gpsLoading) gpsLoading.style.display = 'none';

  // Modell EINMALIG sichtbar machen
  model.setAttribute('visible', true);
});