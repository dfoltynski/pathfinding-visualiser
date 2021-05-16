import React from "react";

import "../App.css";

export default function Legend() {
  return (
    <ul className="legend">
      <li className="legend__item">
        <div className="legend__node" style={{ backgroundColor: "blue" }}></div>{" "}
        Start node
      </li>
      <li className="legend__item">
        {" "}
        <div
          className="legend__node"
          style={{ backgroundColor: "yellow" }}
        ></div>
        End node
      </li>
      <li className="legend__item">
        {" "}
        <div className="legend__node" style={{ backgroundColor: "pink" }}></div>
        Barrier node
      </li>
    </ul>
  );
}
