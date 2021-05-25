import React from 'react';
import { AuthContextProvider } from './components/Context/AuthContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PostList from './components/Posts/PostList';
import ShowPost from './components/Posts/ShowPost';
import CreatePostForm from './components/PostForms/CreatePostForm';
import PostEditForm from './components/PostForms/PostEditForm';
import Register from './components/Auth/Register';
import Login from "./components/Auth/Login";
import './style.css';
import Navbar from './components/Navbar';




class App extends React.Component{
  
  render(){
    return (
      <AuthContextProvider>
        
      <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts/:id" component={ShowPost} />
          <Route exact path="/posts/:id/edit" component={PostEditForm} />
          <Route exact path="/posts" component={PostList} />
          <Route exact path="/create" component={CreatePostForm} />
          <Route exact path="/auth/register" component={Register} />
          <Route exact path="/auth/login" component={Login} />
        </Switch>
      </BrowserRouter>
      </AuthContextProvider>
    )
  }
} ;
    
   
  

export default App;