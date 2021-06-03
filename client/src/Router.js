import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import PostList from './components/Posts/PostList';
import ShowPost from './components/Posts/ShowPost';
import CreatePostForm from './components/PostForms/CreatePostForm';
import PostEditForm from './components/PostForms/PostEditForm';
import Register from './components/Auth/Register';
import Login from "./components/Auth/Login";
import AuthContext from './components/Context/AuthContext'


const Router = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
   <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={PostList} />
          <Route exact path="/posts/:id" component={ShowPost} />
          {loggedIn === true && (
          <Route exact path="/posts/:id/edit" component={PostEditForm} />
          )}
          {loggedIn === true && (
          <Route exact path="/create" component={CreatePostForm} />
          )}
          <Route exact path="/auth/register" component={Register} />
          {loggedIn === false && (
          <Route exact path="/auth/login" component={Login} />
          )}
          <Route path="*" component={() => "404 NOT FOUND" }/>
        </Switch>
      </BrowserRouter>
  )
}

export default Router;