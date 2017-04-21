const electron = require('electron')
const dialog = electron.dialog
const shell = electron.shell
const superagent = require('superagent')
const config = require('./../../package.json')
const semver = require('semver')

var url = config.repository.url
url = url.replace('github.com', 'raw.githubusercontent.com').replace(/\.git$/, '/master/package.json')
var downloadUrl = config.website
module.exports = function () {
  superagent
    .get(url)
    .end(function (err, res) {
      if (err || !res.ok) {
        console.log(err)
      } else {
        try {
          let newVersion = JSON.parse(res.text).version
          let oldVersion = config.version
          if (semver.gt(newVersion, oldVersion)) {
            let confirm = dialog.showMessageBox({
              type: 'info',
              message: 'A new version ' + newVersion + ' of ' + config.name + ' is available.',
              detail: 'Do you want to download it now?',
              buttons: ['Yes', 'No']
            })
            if (confirm === 0) {
              shell.openExternal(downloadUrl)
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
    })
}
