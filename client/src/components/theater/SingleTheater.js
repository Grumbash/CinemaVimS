import React from "react";
import Halls from "../halls/Halls";
import OpenModalButton from "../common/OpenModalButton";

export default theater => {
  return (
    <div>
      {theater.name}
      <Halls />
      <OpenModalButton text="hall" />
    </div>
  );
};
