//PRIMARY GAME LOOP
function update() {
  if(inGame) {
    e.clearCanvas(new FillRenderer("#0c2608", "white", 1, 0));
    //renderGrass();
    updatePools();
    updateBackgroundItems();
    updateFlock();
    updateCamera();
    updateCursor();
    managePlacement();
    updateSelection();
    updateEffects();
    updateHud();
  } else {
    e.clearCanvas(new FillRenderer("white", "white", 1, 0));
    updateHomescreen();
  }
  buttonCount++;
}

//TIMER INTERVAL
const timer = setInterval(update, 10);
