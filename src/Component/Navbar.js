import React from "react";
// import { Link } from "react-router-dom";
import "./nav.css";
export default function Navbar(props) {
  return (
    <div className="navbarMain">
      <div className="navbarD">Students</div>
      <div className="mainWrapper">{props.children}</div>
    </div>
  );
}
