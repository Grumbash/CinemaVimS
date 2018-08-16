import React, { Component } from "react";
import PropTypes from "prop-types";
import Movie from "./Movie";
import Spinner from "../common/Spinner";
import fetchItems from "../../hocs/fetchItems";
import {
  GET_MOVIES,
  MOVIES_LOADING,
  MOVIES_NOT_FOUND
} from "../../actions/types";
import api from "../../utils/apiMap";

class Movies extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.getInfo(
      GET_MOVIES,
      MOVIES_LOADING,
      MOVIES_NOT_FOUND,
      api.movies
    );
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
  state: PropTypes.object.isRequired
};

export default fetchItems(Movies, "movies");
