import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
// import Books from './components/books';
import Movies from './components/movies';
import Games from './components/games';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log("index.js")
    console.log(process.env.NYT_API_KEY)
    console.log(process.env.TMDB_API_KEY)
    console.log(process.env.GOOGLE_BOOK_API_KEY)

    return(
      <div>
        <Header />
        <div className="container">
          <div className="row" >

            <Movies/>

          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
