import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../Context/AuthContext";
import LogOutBtn from '../Auth/LogOutBtn';

function Navbar() {
const { loggedIn } = useContext(AuthContext);

    return (
      // <div className="container">
        <div className="navBar">
          <ul className="navBar-items">
            <Link to='/'>
            <li className="navBar-link">Home</li>
            </Link>

            <Link to='/'>
            <li className="navBar-link">About</li>
            </Link>

            <Link to='/'>
            <li className="navBar-link">Featured</li>
            </Link>

            <Link to='/posts' >
            <li className="navBar-link">All Articles</li>
            </Link>

            {!loggedIn && (
              <Link to='/auth/login' >
              <li className="navBar-link">Login</li>
              </Link>
            )}
            {loggedIn && (
             <Link to='/create' >
              <li className="navBar-link">Create Article</li>
              </Link>
            )}

            {loggedIn && (
              <LogOutBtn />
            )}
            
          </ul>
        </div>
      // </div>
    )
  }


export default Navbar;