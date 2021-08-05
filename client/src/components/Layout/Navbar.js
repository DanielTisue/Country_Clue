import React, { useState, useContext, useRef } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../Context/AuthContext";
import LogOutBtn from '../Auth/LogOutBtn';
import {ReactComponent as HomeLogo } from '../../Assets/Images/guitar_amp.svg';
import {ReactComponent as Articles } from '../../Assets/Images/articles.svg';
import {ReactComponent as CreateArticle } from '../../Assets/Images/file-plus.svg';


function Navbar() {
const { loggedIn } = useContext(AuthContext);




    return (
      // <div className="container">
        <div className="navBar">
          <div className="navBar-link">
          <Link to='/'>
            
                <HomeLogo className="navBar-home-icon" alt="HomeLogo" />             
            </Link>
          </div>
          

          {/* <ul className="navBar-items">
            
            <Link to='/'>
            <li className="navBar-link-item">About</li>
            </Link>


            <Link to='/'>
            <li className="navBar-link-item">The Latest</li>
            </Link>

            <Link to='/posts' >
            <li className="navBar-link-item"> <Articles className="navBar-articles-icon menu-icon" alt="Articles" /><span className="menu-text">Articles</span></li>
            </Link> */}

            {/* {!loggedIn && (
              <Link to='/auth/login' >
              <li className="navBar-link">Login</li>
              </Link>
            )} */}
            
            {/* {loggedIn && (
             <Link to='/create' >
              <li className="navBar-link"><CreateArticle className="navBar-create-icon menu-icon" alt="create Article" /><span className="menu-text">Create Article</span></li>
              </Link>
            )}

            {loggedIn && (
              <li className="navBar-link"> <LogOutBtn /> </li>
            )}
            
          </ul> */}
        
          <div className="hamburger" >
            <div id="rotate-bottom" className="line"></div>
          </div>
        </div>
      //  </div>
    )
  }


export default Navbar;