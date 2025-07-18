document.getElementById("startButton").addEventListener("click", () => {
  // UI umschalten
  document.getElementById("startscreen").classList.add("hidden");
  document.getElementById("ar-screen").classList.remove("hidden");

  // A-Frame Szene dynamisch erzeugen
  const arScene = document.createElement("a-scene");
  arScene.setAttribute("embedded", "");
  arScene.setAttribute("vr-mode-ui", "enabled: false");
  arScene.setAttribute("renderer", "logarithmicDepthBuffer: true;");
  arScene.setAttribute("arjs", "sourceType: webcam; debugUIEnabled: false;");

  arScene.innerHTML = `
    <a-marker preset="hiro">
      <a-box position="0 0.5 0" material="color: red;"></a-box>
    </a-marker>
    <a-entity camera></a-entity>
  `;

  document.getElementById("ar-screen").appendChild(arScene);
});
