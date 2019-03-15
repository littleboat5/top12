import React, { Component } from 'react';
import _ from 'lodash';

import MovieList from './movies-list';

// //temp code
// import config from './../../dev_json/config.json';
// import g from './../../dev_json/genres.json';
// //temp code

class Movies extends Component {

  constructor(props){
    super(props);

    this.state = {
      genrelist: [],
      imageconfig:{}
    }

    this.renderGenre = this.renderGenre.bind(this);
  }
/*=============================================*/
  componentDidMount(){

    const supported_genres = ['Action', 'Animation', 'Comedy', 'Drama', 'Family', 'Horror', 'Romance', 'Science Fiction'];
    const tmdb_API_key = `api_key=${process.env.TMDB_API_KEY}`;

// get genre list
    let tmdb_URL = `https://api.themoviedb.org/3/genre/movie/list?${tmdb_API_key}&language=en-US`;
    let genres = [];

    $.getJSON(tmdb_URL, data=>{
      genres = data.genres.filter( g=> _.includes(supported_genres, g.name) );
      this.setState({genrelist: genres});
    });

// get TMDB configuration, for use when displaying poster image etc
    tmdb_URL = `https://api.themoviedb.org/3/configuration?${tmdb_API_key}`;
    $.getJSON(tmdb_URL, data=>{
      this.setState({imageconfig: data.images});
    });

    // //temp code begin
    // this.setState({genrelist: g.genres});
    // this.setState({imageconfig: config});
    // //temp code ends

  }

//============================================================
  renderGenre(genre, index){
    return(
      <div key={genre.name}>
        <div id={`btn-genre${genre.id}`}>
          <a className="list-group-item list-group-item-action button-genral" role="button" data-toggle="collapse" data-target={`#genre${genre.id}`} href={`#genre${genre.id}`} aria-expanded="true" aria-controls={`genre${genre.id}`}>
           <h2>{genre.name}</h2>
          </a>
        </div>

        <div id={`genre${genre.id}`} className="collapse" aria-labelledby={`btn-genre${genre.id}`} data-parent="#accord-movies">
          <MovieList genreId={genre.id}
                     config={this.state.imageconfig}/>
        </div>
      </div>
    );
  }
//============================================================
  render() {
    function flip2Back(){
      $("#movie-flipper").toggleClass("active");
      $("#accord-movies").removeClass("collapse");
    }

    function flip2Front(){
      $("#movie-flipper").toggleClass("active");
      $("#accord-movies").addClass("collapse");
    }

    return(
      <div id='moviebloc' className="col-12 col-lg-6 ">
        <div className='flip-container'>
          <div className="flipper" id="movie-flipper">

{/* Front of bloc  */}
            <div className="front bloc-front ">
              <div className="inner">
                <button className='btn button-movie'
                        onClick={flip2Back.bind(this)}>
                </button>
              </div>
            </div>
{/* Back of bloc - list of categories */}
            <div className="accordion bloc-movies back collapse" id='accord-movies'>
              <div className="inner">
                <button className="btn button-flip" onClick={flip2Front.bind(this)}>
                  <i className="fas fa-2x fa-chevron-circle-left"></i>
                </button>
                <div className='credits' >
                  <small>Data provided by <a href="https://www.themoviedb.org/" target="_blank">TMDB</a></small>
                </div>
                {this.state.genrelist.map(this.renderGenre)}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
