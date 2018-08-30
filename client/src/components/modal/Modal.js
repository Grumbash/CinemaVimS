import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import "./modal.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.title =
      this.props.path.slice(1, 2).toUpperCase() +
      this.props.path.slice(2, this.props.path.length - 1);

    const arrayToObject = array =>
      array.reduce((obj, item) => {
        obj[item] = "";
        return obj;
      }, {});

    this.state = arrayToObject(this.props.inputFields);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getInputsValues = e => {
    this.props.postData(`/api${this.props.path}`, this.state);
  };

  render() {
    return (
      <div className="modal-dialog modal-dialog-centered modal-react">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{this.title}</h5>
            <button
              type="button"
              className="close"
              onClick={this.props.closeModal}
            >
              <span aria-hidden="true">
                <i className="fa fa-times" />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <form className="container" onSubmit={this.getInputsValues}>
              {this.props.inputFields.map((name, idx) => (
                <TextFieldGroup
                  name={name}
                  placeholder={name}
                  key={idx}
                  value={this.state[name]}
                  onChange={this.onChange}
                />
              ))}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.props.closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.getInputsValues}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}
