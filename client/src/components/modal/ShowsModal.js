import SelectModal from "./SelectModal";
import TextFieldGroup from "../common/TextFieldGroup";
import React, { Component } from "react";
import getHalls from "../../actions/halls/getHallsAction";
import getMoviesAction from "../../actions/movies/getMoviesAction";
import api from "../../utils/apiMap";
import "./modal.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.title =
      this.props.title[0].toUpperCase() +
      this.props.title.slice(1, this.props.title.legth);

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

  onSelect = e => {
    console.log(e.target.value.substring(-1, 16));

    // this.setState({ [e.target.name]: e.target.value });
  };

  componentWillMount = () => {
    console.log(this.state);
    getMoviesAction(api.movies)(this.props.dispatch);
    getHalls(api.halls)(this.props.dispatch);
  };

  getInputsValues = e => {
    const state = { ...this.state };
    this.props.postAction(`/api${this.props.path}`)(state)(this.props.dispatch);
    this.props.closeModal();
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
              <SelectModal
                name="movie"
                options={this.props.movies.payload}
                onChange={this.onSelect}
              />
              <SelectModal
                name="hall"
                options={this.props.halls.payload}
                onChange={this.onSelect}
              />
              <TextFieldGroup
                name="date"
                placeholder="YYYY-MM-DD HH:MM:SS"
                value={this.state.date}
                onChange={this.onChange}
              />
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
