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
        if(err.response.status === 500) {
          setError({ error: err.response.data.errMessage })
        } 
        const errMessage = "There was a problem retrieving the featured articles. Please contact your site admin."
        setError({ error: "Status: " + err.response.status + ": " + errMessage })
      });
    }
    return unsubscribe();
  }, []);

  return (
    <div className="container">
        
          <div className="articlepage-title-wrapper">
              <h1 id="articlepage-title">Articles<span className="antique">&nbsp;</span></h1>
              { error && <div className="error-message-wrapper"><div className="error-message">
                {error}</div></div> }
          </div>
          <div className="flex-container">
            {posts?.map((post => (
              <Post post={post} key={post._id} />
            )))}
        </div>
    </div>
  )
}

export default PostList2
