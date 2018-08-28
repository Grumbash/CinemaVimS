import React from "react";
import { Link } from "react-router-dom";
export default function Theater({ name, id, city, user }) {
  return (
    <Link to={{ pathname: `/theaters/${id}` }}>
      <div attr-id={id}>
        <h2>Name: {name}</h2>
        <div>City: {city}</div>
        {user.isAdmin ? (
          <button onClick={() => console.log("Change")}>Change data</button>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
