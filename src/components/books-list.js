import React, { Component } from 'react';

//temp code begin
// import nonfic from './../../dev_json/google_nonfic.json';
// import fic from './../../dev_json/google_fic.json';
// import middle from './../../dev_json/google_middle.json';
// import series from './../../dev_json/google_series.json';
// import nyt_nonfic from './../../dev_json/nyt_nonfic.json';
// import nyt_fic from './../../dev_json/nyt_fic.json';
// import nyt_series from './../../dev_json/nyt_series.json';
// import nyt_middle from './../../dev_json/nyt_middle.json';
//temp code ends

class BookList extends Component {
  constructor(){
    super();

    this.state = {
      booklist: []
    }

    this.renderBook = this.renderBook.bind(this);
  }

/*=============================================*/
  componentDidMount(){

    // don't proceed with API request if data has already been retrieved
    if (this.state.booklist && this.state.booklist.length > 0)
      return;

    let books = [];
    const nyt_API = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${process.env.NYT_API_KEY}&list=${this.props.listname}`;

// temp code begin
let data;
if(this.props.listname === 'combined-print-and-e-book-nonfiction')
  data = nyt_nonfic;
else if(this.props.listname === 'combined-print-and-e-book-fiction' )
  data = nyt_fic;
else if(this.props.listname === 'series-books')
  data = nyt_series;
else if(this.props.listname === 'childrens-middle-grade-hardcover')
  data = nyt_middle;
// temp code end


    // $.getJSON(nyt_API, data=>{ // comment out per temp code
      $.each( data.results, function( index, val ) {
        const {amazon_product_url} = val;
        const {title, author, description, primary_isbn13} = val.book_details[0];
        let cover_img = "";

        books.push( {title, author, description, cover_img, primary_isbn13, amazon_product_url} );
      }); //end .each

    // }).done( ()=>{ // comment out per temp code

/* After getting the bestseller list from NYT, use google books API to retrieve
   the book cover image. Since a free developer account is limited to 1000 request
   per day, need to do as little request as possible.
   Form a search term string to be used in the googlebook API. The string
   is a concatenation of isbn search term of all books in the list:
   isbn:xxxx+OR+isbn:yyyy+OR+.....
*/
      let isbn_string = "";
      books.map( (book)=>{ isbn_string = `${isbn_string}+OR+isbn:${book.primary_isbn13}`});
      isbn_string = isbn_string.slice(4);

      const googlebook_base_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
// one API call to look up all items in the books array
      const googlebook_API = `${googlebook_base_URL}${isbn_string}&key=${process.env.GOOGLE_BOOK_API_KEY}`;

      // $.getJSON( googlebook_API, data=>{ //comment out per temp code

//temp code begin
if(this.props.listname === 'combined-print-and-e-book-nonfiction')
  data = nonfic;
else if(this.props.listname === 'combined-print-and-e-book-fiction' )
  data = fic;
else if(this.props.listname === 'series-books')
  data = series;
else if(this.props.listname === 'childrens-middle-grade-hardcover')
  data = middle;
//temp code ends

        data.items.map( (b)=>{
/* b now contains info about one book returned by the google API, it should
correspond to one book in the books array, which is returned by the NYT api
*/
          if (!b.volumeInfo.imageLinks)
            return; //google doesn't have the book cover img, skip to next book

          const {thumbnail, smallThumbnail} = b.volumeInfo.imageLinks;
          const google_isbns = b.volumeInfo.industryIdentifiers;
//e.g.: [{type: "ISBN_10", identifier:"2938472"}, {type: "ISBN_13", identifier: "9781250207579"}]

// find the corresponding book in the books array, update cover_img
          for( var i=0; i<google_isbns.length; i++){ //loop thru list of isbns returned by google
          // find one that match with the NYT book
            let book = books.find( b1=>b1.primary_isbn13===google_isbns[i].identifier);
            if(book){ //matched! update cover_img in books
              book.cover_img = thumbnail ? thumbnail : smallThumbnail;
              return; //break from the for loop
            }
          }
        });

      // }).done( ()=>{ // comment out per temp code
        books = books.filter( b1=>b1.cover_img.length > 0) //keep only books with a cover image
        this.setState({booklist: books.slice(0,12)});
/* comment out per temp code
      }).fail( (error)=>{ //may be i've exceed the 1000 request per day limit!
        console.log(error)
      }); //end getJSON (googlebook)

    // }); //.done from nyt_API
*/
  }
/*=============================================*/
  renderBook(book){

    return(
      <div key={book.title} className="item-box">
        <div>
          <a href={book.amazon_product_url} target="_blank">
            <img className="figure-img" src={book.cover_img} alt=''/>
          </a>
        </div>
        <div>
          <h3 className='card-title'>{book.title} by {book.author}</h3>
          <h4 className='card-text'>{book.description}</h4>
        </div>
      </div>
    );
  }
/*=============================================*/
  render(){
    return(
      <div>
        {this.state.booklist.map( this.renderBook )}
      </div>
    );
  }
}

export default BookList;
