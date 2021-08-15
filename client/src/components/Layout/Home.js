import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Post from  '../Posts/Post';
import logo from '../../Assets/Images/NewSingleGuitar.jpg';
import { Footer } from './Footer';
// import imagebg from '../../Assets/Images/WHT_Brick-bg_joe-woods_unsplash.jpg';
// import {ReactComponent as Background } from '../../Assets/Images/MusicBackground.svg';

const Home = () => {

const [posts, setPosts] = useState([]),
      [error, setError] = useState(null);
      

  useEffect(() => {
    const unsubscribe = () => {
      // Synchronus
      axios.get('http://localhost:5000/posts')
      .then((res)=> {
        setPosts(res.data)
      }).catch((err) => {
        let errMessage = "There was a problem retrieving the featured articles. Please contact your site admin."
        let error = errMessage;
        setError(error)
      });
    }
    return unsubscribe();
  }, []);

  


    return (
      <>
            <div className="bg-img">
              <div className="container" id="main-home">
                    <div className="main-bg"></div>
                    
                      <div className="homepage-title-wrapper">
                        
                          <h1 id="homepage-title">GONE COUNTRY</h1>
                          <h2 id="subhead">MUSIC BLOG</h2>
                          <Link to='/posts' >
                          <button className="secondary-inverse" id="main-cta">Read now</button>
                          </Link>
                        </div>
                      <div className="main-img-wrapper">
                        <img className="main-img" src={logo} alt="GoneCountry" />
                      </div> 
                  </div>
              </div>
            <div className="container"> 
                <section className="featured" id="featured">
                  <h1 id="featured-section">THE LATEST<span className="antique">&nbsp;</span></h1>
                  <h2 className="subhead">Read the the most recent country music articles.</h2>
                { error && (<div className="error-message-wrapper"><div className="error-message">{ error }</div></div>) }
                
                  <div className="featured-block">
                  {posts?.slice(0, 3).map((post => (
                    <Post post={post} key={post._id} />
                  )))}
                  </div>
                
                </section>

                <section className="about" id="about">
                  <h1 id="about-section">WHAT'S THIS ABOUT<span className="antique">&nbsp;</span></h1>
                  <h2 className="subhead">This blog features a variety of country music topics.</h2>
                  <div className="about-content-wrapper">
                    <p className="secondary-text">This is about music you idiot...country music.</p>
                  </div>
                </section>
            
            </div>
            <Footer />
        </>
    )
}

export default Home;