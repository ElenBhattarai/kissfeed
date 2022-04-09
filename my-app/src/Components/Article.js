import React, {useState} from 'react';

function Article(props) {
    const [clicked, setClicked] = useState(true)
    const [body, setBody] = useState(false)
    
  

    const handleClose = ()=> {
        setClicked(true)
        setBody(false)
    }

    const handleClick = ()=> {
        setClicked(false)
        setBody(true)
    }
    return (
    <div>
        <div class = 'newsrow'> 
                {props.title}
        </div>
        {clicked && (
                <div class = 'newsrowtext'>
                  {props.teaser} 
                  <button id = 'articlebutton' onClick = {() => handleClick()}>View the article</button>
                </div>
                
        )}
        {body && (
            <div class = 'newsrowtext'>
                <button id = 'articlebutton' onClick = {handleClose}>Close Article</button>
                {props.text}
            </div>
            )
        }
     </div>
    )
}

export default Article

