//jshint maxerr: 10000

//VERSION CONTROL
inApp = false;
const version = 1;
const versionData = [
  "Version 0: Welcome to Goose Sandbox version 0:  this version is before my engine rework and is the original release. You will get an alert like this on startup every time there is a new version of the game.",
  "V1: Version 1! this edition is updated to use my the newest version of my JS game engine. It removes the bodies of water temporarily (will reapply in the future) for performance, replacing them with various rocks and grasses to add character to the landscape. HUD also improved with more apparent controls."
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
