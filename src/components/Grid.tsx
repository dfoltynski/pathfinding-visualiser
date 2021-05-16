import React, { useEffect, useRef } from "react";

export default function Grid() {
  const tableRef = useRef<HTMLTableElement>(document.createElement("table"));

  const handleNodeClick = (event: MouseEvent) => {
    event.preventDefault();
    console.log(event.currentTarget);
  };

  const generateRandomCoords = (): string => {
    const randomCoords: string = `${Math.floor(
      Math.random() * 31
    )}:${Math.floor(Math.random() * 21)}`;
    return randomCoords;
  };

  useEffect(() => {
    const startNodeCoords = generateRandomCoords();
    const endNodeCoords = generateRandomCoords();

    for (let y = 1; y < 21; y++) {
      let row: HTMLTableRowElement = document.createElement("tr");
      row.classList.add("gird__row");
      for (let x = 1; x < 37; x++) {
        let node: HTMLTableDataCellElement = document.createElement("td");
        node.classList.add("grid__node");
        node.id = `${x}:${y}`;
        node.onclick = handleNodeClick;
        row.appendChild(node);
      }
      tableRef.current.appendChild(row);
    }

    const startNode = document.getElementById(startNodeCoords);
    const endNode = document.getElementById(endNodeCoords);
    if (startNode && endNode) {
      startNode.classList.add("start");
      endNode.classList.add("end");
    }
  }, []);

  return <table className="grid" ref={tableRef}></table>;
}
