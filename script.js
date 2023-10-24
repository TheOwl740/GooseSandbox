//PRIMARY GAME LOOP
function update() {
  if(inGame) {
    e.methods.clearCanvas(new FillRenderer("#0c2608", "white", 1, 0));
    //renderGrass();
    updatePools();
    updateFlock();
    updateCamera();
    updateCursor();
    managePlacement();
    updateSelection();
    updateEffects();
    updateHud();
  } else {
    e.methods.clearCanvas(new FillRenderer("white", "white", 1, 0));
    updateHomescreen();
  }
  buttonCount++;
}

//TIMER INTERVAL
var timer = setInterval(update, 10);