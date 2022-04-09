import React, {useState} from 'react';

function Article(props) {
    const [clicked, setClicked] = useState(true)
    const [body, setBody] = useState(false)
    
  
    const retrieveArticle = (e) => {

        var parser = require('article-parser')
        const { Configuration, OpenAIApi } = require("openai");
        
        const configuration = new Configuration({
        apiKey: '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'
        });
        const openai = new OpenAIApi(configuration);

        let response;
        parser.extract().then((article) => {
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

export default Article

