import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
export default function Movie({ title, id, duration }) {
  return (
    <Link to={{ pathname: `/movies/${id}`, state: { id: id } }}>
      <div attr-id={id}>
        <h2>Name: {title}</h2>
        <div>
          Duration:{" "}
          {moment()
            .startOf("day")
            .seconds(+duration)
            .format("H:mm:ss")}{" "}
          h
        </div>
      </div>
    </Link>
  );
}
