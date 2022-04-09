
var parser = require('article-parser')
const url = 'https://www.nbcnews.com/news/world/live-blog/russia-ukraine-war-live-updates-moscow-condemned-train-station-strike-rcna23710'

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


parser.extract(url).then((article) => {
    let res = article.content.replaceAll("<")

    }).catch((err) => {
    console.trace(err)
})

const response = await openai.createCompletion("text-davinci-002", {
    prompt: "Summarize this for a second-grade student:\n\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.",
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });


// const fetchapi = async () => {
//     const res = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2022-03-09&sortBy=publishedAt&apiKey=55463d78ac65493fa8a2fa395767889e")
//     let data = await res.json()
//     console.log(data)
// }

// fetchapi()
