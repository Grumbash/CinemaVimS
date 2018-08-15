import React from "react";
import moment from "moment";

export default ({ movie: { duration, title, id } }) => {
  return (
    <div attr-id={id}>
      <p>Title: {title}</p>
      <div>
        Duration:{" "}
        {moment()
          .startOf("day")
          .seconds(+duration)
          .format("H:mm:ss")}{" "}
        h
      </div>
    </div>
  );
};
