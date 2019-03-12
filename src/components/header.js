import React, { Component } from 'react';

class Header extends Component {

  render() {
    return(
      <div >
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id='navbar' className="collapse navbar-collapse">
              <div className=" navbar-nav ">
                  <a className="nav-item nav-link " href="#bookbloc">Books</a>
                  <a className="nav-item nav-link " href="#moviebloc">Movies</a>
                  <a className="nav-item nav-link " href="#gamebloc">Games</a>
              </div>
          </div>
        </nav>
      </div>
    );
  }

}

export default Header;
