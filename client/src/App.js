import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PostList from './components/PostList';
import PostShow from './components/PostShow';
import CreatePostForm from './components/CreatePostForm';
// import PostEdit from './components/PostEdit'
import PostEditForm from './components/PostEditForm'
import './style.css';

class App extends React.Component{
  
  render(){
    // const { post } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts/:id" component={PostShow} />
          <Route exact path="/posts/:id/edit" component={PostEditForm} />
          <Route exact path="/posts" component={PostList} />
          <Route exact path="/create" component={CreatePostForm} />
        </Switch>
      </BrowserRouter>
    )
  }
} ;
    
   
  

export default App;