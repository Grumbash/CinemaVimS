import React, { Component } from "react";
import postReservation from "../../actions/reservation/postReservation";
import { connect } from "react-redux";
import classnames from "classnames";
import api from "../../utils/apiMap";
import "./seats.css";

class SeatsContainer extends Component {
  constructor(props) {
    super(props);

    this.reserv = this.props.reservation.filter(
      reserv => reserv.show._id === this.props.currentShow
    )[0];
    console.log(this.reserv);

    this.path = `${api.seats}/${this.reserv.show.hallId}/${
      this.props._id
    }/reservation`;
  }
  getTicket = e => {
    console.log(this.reserv);
    postReservation(this.path)({
      ...this.reserv,
      reserved: !this.reserv.reserved,
      show: this.reserv.show._id,
      user: this.props.userId
    })(this.props.dispatch);
  };
  render() {
    return (
      <div>
        <button
          onClick={this.getTicket}
          className={classnames("seat btn ", {
            "btn-dark": this.reserv.reserved,
            "btn-light": !this.reserv.reserved
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
