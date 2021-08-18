import React from "react";
import { Link } from 'react-router-dom';
import four from '../../Assets/Images/404.svg';
import notFound from '../../Assets/Images/NotFound.svg';

const FourOFour = () => {
    return (
     <div className="container">
       <div className="error-container">

          <div className="error-img">
            <img className="error-left" src={notFound} alt="Not Found" />
          </div>

          <div className="error-text">
            <img className="error-right" src={four} alt="Not Found" />
            <p>You've gone way past country...don't worry, the blog is only a button click away.</p>
            <div className="button-wrapper error-btn">
            <Link to={'/posts'} >
                  <button className="primary error-primary">Back to the Blog</button>
            </Link>
            </div>
          </div>

       </div>
     </div>
      )
  }


export default FourOFour;