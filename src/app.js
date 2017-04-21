const menubar = require('menubar')
const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const path = require('path')

const config = require('./../package.json')
const autoUpdate = require('./lib/autoupdate')

const mb = menubar({
  index: path.join('file://', __dirname, '/../', '/dist/index.html'),
  width: 280,
  height: 480,
  resizable: false,
  showDockIcon: false,
  preloadWindow: true
})

mb.on('ready', function ready () {
  // 检测升级
  // autoUpdate()
})

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('will-quit', function () {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
