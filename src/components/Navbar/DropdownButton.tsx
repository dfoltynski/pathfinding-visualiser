import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAlgorithmContext } from "../Context/Context";

import "../../App.css";
import { recursiveDivison } from "../mazes/RecursiveDivison";

interface IDropdownProps {
  title: string;
  listItems: Array<string>;
}

export default function DropdownButton({ title, listItems }: IDropdownProps) {
  const { setAlgorithm } = useAlgorithmContext();

  const [showDropdownList, setShowDropdownList] = useState<boolean>(false);

  const [buttonText, setButtonText] = useState<string>("");

  const dropdownButton = useRef<HTMLButtonElement>(
    document.createElement("button")
  );

  const toggleDropdownList = (e: any): void => {
    setShowDropdownList(!showDropdownList);

    dropdownButton.current.classList.toggle("dropdown--active");
  };

  const handleAlgorithmChange = (ev: any) => {
    const selectedOption: string = ev.target.outerText;
    const grid: HTMLTableElement = document.querySelector(
      "table"
    ) as HTMLTableElement;

    if (title == "Algorithms") {
      setButtonText(selectedOption);
      setAlgorithm(selectedOption);
      setShowDropdownList(false);
    } else if (title == "Mazes") {
      if (selectedOption == "Recursive Division") {
        recursiveDivison(grid);
      }
    }
  };

  document.onclick = (ev: any) => {
    if (!dropdownButton.current.contains(ev.target)) {
      setShowDropdownList(false);
    }
  };

  return (
    <div className="options__button__container">
      <button
        className="options__nav__button--dropdown"
        ref={dropdownButton}
        onClick={(e) => toggleDropdownList(e)}
      >
        <div className="options__nav__button__content">
          <span className="options__nav__button__text">
            {" "}
            {buttonText !== "" ? buttonText : title}
          </span>
          <IoMdArrowDropdown />
        </div>
      </button>
      {showDropdownList ? (
        <ul className="options__dropdown__list">
          {listItems.map((element) => (
            <li
              className="dropdown__list__item"
              onClick={handleAlgorithmChange}
            >
              {element}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
