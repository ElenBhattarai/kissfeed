
var parser = require('article-parser')
const url = 'https://www.bbc.com/news/world-europe-61048256'

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

let content2;
let response;




parser.extract(url).then((article) => {
    let content = article.content.replace(/(<([^>]+)>)/ig, "")
    console.log(content)
    return content
    }).catch((err) => {
    console.trace(err)
}).then((content)=> {
    const openai2 = async()=> {
        response = await openai.createCompletion("text-davinci-002", {
        prompt: content,
        temperature: 0.6,
        max_tokens: 3000,
        top_p: 0.52,
        frequency_penalty: 0.76,
        presence_penalty: 0.0,
    })
    console.log(response.data.choices)
}
    openai2()
    
})



