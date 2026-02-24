/***********************
 * SPIEL-KONFIGURATION
 ***********************/
const SHOW_DISTANCE = 30;      // Modell sichtbar ab 30 m
const COLLECT_DISTANCE = 8;    // Einsammeln ab 8 m

const REQUIRED_SAMPLES = 12;   // GPS-Messungen für Stabilisierung
const MAX_ACCURACY = 25;       // Max. akzeptierte GPS-Ungenauigkeit (m)

/***********************
 * HTML-REFERENZEN
 ***********************/
const collectBtn = document.getElementById('collectBtn');
const counterText = document.getElementById('counter');
const gpsLoading = document.getElementById('gpsLoading');
const timerElement = document.getElementById('timer');

const modelIds = ['model1', 'model2', 'model3'];

/***********************
 * SPIELSTATUS
 ***********************/
let collected = 0;
const total = 3;
const collectedModels = new Set();

/***********************
 * GPS-STABILISIERUNG
 ***********************/
let gpsSamples = [];
let stablePosition = null;

const camera = document.querySelector('[gps-camera]');

camera.addEventListener('gps-camera-update-position', () => {
  const coords = camera.components['gps-camera'].currentCoords;
  if (!coords || coords.accuracy > MAX_ACCURACY) return;

  if (!stablePosition) {
    gpsSamples.push(coords);

    if (gpsSamples.length >= REQUIRED_SAMPLES) {
      stablePosition = getWeightedAverage(gpsSamples);

      if (gpsLoading) gpsLoading.style.display = 'none';
      startTimer();
    }
  }
});

/***********************
 * GPS-FALLBACK
 ***********************/
setTimeout(() => {
  if (!stablePosition) {
    if (gpsLoading) gpsLoading.style.display = 'none';
    startTimer();
  }
}, 15000);

/***********************
 * MODELL-UPDATE (ZONEN)
 ***********************/
setInterval(() => {
  if (!stablePosition) return;

  let canCollectAny = false;

  modelIds.forEach(id => {
    if (collectedModels.has(id)) return;

    const model = document.getElementById(id);
    if (!model) return;

    const coords = model.getAttribute('gps-entity-place');

    const dist = getDistance(
      stablePosition.latitude,
      stablePosition.longitude,
      coords.latitude,
      coords.longitude
    );

    // ❌ Unsichtbar
    if (dist > SHOW_DISTANCE) {
      model.setAttribute('visible', false);
      return;
    }

    // 👁️ Sichtbar
    model.setAttribute('visible', true);

    // ✅ Einsammelbar
    if (dist <= COLLECT_DISTANCE) {
      canCollectAny = true;
    }
  });

  collectBtn.disabled = !canCollectAny;
}, 500);

/***********************
 * EINSAMMELN
 ***********************/
collectBtn.addEventListener('click', () => {
  if (!stablePosition) return;

  modelIds.forEach(id => {
    if (collectedModels.has(id)) return;

    const model = document.getElementById(id);
    if (!model) return;

    const coords = model.getAttribute('gps-entity-place');

    const dist = getDistance(
      stablePosition.latitude,
      stablePosition.longitude,
      coords.latitude,
      coords.longitude
    );

    if (dist <= COLLECT_DISTANCE) {
      model.remove();
      collectedModels.add(id);
      collected++;

      counterText.innerText = `${collected} / ${total}`;

      if (collected === total) {
        document.getElementById('endScreen').style.display = 'flex';
      }
    }
  });
});

/***********************
 * TIMER
 ***********************/
let secondsElapsed = 0;
let timerStarted = false;
let timerInterval = null;

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;

  timerInterval = setInterval(() => {
    secondsElapsed++;
    const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const seconds = String(secondsElapsed % 60).padStart(2, '0');
    timerElement.innerText = `${minutes}:${seconds}`;
  }, 1000);

  const tipBtn = document.getElementById('tipBtn');
  if (tipBtn) tipBtn.style.display = 'block';
}

/***********************
 * GPS-HILFSFUNKTIONEN
 ***********************/
function getWeightedAverage(samples) {
  let lat = 0, lon = 0, weightSum = 0;

  samples.forEach(s => {
    const w = 1 / s.accuracy;
    lat += s.latitude * w;
    lon += s.longitude * w;
    weightSum += w;
  });

  return {
    latitude: lat / weightSum,
    longitude: lon / weightSum
  };
}

function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = x => x * Math.PI / 180;
  const R = 6371e3;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/***********************
 * TIP-POPUP
 ***********************/
function showTip() {
  document.getElementById('popupOverlay').classList.add('active');
  document.getElementById('tipPopup').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideTip() {
  document.getElementById('popupOverlay').classList.remove('active');
  document.getElementById('tipPopup').classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideTip();
});