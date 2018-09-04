import React, { Component } from "react";
import api from "../../utils/apiMap";
import { connect } from "react-redux";
import getHalls from "../../actions/halls/getHallsAction";
import Hall from "./Hall";

class Halls extends Component {
  constructor(props) {
    super(props);

    this.path = `${api.theater}/${this.props.theaterId}/halls`;
  }

  componentWillMount() {
    getHalls(this.path)(this.props.dispatch);
  }

  render() {
    const { payload, loading } = this.props.halls;
    if (loading) return <p>Loading...</p>;
    return (
      <div>
        {payload.map(hall => (
          <Hall {...hall} key={hall._id} />
        ))}
      </div>
    );
  }
}

const mapStateToPorops = state => {
  return { halls: state.halls, theaterId: state.theater.currentTheater };
};

export default connect(mapStateToPorops)(Halls);
