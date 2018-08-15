import React from "react";
export default function Theater({ name, id, city }) {
  return (
    <div attr-id={id}>
      <h2>Name: {name}</h2>
      <div>City: {city}</div>
    </div>
  );
}
