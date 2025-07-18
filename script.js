document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startscreen").classList.add("hidden");
  document.getElementById("ar-screen").classList.remove("hidden");

  // Hier starten wir später die AR-Kamera (in Schritt 2)
  console.log("AR-Ansicht wird geladen...");
});
