import React, { Component } from 'react';
import Login from './components/Login.js';
import AllSeries from './components/AllSeries.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';


class App extends Component {

  constructor(props){

    super(props);

    this.state = {
      
    }
  }

  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default App;
