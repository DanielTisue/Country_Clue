import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Layout/Home';
import Navbar from './components/Layout/Navbar';
import PostList from './components/Posts/PostList';
import ShowPost from './components/Posts/ShowPost';
import CreatePostForm from './components/PostForms/CreatePostForm';
import PostEditForm from './components/PostForms/PostEditForm';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AuthContext from './components/Context/AuthContext';
// import FourOFour from './components/Layout/404';



const Router = () => {
  const { loggedIn } = useContext(AuthContext);
  // let history = useHistory();
  return (
   <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={PostList} />
          <Route exact path="/posts/:id" component={ShowPost} />
          {/* //Conditiional Routes */}
          {loggedIn && (
          <Route exact path="/posts/:id/edit" component={PostEditForm} />
          )}
          {loggedIn && (
           <Route exact path="/create" component={CreatePostForm} />
           )} 
          {!loggedIn && (
          <Route exact path="/auth/register" component={Register} />
          )}
          {!loggedIn && (
          <Route exact path="/auth/login" component={Login} />
          )}
          {/*//Catchall 404 error */}
          {/* <Route path="*" component={FourOFour}/> */}
        </Switch>
      </BrowserRouter>
  )
}

export default Router;