import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Component } from 'react';
import UserList from './Component/UserList';
import Home from './Component/Home';
import { Switch } from 'react-router-dom';
import AuctionNavBar from "./Views/Shared/AuctionNavBar";
import { Redirect } from 'react-router-dom';
import PageConnection from './Component/PageConnection/PageConnection';
import PageInscription from './Component/PageInscription/PageInscription';
import Profil from './Component/PageProfil/Profil';
import PageProduct from './Component/PageProduct/Product';

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
          <Route exact path="/connection"> 
            <PageConnection />
          </Route>
          <Route exact path="/inscription"> 
            <PageInscription />
          </Route>
          <Route exact path="/profil/:id"> 
            <Profil />
          </Route>
          <Route exact path="/product">
            <PageProduct />
          </Route>
          {/* A METTRE EN DERNIER CAR CECI EST LA PAGE PAR DEFAUT */}
          <Redirect to="/encheres"/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
