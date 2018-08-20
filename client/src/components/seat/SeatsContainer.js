import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import "./seats.css";

class SeatsContainer extends Component {
  render() {
    console.log(this.props);
    const reserv = this.props.reservation.some(
      reserv => reserv.show._id === this.props.currentShow
    );
    return (
      <div>
        <button
          className={classnames("seat btn ", {
            "btn-dark": reserv,
            "btn-light": !reserv
          })}
        >
          {this.props.No}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id,
    currentShow: state.show.currentShow
  };
};

export default connect(mapStateToProps)(SeatsContainer);
