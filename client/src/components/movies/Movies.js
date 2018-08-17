import React, { Component } from "react";
import PropTypes from "prop-types";
import Movie from "./Movie";
import Spinner from "../common/Spinner";
import fetchItems from "../../hocs/fetchItems";
import getMovies from "../../actions/movies/getMoviesAction";
import api from "../../utils/apiMap";
import { compose } from "redux";

class Movies extends Component {
  componentDidMount() {
    compose(
      this.props.fetchData,
      getMovies
    )(api.movies);
  }

  render() {
    const { films, loading } = this.props.field;

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
  field: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};
const propFromRedux = "movies";
export default fetchItems(Movies, propFromRedux);