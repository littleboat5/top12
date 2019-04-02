import React, { Component } from 'react';

class BookList extends Component {
  constructor(){
    super();

    this.state = {
      booklist: []
    }

    this.renderBook = this.renderBook.bind(this);
    this.composeAPI = this.composeAPI.bind(this);
  }
/*=============================================*/
  composeAPI(endpoint, isbn_string){

    if( process.env.NODE_ENV === 'development' ){
      if(this.props.listname === 'combined-print-and-e-book-nonfiction')
        return (endpoint==='nyt') ? './dev_json/nyt_nonfic.json' : './dev_json/google_nonfic.json';
      else if(this.props.listname === 'combined-print-and-e-book-fiction' )
        return (endpoint==='nyt') ? './dev_json/nyt_fic.json' : './dev_json/google_fic.json';
      else if(this.props.listname === 'series-books')
        return (endpoint==='nyt') ? './dev_json/nyt_series.json' : './dev_json/google_series.json';
      else if(this.props.listname === 'childrens-middle-grade-hardcover')
        return (endpoint==='nyt') ? './dev_json/nyt_middle.json' : './dev_json/google_middle.json';
    }
    else {
      const googlebook_base_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

      switch (endpoint) {
        case 'nyt':
          return `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${process.env.NYT_API_KEY}&list=${this.props.listname}`;
        case 'google':
          return `${googlebook_base_URL}${isbn_string}&key=${process.env.GOOGLE_BOOK_API_KEY}`;
      }
    }
  }
/*=============================================*/
  componentDidMount(){

    // don't proceed with API request if data has already been retrieved
    if (this.state.booklist && this.state.booklist.length > 0)
      return;

    let booksArray = [];
    const nyt_API = this.composeAPI('nyt');

    fetch(nyt_API) // Ajax to get NYT bestseller per book genre
    .then( (res)=>{
      return res.json();
    })
    .then( (data)=>{ //======== then #2
      //compose an array of book objects, pass the array to the next then()
      booksArray = data.results.map( (val) => {
        const {amazon_product_url} = val;
        const {title, author, description, primary_isbn13} = val.book_details[0];
        const cover_img = "";

        return {title, author, description, cover_img, primary_isbn13, amazon_product_url};
      }); //end map
      return booksArray;
    })
    .then( (books)=>{ //======== then # 3
/* After getting the bestseller list from NYT, use google books API to retrieve
   the book cover image. Since a free developer account is limited to 1000 request
   per day, need to do as little request as possible.
   Form a search term string to be used in the googlebook API. The string
   is a concatenation of isbn search term of all books in the list:
   isbn:xxxx+OR+isbn:yyyy+OR+.....
*/
      let isbn_string =
        books.reduce( (result, book)=>{
          return result.concat( `+OR+isbn:${book.primary_isbn13}`);
        }, '');
      isbn_string = isbn_string.slice(4);

// compose one API to look up all items in the books array in 1 call
      const googlebook_API = this.composeAPI('google', isbn_string);

// ajax to get book cover image for all books on list
      return fetch( googlebook_API).then( (res)=>{ return res.json()});
    })
    .then( (data)=>{ //======== then #4 - handle what's fetched and parsed from google API

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
          let book = booksArray.find( b1=>b1.primary_isbn13===google_isbns[i].identifier);
          if(book){ //matched! update cover_img in books
            book.cover_img = thumbnail ? thumbnail : smallThumbnail;
            book.cover_img = book.cover_img.replace("http", "https");
            return; //break from the for loop
          }
        }
      });

      booksArray = booksArray.filter( b1=>b1.cover_img.length > 0) //keep only books with a cover image
      this.setState({booklist: booksArray.slice(0,12)});

    })
    .catch( (err)=>{ console.log(err)});

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
