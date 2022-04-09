import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, NavLink, Navigate} from 'react-router-dom'

import React, {useState} from 'react';

import HomePage from './Components/HomePage'

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
      <BrowserRouter> 
        <Routes>
          <Route path = "/" element = {<HomePage/>}>
            
          </Route>

          {/* <Route path = "/about" element = {<About />}>
            
          </Route>

          <Route path = '/contact' element = {<Contact />}>
            
          </Route>

          <Route path = '/article/:id' element = {<Article />}>

          </Route>

          <Route path = '*' element = {<Navigate to = '/'/>}>
            
          </Route> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
