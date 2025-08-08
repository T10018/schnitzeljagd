// Prüft, ob Eingabe korrekt ist
function checkAnswer(){
  const input=document.getElementById("userInput").value.trim().toLowerCase();
  const solution="der wagen im park ist blockiert";
  if(input===solution){
    window.location.href = "../../speeches/speech_task1_ok.html";
  }else{
    document.getElementById("feedback").textContent="Leider falsch – versuch es nochmal!";
  }
}

// Beendet Aufgabe manuell
function skipTask(){
  window.location.href = "../../speeches/speech_task1_nok.html";
}

// Zeigt Tippfenster
function showTip(){
  document.getElementById("popupOverlay").classList.add("active");
  document.getElementById("tipPopup").classList.add("active");
  document.body.style.overflow="hidden";
}

// Versteckt Tippfenster
function hideTip(){
  document.getElementById("popupOverlay").classList.remove("active");
  document.getElementById("tipPopup").classList.remove("active");
  document.body.style.overflow="hidden";
}

// Ermöglicht Schließen des Popups per ESC
document.addEventListener("keydown",function(e){
  if(e.key==="Escape")hideTip();
});
