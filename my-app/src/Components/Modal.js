import React, { useState} from 'react'



function Modal(props) {
    const [checked, setChecked] = useState([]);
    const checkList = ["nbc", "bbc", "cnn", "foxnews"];
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
        

        fetch(`https://newsapi.org/v2/everything?domains=nytimes.com,cnn.com&language=en&pageSize=9&apiKey=af5bdfeae6464c97b5e8c26fbc0f764c`)
        .then((res) => res.json())
        .then((res)=> props.setdata(res))
        
 
        if (props.data) {
          props.setSubmit(false)
        }
        
    }
    var isChecked = (item) => checked.includes(item) ? "checked-item" : "not-checked-item";

    return (
    <div>
        {props.type === 'checklist' ? <div className="app" class= 'modal' id='mymModal'>
          <div className="checkList modal-content">
            <div className="title">Your CheckList:</div>
            <div className="list-container">
              {checkList.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <button class = 'submit close' onClick = {print} >Submit </button><br/>
         </div>: props.type === 'custom' ? 
         <div className="app" class= 'modal' id='mymModal'>
          <div className="checkList modal-content">
            <div className="title">Custom:</div>
            <div className="list-container">
              {checkList.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={props.clearCustom}/>
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <button class = 'submit close'  >Submit </button><br/>
         </div>: props.type === 'Article' ?
         <div className="app" class= 'modal' id='mymModal'>
          <div className="checkList modal-content">
            <div className="title">Article</div>
            <div className="list-container">
              {checkList.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <button class = 'submit close' onClick = {print} >Submit </button><br/>
         </div> : null
            }
        
    </div>
)
}

export default Modal