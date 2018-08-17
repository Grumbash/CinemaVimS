import React from "react";
// eslint-disable-next-line
import moment from "moment";

export default ({ show: { rows, hall_id } }) => {
  console.log(rows);
  return (
    <div attr-id={hall_id}>
      {rows.map(row => (
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "red",
            display: "inline-block"
          }}
          key={row._id}
        >
          {row.No}
        </div>
      ))}
    </div>
  );
};
