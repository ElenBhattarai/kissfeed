import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react';
function App() {
  let data;
  const [followed, setFollowed] = useState(true)
  const [request,setrequest] = useState(false)
  const [clicked, setClicked] = useState(true)
  const [body, setBody] = useState(false)

  const handleClick = ()=> {
    setClicked(false)
    setBody(true)
  }

  const handleClose = ()=> {
    setClicked(true)
    setBody(false)
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
                <button>
                All
                </button>
              </div>
              <div id = 'row1'>
                {followed && (

                <button>
                Followed
                </button>

                )}
                
              </div>
              
              <div id = 'row1-custom'>
                <button>
                Custom
                </button>
              </div>


          </div>
          <div id = 'column2'>
            <div> 
              <div id = 'newsrow'> 
                News Title
              </div>

              {clicked && (
                <div id = 'newsrowtext'>
                  dkasjdsakjdabdasnsdbsajhdqhbdnabdsjhdahbdmnbdajshbdalbdwandsahdahdlndbasldbsahjdasdbsadlhjasdjashbdlasdbahdwandadbahd 
                  <button onClick = {handleClick}>View the article</button>
                </div>
                
              )}
              {body && (
                <div id = 'newsrowtext'>
                  <button onClick = {handleClose}>Close Article</button>
                   jdsajdsakdsadbasdjaddjasbd
                   dkasjdsakjdabdasnsdbsajhdqhbdnabdsjhdahbdmnbdajshbdalbdwandsahdahdlndbasldbsahjdasdbsadlhjasdjashbdlasdbahdwandadbahddas
                   asmdnas
                   asmdnasd
                   sadnasd
                   dkasjdsakjdabdasnsdbsajhdqhbdnabdsjhdahbdmnbdajshbdalbdwandsahdahdlndbasldbsahjdasdbsadlhjasdjashbdlasdbahdwandadbahdm
                   dkasjdsakjdabdasnsdbsajhdqhbdnabdsjhdahbdmnbdajshbdalbdwandsahdahdlndbasldbsahjdasdbsadlhjasdjashbdlasdbahdwandadbahd

                   asldnasd
                   dkasjdsakjdabdasnsdbsajhdqhbdnabdsjhdahbdmnbdajshbdalbdwandsahdahdlndbasldbsahjdasdbsadlhjasdjashbdlasdbahdwandadbahdsadmna
                   dkasjdsakjdabdasnsdbsajhdqhbdnabdsjhdahbdmnbdajshbdalbdwandsahdahdlndbasldbsahjdasdbsadlhjasdjashbdlasdbahdwandadbahddsa,
                   as,dad
                </div>
              )
              }
              


              
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
