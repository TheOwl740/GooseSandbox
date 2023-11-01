//jshint maxerr: 10000

//VERSION CONTROL
inApp = false;
const version = 3;
const versionData = [
  "Version 0: Welcome to Goose Sandbox version 0:  this version is before my engine rework and is the original release. You will get an alert like this on startup every time there is a new version of the game.",
  "V1: Version 1! this edition is updated to use my the newest version of my JS game engine. It removes the bodies of water temporarily (will reapply in the future) for performance, replacing them with various rocks and grasses to add character to the landscape. HUD also improved with more apparent controls.",
  "V2: Changed format to RPG type. Use WASD to control your goose and walk around the map. Fixed issue with geese not walking around automatically, and fixed issue where baby geese can lay eggs.",
  "V3: Drastically improved performance, background rocks and grass increased in number from 4,000 to 20,000 (I really made it run faster), removed names, removed sitting, optimised keys to q for honk and e for egg, updated effects to render properly, fixed other rendering issues, changes on app version, decreased goose size."
];
//runs on load finish
function runVersion() {
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
}
