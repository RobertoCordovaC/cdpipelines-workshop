import script from 'scriptjs'

require('./styles.scss')

script('https://remarkjs.com/downloads/remark-latest.min.js', 'loader')

script.ready('loader', () => {
  var slideshow = remark.create({
    sourceUrl: './content/content.md',
    ratio: '16:9'
  })
});
