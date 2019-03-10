import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login.js';
import FavoriteSeries from '../components/FavoriteSeries.js'
import Navbar from '../components/Navbar.js';

class Router extends Component {

  constructor(props){

    super(props);

    this.state = {
      
    }
  }

  render() {
    return (
    <div>
      <Navbar />
      <BrowserRouter>
      
          <Switch>
            <Route path='/' component={Login} />
            <Route path='/favorite' component={FavoriteSeries} />
          </Switch>
      </BrowserRouter>
    </div>
    );
  }
}

export default Router;
