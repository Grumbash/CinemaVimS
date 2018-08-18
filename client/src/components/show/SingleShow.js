import React from "react";
import Row from "../row/RowContainer";

export default ({ show: { rows, hall_id } }) => {
  return (
    <div attr-id={hall_id} className="rows">
      {rows.map(row => (
        <Row row={row} key={row._id} />
      ))}
    </div>
  );
};
