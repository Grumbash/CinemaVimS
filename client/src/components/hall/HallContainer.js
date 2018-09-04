import React, { Component } from "react";
import getHall from "../../actions/halls/getHallAction";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import Hall from "./SingelHall";

class HallContainer extends Component {
  constructor(props) {
    super(props);

    this.path = `/api/${this.props.match.url}`;
  }
  componentWillMount = () => {
    getHall(this.path)(this.props.dispatch);
  };

  render() {
    const { payload, loading } = this.props.hall;
    if (loading) return <Spinner />;

    return <Hall {...payload} />;
  }
}

const mapStateToProps = state => {
  return {
    hall: state.hall
  };
};

export default connect(mapStateToProps)(HallContainer);
