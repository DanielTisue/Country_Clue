import React from 'react';
import axios from 'axios';
import Post from  '../Posts/Post';
import {ReactComponent as Background } from '../Styles/MusicBackground.svg';

class Home extends React.Component {
mounted = false;

state = {
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
      this.mounted = true;
    } catch (err) {
      console.log(err);
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
                <h1 id="homepage-title">Gone Country</h1>
                <h2 id="subhead">Get the latest in country music</h2>
              
              </div>

            <section className="featured">
              <h1 id="featured-section">The Latest</h1>
             
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