import React from 'react';
import {ReactComponent as Background } from '../Styles/MusicBackground.svg'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
         <Background className="background-img" />
        <div className="container"> 
          <div className="homepage-title-wrapper">
            <h1 id="homepage-title">Gone Country</h1>
            <h2 id="subhead">Get the latest in country music</h2>
          
          </div>

        <section className="featured">
          <h1 id="featured-section">The Latest</h1>
        </section>

        <section className="about">
          <h1 id="about-section">What's this about?</h1>
        </section>
        
    </div>
    </React.Fragment>
      )
  }
}

export default Home;