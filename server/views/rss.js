
var parser = require('article-parser')
const url = 'https://www.nbcnews.com/news/world/live-blog/russia-ukraine-war-live-updates-moscow-condemned-train-station-strike-rcna23710'

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


parser.extract(url).then((article) => {
<<<<<<< HEAD
    let res = article.content.replaceAll("<")

    
=======
    console.log(typeof article.content)
    console.log(article.content.replace(/(<([^>]+)>)/ig, ""))
>>>>>>> a7b9622652cc8d52603d5c4745e1630772345e6a
    }).catch((err) => {
    console.trace(err)
})
// const fetchapi = async () => {
//     const res = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2022-03-09&sortBy=publishedAt&apiKey=55463d78ac65493fa8a2fa395767889e")
//     let data = await res.json()
//     console.log(data)
// }

// fetchapi()
