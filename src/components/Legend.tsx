import React from "react";

import "../App.css";

export default function Legend() {
  return (
    <ul className="legend">
      <li className="legend__item">
        <div className="legend__node start"></div> Start node
      </li>
      <li className="legend__item">
        {" "}
        <div className="legend__node end"></div>
        End node
      </li>
      <li className="legend__item">
        {" "}
        <div className="legend__node barrier"></div>
        Barrier node
      </li>
    </ul>
  );
}
