import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import "../App.css";

interface IDropdownProps {
  title: string;
  listItems: Array<string>;
}

export default function DropdownButton({ title, listItems }: IDropdownProps) {
  const [showDropdownList, setShowDropdownList] = useState<boolean>(false);

  const dropdownButton = useRef<HTMLButtonElement>(
    document.createElement("button")
  );

  const toggleDropdownList = (e: any): void => {
    setShowDropdownList(!showDropdownList);

    dropdownButton.current.classList.toggle("dropdown--active");
  };

  return (
    <div className="options__button__container">
      <button
        className="options__nav__button--dropdown"
        ref={dropdownButton}
        onClick={(e) => toggleDropdownList(e)}
      >
        <div className="options__nav__button__content">
          <span className="options__nav__button__text">{title}</span>
          <IoMdArrowDropdown />
        </div>
      </button>
      {showDropdownList ? (
        <ul className="options__dropdown__list">
          {listItems.map((element) => (
            <li className="dropdown__list__item">{element}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
