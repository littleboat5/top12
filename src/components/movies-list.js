import React, { Component } from 'react';
import _ from 'lodash';
import MovieDetail from './movie-detail';

//temp code
import movies from './../../dev_json/movies.json';
//temp code


class MovieList extends Component {
  constructor(){
    super();

    this.state = {
      masterlist: [],
      filteredlist: []
    }

    this.callAPI = this.callAPI.bind(this);
  }
/*=============================================*/
  callAPI( page, tmdb_API ){
// temp code begin
let data = movies.results
const filteredlist = data.filter( movie=>{
    if( movie.genre_ids.find( id => id===this.props.genreId ) )
      return true;
    else
      return false;
});
if (filteredlist.length < 13)
  this.setState({ filteredlist: filteredlist});
else
  this.setState({ filteredlist: filteredlist.slice(0,12)});
// temp code end

//     const {masterList} = this.state;
//
// //this is to avoid the API being called repeatedly for the same page
//     if( masterList && masterList.length > (page-1)*20 )
//       return;
//
//     let tmdb_URL = `${tmdb_API}&page=${page}`
//
//     $.getJSON(tmdb_URL, data=>{
//       this.setState({masterList: _.union(masterList, data.results)});
//     })
//       .done( ()=>{
// /* by now, masterList contain an array of movie objects. Each movie may belong to
// multiple genre, genre ids are key in an array: genre_ids
// The below code filter the masterList for genre that matches the genreId which
// is passed down from the parent component (movies.js)
// */
//         const filteredlist = this.state.masterList.filter( movie=>{
//             if( movie.genre_ids.find( id => id===this.props.genreId ) )
//               return true;
//             else
//               return false;
//           });
//
// // keep only the top 12 of the list
//         this.setState({ filteredlist: filteredlist.slice(0,12)});
// // if the current masterList doesn't have 12 movies for this genre, request
// // the next page from the API to get more movies
//         if( this.state.filteredlist.length < 12){
//           this.callAPI(++page, tmdb_API);
//         }
//       })
//       .fail( (error)=>{
//         console.log(error);
//       });
// //end getJSON
  }
/*=============================================*/
  componentDidMount(){
    // don't proceed with API request if data has already been retrieved
    if ( this.state.masterList && this.state.masterList.length > 0 )
      return;

    const tmdb_API = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    this.callAPI(1, tmdb_API); //request page 1 from the API

  }

/*=============================================*/
  render(){

   if(!this.state.filteredlist || this.state.filteredlist.length < 1)
      return ("");

    return(
      <div>
        {this.state.filteredlist.map( (movie, index) => {
          return ( <MovieDetail
                      movie={movie}
                      index={index}
                      config = {this.props.config}
                      key = {`${index}+${movie}`}/>);
        })}
      </div>
    );

    // {this.state.filteredlist.map( this.renderMovie )}

  }
}

export default MovieList;
