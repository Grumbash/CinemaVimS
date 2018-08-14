import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ListItem = ({ path, name }) => {
  return (
    <div>
      <li className="nav-item">
        <Link className="nav-link" to={`/${path}`}>
          {name[0].toUpperCase() + name.slice(1)}
        </Link>
      </li>
    </div>
  );
};

ListItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default ListItem;
