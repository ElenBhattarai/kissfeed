import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react';
import {BrowserRouter, Route,Routes} from 'react-router-dom'

import Article from './Components/Article.js'
import Followed from './Components/Followed.js'
import Recent from './Components/Recent.js'
import MainPage from './Components/Mainpage.js'
import HomePage from './Components/HomePage.js'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path = "/" element = {<HomePage/>}></Route>

        <Route path = "/app" element = {<MainPage/>}></Route>

      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
