import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import FavoriteSeries from './components/FavoriteSeries.js';
import './App.css';


class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/favoris' component={FavoriteSeries} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
