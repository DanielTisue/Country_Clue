import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Post from './Post';
import { Footer } from '../Layout/Footer';

const PostList2 = () => {
  const [posts, setPosts] = useState([]),
        [error, setError] = useState(null),
        [isloading, setisLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = () => {
      // Synchronus
      axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
      .then((res)=> {
        setPosts(res.data)
        setisLoading(false);
      }).catch((err) => {
        let errMessage = "There was a problem retrieving the articles. Please contact your site admin."
        let error = errMessage;
        setError(error)
      });
    }
    return unsubscribe();
  }, []);

  return (
    <>
    
    <div className="bg-img" id="article-bg-img">
        <div className="articlepage-title-wrapper">
              <h1 id="articlepage-title">ARTICLES</h1>
      </div>
    </div>
    <div className="container">
        { error && <div className="error-message-wrapper"><div className="error-message">
                {error}</div></div> }
      <div className="flex-container">
        {posts?.map((post => (
          <Post post={post} key={post._id} />
        )))}
      </div>
    </div>
    { !isloading && (
    <Footer />
    )}
    </>
  )
}

export default PostList2
