var bourbon = require('node-bourbon')
fis.match('*.scss', {
  parser: fis.plugin('node-sass', {
    include_paths: bourbon.includePaths
  }),
  rExt: '.css'
})
