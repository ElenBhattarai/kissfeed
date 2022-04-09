import React, {useState} from 'react';

function Article(props) {
    const [clicked, setClicked] = useState(true)
    const [body, setBody] = useState(false)
    
  


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
        <div id = 'newsinfo' >
            <div class = 'author'>
                John DOes
            </div>
            <div class = 'date'>
                9/21/22
            </div>
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

