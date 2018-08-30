import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import SingleTheater from "./SingleTheater";
import fetchItems from "../../hocs/fetchItems";
import setCurrentTheater from "../../actions/theater/setCurrentTheaterAction";
import getTheater from "../../actions/theater/getTheaterAction";
import api from "../../utils/apiMap";
import DeleteButton from "../common/DeleteButton";
import DeleteModal from "../deleteModal/DeleteModal";
import { compose } from "redux";

class TheaterContainer extends Component {
  constructor(props) {
    super(props);
    this.path = `${api.theater}/${this.props.match.params.id}`;

    this.dispatch = this.props.dispatch;
  }
  componentWillMount() {
    this.dispatch(setCurrentTheater(this.props.match.params.id));
  }
  componentDidMount() {
    compose(
      this.props.fetchData,
      getTheater
    )(this.path);
  }
  render() {
    const { theater, loading } = this.props.field;
    const { user, modal } = this.props;
    console.log(this.props);
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div className="row">
          <SingleTheater {...theater} />
          {user.isAdmin &&
            modal.isDeleteOpen && (
              <DeleteModal
                path={this.path}
                purposeOfRemoval={theater}
                goBack={this.props.history.push}
                pathToBack={this.props.location.state.path}
              />
            )}
          {user.isAdmin && <DeleteButton />}
        </div>
      );
    }
  }
}

TheaterContainer.propTypes = {
  field: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};

const propFromRedux = "theater";

export default fetchItems(TheaterContainer, propFromRedux);
