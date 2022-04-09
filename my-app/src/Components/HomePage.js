import React, { useState,useEffect } from "react";
import {Link, useLocation} from "react-router-dom"


export default function HomePage() {
  const [checked, setChecked] = useState([]);
  const checkList = ["nbc", "bbc", "cnn", "foxnews"];
  const [data,setdata] = useState({})
  const [count,setCount] = useState(0)

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };



  // Generate string of checked items
  
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";


    const print = () => {
        let urls = []

        fetch(`https://newsapi.org/v2/everything?domains=nytimes.com,cnn.com&language=en&pageSize=9&apiKey=af5bdfeae6464c97b5e8c26fbc0f764c`)
        .then((res) => res.json())
        .then((res)=> setdata(res))
        if(count == 1){
            print2()   
        }
        setCount(1)  
    }

    const print2 = () => {
      console.log(data.articles.props)
    }



    //   const print = () => {
    //     console.log(data.articles[0].url)
    //     // for (let da of data.articles) {
    //     //     console.log(da.title)
    //     //     console.log(da.content)
    //     // }
    //   }


//     useEffect = () => {
      
//     }
//     const fetchapi = async () => {
//     const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c8503c90442c4249860c2ead0a8ce1f8")
//     const data = await res.json();
//     setdata(data)
//     console.log(data)

//     // console.log(data.articles)
//     // apiwork()
//   }

//   fetchapi()
  
//   const apiwork = () => {
//     for (let da of data.articles) {
//       // console.log(da.title)
//       console.log(da.content)
//     }

//     console.log(data.articles[0].content)
//   }
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";
    return (
        <div className="app">
          <div className="checkList">
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
          <button onClick = {print} >Submit </button><br/>
          <Link to = {"/app"} state = {{data:data}}>Link</Link>
        </div>
      );

}
