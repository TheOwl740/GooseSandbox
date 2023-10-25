//jshint maxerr: 10000

//PRIMITIVES
let inApp = true;
let placing = false;
let selected = false;
let inGame = false;
let buttonCount = 0;

//OBJECTS
const flock = {
  geese: [
  ],
  eggs: [
  ]
};
const selectBox = {
  rotation: 0,
  size: 1,
  sv: 0.01
};
const hudCollider = new Polygon([
  new Tri([
    new Vector2(-32, 32),
    new Vector2(32, 32),
    new Vector2(32, -32)
  ], 0),
  new Tri([
    new Vector2(32, -32),
    new Vector2(-32, -32),
    new Vector2(-32, 32)
  ], 0)
]);
const menuButtonCollider = new Polygon([
  new Tri([
    new Vector2(-210, 48),
    new Vector2(210, 48),
    new Vector2(210, -48)
  ], 0),
  new Tri([
    new Vector2(210, -48),
    new Vector2(-210, -48),
    new Vector2(-210, 48)
  ], 0)
]);
const cameraAcceleration = {
  x: 0,
  y: 0
};
const effects = [
];
const map = {
  pools: [
  ],
  backgroundItems: [
  ]
};
const names = [
  "Ronald",
  "Baughman",
  "Shirley",
  "Reginald",
  "David",
  "Randy",
  "Schlov",
  "Henry",
  "Dani",
  "Max",
  "Ruby",
  "Dora",
  "Diego",
  "Dingus",
  "Clark",
  "Kent",
  "Ghengis",
  "Adolf",
  "Johnny",
  "Kim",
  "Andrew",
  "Addy",
  "Sidney",
  "Nicholas",
  "Mackenzie",
  "Flaka",
  "Piper",
  "Dick",
  "Richard",
  "Joanne",
  "James",
  "Grey",
  "Slayd",
  "Ethan",
  "April",
  "Wednesday",
  "Reganne",
  "May",
  "Mel",
  "Nick",
  "Tom",
  "Shanning",
  "Susan",
  "Susanne",
  "Adam",
  "Joe",
  "Biden",
  "Donald",
  "Yobama",
  "Barack",
  "Harold",
  "Heather",
  "Elsa",
  "Quinn",
  "Eric",
  "Brian",
  "Jamison",
  "Oliver",
  "Olive",
  "Amy",
  "Slain",
  "Jen",
  "Clart",
  "Gooesey McGooseface",
  "Gatorade",
  "Choccy",
  "Marie",
  "Heins",
  "Cammie",
  "Ron",
  "Jeremy",
  "Hammond",
  "Clarkson",
  "Daniel",
  "Kriner",
  "Kate",
  "Conner",
  "Levi"
];

//IMAGE TREE CREATION
const images = {
  owlLogo: e.generateImage("images/owlLogo.png"),
  logo: e.generateImage("images/logo.png"),
  buttons: {
    off: e.generateImage("images/buttons/off.png"),
    newGame: e.generateImage("images/buttons/newGame.png"),
    openSave: e.generateImage("images/buttons/openSave.png"),
    quit: e.generateImage("images/buttons/quit.png"),
  },
  effects: {
    honk: e.generateImage("images/effects/honk.png"),
  },
  misc: {
    box: e.generateImage("images/misc/box.png"),
    actionBox: e.generateImage("images/misc/actionBox.png"),
    cross: e.generateImage("images/misc/cross.png"),
    selectBox: e.generateImage("images/misc/selectBox.png"),
    key: e.generateImage("images/misc/key.png")
  },
  goose: {
    run: [
      e.generateImage("images/goose/run/run0.png"),
      e.generateImage("images/goose/run/run1.png")
    ],
    idle: e.generateImage("images/goose/idle.png"),
    sit: e.generateImage("images/goose/sit.png"),
    honk: [
      e.generateImage("images/goose/honk/honk0.png"),
      e.generateImage("images/goose/honk/honk1.png"),
      e.generateImage("images/goose/honk/honk2.png"),
      e.generateImage("images/goose/honk/honk3.png")
    ],
    waterHonk: [
      e.generateImage("images/goose/waterHonk/honk0.png"),
      e.generateImage("images/goose/waterHonk/honk1.png"),
      e.generateImage("images/goose/waterHonk/honk2.png"),
      e.generateImage("images/goose/waterHonk/honk3.png")
    ],
    swimming: e.generateImage("images/goose/swimming.png")
  },
  egg: [
    e.generateImage("images/egg/egg0.png"),
    e.generateImage("images/egg/egg1.png")
  ],
  tiles: {
    water: {
      main: e.generateImage("images/tiles/water/main.png"),
      corner: e.generateImage("images/tiles/water/corner.png"),
      lowRes: {
        main: e.generateImage("images/tiles/water/lowRes/main.png"),
        corner: e.generateImage("images/tiles/water/lowRes/corner.png")
      }
    },
    grass: [
      e.generateImage("images/tiles/grass/grass0.png"),
      e.generateImage("images/tiles/grass/grass1.png"),
      e.generateImage("images/tiles/grass/grass2.png"),
    ],
    rocks: [
      e.generateImage("images/tiles/rocks/rock0.png"),
      e.generateImage("images/tiles/rocks/rock1.png"),
      e.generateImage("images/tiles/rocks/rock2.png"),
    ]
  }
};

//CLASSES
class Goose {
  constructor(transform, size) {
    this.inWater = false;
    this.size = size;
    this.type = "goose";
    this.transform = transform;
    this.name = names[e.randomNum(0, names.length - 1)];
    this.collider = new Polygon([
      new Tri([
        new Vector2(-28 * size, 32 * size),
        new Vector2(28 * size, 32 * size),
        new Vector2(28 * size, -32 * size)
      ], 3),
      new Tri([
        new Vector2(28 * size, -32 * size),
        new Vector2(-28 * size, -32 * size),
        new Vector2(-28 * size, 32 * size)
      ], 3)
    ]);
    this.objectCollider = new Polygon([
      new Tri([
        new Vector2(-5 * size, -20 * size),
        new Vector2(5 * size, -20 * size),
        new Vector2(0 * size, -24 * size)
      ], 3),
    ]);
    this.adult = true;
    this.renderer = new ImageRenderer(images.goose.idle, 1, 0, 0, 64 * size, 96 * size, false, false, false, true);
    this.target = "hanging";
    this.frameExtender = 0;
  }
  determineAction() {
    if(!this.adult) {
      if(this.adult < 10000) {
        this.adult++;
      } else {
        this.adult = true;
        this.size = e.randomNum(18, 22) / 20;
        if(e.randomNum(1, 100) === 1) {
          this.size = 3;
        }
        if(e.randomNum(1, 100) === 2) {
          this.size = 0.7;
        }
        this.renderer.w = 64 * this.size;
        this.renderer.h = 96 * this.size;
      }
    }
    //DETERMINE
    if(this.target.type !== "absolute" && this.target !== "sitting") {
      if(this.target === "idle") {
        if(e.randomNum(1, 750) === 1) {
          this.target = new Vector2(this.transform.x + (e.randomNum(-200, 200)) * this.size, this.transform.y + (e.randomNum(-200, 200)) * this.size);
        }
        if(e.randomNum(1, 3000) === 1) {
          this.target = "honk";
        }
        if(e.randomNum(1, 6000) === 1 && this.adult && !this.inWater) {
          this.target = "egg";
        }
      } else if(this.target.type === "transform") {
        if(e.randomNum(1, 400) === 1) {
          this.target = new Vector2(this.transform.x + (e.randomNum(-200, 200)) * this.size, this.transform.y + (e.randomNum(-200, 200)) * this.size);
        }
        if(e.calcDistance(this.transform, this.target) < 5) {
          this.target = "idle";
          this.frameExtender = 0;
        }
      } else if(this.target === "honk") {
        if(this.frameExtender > 96) {
          this.target = "idle";
          this.frameExtender = 0;
        }
      } else if(this.target === "egg" && this.adult && !this.inWater) {
        if(this.frameExtender > 96) {
          flock.eggs.push(new Egg(this.transform, this.size));
          this.target = "idle";
          this.frameExtender = 0;
        }
      }
    } else if(this.target.type === "absolute") {
      if(e.calcDistance(this.transform, this.target.transform) < 5) {
        this.target = "idle";
        this.frameExtender = 0;
      }
    }
    //DETECT WATER COLLISIONS
    this.inWater = false;
    for(h = 0; h < map.pools.length; h++) {
      if(e.calcDistance(this.transform, map.pools[h].transform) < 1200) {
        if(e.detectCollision(this.transform, this.objectCollider, map.pools[h].transform, map.pools[h].collider)) {
          this.inWater = true;
        }
      }
    }
    //EXECUTE
    if(this.target.type === "transform") {
      this.transform = e.roundVector(e.addVector(this.transform, e.calcRotationalVector2(e.calcAngle(this.transform, this.target), this.size)), 1);
    }
    if(this.target.type === "absolute") {
      this.transform = e.roundVector(e.addVector(this.transform, e.calcRotationalVector2(e.calcAngle(this.transform, this.target.transform), this.size)), 1);
    }
  }
  render() {
    //RESET ROTATION
    this.transform.r = 0;
    //DETERMINE ANIMATION STATE
    if(this.target === "idle") {
      if(this.inWater) {
        this.renderer.image = images.goose.swimming;
      } else {
        this.renderer.image = images.goose.idle;
      }
    }
    if(this.target === "sitting") {
      this.renderer.image = images.goose.sit;
    }
    if(this.target.type === "transform") {
      if(this.inWater) {
        this.renderer.image = images.goose.swimming;
      } else {
        if(this.frameExtender < 15) {
          this.frameExtender++;
          this.renderer.image = images.goose.run[Math.floor(this.frameExtender / 8)];
        } else {
          this.frameExtender = 0;
          this.renderer.image = images.goose.run[0];
        }
      }
      if(this.transform.x < this.target.x) {
        this.renderer.hf = true;
      } else {
        this.renderer.hf = false;
      }
    }
    if(this.target.type === "absolute") {
      if(this.inWater) {
        this.renderer.image = images.goose.swimming;
      } else {
        if(this.frameExtender < 15) {
          this.frameExtender++;
          this.renderer.image = images.goose.run[Math.floor(this.frameExtender / 8)];
        } else {
          this.frameExtender = 0;
          this.renderer.image = images.goose.run[0];
        }
      }
      if(this.transform.x < this.target.transform.x) {
        this.renderer.hf = true;
      } else {
        this.renderer.hf = false;
      }
    }
    if(this.target === "honk") {
      this.frameExtender++;
      if(this.frameExtender < 64) {
        if(this.inWater) {
          this.renderer.image = images.goose.waterHonk[Math.floor(this.frameExtender / 16)];
        } else {
          this.renderer.image = images.goose.honk[Math.floor(this.frameExtender / 16)];
        }
      } else if(this.frameExtender < 96) {
        if(this.frameExtender === 64) {
          effects.push(new Effect(this.transform, 0, 50, 75 * this.size, 40 * this.size, images.effects.honk, 50));
        }
        if(this.inWater) {
          this.renderer.image = images.goose.waterHonk[3];
        } else {
          this.renderer.image = images.goose.honk[3];
        }
      }
    }
    if(this.target === "egg") {
      this.frameExtender++;
      if(this.frameExtender < 96) {
        this.renderer.image = images.goose.sit;
      }
    }
    //RENDER
    e.renderImage(this.transform, this.renderer);
    e.renderText(this.transform, new Text("Trebuchet MS", this.name, 5 - (this.name.length * 6 * this.size), 50, 18 * this.size, false, false), new FillRenderer("black", "black", 0.6));
    if(e.pressedKeys.includes("k") && e.pressedKeys.includes("l")) {
      e.renderPolygon(this.transform, this.collider, null, new BorderRenderer("white", 1, 2));
      e.renderPolygon(this.transform, this.objectCollider, null, new BorderRenderer("#9999FF", 1, 2));
    }
  }
}

class Egg {
  constructor(transform, size) {
    this.transform = transform;
    this.timer = 0;
    this.size = size;
    this.type = "egg";
    this.destroy = false;
    this.renderer = new ImageRenderer(images.egg[0], 1, 0, -20, 16 * size, 24 * size, false, false, false, true);
  }
  update() {
    this.timer++;
    //DETERMINE CRACK STATE
    if(e.randomNum(this.timer, 5000) === this.timer || this.timer > 5000) {
      if(this.renderer.image === images.egg[0]) {
        this.renderer.image = images.egg[1];
        this.timer = 3000;
      } else {
        flock.geese.push(new Goose(this.transform, 0.5));
        flock.geese[flock.geese.length - 1].adult = 0;
        this.destroy = true;
      }
    }
  }
  render() {
    e.renderImage(this.transform, this.renderer);
  }
}

class Effect {
  constructor(transform, x, y, w, h, effect, time) {
    this.type = "effect";
    this.transform = transform;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.effect = effect;
    this.time = time;
  }
  update() {
    this.time--;
  }
  render() {
    e.renderImage(this.transform, new ImageRenderer(this.effect, 0.8, this.x, this.y, this.w, this.h, false, false, false, true));
    if(e.pressedKeys.includes("k") && e.pressedKeys.includes("l")) {
      //e.renderPolygon(this.transform, this.collider, null, new BorderRenderer("white", 1, 2));
    }
  }
}

class BackgroundItem {
  constructor(transform, size, type) {
    this.type = type;
    this.transform = transform;
    this.size = size;
    this.skin = e.randomNum(0, 2);
    this.renderer = new ImageRenderer(this.type === "grass" ? images.tiles.grass[this.skin] : images.tiles.rocks[this.skin] , 1, 0, 0, this.size, this.size, false, false, false, true);
  }
  update() {
    e.renderImage(this.transform, this.renderer);
  }
}



//FUNCTIONS
function updateHomescreen() {
  //RENDER MENU
  e.renderImage(new Vector2(420, -175), new ImageRenderer(images.logo, 1, 0, 0, 828, 324, false, false, true, false));
  e.renderImage(new Vector2(e.w - 53, (e.h * -1) + 53), new ImageRenderer(images.owlLogo, 1, 0, 0, 96, 96, false, false, true, false));
  e.renderImage(new Vector2(e.w - 300, e.h / -2), new ImageRenderer(images.goose.idle, 1, 0, 0, (e.h - 50) * 0.75, (e.h - 50) * 1, false, false, true, false));
  e.renderImage(new Vector2(220, (e.h * -1) + 280), new ImageRenderer(images.buttons.newGame, 1, 0, 0, 420, 96, false, false, true, false));
  //e.renderImage(new Vector2(220, (e.h * -1) + 170), new ImageRenderer(images.buttons.openSave, 1, 0, 0, 420, 96, false, false, true, false));
  if(inApp) {
    e.renderImage(new Vector2(220, (e.h * -1) + 60), new ImageRenderer(images.buttons.quit, 1, 0, 0, 420, 96, false, false, true, false));
    if(e.detectCollision(e.mouse.absolute, null, new Vector2(220, (e.h * -1) + 60), menuButtonCollider) && e.mouse.clicking) {
      window.close();
    }
  }
  /*if(e.detectCollision(e.mouse.absolute, null, new Vector2(220, (e.h * -1) + 170), menuButtonCollider) && e.mouse.clicking) {
    openSaveGame();
  }*/
  if(e.detectCollision(e.mouse.absolute, null, new Vector2(220, (e.h * -1) + 280), menuButtonCollider) && e.mouse.clicking) {
    inGame = true;
    generateMap();
  }
}

function updateHud() {
  //RENDER HUD
  e.renderImage(new Vector2(254, -60), new ImageRenderer(images.logo, 0.8, 0, 0, 276, 108, false, false, true, false));
  e.renderText(new Vector2((e.w / 2) - 70 - (flock.geese.length.toString().length * 10), -40), new Text("Trebuchet MS", "Geese: " + flock.geese.length, 0, 0, 40, true, false), new FillRenderer("black", "black", 0.8, 0));
  e.renderImage(new Vector2(53, -53), new ImageRenderer(images.owlLogo, 1, 0, 0, 96, 96, false, false, true, false));
  e.renderImage(new Vector2(e.w - 40, (e.h * -1) + 40), new ImageRenderer(images.misc.box, 0.8, 0, 0, 64, 64, false, false, true, false));
  e.renderImage(new Vector2(e.w - 40, (e.h * -1) + 40), new ImageRenderer(images.misc.cross, 0.8, 0, 0, 40, 40, false, false, true, false));
  e.renderImage(new Vector2(e.w - 20, (e.h * -1) + 20), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, false, false, true, false));
  e.renderText(new Vector2(e.w - 25, (e.h * -1) + 15), new Text("Trebuchet MS", "0", 0, 0, 20, true, false), new FillRenderer("black", "black", 0.8, 0));
  e.renderImage(new Vector2(e.w - 110, (e.h * -1) + 40), new ImageRenderer(images.misc.box, 0.8, 0, 0, 64, 64, false, false, true, false));
  e.renderImage(new Vector2(e.w - 113, (e.h * -1) + 40), new ImageRenderer(images.goose.idle, 0.8, 0, 0, 48, 64, false, false, true, false));
  e.renderImage(new Vector2(e.w - 90, (e.h * -1) + 20), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, false, false, true, false));
  e.renderText(new Vector2(e.w - 95, (e.h * -1) + 15), new Text("Trebuchet MS", "1", 0, 0, 20, true, false), new FillRenderer("black", "black", 0.8, 0));
  e.renderImage(new Vector2(e.w - 180, (e.h * -1) + 40), new ImageRenderer(images.misc.box, 0.8, 0, 0, 64, 64, false, false, true, false));
  e.renderImage(new Vector2(e.w - 180, (e.h * -1) + 40), new ImageRenderer(images.egg[0], 0.8, 0, 0, 25, 38, false, false, true, false));
  e.renderImage(new Vector2(e.w - 160, (e.h * -1) + 20), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, false, false, true, false));
  e.renderText(new Vector2(e.w - 165, (e.h * -1) + 15), new Text("Trebuchet MS", "2", 0, 0, 20, true, false), new FillRenderer("black", "black", 0.8, 0));
  if(inApp) {
    e.renderImage(new Vector2(e.w - 37, -37), new ImageRenderer(images.buttons.off, 0.8, 0, 0, 64, 64, false, false, true, false));
  }
  //HUD INTERACTION
  if(e.detectCollision(e.mouse.absolute, null, new Vector2(e.w - 37, -37), hudCollider) && e.mouse.clicking && inApp) {
    window.close();
  }
}

function bC() {
  if(buttonCount > 30) {
    buttonCount = 0;
    return true;
  } else {
    return false;
  }
}

function updateCursor() {
  if(placing !== false) {
    e.element.style = "cursor: copy";
  } else if(selected !== false) {
    e.element.style = "cursor: move";
  } else {
    e.element.style = "cursor: crosshair";
  }
}

function managePlacement() {
  if(e.pressedKeys.includes("1") && bC() && placing.type !== "goose") {
    buttonCount = 0;
    placing = new Goose(new Vector2(), e.randomNum(18, 22) / 20);
    Object.assign(placing.transform, e.mouse.dynamic);
    selected = false;
  }
  if(e.pressedKeys.includes("2") && bC() && placing.type !== "egg") {
    buttonCount = 0;
    placing = new Egg(new Vector2(), 1);
    Object.assign(placing.transform, e.mouse.dynamic);
    selected = false;
  }
  if(placing !== false) {
    Object.assign(placing.transform, e.mouse.dynamic);
    placing.render();
    if(e.mouse.clicking) {
      if(placing.type === "goose") {
        flock.geese.push(placing);
        placing.target = "idle";
      }
      if(placing.type === "egg") {
        flock.eggs.push(placing);
      }
      placing = false;
    }
    if(e.pressedKeys.includes("0") && bC()) {
      placing = false;
    }
  }
}

function updateFlock() {
  for(d = 0; d < flock.eggs.length; d++) {
    flock.eggs[d].update();
    flock.eggs[d].render();
    if(flock.eggs[d].destroy) {
      flock.eggs.splice(d, 1);
      d--;
    }
  }
  for(i = 0; i < flock.geese.length; i++) {
    flock.geese[i].determineAction();
    flock.geese[i].render();
  }
  if(flock.geese.length > 1) {
    for(o = 1; o < flock.geese.length; o++) {
      if(flock.geese[o].transform.y > flock.geese[o - 1].transform.y) {
        flock.geese.splice(o - 1, 0, flock.geese[o]);
        flock.geese.splice(o + 1, 1);
      }
    }
  }
}

function updateCamera() {
  if(e.pressedKeys.includes("q")) {
    e.camera.zoom *= 0.99;
  }
  if(e.pressedKeys.includes("e")) {
    e.camera.zoom *= 1.01;
  }
  if(cameraAcceleration.x > 3) {
    cameraAcceleration.x = 3;
  }
  if(cameraAcceleration.x < -3) {
    cameraAcceleration.x = -3;
  }
  if(cameraAcceleration.y > 3) {
    cameraAcceleration.y = 3;
  }
  if(cameraAcceleration.y < -3) {
    cameraAcceleration.y = -3;
  }
  if(cameraAcceleration.x > 0) {
    cameraAcceleration.x -= 0.05;
  }
  if(cameraAcceleration.x < 0) {
    cameraAcceleration.x += 0.05;
  }
  if(cameraAcceleration.y > 0) {
    cameraAcceleration.y -= 0.05;
  }
  if(cameraAcceleration.y < 0) {
    cameraAcceleration.y += 0.05;
  }
  if(e.pressedKeys.includes("w")) {
    cameraAcceleration.y += 0.1;
  } else if(e.pressedKeys.includes("s")) {
    cameraAcceleration.y -= 0.1;
  }
  if(e.pressedKeys.includes("d")) {
    cameraAcceleration.x += 0.1;
  }
  if(e.pressedKeys.includes("a")) {
    cameraAcceleration.x -= 0.1;
  }
  if(Math.abs(cameraAcceleration.x) < 0.05 && Math.abs(cameraAcceleration.x > 0)) {
    cameraAcceleration.x = 0;
  }
  if(Math.abs(cameraAcceleration.y) < 0.05 && Math.abs(cameraAcceleration.y > 0)) {
    cameraAcceleration.y = 0;
  }
  e.camera.y += cameraAcceleration.y;
  e.camera.x += cameraAcceleration.x;
}

function saveGame() {
  
}

function openSaveGame() {
  //window.showOpenFilePicker();
}

function updateSelection() {
  for(a = 0; a < flock.geese.length; a++) {
    if(e.detectCollision(e.mouse.dynamic, null, flock.geese[a].transform, flock.geese[a].collider) && e.mouse.clicking) {
      selected = flock.geese[a];
    }
  }
  if(selected !== false) {
    //RENDER SELECT BOX
    e.renderImage(new Vector3(selected.transform.x, selected.transform.y, selectBox.rotation), new ImageRenderer(images.misc.selectBox, (selectBox.size - 0.01), 0, 0, 78 * selected.size * selectBox.size, 78 * selected.size * selectBox.size, false, false, false, false));
    //UPDATE SELECT BOX
    selectBox.rotation++;
    selectBox.size += selectBox.sv;
    if(selectBox.size > 1) {
      selectBox.sv -= 0.0005;
    }
    if(selectBox.size <= 1) {
      selectBox.sv += 0.0005;
    }
    //DETECT ABSOLUTE DIRECTION
    if(e.mouse.clicking && e.calcDistance(e.mouse.dynamic, selected.transform) > 50) {
      selected.target = {
        type: "absolute",
        transform: {}
      };
      Object.assign(selected.target.transform, e.mouse.dynamic);
    }
    //RENDER ACTIONS
    e.renderImage(new Vector2(34, (e.h * -1) + 40), new ImageRenderer(images.misc.actionBox, 0.8, 0, 0, 64, 64, false, false, true, false));
    e.renderImage(new Vector2(31, (e.h * -1) + 40), new ImageRenderer(images.goose.sit, 0.8, 0, 0, 48, 64, false, false, true, false));
    e.renderImage(new Vector2(51, (e.h * -1) + 20), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, false, false, true, false));
    e.renderText(new Vector2(45, (e.h * -1) + 15), new Text("Trebuchet MS", "z", 0, 0, 20, true, false), new FillRenderer("black", "black", 0.8, 0));
    e.renderImage(new Vector2(103, (e.h * -1) + 40), new ImageRenderer(images.misc.actionBox, 0.8, 0, 0, 64, 64, false, false, true, false));
    e.renderImage(new Vector2(103, (e.h * -1) + 40), new ImageRenderer(images.goose.honk[3], 0.8, 0, 0, 48, 64, false, false, true, false));
    e.renderImage(new Vector2(123, (e.h * -1) + 20), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, false, false, true, false));
    e.renderText(new Vector2(118, (e.h * -1) + 15), new Text("Trebuchet MS", "x", 0, 0, 20, true, false), new FillRenderer("black", "black", 0.8, 0));
    e.renderImage(new Vector2(172, (e.h * -1) + 40), new ImageRenderer(images.misc.actionBox, 0.8, 0, 0, 64, 64, false, false, true, false));
    e.renderImage(new Vector2(172, (e.h * -1) + 40), new ImageRenderer(images.egg[0], 0.8, 0, 0, 36, 54, false, false, true, false));
    e.renderImage(new Vector2(192, (e.h * -1) + 20), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, false, false, true, false));
    e.renderText(new Vector2(187, (e.h * -1) + 15), new Text("Trebuchet MS", "c", 0, 0, 20, true, false), new FillRenderer("black", "black", 0.8, 0));
    if(!selected.adult || selected.inWater) {
      e.renderImage(new Vector2(172, (e.h * -1) + 40), new ImageRenderer(images.misc.cross, 1, 0, 0, 50, 50, false, false, true, false));
    }
    if(selected.inWater) {
      e.renderImage(new Vector2(34, (e.h * -1) + 40), new ImageRenderer(images.misc.cross, 1, 0, 0, 50, 50, false, false, true, false));
    }
    //DETECT ACTION INPUT
    if(e.pressedKeys.includes("z") && bC()) {
      if(selected.target === "sitting" ) {
        selected.target = "idle";
      } else if(!selected.inWater) {
        selected.target = "sitting";
      }
    }
    if(e.pressedKeys.includes("x") && bC()) {
      selected.target = "honk";
    }
    if(e.pressedKeys.includes("c") && bC() && selected.adult && !selected.inWater) {
      selected.target = "egg";
    }
  }
}

function updateEffects() {
  for(s = 0; s < effects.length; s++) {
    effects[s].update();
    effects[s].render();
    if(effects[s].time < 0) {
      effects.splice(s, 1);
      s--;
    }
  }
}

function generateMap() {
  for(g = 0; g < 2000; g++) {
    map.backgroundItems.push(new BackgroundItem(new Vector2(e.randomNum(-10000, 10000), e.randomNum(-10000, 10000)), e.randomNum(40, 60), "grass"));
    map.backgroundItems.push(new BackgroundItem(new Vector2(e.randomNum(-10000, 10000), e.randomNum(-10000, 10000)), e.randomNum(40, 60), "rock"));
  }
}

function updatePools() {
  for(h = 0; h < map.pools.length; h++) {
    map.pools[h].render();
  }
}

function updateBackgroundItems() {
  for(f = 0; f < map.backgroundItems.length; f++) {
    map.backgroundItems[f].update();
  }
}



//STARTUP
e.camera.x = e.w / -2;
e.camera.y = e.h / 2;
