
import '../App.css';

import React, {useState, useEffect} from 'react';
import Modal from './Modal.js'


import Followed from './Followed.js'
import Recent from './Recent.js'



function MainPage(prop) {
    
    
    
    const [followed, setFollowed] = useState(false)
    const [selected,setSelected] = useState(0)
    const [custom, setCustom] = useState(false);
    const [isData, setData] = useState(false);
    const handleFollowed = () => {
      setFollowed(true);
      setSelected(0);
      setCustom(false);
      console.log(prop.data.articles)
    }
    const handleRecent = () => {
      setFollowed(false);
      setSelected(1);
      setCustom(false);
    }
    
    useEffect(() => {
      console.log(prop.data)
      if (Object.keys(prop.data).length != 0) setData(true);
    })

    const handleCustom = () => {
        setCustom(true);
        setFollowed(false);
        setSelected(2);
        console.log(selected)
    }

    const clearCustom = () => {
        setCustom(false);
        setSelected(5);
        console.log(custom)
    }
  
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
            <div id = 'column1' class = {selected === 0 ? 'followed': selected === 1 ? 'recent' : 'isCustom'}>
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
                
                <div class = 'row1 custom'>
                  <button class = 'sidebarbutton' onClick = {() => handleCustom()} >
                  Custom
                  </button>
                </div>
  
  
            </div>
            <div id = 'column2'>
              
                {followed ? (
                  <Followed data={prop.data.articles}></Followed>
                ) : selected === 1 ? (
                    <Recent data={prop.data.articles}></Recent>
                  ): custom ? <Modal type="custom" clearCustom={clearCustom}></Modal> : null}
        
            </div>
          </div>
        </body>
      </div>
    );
  }

export default MainPage