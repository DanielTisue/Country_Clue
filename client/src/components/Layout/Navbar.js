import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../Context/AuthContext";
import LogOutBtn from '../Auth/LogOutBtn';
import HomeGuitar from '../../Images/guitar.png';

function Navbar() {
const { loggedIn } = useContext(AuthContext);

    return (
      // <div className="container">
        <div className="navBar">
          <ul className="navBar-items">
            <Link to='/'>
              <li className="navBar-link">
              <img className="navBar-home-icon" src= {HomeGuitar} alt="HomeLogo" />
              </li>
            <li className="navBar-link" id="home-text">Home</li>
            </Link>

            {/* <Link to='/'>
            <li className="navBar-link">About</li>
            </Link> */}

            {/* <Link to='/'>
            <li className="navBar-link">Featured</li>
            </Link> */}

            <Link to='/posts' >
            <li className="navBar-link">Articles</li>
            </Link>

            {/* {!loggedIn && (
              <Link to='/auth/login' >
              <li className="navBar-link">Login</li>
              </Link>
            )} */}
            
            {loggedIn && (
             <Link to='/create' >
              <li className="navBar-link">Create Article</li>
              </Link>
            )}

            {loggedIn && (
              <li className="navBar-link"> <LogOutBtn /> </li>
            )}
            
          </ul>
          {/* <div className="hamburger">
            <div id="rotate-top" className="line"></div>
            <div id="rotate-bottom" className="line"></div>
            <div id="remove-center" className="line"></div>
          </div> */}

        </div>
      //  </div>
    )
  }


export default Navbar;