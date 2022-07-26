import React, {useState} from "react"
import Article from "./Article"
import articleService from "../Services/reqArticle.js"
import userService from '../Services/user'
import LoginForm from "./LoginForm"
import SignUp from './SignUp'
const { Configuration, OpenAIApi } = require("openai")


function Modal(props) {
    const [input, setInput] = useState("")
    const [checked, setChecked] = useState(props.followed)
    const [disabled, setDisabled] = useState(false)
    const [apiResponse, setapiResponse] = useState('')
    const [showLogin, setShowLogin] = useState(true)
    const checkList = [
      {
        "name": "NBC",
        "url": "https://www.nbcnews.com"
      },
      {
        "name": "USA",
        "url": "https://www.usatoday.com"
      },
      {
        "name": "CBS",
        "url": "https://www.cbsnews.com"
      },
      {
        "name": "NPR",
        "url": "https://www.npr.org"
      }
    ]
    
    const api2 = async () => {
      // const configuration = new Configuration({
      //   apiKey: "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",
      // })
      // const openai = new OpenAIApi(configuration)
      // const response = await openai.createCompletion("text-davinci-002", {
      //   prompt: "Summarize this for a second-grade student:\n\n" + input + "\n",
      //   max_tokens: 180,
      //   top_p: 1.0,
      //   frequency_penalty: 0.0,
      //   presence_penalty: 0.0,
      // })

      // setapiResponse(response.data.choices[0].text)
      // props.submitCustom()
    }
    
    
    const handleCheck = (event) => {
      const updatedList = event.target.checked
        ? [...checked, event.target.value]
        : checked.splice(checked.indexOf(event.target.value), 1)

      setChecked(updatedList)

    }

    const print = async () => {
      let sources = { "limit": props.articleCount, "urls": checked }
      console.log(sources)
      if (!(sources.urls.length === 0)) {

        const data = await articleService.reqArticles(sources)
        props.setdata(data)
        props.setalldata(data)
        setDisabled(true)
        props.setSelected(0)
        props.setFollowed(checked)
        await userService.addFollowed({
          username: props.user.username,
          followed: checked,
          articleCount: props.articleCount
        })
        // if (props.data) {
        //   props.setSubmit(false)
        // }
      }
    }
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    var isChecked = (item) => checked.includes(item) ? "checked-item" : "not-checked-item"

    const switchLogin = () => {
      setShowLogin(!showLogin)
    }
    return (
    <div>
        {props.type === "checklist"
        ? <div className="app modal"  id="checklist" onClick={() => props.setShowChecklist(false)}>
            <div className="checkList modal-content" onClick={e => e.stopPropagation()}>
              <div className="title">Source You Want to Follow:</div>
              <div className="list-container">
                {checkList.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.url}
                      type="checkbox"
                      defaultChecked={props.followed.includes(item.url)}
                      onChange={handleCheck}
                    />
                    <span className={isChecked(item.name)}>{item.name}</span>
                  </div>
                ))}
              </div>
              <br/>
              <div>
                Article count:
                <input type='text'
                  value={props.articleCount}
                  onChange={(e) => props.setArticleCount(e.target.value)}
                />
              </div>
              <div className = "submit-container">
                <button className = "submit close" disabled={disabled} onClick = {print} >Submit </button><br/>
              </div>
            </div>
         </div>
        : props.type === "custom"
        ? <div className="app modal" id="custom" onClick={props.clearCustom}>
            <div className="checkList modal-content" onClick={e => e.stopPropagation()}>
              <div className="title">Custom:</div>
              <textarea className="text-area" onChange={handleChange} value={input}>

              </textarea>
              <div className = "submit-container">
                <button className = "submit close" onClick={api2}  >Submit </button>
              </div>
            </div>
            <br/>
            <div onClick={e => e.stopPropagation()}>
              {props.submitted
                ? <Article
                    title={props.title}
                    image={props.image}
                    className="custom-article"
                    author="custom"
                    text={apiResponse}
                  />
                : null} 
            </div>
          
          </div>
        : props.type === "Article"
        ? <div className="app modal" id = "article" onClick={props.articleClick}>
            <div className="article-content modal-content" onClick={e => e.stopPropagation()}>
              <div className="title">{props.title}</div>
              <div className="list-container article-container">
                <div class="image-container">
                  <a target="_blank" rel="noopener noreferrer" href={props.link}>
                    <img className= "article-image" src={props.image} alt="N/A" />
                  </a>
                </div>
                <div className = "article-text">
                  {props.text}
                </div>
              </div>
            
            </div>
            <br/>
         </div>
        : props.type === "Login"
        ? <div className="app modal">
            {showLogin
              ? <div className="checkList modal-content">
                  <div className="title">Login</div>
                  <LoginForm
                    setUser={props.setUser}
                    setSubmit={props.setSubmit}
                    getUserInfo={props.getUserInfo}
                  />
                  <button onClick={switchLogin}>
                    Sign Up
                  </button>
                </div>
              : <div className="checkList modal-content">
                  <div className="title">Sign Up</div>
                  <SignUp/>
                  <button onClick={switchLogin}>
                    Log In
                  </button>
                </div>
            }
          </div>

        : null
      }
        
    </div>
)
}

export default Modal