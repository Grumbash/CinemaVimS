import React, { Component } from "react";
import PropTypes from "prop-types";
import getMovie from "../../actions/movie/getMovieActon";
import Spinner from "../common/Spinner";
import SingleMovie from "./SingleMovie";
import fetchItems from "../../hocs/fetchItems";
import api from "../../utils/apiMap";
import { compose } from "redux";

class MovieContainer extends Component {
  componentDidMount() {
    const path = `${api.movie}/${this.props.match.params.id}`;
    compose(
      this.props.fetchData,
      getMovie
    )(path);
  }
  render() {
    const { payload, loading } = this.props.field;
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <div>
        <SingleMovie movie={{ ...payload }} />
      </div>
    );
  }
}

MovieContainer.propTypes = {
  field: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};

const propFromRedux = "movie";

export default fetchItems(MovieContainer, propFromRedux);
