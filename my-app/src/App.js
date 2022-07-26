
import './App.css';

import React from 'react';
import {BrowserRouter, Route,Routes} from 'react-router-dom'


import HomePage from './Components/HomePage.js'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
        <Route path = "/" element = {<HomePage/>}></Route>

      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
