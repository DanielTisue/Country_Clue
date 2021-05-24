import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "./Context/AuthContext";
import LogOutBtn from './Auth/LogOutBtn';

function Navbar() {
const { loggedIn } = useContext(AuthContext);

    return (
      <div className="">
        <ul>
          <Link to='/'>
          <li className="navabar-link">Home</li>
          </Link>

          <Link to='/'>
          <li className="navabar-link">About</li>
          </Link>

          <Link to='/'>
          <li className="navabar-link">Featured</li>
          </Link>

          <Link to='/posts' >
          <li className="navabar-link">All Articles</li>
          </Link>

          {loggedIn === false && (
            <Link to='/auth/login' >
            <li className="navabar-link">Login</li>
            </Link>
          )}

          {loggedIn === true && (
            <LogOutBtn />
          )}
           
        </ul>
      </div>
    )
  }


export default Navbar;