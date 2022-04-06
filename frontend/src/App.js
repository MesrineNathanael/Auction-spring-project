import logo from './svg.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import UserList from './Component/UserList';
import Home from './Component/Home';
import { Switch } from 'react-router-dom';
import AuctionNavBar from "./Views/Shared/AuctionNavBar";
import { Redirect } from 'react-router-dom';
import PageConnection from './Component/PageConnection/PageConnection';

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
          {/*<Redirect to="/encheres"/>*/}
          <Route exact path="/connection"> 
            <PageConnection />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
