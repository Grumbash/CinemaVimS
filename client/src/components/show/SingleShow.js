import React from "react";

export default ({ show: { rows, hall_id } }) => {
  console.log(rows);
  return (
    <div attr-id={hall_id}>
      {rows.map(row => (
        <div
          style={{
            height: "50px",
            backgroundColor: "beige",
            display: "inline-block"
          }}
          key={row._id}
          className="col-10 center"
        >
          {row.No}
        </div>
      ))}
    </div>
  );
};
