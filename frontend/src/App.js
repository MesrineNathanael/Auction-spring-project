import logo from './svg.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import UserList from './Views/UserList';
import Home from './Views/Home';
import { Switch } from 'react-router-dom';
import AuctionNavBar from "./Views/Shared/AuctionNavBar";
import { Redirect } from 'react-router-dom';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <AuctionNavBar/>
        <Switch>
          <Route exact path="/users">
            <UserList />
          </Route>
          <Route exact path="/encheres">
            <Home />
          </Route>
          <Redirect to="/encheres"/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
