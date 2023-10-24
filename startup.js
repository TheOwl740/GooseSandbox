//jshint maxerr: 10000

//VERSION CONTROL
const version = 0;
const versionData = [
  "Version 0: Welcome to Goose Sandbox version 0:  this version is before my engine rework and is the original release. You will get an alert like this on startup every time there is a new version of the game."
];
if(localStorage.getItem("version") === null) {
  localStorage.setItem("version", -1);
}
if(version != localStorage.getItem("version")) {
  let ret = "";
  let updates = version - Number(localStorage.getItem("version"));
  for(u = Number(localStorage.getItem("version")); u < version; u++) {
    ret += "\n \n" + versionData[u + 1];
  }
  alert("There " + (updates > 1 ? "have" : "has") + " been " + updates + " " + (updates > 1 ? "updates" : "update") + " since you last visited Goose Sandbox: " + ret);
  localStorage.setItem("version", version);
}

//PRIMITIVES
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
    new Transform(-32, 32),
    new Transform(32, 32),
    new Transform(32, -32)
  ], 0),
  new Tri([
    new Transform(32, -32),
    new Transform(-32, -32),
    new Transform(-32, 32)
  ], 0)
]);
const menuButtonCollider = new Polygon([
  new Tri([
    new Transform(-210, 48),
    new Transform(210, 48),
    new Transform(210, -48)
  ], 0),
  new Tri([
    new Transform(210, -48),
    new Transform(-210, -48),
    new Transform(-210, 48)
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
  "Jobe",
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
  "Neveya",
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
  "Kate"
];

//IMAGE TREE CREATION
const images = {
  owlLogo: new Image(),
  logo: new Image(),
  buttons: {
    off: new Image(),
    newGame: new Image(),
    openSave: new Image(),
    quit: new Image(),
  },
  effects: {
    honk: new Image(),
  },
  misc: {
    box: new Image(),
    actionBox: new Image(),
    cross: new Image(),
    selectBox: new Image(),
    key: new Image()
  },
  goose: {
    run: [
      new Image(),
      new Image()
    ],
    idle: new Image(),
    sit: new Image(),
    honk: [
      new Image(),
      new Image(),
      new Image(),
      new Image()
    ],
    waterHonk: [
      new Image(),
      new Image(),
      new Image(),
      new Image()
    ],
    swimming: new Image()
  },
  egg: [
    new Image(),
    new Image()
  ],
  tiles: {
    water: {
      main: new Image(),
      corner: new Image(),
      lowRes: {
        main: new Image(),
        corner: new Image()
      }
    },
    grass: new Image()
  }
};

//IMAGE SOURCE ASSIGNMENT
images.owlLogo.src = "images/owlLogo.png";
images.logo.src = "images/logo.png";
images.buttons.off.src = "images/buttons/off.png";
images.buttons.newGame.src = "images/buttons/newGame.png";
images.buttons.openSave.src = "images/buttons/openSave.png";
images.buttons.quit.src = "images/buttons/quit.png";
images.effects.honk.src = "images/effects/honk.png";
images.misc.box.src = "images/misc/box.png";
images.misc.actionBox.src = "images/misc/actionBox.png";
images.misc.cross.src = "images/misc/cross.png";
images.misc.selectBox.src = "images/misc/selectBox.png";
images.misc.key.src = "images/misc/key.png";
images.goose.run[0].src = "images/goose/run/run0.png";
images.goose.run[1].src = "images/goose/run/run1.png";
images.goose.idle.src = "images/goose/idle.png";
images.goose.sit.src = "images/goose/sit.png";
images.goose.honk[0].src = "images/goose/honk/honk0.png";
images.goose.honk[1].src = "images/goose/honk/honk1.png";
images.goose.honk[2].src = "images/goose/honk/honk2.png";
images.goose.honk[3].src = "images/goose/honk/honk3.png";
images.goose.waterHonk[0].src = "images/goose/waterHonk/honk0.png";
images.goose.waterHonk[1].src = "images/goose/waterHonk/honk1.png";
images.goose.waterHonk[2].src = "images/goose/waterHonk/honk2.png";
images.goose.waterHonk[3].src = "images/goose/waterHonk/honk3.png";
images.goose.swimming.src = "images/goose/swimming.png";
images.egg[0].src = "images/egg/egg0.png";
images.egg[1].src = "images/egg/egg1.png";
images.tiles.water.main.src = "images/tiles/water/main.png";
images.tiles.water.corner.src = "images/tiles/water/corner.png";
images.tiles.water.lowRes.main.src = "images/tiles/water/lowRes/main.png";
images.tiles.water.lowRes.corner.src = "images/tiles/water/lowRes/corner.png";
images.tiles.grass.src = "images/tiles/grass.png";

//CLASSES
class Goose {
  constructor(transform, size) {
    this.inWater = false;
    this.size = size;
    this.type = "goose";
    this.transform = transform;
    this.name = names[e.methods.randomNum(0, names.length - 1)];
    this.collider = new Polygon([
      new Tri([
        new Transform(-28 * size, 32 * size),
        new Transform(28 * size, 32 * size),
        new Transform(28 * size, -32 * size)
      ], 3),
      new Tri([
        new Transform(28 * size, -32 * size),
        new Transform(-28 * size, -32 * size),
        new Transform(-28 * size, 32 * size)
      ], 3)
    ]);
    this.objectCollider = new Polygon([
      new Tri([
        new Transform(-5 * size, -20 * size),
        new Transform(5 * size, -20 * size),
        new Transform(0 * size, -24 * size)
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
        this.size = e.methods.randomNum(18, 22) / 20;
        if(e.methods.randomNum(1, 100) === 1) {
          this.size = 3;
        }
        if(e.methods.randomNum(1, 100) === 2) {
          this.size = 0.7;
        }
        this.renderer.w = 64 * this.size;
        this.renderer.h = 96 * this.size;
      }
    }
    //DETERMINE
    if(this.target.type !== "absolute" && this.target !== "sitting") {
      if(this.target === "idle") {
        if(e.methods.randomNum(1, 750) === 1) {
          this.target = new Transform(this.transform.x + (e.methods.randomNum(-200, 200)) * this.size, this.transform.y + (e.methods.randomNum(-200, 200)) * this.size, 0);
        }
        if(e.methods.randomNum(1, 3000) === 1) {
          this.target = "honk";
        }
        if(e.methods.randomNum(1, 6000) === 1 && this.adult && !this.inWater) {
          this.target = "egg";
        }
      } else if(this.target.type === "transform") {
        if(e.methods.randomNum(1, 400) === 1) {
          this.target = new Transform(this.transform.x + (e.methods.randomNum(-200, 200)) * this.size, this.transform.y + (e.methods.randomNum(-200, 200)) * this.size, 0);
        }
        if(e.methods.calcDistance(this.transform, this.target) < 5) {
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
      if(e.methods.calcDistance(this.transform, this.target.transform) < 5) {
        this.target = "idle";
        this.frameExtender = 0;
      }
    }
    //DETECT WATER COLLISIONS
    this.inWater = false;
    for(h = 0; h < map.pools.length; h++) {
      if(e.methods.calcDistance(this.transform, map.pools[h].transform) < 1200) {
        if(e.methods.detectCollision(this.transform, this.objectCollider, map.pools[h].transform, map.pools[h].collider)) {
          this.inWater = true;
        }
      }
    }
    //EXECUTE
    if(this.target.type === "transform") {
      this.transform = e.methods.roundTransform(e.methods.addTransform(this.transform, e.methods.calcRotationalVector(e.methods.calcAngle(this.transform, this.target), this.size)), 1);
    }
    if(this.target.type === "absolute") {
      this.transform = e.methods.roundTransform(e.methods.addTransform(this.transform, e.methods.calcRotationalVector(e.methods.calcAngle(this.transform, this.target.transform), this.size)), 1);
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
    e.methods.renderImage(this.transform, this.renderer);
    e.methods.renderText(this.transform, new Text("Trebuchet MS", this.name, 18 * this.size, 5 - (this.name.length * 6 * this.size), 50, false), new FillRenderer("black", "black", 0.6, 0));
    if(e.data.pressedKeys.includes("k") && e.data.pressedKeys.includes("l")) {
      e.methods.renderPolygon(this.transform, this.collider, null, new BorderRenderer("white", 1, 2));
      e.methods.renderPolygon(this.transform, this.objectCollider, null, new BorderRenderer("#9999FF", 1, 2));
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
    if(e.methods.randomNum(timer, 5000) === timer || timer > 5000) {
      if(this.renderer.image === images.egg[0]) {
        this.renderer.image = images.egg[1];
        timer = 3000;
      } else {
        flock.geese.push(new Goose(this.transform, 0.5));
        flock.geese[flock.geese.length - 1].adult = 0;
        this.destroy = true;
      }
    }
  }
  render() {
    e.methods.renderImage(this.transform, this.renderer);
  }
}

class Effect {
  constructor(transform, x, y, w, h, effect, time) {
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
    e.methods.renderImage(this.transform, new ImageRenderer(this.effect, 0.8, this.x, this.y, this.w, this.h, false, false, false, true));
    if(e.data.pressedKeys.includes("k") && e.data.pressedKeys.includes("l")) {
      //e.methods.renderPolygon(this.transform, this.collider, null, new BorderRenderer("white", 1, 2));
    }
  }
}

class Pool {
  constructor(size, transform) {
    this.type = "pool";
    this.transform = transform;
    this.size = size;
    this.grid = [
    ];
    let f = 0;
    let ff = 0;
    let xSel = 0;
    let ySel = 0;
    let connections = [];
    //GENERATE GRID
    for(f = 0; f < size; f++) {
      this.grid.push([]);
      for(ff = 0; ff < size; ff++) {
        this.grid[f][ff] = null;
      }
    }
    //FILL GRID WITH BASE TILES
    for(f = 0; f < this.size; f++) {
      /*if(e.methods.randomNum(0, 1) === 0) {
        xSel = (e.methods.randomExp(0, (size - 1) / 2, 3) * -1) + (size / 2);
      } else {
        xSel = e.methods.randomExp(0, (size - 1) / 2, 3) + (size / 2);
      }
      if(e.methods.randomNum(0, 1) === 0) {
        ySel = (e.methods.randomExp(0, (size - 1) / 2, 3) * -1) + (size / 2);
      } else {
        ySel = e.methods.randomExp(0, (size - 1) / 2, 3) + (size / 2);
      }*/
      ySel = e.methods.randomNum(0, size - 1);
      xSel = e.methods.randomNum(0, size - 1);
      if(xSel - 1 >= 0 && ySel - 1 >= 0) {
        this.grid[xSel - 1][ySel - 1] = {
          renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel - 1 - (this.size / 2))), this.transform.y - (64 * (ySel - 1 + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
        };
      }
      if(ySel - 1 >= 0) {
        this.grid[xSel][ySel - 1] = {
          renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel - (this.size / 2))), this.transform.y - (64 * (ySel - 1 + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
        };
      }
      if(xSel + 1 < size && ySel - 1 >= 0) {
        this.grid[xSel + 1][ySel - 1] = {
          renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel + 1 - (this.size / 2))), this.transform.y - (64 * (ySel - 1 + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
        };
      }
      if(xSel - 1 >= 0) {
        this.grid[xSel - 1][ySel] = {
          renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel - 1 - (this.size / 2))), this.transform.y - (64 * (ySel + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
        };
      }
      this.grid[xSel][ySel] = {
        renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel - (this.size / 2))), this.transform.y - (64 * (ySel + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
      };
      if(xSel + 1 < size) {
        this.grid[xSel + 1][ySel] = {
          renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel + 1 - (this.size / 2))), this.transform.y - (64 * (ySel + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
        };
      }
      if(xSel - 1 >= 0 && ySel + 1 < size) {
        this.grid[xSel - 1][ySel + 1] = {
          renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel - 1 - (this.size / 2))), this.transform.y - (64 * (ySel + 1 + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
        };
      }
      if(ySel + 1 < size) {
        this.grid[xSel][ySel + 1] = {
          renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel - (this.size / 2))), this.transform.y - (64 * (ySel + 1 + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
        };
      }
      if(xSel + 1 < size && ySel + 1 < size) {
        this.grid[xSel + 1][ySel + 1] = {
          renderer: new ImageRenderer(images.tiles.water.main, 0.7, 0, 0, 64, 64, false, false, false, true),
          transform: new Transform(this.transform.x + (64 * (xSel + 1 - (this.size / 2))), this.transform.y - (64 * (ySel + 1 + (this.size / 2))), e.methods.randomNum(0, 3) * 90)
        };
      }
    }
    //DETERMINE CONNECTED TILES
    for(f = 0; f < size; f++) {
      for(ff = 0; ff < size; ff++) {
        connections = [];
        if(this.grid[f][ff] !== null) {
          if(f - 1 >= 0) {
            if(this.grid[f - 1][ff] !== null) {
              connections.push("t");
            }
          }
          if(ff - 1 >= 0) {
            if(this.grid[f][ff - 1] !== null) {
              connections.push("l");
            }
          }
          if(ff + 1 < size) {
            if(this.grid[f][ff + 1] !== null) {
              connections.push("r");
            }
          }
          if(f + 1 < size) {
            if(this.grid[f + 1][ff] !== null) {
              connections.push("b");
            }
          }
          //REPLACE BASE TILES WITH CORNERS
          if(connections.length === 2) {
            if(!((connections.includes("t") && connections.includes("b")) || (connections.includes("l") && connections.includes("r")))) {
              if(connections.includes("t") && connections.includes("l")) {
                this.grid[f][ff].renderer = new ImageRenderer(images.tiles.water.corner, 0.7, 0, 0, 64, 64, false, false, false, true);
                this.grid[f][ff].transform = new Transform(this.transform.x + (64 * (f - (this.size / 2))), this.transform.y - (64 * (ff + (this.size / 2))), 90);
              }
              if(connections.includes("t") && connections.includes("r")) {
                this.grid[f][ff].renderer = new ImageRenderer(images.tiles.water.corner, 0.7, 0, 0, 64, 64, false, false, false, true);
                this.grid[f][ff].transform = new Transform(this.transform.x + (64 * (f - (this.size / 2))), this.transform.y - (64 * (ff + (this.size / 2))), 180);
              }
              if(connections.includes("b") && connections.includes("r")) {
                this.grid[f][ff].renderer = new ImageRenderer(images.tiles.water.corner, 0.7, 0, 0, 64, 64, false, false, false, true);
                this.grid[f][ff].transform = new Transform(this.transform.x + (64 * (f - (this.size / 2))), this.transform.y - (64 * (ff + (this.size / 2))), 270);
              }
              if(connections.includes("b") && connections.includes("l")) {
                this.grid[f][ff].renderer = new ImageRenderer(images.tiles.water.corner, 0.7, 0, 0, 64, 64, false, false, false, true);
                this.grid[f][ff].transform = new Transform(this.transform.x + (64 * (f - (this.size / 2))), this.transform.y - (64 * (ff + (this.size / 2))), 360);
              }
            }
          }
        }
      }
    }
    //CREATE COLLIDER
    this.collider = new Polygon([
    ]);
    for(f = 0; f < this.grid.length; f++) {
      for(ff = 0; ff < this.grid[f].length; ff++) {
        if(this.grid[f][ff] !== null) {
          //COLLIDER FOR BASE TILES
          if(this.grid[f][ff].renderer.image === images.tiles.water.main) {
            let j = 0;
            //for(j = 0; j < this.grid[f].length; j++) {
              //if(this.grid[f][ff + j] !== null && this.grid[f][ff + j] !== undefined) {
                //if(this.grid[f][ff + j].renderer.image !== images.tiles.water.main) {
                  this.collider.tris.push(new Tri([
                    new Transform(this.grid[f][ff].transform.x - 32 + (j * 64), this.grid[f][ff].transform.y - 32, 0),
                    new Transform(this.grid[f][ff].transform.x + 32 + (j * 64), this.grid[f][ff].transform.y - 32, 0),
                    new Transform(this.grid[f][ff].transform.x - 32 + (j * 64), this.grid[f][ff].transform.y + 32, 0),
                  ], 3));
                  this.collider.tris.push(new Tri([
                    new Transform(this.grid[f][ff].transform.x + 32 + (j * 64), this.grid[f][ff].transform.y - 32, 0),
                    new Transform(this.grid[f][ff].transform.x + 32 + (j * 64), this.grid[f][ff].transform.y + 32, 0),
                    new Transform(this.grid[f][ff].transform.x - 32 + (j * 64), this.grid[f][ff].transform.y + 32, 0),
                  ], 3));
                  //ff += j;
                  //j = this.grid[f].length;
                //}
              //}
            //}
          } else {
            //COLLIDER FOR CORNERS
            switch(this.grid[f][ff].transform.r) {
              case 90:
                this.collider.tris.push(new Tri([
                  new Transform(this.grid[f][ff].transform.x - 32, this.grid[f][ff].transform.y + 32, 0),
                  new Transform(this.grid[f][ff].transform.x + 32, this.grid[f][ff].transform.y + 32, 0),
                  new Transform(this.grid[f][ff].transform.x + 16, this.grid[f][ff].transform.y - 16, 0),
                ], 3));
                this.collider.tris.push(new Tri([
                  new Transform(this.grid[f][ff].transform.x - 32, this.grid[f][ff].transform.y - 32, 0),
                  new Transform(this.grid[f][ff].transform.x - 32, this.grid[f][ff].transform.y + 32, 0),
                  new Transform(this.grid[f][ff].transform.x + 16, this.grid[f][ff].transform.y - 16, 0),
                ], 3));
                break;
              case 180:
                this.collider.tris.push(new Tri([
                  new Transform(this.grid[f][ff].transform.x - 32, this.grid[f][ff].transform.y - 32, 0),
                  new Transform(this.grid[f][ff].transform.x + 32, this.grid[f][ff].transform.y - 32, 0),
                  new Transform(this.grid[f][ff].transform.x + 16, this.grid[f][ff].transform.y + 16, 0),
                ], 3));
                this.collider.tris.push(new Tri([
                  new Transform(this.grid[f][ff].transform.x - 32, this.grid[f][ff].transform.y + 32, 0),
                  new Transform(this.grid[f][ff].transform.x - 32, this.grid[f][ff].transform.y - 32, 0),
                  new Transform(this.grid[f][ff].transform.x + 16, this.grid[f][ff].transform.y + 16, 0),
                ], 3));
                break;
              case 270:
                this.collider.tris.push(new Tri([
                  new Transform(this.grid[f][ff].transform.x + 32, this.grid[f][ff].transform.y - 32, 0),
                  new Transform(this.grid[f][ff].transform.x - 32, this.grid[f][ff].transform.y - 32, 0),
                  new Transform(this.grid[f][ff].transform.x - 16, this.grid[f][ff].transform.y + 16, 0),
                ], 3));
                this.collider.tris.push(new Tri([
                  new Transform(this.grid[f][ff].transform.x + 32, this.grid[f][ff].transform.y + 32, 0),
                  new Transform(this.grid[f][ff].transform.x + 32, this.grid[f][ff].transform.y - 32, 0),
                  new Transform(this.grid[f][ff].transform.x - 16, this.grid[f][ff].transform.y + 16, 0),
                ], 3));
                break;
              case 360:
                this.collider.tris.push(new Tri([
                  new Transform(this.grid[f][ff].transform.x + 32, this.grid[f][ff].transform.y + 32, 0),
                  new Transform(this.grid[f][ff].transform.x - 32, this.grid[f][ff].transform.y + 32, 0),
                  new Transform(this.grid[f][ff].transform.x - 16, this.grid[f][ff].transform.y - 16, 0),
                ], 3));
                this.collider.tris.push(new Tri([
                  new Transform(this.grid[f][ff].transform.x + 32, this.grid[f][ff].transform.y - 32, 0),
                  new Transform(this.grid[f][ff].transform.x + 32, this.grid[f][ff].transform.y + 32, 0),
                  new Transform(this.grid[f][ff].transform.x - 16, this.grid[f][ff].transform.y - 16, 0),
                ], 3));
                break;
            }
          }
        }
      }
    }
  }
  render() {
    let f;
    let ff;
    /*for(f = 0; f < this.size; f++) {
      for(ff = 0; ff < this.size; ff++) {
        if(this.grid[f][ff] !== null) {
          if(e.data.camera.zoom > 5) {
            if(this.grid[f][ff].renderer.image === images.tiles.water.main) {
              this.grid[f][ff].renderer.image = images.tiles.water.lowRes.main;
            }
            if(this.grid[f][ff].renderer.image === images.tiles.water.corner) {
              this.grid[f][ff].renderer.image = images.tiles.water.lowRes.corner;
            }
          } else {
            if(this.grid[f][ff].renderer.image === images.tiles.water.lowRes.main) {
              this.grid[f][ff].renderer.image = images.tiles.water.main;
            }
            if(this.grid[f][ff].renderer.image === images.tiles.water.lowRes.corner) {
              this.grid[f][ff].renderer.image = images.tiles.water.corner;
            }
          }
        }
      }
    }*/
    for(f = 0; f < this.size; f++) {
      for(ff = 0; ff < this.size; ff++) {
        if(this.grid[f][ff] !== null) {
          e.methods.renderImage(e.methods.addTransform(this.transform, this.grid[f][ff].transform), this.grid[f][ff].renderer);
        }
      }
    }
    if(e.data.pressedKeys.includes("k") && e.data.pressedKeys.includes("l")) {
      e.methods.renderPolygon(this.transform, this.collider, null, new BorderRenderer("white", 1, 2));
    }
  }
}

//FUNCTIONS
function updateHomescreen() {
  //RENDER MENU
  e.methods.renderImage(new Transform(420, -175, 0), new ImageRenderer(images.logo, 1, 0, 0, 828, 324, false, false, true, false));
  e.methods.renderImage(new Transform(e.data.w - 53, (e.data.h * -1) + 53, 0), new ImageRenderer(images.owlLogo, 1, 0, 0, 96, 96, false, false, true, false));
  e.methods.renderImage(new Transform(e.data.w - 300, e.data.h / -2, 0), new ImageRenderer(images.goose.idle, 1, 0, 0, (e.data.h - 50) * 0.75, (e.data.h - 50) * 1, false, false, true, false));
  e.methods.renderImage(new Transform(220, (e.data.h * -1) + 280, 0), new ImageRenderer(images.buttons.newGame, 1, 0, 0, 420, 96, false, false, true, false));
  //e.methods.renderImage(new Transform(220, (e.data.h * -1) + 170, 0), new ImageRenderer(images.buttons.openSave, 1, 0, 0, 420, 96, false, false, true, false));
  e.methods.renderImage(new Transform(220, (e.data.h * -1) + 60, 0), new ImageRenderer(images.buttons.quit, 1, 0, 0, 420, 96, false, false, true, false));
  //MENU INTERACTION
  if(e.methods.detectCollision(e.data.mouse.absolute, null, new Transform(220, (e.data.h * -1) + 60, 0), menuButtonCollider) && e.data.mouse.clicking) {
    window.close();
  }
  /*if(e.methods.detectCollision(e.data.mouse.absolute, null, new Transform(220, (e.data.h * -1) + 170, 0), menuButtonCollider) && e.data.mouse.clicking) {
    openSaveGame();
  }*/
  if(e.methods.detectCollision(e.data.mouse.absolute, null, new Transform(220, (e.data.h * -1) + 280, 0), menuButtonCollider) && e.data.mouse.clicking) {
    inGame = true;
    generateMap();
  }
}

function updateHud() {
  //RENDER HUD
  e.methods.renderImage(new Transform(254, -60, 0), new ImageRenderer(images.logo, 0.8, 0, 0, 276, 108, false, false, true, false));
  e.methods.renderText(new Transform((e.data.w / 2) - 70 - (flock.geese.length.toString().length * 10), 40, 0), new Text("Trebuchet MS", "Geese: " + flock.geese.length, 40, 0, 0, true), new FillRenderer("black", "black", 0.8, 0));
  e.methods.renderImage(new Transform(53, -53, 0), new ImageRenderer(images.owlLogo, 1, 0, 0, 96, 96, false, false, true, false));
  e.methods.renderImage(new Transform(e.data.w - 40, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.box, 0.8, 0, 0, 64, 64, false, false, true, false));
  e.methods.renderImage(new Transform(e.data.w - 40, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.cross, 0.8, 0, 0, 40, 40, false, false, true, false));
  e.methods.renderImage(new Transform(e.data.w - 20, (e.data.h * -1) + 20, 0), new ImageRenderer(images.misc.key, 0.8, 0, 0, 32, 32, false, false, true, false));
  e.methods.renderText(new Transform(e.data.w - 25, (e.data.h * -1) + 15, 0), new Text("Trebuchet MS", "0", 20, 0, 0, true), new FillRenderer("black", "black", 0.8, 0));
  e.methods.renderImage(new Transform(e.data.w - 110, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.box, 0.8, 0, 0, 64, 64, false, false, true, false));
  e.methods.renderImage(new Transform(e.data.w - 113, (e.data.h * -1) + 40, 0), new ImageRenderer(images.goose.idle, 0.8, 0, 0, 48, 64, false, false, true, false));
  e.methods.renderText(new Transform(e.data.w - 100, (e.data.h * -1) + 5, 0), new Text("Trebuchet MS", "1", 30, 0, 0, true), new FillRenderer("black", "black", 0.8, 0));
  e.methods.renderImage(new Transform(e.data.w - 180, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.box, 0.8, 0, 0, 64, 64, false, false, true, false));
  e.methods.renderImage(new Transform(e.data.w - 180, (e.data.h * -1) + 40, 0), new ImageRenderer(images.egg[0], 0.8, 0, 0, 25, 38, false, false, true, false));
  e.methods.renderText(new Transform(e.data.w - 170, (e.data.h * -1) + 5, 0), new Text("Trebuchet MS", "2", 30, 0, 0, true), new FillRenderer("black", "black", 0.8, 0));
  e.methods.renderImage(new Transform(e.data.w - 37, -37, 0), new ImageRenderer(images.buttons.off, 0.8, 0, 0, 64, 64, false, false, true, false));
  //HUD INTERACTION
  if(e.methods.detectCollision(e.data.mouse.absolute, null, new Transform(e.data.w - 37, -37, 0), hudCollider) && e.data.mouse.clicking) {
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
    e.data.element.style = "cursor: copy";
  } else if(selected !== false) {
    e.data.element.style = "cursor: move";
  } else {
    e.data.element.style = "cursor: crosshair";
  }
}

function managePlacement() {
  if(e.data.pressedKeys.includes("1") && bC() && placing.type !== "goose") {
    buttonCount = 0;
    placing = new Goose(new Transform(), e.methods.randomNum(18, 22) / 20);
    Object.assign(placing.transform, e.data.mouse.dynamic);
    selected = false;
  }
  if(e.data.pressedKeys.includes("2") && bC() && placing.type !== "egg") {
    buttonCount = 0;
    placing = new Egg(new Transform(), 1);
    Object.assign(placing.transform, e.data.mouse.dynamic);
    selected = false;
  }
  if(placing !== false) {
    Object.assign(placing.transform, e.data.mouse.dynamic);
    placing.render();
    if(e.data.mouse.clicking) {
      if(placing.type === "goose") {
        flock.geese.push(placing);
        placing.target = "idle";
      }
      if(placing.type === "egg") {
        flock.eggs.push(placing);
      }
      placing = false;
    }
    if(e.data.pressedKeys.includes("0") && bC()) {
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
  if(e.data.pressedKeys.includes("q")) {
    e.data.camera.zoom *= 0.99;
  }
  if(e.data.pressedKeys.includes("e")) {
    e.data.camera.zoom *= 1.01;
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
  if(e.data.pressedKeys.includes("w")) {
    cameraAcceleration.y += 0.1;
  } else if(e.data.pressedKeys.includes("s")) {
    cameraAcceleration.y -= 0.1;
  }
  if(e.data.pressedKeys.includes("d")) {
    cameraAcceleration.x += 0.1;
  }
  if(e.data.pressedKeys.includes("a")) {
    cameraAcceleration.x -= 0.1;
  }
  if(Math.abs(cameraAcceleration.x) < 0.05 && Math.abs(cameraAcceleration.x > 0)) {
    cameraAcceleration.x = 0;
  }
  if(Math.abs(cameraAcceleration.y) < 0.05 && Math.abs(cameraAcceleration.y > 0)) {
    cameraAcceleration.y = 0;
  }
  e.data.camera.y += cameraAcceleration.y;
  e.data.camera.x += cameraAcceleration.x;
}

function saveGame() {
  
}

function openSaveGame() {
  //window.showOpenFilePicker();
}

function updateSelection() {
  for(a = 0; a < flock.geese.length; a++) {
    if(e.methods.detectCollision(e.data.mouse.dynamic, null, flock.geese[a].transform, flock.geese[a].collider) && e.data.mouse.clicking) {
      selected = flock.geese[a];
    }
  }
  if(selected !== false) {
    //RENDER SELECT BOX
    e.methods.renderImage(new Transform(selected.transform.x, selected.transform.y, selectBox.rotation), new ImageRenderer(images.misc.selectBox, (selectBox.size - 0.01), 0, 0, 78 * selected.size * selectBox.size, 78 * selected.size * selectBox.size, false, false, false, false));
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
    if(e.data.mouse.clicking && e.methods.calcDistance(e.data.mouse.dynamic, selected.transform) > 50) {
      selected.target = {
        type: "absolute",
        transform: {}
      };
      Object.assign(selected.target.transform, e.data.mouse.dynamic);
    }
    //RENDER ACTIONS
    e.methods.renderImage(new Transform(34, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.actionBox, 0.8, 0, 0, 64, 64, false, false, true, false));
    e.methods.renderImage(new Transform(31, (e.data.h * -1) + 40, 0), new ImageRenderer(images.goose.sit, 0.8, 0, 0, 48, 64, false, false, true, false));
    e.methods.renderText(new Transform(44, (e.data.h * -1) + 5, 0), new Text("Trebuchet MS", "z", 30, 0, 0, true), new FillRenderer("black", "black", 0.8, 0));
    e.methods.renderImage(new Transform(103, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.actionBox, 0.8, 0, 0, 64, 64, false, false, true, false));
    e.methods.renderImage(new Transform(103, (e.data.h * -1) + 40, 0), new ImageRenderer(images.goose.honk[3], 0.8, 0, 0, 48, 64, false, false, true, false));
    e.methods.renderText(new Transform(113, (e.data.h * -1) + 5, 0), new Text("Trebuchet MS", "x", 30, 0, 0, true), new FillRenderer("black", "black", 0.8, 0));
    e.methods.renderImage(new Transform(172, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.actionBox, 0.8, 0, 0, 64, 64, false, false, true, false));
    e.methods.renderImage(new Transform(172, (e.data.h * -1) + 40, 0), new ImageRenderer(images.egg[0], 0.8, 0, 0, 36, 54, false, false, true, false));
    e.methods.renderText(new Transform(182, (e.data.h * -1) + 5, 0), new Text("Trebuchet MS", "c", 30, 0, 0, true), new FillRenderer("black", "black", 0.8, 0));
    if(!selected.adult || selected.inWater) {
      e.methods.renderImage(new Transform(172, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.cross, 1, 0, 0, 50, 50, false, false, true, false));
    }
    if(selected.inWater) {
      e.methods.renderImage(new Transform(34, (e.data.h * -1) + 40, 0), new ImageRenderer(images.misc.cross, 1, 0, 0, 50, 50, false, false, true, false));
    }
    //DETECT ACTION INPUT
    if(e.data.pressedKeys.includes("z") && bC()) {
      if(selected.target === "sitting" ) {
        selected.target = "idle";
      } else if(!selected.inWater) {
        selected.target = "sitting";
      }
    }
    if(e.data.pressedKeys.includes("x") && bC()) {
      selected.target = "honk";
    }
    if(e.data.pressedKeys.includes("c") && bC() && selected.adult && !selected.inWater) {
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
  for(g = -5; g < 5; g++) {
    for(gg = -2; gg < 2; gg++) {
      map.pools.push(new Pool(e.methods.randomNum(5, 20), new Transform((g * 1500) + e.methods.randomNum(-600, 600), (gg * 1500) + e.methods.randomNum(600, -600), 0)));
    }
  }
}

function updatePools() {
  for(h = 0; h < map.pools.length; h++) {
    map.pools[h].render();
  }
}

function renderGrass() {
  let j = 0;
  let jj = 0;
  if(e.data.camera.zoom < 5) {
    for(j = 0; j < e.data.w * e.data.camera.zoom; j += 320) {
      for(jj = 0; jj < e.data.h * e.data.camera.zoom; jj -= 320) {
        e.methods.renderImage(new Transform(j, jj, 0), new ImageRenderer(images.tiles.grass, 1, 0, 0, 320, 320, false, false, false, false));
      }
    }
  }
}

//STARTUP
e.data.camera.x = e.data.w / -2;
e.data.camera.y = e.data.h / 2;
