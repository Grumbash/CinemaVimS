import React from "react";

export default props => {
  return (
    <label>
      {props.name}
      <select onChange={props.onChange}>
        {props.options.map(opt => {
          if (opt.title) {
            return (
              <option key={opt._id} value={opt._id}>
                Title:
                {opt.title}
              </option>
            );
          }
          if (opt.theaterId) {
            return (
              <option key={opt._id} value={opt._id}>
                {opt.theaterId.name}
                Hall: {opt.No}
              </option>
            );
          }
          return null;
        })}
      </select>
    </label>
  );
};
