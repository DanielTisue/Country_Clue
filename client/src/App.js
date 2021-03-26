import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PostList from './components/PostList';
import PostShow from './components/PostShow';
import PostForm from './components/PostForm';
import './style.css';

class App extends React.Component{
  
  render(){
    // const { post } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts/:id" component={PostShow} />
          <Route path="/posts" component={PostList} />
          <Route path="/create" component={PostForm} />
        </Switch>
      </BrowserRouter>
    )
  }
} ;
    
   
  

export default App;