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