import React, { Component } from 'react';
import { Link }  from "react-router-dom";

class NavBar extends Component {
  render(){
    return(
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;
