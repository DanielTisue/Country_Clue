import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/PostShow.css';
import tagImage from '../../Images/tag.svg';
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
        [error, setError] = useState(null);

  let history = useHistory();

  //Get data from spedcific post
  useEffect(() => {
    axios.get('http://localhost:5000/posts/' + props.match.params.id)
    .then((result) => {
     setTitle(result.data.title)
     setDescription(result.data.description)
     setImage(result.data.image)
     setMessage(result.data.message)
     setDate(result.data.createdAt)
     setAuthor(result.data.author)
     setTags(result.data.tags)
    })
    .catch((err) => {
      if(err.response.status === 500) {
        setError(err.response.data.errMessage)
      } 
      const errMessage = "There was a problem retrieving this article. Please contact your site admin."
      setError("Status: " + err.response.status + ": " + errMessage)
    });
  }, [props])

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
      }
      })
  }

  //Render date as MM/DD/YEAR
  const renderDate = (dateString) => {
    const date = new Date(dateString);
    
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

 
  return (
          // POST CONTAINER
          <div className="postShow-container">
            {/* SHOW POST */}
            <div className="show-post">
              { error && <div className="error-message-wrapper"><div className="error-message">{ error }</div></div> }
                {/* TAGS */}
              <div className="show-item-tags">
                {tags.map((tag, key) => {
                  return <span className="postShow-tag" key={key}>{tag}<img className="postShow-tagImage" src={tagImage} alt="tag" /></span>
                })}
              </div>

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

              {/* AUTHOR & DATE */}
              <div className="show-item">
              <div className="show-author">{author}</div>
              {createdAt && <div className="show-date">{renderDate(createdAt)}</div>}
              </div>

              {/* IMAGE */}
              {image && <div className="show-item" value={image}>
                <img className="show-image" alt="" src={image} />
              </div> }
             
             

              {/* POST */}
              <div className="show-item">
                <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(message)}} id="post-copy"></div>
              </div>
          
             {/* BUTTONS */}
              <div className="show-item" id="button-div">

                {/* DELETE */}
                {loggedIn && (
                <button className="read-more space-it" onClick={deletePost}>Delete</button>
                )}
                {/* EDIT */}
                {loggedIn && (
                <Link to={`${props.match.params.id}/edit`} >
                <button className="edit space-it">Edit</button>
                </Link>
                )}

                {/* BACK TO POSTS */}
               
                <Link to={'/posts'} >
                <button className="read-more space-it">Articles</button>
                </Link>
                

              </div> 
              
            </div>
          </div>
  )
}

export default ShowPost;