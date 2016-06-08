# KSD Test Browser
A Chrome App for test-taking in kiosk mode on a Chromebook.

This is heavily based on the [code sample](https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/webview-samples/new-window) 
from Google which shows how to use the [New Window API](https://developer.chrome.com/apps/tags/webview#event-newwindow) 
for [webviews](http://developer.chrome.com/apps/app_external.html#webview). 
The license is inherited from that project.


## Test Browsing Features

This project attempts to facilitate undistracted test-taking for students by creating a 
browser with limited functionality, such as preventing navigation to arbitrary URLs.
Some changes have also been made to improve operation on a Chromebook in Kiosk Mode, 
including forcing all new windows to open as new tabs and the addition of an Exit button.

Otherwise, the app should behave like an ordinary tabbed browser. When actions in a 
webview request a new tab or window, the browser will respond by opening a new tab.


## Test Chooser Page

The test browser is configured to load a curated list of tests at startup, when a new tab 
is opened, and when the **Return to Test Chooser** button is clicked. This list is located 
at [http://ksdtech.github.io/KSD-Test-Browser/](http://ksdtech.github.io/KSD-Test-Browser/), 
which is a github hosted page. 

This page resides in the gh-pages branch of this repository, and can be edited there.


## Other Features

* Shortcut keys: `Ctrl + [1-9]` (select tab)
* Popup confirmation: An attempt to open a separate window (not a separate
  tab in the same window) must be explicitly allowed by the user (see
  screenshot for example of Allow/Deny dilaogue)


## Limitations

* Managing of named windows and setting of new window attributes is not
  supported. Attempting to open two links in a window named `foo` will not
  navigate the same window twice. Attributes (e.g., width, height, resizable)
  to `window.open()` will be ignored.


## Publishing to the Chrome Web Store

Here are the instructions for publishing the app to the Chrome Web Store:
* [Publish in the Chrome Web Store](https://developer.chrome.com/webstore/publish)

In a nutshell, you zip up the project directory (KSD-Test-Browser), then go to the 
[Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard/), 
click Edit for the appropriate project, then Uploaded Updated Package. Finally, 
remember to click Publish Changes.

Visibility options should be set to Unlisted.


## Resources

* [Webview New Window API](https://developer.chrome.com/apps/tags/webview#event-newwindow)
* [Webview](http://developer.chrome.com/apps/app_external.html#webview)
* [Permissions](http://developer.chrome.com/apps/manifest.html#permissions)


## Screenshot
![screenshot](/assets/screenshot_1280_800.png)
