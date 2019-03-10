import React, { Component } from 'react';
import axios from 'axios';


class FavoriteSeries extends Component {

  constructor(props){

    super(props);

    this.state = {
      seriesMember: [],
      details: '',
      deleteSeries: ''
    }
  }

  componentDidMount(){

    var url = 'https://api.betaseries.com/shows/member?id=1117715';

    var headers = {

        'X-BetaSeries-Key': '279f69370753'
    }

    axios.get(url, {headers: headers})
    .then(response => this.setState({seriesMember: response.data.shows}))
  }

  handleClick(event){

    event.preventDefault();

    this.setState({id_series: event.target.id}, () => {

    var url = "https://api.betaseries.com/shows/display?id="+this.state.id_series

    var headers = {

        'X-BetaSeries-Key': '279f69370753'
    }
    
    axios.get(url, {headers: headers})
    .then(response => this.setState({details: response.data.show}))
    })

    console.log(this.state.id_series)
}

handleDeleteSeries(event){

  event.preventDefault();

  this.setState({deleteSeries: event.target.id}, () => {
            
    console.log(this.state.deleteSeries)
    var token = localStorage.getItem('token');

    var url = 'https://api.betaseries.com/shows/show?access_token='+token+'&id='+this.state.deleteSeries;

    var headers = {

      'X-BetaSeries-Key': '279f69370753'
    }

    var data = {}

    axios.delete(url, {headers: headers})
    .then(response => {this.componentDidMount()})
  })
}

  render() {
    return (
    <div id="series">
      {
      this.state.seriesMember.map((series, index) =>
          
          <div id="series" className="col-4 d-inline-block" key={index}>
              {series.images.poster === null ? 
              <img className='mt-5 img-fluid img-responsive' onClick={this.handleClick.bind(this)} id={series.id} data-toggle="modal" data-target="#exampleModalCenter" src={series.images.show} width="400" height="200" /> 
              : <img className='mt-5 img-fluid img-responsive' onClick={this.handleClick.bind(this)} id={series.id} data-toggle="modal" data-target="#exampleModalCenter" src={series.images.poster} width="400" height="400" />}
              <img className='ml-3 img-fluid zoom' onClick={this.handleDeleteSeries.bind(this)} id={series.id} src="https://img.icons8.com/cotton/64/000000/delete-sign.png" />
          </div>
      )
    }

      <div  className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                  <div  className="modal-body">
                      <h4>{this.state.details.original_title}</h4>
                      {this.state.details.images === undefined ? '' : <img className="img-fluid" src={this.state.details.images.banner} />}
                      <p className="mt-3">{this.state.details.description}</p>
                      <p className="mt-3">{this.state.details.seasons} saison(s), {this.state.details.episodes} épisodes</p>    
                      <p className="mt-3">Année : {this.state.details.creation}</p>
                      <p className="mt-3">Durée : {this.state.details.length} minutes</p>    
                      {this.state.details.images === undefined ? '' : <p>Genre : {this.state.details.genres[0]}</p>}   
                      <p className="mt-3">{this.state.details.network}</p>
                      {this.state.details.notes === undefined ? '' : <p>Note : {this.state.details.notes.mean.toFixed(2)} sur 5</p>}
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
              </div>
          </div>
      </div>

    </div>
    );
  }
}

export default FavoriteSeries;
