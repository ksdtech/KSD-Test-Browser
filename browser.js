window.onresize = doLayout;
var isLoading = false;

onload = function() {
  var webview = document.querySelector('webview');
  doLayout();

  var vers = getChromeVersion();
  var majorVersion = vers['majorVersion'];
  var buildVersion = vers['buildVersion'];

  document.querySelector('#back').onclick = function() {
    webview.back();
  };

  document.querySelector('#forward').onclick = function() {
    webview.forward();
  };

  // document.querySelector('#home').onclick = function() {
  //   navigateTo('http://www.google.com/');
  // };

  document.querySelector('#choose-test').onclick = function() {
    navigateTo('http://ksdtech.github.io/KSD-Test-Browser/');
  };


  document.querySelector('#reload').onclick = function() {
    if (isLoading) {
      webview.stop();
    } else {
      webview.reload();
    }
  };
  document.querySelector('#reload').addEventListener(
    'webkitAnimationIteration',
    function() {
      if (!isLoading) {
        document.body.classList.remove('loading');
      }
    });

  // Start by loading up the Test Selection landing page.
  navigateTo('http://ksdtech.github.io/KSD-Test-Browser/');


  // document.querySelector('#terminate').onclick = function() {
  //   webview.terminate();
  // };


  // Uncomment for built-in test choosing.
  // // Start by showing the Test Choosing dialog.
  // document.querySelector('#choose-test-overlay').style.display = '-webkit-box';
  // document.querySelector('#choose-test-confirm').style.display = '-webkit-box';
  // // Disable the cancel button as well.
  // document.querySelector('#choose-test-cancel').setAttribute("disabled", "disabled");

  // var showChooseTestDiag= function() {
  //   document.querySelector('#choose-test-overlay').style.display = '-webkit-box';
  //   document.querySelector('#choose-test-confirm').style.display = '-webkit-box';
  //   document.querySelector('#choose-test-cancel').removeAttribute("disabled");
  // };

  // var hideChooseTestDiag = function() {
  //   document.querySelector('#choose-test-overlay').style.display = 'none';
  //   document.querySelector('#choose-test-confirm').style.display = 'none';
  // };

  // document.querySelector('#choose-test').onclick = showChooseTestDiag;

  // document.querySelector('#choose-test-cancel').onclick = hideChooseTestDiag;

  // var testList = document.querySelector('#choose-test-confirm').querySelectorAll('a');
  // for (elem in testList) {
  //   testList[elem].onclick = function(e) {
  //     e.preventDefault();
  //     hideChooseTestDiag();
  //     var t = this;
  //     clearAllData(function() {
  //       navigateTo(t.getAttribute('href'));
  //     });
  //     // navigateTo(this.getAttribute('href'));
  //   }
  // }

  // document.querySelector('#location-form').onsubmit = function(e) {
  //   e.preventDefault();
  //   navigateTo(document.querySelector('#location').value);
  // };

  webview.addEventListener('exit', handleExit);
  webview.addEventListener('loadstart', handleLoadStart);
  webview.addEventListener('loadstop', handleLoadStop);
  webview.addEventListener('loadabort', handleLoadAbort);
  webview.addEventListener('loadredirect', handleLoadRedirect);
  webview.addEventListener('loadcommit', handleLoadCommit);
};

function navigateTo(url) {
  resetExitedState();
  document.querySelector('webview').src = url;
}

function getChromeVersion() {
  var version = navigator.appVersion.substr(navigator.appVersion.lastIndexOf('Chrome/') + 7);
  var match = /([0-9]*)\.([0-9]*)\.([0-9]*)\.([0-9]*)/.exec(version);

  return {
    version: version,
    majorVersion: parseInt(match[1]),
    buildVersion: parseInt(match[3])
  }
}

function clearAllData(callback) {
  // Warning: this function doesn't seem to actually clear the cache right now.
  var webview = document.querySelector('webview');

  var clearDataType = {
    appcache: true,
    // cache: true,
    cookies: true,
    fileSystems: true,
    indexedDB: true,
    localStorage: true,
    webSQL: true
  }

  var vers = getChromeVersion();
  var majorVersion = vers['majorVersion'];
  var buildVersion = vers['buildVersion'];
  if (majorVersion >= 44 || (majorVersion == 43 && buildVersion >= 2350)) {
    clearDataType['cache'] = true;
  }

  webview.clearData(
    { since: 0 }, // Remove all browsing data.
    clearDataType,
    // function() { webview.reload(); });
    // function() { return; });
    callback());
}

function doLayout() {
  var webview = document.querySelector('webview');
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';

  var sadWebview = document.querySelector('#sad-webview');
  sadWebview.style.width = webviewWidth + 'px';
  sadWebview.style.height = webviewHeight * 2/3 + 'px';
  sadWebview.style.paddingTop = webviewHeight/3 + 'px';
}

function handleExit(event) {
  console.log(event.type);
  document.body.classList.add('exited');
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed');
  } else if (event.type == 'killed') {
    document.body.classList.add('killed');
  }
}

function resetExitedState() {
  document.body.classList.remove('exited');
  document.body.classList.remove('crashed');
  document.body.classList.remove('killed');
}

function handleLoadCommit(event) {
  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

  // document.querySelector('#location').value = event.url;

  var webview = document.querySelector('webview');
  document.querySelector('#back').disabled = !webview.canGoBack();
  document.querySelector('#forward').disabled = !webview.canGoForward();
  // closeBoxes();
}

function handleLoadStart(event) {
  document.body.classList.add('loading');
  isLoading = true;

  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

  // document.querySelector('#location').value = event.url;
}

function handleLoadStop(event) {
  // We don't remove the loading class immediately, instead we let the animation
  // finish, so that the spinner doesn't jerkily reset back to the 0 position.
  isLoading = false;
}

function handleLoadAbort(event) {
  console.log('LoadAbort');
  console.log('  url: ' + event.url);
  console.log('  isTopLevel: ' + event.isTopLevel);
  console.log('  type: ' + event.type);
}

function handleLoadRedirect(event) {
  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

  // document.querySelector('#location').value = event.newUrl;
}

