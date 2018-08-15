import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getTheaters from "../../actions/theatersAction";
import Theater from "./Theater";
import Spinner from "../common/Spinner";

class Theaters extends Component {
  componentDidMount() {
    this.props.getTheaters();
  }
  render() {
    const {
      theaters: { payload },
      theaters: { loading }
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
          {payload.map(theater => (
            <Theater
              key={theater._id}
              name={theater.name}
              city={theater.city}
              id={theater._id}
            />
          ))}
        </div>
      );
    }
  }
}

Theaters.propTypes = {
  theaters: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  theaters: state.theaters,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTheaters }
)(Theaters);
