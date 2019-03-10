import React, { Component } from 'react';
import {NavItem} from 'react-materialize'

class Navbar extends Component {

  constructor(props){

    super(props);

    this.state = {
      
    }
  }

  handleClick(event){
        
    event.preventDefault();

    this.props.history.push('/');

    localStorage.clear();

    console.log(event)
}

handleNav(){
    console.log('redirect');
};

  render() {
    return (
        <Navbar brand='logo' right>
            <NavItem onClick={(e) => this.handleNav(e.preventDefault(), this.props.history.push('/'))}>Getting started</NavItem>
            <NavItem onClick={(e) => this.handleNav(e.preventDefault(), this.props.history.push('/favoris'))}>Components</NavItem>
        </Navbar>
    );
  }
}

export default Navbar;
