import React from "react";
import moment from "moment";
export default function Show(props) {
  const {
    id,
    date,
    hallId: {
      No,
      theaterId: { city, name }
    },
    movieId: { title, duration }
  } = props;
  return (
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
  );
}
