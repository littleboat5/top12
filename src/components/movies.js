import React, { Component } from 'react';
import MovieList from './movies-list';

//temp code
import config from './../../dev_json/config.json';
import g from './../../dev_json/genres.json';
//temp code

class Movies extends Component {

  constructor(props){
    super(props);

    this.state = {
      genrelist: [],
      imageconfig:{}
    }

//     const tmdb_API_key = `api_key=${process.env.TMDB_API_KEY}`;
//
// // get genre list
//     let tmdb_URL = `https://api.themoviedb.org/3/genre/movie/list?${tmdb_API_key}&language=en-US`;
//     $.getJSON(tmdb_URL, data=>{
//       this.setState({genrelist: data.genres});
//     });
//
// // get TMDB configuration, for use when displaying poster image etc
//     tmdb_URL = `https://api.themoviedb.org/3/configuration?${tmdb_API_key}`;
//     $.getJSON(tmdb_URL, data=>{
//       this.setState({imageconfig: data.images});
//     });

    this.renderItem = this.renderItem.bind(this);
  }
/*=============================================*/
  componentDidMount(){
    //temp code begin
    this.setState({genrelist: g.genres});
    this.setState({imageconfig: config});
    //temp code ends

  }

//============================================================
  renderItem(genre, index){
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

console.log("tmdb: "+process.env.TMDB_API_KEY)
console.log("nyt: "+process.env.NYT_API_KEY)
console.log("google: "+process.env.GOOGLE_BOOK_API_KEY)

    return(
      <div id='moviebloc' className="col-12 col-lg-6 ">
        <div className='flip-container'>
          <div className="flipper" id="movie-flipper">

{/* Front of bloc  */}
            <div className="front bloc-front ">
              <div className="inner">
                <button className='btn button-movie'
                        onClick={flip2Back.bind(this)}>
                  <h1>Movies</h1>
                </button>
              </div>
            </div>
{/* Back of bloc - list of categories */}
            <div className="accordion bloc-movies back collapse" id='accord-movies'>
              <div className="inner">
                <button className="btn button-flip" onClick={flip2Front.bind(this)}>
                  <i className="fas fa-2x fa-chevron-circle-left"></i>
                </button>
                {this.state.genrelist.map(this.renderItem)}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
