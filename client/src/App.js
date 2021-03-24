import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostShow from './components/PostShow';

class App extends React.Component{
  
  render(){
    // const { post } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/posts/:id" component={PostShow} />
          <Route path="/posts" component={PostList} />
        </Switch>
      </BrowserRouter>
    )
  }
} ;
    
   
  

export default App;