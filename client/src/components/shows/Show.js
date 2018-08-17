import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
export default function Show(props) {
  const {
    _id,
    date,
    hallId: {
      No,
      theaterId: { city, name }
    },
    movieId: { title, duration }
  } = props;
  const id = _id;

  return (
    <Link to={{ pathname: `/shows/${id}`, state: { id: id } }}>
      <div attr-id={id}>
        <h2>
          Film: {title}{" "}
          <p>
            {" "}
            Duration:{" "}
            {moment()
              .startOf("day")
              .seconds(+duration)
              .format("H:mm")}
          </p>
        </h2>
        <p>City: {city}</p>
        <div>
          <p>Theater: {name}</p>
          <p>Hall: {No}</p>
          <p>
            Date:{" "}
            {moment(date)
              .utc()
              .format("DD-MM-YYYY")}
          </p>
          <p>
            Time:{" "}
            {moment(date)
              .utc()
              .format("HH:mm")}
          </p>
        </div>
        <hr />
      </div>
    </Link>
  );
}
