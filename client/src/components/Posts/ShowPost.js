import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import { Link, useHistory } from 'react-router-dom';
import '../PostShow.css';
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
        [tags, setTags] = useState([]);

  let history = useHistory();

  //Load data from post with id
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
      .catch((error) => console.log(error))
  }, [props])

  // DELETE POST
  const deletePost = (e) => {
    axios.delete('http://localhost:5000/posts/' + props.match.params.id)
      .then((res) => {
        console.log('Post deleted');
      })
        // Redirect to Posts  
      .then (res => {
        history.push('/posts');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const renderDate = (dateString) => {
    const date = new Date(dateString);
    
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

 
  return (
          // POST CONTAINER
          <div className="postShow-container">
            {/* SHOW POST */}
            <div className="show-post">

              {/* TITLE */}
              <div className="show-item">
                <h2 className="show-title">{title}</h2>
              </div>

              {/* AUTHOR & DATE */}
              <div className="show-item">
              <div className="show-date">{author}</div>
              {createdAt && <div className="show-date">{renderDate(createdAt)}</div>}
              </div>

              {/* IMAGE */}
              { image && <div className="show-item" value={image}>
                <img className="show-image" alt="" src={image} />
              </div> }
               {/* TAGS */}
              <div className="show-item-tags">
                {tags.map((tag, key) => {
                  return <span className="postShow-tag" key={key}>{tag}<img className="postShow-tagImage" src={tagImage} alt="tag" /></span>
                })}
              </div>
              {/* DESCRIPTION */}
              <div className="show-item">
                  <div className="show-description" value={description}><h3>
                    {description}
                   </h3></div>
              </div>

              {/* POST */}
              <div className="show-item">
                <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(message)}}></div>
              </div>
          
             {/* BUTTONS */}
              <div className="show-item" id="button-div">

                {/* DELETE */}
                {loggedIn === true && (
                <button className="read-more space-it" onClick={deletePost}>Delete</button>
                )}
                {/* EDIT */}
                {loggedIn === true && (
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