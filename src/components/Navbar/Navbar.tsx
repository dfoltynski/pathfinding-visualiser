import React, { useState, useRef } from "react";

import DropdownButton from "./DropdownButton";
import Astar from "../algorithms/Astar";
import "../../App.css";
import Dijskstra from "../algorithms/Dijkstra";
import { resetGrid } from "../utils";
import { useAlgorithmContext } from "../Context/Context";

function Navbar() {
  const { algorithm } = useAlgorithmContext();

  const handleRunAlgorithm = () => {
    const algoritmBtn = document.querySelector(".options__nav__button__text");
    const runBtn = document.querySelector(".nav__button") as HTMLButtonElement;

    const startNode = document.querySelector(
      ".start"
    ) as HTMLTableDataCellElement;
    const endNode = document.querySelector(".end") as HTMLTableDataCellElement;

    const grid = document.querySelector(".grid") as HTMLTableElement;

    if (startNode && endNode && grid && !runBtn.disabled) {
      resetGrid();

      if (algorithm == "A* Search") {
        Astar(startNode, endNode);
      } else if (algorithm == "Dijkstra's Algorithm") {
        Dijskstra(startNode, endNode);
      }
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

      <button className="nav__button">
        <div className="nav__button__content">
          <span className="nav__button__text" onClick={handleRunAlgorithm}>
            {algorithm == "" ? "Select an algorithm" : `Run ${algorithm}`}
          </span>
        </div>
      </button>
    </nav>
  );
}

export default Navbar;
