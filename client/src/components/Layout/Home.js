import React from 'react';
import axios from 'axios';
import Post from  '../Posts/Post';
import logo from '../../Assets/Images/GoneCountryLogoOnly.png';
// import imagebg from '../../Assets/Images/WHT_Brick-bg_joe-woods_unsplash.jpg';
// import {ReactComponent as Background } from '../../Assets/Images/MusicBackground.svg';

class Home extends React.Component {

state = {
    error: null,
    posts: []
  }

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    
    try {
      const res = await axios.get("http://localhost:5000/posts");
      // console.log(res.data);
      this.setState({posts: res.data})
      
    } catch (err) {
      if(err.response.status === 500) {
          this.setState({ error: err.response.data.errMessage })
        } 
        const errMessage = "There was a problem retrieving featured articles. Please contact your site admin."
        this.setState({ error: "Status: " + err.response.status + ": " + errMessage })
    }
    
  }

  renderList() {
    return this.state.posts.slice(0, 3).map( post => {
    return <Post post={post} key={post._id} />
    });
  }

  
render(){
  return <React.Fragment>
         <div className="bg-img">
            <img className="main-img" src={logo} alt="GoneCountry" />
            <div className="homepage-title-wrapper">
               
                <h1 id="homepage-title">GONE COUNTRY</h1>
                <h2 id="subhead">MUSIC BLOG</h2>
               
              </div>
         </div>
        <div className="container"> 
            <section className="featured" id="featured">
              <h1 id="featured-section">The Latest<span className="antique">&nbsp;</span></h1>
              <h2 className="subhead">Read the the most recent country music articles.</h2>
             { this.error && <div className="error-message-wrapper"><div className="error-message">{ this.error }</div></div> }
             
              <div className="featured-block">
              {this.renderList()}
              </div>
            
            </section>

            <section className="about" id="about">
              <h1 id="about-section">What's this about?<span className="antique">&nbsp;</span></h1>
              <h2 className="subhead">This blog features a variety of country music topics.</h2>
              <div className="about-content-wrapper">
                <p className="secondary-text">This is about music you idiot...country music.</p>
              </div>
            </section>
        
        </div>
        </React.Fragment>
      
  }
}

export default Home;