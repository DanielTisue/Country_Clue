import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Navlinks } from './NavbarData';
import AuthContext from "../Context/AuthContext";
import LogOutBtn from '../Auth/LogOutBtn';
// import {ReactComponent as HomeLogo } from '../../Assets/Images/guitar_amp.svg';


function Navbar() {
const { loggedIn } = useContext(AuthContext);

const [open, setOpen] = useState(false);
const [openMenu, setOpenMenu] = useState(false);

const showOpen = () => {
   setOpen(!open)
  setOpenMenu(!openMenu)
};



return (
      <div className="navBar">
        
       <div className="menu-bar-wrapper">
          <div className={open ? 'hamburger open' : 'hamburger'} onClick={showOpen}>
            <div className="line"></div>
          </div>
         <div className={openMenu ? 'menu-bar open-menu' : 'menu-bar'} onClick={showOpen}>
            <ul className="navBar-items">

              {Navlinks.map((navlink) => {
                return <li className="navBar-link-item"><a href={navlink.url} key={navlink.id}>{navlink.text}</a></li>
              })}

              {/* <Link to='/'>
            <li className="navBar-link-item">Home</li>
            </Link>
             <Link to='/posts' >
            <li className="navBar-link-item">Articles</li>
            </Link>
            <Link to='/'>
            <li className="navBar-link-item">The Latest</li>
            </Link>
            <Link to='/'>
            <li className="navBar-link-item">About</li>
            </Link> */}
           {loggedIn && (
             <Link to='/create' >
              <li className="navBar-link-item">Create Article</li>
              </Link>
            )}
            {!loggedIn && (
              <Link to='/auth/login' >
              <li className="navBar-link-item">Login</li>
              </Link>
            )}
            {loggedIn && (
              <li className="navBar-link-item"> <LogOutBtn /> </li>
            )}
          </ul>
         </div>
       </div>  
    </div>
    )
  }


export default Navbar;