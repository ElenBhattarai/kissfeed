import React, { useState} from 'react'
import image from './e1a.png'
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
        prompt: input,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      console.log(response.data.choices[0].text)
    }
    
    let temp = {}
    
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

        fetch(`https://newsdata.io/api/1/news?apikey=pub_6375f9eb220b3001124d9d048a38e57d94e5&domain=cnn`)
        .then((res) => res.json())
        .then((res)=> props.setdata(res))
        
        if (props.data) {
          console.log(props.data)
          props.setSubmit(false)
        }
    
    }
    const handleChange = (e) => {
        setInput(e.target.value)
        console.log(input)
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
            {props.submitted ? <Article title="Custom" teaser="we are custards here" date="9/11" image={image} class="custom-article" author="dsjakldsajkdsa"></Article>: null} 
          </div>
          
         </div>: props.type === 'Article' ?
         <div className="app" class= 'modal' id = 'article' onClick={props.articleClick}>
          <div className="article-content modal-content" onClick={e => e.stopPropagation()}>
            <div className="title">Article</div>
            <div className="list-container article-container">
              <div class='image-container'>
                <img class= 'article-image' src={image}></img>
              </div>
              <div class = 'article-text'>
              It was the final question raised by a group of 11 NFL team owners as they mingled inside the sixth-floor conference room at the league's Park Avenue headquarters in New York City, minutes before they were to meet with a group of 12 players, one former player and three union leaders on the morning of Tuesday, Oct. 17. The day already had been stressful, and the meeting hadn't even started. League executives had spent that morning as they had the previous four weeks: grappling with a series of events the league and owners could not control, unleashed by President Donald Trump's harsh criticism of the decision by a handful of players to kneel during the national anthem.

Morale was bad inside the league office, and the pressure was not letting up. There was the looming notion that sponsors would leave the NFL -- not just because of the protests but because of an array of challenges confronting the league, including the continuing decline in TV ratings. Nearly all of the league's longtime sponsors, from Papa John's to USAA, were rattled, and fissures within the league offices and teams, to say nothing of the players, were starting to expand.

Among many league and team executives, the games had become, improbably, an afterthought. These two days of New York meetings held the potential to provide a measure of hope -- a way for owners to formulate a plan with players that would satisfy disenchanted fans and advertisers. It was no secret that commissioner Roger Goodell and the owners wanted the players to stop kneeling during the anthem immediately. A week earlier, Goodell said that he hoped owners and players could "move past" the anthem issue at the meetings. If and how that could be accomplished was unclear. After Goodell's statement, Jerry Jones, the Dallas Cowboys' owner, threatened to bench any player who knelt, the only owner to issue such an ultimatum, one that won praise in Texas and across much of America's heartland. Spurred on by Jones' stance, some hard-line owners looked at the meetings as the opportunity to vote on a mandate that would force all players to stand for the anthem.

For weeks, Goodell had tried to get in front of the issue. One owner had complained that NBA commissioner Adam Silver got away with ordering players to stand because, unlike Goodell, he has a good relationship with the union. Another owner had remarked to a colleague that Trump would like nothing more than for players to strike over the protests, maybe forcing a suspension of the season.

As owners filed into the large conference room featuring a massive, football-shaped table, everyone feared the discussion could get ugly. NFL executive Troy Vincent, who cared deeply about the players' concerns but had little patience for the protests, called San Francisco 49ers GM John Lynch the Saturday before the meeting. He told him that if safety Eric Reid, one of the most ardent protesters, knelt the next day, he shouldn't "bother to show up" at the players-owners meeting because nobody would take him seriously, according to people briefed on the call. Reid knelt anyway. And he intended to show up.

Just before Reid and the other players and union leadership arrived, talk among the owners turned to a final issue, small but symbolic: the seating arrangement. In collective bargaining negotiations, the owners sat opposite players and union representatives. But Goodell told the owners their job that morning was to listen; the session was not a negotiation or anything that could be resolved by a quid pro quo. The owners decided the meeting would have to start with the tiniest of gestures:
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