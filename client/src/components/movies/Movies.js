import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getMovies from "../../actions/moviesActions";
import Movie from "./Movie";
import Spinner from "../common/Spinner";

class Movies extends Component {
  componentDidMount() {
    this.props.getMovies();
  }
  render() {
    const { films, loading } = this.props.movies;

    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <div>
        {films.map(movie => (
          <Movie
            key={movie._id}
            title={movie.title}
            duration={movie.duration}
            id={movie._id}
          />
        ))}
      </div>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getMovies }
)(Movies);
