import React, { useState, useRef } from "react";
import DropDownBtnIcon from "./utils/DropDownBtnIcon";
import { IoMdArrowDropdown } from "react-icons/io";

import "../App.css";

function Navbar() {
  const [
    showDropdownAlgorithmsList,
    setShowDropdownAlgorithmsList,
  ] = useState<boolean>(false);
  const [showDropdownMazesList, setShowDropdownMazesList] = useState<boolean>(
    false
  );

  const dropdownMazeButton = useRef<HTMLButtonElement>(
    document.createElement("button")
  );

  const dropdownAlgorithmButton = useRef<HTMLButtonElement>(
    document.createElement("button")
  );

  const toggleDropdownAlgorithmsList = (): void => {
    setShowDropdownAlgorithmsList(!showDropdownAlgorithmsList);
    setShowDropdownMazesList(false);

    dropdownAlgorithmButton.current.classList.toggle("dropdown--active");
    dropdownMazeButton.current.classList.remove("dropdown--active");
  };

  const toggleDropdownMazesList = (): void => {
    setShowDropdownMazesList(!showDropdownMazesList);
    setShowDropdownAlgorithmsList(false);
    dropdownMazeButton.current.classList.toggle("dropdown--active");
    dropdownAlgorithmButton.current.classList.remove("dropdown--active");
  };

  return (
    <nav>
      <div className="options">
        <div className="options__nav__button_container">
          <button
            className="options__nav__button--dropdown"
            onClick={toggleDropdownAlgorithmsList}
            ref={dropdownAlgorithmButton}
          >
            <div className="options__nav__button__content">
              <span className="options__nav__button__text">Algorithms</span>
              <IoMdArrowDropdown />
            </div>
          </button>
          {showDropdownAlgorithmsList ? (
            <ul className="options__dropdown__list">
              <li className="dropdown__list__item">A* Search</li>
              <li className="dropdown__list__item">Dijkstra's Algorithm</li>
              <li className="dropdown__list__item">Greedy Best-first Search</li>
              <li className="dropdown__list__item">Breadth-first Search</li>
            </ul>
          ) : null}
        </div>

        <div className="options__nav__button_container">
          <button
            className="options__nav__button--dropdown"
            onClick={toggleDropdownMazesList}
            ref={dropdownMazeButton}
          >
            <div className="options__nav__button__content">
              <span className="options__nav__button__text">Mazes</span>
              <IoMdArrowDropdown />
            </div>
          </button>
          {showDropdownMazesList ? (
            <ul className="options__dropdown__list">
              <li className="dropdown__list__item">A* Search</li>
              <li className="dropdown__list__item">Dijkstra's Algorithm</li>
              <li className="dropdown__list__item">Greedy Best-first Search</li>
              <li className="dropdown__list__item">Breadth-first Search</li>
            </ul>
          ) : null}
        </div>
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
