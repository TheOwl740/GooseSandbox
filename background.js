chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('app.html', {
    'outerBounds': {
      'width': 1200,
      'height': 500
    },
    state: "fullscreen",
    frame: "none"
  });
});
