import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import SingleTheater from "./SingleTheater";
import fetchItems from "../../hocs/fetchItems";
import setCurrentTheater from "../../actions/theater/setCurrentTheaterAction";
import getTheater from "../../actions/theater/getTheaterAction";
import api from "../../utils/apiMap";
import { compose } from "redux";

class TheaterContainer extends Component {
  constructor(props) {
    super(props);

    this.dispatch = this.props.dispatch;
  }
  componentWillMount() {
    this.dispatch(setCurrentTheater(this.props.match.params.id));
  }
  componentDidMount() {
    const path = `${api.theater}/${this.props.match.params.id}`;
    compose(
      this.props.fetchData,
      getTheater
    )(path);
  }
  render() {
    const { theater, loading } = this.props.field;
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return <div>{<SingleTheater {...theater} />}</div>;
  }
}

TheaterContainer.propTypes = {
  field: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};

const propFromRedux = "theater";

export default fetchItems(TheaterContainer, propFromRedux);
