const collectBtn = document.getElementById('collectBtn');
const counterText = document.getElementById('counter');
let collected = 0;
const total = 3;

const modelIds = ['model1', 'model2', 'model3'];
const collectedModels = new Set();

collectBtn.addEventListener('click', () => {
  const cam = document.querySelector('[gps-camera]');
  const camPos = cam.components['gps-camera'].currentCoords;

  modelIds.forEach(id => {
    if (collectedModels.has(id)) return;

    const model = document.getElementById(id);
    const entityCoords = model.getAttribute('gps-entity-place');

    const dist = getDistance(camPos.latitude, camPos.longitude, entityCoords.latitude, entityCoords.longitude);

    if (dist < 15) {
      model.parentNode.removeChild(model);
      collectedModels.add(id);
      collected++;
      counterText.innerText = `Gefunden: ${collected} / ${total}`;
      if (collected === total) {
        document.getElementById('endScreen').style.display = 'flex';
      }
    }
  });
});

function getDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) { return x * Math.PI / 180; }
  const R = 6371e3;
  const φ1 = toRad(lat1), φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const gpsLoading = document.getElementById('gpsLoading');

document.querySelector('[gps-camera]').addEventListener('gps-camera-update-position', () => {
  if (gpsLoading) gpsLoading.style.display = 'none';
});

setTimeout(() => {
  if (gpsLoading) gpsLoading.style.display = 'none';
}, 15000);
