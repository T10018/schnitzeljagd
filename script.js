// Fix für mobile 100vh-Probleme
/*function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setViewportHeight();
window.addEventListener('resize', setViewportHeight);

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startscreen").classList.add("hidden");
  document.getElementById("ar-screen").classList.remove("hidden");

  const scene = document.createElement("a-scene");
  scene.setAttribute("embedded", "");
  scene.setAttribute("vr-mode-ui", "enabled: false");
  scene.setAttribute("renderer", "logarithmicDepthBuffer: true;");
  scene.setAttribute("arjs", "sourceType: webcam; debugUIEnabled: false;");

  scene.innerHTML = `
    <a-marker preset="hiro">
      <a-box position="0 0.5 0" material="color: red;"></a-box>
    </a-marker>
    <a-entity camera></a-entity>
  `;

  document.getElementById("ar-screen").appendChild(scene);
});
*/