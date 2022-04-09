
var parser = require('article-parser')
const url = 'https://www.nbcnews.com/news/world/live-blog/russia-ukraine-war-live-updates-moscow-condemned-train-station-strike-rcna23710'

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let content
content = parser.extract(url).then((article) => {
    return article.content.replace(/(<([^>]+)>)/ig, "")
    }).catch((err) => {
    console.trace(err) 
})
console.log(content)
// const fetchapi = async () => {
//     const res = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2022-03-09&sortBy=publishedAt&apiKey=55463d78ac65493fa8a2fa395767889e")
//     let data = await res.json()
//     console.log(data)
// }

// fetchapi()
