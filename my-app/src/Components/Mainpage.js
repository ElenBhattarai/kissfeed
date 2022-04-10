
import '../App.css';

import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'


import Followed from './Followed.js'
import Recent from './Recent.js'
import HomePage from './HomePage.js'


function MainPage(prop) {
    
    
    
    const [followed, setFollowed] = useState(false)
    const [selected,setSelected] = useState(false)
    const [isData, setData] = useState(false);
    const handleFollowed = () => {
      setFollowed(true);
      setSelected(true);
      console.log(prop.data.articles)
    }
    const handleRecent = () => {
      setFollowed(false);
      setSelected(false);
    }
    
    useEffect(() => {
      console.log(prop.data)
      if (Object.keys(prop.data).length != 0) setData(true);
    })
  
    // const fetchapi = async () => {
    //   const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c8503c90442c4249860c2ead0a8ce1f8")
    //   data = await res.json();
    //   // console.log(data.articles)
    //   setrequest(true)
    //   apiwork()
    // }
  
    // fetchapi()
    
    // const apiwork = () => {
    //   // for (let da of data.articles) {
    //   //   // console.log(da.title)
    //   //   console.log(da.content)
    //   // }
  
    //   console.log(data.articles[0].content)
    // }
  
    
    
  
  
  
  
    return (
      
      <div >
        <header className="App-header">
          <div id = 'theHeader'>
          <h1 class = 'hTitle'>
            KISSFEED
          </h1>
          <div class = 'search'>
            <text class = 'searchtext'>
              Search...
            </text>
          </div>
          </div>
        </header>
        <body>
          <div class = 'mainpage'>
            <div id = 'column1' class = {selected ? 'followed': 'recent'}>
                <div class = 'row1'>
                  <button  class= 'sidebarbutton all'  onClick={() => handleRecent()}>
                  All
                  </button>
                </div>
                <div class = 'row1'>
                  <button class = 'sidebarbutton follow' onClick= {() => handleFollowed()}>
                    Followed
                  </button>
                  
                </div>
                
                <div class = 'row1-custom'>
                  <button class = 'sidebarbutton' >
                  Custom
                  </button>
                </div>
  
  
            </div>
            <div id = 'column2'>
              
                {followed ? (
                  <Followed data={prop.data.articles}></Followed>
                ) : isData ? (
                    <Recent data={prop.data.articles}></Recent>
                  ): null}
        
            </div>
          </div>
        </body>
      </div>
    );
  }

export default MainPage