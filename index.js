var remark = require('remark')
var recommended = require('remark-preset-lint-recommended')
var html = require('remark-html')
var report = require('vfile-reporter')

remark()
  .use(recommended)
  .use(html)
  .process('## Hello world!', (err, file) => {
    console.error(report(err || file))
    console.log(String(file))
  })
