import React, { Component } from "react";
// import Axios from "axios";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    this.setState = this.setState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const val = e.target.value;
    this.setState({ name: val });
  }

  handleSubmit(e) {
    e.preventDefault();
    alert("Имя: " + this.state.name);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>Имя:</label>
          <br />
          <input
            type="text"
            className="input"
            value={this.state.name}
            onChange={this.onChange}
          />
        </p>
        <input type="submit" value="Отправить" className="btn btn-danger" />
        <div className="text">{this.state.name}</div>
      </form>
    );
  }
}
