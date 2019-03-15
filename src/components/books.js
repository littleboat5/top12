import React, { Component } from 'react';
import BookList from './books-list';

class Books extends Component {

  constructor(props){
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

//============================================================
  renderItem( id, listname, displayname){
    return(
      <div>
        <div id={`btn-${id}`}>
          <a className="list-group-item list-group-item-action button-genral" role="button" data-toggle="collapse" data-target={`#${id}`} href={`#${id}`} aria-expanded="true" aria-controls={id}>
           <h2>{displayname}</h2>
          </a>
        </div>

        <div id={id} className="collapse" aria-labelledby={`btn-${id}`} data-parent="#accord-books">
          <BookList listname={listname}/>
        </div>
      </div>
    );
  }

//============================================================
  render() {
    function flip2Back(){
      $("#book-flipper").toggleClass("active");
      $("#accord-books").removeClass("collapse");
    }

    function flip2Front(){
      $("#book-flipper").toggleClass("active");
      $("#accord-books").addClass("collapse");
    }

    return(
      <div id="bookbloc" className="col-12 col-lg-6 ">
        <div className='flip-container'>
          <div className="flipper" id="book-flipper">

{/* Front of bloc */}
            <div className="front bloc-front ">
              <div className="inner">
                <button className='btn button-book'
                        onClick={flip2Back.bind(this)}>
                </button>
              </div>
            </div>

{/* Back of bloc - list of categories */}
            <div className="accordion bloc-books back collapse" id='accord-books'>
              <div className="inner">
                <button className="btn button-flip" onClick={flip2Front.bind(this)}>
                  <i className="fas fa-2x fa-chevron-circle-left"></i>
                </button>

                <div className='credits' >
                  <small>Data provided by <a href="https://www.nytimes.com/books/best-sellers/" target="_blank">New York Times</a></small>
                </div>

                {this.renderItem( 'books-non-fiction',
                                  'combined-print-and-e-book-nonfiction',
                                  'Non-Fiction')}
                {this.renderItem( 'books-fiction',
                                  'combined-print-and-e-book-fiction',
                                  'Fiction')}
                {this.renderItem( 'books-series',
                                  'series-books',
                                  'Children’s Series')}
                {this.renderItem( 'books-middle-grade',
                                  'childrens-middle-grade-hardcover',
                                  'Children’s Middle Grade')}
              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}

export default Books;
