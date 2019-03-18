import React, { Component } from 'react';
import MusicList from './music-list';

export const CHART_TOP_ARTISTS = 'chart.gettopartists';
export const CHART_TOP_TRACKS = 'chart.gettoptracks';
export const GEO_TOP_TRACKS = 'geo.gettoptracks&country=';

class Music extends Component {

  constructor(props){
    super(props);

    this.renderCategory = this.renderCategory.bind(this);
  }

//============================================================
  renderCategory( id, method, displayname, country){
    return(
      <div>
        <div id={`btn-${id}`}>
          <a className="list-group-item list-group-item-action button-general" role="button" data-toggle="collapse" data-target={`#${id}`} href={`#${id}`} aria-expanded="true" aria-controls={id}>
           <h2>{displayname}</h2>
          </a>
        </div>

        <div id={id} className="collapse" aria-labelledby={`btn-${id}`} data-parent="#accord-music">
          <MusicList
            method={method}
            country={country}
          />
        </div>
      </div>
    );
  }

//============================================================
  render() {
    function flip2Back(){
      $("#music-flipper").toggleClass("active");
      $("#accord-music").removeClass("collapse");
    }

    function flip2Front(){
      $("#music-flipper").toggleClass("active");
      $("#accord-music").addClass("collapse");
    }

    return(
      <div id='musicbloc' className="col-12 col-lg-6 ">
        <div className='flip-container'>
          <div className="flipper" id="music-flipper">

{/* Front of bloc  */}
            <div className="front bloc-front ">
              <div className="inner">
                <button className='btn button-music'
                        onClick={flip2Back.bind(this)}>
                </button>
              </div>
            </div>
{/* Back of bloc - list of categories */}
            <div className="accordion bloc-music back collapse" id='accord-music'>
              <div className="inner">
                <button className="btn button-flip" onClick={flip2Front.bind(this)}>
                  <i className="fas fa-2x fa-chevron-circle-left"></i>
                </button>

                <div className='credits' >
                  <small>Data provided by <a href="https://www.last.fm/" target="_blank">last.fm</a></small>
                </div>

                {this.renderCategory( 'top-artist', CHART_TOP_ARTISTS, 'Top Artists')}
                {this.renderCategory( 'top-track-uk', GEO_TOP_TRACKS, 'Top Tracks in UK', 'united kingdom')}
                {this.renderCategory( 'top-track', CHART_TOP_TRACKS, 'Top Tracks')}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Music;
