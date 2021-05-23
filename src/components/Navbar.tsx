import React, { useState, useRef } from "react";

import DropdownButton from "./DropdownButton";
import Astar from "./Astar";
import "../App.css";

function Navbar() {
  const [algorithm, setAlgorithm] = useState<string>("");

  const handleRunAlgorithm = () => {
    const startNode = document.querySelector(
      ".start"
    ) as HTMLTableDataCellElement;
    const endNode = document.querySelector(".end") as HTMLTableDataCellElement;
    const wallNodes = document.querySelectorAll(
      ".wall"
    ) as NodeListOf<HTMLTableDataCellElement>;
    const grid = document.querySelector(".grid") as HTMLTableElement;

    if (startNode && endNode && grid) {
      Astar(startNode, endNode, wallNodes, grid);
    }
  };

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
          <span className="nav__button__text" onClick={handleRunAlgorithm}>
            Run {algorithm}
          </span>
        </div>
      </button>
    </nav>
  );
}

export default Navbar;
