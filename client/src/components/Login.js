import React, { Component } from 'react';
import axios from 'axios';
import AllSeries from '../components/AllSeries.js';

class Login extends Component {
  
    constructor(props){
        
        super(props);

        this.state = {
            pseudo: '',
            password: '',
            isLoggedIn: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNav = this.handleNav.bind(this);
    }

    componentDidMount(){
       
        if("token" in localStorage){
            this.setState({
                isLoggedIn: true
            })
        } 
    }

    handleChange(value, param){
        
        this.setState({[param]: value});
    }

    handleSubmit(event){
        
        event.preventDefault();

        var md5 = require('md5');

        var url = "https://api.betaseries.com/members/auth?login="+this.state.pseudo+"&password="+md5(this.state.password);

        var headers = {
            
            'X-BetaSeries-Key': '279f69370753'
        }

        var data = {
            login: this.state.pseudo,
            password: md5(this.state.password)
        }

        
        axios.post(url, {data}, {headers: headers})
        .then(response => {
            localStorage.setItem('token', response.data.token);
            this.setState({isLoggedIn: true});
        })
    }

    handleClick(event){
        
        event.preventDefault();

        this.setState({
            isLoggedIn: false
        })

        localStorage.clear();
    }
    
    handleNav(){
        console.log('redirect');
    };

    render() {

        let loginForm;

        if(this.state.isLoggedIn){
            
            loginForm = (
                <div>
                    <AllSeries />
                </div>
            )
        }

        else{
            
            loginForm = (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input 
                className="form-control"
                type="text" 
                placeholder="Nom d'utilisateur" 
                value={this.state.pseudo}
                onChange={(e) => this.handleChange(e.target.value, 'pseudo')}
                />
                <input 
                className="form-control"
                type="password" 
                placeholder="Mot de passe"
                value={this.state.password}
                onChange={(e) => this.handleChange(e.target.value, 'password')} 
                />
                <button className="btn btn-primary">Connexion</button>
            </form>
            )
        }

        return (
            <div>{loginForm}</div>
        );
    }
}

export default Login;
