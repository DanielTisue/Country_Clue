import React from 'react';

class Home extends React.Component {
  render() {
    return (
     <div className="container"> 
        <div className="homepage-title-wrapper">
          <h1 id="homepage-title">Homepage</h1>
        </div>
        <section className="featured">
          <h1 id="featured-section">The Latest</h1>
        </section>

        <section className="about">
          <h1 id="about-section">What's this about?</h1>
        </section>
        
    </div>
      )
  }
}

export default Home;