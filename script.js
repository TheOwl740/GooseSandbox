//PRIMARY GAME LOOP
function update() {
  if(inGame) {
    updateEntities();
    updateCamera();
    updateCursor();
    applyInputs();
    updateRenderPipeline();
    updatePopulationStats();
    //updatePerformance();
    EC++;
  } else {
    updateHomescreen();
    HEC++;
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
const renderTimer = setInterval(render, 16);
const load = setTimeout(loadFinished, 5000);
