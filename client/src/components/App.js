import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./Routes";
import '../index.css';

const App = () => {
  return (
  	<div className="app">
	   	<Router>
	       <Routes />
	    </Router>
    </div>
  );
}
export default App;
