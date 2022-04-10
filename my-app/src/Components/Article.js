import React, {useState, useEffect} from 'react';
import defaultImage from './e1a.png'
import Modal from './Modal'

function Article(props) {
    const [clicked, setClicked] = useState(true)
    
    const [time, setTime] = useState("")

    // const    iwork = () => {
    //     for (let da of data.articles) {
    //       console.log(da.title)
    //       console.log(da.content)
    //     }
    
    //     console.log(data.articles[0].content)
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
    
    useEffect(() => {
        let date = new Date(props.date)
        setTime(date.toLocaleString())
    })
    
    const handleClick = ()=> {
        if (clicked) {
            setClicked(false)
        }
    }
    const articleClick = () => {
        setClicked(true)
        console.log("DJSADJSAKLDJKALD")
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
            <div class = 'date'>
                {time}
            </div>
                <div class = 'newsrowtext'>
                {props.teaser} 
                </div>
        </div>
            {!clicked ? <Modal type="Article" articleClick={articleClick} text={props.text}></Modal>: null}
        </div>
     </div>
    )
}

export default Article

