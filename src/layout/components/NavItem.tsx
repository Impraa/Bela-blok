import React from "react";
import { Link } from "react-router-dom";
import { NavItems } from "../../utils/Interfaces";
import "../../styles/layout/components/Navitem.scss";

function NavItem(props: NavItems) {
  return (
    <Link className="navitem" to={props.path}>
      {props.text}
    </Link>
  );
}

export default NavItem;
