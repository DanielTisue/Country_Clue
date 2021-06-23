import React from 'react';
import { Link } from 'react-router-dom';

class FourOFour extends React.Component {
  render() {
    return (
     <div className="container"> 
       <div className="error-container">
        <div className="error-img">
          <p>There is going to be an image here or maybe an illustration or even possibly an ilustrated animation...ooooohhhhh ahhhh</p>
        </div>
        <div className="error-text">
          <h1>404 Page Not Found</h1>
          <p>Can't get a Country Clue here...Let's get you back to the articles</p>
          <div className="button-wrapper">
           <Link to={'/posts'} >
                <button className="read-more">Articles</button>
           </Link>
           </div>
        </div>
       </div>
    </div>
      )
  }
}

export default FourOFour;