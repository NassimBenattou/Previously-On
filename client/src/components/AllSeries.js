import React, { Component } from 'react';
import axios from 'axios';
import {Modal, Button, CollapsibleItem, Collapsible} from 'react-materialize';

class AllSeries extends Component {

    constructor(props){

        super(props);

        this.state = {
            series: [],
            id_series: '',
            details: '',
            addSeries: '',
            seasons: [],
            id_season: '',
            episodes: [],
            id_episode: '',
            isLoggedIn: false
        }  
         
    }

    componentDidMount(){

        if("token" in localStorage){
            
            var url = "https://api.betaseries.com/shows/discover";

            var headers = {

                'X-BetaSeries-Key': '279f69370753'
            }

            axios.get(url, {headers: headers})
            .then(response => this.setState({
                series: response.data.shows
            }))
        }
    }

    handleClick(event){

        event.preventDefault();

        //Infos séries

        this.setState({id_series: event.target.id}, () => {

            var urlInfos = "https://api.betaseries.com/shows/display?id="+this.state.id_series

            var headers = {

                'X-BetaSeries-Key': '279f69370753'
            }
            
            axios.get(urlInfos, {headers: headers})
            .then(response => this.setState({details: response.data.show}))
        })
    }

    showSeason(event){

        event.preventDefault();

        var urlSeasons = "https://api.betaseries.com/shows/seasons?id="+this.state.id_series;

        var headers = {

            'X-BetaSeries-Key': '279f69370753'
        }

        axios.get(urlSeasons, {headers: headers})
        .then(response => {

            this.setState({
            seasons: response.data.seasons,
            })
        }) 
    }

    handleClickSeason(event){

        event.preventDefault();
        
        this.setState({id_season: event.target.getAttribute('data')}, () => {
            
            console.log(this.state.id_series);
            
            console.log(this.state.id_season);
            
            var urlEpisodes = "https://api.betaseries.com/shows/episodes?id="+this.state.id_series+"&season="+this.state.id_season;

            var headers = {

                'X-BetaSeries-Key': '279f69370753'
            }

            axios.get(urlEpisodes, {headers: headers})
            .then(response => this.setState({episodes: response.data.episodes}));

        })

             
    }

    handleAddSeries(event){

        event.preventDefault();

        this.setState({addSeries: event.target.id}, () => {
            
            var token = localStorage.getItem('token');

            var url = 'https://api.betaseries.com/shows/show?access_token='+token+'&id='+this.state.addSeries;
            
            var headers = {

                'X-BetaSeries-Key': '279f69370753'
            }

            var data = {}

            axios.post(url, data, {headers: headers})
        })
    }

    episodeWatched(event){

        event.preventDefault();

        this.setState({id_episode: event.target.id}, () => {

            console.log(this.state.id_episode)

            var token = localStorage.getItem('token');

            var url = "https://api.betaseries.com/episodes/watched?access_token="+token+"&id="+this.state.id_episode;
            
            var headers = {

                'X-BetaSeries-Key': '279f69370753'
            }

            var data = {}

            axios.post(url, data, {headers: headers})
        })
    }

    render(){

        return (
            <div id="series">
                {
                this.state.series.map((series, index) =>
                    
                    <div onClick={this.handleClick.bind(this)} key={index}>

                        <Modal
                        header={this.state.details.original_title}
                        trigger={series.images.poster === null ? 
                            <img  id={series.id} src={series.images.show} width="400" height="200" /> 
                            : <img id={series.id} src={series.images.poster} width="400" height="400" />}>
                                {this.state.details.images === undefined ? '' : <img src={this.state.details.images.banner} />}
                                <p>{this.state.details.description}</p>
                                <p>{this.state.details.seasons} saison(s), {this.state.details.episodes} épisodes</p>    
                                <p>Année : {this.state.details.creation}</p>
                                <p>Durée : {this.state.details.length} minutes</p>    
                                {this.state.details.images === undefined ? '' : <p>Genre : {this.state.details.genres[0]}</p>}   
                                <p>{this.state.details.network}</p>
                                {this.state.details.notes === undefined ? '' : <p>Note : {this.state.details.notes.mean.toFixed(2)} sur 5</p>}
                                <Button id={series.id} onClick={this.showSeason.bind(this)} waves='light'>Afficher les saisons</Button>
                                {
                                this.state.seasons.map((seasons, index) =>
                                    
                                    <Collapsible key={index}>
                                        <CollapsibleItem header={"Saison "+seasons.number} icon='filter_drama'>
                                        <a id={series.id} data={seasons.number} onClick={this.handleClickSeason.bind(this)}>Afficher les épisodes</a>
                                        {
                                        this.state.episodes.map((episodes, index) => 
                                            
                                            <div className='episodes' key={index}>
                                                <p>{episodes.title}</p>
                                                <i id={episodes.id} onClick={this.episodeWatched.bind(this)} className="material-icons zoom">visibility_off</i>
                                            </div>
                                        )
                                        }
                                        </CollapsibleItem>
                                    </Collapsible>
                            
                                )
                                }
                        </Modal>
                        <img className="zoom" onClick={this.handleAddSeries.bind(this)} id={series.id} src="https://img.icons8.com/ios/50/000000/plus-filled.png" />
                    </div>
                )
                }
                    
            </div>

        );
    }

}

export default AllSeries;
