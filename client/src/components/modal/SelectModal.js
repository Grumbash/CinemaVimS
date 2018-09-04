import React from "react";

export default props => {
  return (
    <label>
      {props.name}
      <select onChange={props.onChange}>
        {props.options.map(opt => {
          if (opt.title) {
            return (
              <option key={opt._id}>
                Title:
                {opt.title} ID: {opt._id}
              </option>
            );
          }
          if (opt.theaterId) {
            return (
              <option key={opt._id} attr-id={opt._id}>
                {opt.theaterId.name}
                Hall: {opt.No} ID: {opt._id}
              </option>
            );
          }
        })}
      </select>
    </label>
  );
};
