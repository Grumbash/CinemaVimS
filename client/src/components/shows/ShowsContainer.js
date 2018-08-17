import React, { Component } from "react";
import PropTypes from "prop-types";
import Show from "./Show";
import Spinner from "../common/Spinner";
import fetchItems from "../../hocs/fetchItems";
import getShows from "../../actions/shows/getShowsAction";
import api from "../../utils/apiMap";
import { compose } from "redux";

class Shows extends Component {
  componentDidMount() {
    compose(
      this.props.fetchData,
      getShows
    )(api.shows);
  }
  render() {
    const { shows, loading } = this.props.field;

    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          {shows.map(show => (
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
