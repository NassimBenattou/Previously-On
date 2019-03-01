import React, { Component } from 'react';
import axios from 'axios';


class AllSeries extends Component {

    constructor(props){

        super(props);

        this.state = {
            series: []
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

    render(){

        return (
            <div>
                {
                this.state.series.map((series, index) =>
                    <div id="series" class="col-4 d-inline-block" key={index}>
                        <h3>{series.original_title}</h3>
                        {series.images.poster === null ? <img data-toggle="modal" data-target="#exampleModalCenter" src={series.images.show} width="400" height="200" /> : <img src={series.images.poster} width="400" height="200" />}
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <h4>{series.original_title}</h4>
                                        <img src={series.images.banner} />
                                        <p>{series.description}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
                
            </div>
        );
    }

}

export default AllSeries;
