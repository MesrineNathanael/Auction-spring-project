import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../svg.svg"
import { withRouter } from "react-router-dom";

class UserList extends Component{

    state = {
        users: []
      };
      componentDidMount() {
        fetch('http://localhost:8080/users',{
          method: 'GET'
          })
          .then((response)=> response.json())
          .then((data)=> this.setState({users: data}))
      }
      
      render(){
        console.log(this.state.users);
        return (
          <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App-intro">
                  <h2>Users</h2>
                  {this.state.users.map(user =>
                      <div key={user.id}>
                        {user.firstname} ({user.email})
                      </div>
                  )}
                </div>
              </header>
            </div>);
      }
}
export default withRouter(UserList);