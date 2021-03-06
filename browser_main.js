var mainBrowser = null;
(function(browserModule) {
  var query = function(str) { return document.querySelector(str); };


  window.addEventListener('load', function(e) {
    mainBrowser = new browserModule.Browser(
        query('#bg-title'),
        query('#controls'),
        query('#back'),
        query('#forward'),
        query('#home'),
        query('#reload'),
        query('#exit'),
        query('#tab-container'),
        query('#content-container'),
        query('#new-tab'));
  });
})(browser);
