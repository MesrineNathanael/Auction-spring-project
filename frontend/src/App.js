import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component{
  state = {
    users: []
  };
  componentDidMount() {
    fetch('http://localhost:8080/users/all',{
      method: 'GET',
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
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

export default App;
