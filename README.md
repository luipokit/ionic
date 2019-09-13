# Install
npm install

# Dev Server
ionic serve

# Build on Android
ionic cordova build android

# Build on iOS
ionic cordova build ios

# Build on devapp
ionic serve --devapp

# CROS 
close all the chrome first
open -a Google\ Chrome --args --disable-web-security --user-data-dir

# Unit Testing 
ng test

https://ionicframework.com/docs/building/testing
https://angular.io/guide/testing#component-test-basics
https://medium.com/@manivel45/angular-7-unit-testing-code-coverage-5c7a238315b6

# Debug
Debug specs in the browser in the same way that you debug an application.

1. Reveal the karma browser window (hidden earlier).
2. Click the DEBUG button; it opens a new browser tab and re-runs the tests.
3. Open the browser’s “Developer Tools” (Ctrl+Shift+I on windows; command + option + I in OSX).
4. Pick the “sources” section.
5. Open the app.component.spec.ts test file (Control/Command-P, then start typing the name of the file).
6. Set a breakpoint in the test.
7. Refresh the browser, and it stops at the breakpoint.