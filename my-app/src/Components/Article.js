import React, {useState} from 'react';

function Article(props) {
    let data;
    const [clicked, setClicked] = useState(true)
    const [body, setBody] = useState(false)

    // const apiwork = () => {
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
      
    
  


    const handleClick = ()=> {
        if (clicked) {
            setClicked(false)
            setBody(true)
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

