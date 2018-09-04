import React, { Component } from "react";
import PropTypes from "prop-types";
import Show from "./Show";
import Spinner from "../common/Spinner";
import ModalContainer from "../modal/ModalContainer";
import fetchItems from "../../hocs/fetchItems";
import getShows from "../../actions/shows/getShowsAction";
import api from "../../utils/apiMap";
import { compose } from "redux";
import OpenModalButton from "../common/OpenModalButton";

class Shows extends Component {
  componentDidMount() {
    compose(
      this.props.fetchData,
      getShows
    )(api.shows);
  }
  render() {
    const { payload, loading } = this.props.field;

    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          <OpenModalButton text="show" />
          {this.props.modal.isOpen && (
            <ModalContainer
              path={this.props.location.pathname}
              current="shows"
            />
          )}
          {payload.map(show => (
            <Show key={show._id} {...show} />
          ))}
        </div>
      );
    }
  }
}

Shows.propTypes = {
  field: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};
const propsFromRedux = "shows";
export default fetchItems(Shows, propsFromRedux);
