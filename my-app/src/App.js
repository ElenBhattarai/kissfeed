import logo from './logo.svg';
import './App.css';

import {useState} from 'react';
function App() {
  const [followed, setFollowed] = useState(false)
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
          </div>
          <div id = 'column2'>
            <div> 
              <div id = 'newsrow'> 
                News Title
              </div>
              <div id = 'newsrowtext'>
              CNN was given exclusive access to the power plant for the first time since it came back into Ukrainian control.

Officials at the plant explain the levels inside the room used by Russian soldiers are only slightly above what the World Nuclear Association describes as naturally occurring radiation. One-time contact would not be dangerous but continuous exposure would pose a health hazard.
              </div> 
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
