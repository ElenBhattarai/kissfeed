import React, {useState, useEffect} from 'react';
import defaultImage from './e1a.png'
import Modal from './Modal'
import articleService from '../Services/article'
const { Configuration, OpenAIApi } = require("openai");


function Article(props) {
    const [clicked, setClicked] = useState(true)
    const [apiData, setapiData] = useState('')
    const favorite = props.user
        ? props.article.users.includes(props.user.id)
        : false

    // const iwork = () => {
    //     for (let da of data.articles) {
    //       console.log(da.title)
    //       console.log(da.content)
    //     }
    
    //     console.log(data.articles[0].content)
    // }
  
    // const api2 = async () => {
    //     const configuration = new Configuration({
    //       apiKey: "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",
    //     });
    //     const openai = new OpenAIApi(configuration);
    //     const response = await openai.createCompletion("text-davinci-002", {
    //       prompt: "Summarize this for a second-grade student:\n\n" + props.text + "\n",
    //       max_tokens: 180,
    //       top_p: 1.0,
    //       frequency_penalty: 0.0,
    //       presence_penalty: 0.0,
    //     });
        
    //     setapiData(response.data.choices[0].text)
        
    // }

    // const fetchapi = async () => {
    //     const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=af5bdfeae6464c97b5e8c26fbc0f764c")
    //     data = await res.json();
    //     console.log(data.articles)
    //     apiwork()
    //   }
    
    //   fetchapi()
      
    // let date = new Date(props.date)
    // setTime(date.getTime())
    
    const handleClick = (url)=> {
        if (clicked) {
            setClicked(false)
        }
        //api2()
    }
    const articleClick = () => {
        setClicked(true)
    }
    const favoriteArticle = async (e) => {
        e.stopPropagation()
        if (favorite) {
            props.article.users = props.article.users.concat(props.user.id)

        } else {
            props.article.users.filter(id => id !== props.user.id)
        }

        const articleToChange = await articleService.favorite(props.article.id, props.article)
        props.updateArticle(articleToChange, favorite)
    }
    
    return (
    <div className={`article ${props.class}`} onClick = {() => handleClick()}>
        <div id = 'imageblock'>
            <img
                src={
                    props.article.image
                    ? props.article.image
                    : defaultImage
                }
                alt="no image"
            />
        </div>
        <div id = 'totalNews'>
            <div className = 'newsrow'>
                {props.article.title}
            </div>
            <div id = 'newsinfo' >
                <div className = 'author'>
                    {props.article.author}
                </div>
                <div>
                    {props.article.source}
                </div>
                <div>
                    <button onClick={favoriteArticle}>
                        {favorite ? 'Remove favorite' : 'Add favorite'}
                    </button>
                </div>
            </div>
            { !clicked && props.class === "articles"
            ? <Modal
                type="Article"
                articleClick={articleClick}
                link={props.article.link}
                text={props.article.text.replace(/\\n/, ' ')}
                image={props.article.image}
                title={props.article.title}
                />
            : !clicked && props.class === "custom-article"
            ? <Modal
                type="Article"
                articleClick={articleClick}
                text={props.text}
                />
            : null}
        </div>
    </div>
    )
}


export default Article

