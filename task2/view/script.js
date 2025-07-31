const gpsLoading = document.getElementById('gpsLoading');
      document.querySelector('[gps-camera]').addEventListener('gps-camera-update-position', () => {
        if (gpsLoading) gpsLoading.style.display = 'none';
      });
      setTimeout(() => {
        if (gpsLoading) gpsLoading.style.display = 'none';
      }, 15000);

function weiter() {
  window.location.href = "https://t10018.github.io/schnitzeljagd/task2/index.html";
}
