import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "./components/Context/AuthContext";
import LogOutBtn from './components/Auth/LogOutBtn';

function Navbar() {
const { loggedIn } = useContext(AuthContext);

    return (
      <div className="container">
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

            {loggedIn === false && (
              <Link to='/auth/login' >
              <li className="navBar-link">Login</li>
              </Link>
            )}

            {loggedIn === true && (
              <LogOutBtn />
            )}
            
          </ul>
        </div>
      </div>
    )
  }


export default Navbar;