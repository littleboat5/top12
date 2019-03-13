import React, { Component } from 'react';

class MovieDetail extends Component {
  constructor(){
    super();

    this.state = {
      movie: {}
    }

    this.showTrailer = this.showTrailer.bind(this);
  }
/*=============================================*/
  componentDidMount(){
    if( !Object.keys(this.state.movie).length ){
  /* save the movie (which is passed down from parent) to its own state only
   for the first time. We are keeping the movie locally in order to provide
   a place to store the trailer URL. We only want to call the API to retrieve
   the trailer URL when we don't have the URL. Once we call it once, we should
   store it in the component state (locally) and use it whenever is needed. this
   is to avoid calling the API too many times hence exceeding the limit.
  */
      this.setState({ movie: {...this.props.movie, trailer:""} } );
    }
  }
/*=============================================*/
  showTrailer(){
    $(".embed-responsive").addClass("collapse"); //close ALL embedded videos

    const {movie} = this.state;

    if ( !movie.trailer ){ // trailer info empty, call the API to retrieve it

// get trailer info for 1 movie using another TMDB API
      const trailer_API = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=trailers`;
      let trailer_yt_URL = "";

// lookup youtube trailer ids
      $.getJSON(trailer_API, data=>{
        if( data.trailers && data.trailers.youtube && data.trailers.youtube.length > 0){
          for( var i=0; i < data.trailers.youtube.length; i++){
            if( data.trailers.youtube[i].name.includes( 'Trailer') ){ //find the first Trailer
              trailer_yt_URL = `https://www.youtube.com/embed/${data.trailers.youtube[i].source}`;
              break; //break from the for loop if a trailer is found
            }
          }
        }
      })
        .done( ()=>{ //ajax request done. Setup the iframe src URL
          if( trailer_yt_URL.length > 0){ //found a trailer youtube,
            $(`#${this.props.index}${movie.id}`).removeClass("collapse"); //open embedded video only for this item
            $(`#youtube${this.props.index}${movie.id}`).attr('src', trailer_yt_URL); //plug in trailer url

            // save the trailer URL to the state
            this.setState({ movie: {...movie, trailer:trailer_yt_URL} });
          }
      })
        .fail( (error)=>{
          console.log(error);
      }); //end getJSON

    } //end if (!movie.trailer )
    else { //trailer URL already retrieved, just show it
      $(`#${this.props.index}${movie.id}`).removeClass("collapse"); //open embedded video only for this item
      $(`#youtube${this.props.index}${movie.id}`).attr('src', movie.trailer); //plug in trailer url
    }
  }

/*=============================================*/
    render(){
      const {index, config} = this.props; //values passed down from movies-list.js
      let {movie} = this.state; //this.state.movie is set at componentDidMount

      if( !movie.poster_path || !movie.poster_path.length )
        return ("");

      let image = config.secure_base_url+config.poster_sizes[4]+'/'+movie.poster_path;

      return(
        <div key={`${index}${movie.id}`} className='item-box'>
          <button className="btn" onClick={this.showTrailer}>
            <img className="figure-img img-thumbnail" src={image} alt=''/>
          </button>

          <div id={`${index}${movie.id}`} className="embed-responsive embed-responsive-16by9 collapse">
            <iframe id={`youtube${index}${movie.id}`}
                    className="embed-responsive-item"
                    src={movie.trailer} //URL is set in showTrailer() when the movie poster is clicked
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
          </div>

          <div className='item-box'>
            <h3 className='card-title'>{movie.title} ({movie.release_date.slice(0,4)})</h3>
            <h4 className='card-text'>{movie.overview}</h4>
          </div>
        </div>
      );

    }
  }

  export default MovieDetail;
