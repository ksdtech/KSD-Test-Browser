# KSD-Test-Browser
A Chrome App for test-taking in kiosk mode on a Chromebook.

Here are the instructions for publishing the app to the Chrome Web Store:
https://developer.chrome.com/webstore/publish

This was derived from the official Chrome App Sample for the Webview Tag.

# Original README:

Sample that shows how to use the [webview tag](http://developer.chrome.com/apps/app_external.html#webview)
in an app to create a mini browser.

The app's main window contains a `<webview>` that is sized to fit most of it
(via the `width` and `height` attributes). The location bar is used to
update its `src` attribute.

`<webview>` is the preferred way for you to load web content into your app. It
runs in a separate process and has its own storage, ensuring the security and
reliability of your application.

## Resources

* [Webview](http://developer.chrome.com/apps/app_external.html#webview)
* [Permissions](http://developer.chrome.com/apps/manifest.html#permissions)