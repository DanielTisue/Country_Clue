import React from 'react';
import axios from 'axios';
import Post from  '../Posts/Post';
import {ReactComponent as Background } from '../../Images/MusicBackground.svg';

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
         <Background className="background-img" />
        <div className="container"> 
              <div className="homepage-title-wrapper">
                <h1 id="homepage-title">GONE COUNTRY</h1>
                <h2 id="subhead">You ain't country until you gone country.</h2>
              
              </div>

            <section className="featured">
              <h1 id="featured-section">The Latest</h1>
             { this.error && <div className="error-message-wrapper"><div className="error-message">{ this.error }</div></div> }
             
              <ul className="featured-block">
              {this.renderList()}
              </ul>
            
            </section>

            <section className="about">
              <h1 id="about-section">What's this about?</h1>
              <p>This is about music you idiot...country music.</p>
            </section>
        
        </div>
        </React.Fragment>
      
  }
}

export default Home;