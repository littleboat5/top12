import React, { Component } from 'react';

import {CHART_TOP_ARTISTS, CHART_TOP_TRACKS, GEO_TOP_TRACKS}
  from './music.js';

class MusicList extends Component {
  constructor(){
    super();

    this.state = {
      musicList: []
    }

    this.renderItem = this.renderItem.bind(this);
    this.processList = this.processList.bind(this);
  }

/*=============================================*/
 processList(list){
  let data = [];

  $.each(list, (index, val)=>{
    const {name, url, artist, image} = val;
    const cover_img = image[image.length-1]["#text"];
    const artist_name = artist ? artist.name : "";
    data.push( {name, url, cover_img, artist_name});
  });

  return data;
}

/*=============================================*/
  componentDidMount(){

    // don't proceed with API request if data has already been retrieved
    if (this.state.musicList && this.state.musicList.length > 0)
      return;

    let items = [];

    const {method, country} = this.props;
// console.log(country)
    const method_str = country ? `${method}${country}` : method;

    const fm_API = `http://ws.audioscrobbler.com/2.0/?method=${method_str}&api_key=${process.env.LASTFM_API_KEY}&format=json`;

    $.getJSON(fm_API, data=>{
      switch (method) {
        case CHART_TOP_ARTISTS:
          items = this.processList(data.artists.artist);
          break;

        case CHART_TOP_TRACKS:
        case GEO_TOP_TRACKS:
          items = this.processList(data.tracks.track);
          break;

        default:
      }

    }).done( ()=>{

      this.setState({musicList: items.slice(0,12)});

    }).fail( error=>{
      console.log(error)
    }); //end getJSON

  }

/*=============================================*/
  renderItem(item, index){

    return(
      <div key={`${index}${this.props.method}${item.name}`} className="item-box">
        <div>
          <a href={item.url} target="_blank">
            <img className="figure-img" src={item.cover_img} alt=''/>
          </a>
        </div>
        <div>
          <h4 className='card-title'>{item.name}{item.artist_name ? ` by ${item.artist_name}` : ""}</h4>
        </div>
      </div>
    );
  }
/*=============================================*/
  render(){
    return(
      <div>
        {this.state.musicList.map( this.renderItem )}
      </div>
    );
  }
}

export default MusicList;
