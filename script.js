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
