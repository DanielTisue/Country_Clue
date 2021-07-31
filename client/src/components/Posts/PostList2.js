import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Post from './Post';

const PostList2 = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsubscribe = () => {
      axios.get('http://localhost:5000/posts')
      .then((res)=> {
        setPosts(res.data);
      }).catch((err) => {
        console.log(err.data.errMessage);
      });
    }
    return unsubscribe();
  }, []);

  return (
    <div className="container">
        <div className="flex-container">
          <div className="articlepage-title-wrapper">
              <h1 id="articlepage-title">Articles</h1>
              {/* { this.error && <div className="error-message-wrapper"><div className="error-message">{ this.error }</div></div> } */}
          </div>
            {/* {this.renderList()} */}
            {posts?.map((post => (
              <Post post={post} key={post._id} />
            )))}
        </div>
    </div>
  )
}

export default PostList2
