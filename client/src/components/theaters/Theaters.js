import React, { Component } from "react";
import PropTypes from "prop-types";
import Theater from "./Theater";
import Spinner from "../common/Spinner";
import fetchItems from "../../hocs/fetchItems";
import getTheaters from "../../actions/theaters/getTheatersAction";
import api from "../../utils/apiMap";
import { compose } from "redux";
import ModalContainer from "../modal/ModalContainer";
import OpenModalButton from "../common/OpenModalButton";

class Theaters extends Component {
  componentDidMount() {
    compose(
      this.props.fetchData,
      getTheaters
    )(api.theaters);
  }
  render() {
    const {
      field: { payload, loading },
      user
    } = this.props;

    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          <OpenModalButton text="theater" />
          {this.props.modal.isOpen && (
            <ModalContainer path={api.theater} current="theaters" />
          )}
          {payload.map(theater => (
            <Theater
              key={theater._id}
              name={theater.name}
              city={theater.city}
              id={theater._id}
              user={user}
            />
          ))}
        </div>
      );
    }
  }
}

Theaters.propTypes = {
  field: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};
const propFromRedux = "theaters";

export default fetchItems(Theaters, propFromRedux);
