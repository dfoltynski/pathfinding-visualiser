import React from "react";
import DropDownBtnIcon from "./utils/DropDownBtnIcon";
import { IoMdArrowDropdown } from "react-icons/io";

import "../App.css";

function Navbar() {
  return (
    <nav>
      <div className="options">
        <button className="options__nav__button--dropdown">
          <div className="options__nav__button__content">
            <span className="options__nav__button__text">Algorithms</span>
            <IoMdArrowDropdown />
          </div>
        </button>

        <button className="options__nav__button--dropdown">
          <div className="options__nav__button__content">
            <span className="options__nav__button__text">Mazes</span>
            <IoMdArrowDropdown />
          </div>
        </button>
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
