import React from "react";
import { Link } from "react-router-dom";
export default props => {
  return (
    <div>
      <Link
        to={{ pathname: `/theaters/${props.theaterId._id}/halls/${props._id}` }}
      >{`Hall No:${props.No}`}</Link>
    </div>
  );
};
