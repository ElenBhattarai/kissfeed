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

