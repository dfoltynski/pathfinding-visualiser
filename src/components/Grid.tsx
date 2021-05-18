import React, { useEffect, useRef, useState } from "react";

export default function Grid() {
  let mouseDown: boolean = false;
  let nodeFlag: string = "";

  const tableRef = useRef<HTMLTableElement>(document.createElement("table"));

  const handleNodeClick = (event: MouseEvent) => {
    event.preventDefault();
    console.log(event.currentTarget);
  };

  const handleDrag = (ev: any) => {
    if (mouseDown) {
      let prevNode = document.querySelectorAll(`.${nodeFlag}`)[1];
      prevNode?.classList.remove(`${nodeFlag}`);
      console.log(ev.fromElement);
      ev.fromElement.classList.add(`${nodeFlag}`);
    }
  };

  const createNode = (x: number, y: number): HTMLTableDataCellElement => {
    const node: HTMLTableDataCellElement = document.createElement("td");
    node.classList.add("grid__node");
    node.id = `${x}:${y}`;

    node.addEventListener("mouseover", handleDrag);

    node.addEventListener("mousedown", (ev: any) => {
      console.log("draging");
      if (ev.path[0].classList[1] == "start") {
        mouseDown = true;
        nodeFlag = "start";
      } else if (ev.path[0].classList[1] == "end") {
        mouseDown = true;
        nodeFlag = "end";
      }
    });

    node.addEventListener("mouseup", () => {
      mouseDown = false;
    });

    return node;
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
        let node: HTMLTableDataCellElement = createNode(x, y);
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
