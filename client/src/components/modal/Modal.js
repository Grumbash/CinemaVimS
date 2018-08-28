import React, { Component } from "react";
import "./modal.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.title =
      this.props.path.slice(1, 2).toUpperCase() +
      this.props.path.slice(2, this.props.path.length - 1);

    this.textInput = React.createRef();
  }

  getInputsValues = () => {
    console.log(this.textInput.current.value);
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
            <form className="container">
              {this.props.inputFields.map((fieldName, idx) => (
                <input
                  type="text"
                  name={fieldName}
                  placeholder={fieldName}
                  className="col"
                  key={idx}
                  ref={this.textInput}
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
              className="btn btn-primary" // onClick={this.props.postData(`/api/${this.props.path}`, )}
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
