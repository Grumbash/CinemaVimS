import React, { Component } from 'react';
import './App.css';
/*
          {console.log(this.state.users.map(user=>user.name))}
*/
class App extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     users:[]
  //   }
  //   this.setState = this.setState.bind(this)
  // }
  state = {
    users:[]
  }
  componentDidMount(){
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}));
  }
  render() {
    /*Undefined check and/or preloader*/
    return (
      <div className="App">
        <h1>Users</h1>
        <ul>
          {this.state.users.map(user => {
            return <li key={user.id}>{user.name}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
