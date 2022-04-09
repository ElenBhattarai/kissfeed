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
        <div id = 'newsrow'> 
                {props.title}
        </div>
        {clicked && (
                <div id = 'newsrowtext'>
                  {props.teaser} 
                  <button onClick = {() => handleClick()}>View the article</button>
                </div>
                
        )}
        {body && (
            <div id = 'newsrowtext'>
                <button onClick = {handleClose}>Close Article</button>
                {props.text}
            </div>
            )
        }
     </div>
    )
}

export default Article

