//PRIMARY GAME LOOP
function update() {
  if(inGame) {
    updateEntities();
    updateCamera();
    updateCursor();
    applyInputs();
    updateRenderPipeline(false);
  } else {
    updateHomescreen();
  }
  buttonCount++;
}

function render() {
  if(inGame) {
    e.clearCanvas(new FillRenderer("#0c2608", "white", 1, 0));
    renderEntities();
    renderHUD();
  } else {
    e.clearCanvas(new FillRenderer("white", "white", 1, 0));
    renderHomescreen();
  }
}

//TIMER INTERVAL
const updateTimer = setInterval(update, 10);
const renderTimer = setInterval(render, 10);
