import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import { UserProvider } from './UserContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
     
        <div>
          <Home />
        </div>
     
    </Router>
  );
}

export default App;
