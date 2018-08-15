import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMovie } from "../../actions/movieActions";
import { GET_MOVIE, MOVIE_LOADING, MOVIE_NOT_FOUND } from "../../actions/types";
import Spinner from "../common/Spinner";
import SingleMovie from "./SingleMovie";

class MovieContainer extends Component {
  componentDidMount() {
    const path = `/api/${this.props.match.url}`;
    this.props.fetchMovie(
      { GET: GET_MOVIE, LOADING: MOVIE_LOADING, NOT_FOUND: MOVIE_NOT_FOUND },
      path
    );
  }
  render() {
    const { payload, loading } = this.props.movie;
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
  movie: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    fetchMovie: (mathods, path) => {
      getMovie(mathods, path, dispatch);
    }
  };
};

// const fetchMovie
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieContainer);
