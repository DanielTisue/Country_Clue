import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/PostShow.css';
import tagImage from '../../Assets/Images/tag.svg';
import { ReactComponent as Heart } from '../../Assets/Images/heart.svg';
import AuthContext from "../Context/AuthContext";



function ShowPost (props) {
  const { loggedIn } = useContext(AuthContext);

  const [title, setTitle] = useState(""),
        [description, setDescription] = useState(""),
        [image, setImage] = useState(""),
        [message, setMessage] = useState(""),
        [createdAt, setDate] = useState(""),
        [author, setAuthor] = useState(""),
        [tags, setTags] = useState([]),
        [error, setError] = useState(null),
        [mounted, isMounting] = useState(true),
        [liked, setLiked] = useState(false);
    let [likes, setLikes] = useState();
 
        // has to be set as separate state for buttons not contingent on loggedIn status

  let history = useHistory();

  //Get data from spedcific post
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts/` + props.match.params.id)
    .then((result) => {
     setTitle(result.data.title)
     setDescription(result.data.description)
     setImage(result.data.image)
     setMessage(result.data.message)
     setDate(result.data.createdAt)
     setAuthor(result.data.author)
     setTags(result.data.tags)
     setLikes(result.data.likes)
     isMounting(false)
     if(likes > 0) {
        setLiked(true)
     }
    })
    .catch((err) => {
      console.log(err);
      let errMessage = "There was a problem retrieving this article."
      setError(errMessage)
      // history.push('/posts');
    });
    
  }, [props, likes]);

  const addLike = () => {

    if(likes > 0) {
      setLiked(!liked)
    }

    let newLike = likes++;
    setLikes(newLike)

    let updatedPost = {
        title,
        description,
        image,
        message,
        createdAt,
        author,
        tags,
        likes  
    }
    
    axios.put('http://localhost:5000/posts/' + props.match.params.id, updatedPost)
    .then((res) => {
      history.push(`/posts/` + props.match.params.id);
    }).catch((err) => {
      console.log(err);
      if(err.response.status === 500) {
        setError(err.response.data.errMessage)
        // history.push('/posts');
      } 
      const errMessage = "There was a problem updating this article."
      setError("Status: " + err.response.status + ": " + errMessage)
      // history.push('/posts');
    })
  }

  // Delete post
  const deletePost = (e) => {
    axios.delete('http://localhost:5000/posts/' + props.match.params.id)
        // Redirect to Posts  
      .then (res => {
        history.push('/posts');
      })
      .catch((err) => {
        if(err.response.status === 500) {
        setError(err.response.data.errMessage)
        // history.push('/posts');
      }
      setError(err)
      // history.push('/posts');
      })
  }

  //Render date as MM/DD/YEAR
  const renderDate = (dateString) => {
    const date = new Date(dateString);
    
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }

 
  return (
          // POST CONTAINER
          <div className="postShow-container">
            {/* SHOW POST */}
            <div className="show-post">
              { error && ( 
                <div className="error-message-wrapper">
                  <div className="error-message">{ error }</div>
                  <Link to={'/posts'} >
                  <button className="secondary space-it no-hover">Back to Articles</button>
                  </Link>
                </div> 
              )}
                {/* TAGS */}
              <div className="show-post-header">

                <div className="show-item-tags">
                  {tags.map((tag, key) => {
                    return <span className="postShow-tag" key={key}>{tag}<img className="postShow-tagImage" src={tagImage} alt="tag" /></span>
                  })}
                </div>
                <div className="show-item-likes">
                   {!mounted && (
                  <Heart className={liked ? 'heart filled' : 'heart'} value={liked} onClick={addLike} />
                   )}
                   {likes}
                </div>

              </div>
          

              {/* AUTHOR & DATE */}
              <div className="show-item">
              <div className="show-author">{author}</div>
              {createdAt && (<div className="show-date">{renderDate(createdAt)}</div>)}
              </div>

              {/* IMAGE */}
              {image && (<div className="show-item" value={image}>
                <img className="show-image" alt="" src={image} />
              </div> )}
             
              {/* TITLE */}
              <div className="show-item">
                <h1 className="show-title">{title}</h1>
              </div>

               {/* DESCRIPTION */}
              <div className="show-item">
                  <div className="show-description" value={description}><h2 id="showPost-description">
                    {description}
                   </h2></div>
              </div>

              {/* POST */}
              <div className="show-item">
                <div className="showPost-copy" dangerouslySetInnerHTML={{__html: dompurify.sanitize(message)}} id="post-copy"></div>
              </div>
          
             {/* BUTTONS */}
              <div className="show-item" id="button-div">

                {/* DELETE */}
                {loggedIn && !mounted && (
                <button className="primary space-it" onClick={deletePost}>Delete</button>
                )}
                {/* EDIT */}
                {loggedIn && !mounted && (
                <Link to={`${props.match.params.id}/edit`} >
                <button className="edit space-it">Edit</button>
                </Link>
                )}

                {/* BACK TO POSTS */}
               
                <Link to={'/posts'} >
                {!mounted && (
                 <button className="secondary space-it">Back to Articles</button>
                )}
                </Link>
                

              </div> 
              
            </div>
          </div>
  )
}

export default ShowPost;