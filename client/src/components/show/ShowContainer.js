import React, { Component } from "react";
import PropTypes from "prop-types";
import getShow from "../../actions/show/getShowAction";
import setCurrentShow from "../../actions/show/setCurrentShow";
import Spinner from "../common/Spinner";
import SingleShow from "./SingleShow";
import fetchItems from "../../hocs/fetchItems";
import api from "../../utils/apiMap";
import { compose } from "redux";

class ShowContainer extends Component {
  constructor(props) {
    super(props);

    this.hall_id = this.props.location.state.hall_id;
    this.dispatch = this.props.dispatch;
  }
  componentWillMount() {
    this.dispatch(setCurrentShow(this.props.match.params.id));
  }
  componentDidMount() {
    const path = `${api.rows}/${this.hall_id}`;
    compose(
      this.props.fetchData,
      getShow
    )(path);
  }
  render() {
    const { rows, loading } = this.props.field;
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <div>
        <SingleShow show={{ rows, hall_id: this.hall_id }} />
      </div>
    );
  }
}

ShowContainer.propTypes = {
  field: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};

const propFromRedux = "show";

export default fetchItems(ShowContainer, propFromRedux);
