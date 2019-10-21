import React from "react";
import { Link } from "react-router-dom";

const NavbarItem = ({ url, title }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={url}>
        {" "}
        {title}
      </Link>
    </li>
  );
};

export default NavbarItem;
