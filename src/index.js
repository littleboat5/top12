import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Books from './components/books';
import Movies from './components/movies';
// import Games from './components/games';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return(
      <div>
        <Header />
        <div className="container">
          <div className="row" >
            <Books />
            <Movies/>

          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
