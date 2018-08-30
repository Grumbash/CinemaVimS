import React from "react";
import { Link } from "react-router-dom";
export default function Theater({ name, id, city }) {
  return (
    <div attr-id={id}>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <h2 className="card-title col-11">{name}</h2>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">{city}</h6>
          <p className="card-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum,
            aut cum dolores eius mollitia ea odio saepe ab, iure suscipit quo
            totam. Cum adipisci id modi nulla in asperiores assumenda!
          </p>
          <Link
            to={{ pathname: `/theaters/${id}`, state: { path: "/theaters" } }}
          >
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}
