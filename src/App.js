import {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Home} from './pages';
import {Auth} from './components/auth'

import './app.css'
// import Navbar from "./tweets/components/Navbar"


function App() {
  const localUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const [currUser, setCurrUser] = useState(localUser || null);
  console.log(localStorage.getItem('loggedInUser'))

  return (
    <Router>
      <div className="app">
        {(currUser !== undefined && currUser !== null) ? <Home currUser={currUser} setCurrUser={setCurrUser} /> : <Auth setCurrUser={setCurrUser} currUser={currUser} />}
      </div>
    </Router>
  );
}

export default App;
