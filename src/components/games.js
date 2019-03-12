import React, { Component } from 'react';
// import MovieList from './movies-list';


class Games extends Component {

  constructor(props){
    super(props);

    this.state = {
    }


  }
/*=============================================*/
  componentDidMount(){

  }


//============================================================
  render() {
    function flip2Back(){
      $("#game-flipper").toggleClass("active");
      $("#accord-games").removeClass("collapse");
    }

    function flip2Front(){
      $("#game-flipper").toggleClass("active");
      $("#accord-games").addClass("collapse");
    }

    return(
      <div id='gamebloc' className="col-12 col-lg-6 ">
        <div className='flip-container'>
          <div className="flipper" id="game-flipper">

{/* Front of bloc  */}
            <div className="front bloc-front ">
              <div className="inner">
                <button className='btn button-game'
                        onClick={flip2Back.bind(this)}>
                  <h1>Games</h1>
                </button>
              </div>
            </div>
{/* Back of bloc - list of categories */}
            <div className="accordion bloc-games back collapse" id='accord-games'>
              <div className="inner">
                <button className="btn button-flip" onClick={flip2Front.bind(this)}>
                  <i className="fas fa-2x fa-chevron-circle-left"></i>
                </button>
                <h1>Coming soon!</h1>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Games;
