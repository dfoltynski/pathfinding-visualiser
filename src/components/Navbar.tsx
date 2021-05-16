import React, { useState, useRef } from "react";

import DropdownButton from "./DropdownButton";

import "../App.css";

function Navbar() {
  return (
    <nav>
      <div className="options">
        <DropdownButton
          title="Algorithms"
          listItems={[
            "A* Search",
            "Dijkstra's Algorithm",
            "Greedy Best-first Search",
            "Breadth-first Search",
          ]}
        />
        <DropdownButton
          title="Mazes"
          listItems={["Random Maze", "Vertical Maze", "Horizontal Maze"]}
        />
      </div>

      <button className="nav__button--activate">
        <div className="nav__button__content">
          <span className="nav__button__text">Visualize</span>
        </div>
      </button>
    </nav>
  );
}

export default Navbar;
