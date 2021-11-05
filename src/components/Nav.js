import React from "react";
import "./../App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        <div style={{ fontSize: "30px" }}>🌏</div>
      </Link>
      <h4>Covid-Tracker Dashboard</h4>
    </nav>
  );
}

export default Nav;
