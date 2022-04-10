import React, {useState} from 'react'
import Article from './Article'
const { Configuration, OpenAIApi } = require("openai");


function Modal(props) {
    const [input, setInput] = useState("")
    const [checked, setChecked] = useState([]);
    const [apiResponse, setapiResponse] = useState("")
    const checkList = ["NBC", "BBC", "CNN", "FOX"];
    
    const api2 = async ()=> {
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: "Summarize this for a second-grade student:\n\n" + input + "\n",
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      setapiResponse(response.data.choices[0].text)

      props.submitCustom()
    }
    
    
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);

      };

      const print = () => {
        let sourceList = []
        for (let source of checked) {
          if (source === "FOX") {
            sourceList.push("foxnews")
          } else if (source === "NBC") {
            sourceList.push("nbcnews")
          } else {
            sourceList.push(source.toLowerCase())
          }
        }
        if (!(sourceList.length === 0)) {
          fetch(`https://newsdata.io/api/1/news?apikey=pub_6375f9eb220b3001124d9d048a38e57d94e5&domain=${sourceList.join(',')}`)
          .then((res) => res.json())
          .then((res)=> props.setdata(res))
          fetch(`https://newsdata.io/api/1/news?apikey=pub_6375f9eb220b3001124d9d048a38e57d94e5&domain=foxnews,bbc,nbcnews,cnn`)
          .then((res) => res.json())
          .then((res)=> props.setalldata(res))
          if (props.data) {
            props.setSubmit(false)
          }
        }
          
        
    
    }
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    var isChecked = (item) => checked.includes(item) ? "checked-item" : "not-checked-item";

    return (
    <div>
        {props.type === 'checklist' ? <div className="app" class= 'modal' id='checklist'>
          <div className="checkList modal-content">
            <div className="title">Source You Want to Follow:</div>
            <div className="list-container">
              {checkList.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>
            <div class = 'submit-container'>
              <button class = 'submit close' onClick = {print} >Submit </button><br/>
            </div>
          </div>
         </div>: props.type === 'custom' ? 
         <div className="app" class= 'modal' id='custom' onClick={props.clearCustom}>
          <div className="checkList modal-content" onClick={e => e.stopPropagation()}>
            <div className="title">Custom:</div>
            <textarea className="text-area" onChange={handleChange} value={input}>

            </textarea>
            <div class = 'submit-container'>
            <button class = 'submit close' onClick={api2}  >Submit </button>
            </div>
          </div>
          <br/>
          <div onClick={e => e.stopPropagation()}>
            {props.submitted ? <Article title={props.title} image={props.image} class="custom-article" author="dsjakldsajkdsa" text={apiResponse}></Article>: null} 
          </div>
          
         </div>: props.type === 'Article' ?
         <div className="app" class= 'modal' id = 'article' onClick={props.articleClick}>
          <div className="article-content modal-content" onClick={e => e.stopPropagation()}>
            <div className="title">{props.title}</div>
            <div className="list-container article-container">
              <div class='image-container'>
                <img class= 'article-image' src={props.image} alt='N/A'></img>
              </div>
              <div class = 'article-text'>
                {props.text}
              </div>
            </div>
           
          </div>
          <br/>
         </div> : null
            }
        
    </div>
)
}

export default Modal