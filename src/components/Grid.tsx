import React, { useEffect, useRef } from "react";

export default function Grid() {
  const table = useRef<HTMLTableElement>(document.createElement("table"));

  useEffect(() => {
    for (let x = 0; x < 20; x++) {
      let row = document.createElement("tr");
      row.classList.add("gird__row");
      for (let y = 0; y < 36; y++) {
        let node = document.createElement("td");
        node.classList.add("grid__node");
        row.appendChild(node);
      }
      table.current.appendChild(row);
    }
  }, []);

  return <table className="grid" ref={table}></table>;
}
