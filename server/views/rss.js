
var parser = require('article-parser')
const url = 'https://arbitrary.com'

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: 'secret'
})
const openai = new OpenAIApi(configuration)

let response

const truncate = (str, max) => str.length < max ? str : `${str.substr(0, str.substr(0, max).lastIndexOf(' '))}`

parser.extract(url).then((article) => {
    let content = article.content.replace(/(<([^>]+)>)/ig, '')
    content = content.replace(/(\r\n|\n|\r)/gm, '')
    console.log(content)

    return content
}).catch((err) => {
    console.trace(err)
}).then((content) => {
    let iterations = content.length / 1500
    let simplified = String()
    for (let i=0; i < iterations; i++) {
        content = content.replace(truncate(content, 1500), '')
        if (content.length < 100) {
            continue
        }
        const openai2 = async () => {
            response = await openai.createCompletion('text-davinci-002', {
                prompt: 'Summarize this for a second-grade student:\n\n' + content,
                temperature: 0.7,
                max_tokens: 300,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            })
            console.log(response.data.choices[0].text)
            simplified = simplified.concat(response.data.choices[0].text)
        }
        openai2()
        console.log(simplified, 'test\n\n')
    }
})



// const openai2 = async()=> {
//     response = await openai.createCompletion('text-davinci-002', {
//         prompt: 'Summarize this for a second-grade student:\n\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.',
//         temperature: 0.7,
//         max_tokens: 64,
//         top_p: 1.0,
//         frequency_penalty: 0.0,
//         presence_penalty: 0.0,
//     })
//     console.log(response.data.choices)
// }
// openai2()