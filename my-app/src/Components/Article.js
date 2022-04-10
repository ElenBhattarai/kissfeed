import React, {useState, useEffect} from 'react';
import defaultImage from './e1a.png'
import Modal from './Modal'
const { Configuration, OpenAIApi } = require("openai");

function Article(props) {
    const [clicked, setClicked] = useState(true)
    const [apiData,setapiData] = useState("")
     
    const [time, setTime] = useState("")

    // const    iwork = () => {
    //     for (let da of data.articles) {
    //       console.log(da.title)
    //       console.log(da.content)
    //     }
    
    //     console.log(data.articles[0].content)
    // }
  
    const api2 = async ()=> {
        const configuration = new Configuration({
          apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion("text-davinci-002", {
          prompt: "Summarize this for a second-grade student:\n\n" + props.text + "\n",
          max_tokens: 64,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        });
        
        console.log(props.text)
        console.log(response.data.choices[0].text)
        setapiData(response.data.choices[0].text)
        
      }

    // const fetchapi = async () => {
    //     const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=af5bdfeae6464c97b5e8c26fbc0f764c")
    //     data = await res.json();
    //     console.log(data.articles)
    //     apiwork()
    //   }
    
    //   fetchapi()
      
    // let date = new Date(props.date)
    // setTime(date.getTime())


    
    useEffect(() => {
        let date = new Date(props.date)
        setTime(date.toLocaleString())
    })
    
    const handleClick = (url)=> {
        if (clicked) {
            setClicked(false)
        }
        api2()
    }
    const articleClick = () => {
        setClicked(true)
        
        
    }
    return (
    <div class={`article ${props.class}`} onClick = {() => handleClick()}>
        <div id = 'imageblock'>
            <img src={props.image ? props.image : defaultImage} alt="ron is gay" ></img>
        </div>
        <div id = 'totalNews'>
            <div class = 'newsrow'>
                    {props.title}
            </div>
        <div id = 'newsinfo' >
            <div class = 'author'>
                {props.author}
            </div>
            <div id = 'newsinfo' >
                <div class = 'author'>
                    {props.author}
                </div>
                <div class = 'date'>
                    {time}
                </div>
            </div>
                <div class = 'newsrowtext'>
                {props.teaser}
                </div>
        </div>
            { !clicked && props.class === "articles" ? <Modal type="Article" articleClick={articleClick} text={apiData} image={props.image} title={props.title}></Modal> : !clicked && props.class === "custom-article" ? <Modal type="Article" articleClick={articleClick} text={props.text}></Modal>: null}
        </div>
     </div>
    )
}


export default Article

