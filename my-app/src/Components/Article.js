import React, {useState} from 'react';

function Article(props) {
    const [clicked, setClicked] = useState(true)
    const [body, setBody] = useState(false)
    
  
    const retrieveArticle = () => {

        var parser = require('article-parser')
        const url = 'https://www.bbc.com/news/world-asia-61055210'

        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
        apiKey: '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'
        });
        const openai = new OpenAIApi(configuration);

        let response;

        const truncate = (str, max) => str.length < max ? str : `${str.substr(0, str.substr(0, max).lastIndexOf(' '))}`

        parser.extract(url).then((article) => {
            
            let content = article.content.replace(/(<([^>]+)>)/ig, "")
            content = content.replace(/(\r\n|\n|\r)/gm, "")
            console.log(content)

            return content
        }).catch((err) => {
            console.trace(err)
        }).then((content)=> {
            let iterations = content.length / 1500
            let simplified = String()
            for (let i=0; i < iterations; i++) {
                content = content.replace(truncate(content, 1500), "")
                if (content.length < 100) {
                    continue
                }
                const openai2 = async()=> {
                    response = await openai.createCompletion("text-davinci-002", {
                        prompt: "Summarize this for a second-grade student:\n\n" + content,
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
                console.log(simplified, "test\n\n")
            }
            
        })
    }

    const handleClick = ()=> {
        if (clicked) {
            setClicked(false)
            setBody(true)
            retrieveArticle()
        } else {
            setClicked(true)
            setBody(false)
        }
    }
    return (
    <div class="article" onClick = {() => handleClick()}>
        <div class = 'newsrow'> 
                {props.title}
        </div>
        {clicked ? (
                <div class = 'newsrowtext'>
                  {props.teaser} 
                </div>
                
        ) : (
            <div class = 'newsrowtext'>
                {props.text}
            </div>
         )
        }
     </div>
    )
}

var parser = require('article-parser')
const url = 'https://www.bbc.com/news/world-asia-61055210'

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
apiKey: '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'
});
const openai = new OpenAIApi(configuration);

let response;

const truncate = (str, max) => str.length < max ? str : `${str.substr(0, str.substr(0, max).lastIndexOf(' '))}`

parser.extract(url).then((article) => {
    
    let content = article.content.replace(/(<([^>]+)>)/ig, "")
    content = content.replace(/(\r\n|\n|\r)/gm, "")
    console.log(content)

    return content
}).catch((err) => {
    console.trace(err)
}).then((content)=> {
    let iterations = content.length / 1500
    let simplified = String()
    for (let i=0; i < iterations; i++) {
        content = content.replace(truncate(content, 1500), "")
        if (content.length < 100) {
            continue
        }
        const openai2 = async()=> {
            response = await openai.createCompletion("text-davinci-002", {
                prompt: "Summarize this for a second-grade student:\n\n" + content,
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
        console.log(simplified, "test\n\n")
    }
    
})

export default Article

