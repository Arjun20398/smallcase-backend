import React, {Component} from 'react';
import './App.css';
import Add from "./components/Add"
import Profile from "./components/Profile"
import {Switch, Route, Redirect} from 'react-router-dom'

export class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/" exact render = {()=><Profile></Profile>} />
            <Route path="/Add" component={ Add } />
            <Redirect to="/" />
          </Switch>  
  
      </div>
    );
  }
}

export default App;