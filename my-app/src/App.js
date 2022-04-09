import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react';

import Article from './Components/Article.js'
import Followed from './Components/Followed.js'
import Recent from './Components/Recent.js'

function App() {
  let data;
  const [followed, setFollowed] = useState(false)
  const [recent, setRecent] = useState(false)
  const [request,setrequest] = useState(false)
  const handleFollowed = () => {
    setFollowed(true);
  }
  const handleRecent = () => {
    setFollowed(false);
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
    <div className="App">
      <header className="App-header">
        <h1>
          KISSFEED
        </h1>
      </header>
      <body>
        <div id = 'mainpage'>
          <div id = 'column1'>
              <div id = 'row1'>
                <button onClick={() => handleRecent()}>
                All
                </button>
              </div>
              <div id = 'row1'>
                <button onClick= {() => handleFollowed()}>
                  Followed
                </button>
                
              </div>
              
              <div id = 'row1-custom'>
                <button>
                Custom
                </button>
              </div>


          </div>
          <div id = 'column2'>
            <div> 
              {followed ? (
                <Followed></Followed>
              ) : (
                  <Recent></Recent>
                )}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
