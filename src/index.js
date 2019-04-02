import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Books from './components/books';
import Movies from './components/movies';
import Music from './components/music';

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
            <Movies />
            <Music />

          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
