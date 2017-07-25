import remark from 'remark'
import recommended from 'remark-preset-lint-recommended'
import html from 'remark-html'
import report from 'vfile-reporter'

remark()
  .use(recommended)
  .use(html)
  .process('## Hello world!!', (err, file) => {
    console.error(report(err || file))
    console.log(String(file))
  })
