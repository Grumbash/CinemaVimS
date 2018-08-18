import React, { Component } from "react";
import Seat from "../seat/SeatsContainer";

export default class RowContainer extends Component {
  render() {
    const { row } = this.props;
    console.log(row);
    return (
      <div className="mx-auto row">
        <div className="col-1">
          {" "}
          <span className="text-secondary"> {row.No} </span>
        </div>
        <div
          style={{ height: "50px" }}
          key={row._id}
          className="col-11 bg-light"
        >
          {row.seats.map(seat => (
            <Seat key={seat._id} />
          ))}
        </div>
      </div>
    );
  }
}
