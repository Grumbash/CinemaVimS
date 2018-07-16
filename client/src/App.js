import React, { Component } from "react";
import LoginForm from "./components/LoginForm.js";
//{this.state.users ? this.state.users.map(user => {
//     return <li key={user.id}>{user.name}</li>
// }) : <li key="no-data">No data</li>}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetch("/api/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  render() {
    /*Undefined check and/or preloader*/
    return (
      <div className="App">
        <h1>Users</h1>
        <ul>
          {this.state.users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
        <LoginForm />
      </div>
    );
  }
}

export default App;
