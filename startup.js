//jshint maxerr: 10000

//PRIMITIVES
//loop
let i, ii;
let f, ff;
let c, cc;
//misc
//startup bools
let [inApp, inGame, loaded] = [true, false, false];
//counters
let [HEC, EC, buttonCount] = [0, 0, 0];
let player;
let LP = 0;
let FR = 16;
let [births, deaths, ratio] = [0, 0, 0];

//OBJECTS
const populationLog = [
];
/*
const performanceLog = [
];
*/
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
const renderPipeline = [
];
/*
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
*/

//IMAGE TREE CREATION
const images = {
  icon: e.generateImage("images/icon.png"),
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
    key: e.generateImage("images/misc/key.png"),
    owlLogo: e.generateImage("images/misc/owlLogo.png"),
    logo: e.generateImage("images/misc/logo.png"),
    loading: e.generateImage("images/misc/loading.png")
  },
  geese: [
    e.generateImage("images/geese/goose0.png"),
    e.generateImage("images/geese/goose1.png"),
    e.generateImage("images/geese/goose2.png"),
    e.generateImage("images/geese/goose3.png")
  ],
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
  constructor(transform, age) {
    this.destroy = false;
    this.inWater = false;
    this.type = "goose";
    this.transform = transform;
    //this.name = names[e.randomNum(0, names.length - 1)];
    this.AI = true;
    this.age = age;
    this.STB = images.geese[e.randomNum(0, 0)];
    this.frame = new Vector2(0, 0);
    if(this.age < 30) {
      this.size = 0.5;
    } else {
      this.size = 1;
    }
    this.collider = new Polygon([
      new Tri([
        new Vector2(-28 * this.size, 32 * this.size),
        new Vector2(28 * this.size, 32 * this.size),
        new Vector2(28 * this.size, -32 * this.size)
      ], 3),
      new Tri([
        new Vector2(28 * this.size, -32 * this.size),
        new Vector2(-28 * this.size, -32 * this.size),
        new Vector2(-28 * this.size, 32 * this.size)
      ], 3)
    ]);
    this.renderer = new SpriteRenderer(this.STB, 4, 4, 1, 0, 0, 64 * this.size, 64 * this.size, 0, false, false, false, true);
    this.target = "idle";
    this.frameExtender = 0;
  }
  update() {
    //aging
    this.age += 0.01;
    if(this.age < 30) {
      this.size = 0.5;
    } else if(this.age > 500 && this.AI === true) {
      deaths++;
      this.destroy = true;
    } else {
      this.size = 1;
    }
    this.renderer.w = 64 * this.size;
    this.renderer.h = 64 * this.size;
    //ai control
    if(this.AI) {
      if(this.target === "idle") {
        if(e.randomNum(1, 500) === 1) {
          this.target = new Vector2(this.transform.x + (e.randomNum(-200, 200)) * this.size, this.transform.y + (e.randomNum(-200, 200)) * this.size);
        }
        if(e.randomNum(1, 1000) === 1) {
          this.target = "honk";
        }
        if(e.randomNum(1, 2000) === 1 && this.age > 30 && !this.inWater && flock.geese.length < 2500) {
          this.target = "egg";
        }
      } else if(this.target.type === "vector2") {
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
      } else if(this.target === "egg" && this.age > 30 && !this.inWater) {
        if(this.frameExtender > 96) {
          flock.eggs.push(new Egg(this.transform, this.size));
          addToPipeline(flock.eggs);
          this.target = "idle";
          this.frameExtender = 0;
        }
      }
      //execute movement
      if(this.target.type === "vector2") {
        this.transform = e.roundVector(e.addVector(this.transform, e.calcRotationalVector2(e.calcAngle(this.transform, this.target), this.size)), 1);
      }
    } else {
      //player control
      if(this.target === "honk") {
        if(this.frameExtender > 96) {
          this.target = "idle";
          this.frameExtender = 0;
        }
      } else if(this.target === "egg") {
        if(this.frameExtender > 96) {
          flock.eggs.push(new Egg(new Vector2(this.transform.x, this.transform.y), this.size));
          addToPipeline(flock.eggs);
          this.target = "idle";
          this.frameExtender = 0;
        }
      } else if(e.pressedKeys.includes("w") || e.pressedKeys.includes("a") || e.pressedKeys.includes("s") || e.pressedKeys.includes("d")) {
        if(e.pressedKeys.includes("w")) {
          this.transform.y += 1;
          this.target = "moving";
        }
        if(e.pressedKeys.includes("s")) {
          this.transform.y -= 1;
          this.target = "moving";
        }
        if(e.pressedKeys.includes("a")) {
          this.transform.x -= 1;
          this.target = "moving";
        }
        if(e.pressedKeys.includes("d")) {
          this.transform.x += 1;
          this.target = "moving";
        }
      } else {
        this.target = "idle";
      }
      //action inputs
      if(e.pressedKeys.includes("q") && BC()) {
        player.target = "honk";
      }
      if(e.pressedKeys.includes("e") && BC() && player.age > 30 === true && !player.inWater) {
        player.target = "egg";
      }
    }
  }
  render() {
    //set animations
    if(this.target === "idle") {
      if(this.inWater) {
        [this.frame.x, this.frame.y] = [2, 0];
      } else {
        [this.frame.x, this.frame.y] = [0, 0];
      }
    }
    if(this.target.type === "vector2" || this.target === "moving") {
      if(this.inWater) {
        [this.frame.x, this.frame.y] = [2, 0];
      } else {
        if(this.frameExtender < 15) {
          this.frameExtender++;
          [this.frame.x, this.frame.y] = [Math.floor(this.frameExtender / 8), 2];
        } else {
          this.frameExtender = 0;
        }
      }
      if(this.AI) {
        if(this.transform.x < this.target.x) {
          this.renderer.hf = true;
        } else {
          this.renderer.hf = false;
        }
      } else {
        if(e.pressedKeys.includes("d")) {
          this.renderer.hf = true;
        } else if(e.pressedKeys.includes("a")) {
          this.renderer.hf = false;
        }
      }
    }
    if(this.target === "honk") {
      this.frameExtender++;
      if(this.frameExtender < 64) {
        if(this.inWater) {
          [this.frame.x, this.frame.y] = [Math.floor(this.frameExtender / 16), 3];
        } else {
          [this.frame.x, this.frame.y] = [Math.floor(this.frameExtender / 16), 1];
        }
      } else if(this.frameExtender < 96) {
        if(this.frameExtender === 64) {
          effects.push(new Effect(this.transform, 0, 50, 75 * this.size, 40 * this.size, images.effects.honk, 50));
        }
        if(this.inWater) {
          [this.frame.x, this.frame.y] = [3, 3];
        } else {
          [this.frame.x, this.frame.y] = [3, 1];
        }
      }
    }
    if(this.target === "egg") {
      this.frameExtender++;
      if(this.frameExtender < 96) {
        [this.frame.x, this.frame.y] = [1, 0];
      }
    }
    //RENDER
    e.renderSprite(this.transform, this.renderer, this.frame);
    if(!this.AI) {
      let dist = 300;
      for(c = 0; c < renderPipeline.length; c++) {
        if(renderPipeline[c].type === "goose") {
          let calcDist = e.calcDistance(this.transform, renderPipeline[c].transform);
          if(calcDist < dist && calcDist > 0) {
            dist = calcDist;
          }
        }
      }
      if(dist < 300) {
        e.renderImage(this.transform, new ImageRenderer(images.misc.selectBox, 3 / dist, 0, 0, 96 + (Math.sin(EC / 10) * 10), 96 + (Math.sin(EC / 10) * 10), EC, false, false, false, true));
      }
    }
  }
}
class Egg {
  constructor(transform, size) {
    births++;
    this.transform = transform;
    this.size = size;
    this.type = "egg";
    this.age = 0;
    this.destroy = false;
    this.renderer = new ImageRenderer(images.egg[0], 1, 0, -20, 16 * size, 24 * size, 0, false, false, false, true);
  }
  update() {
    this.age += 0.01;
    //DETERMINE CRACK STATE
    if(this.age > 20) {
      this.renderer.image = images.egg[1];
    }
    if(this.age > 30) {
      this.destroy = true;
      flock.geese.push(new Goose(this.transform, 0));
      addToPipeline(flock.geese);
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
    e.renderImage(this.transform, new ImageRenderer(this.effect, 0.8, this.x, this.y, this.w, this.h, 0, false, false, false, true));
  }
}
class BackgroundItem {
  constructor(transform, size, type) {
    this.type = type;
    this.transform = transform;
    this.size = size;
    this.skin = e.randomNum(0, 2);
    this.renderer = new ImageRenderer(this.type === "grass" ? images.tiles.grass[this.skin] : images.tiles.rocks[this.skin] , 1, 0, 0, this.size, this.size, 0, false, false, false, true);
  }
  update() {
  }
  render() {
    e.renderImage(this.transform, this.renderer);
  }
}

//UPDATE FUNCTIONS
function updateHomescreen() {
  if(loaded) {
    if(inApp) {
      if(e.detectCollision(e.mouse.absolute, null, new Vector2(220, (e.h * -1) + 170), menuButtonCollider) && e.mouse.clicking) {
        window.close();
      }
    }
    if(e.detectCollision(e.mouse.absolute, null, new Vector2(220, (e.h * -1) + 60), menuButtonCollider) && e.mouse.clicking) {
      inGame = true;
      generateMap();
    }
  }
}
function updateCursor() {
  //set cursor style
  e.element.style = "cursor: crosshair";
}
function updateEntities() {
  //update eggs
  for(f = 0; f < flock.eggs.length; f++) {
    flock.eggs[f].update();
    if(flock.eggs[f].destroy) {
      flock.eggs.splice(f, 1);
      f--;
    }
  }
  //update geese
  for(f = 0; f < flock.geese.length; f++) {
    flock.geese[f].update();
    if(flock.geese[f].destroy) {
      flock.geese.splice(f, 1);
      f--;
    }
  }
  //update effects
  for(f = 0; f < effects.length; f++) {
    effects[f].update();
    if(effects[f].time < 0) {
      effects.splice(f, 1);
      f--;
    }
  }
  player.update();
}
function updateCamera() {
  //zoom functionality
  e.camera.zoom = 1 / player.transform.z;
  //determine target
  e.camera.x = player.transform.x - (e.w / 2);
  e.camera.y = player.transform.y + (e.h / 2);
}
function applyInputs() {
  //close app function
  if(e.detectCollision(e.mouse.absolute, null, new Vector2(e.w - 37, 37 - e.h), hudCollider) && e.mouse.clicking && inApp) {
    window.close();
  }
}
function updateRenderPipeline() {
  if(EC % 200 === 0 || EC === 0) {
    renderPipeline.splice(0, renderPipeline.length);
    for(f = 0; f < flock.eggs.length; f++) {
      if(DDE(flock.eggs[f])) {
        renderPipeline.push(flock.eggs[f]);
      }
    }
    for(f = 0; f < flock.geese.length; f++) {
      if(DDE(flock.geese[f])) {
        renderPipeline.push(flock.geese[f]);
      }
    }
    for(f = 0; f < map.backgroundItems.length; f++) {
      if(DDE(map.backgroundItems[f])) {
        renderPipeline.push(map.backgroundItems[f]);
      }
    }
    renderPipeline.push(player);
  }
  if(EC % 10 === 0) {
    renderPipeline.sort(function(a, b) {
      return b.transform.y - a.transform.y;
    });
  }
  for(f = 0; f < renderPipeline.length; f++) {
    if(renderPipeline[f].destroy) {
      renderPipeline.splice(f, 1);
      f--;
    }
  }
}
/*
function updatePerformance() {
  if(performanceLog.length === 10) {
    performanceLog.shift();
  }
  if(performanceLog.length === 0) {
    performanceLog.push(performance.now());
  } else {
    performanceLog.push(performance.now() - performanceLog[performanceLog.length - 1]);
  }
}
*/

//RENDER FUNCTIONS
function renderHUD() {
  //render main HUD components
  if(inApp) {
    e.renderImage(new Vector2(e.w - 37, 37 - e.h), new ImageRenderer(images.buttons.off, 0.8, 0, 0, 64, 64, 0, false, false, true, false));
  }
  //render goose action icons
  e.renderImage(new Vector2(35, (e.h * -1) + 40), new ImageRenderer(images.misc.actionBox, 0.8, 0, 0, 64, 64, 0, false, false, true, false));
  e.renderSprite(new Vector2(35, (e.h * -1) + 40), new SpriteRenderer(images.geese[0], 4, 4, 0.8, 0, 0, 64, 64, 0, false, false, true, false), new Vector2(3, 1));
  e.renderImage(new Vector2(55, (e.h * -1) + 20), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, 0, false, false, true, false));
  e.renderText(new Vector2(50, (e.h * -1) + 15), new Text("Trebuchet MS", "q", 0, 0, 20, true, false), new FillRenderer("black", "black", 0.8, 0));
  e.renderImage(new Vector2(103, (e.h * -1) + 40), new ImageRenderer(images.misc.actionBox, 0.8, 0, 0, 64, 64, 0, false, false, true, false));
  e.renderImage(new Vector2(103, (e.h * -1) + 40), new ImageRenderer(images.egg[0], 0.8, 0, 0, 36, 54, 0, false, false, true, false));
  e.renderImage(new Vector2(123, (e.h * -1) + 20), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, 0, false, false, true, false));
  e.renderText(new Vector2(118, (e.h * -1) + 15), new Text("Trebuchet MS", "e", 0, 0, 20, true, false), new FillRenderer("black", "black", 0.8, 0));
}
function renderHomescreen() {
  if(loaded) {
    //render menu
    e.renderImage(new Vector2(420, -175), new ImageRenderer(images.misc.logo, 1, 0, 0, 828, 324, 0, false, false, true, false));
    e.renderImage(new Vector2(e.w - 53, (e.h * -1) + 53), new ImageRenderer(images.misc.owlLogo, 1, 0, 0, 96, 96, 0, false, false, true, false));
    e.renderSprite(new Vector2(e.w - 300, e.h / -2), new SpriteRenderer(images.geese[0], 4, 4, 1, 0, 0, (e.h - 50), (e.h - 50) * 1, 0, false, false, true, false), new Vector2(0, 0));
    e.renderImage(new Vector2(220, (e.h * -1) + 60), new ImageRenderer(images.buttons.newGame, 1, 0, 0, 420, 96, 0, false, false, true, false));
    if(!inApp) {
      e.renderText(new Vector2(e.w - 30 - (20 * version.toString().length), -40), new Text("Trebuchet MS", "V" + version, 0, 0, 40, true, false), new FillRenderer("black", "black", 0.8, 0));
    } else {
      e.renderImage(new Vector2(220, (e.h * -1) + 170), new ImageRenderer(images.buttons.quit, 1, 0, 0, 420, 96, 0, false, false, true, false));
    }
  } else {
    e.renderImage(new Vector2(e.w / 2, e.h / -2), new ImageRenderer(images.misc.loading, 1, 0, 0, 160, 160, HEC * 2, false, false, true, false));
    e.renderImage(new Vector2(e.w / 2, e.h / -2), new ImageRenderer(images.icon, 1, 0, 0, 65, 65, 0, true, false, true, false));
  }
}
function renderEntities() {
  //render eggs
  for(f = 0; f < renderPipeline.length; f++) {
    renderPipeline[f].render();
  }
  for(f = 0; f < effects.length; f++) {
    effects[f].render();
  }
}

//MISC FUNCTIONS
//generates background items
function generateMap() {
  for(f = 0; f < 10000; f++) {
    map.backgroundItems.push(new BackgroundItem(new Vector2(e.randomNum(-10000, 10000), e.randomNum(-10000, 10000)), e.randomNum(40, 60), "grass"));
    map.backgroundItems.push(new BackgroundItem(new Vector2(e.randomNum(-10000, 10000), e.randomNum(-10000, 10000)), e.randomNum(40, 60), "rock"));
  }
  for(f = 0; f < 500; f++) {
    flock.geese.push(new Goose(new Vector2(e.randomNum(-10000, 10000), e.randomNum(-10000, 10000)), e.randomNum(25, 500)));
    flock.geese.push(new Goose(new Vector2(e.randomNum(-10000, 10000), e.randomNum(-10000, 10000)), e.randomNum(25, 500)));
  }
}
//resets button count for button functionality
function BC() {
  if(buttonCount > 30) {
    buttonCount = 0;
    return true;
  } else {
    return false;
  }
}
//determines if object is distance eligible for the pipeline (determine distance eligibility)
function DDE(inputObj) {
  return (Math.abs(player.transform.x - inputObj.transform.x) < e.w * e.camera.zoom && Math.abs(player.transform.y - inputObj.transform.y) < e.h * e.camera.zoom);
}
//stats for geese
function updatePopulationStats() {
  if(populationLog.length === 1000) {
    populationLog.shift();
  }
  populationLog.push(flock.geese.length);
  if(deaths > 0) {
    ratio = Math.round((births * 100) / deaths) / 100;
  }
  if(EC % 200 === 0 && e.pressedKeys.includes("p")) {
    console.log("births: " + births + "; deaths: " + deaths + "; ratio: " + ratio + "; pop: " + flock.geese.length);
  }
}
//adds new items to pipeline
function addToPipeline(source) {
  renderPipeline.unshift(source[source.length - 1]);
}
//startup
function loadFinished() {
  loaded = true;
  player = new Goose(new Vector3(0, 0, 1), 30);
  player.AI = false;
  player.name = "you";
  runVersion();
}
