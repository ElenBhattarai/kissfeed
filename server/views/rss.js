
var parser = require('article-parser')
const url = 'https://www.nbcnews.com/news/world/live-blog/russia-ukraine-war-live-updates-moscow-condemned-train-station-strike-rcna23710'

parser.extract(url).then((article) => {
    console.log(article)
    }).catch((err) => {
    console.trace(err)
})